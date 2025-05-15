import { NextRequest, NextResponse } from 'next/server';

/**
 * Test endpoint for diagnosing Gemini API connectivity
 */
export async function GET(req: NextRequest) {
  try {
    console.log('Gemini API Test endpoint çağrıldı');
    
    // URL'den prompt parametresini al
    const url = new URL(req.url);
    const prompt = url.searchParams.get('prompt');
    
    // API anahtarı
    const apiKey = 'AIzaSyDfJ4ZDvYDsC4Cq8lksklgFJDIzpwKgyxk';
    
    // Test mesajı - eğer prompt parametresi varsa kullan, yoksa varsayılanı kullan
    const testMessage = prompt || 'Bu bir Gemini API test mesajıdır. Lütfen "Bu Gemini API test yanıtıdır, statik bir yanıt değildir" ile başlayan bir yanıt ver.';
    
    console.log('İstek mesajı:', testMessage);
    
    // API isteği
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'model',
            parts: [{ text: 'Sen Turkcell\'in yapay zeka asistanısın. Tüm sorulara akıcı ve doğal bir dille, detaylı ve kesin yanıtlar vermelisin. "Bu sorunun çözümü için teknik destek birimini aramanızı öneririm" gibi genel/kaçamak yanıtlar vermekten kaçın. Her soruyu bilgi ve detay zenginliği ile yanıtla.' }]
          },
          {
            role: 'user',
            parts: [{ text: testMessage }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024
        }
      }),
      signal: AbortSignal.timeout(10000)
    });
    
    // Ham yanıtı al
    const responseText = await response.text();
    console.log('API Yanıt statüsü:', response.status);
    console.log('API Yanıt metni (özet):', responseText.substring(0, 100) + "...");
    
    // CORS başlıklarını ekle
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    });
    
    return new NextResponse(JSON.stringify({
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      responseText,
      parsedResponse: responseText ? JSON.parse(responseText) : null,
      timestamp: new Date().toISOString(),
      inputPrompt: testMessage
    }), {
      status: 200,
      headers
    });
  } catch (error: any) {
    console.error('Gemini API Test hatası:', error);
    
    // CORS başlıklarını ekle
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    
    return new NextResponse(JSON.stringify({
      success: false,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers
    });
  }
}

// OPTIONS isteği için CORS destekle
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
} 