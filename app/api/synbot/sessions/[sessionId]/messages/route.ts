import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { z } from 'zod';
import { getSessionById, updateSession } from '@/lib/models/SynbotSession';
import {
  createInteraction,
  getSessionInteractions,
  getInteractionById,
  SynbotInteractionType,
  FeedbackType
} from '@/lib/models/SynbotInteraction';
import { ISynbotInteraction } from '@/lib/types/SynbotTypes';
import { generateGeminiResponse } from '@/lib/utils/gemini-ai';
import mongoose from 'mongoose';
import { dbConnect } from '@/lib/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { secureApiRoute, standardApiResponse } from '@/lib/utils/api-security';
import { apiLogger } from '@/lib/utils/api-logger';
import { SynbotSessionType } from '@/lib/types/SynbotTypes';

// Oturum verisi ve mesajları (gerçek uygulamada veritabanından gelecek)
import { demoSessions } from '../../../route';

// Hata işleme yardımcı fonksiyonu
function handleError(error: any) {
  console.error('SynBot Mesaj API Hatası:', error);
  return NextResponse.json(
    { error: 'İşlem sırasında bir hata oluştu', details: error.message },
    { status: 500 }
  );
}

// Doğrulama şemaları
const createMessageSchema = z.object({
  content: z.string().min(1, 'Mesaj içeriği boş olamaz').max(5000, 'Mesaj çok uzun'),
  isUserMessage: z.boolean().default(true),
  type: z.nativeEnum(SynbotInteractionType).optional(),
  metadata: z.record(z.any()).optional(),
});

const feedbackSchema = z.object({
  interactionId: z.string(),
  feedback: z.nativeEnum(FeedbackType),
  note: z.string().optional(),
});

// GET: Oturuma ait mesajları getir
export async function GET(
  req: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  return secureApiRoute(req, async (req: NextRequest, authData) => {
    const { sessionId } = params;
    const userId = authData?.session?.user?.id || 'test-user';
    
    // Oturumu bul
    const synbotSession = demoSessions.find(s => s.id === sessionId);
    
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
    const messages = synbotSession.messages.map(msg => ({
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

// POST: Yeni mesaj ekle
export async function POST(
  req: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  return secureApiRoute(req, async (req: NextRequest, authData) => {
    const { sessionId } = params;
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
    const sessionIndex = demoSessions.findIndex(s => s.id === sessionId);
    
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
    const previousMessages = demoSessions[sessionIndex].messages.slice(0, -1).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model' as 'user' | 'model',
      parts: [{ text: msg.content }]
    }));
    
    try {
      // SynBot yanıtını Gemini API'sinden al
      const geminiResponse = await generateGeminiResponse(
        body.content,
        sessionId,
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

// PUT: Mesaj güncelle (geribildirim ekle)
export async function PUT(
  req: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  return secureApiRoute(req, async (req: NextRequest, authData) => {
    const { sessionId } = params;
    const userId = authData?.session?.user?.id || 'test-user';
    const body = await req.json();
    
    // İstek formatını kontrol et
    if (!body.messageId || !body.feedback) {
      return standardApiResponse(null, {
        success: false,
        status: 400,
        message: 'Geçersiz istek formatı: messageId ve feedback alanları gereklidir'
      });
    }
    
    const { messageId, feedback, note } = body;
    
    // Oturumu bul
    const sessionIndex = demoSessions.findIndex(s => s.id === sessionId);
    
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
    
    // Mesajı bul
    const messageIndex = demoSessions[sessionIndex].messages.findIndex(msg => msg.id === messageId);
    
    if (messageIndex === -1) {
      return standardApiResponse(null, {
        success: false,
        status: 404,
        message: 'Mesaj bulunamadı'
      });
    }
    
    // Mesajı güncelle
    demoSessions[sessionIndex].messages[messageIndex] = {
      ...demoSessions[sessionIndex].messages[messageIndex],
      feedback,
      feedbackTimestamp: new Date(),
      ...(note && { feedbackNote: note })
    };
    
    return standardApiResponse({
      success: true,
      messageId,
      feedback,
      sessionId,
      timestamp: new Date()
    }, {
      message: 'Geri bildirim başarıyla kaydedildi'
    });
  }, {
    allowedRoles: ['admin', 'manager', 'trainer', 'user'],
    operationName: 'Synbot Mesaj Geri Bildirimi',
    skipRoleCheck: true // Geliştirme sırasında test için
  });
} 