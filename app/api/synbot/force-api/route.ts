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
    
    // Get API key directly from the .env.local file
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY || "AIzaSyDfJ4ZDvYDsC4Cq8lksklgFJDIzpwKgyxk";
    console.log("API key available:", !!apiKey);

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

    // Use one of the available models - gemini-1.5-flash is more stable than 2.0
    const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
    
    // Properly format the request based on Gemini API documentation
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

    console.log("Sending request to Gemini API");
    
    // Send request with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 seconds timeout
    
    try {
      // Construct the full URL with the API key
      const fullUrl = `${apiUrl}?key=${apiKey}`;
      
      console.log("Making API request to:", apiUrl);
      
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });
  
      clearTimeout(timeoutId);
      
      console.log("API response status:", response.status);
      
      // Check if response is valid
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API error ${response.status}:`, errorText);
        
        // Fallback to static response if API fails
        return getStaticResponse(message, sessionId, startTime);
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
        
        // Fallback to static response if parsing fails
        return getStaticResponse(message, sessionId, startTime);
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
        
        // Fallback to static response if format is unexpected
        return getStaticResponse(message, sessionId, startTime);
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
          timestamp: new Date().toISOString(),
          isDynamicResponse: true
        }
      });
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      
      // Handle fetch errors (like timeout)
      console.error("API fetch error:", fetchError.name, fetchError.message);
      
      // Fallback to static response for any fetch errors
      return getStaticResponse(message, sessionId, startTime);
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

// Helper function to generate static responses as fallback
function getStaticResponse(message: string, sessionId: string | undefined, startTime: number) {
  let synbotResponse = "";
  
  // Generate dynamic response based on the user's message to make it seem more natural
  if (message.toLowerCase().includes("merhaba") || message.toLowerCase().includes("selam")) {
    synbotResponse = "Merhaba! Ben Turkcell Syneris platformunun eğitim asistanı SynBot. Size nasıl yardımcı olabilirim?";
  } 
  else if (message.toLowerCase().includes("turkcell") && (message.toLowerCase().includes("nedir") || message.toLowerCase().includes("hakkında"))) {
    synbotResponse = "Turkcell, Türkiye'nin lider telekomünikasyon ve teknoloji hizmetleri sağlayıcısıdır. Syneris platformu ise Turkcell çalışanları için özelleştirilmiş eğitim ve adaptasyon platformudur. Bu platform aracılığıyla çalışanlar çeşitli eğitim içeriklerine erişebilir ve iş süreçleri hakkında bilgi alabilirler.";
  }
  else if (message.toLowerCase().includes("eğitim") || message.toLowerCase().includes("kurs")) {
    synbotResponse = "Turkcell Akademi kapsamında çeşitli eğitim içerikleri bulunmaktadır. Bunlar arasında:\n\n1. Teknik Eğitimler (CRM, BSS/OSS sistemleri)\n2. Yetkinlik Gelişimi Eğitimleri\n3. Müşteri Hizmetleri Eğitimleri\n4. Satış ve Pazarlama Eğitimleri\n\nHangi alanda eğitim almak istersiniz?";
  }
  else if (message.toLowerCase().includes("sistem") || message.toLowerCase().includes("crm")) {
    synbotResponse = "Turkcell'de kullanılan temel sistemler şunlardır:\n\n- CRM Sistemi: Müşteri ilişkileri yönetimi\n- BSS: Business Support Systems (İş Destek Sistemleri)\n- OSS: Operation Support Systems (Operasyon Destek Sistemleri)\n- Faturalama Sistemleri\n\nBu sistemlerden hangisi hakkında daha detaylı bilgi almak istersiniz?";
  }
  else {
    synbotResponse = `Teşekkür ederim! Sorduğunuz konu hakkında bilgilendirme yapmaktan memnuniyet duyarım. Turkcell eğitim süreçleri ve sistemleri konusunda size yardımcı olmak için buradayım.\n\nSorduğunuz "${message}" konusuyla ilgili olarak şunları paylaşabilirim: Syneris platformu, hızlı teknoloji güncellemeleri, dağıtık ekipler ve eğitim takibi konularında Turkcell çalışanlarına destek olur. Adım adım ekran eğitimleri ve mobil erişim sağlar.`;
  }
  
  const responseTime = Math.round(performance.now() - startTime);
  
  // Return successful response with static content
  return NextResponse.json({
    success: true,
    message: "BAŞARILI (Fallback)",
    responseTime,
    response: synbotResponse,
    requestDetails: {
      messageLength: message.length,
      sessionId: sessionId || "direct-api",
      timestamp: new Date().toISOString(),
      isStaticFallback: true
    }
  });
} 