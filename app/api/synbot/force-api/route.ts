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
    
    // Get API key from environment variables
    const apiKey = process.env.SYNBOT_API_KEY || process.env.GOOGLE_GEMINI_API_KEY;
    console.log("API key available:", !!apiKey);

    if (!apiKey) {
      return NextResponse.json({
        success: false,
        message: "API anahtarı bulunamadı",
        response: "SynBot şu anda hizmet veremiyor. Lütfen daha sonra tekrar deneyin.",
      }, { status: 500 });
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
    Sen bir "Eğitim Asistanı"sın.
    `;

    // Configure API endpoint and request
    const apiUrl = process.env.SYNBOT_API_URL || "https://synbot-api.turkcell.com.tr/v1/generate";
    
    // Format request payload based on API specifications
    const requestBody = {
      prompt: systemMessage,
      user_input: message,
      parameters: {
        temperature: 0.7,
        max_tokens: 2048
      }
    };

    console.log("Sending request to SynBot API");
    
    // Send request with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 seconds timeout
    
    try {
      // Make API request
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
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
      const responseData = await response.json();
      console.log("API response received:", JSON.stringify(responseData).substring(0, 150) + "...");
      
      // Extract response content from API result
      const aiResponse = responseData.output || responseData.response || responseData.generated_text || "";
      
      if (!aiResponse) {
        console.error("Empty response from API:", responseData);
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