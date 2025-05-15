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
      }, { status: 400 });
    }

    console.log(`Processing message for session: ${sessionId || 'direct-api'}`);
    
    // Get API key from environment variable
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Gemini API anahtarı bulunamadı");
      return NextResponse.json({
        success: false,
        message: "API anahtarı bulunamadı",
      }, { status: 500 });
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
      const response = await fetch(`${geminiUrl}?key=${apiKey}`, {
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
        }, { status: 500 });
      }
  
      // Parse response
      const data = await response.json();
      console.log("Gemini API response received:", JSON.stringify(data).substring(0, 150) + "...");
  
      // Extract the AI response text
      let aiResponse = "";
      if (
        data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts[0] &&
        data.candidates[0].content.parts[0].text
      ) {
        aiResponse = data.candidates[0].content.parts[0].text;
      } else {
        console.error("Unexpected Gemini API response format:", data);
        return NextResponse.json({
          success: false,
          message: "API yanıtı beklenmeyen bir formatta",
          debug: data,
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
        }, { status: 504 });
      }
      
      return NextResponse.json({
        success: false,
        message: `Gemini API bağlantı hatası: ${fetchError.message}`,
      }, { status: 500 });
    }
  } catch (error: any) {
    // Handle general errors
    console.error("Force API genel hata:", error);
    return NextResponse.json({
      success: false,
      message: `İşlem hatası: ${error.message}`,
    }, { status: 500 });
  }
} 