import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';
import SynbotService from '@/lib/services/synbotService';
import { SynbotInteractionType } from '@/lib/types/SynbotTypes';
import { dbConnect } from "@/lib/mongoose";
import SynbotInteractionModel, { SynbotInteractionDocument } from '@/lib/models/SynbotInteraction';
import SynbotSessionModel, { SynbotSessionDocument } from '@/lib/models/SynbotSession';
import mongoose from 'mongoose';

// Hata analiz isteği için şema
const errorAnalysisSchema = z.object({
  errorMessage: z.string().min(1, 'Hata mesajı gereklidir'),
  context: z.string().optional(),
  sessionId: z.string().optional(),
});

// POST: Hata mesajını analiz et
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
    }
    
    const body = await req.json();
    
    // İsteği doğrula
    const result = errorAnalysisSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Geçersiz istek formatı', details: result.error.format() }, 
        { status: 400 }
      );
    }
    
    const { errorMessage, context, sessionId } = result.data;
    
    // Servis katmanını kullanarak hatayı analiz et
    const analysis = await SynbotService.analyzeError(errorMessage, context);
    
    // Eğer oturum ID'si sağlanmışsa, bu etkileşimi kaydet
    if (sessionId) {
      await dbConnect();

      // Kullanıcı ID'sini al
      const userEmail = session.user.email;
      if (!userEmail) {
        return NextResponse.json({ error: 'Kullanıcı e-posta bilgisi bulunamadı' }, { status: 400 });
      }

      // Kullanıcı bilgilerini veritabanından al
      const user = await mongoose.models.User.findOne({ email: userEmail });
      if (!user) {
        return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 });
      }

      const userId = user._id.toString();
      
      // Var olan oturumu kontrol et
      const existingSession = await SynbotSessionModel.findById(sessionId);
      
      if (existingSession) {
        // Etkileşimi kaydet
        await SynbotInteractionModel.create({
          userId,
          sessionId,
          content: errorMessage,
          response: JSON.stringify(analysis),
          type: SynbotInteractionType.ERROR_CORRECTION,
          metadata: { context },
          timestamp: new Date()
        });
        
        // Oturumu güncelle
        await SynbotSessionModel.findByIdAndUpdate(sessionId, {
          lastInteractionAt: new Date(),
          $inc: { messageCount: 1 },
          lastMessage: errorMessage,
          lastResponse: JSON.stringify(analysis),
          primaryType: SynbotInteractionType.ERROR_CORRECTION
        });
      }
    }
    
    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Error analysis error:', error);
    return NextResponse.json(
      { 
        error: 'Hata analiz edilirken bir sorun oluştu',
        details: error instanceof Error ? error.message : 'Bilinmeyen hata'
      }, 
      { status: 500 }
    );
  }
} 