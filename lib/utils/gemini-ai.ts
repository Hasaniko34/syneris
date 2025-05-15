import { SynbotInteractionType, SessionStatus, SynbotSessionType } from '@/lib/types/SynbotTypes';

interface GeminiChatMessage {
  role: 'user' | 'model';
  parts: {
    text: string;
  }[];
}

interface GeminiResponse {
  content: string;
  type: SynbotInteractionType;
  confidence: number;
  metadata?: Record<string, any>;
}

interface GeminiOptions {
  temperature?: number;
  topK?: number;
  topP?: number;
  maxOutputTokens?: number;
}

/**
 * SynBot için Google Gemini API kullanarak yanıt oluşturur (Gerçek entegrasyon için)
 * @param forceMode - True ise her koşulda Gemini API kullanır, hata durumunda açıklayıcı hata verir
 */
export async function generateGeminiResponse(
  userMessage: string,
  sessionId: string,
  userId: string,
  sessionType: SynbotSessionType = SynbotSessionType.CHAT,
  previousMessages: GeminiChatMessage[] = [],
  options: GeminiOptions = {},
  interactionType?: SynbotInteractionType,
  forceMode: boolean = true
): Promise<GeminiResponse> {
  // API anahtarını direkt olarak al
  const apiKey = 'AIzaSyDfJ4ZDvYDsC4Cq8lksklgFJDIzpwKgyxk';
  
  console.log('🔍 DETAYLI LOGLAMA - generateGeminiResponse çağrıldı');
  console.log('Mesaj:', userMessage.substring(0, 30) + (userMessage.length > 30 ? '...' : ''));
  console.log('Force Mode:', forceMode);
  console.log('Session Type:', sessionType);
  console.log('Önceki mesaj sayısı:', previousMessages?.length || 0);
  
  // Varsayılan seçenekler
  const defaultOptions: GeminiOptions = {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 2048
  };

  // Seçenekleri birleştir
  const mergedOptions = { ...defaultOptions, ...options };

  // Oturum türüne göre sistem mesajını oluştur
  let systemMessage = 'Sen Syneris platformunun yapay zeka asistanı olan SynBot\'sun. ';
  
  switch (sessionType) {
    case SynbotSessionType.LEARNING:
      systemMessage += 'Kullanıcıya eğitim içerikleri konusunda rehberlik ediyorsun. Eğitim süreçlerinde yardımcı oluyorsun.';
      break;
    case SynbotSessionType.TASK:
      systemMessage += 'Kullanıcıya görevleri tamamlamasında yardımcı oluyorsun. Adım adım talimatlar veriyorsun.';
      break;
    case SynbotSessionType.PROBLEM_SOLVING:
      systemMessage += 'Kullanıcının karşılaştığı sorunları çözmesine yardımcı oluyorsun. Hataları tespit edip çözüm önerileri sunuyorsun.';
      break;
    default:
      systemMessage += 'Kullanıcıyla Türkçe olarak sohbet ediyorsun, sorularını yanıtlıyorsun ve yardımcı oluyorsun.';
  }

  // Gemini için mesaj geçmişini oluştur
  const chatMessages: GeminiChatMessage[] = [
    {
      role: 'model',
      parts: [{ text: systemMessage }]
    },
    ...previousMessages,
    {
      role: 'user',
      parts: [{ text: userMessage }]
    }
  ];

  try {
    console.log('HTTP isteği başlatılıyor - Doğrudan fetch API');
    
    // API URL'si
    const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
    console.log('URL:', apiUrl);
    
    const requestBody = {
      contents: chatMessages,
      generationConfig: {
        temperature: mergedOptions.temperature,
        topK: mergedOptions.topK,
        topP: mergedOptions.topP,
        maxOutputTokens: mergedOptions.maxOutputTokens
      }
    };
    
    // Gemini API'sine istek gönder - HTTP client olarak 'fetch' kullan
    const startTime = Date.now();
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify(requestBody),
      // 20 saniyelik zaman aşımı
      signal: AbortSignal.timeout(20000)
    });
    const endTime = Date.now();
    
    console.log(`API isteği tamamlandı (${endTime - startTime}ms) - Durum kodu: ${response.status}`);
    
    const responseText = await response.text();
    console.log('Ham yanıt alındı. Uzunluk:', responseText.length);
    
    if (!responseText) {
      throw new Error('API yanıtı boş');
    }
    
    try {
      // Ham yanıtı JSON'a dönüştür
      const data = JSON.parse(responseText);
      
      if (!response.ok) {
        console.error('API hatası:', data.error || 'Bilinmeyen API hatası');
        throw new Error(`Gemini API hatası: ${data.error?.message || 'Bilinmeyen hata'} (${response.status})`);
      }

      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        console.error('Geçersiz yanıt formatı:', data);
        throw new Error('Gemini API beklenmeyen yanıt formatı');
      }

      const aiResponse = data.candidates[0].content.parts[0].text;
      console.log('AI yanıtı alındı, uzunluk:', aiResponse.length);
      console.log('Yanıt (ilk 30 karakter):', aiResponse.substring(0, 30) + '...');

      // Yanıt türünü belirle
      const lowerCaseMessage = userMessage.toLowerCase();
      let responseType = interactionType || SynbotInteractionType.CHAT;
      let confidence = 0.9;

      if (!interactionType) {
        if (
          lowerCaseMessage.includes('eğitim') || 
          lowerCaseMessage.includes('kurs') || 
          lowerCaseMessage.includes('öğren') ||
          sessionType === SynbotSessionType.LEARNING
        ) {
          responseType = SynbotInteractionType.TRAINING_GUIDANCE;
          confidence = 0.95;
        } else if (
          lowerCaseMessage.includes('hata') || 
          lowerCaseMessage.includes('sorun') || 
          lowerCaseMessage.includes('çalışmıyor') ||
          sessionType === SynbotSessionType.PROBLEM_SOLVING
        ) {
          responseType = SynbotInteractionType.ERROR_CORRECTION;
          confidence = 0.85;
        } else if (
          lowerCaseMessage.includes('öner') || 
          lowerCaseMessage.includes('tavsiye')
        ) {
          responseType = SynbotInteractionType.RECOMMENDATION;
          confidence = 0.92;
        }
      }

      console.log('Yanıt başarıyla oluşturuldu, döndürülüyor...');
      
      // ÖNEMLI!!!! simulateGeminiResponse KULLANMIYORUZ, direkt API'den gelen yanıtı döndürüyoruz
      return {
        content: aiResponse,
        type: responseType,
        confidence,
        metadata: {
          sessionContext: { sessionId, userId, sessionType },
          generationTimestamp: new Date().toISOString(),
          modelName: 'gemini-2.0-flash',
          simulated: false, // Bu önemli! Gerçek API yanıtı kullanıyoruz
          apiCallDuration: endTime - startTime,
          promptTokens: data.usage?.promptTokenCount || 0,
          completionTokens: data.usage?.candidatesTokenCount || 0,
          totalTokens: (data.usage?.promptTokenCount || 0) + (data.usage?.candidatesTokenCount || 0),
        }
      };
    } catch (parseError: any) {
      console.error('JSON parse hatası:', parseError);
      throw new Error('API yanıtı geçersiz JSON formatında: ' + parseError.message);
    }
  } catch (error: any) {
    console.error('❌ Gemini API hatası:', error.message);
    console.error('Stack trace:', error.stack);
    
    // Gerçek hatayı kullanıcıya göster - simulateGeminiResponse ÇAĞIRMA!
    return {
      content: `⚠️ Gemini AI yanıtı üretilirken bir hata oluştu: ${error.message}. Bu statik bir yanıt değil, gerçek bir hata mesajıdır. Lütfen sistem yöneticinize bildirin.`,
      type: SynbotInteractionType.ERROR_CORRECTION, 
      confidence: 0.5,
      metadata: {
        simulated: false, // Kritik önem taşıyor
        error: error.message,
        sessionContext: { sessionType },
        generationTimestamp: new Date().toISOString()
      }
    };
  }
}

/**
 * API anahtarı olmadığında veya hata durumunda kullanılacak simüle edilmiş yanıt fonksiyonu
 * NOT: Bu fonksiyon artık çağrılmamaktadır. Tarihsel olarak saklanmıştır.
 * @deprecated Bu fonksiyon artık kullanılmamaktadır. Gerçek API yanıtları için generateGeminiResponse kullanın.
 */
function simulateGeminiResponse(
  userMessage: string, 
  sessionType: SynbotSessionType,
  interactionType?: SynbotInteractionType
): GeminiResponse {
  // ÖZEL UYARI!
  console.error('⛔ SİMÜLASYON YANITI ÇAĞRILDI - BU YANIT OTOMATİK ÜRETİLMİŞTİR');
  console.error('⚠️ Bu işlev artık kullanılmamalıdır. Statik yanıtlar kullanmak yerine API hata mesajı döndürün.');
  
  const errorMsg = `[HATA] Bu yanıt, gerçek bir Gemini API yanıtı değil, statik bir yanıttır. Bu bir hatadır ve bu mesajı görüyorsanız, lütfen sistem yöneticinize bildirin.`;
  
  // Hata yanıtını döndür
  return {
    content: errorMsg,
    type: SynbotInteractionType.ERROR_CORRECTION,
    confidence: 0.1,
    metadata: {
      simulated: true,
      error: 'Statik yanıt kullanımı tespit edildi',
      sessionContext: { sessionType },
      generationTimestamp: new Date().toISOString()
    }
  };
}

/**
 * Eğitim içeriği analizi yaparak öneriler oluşturur
 */
export async function analyzeTrainingContent(
  content: string,
  userId: string,
  metadata?: Record<string, any>
): Promise<{
  suggestions: string[];
  keywords: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTimeMinutes: number;
  confidence: number;
}> {
  try {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error('Google Gemini API anahtarı bulunamadı');
    }

    const prompt = `
    Aşağıdaki eğitim içeriğini analiz et ve şu bilgileri JSON formatında döndür:
    - suggestions: İçerikle ilgili en az 3 öneri (array of strings)
    - keywords: İçerikle ilgili en az 5 anahtar kelime (array of strings)
    - difficulty: İçeriğin zorluk seviyesi (beginner, intermediate veya advanced)
    - estimatedTimeMinutes: İçeriği tamamlamak için tahmini süre (dakika cinsinden, number)
    - confidence: Analiz güven skoru (0-1 arası, number)

    İçerik:
    ${content}

    Sadece JSON formatında yanıt ver, başka bir şey ekleme.
    `;

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024
        }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`Gemini API hatası: ${data.error?.message || 'Bilinmeyen hata'}`);
    }

    const aiResponse = data.candidates[0].content.parts[0].text;
    
    // JSON yanıtını parse et
    const cleanJsonString = aiResponse.replace(/```json|```/g, '').trim();
    const result = JSON.parse(cleanJsonString);

    return {
      suggestions: result.suggestions || [],
      keywords: result.keywords || [],
      difficulty: result.difficulty || 'intermediate',
      estimatedTimeMinutes: result.estimatedTimeMinutes || 30,
      confidence: result.confidence || 0.8
    };
  } catch (error: any) {
    console.error('İçerik analizi hatası:', error);
    
    // Hata durumunda varsayılan değerler döndür
    return {
      suggestions: ['İçerik için daha fazla örnek ekleyin', 'Görsel materyallerle destekleyin', 'Pratik alıştırmalar ekleyin'],
      keywords: ['eğitim', 'içerik', 'öğrenme', 'platform', 'syneris'],
      difficulty: 'intermediate',
      estimatedTimeMinutes: 30,
      confidence: 0.6
    };
  }
}

/**
 * Kullanıcı etkileşimlerini analiz ederek önerilerde bulunur
 */
export async function analyzeUserInteractions(
  interactions: Array<{
    content: string;
    isUserMessage: boolean;
    createdAt: Date;
    metadata?: Record<string, any>;
  }>,
  userId: string
): Promise<{
  learningPattern: string;
  strengths: string[];
  improvementAreas: string[];
  recommendations: string[];
  engagementScore: number;
}> {
  try {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error('Google Gemini API anahtarı bulunamadı');
    }

    // Etkileşimleri metne dönüştür
    const interactionsText = interactions.map(interaction => {
      const role = interaction.isUserMessage ? 'Kullanıcı' : 'SynBot';
      const date = new Date(interaction.createdAt).toLocaleString('tr-TR');
      return `[${date}] ${role}: ${interaction.content}`;
    }).join('\n\n');

    const prompt = `
    Aşağıdaki kullanıcı-SynBot etkileşimlerini analiz et ve şu bilgileri JSON formatında döndür:
    - learningPattern: Kullanıcının öğrenme tarzı hakkında kısa bir açıklama (string)
    - strengths: Kullanıcının güçlü yanları (array of strings, en az 2 madde)
    - improvementAreas: Kullanıcının geliştirmesi gereken alanlar (array of strings, en az 2 madde)
    - recommendations: Kullanıcıya öneriler (array of strings, en az 3 madde)
    - engagementScore: Kullanıcının etkileşim skoru (0-10 arası, number)

    Etkileşimler:
    ${interactionsText}

    Sadece JSON formatında yanıt ver, başka bir şey ekleme.
    `;

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.3,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024
        }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`Gemini API hatası: ${data.error?.message || 'Bilinmeyen hata'}`);
    }

    const aiResponse = data.candidates[0].content.parts[0].text;
    
    // JSON yanıtını parse et
    const cleanJsonString = aiResponse.replace(/```json|```/g, '').trim();
    const result = JSON.parse(cleanJsonString);

    return {
      learningPattern: result.learningPattern || 'Aktif öğrenme',
      strengths: result.strengths || ['Soru sorma becerisi', 'Konuya ilgi'],
      improvementAreas: result.improvementAreas || ['Düzenli çalışma', 'Detaylara odaklanma'],
      recommendations: result.recommendations || ['Daha fazla pratik yapın', 'Düzenli aralıklarla tekrar edin', 'İlgili kaynaklara göz atın'],
      engagementScore: result.engagementScore || 7
    };
  } catch (error: any) {
    console.error('Etkileşim analizi hatası:', error);
    
    // Hata durumunda varsayılan değerler döndür
    return {
      learningPattern: 'Belirlenemedi',
      strengths: ['Soru sorma becerisi', 'Aktif katılım'],
      improvementAreas: ['Düzenli çalışma', 'Detaylara odaklanma'],
      recommendations: ['Daha fazla pratik yapın', 'Düzenli aralıklarla tekrar edin', 'İlgili kaynaklara göz atın'],
      engagementScore: 6
    };
  }
}

/**
 * Hata mesajlarını analiz ederek çözüm önerileri sunar
 */
export async function analyzeErrorAndSuggestFix(
  errorMessage: string,
  context?: string
): Promise<{
  errorType: string;
  possibleCauses: string[];
  suggestedFixes: string[];
  confidence: number;
}> {
  try {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error('Google Gemini API anahtarı bulunamadı');
    }

    const prompt = `
    Aşağıdaki hata mesajını analiz et ve çözüm önerileri sun. Yanıtı JSON formatında döndür:
    - errorType: Hata türü (string)
    - possibleCauses: Olası nedenler (array of strings)
    - suggestedFixes: Önerilen çözümler (array of strings)
    - confidence: Çözüm önerilerinin güven skoru (0-1 arası, number)

    Hata Mesajı:
    ${errorMessage}
    
    ${context ? `Ek Bağlam:\n${context}` : ''}

    Sadece JSON formatında yanıt ver, başka bir şey ekleme.
    `;

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024
        }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`Gemini API hatası: ${data.error?.message || 'Bilinmeyen hata'}`);
    }

    const aiResponse = data.candidates[0].content.parts[0].text;
    
    // JSON yanıtını parse et
    const cleanJsonString = aiResponse.replace(/```json|```/g, '').trim();
    const result = JSON.parse(cleanJsonString);

    return {
      errorType: result.errorType || 'Bilinmeyen hata',
      possibleCauses: result.possibleCauses || ['Belirlenemedi'],
      suggestedFixes: result.suggestedFixes || ['Daha fazla bilgi gerekli'],
      confidence: result.confidence || 0.5
    };
  } catch (error: any) {
    console.error('Hata analizi hatası:', error);
    
    // Hata durumunda varsayılan değerler döndür
    return {
      errorType: 'Bilinmeyen hata',
      possibleCauses: ['API veya servis hatası', 'Geçersiz veri formatı'],
      suggestedFixes: ['Yeniden deneyin', 'Teknik destek ekibiyle iletişime geçin'],
      confidence: 0.4
    };
  }
}

/**
 * TEB çalışanlarına özel kurumsal e-posta taslağı üretir (Gemini API ile)
 */
export async function generateGeminiEmail(subject: string, context: string): Promise<string> {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY || 'TEMP_API_KEY_FOR_DEVELOPMENT';
  const prompt = `Aşağıda verilen konu ve açıklamaya uygun, TEB Bankası çalışanlarının kullanabileceği kurumsal ve profesyonel bir e-posta taslağı oluştur. E-posta Türkçe ve resmi dille yazılmalı, selamlama ve kapanış cümleleri de dahil olmalı. Gerekiyorsa müşteri veya ekip arkadaşına yönelik uygun hitaplar kullan. Sadece e-posta gövdesini döndür.

Konu: ${subject}
Açıklama: ${context}`;

  if (!apiKey || apiKey === 'TEMP_API_KEY_FOR_DEVELOPMENT') {
    // Simüle edilmiş e-posta
    return `Sayın Yetkili,\n\n${context}\n\nBilgilerinize sunar, iyi çalışmalar dilerim.\nTEB Bankası`;
  }

  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey
    },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.3,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 512
      }
    })
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || 'Gemini API hatası');
  }
  const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!aiResponse) {
    throw new Error('Gemini API beklenmeyen yanıt formatı');
  }
  return aiResponse.trim();
} 