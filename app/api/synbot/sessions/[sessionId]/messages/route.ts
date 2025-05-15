import { NextRequest } from 'next/server';
import { demoSessions } from '../../../route';
import { secureApiRoute, standardApiResponse } from '@/lib/utils/api-security';
import { apiLogger } from '@/lib/utils/api-logger';
import { v4 as uuidv4 } from 'uuid';
import { SynbotInteractionType, SynbotSessionType } from '@/lib/types/SynbotTypes';
import { generateGeminiResponse } from '@/lib/utils/gemini-ai';

export async function GET(request: NextRequest) {
  // Extract the sessionId from the URL
  const sessionId = request.nextUrl.pathname.split('/').pop();
  
  return secureApiRoute(request, async (req: NextRequest, authData) => {
    const userId = authData?.session?.user?.id || 'test-user';
    
    // Oturumu bul
    const synbotSession = demoSessions.find((s: any) => s.id === sessionId);
    
    if (!synbotSession) {
      return standardApiResponse(null, {
        success: false,
        status: 404,
        message: 'Oturum bulunamadı'
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

    // Messages formatını oluştur
    const messages = synbotSession.messages.map((msg: any) => ({
      id: msg.id,
      content: msg.content,
      role: msg.role,
      timestamp: msg.timestamp,
      type: SynbotInteractionType.CHAT,
      confidence: msg.role === 'assistant' ? 0.92 : undefined
    }));
    
    return standardApiResponse({
      success: true,
      messages
    });
  }, {
    allowedRoles: ['admin', 'manager', 'trainer', 'user'],
    operationName: 'Synbot Mesajları Getirme',
    skipRoleCheck: true // Geliştirme sırasında test için
  });
}

export async function POST(request: NextRequest) {
  // Extract the sessionId from the URL
  const sessionId = request.nextUrl.pathname.split('/').pop();
  
  return secureApiRoute(request, async (req: NextRequest, authData) => {
    const userId = authData?.session?.user?.id || 'test-user';
    const body = await req.json();
    
    // İstek formatını kontrol et
    if (!body.content || typeof body.content !== 'string') {
      return standardApiResponse(null, {
        success: false,
        status: 400,
        message: 'Geçersiz istek formatı: content alanı gereklidir ve string olmalıdır'
      });
    }
    
    // Oturumu bul
    const sessionIndex = demoSessions.findIndex((s: any) => s.id === sessionId);
    
    if (sessionIndex === -1) {
      return standardApiResponse(null, {
        success: false,
        status: 404,
        message: 'Oturum bulunamadı'
      });
    }
    
    // Oturum kullanıcıya ait değilse ve kullanıcı admin değilse erişim reddet
    if (demoSessions[sessionIndex].userId !== userId && authData?.session?.user?.role !== 'admin') {
      apiLogger.logSecurity(req, 'Başka kullanıcıya ait Synbot oturumuna mesaj gönderme girişimi', {
        userId,
        sessionId
      });
      
      return standardApiResponse(null, {
        success: false,
        status: 403,
        message: 'Bu oturuma mesaj gönderme yetkiniz bulunmuyor'
      });
    }
    
    // Kullanıcı mesajı ekle
    const userMessageId = uuidv4();
    const userMessage = {
      id: userMessageId,
      content: body.content,
      role: 'user' as const,
      timestamp: new Date()
    };
    
    demoSessions[sessionIndex].messages.push(userMessage);
    
    // İstek loglama
    apiLogger.logAuth(req, true, userId, authData?.session?.user?.role, {
      action: 'synbot-user-message',
      sessionId,
      messageId: userMessageId
    });
    
    // Mesaj geçmişini formatla
    const previousMessages = demoSessions[sessionIndex].messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model' as 'user' | 'model',
      parts: [{ text: msg.content }]
    }));
    
    try {
      // SynBot yanıtını Gemini API'sinden al
      const geminiResponse = await generateGeminiResponse(
        body.content,
        sessionId || '',
        userId,
        SynbotSessionType.CHAT,
        previousMessages
      );
      
      // Bot yanıtını ekle
      const botMessageId = uuidv4();
      const botMessage = {
        id: botMessageId,
        content: geminiResponse.content,
        role: 'assistant' as const,
        timestamp: new Date()
      };
      
      demoSessions[sessionIndex].messages.push(botMessage);
      demoSessions[sessionIndex].updatedAt = new Date();
      
      return standardApiResponse({
        success: true,
        userMessage: {
          id: userMessageId,
          content: body.content,
          role: 'user',
          timestamp: userMessage.timestamp
        },
        botMessage: {
          id: botMessageId,
          content: geminiResponse.content,
          role: 'assistant',
          timestamp: botMessage.timestamp,
          type: geminiResponse.type,
          confidence: geminiResponse.confidence
        }
      });
    } catch (error: any) {
      console.error("Gemini API hatası:", error);
      
      // Hata durumunda basit bir yanıt oluştur
      const botMessageId = uuidv4();
      const errorMessage = {
        id: botMessageId,
        content: "Üzgünüm, şu anda yanıt oluşturamıyorum. Lütfen daha sonra tekrar deneyin.",
        role: 'assistant' as const,
        timestamp: new Date()
      };
      
      demoSessions[sessionIndex].messages.push(errorMessage);
      
      return standardApiResponse({
        success: false,
        userMessage: {
          id: userMessageId,
          content: body.content,
          role: 'user',
          timestamp: userMessage.timestamp
        },
        botMessage: {
          id: botMessageId,
          content: errorMessage.content,
          role: 'assistant',
          timestamp: errorMessage.timestamp,
          type: SynbotInteractionType.ERROR_CORRECTION,
          confidence: 0
        }
      }, {
        message: 'Yanıt oluşturulurken bir hata oluştu',
        status: 500
      });
    }
  }, {
    allowedRoles: ['admin', 'manager', 'trainer', 'user'],
    operationName: 'Synbot Mesaj Gönderme',
    skipRoleCheck: true // Geliştirme sırasında test için
  });
}

export async function PUT(request: NextRequest) {
  // Extract the sessionId from the URL
  const sessionId = request.nextUrl.pathname.split('/').pop();
  
  return secureApiRoute(request, async (req: NextRequest, authData) => {
    const userId = authData?.session?.user?.id || 'test-user';
    const body = await req.json();
    
    // İstek gövdesini doğrula
    if (!body.interactionId || !body.feedback) {
      return standardApiResponse(null, {
        success: false,
        status: 400,
        message: 'Geçersiz istek formatı: interactionId ve feedback alanları gereklidir'
      });
    }
    
    // Oturumu bul
    const sessionIndex = demoSessions.findIndex((s: any) => s.id === sessionId);
    
    if (sessionIndex === -1) {
      return standardApiResponse(null, {
        success: false,
        status: 404,
        message: 'Oturum bulunamadı'
      });
    }
    
    // Oturum kullanıcıya ait değilse ve kullanıcı admin değilse erişim reddet
    if (demoSessions[sessionIndex].userId !== userId && authData?.session?.user?.role !== 'admin') {
      apiLogger.logSecurity(req, 'Başka kullanıcıya ait Synbot oturumuna geri bildirim gönderme girişimi', {
        userId,
        sessionId
      });
      
      return standardApiResponse(null, {
        success: false,
        status: 403,
        message: 'Bu oturuma geri bildirim gönderme yetkiniz bulunmuyor'
      });
    }
    
    // Belirtilen etkileşimi bul (botun mesajı)
    const messageIndex = demoSessions[sessionIndex].messages.findIndex((msg: any) => 
      msg.id === body.interactionId && msg.role === 'assistant'
    );
    
    if (messageIndex === -1) {
      return standardApiResponse(null, {
        success: false,
        status: 404,
        message: 'Belirtilen etkileşim bulunamadı'
      });
    }
    
    // Geri bildirimi kaydet (gerçek uygulamada veritabanına kaydedilir)
    // Burada sadece demo verileri üzerinde işlem yaptığımız için gerçek bir kayıt yapılmıyor
    
    // İşlem loglama
    apiLogger.logAuth(req, true, userId, authData?.session?.user?.role, {
      action: 'synbot-feedback',
      sessionId,
      messageId: body.interactionId,
      feedback: body.feedback
    });
    
    return standardApiResponse({
      success: true,
      message: 'Geri bildirim başarıyla kaydedildi',
      sessionId,
      interactionId: body.interactionId,
      feedback: body.feedback
    });
  }, {
    allowedRoles: ['admin', 'manager', 'trainer', 'user'],
    operationName: 'Synbot Geri Bildirim',
    skipRoleCheck: true // Geliştirme sırasında test için
  });
} 