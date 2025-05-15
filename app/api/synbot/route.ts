import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { generateGeminiResponse } from '@/lib/utils/gemini-ai';
import { SynbotInteractionType, SynbotSessionType } from '@/lib/types/SynbotTypes';
import { secureApiRoute, standardApiResponse } from '@/lib/utils/api-security';
import { apiLogger } from '@/lib/utils/api-logger';

// SynBot mesaj tanımlamaları
type MessageRole = 'user' | 'assistant';

interface Message {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: Date;
}

interface Session {
  id: string;
  userId: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

// Demo oturumları ve mesajları (gerçek uygulamada bunlar veritabanında saklanacak)
export const demoSessions: Session[] = [
  {
    id: 'session-1',
    userId: 'demo-user',
    title: 'React Hooks Hakkında',
    messages: [
      {
        id: 'msg-1',
        content: "React useEffect hook'u nasıl kullanılır?",
        role: 'user',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 gün önce
      },
      {
        id: 'msg-2',
        content: 'useEffect hook\'u, bir React bileşeninde yan etkileri yönetmek için kullanılır. Temel kullanımı şu şekildedir:\n\n```javascript\nimport { useEffect, useState } from "react";\n\nfunction Component() {\n  const [data, setData] = useState(null);\n\n  useEffect(() => {\n    // Yan etki kodları (örn. API çağrısı)\n    const fetchData = async () => {\n      const response = await fetch(\'https://api.example.com/data\');\n      const result = await response.json();\n      setData(result);\n    };\n\n    fetchData();\n\n    // Cleanup fonksiyonu (isteğe bağlı)\n    return () => {\n      // Temizleme işlemleri\n    };\n  }, []); // Bağımlılık dizisi\n\n  return <div>{/* Bileşen içeriği */}</div>;\n}\n```\n\nBağımlılık dizisi boş olduğunda, useEffect yalnızca bileşen monte edildiğinde çalışır. Belirli değişkenlere bağlı olarak çalışmasını isterseniz, bu değişkenleri diziye ekleyebilirsiniz.',
        role: 'assistant',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000 + 30000) // 30 saniye sonra
      }
    ],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000 + 30000)
  }
];

// İstek şemaları
const messageSchema = z.object({
  message: z.string().min(1, 'Mesaj boş olamaz'),
  sessionId: z.string().optional(),
  type: z.nativeEnum(SynbotInteractionType).optional()
});

// Oturum başlık güncelleme şeması
const updateSessionSchema = z.object({
  sessionId: z.string().min(1, 'Oturum ID gereklidir'),
  title: z.string().min(1, 'Başlık boş olamaz')
});

// DOĞRUDAN GEMINI API ÇAĞIRMA FONKSİYONU
const directGeminiCall = async (message: string): Promise<string> => {
  console.log('🔄 Doğrudan Gemini API çağrısı yapılıyor...');
  console.log('Kullanıcı mesajı:', message);
  
  try {
    const apiKey = 'AIzaSyDfJ4ZDvYDsC4Cq8lksklgFJDIzpwKgyxk';
    
    // Sistem talimatı
    const systemMessage = 'Sen Syneris platformunun yapay zeka asistanı olan SynBot\'sun. Turkcell çalışanlarına telekomünikasyon ürünleri, sistemleri ve süreçleri hakkında yardımcı olmak için varsın.';
    
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
            parts: [{ text: systemMessage }]
          },
          {
            role: 'user',
            parts: [{ text: message }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048
        }
      }),
      signal: AbortSignal.timeout(15000) // 15 saniye zaman aşımı
    });
    
    console.log('API Durum Kodu:', response.status);
    
    if (!response.ok) {
      throw new Error(`API Hatası: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Geçersiz API yanıt formatı');
    }
    
    const aiResponse = data.candidates[0].content.parts[0].text;
    console.log('API Yanıtı Alındı. Uzunluk:', aiResponse.length);
    
    return aiResponse;
  } catch (error: any) {
    console.error('Doğrudan API çağrısı hatası:', error);
    return `⚠️ API hatası oluştu: ${error.message}. Bu bir statik yanıt değil, gerçek bir hata mesajıdır.`;
  }
};

// POST: Yeni mesaj gönder
export async function POST(req: NextRequest) {
  return secureApiRoute(req, async (req: NextRequest, authData) => {
    const body = await req.json();
    const userId = authData?.session?.user?.id || 'test-user-id';
    
    // API çağrısını zorlamak için özel başlık kontrolü
    const forceFlag = req.headers.get('X-Force-API') === 'true';
    // Frontend'den gelen zorlama bayrağı
    const forceParam = body._force === true;
    
    console.log('⚙️ API ÇAĞRISI AYARLARI:');
    console.log('- Force Flag (Başlık):', forceFlag);
    console.log('- Force Param (Body):', forceParam);
    console.log('- Önbellek kontrolü (Timestamp):', body._timestamp);
    
    // İsteği doğrula
    const result = messageSchema.safeParse(body);
    if (!result.success) {
      return standardApiResponse(null, {
        success: false,
        status: 400,
        message: 'Geçersiz istek formatı: ' + result.error.message
      });
    }
    
    const { message, sessionId, type } = result.data;
    
    // Eğer bir oturum ID'si verildiyse, mevcut oturumu kullan
    // Aksi takdirde yeni bir oturum oluştur
    let currentSession: Session;
    let isNewSession = false;
    
    if (sessionId) {
      // Oturum kullanıcıya ait mi kontrol et
      const existingSession = demoSessions.find(s => s.id === sessionId);
      
      if (existingSession && existingSession.userId !== userId) {
        apiLogger.logSecurity(req, 'Başka kullanıcıya ait Synbot oturumuna erişim girişimi', {
          userId,
          sessionId
        });
        
        return standardApiResponse(null, {
          success: false,
          status: 403,
          message: 'Bu oturuma erişim yetkiniz bulunmuyor'
        });
      }
      
      currentSession = existingSession || {
        id: uuidv4(),
        userId,
        title: message.substring(0, 30) + (message.length > 30 ? '...' : ''),
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      if (!existingSession) {
        isNewSession = true;
        demoSessions.push(currentSession);
      }
    } else {
      // Yeni oturum oluştur
      currentSession = {
        id: uuidv4(),
        userId,
        title: message.substring(0, 30) + (message.length > 30 ? '...' : ''),
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      isNewSession = true;
      demoSessions.push(currentSession);
    }
    
    // Kullanıcı mesajını ekle
    const userMessageId = uuidv4();
    currentSession.messages.push({
      id: userMessageId,
      content: message,
      role: 'user',
      timestamp: new Date()
    });
    
    // İstek loglama
    apiLogger.logAuth(req, true, userId, authData?.session?.user?.role, {
      action: 'synbot-message',
      sessionId: currentSession.id,
      messageId: userMessageId
    });
    
    // Mesaj geçmişini formatla
    const previousMessages = currentSession.messages.slice(0, -1).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model' as 'user' | 'model',
      parts: [{ text: msg.content }]
    }));
    
    try {
      // ÖZEL TEST: "özel test" içeren mesajları veya force bayraklarını kontrol et
      const forceDirectAPI = message.toLowerCase().includes('özel test') || forceFlag || forceParam;
      
      if (forceDirectAPI) {
        console.log('⚠️ ZORUNLU DİREKT API ÇAĞRISI AKTİF');
        // Doğrudan API çağrısı yap
        const geminiResponse = await directGeminiCall(message);
        
        // API yanıtını ekle
        const botMessageId = uuidv4();
        currentSession.messages.push({
          id: botMessageId,
          content: geminiResponse,
          role: 'assistant',
          timestamp: new Date()
        });
        
        // Oturumu güncelle
        currentSession.updatedAt = new Date();
        
        return standardApiResponse({
          success: true,
          messageId: botMessageId,
          response: geminiResponse,
          type: SynbotInteractionType.CHAT,
          sessionId: currentSession.id,
          isNewSession,
          timestamp: new Date(),
          confidence: 0.9,
          metadata: {
            simulated: false,
            forceDirectAPI: true,
            sessionContext: { sessionId: currentSession.id, userId, sessionType: SynbotSessionType.CHAT },
            generationTimestamp: new Date().toISOString()
          }
        }, {
          message: 'Gemini API direkt çağrısı başarılı'
        });
      }
      
      // Normal yanıt süreci devam ediyor
      console.log('forceMode: true ile Gemini API çağrısı yapılıyor');
      const geminiResponse = await generateGeminiResponse(
        message,
        currentSession.id,
        userId,
        SynbotSessionType.CHAT,
        previousMessages,
        undefined,
        type,
        true // Force mode - her durumda Gemini API'yi kullan, fallback mekanizmasını devre dışı bırak
      );
      
      console.log('Gemini API yanıtı alındı:', geminiResponse.metadata?.simulated ? 'Simüle' : 'Gerçek', 'Güven:', geminiResponse.confidence);
      console.log('Yanıt içeriği (kısmi):', geminiResponse.content.substring(0, 50) + '...');
      console.log('Metadata:', JSON.stringify(geminiResponse.metadata));
      
      // Bot yanıtını ekle
      const botMessageId = uuidv4();
      currentSession.messages.push({
        id: botMessageId,
        content: geminiResponse.content,
        role: 'assistant',
        timestamp: new Date()
      });
      
      // Oturumu güncelle
      currentSession.updatedAt = new Date();
      
      return standardApiResponse({
        success: true,
        messageId: botMessageId,
        response: geminiResponse.content,
        type: geminiResponse.type,
        sessionId: currentSession.id,
        isNewSession,
        timestamp: new Date(),
        confidence: geminiResponse.confidence,
        metadata: geminiResponse.metadata
      }, {
        message: 'Synbot yanıtı başarıyla oluşturuldu'
      });
    } catch (error) {
      console.error("Gemini API hatası (detaylı):", error);
      console.error("Hata türü:", typeof error);
      
      if (error instanceof Error) {
        console.error("Hata mesajı:", error.message);
        console.error("Hata stack trace:", error.stack);
      }
      
      // Hata mesajı oluştur ve bot yanıtı olarak ekle
      const errorMessageId = uuidv4();
      const errorMessage = "Gemini API hatası: " + (error instanceof Error ? error.message : String(error)) + 
                          "\n\nBu bir gerçek hata mesajıdır, statik yanıt değildir. Teknik ekibinizle görüşün.";
      
      // Hata mesajını oturuma ekle
      currentSession.messages.push({
        id: errorMessageId,
        content: errorMessage,
        role: 'assistant',
        timestamp: new Date()
      });
      
      // Oturumu güncelle
      currentSession.updatedAt = new Date();
      
      return standardApiResponse({
        success: false,
        messageId: errorMessageId,
        response: errorMessage,
        type: SynbotInteractionType.ERROR_CORRECTION,
        sessionId: currentSession.id,
        isNewSession,
        timestamp: new Date(),
        confidence: 0,
        metadata: {
          simulated: false,
          error: error instanceof Error ? error.message : String(error),
          sessionContext: { sessionId: currentSession.id, userId, sessionType: SynbotSessionType.CHAT },
          generationTimestamp: new Date().toISOString()
        }
      }, {
        success: false,
        message: 'Gemini API yanıtı oluşturulamadı',
        status: 500
      });
    }
  }, {
    allowedRoles: ['admin', 'manager', 'trainer', 'user'],
    operationName: 'Synbot Mesaj Gönderme',
    skipRoleCheck: true // Geliştirme sırasında test için
  });
}

// GET: Oturumları veya oturum mesajlarını getir
export async function GET(req: NextRequest) {
  return secureApiRoute(req, async (req: NextRequest, authData) => {
    const url = new URL(req.url);
    const sessionId = url.searchParams.get('sessionId');
    const userId = authData?.session?.user?.id || 'test-user';
    
    // Belirli bir oturumun mesajlarını istiyorsa
    if (sessionId) {
      const synbotSession = demoSessions.find(s => s.id === sessionId);
      
      // Oturum bulunamadı
      if (!synbotSession) {
        // Test veya geliştirme ortamında "demo" mesajlar gönder (API test kolaylığı)
        const demoMessageId = uuidv4();
        const greeting = "Merhaba! Ben TEB Asistan. Size nasıl yardımcı olabilirim?";
        
        return standardApiResponse({
          interactions: [{
            _id: demoMessageId,
            userMessage: "Nasıl yardımcı olabilirim?",
            botResponse: greeting,
            type: "chat",
            timestamp: new Date(),
          }],
          messages: [
            {
              id: demoMessageId,
              content: greeting,
              role: "assistant",
              timestamp: new Date(),
              type: SynbotInteractionType.CHAT,
              confidence: 0.95
            }
          ]
        }, {
          message: 'Test mesajları başarıyla alındı'
        });
      }
      
      // Oturum kullanıcıya ait değilse ve kullanıcı admin değilse erişim reddet
      if (synbotSession.userId !== userId && authData?.session?.user?.role !== 'admin') {
        apiLogger.logSecurity(req, 'Başka kullanıcıya ait Synbot oturumuna erişim girişimi', {
          userId,
          sessionId
        });
        
        return standardApiResponse(null, {
          success: false,
          status: 403,
          message: 'Bu oturuma erişim yetkiniz bulunmuyor'
        });
      }
      
      // İstek loglama
      apiLogger.logAuth(req, true, userId, authData?.session?.user?.role, {
        action: 'get-synbot-session',
        sessionId
      });
      
      // Yanıt olarak oturum mesajlarından etkileşimler oluştur
      const interactions = synbotSession.messages.reduce((acc: any[], currMsg, idx, arr) => {
        if (currMsg.role === 'user' && idx + 1 < arr.length && arr[idx + 1].role === 'assistant') {
          acc.push({
            _id: currMsg.id,
            userMessage: currMsg.content,
            botResponse: arr[idx + 1].content,
            type: "chat",
            timestamp: currMsg.timestamp
          });
        }
        return acc;
      }, []);
      
      // Messages formatında da gönder
      const messages = synbotSession.messages.map(msg => ({
        id: msg.id,
        content: msg.content,
        role: msg.role,
        timestamp: msg.timestamp,
        type: SynbotInteractionType.CHAT,
        confidence: msg.role === 'assistant' ? 0.95 : undefined
      }));
      
      return standardApiResponse({
        interactions,
        messages
      }, {
        message: 'Oturum mesajları başarıyla alındı'
      });
    }
    
    // Tüm oturumları istiyorsa
    let userSessions = demoSessions;
    
    // Admin olmayan kullanıcılar sadece kendi oturumlarını görebilir
    if (authData.session.user.role !== 'admin') {
      userSessions = demoSessions.filter(s => s.userId === userId);
    }
    
    const sessionList = userSessions.map(s => ({
      id: s.id,
      title: s.title,
      messageCount: s.messages.length,
      lastMessage: s.messages.length > 0 
        ? s.messages[s.messages.length - 1].content.substring(0, 50) 
        : '',
      createdAt: s.createdAt,
      updatedAt: s.updatedAt
    }));
    
    return standardApiResponse({
      sessions: sessionList
    }, {
      message: 'Oturumlar başarıyla alındı'
    });
  }, {
    allowedRoles: ['admin', 'manager', 'trainer', 'user'],
    operationName: 'Synbot Oturumları Getirme',
    skipRoleCheck: true // Geliştirme sırasında test için
  });
}

// PUT: Oturum başlığını güncelle
export async function PUT(req: NextRequest) {
  return secureApiRoute(req, async (req: NextRequest, authData) => {
    const body = await req.json();
    const userId = authData?.session?.user?.id || 'test-user';
    
    // İsteği doğrula
    const result = updateSessionSchema.safeParse(body);
    if (!result.success) {
      return standardApiResponse(null, {
        success: false,
        status: 400,
        message: 'Geçersiz istek formatı: ' + result.error.message
      });
    }
    
    const { sessionId, title } = result.data;
    
    // Oturumu bul
    const sessionIndex = demoSessions.findIndex(s => s.id === sessionId);
    
    // Oturum bulunamadı
    if (sessionIndex === -1) {
      return standardApiResponse(null, {
        success: false,
        status: 404,
        message: 'Oturum bulunamadı'
      });
    }
    
    // Oturum kullanıcıya ait değilse erişim reddet
    if (demoSessions[sessionIndex].userId !== userId && authData?.session?.user?.role !== 'admin') {
      apiLogger.logSecurity(req, 'Başka kullanıcıya ait Synbot oturumunu güncelleme girişimi', {
        userId,
        sessionId
      });
      
      return standardApiResponse(null, {
        success: false,
        status: 403,
        message: 'Bu oturumu güncelleme yetkiniz bulunmuyor'
      });
    }
    
    // Oturum başlığını güncelle
    demoSessions[sessionIndex].title = title;
    demoSessions[sessionIndex].updatedAt = new Date();
    
    return standardApiResponse({
      sessionId,
      title,
      updatedAt: demoSessions[sessionIndex].updatedAt
    }, {
      message: 'Oturum başlığı başarıyla güncellendi'
    });
  }, {
    allowedRoles: ['admin', 'manager', 'trainer', 'user'],
    operationName: 'Synbot Oturum Başlığı Güncelleme',
    skipRoleCheck: true // Geliştirme sırasında test için
  });
}

// DELETE: Oturumu sil
export async function DELETE(req: NextRequest) {
  return secureApiRoute(req, async (req: NextRequest, authData) => {
    const url = new URL(req.url);
    const sessionId = url.searchParams.get('sessionId');
    const userId = authData?.session?.user?.id || 'test-user';
    
    // SessionId yoksa hata döndür
    if (!sessionId) {
      return standardApiResponse(null, {
        success: false,
        status: 400,
        message: 'Oturum ID belirtilmedi'
      });
    }
    
    // Oturumu bul
    const sessionIndex = demoSessions.findIndex(s => s.id === sessionId);
    
    // Oturum bulunamadı
    if (sessionIndex === -1) {
      return standardApiResponse(null, {
        success: false,
        status: 404,
        message: 'Oturum bulunamadı'
      });
    }
    
    // Oturum kullanıcıya ait değilse erişim reddet
    if (demoSessions[sessionIndex].userId !== userId && authData?.session?.user?.role !== 'admin') {
      apiLogger.logSecurity(req, 'Başka kullanıcıya ait Synbot oturumunu silme girişimi', {
        userId,
        sessionId
      });
      
      return standardApiResponse(null, {
        success: false,
        status: 403,
        message: 'Bu oturumu silme yetkiniz bulunmuyor'
      });
    }
    
    // Oturumu sil
    const deletedSession = demoSessions.splice(sessionIndex, 1)[0];
    
    return standardApiResponse({
      sessionId,
      title: deletedSession.title,
      deletedAt: new Date()
    }, {
      message: 'Oturum başarıyla silindi'
    });
  }, {
    allowedRoles: ['admin', 'manager', 'trainer', 'user'],
    operationName: 'Synbot Oturumu Silme',
    skipRoleCheck: true // Geliştirme sırasında test için
  });
} 