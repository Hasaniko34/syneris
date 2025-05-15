import { NextRequest } from 'next/server';
import { standardApiResponse } from '@/lib/utils/api-security';

/**
 * Zorla Gemini API'ye istek atıp test yapan endpoint
 */
export async function POST(req: NextRequest) {
  try {
    // Mesajı al
    const body = await req.json();
    if (!body.message) {
      return standardApiResponse({
        success: false,
        error: 'Mesaj boş olamaz'
      }, {
        success: false,
        status: 400,
        message: 'Mesaj gönderilmelidir'
      });
    }
    
    const userMessage = body.message;
    
    // API anahtarı .env'den alınıyor
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error('API anahtarı bulunamadı. .env dosyasında GOOGLE_GEMINI_API_KEY tanımladığınızdan emin olun.');
      return standardApiResponse({
        success: false,
        error: 'API anahtarı eksik'
      }, {
        success: false,
        status: 500,
        message: 'Sunucu konfigürasyonu tamamlanmamış'
      });
    }
    
    console.log('🔍 GEMINI API ÇAĞRISI YAPILIYOR');
    
    // Sistem talimatı
    const systemMessage = 'Sen Syneris platformunun yapay zeka asistanı olan SynBot\'sun. Turkcell çalışanlarına yardımcı olmak için varsın.';
    
    // API isteği gövdesi
    const requestBody = {
      contents: [
        {
          role: 'model',
          parts: [{ text: systemMessage }]
        },
        {
          role: 'user', 
          parts: [{ text: userMessage }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048
      }
    };
    
    // İstek zamanlaması
    const startTime = Date.now();
    
    // API isteği gönder
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify(requestBody),
      signal: AbortSignal.timeout(15000) // 15 saniye zaman aşımı
    });
    
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    console.log('API Durum Kodu:', response.status);
    console.log('Yanıt Süresi:', responseTime, 'ms');
    
    // Yanıt metnini al
    const responseText = await response.text();
    console.log('Ham Yanıt Alındı. Yanıt Uzunluğu:', responseText.length);
    
    if (!response.ok) {
      console.error('API Hatası:', response.status, response.statusText);
      return standardApiResponse({
        success: false,
        error: `API Hatası: ${response.status} ${response.statusText}`,
        errorDetails: responseText,
        requestTime: responseTime
      }, {
        success: false,
        status: 500,
        message: 'Gemini API yanıt vermedi'
      });
    }
    
    try {
      const data = JSON.parse(responseText);
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0].text) {
        console.error('Geçersiz API Yanıt Formatı:', JSON.stringify(data).substring(0, 200) + '...');
        return standardApiResponse({
          success: false,
          error: 'Geçersiz API yanıt formatı',
          rawResponse: data
        }, {
          success: false,
          status: 500,
          message: 'Geçersiz Gemini API yanıtı'
        });
      }
      
      const aiResponse = data.candidates[0].content.parts[0].text;
      console.log('AI Yanıtı Alındı. Uzunluk:', aiResponse.length);
      console.log('Yanıt Önizleme:', aiResponse.substring(0, 50) + '...');
      
      return standardApiResponse({
        success: true,
        message: "BAŞARILI",
        responseTime,
        response: aiResponse,
        requestDetails: {
          messageLength: userMessage.length,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error: any) {
      console.error('JSON Ayrıştırma Hatası:', error);
      return standardApiResponse({
        success: false,
        error: 'JSON ayrıştırma hatası: ' + error.message,
        rawResponse: responseText.substring(0, 500) + '...'
      }, {
        success: false, 
        status: 500,
        message: 'API yanıtı ayrıştırılamadı'
      });
    }
  } catch (error: any) {
    console.error('Endpoint Hatası:', error);
    return standardApiResponse({
      success: false,
      error: error.message || 'Bilinmeyen hata'
    }, {
      success: false,
      status: 500,
      message: 'Test isteği işlenirken bir hata oluştu'
    });
  }
} 