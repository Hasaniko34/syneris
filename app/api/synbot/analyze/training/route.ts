import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';
import SynbotService from '@/lib/services/synbotService';
import mongoose from 'mongoose';
import { dbConnect } from '@/lib/mongoose';

// Eğitim planı istek şeması
const trainingPlanSchema = z.object({
  includeCurrentProgress: z.boolean().optional().default(true),
  weekCount: z.number().optional().default(2),
});

// Eğitim planı oluştur
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
    }
    
    const userEmail = session.user.email;
    if (!userEmail) {
      return NextResponse.json({ error: 'Kullanıcı e-posta bilgisi bulunamadı' }, { status: 400 });
    }

    // Veritabanı bağlantısını kur
    await dbConnect();
    
    // Kullanıcı ID'sini bul
    const user = await mongoose.models.User.findOne({ email: userEmail });
    if (!user) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 });
    }
    
    const userId = user._id.toString();
    
    const body = await req.json();
    
    // İsteği doğrula
    const result = trainingPlanSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Geçersiz istek formatı', details: result.error.format() }, 
        { status: 400 }
      );
    }
    
    // SynbotService'i kullanarak kişiselleştirilmiş eğitim planı oluştur
    const plan = await SynbotService.createPersonalizedPlan(userId);
    
    return NextResponse.json({ plan });
  } catch (error) {
    console.error('Training plan error:', error);
    return NextResponse.json(
      { 
        error: 'Eğitim planı oluşturulurken bir sorun oluştu',
        details: error instanceof Error ? error.message : 'Bilinmeyen hata'
      }, 
      { status: 500 }
    );
  }
}

// Eğitim analizi ve içgörüler
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
    }
    
    const userEmail = session.user.email;
    if (!userEmail) {
      return NextResponse.json({ error: 'Kullanıcı e-posta bilgisi bulunamadı' }, { status: 400 });
    }

    // Veritabanı bağlantısını kur
    await dbConnect();
    
    // Kullanıcı ID'sini bul
    const user = await mongoose.models.User.findOne({ email: userEmail });
    if (!user) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 });
    }
    
    const userId = user._id.toString();
    
    // SynbotService'i kullanarak kullanıcı etkileşimlerini analiz et
    const insights = await SynbotService.getUserInsights(userId);
    
    return NextResponse.json({ insights });
  } catch (error) {
    console.error('Training insights error:', error);
    return NextResponse.json(
      { 
        error: 'Eğitim analizi yapılırken bir sorun oluştu',
        details: error instanceof Error ? error.message : 'Bilinmeyen hata'
      }, 
      { status: 500 }
    );
  }
} 