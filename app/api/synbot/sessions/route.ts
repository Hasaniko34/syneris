import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';
import {
  ISynbotSession,
  createSession,
  getUserSessions,
  deleteSession,
  SynbotSessionType,
  SessionStatus
} from '@/lib/models/SynbotSession';

// Hata işleme yardımcı fonksiyonu
function handleError(error: any) {
  console.error('SynBot Oturum API Hatası:', error);
  return NextResponse.json(
    { error: 'İşlem sırasında bir hata oluştu', details: error.message },
    { status: 500 }
  );
}

// Doğrulama şemaları
const createSessionSchema = z.object({
  title: z.string().min(1, 'Başlık gereklidir').max(100, 'Başlık çok uzun').optional(),
  description: z.string().max(500, 'Açıklama çok uzun').optional(),
  type: z.nativeEnum(SynbotSessionType).optional(),
  relatedResourceId: z.string().optional(),
  context: z.record(z.any()).optional(),
  metadata: z.record(z.any()).optional(),
});

// GET: Kullanıcının oturumlarını getir
export async function GET(req: NextRequest) {
  try {
    // Kullanıcı oturumunu kontrol et
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Bu işlem için yetkiniz yok' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const { searchParams } = new URL(req.url);
    
    // Sorgu parametrelerini al
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = parseInt(searchParams.get('skip') || '0');
    const type = searchParams.get('type') || undefined;
    const status = searchParams.get('status') || undefined;
    
    // Filtreleme parametreleri oluştur
    const filterParams: any = { userId };
    
    if (type) {
      filterParams.type = type;
    }
    
    if (status) {
      filterParams.status = status;
    }
    
    // Oturumları getir
    const sessions = await getUserSessions(userId, limit, skip);
    
    return NextResponse.json({
      success: true,
      sessions,
      pagination: {
        limit,
        skip,
        total: sessions.length // Gerçek toplamı almak için ileri seviye bir sorgu gerekebilir
      }
    });
  } catch (error) {
    return handleError(error);
  }
}

// POST: Yeni oturum oluştur
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

    const userId = session.user.id;
    const body = await req.json();
    
    // Gelen veriyi doğrula
    const validationResult = createSessionSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({
        error: 'Geçersiz istek verileri',
        details: validationResult.error.format()
      }, { status: 400 });
    }
    
    const { title, description, type, relatedResourceId, context, metadata } = validationResult.data;
    
    // Yeni oturum oluştur
    const synbotSession = await createSession({
      userId,
      title: title || `Yeni Oturum ${new Date().toLocaleDateString('tr-TR')}`,
      description,
      type: type || SynbotSessionType.CHAT,
      status: SessionStatus.ACTIVE,
      relatedResourceId,
      context,
      metadata,
      messageCount: 0,
      lastInteractionAt: new Date()
    });
    
    return NextResponse.json({
      success: true,
      session: synbotSession
    });
  } catch (error) {
    return handleError(error);
  }
}

// DELETE: Toplu oturum silme (güvenlik için kısıtlı kullanım)
export async function DELETE(req: NextRequest) {
  try {
    // Kullanıcı oturumunu kontrol et
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Bu işlem için yetkiniz yok' },
        { status: 401 }
      );
    }
    
    // Bu endpoint'i sadece belirli yetkili kullanıcılar kullanabilir
    const isAdmin = session.user.role === 'admin';
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Bu işlem için yönetici yetkileri gereklidir' },
        { status: 403 }
      );
    }
    
    const body = await req.json();
    const { sessionIds } = body;
    
    if (!Array.isArray(sessionIds) || sessionIds.length === 0) {
      return NextResponse.json(
        { error: "Silinecek oturum ID'leri belirtilmelidir" },
        { status: 400 }
      );
    }
    
    // Güvenlik için maksimum silinebilecek oturum sayısı
    if (sessionIds.length > 100) {
      return NextResponse.json(
        { error: 'Tek seferde en fazla 100 oturum silinebilir' },
        { status: 400 }
      );
    }
    
    // Oturumları sil
    const deletePromises = sessionIds.map(id => deleteSession(id));
    const results = await Promise.all(deletePromises);
    
    const successCount = results.filter(result => result).length;
    
    return NextResponse.json({
      success: true,
      message: `${successCount} oturum başarıyla silindi`,
      failedCount: sessionIds.length - successCount
    });
  } catch (error) {
    return handleError(error);
  }
} 