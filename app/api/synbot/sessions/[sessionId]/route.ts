import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { z } from 'zod';
import {
  getSessionById,
  updateSession,
  deleteSession,
  SynbotSessionType,
  SessionStatus
} from '@/lib/models/SynbotSession';
import mongoose from 'mongoose';
import { dbConnect } from '@/lib/mongoose';

// Hata işleme yardımcı fonksiyonu
function handleError(error: any) {
  console.error('SynBot Oturum API Hatası:', error);
  return NextResponse.json(
    { error: 'İşlem sırasında bir hata oluştu', details: error.message },
    { status: 500 }
  );
}

// Doğrulama şemaları
const updateSessionSchema = z.object({
  title: z.string().min(1, 'Başlık gereklidir').max(100, 'Başlık çok uzun').optional(),
  description: z.string().max(500, 'Açıklama çok uzun').optional(),
  status: z.nativeEnum(SessionStatus).optional(),
  type: z.nativeEnum(SynbotSessionType).optional(),
  context: z.record(z.any()).optional(),
  metadata: z.record(z.any()).optional(),
  relatedResourceId: z.string().optional(),
});

// GET: Belirli bir oturumun detaylarını getir
export async function GET(
  req: NextRequest
) {
  try {
    // URL'den sessionId'yi al
    const url = req.nextUrl.pathname;
    const segments = url.split('/');
    const sessionId = segments[segments.indexOf('sessions') + 1];
    
    // Kullanıcı oturumunu kontrol et
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Oturum açmanız gerekiyor' },
        { status: 401 }
      );
    }

    // Kullanıcı kimliğini email üzerinden bul
    let userId = null;
    if (session.user?.email) {
      await dbConnect();
      const user = await mongoose.models.User.findOne({ email: session.user.email });
      if (user) {
        userId = user._id.toString();
      }
    }
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Kullanıcı bilgisi bulunamadı' },
        { status: 401 }
      );
    }
    
    // Oturumu getir
    const synbotSession = await getSessionById(sessionId);
    
    // Oturum bulunamadı kontrolü
    if (!synbotSession) {
      return NextResponse.json(
        { error: 'Belirtilen oturum bulunamadı' },
        { status: 404 }
      );
    }
    
    // Oturum sahibi kontrolü
    let isAdmin = false;
    
    if (session.user?.email) {
      await dbConnect();
      const user = await mongoose.models.User.findOne({ email: session.user.email });
      if (user && user.role === 'admin') {
        isAdmin = true;
      }
    }
    
    if (synbotSession.userId !== userId && !isAdmin) {
      return NextResponse.json(
        { error: 'Bu oturuma erişim izniniz yok' },
        { status: 403 }
      );
    }
    
    return NextResponse.json({
      success: true,
      session: synbotSession
    });
  } catch (error) {
    return handleError(error);
  }
}

// PUT: Belirli bir oturumu güncelle
export async function PUT(
  req: NextRequest
) {
  try {
    // URL'den sessionId'yi al
    const url = req.nextUrl.pathname;
    const segments = url.split('/');
    const sessionId = segments[segments.indexOf('sessions') + 1];
    
    // Kullanıcı oturumunu kontrol et
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Oturum açmanız gerekiyor' },
        { status: 401 }
      );
    }

    // Kullanıcı kimliğini email üzerinden bul
    let userId = null;
    if (session.user?.email) {
      await dbConnect();
      const user = await mongoose.models.User.findOne({ email: session.user.email });
      if (user) {
        userId = user._id.toString();
      }
    }
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Kullanıcı bilgisi bulunamadı' },
        { status: 401 }
      );
    }
    
    // Oturumu getir
    const synbotSession = await getSessionById(sessionId);
    
    // Oturum bulunamadı kontrolü
    if (!synbotSession) {
      return NextResponse.json(
        { error: 'Belirtilen oturum bulunamadı' },
        { status: 404 }
      );
    }
    
    // Oturum sahibi kontrolü
    let isAdmin = false;
    
    if (session.user?.email) {
      await dbConnect();
      const user = await mongoose.models.User.findOne({ email: session.user.email });
      if (user && user.role === 'admin') {
        isAdmin = true;
      }
    }
    
    if (synbotSession.userId !== userId && !isAdmin) {
      return NextResponse.json(
        { error: 'Bu oturumu güncelleme izniniz yok' },
        { status: 403 }
      );
    }
    
    const body = await req.json();
    
    // Gelen veriyi doğrula
    const validationResult = updateSessionSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({
        error: 'Geçersiz istek verileri',
        details: validationResult.error.format()
      }, { status: 400 });
    }
    
    // Oturumu güncelle
    const updatedSession = await updateSession(sessionId, validationResult.data);
    
    return NextResponse.json({
      success: true,
      session: updatedSession
    });
  } catch (error) {
    return handleError(error);
  }
}

// DELETE: Belirli bir oturumu sil
export async function DELETE(
  req: NextRequest
) {
  try {
    // URL'den sessionId'yi al
    const url = req.nextUrl.pathname;
    const segments = url.split('/');
    const sessionId = segments[segments.indexOf('sessions') + 1];
    
    // Kullanıcı oturumunu kontrol et
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Oturum açmanız gerekiyor' },
        { status: 401 }
      );
    }

    // Kullanıcı kimliğini email üzerinden bul
    let userId = null;
    if (session.user?.email) {
      await dbConnect();
      const user = await mongoose.models.User.findOne({ email: session.user.email });
      if (user) {
        userId = user._id.toString();
      }
    }
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Kullanıcı bilgisi bulunamadı' },
        { status: 401 }
      );
    }
    
    // Oturumu getir
    const synbotSession = await getSessionById(sessionId);
    
    // Oturum bulunamadı kontrolü
    if (!synbotSession) {
      return NextResponse.json(
        { error: 'Belirtilen oturum bulunamadı' },
        { status: 404 }
      );
    }
    
    // Oturum sahibi kontrolü
    let isAdmin = false;
    
    if (session.user?.email) {
      await dbConnect();
      const user = await mongoose.models.User.findOne({ email: session.user.email });
      if (user && user.role === 'admin') {
        isAdmin = true;
      }
    }
    
    if (synbotSession.userId !== userId && !isAdmin) {
      return NextResponse.json(
        { error: 'Bu oturumu silme izniniz yok' },
        { status: 403 }
      );
    }
    
    // Oturumu sil
    const result = await deleteSession(sessionId);
    
    if (result) {
      return NextResponse.json({
        success: true,
        message: 'Oturum başarıyla silindi'
      });
    } else {
      return NextResponse.json({
        error: 'Oturum silinirken bir hata oluştu'
      }, { status: 500 });
    }
  } catch (error) {
    return handleError(error);
  }
} 