import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { z } from 'zod';
import { analyzeUserInteractions } from '@/lib/utils/gemini-ai';
import { getUserInteractions } from '@/lib/models/SynbotInteraction';
import mongoose from 'mongoose';
import { dbConnect } from '@/lib/mongoose';

// Hata işleme yardımcı fonksiyonu
function handleError(error: any) {
  console.error('SynBot Kullanıcı Analizi API Hatası:', error);
  return NextResponse.json(
    { error: 'İşlem sırasında bir hata oluştu', details: error.message },
    { status: 500 }
  );
}

// Doğrulama şeması
const userAnalysisSchema = z.object({
  userId: z.string().optional(),
  sessionId: z.string().optional(),
  limit: z.number().min(1).max(100).optional(),
  skip: z.number().min(0).optional()
});

// POST: Kullanıcı etkileşimlerini analiz et
export async function POST(req: NextRequest) {
  try {
    // Kullanıcı oturumunu kontrol et
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Bu işlem için yetkiniz yok' },
        { status: 401 }
      );
    }

    const userEmail = session.user.email;
    if (!userEmail) {
      return NextResponse.json({ error: 'Kullanıcı e-posta bilgisi bulunamadı' }, { status: 400 });
    }

    // Veritabanı bağlantısını kur
    await dbConnect();
    
    // Kullanıcı bilgilerini veritabanından al
    const user = await mongoose.models.User.findOne({ email: userEmail });
    if (!user) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 });
    }

    const loggedInUserId = user._id.toString();
    const isAdmin = user.role === 'admin';
    
    const body = await req.json();
    
    // Gelen veriyi doğrula
    const validationResult = userAnalysisSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({
        error: 'Geçersiz istek verileri',
        details: validationResult.error.format()
      }, { status: 400 });
    }
    
    // Parametreleri al
    const { userId = loggedInUserId, sessionId, limit = 50 } = validationResult.data;
    
    // Yetkilendirme kontrolü - Sadece kendi verilerini veya admin ise başkalarını görebilir
    if (userId !== loggedInUserId && !isAdmin) {
      return NextResponse.json(
        { error: 'Başka kullanıcıların verilerini görüntüleme izniniz yok' },
        { status: 403 }
      );
    }
    
    // Kullanıcı etkileşimlerini getir - skip parametresini kaldırıyoruz çünkü fonksiyon sadece iki parametre kabul ediyor
    const interactions = await getUserInteractions(userId, limit);
    
    // Etkileşim yoksa boş analiz döndür
    if (interactions.length === 0) {
      return NextResponse.json({
        success: true,
        analysis: {
          learningPattern: 'Yeterli veri yok',
          strengths: [],
          improvementAreas: [],
          recommendations: ['Daha fazla etkileşim oluşturun'],
          engagementScore: 0,
          interactionCount: 0,
          timestamp: new Date().toISOString()
        }
      });
    }
    
    // Etkileşimleri formatlayarak analize hazırla
    // SynbotInteraction modelinde model alanları doğru şekilde eşlenir
    const formattedInteractions = interactions.map(interaction => ({
      content: interaction.content || '',
      isUserMessage: false, // Varsayılan değer
      createdAt: interaction.timestamp || new Date(), // timestamp alanını kullan
      metadata: interaction.metadata || {}
    }));
    
    // Kullanıcı etkileşimlerini analiz et
    const analysis = await analyzeUserInteractions(formattedInteractions, userId);
    
    return NextResponse.json({
      success: true,
      analysis: {
        ...analysis,
        interactionCount: interactions.length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    return handleError(error);
  }
} 