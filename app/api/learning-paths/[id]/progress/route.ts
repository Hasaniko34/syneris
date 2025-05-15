import { NextRequest, NextResponse } from 'next/server';
import { getUserLearningPathProgress } from '@/lib/services/learningPathService';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import User from '@/lib/models/User';

export async function GET(
  request: NextRequest
) {
  try {
    // URL'den öğrenme yolu ID'sini çıkart
    const url = request.nextUrl.pathname;
    const segments = url.split('/');
    const learningPathId = segments[segments.indexOf('learning-paths') + 1];
    
    // Oturum kontrolü
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ 
        success: false, 
        error: 'Yetkilendirme başarısız' 
      }, { status: 401 });
    }
    
    // Kullanıcıyı veritabanından al
    const currentUser = await User.findOne({ email: session.user.email });
    
    if (!currentUser) {
      return NextResponse.json({ 
        success: false, 
        error: 'Kullanıcı bulunamadı' 
      }, { status: 404 });
    }
    
    // URL parametrelerini al
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || currentUser.id;
    
    // İlerleme bilgisini getir
    const result = await getUserLearningPathProgress(userId, learningPathId);
    
    if (!result.success) {
      return NextResponse.json({ 
        success: false, 
        error: result.error 
      }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true, 
      data: result.data 
    });
  } catch (error) {
    console.error('İlerleme bilgisi alınırken hata:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'İlerleme bilgisi alınamadı' 
    }, { status: 500 });
  }
} 