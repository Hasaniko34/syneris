import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // API anahtarı
    const API_KEY = 'AIzaSyDfJ4ZDvYDsC4Cq8lksklgFJDIzpwKgyxk';
    
    // URL'den sorguyu al
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || 'Merhaba, nasılsın?';
    
    console.log('Gemini Test API: Sorgu =', query);
    
    // Gemini API'ye istek
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': API_KEY
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: query }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024
          }
        })
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API yanıt hatası: ${response.status} - ${errorText}`);
    }
    
    const result = await response.json();
    
    // Basit UI sayfası
    const htmlOutput = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Gemini API Test</title>
        <style>
          body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #333; }
          .card { border: 1px solid #ddd; border-radius: 8px; padding: 16px; margin-bottom: 16px; }
          .query { background: #f5f5f5; border-left: 4px solid #ffc72c; padding: 12px; }
          .response { background: #f9f9f9; border-left: 4px solid #00a0d2; padding: 12px; white-space: pre-wrap; }
          .info { font-size: 12px; color: #666; margin-top: 8px; }
          input { width: 100%; padding: 8px; margin-bottom: 8px; border: 1px solid #ddd; border-radius: 4px; }
          button { background: #00a0d2; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; }
          button:hover { background: #008db8; }
        </style>
      </head>
      <body>
        <h1>Gemini API Test Sayfası</h1>
        <div>
          <form action="/api/gemini-test" method="get">
            <input type="text" name="q" placeholder="Bir soru sorun..." value="${query}">
            <button type="submit">Gönder</button>
          </form>
        </div>
        <div class="card">
          <h3>Sorgu:</h3>
          <div class="query">${query}</div>
        </div>
        <div class="card">
          <h3>Yanıt:</h3>
          <div class="response">${result.candidates?.[0]?.content?.parts?.[0]?.text || 'Yanıt alınamadı'}</div>
          <div class="info">Model: gemini-2.0-flash | Zaman: ${new Date().toLocaleString()}</div>
        </div>
        <div class="card">
          <h3>Ham API Yanıtı:</h3>
          <pre style="overflow-x: auto; font-size: 12px;">${JSON.stringify(result, null, 2)}</pre>
        </div>
      </body>
    </html>
    `;
    
    return new NextResponse(htmlOutput, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8'
      }
    });
  } catch (error: any) {
    console.error('Gemini Test API hatası:', error);
    
    // Hata sayfası
    const errorPage = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Gemini API Test - Hata</title>
        <style>
          body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #d32f2f; }
          .error { background: #ffebee; border-left: 4px solid #d32f2f; padding: 12px; }
        </style>
      </head>
      <body>
        <h1>Gemini API Test Hatası</h1>
        <div class="error">
          <h3>Hata Mesajı:</h3>
          <p>${error.message}</p>
          <h3>Hata Detayı:</h3>
          <pre>${error.stack}</pre>
        </div>
        <p><a href="/api/gemini-test">Tekrar Dene</a></p>
      </body>
    </html>
    `;
    
    return new NextResponse(errorPage, {
      status: 500,
      headers: {
        'Content-Type': 'text/html; charset=utf-8'
      }
    });
  }
} 