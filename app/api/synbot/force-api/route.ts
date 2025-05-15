import { NextRequest, NextResponse } from 'next/server';

/**
 * SynBot - Turkcell çalışanları için özelleştirilmiş eğitim asistanı API endpoint'i
 */
export async function POST(request: NextRequest) {
  console.log("SynBot API request received");
  const startTime = performance.now();

  try {
    // Parse request
    let body;
    try {
      body = await request.json();
      console.log("Request body:", JSON.stringify(body).substring(0, 200));
    } catch (parseError) {
      console.error("Request parsing error:", parseError);
      return NextResponse.json({
        success: false,
        message: "Geçersiz istek formatı",
        response: "İsteğiniz işlenirken bir sorun oluştu. Lütfen tekrar deneyin.",
      }, { status: 400 });
    }

    const { message, sessionId } = body;

    // Check if message is empty
    if (!message || message.trim() === "") {
      return NextResponse.json({
        success: false,
        message: "Mesaj boş olamaz",
        response: "Lütfen bir mesaj girin.",
      }, { status: 400 });
    }

    console.log(`Processing message for session: ${sessionId || 'direct-api'}, message: "${message.substring(0, 50)}..."`);
    
    // Get API key from environment variable
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    console.log("API key available:", !!apiKey);
    
    if (!apiKey) {
      console.error("API anahtarı bulunamadı, demo yanıt dönülüyor");
      
      // Return a demo response instead of error when API key is missing (for development)
      return NextResponse.json({
        success: true,
        message: "DEV MODE - API KEY YOK",
        responseTime: 100,
        response: `Merhaba, ben SynBot - Turkcell'in eğitim asistanıyım. Şu anda sistemde API anahtarı tanımlanmadığı için sınırlı yanıtlar verebiliyorum.\n\nSorduğunuz soru: "${message}"\n\nSize nasıl yardımcı olabilirim? Turkcell sistemleri, eğitim içerikleri veya iş süreçleri hakkında sorularınızı yanıtlayabilirim.`,
        requestDetails: {
          messageLength: message.length,
          sessionId: sessionId || "direct-api",
          timestamp: new Date().toISOString(),
          isDemoResponse: true
        }
      });
    }

    // Prepare system message to contextualize the assistant as SynBot
    const systemMessage = `
    Sen Turkcell çalışanlarına özel olan Syneris platformunun eğitim asistanı SynBot'sun.
    Aşağıdaki konularda Turkcell çalışanlarına yardımcı olursun:
    - Eğitim içerikleri ve modülleri hakkında bilgi verme
    - Turkcell CRM, OSS/BSS ve Faturalama sistemleri
    - Adım adım ekran eğitimleri ve iş süreçleri
    - Çağrı Merkezi, Saha Operasyon ve Back-office pozisyonları için rehberlik
    - Turkcell sistemlerinde hata önleyici uyarılar ve kısa yollar
    
    Yanıtlarında Turkcell terminolojisini kullan. Asla "yapay zeka" olduğundan ya da "AI model" olduğundan bahsetme.
    Sen bir "Eğitim Asistanı"sın. Google, Gemini veya OpenAI gibi terimler kullanma.
    `;

    // Prepare request to API
    const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: systemMessage,
            },
          ],
        },
        {
          parts: [
            {
              text: message,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048
      }
    };

    console.log("Sending request to Gemini-2.0-flash API");
    
    // Send request with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 seconds timeout
    
    try {
      // Construct the full URL with the API key
      const fullUrl = `${apiUrl}?key=${apiKey}`;
      
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });
  
      clearTimeout(timeoutId);
      
      // Check if response is valid
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API error ${response.status}:`, errorText);
        return NextResponse.json({
          success: false,
          message: `SynBot yanıt hatası: ${response.status}`,
          error: errorText,
          response: `Üzgünüm, şu anda sorunuzu yanıtlarken teknik bir sorun yaşıyorum. Turkcell IT desteği ile sorunu çözmeye çalışıyoruz. Lütfen daha sonra tekrar deneyin.`,
        }, { status: 500 });
      }
  
      // Parse response
      const responseText = await response.text();
      console.log("Raw response:", responseText.substring(0, 150) + "...");
      
      let data;
      try {
        data = JSON.parse(responseText);
        console.log("API response received:", JSON.stringify(data).substring(0, 150) + "...");
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        return NextResponse.json({
          success: false,
          message: "API yanıtı JSON olarak ayrıştırılamadı",
          error: String(parseError),
          response: "Yanıtınızı işlerken teknik bir sorun oluştu. Turkcell Akademi ekibimiz sorunu inceliyor. Lütfen kısa bir süre sonra tekrar deneyin.",
        }, { status: 500 });
      }
  
      // Extract the response text - format may be different
      let aiResponse = "";

      if (data?.candidates && data.candidates[0]?.content?.parts && data.candidates[0].content.parts[0]?.text) {
        // New format
        aiResponse = data.candidates[0].content.parts[0].text;
      } else if (data?.candidates && data.candidates[0]?.text) {
        // Alternative format
        aiResponse = data.candidates[0].text;
      } else if (data?.text) {
        // Simple format
        aiResponse = data.text;
      } else {
        console.error("Unexpected API response format:", data);
        return NextResponse.json({
          success: false,
          message: "API yanıtı beklenmeyen bir formatta",
          debug: data,
          response: "SynBot şu anda yanıt veremiyor. Turkcell Akademi ekibimiz sistemde bakım yapıyor olabilir. Lütfen daha sonra tekrar deneyin.",
        }, { status: 500 });
      }
  
      // Calculate response time
      const responseTime = Math.round(performance.now() - startTime);
      console.log(`Processed in ${responseTime}ms`);
  
      // Return successful response
      return NextResponse.json({
        success: true,
        message: "BAŞARILI",
        responseTime,
        response: aiResponse,
        requestDetails: {
          messageLength: message.length,
          sessionId: sessionId || "direct-api",
          timestamp: new Date().toISOString()
        }
      });
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      
      // Handle fetch errors (like timeout)
      console.error("API fetch error:", fetchError.name, fetchError.message);
      
      if (fetchError.name === "AbortError") {
        return NextResponse.json({
          success: false,
          message: "SynBot timeout - yanıt çok uzun sürdü",
          response: "Yanıt oluşturmak beklenenden uzun sürüyor. Lütfen ağ bağlantınızı kontrol edin veya daha kısa bir soru sorun. Turkcell sistemlerinde yoğunluk olabilir.",
        }, { status: 504 });
      }
      
      return NextResponse.json({
        success: false,
        message: `SynBot bağlantı hatası: ${fetchError.message}`,
        response: "Şu anda Turkcell sistemlerine bağlanırken bir sorun yaşıyorum. Lütfen ağ bağlantınızı kontrol edin ve tekrar deneyin.",
      }, { status: 500 });
    }
  } catch (error: any) {
    // Handle general errors
    console.error("SynBot genel hata:", error);
    return NextResponse.json({
      success: false,
      message: `İşlem hatası: ${error.message}`,
      response: "Üzgünüm, şu anda sorunuzu işlerken beklenmedik bir sorun oluştu. Turkcell Akademi ekibine bu durumu bildirdik. Lütfen daha sonra tekrar deneyin.",
    }, { status: 500 });
  }
} 