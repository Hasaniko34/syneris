import { NextRequest, NextResponse } from 'next/server';

/**
 * Zorla Gemini API'ye istek atıp test yapan endpoint
 */
export async function POST(request: NextRequest) {
  console.log("Force API request received");
  const startTime = performance.now();

  try {
    // Parse request
    const body = await request.json();
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
    if (!apiKey) {
      console.error("Gemini API anahtarı bulunamadı, demo yanıt dönülüyor");
      
      // Return a demo response instead of error when API key is missing (for development)
      return NextResponse.json({
        success: true,
        message: "DEV MODE - API KEY YOK",
        responseTime: 100,
        response: `Bu bir test yanıtıdır. Gerçek API anahtarı olmadığı için Gemini API'ye istek atılamadı.\n\nSorduğunuz soru: "${message}"`,
        requestDetails: {
          messageLength: message.length,
          sessionId: sessionId || "direct-api",
          timestamp: new Date().toISOString(),
          isDemoResponse: true
        }
      });
    }

    // Prepare request to Gemini API
    const geminiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: message,
            },
          ],
        },
      ],
    };

    console.log("Sending request to Gemini API");
    
    // Send request to Gemini API with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 seconds timeout
    
    try {
      // Construct the full URL with the API key
      const fullUrl = `${geminiUrl}?key=${apiKey}`;
      console.log(`API URL (without key): ${geminiUrl}`);
      
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
        console.error(`Gemini API error: ${response.status}`, errorText);
        return NextResponse.json({
          success: false,
          message: `Gemini API hatası: ${response.status}`,
          error: errorText,
          response: `Gemini API'den yanıt alınamadı (${response.status}). Lütfen daha sonra tekrar deneyin.`,
        }, { status: 500 });
      }
  
      // Parse response
      const responseText = await response.text();
      console.log("Raw response:", responseText.substring(0, 150) + "...");
      
      let data;
      try {
        data = JSON.parse(responseText);
        console.log("Gemini API response received:", JSON.stringify(data).substring(0, 150) + "...");
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        return NextResponse.json({
          success: false,
          message: "API yanıtı JSON olarak ayrıştırılamadı",
          error: String(parseError),
          response: "API yanıtını işlerken teknik bir sorun oluştu. Lütfen daha sonra tekrar deneyin.",
        }, { status: 500 });
      }
  
      // Extract the AI response text
      let aiResponse = "";
      if (
        data?.candidates &&
        data.candidates[0]?.content?.parts &&
        data.candidates[0].content.parts[0]?.text
      ) {
        aiResponse = data.candidates[0].content.parts[0].text;
      } else {
        console.error("Unexpected Gemini API response format:", data);
        return NextResponse.json({
          success: false,
          message: "API yanıtı beklenmeyen bir formatta",
          debug: data,
          response: "API'den beklenmeyen formatta yanıt alındı. Lütfen daha sonra tekrar deneyin.",
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
      console.error("Gemini API fetch error:", fetchError.name, fetchError.message);
      
      if (fetchError.name === "AbortError") {
        return NextResponse.json({
          success: false,
          message: "Gemini API timeout - yanıt çok uzun sürdü",
          response: "Yanıt almak çok uzun sürdü. Lütfen daha sonra tekrar deneyin veya daha kısa bir mesaj girin.",
        }, { status: 504 });
      }
      
      return NextResponse.json({
        success: false,
        message: `Gemini API bağlantı hatası: ${fetchError.message}`,
        response: "API'ye bağlanırken bir sorun oluştu. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.",
      }, { status: 500 });
    }
  } catch (error: any) {
    // Handle general errors
    console.error("Force API genel hata:", error);
    return NextResponse.json({
      success: false,
      message: `İşlem hatası: ${error.message}`,
      response: "Bir sistem hatası oluştu. Lütfen daha sonra tekrar deneyin.",
    }, { status: 500 });
  }
} 