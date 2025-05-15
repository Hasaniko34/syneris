import { NextRequest, NextResponse } from 'next/server';
import { getRecommendedLearningPaths } from '@/lib/services/learningPathService';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import User from '@/lib/models/User';

export async function GET(request: NextRequest) {
  try {
    // Oturum kontrolü
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ 
        success: false, 
        error: 'Yetkilendirme başarısız' 
      }, { status: 401 });
    }
    
    // Kullanıcı bilgilerini veritabanından al
    const user = await User.findOne({ email: session.user.email });
    
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        error: 'Kullanıcı bulunamadı' 
      }, { status: 404 });
    }
    
    // URL parametrelerini al
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') || '5') : 5;
    
    // Önerilen öğrenme yollarını getir
    const result = await getRecommendedLearningPaths(user.id, limit);
    
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
    console.error('Önerilen öğrenme yolları alınırken hata:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Önerilen öğrenme yolları alınamadı' 
    }, { status: 500 });
  }
} 