import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import User from '@/lib/models/User';

// Interface for notification settings
interface NotificationSettings {
  email: {
    enabled: boolean;
    types: string[];
    digest: boolean;
    digestFrequency: 'daily' | 'weekly';
  };
  push: {
    enabled: boolean;
    types: string[];
    doNotDisturb: {
      enabled: boolean;
      startTime?: string;
      endTime?: string;
    };
  };
  inApp: {
    enabled: boolean;
    types: string[];
  };
}

// Get user notification settings
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 });
    }

    await connectToDatabase();
    
    // Kullanıcıyı e-posta ile bul
    const user = await User.findOne({ email: session.user.email }).select('notificationSettings');
    
    if (!user) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }
    
    // Bildirim ayarları yoksa varsayılan değerleri oluştur
    if (!user.notificationSettings) {
      const defaultSettings: NotificationSettings = {
        email: {
          enabled: true,
          types: ['TRAINING', 'SYSTEM', 'ASSIGNMENT', 'MENTION'],
          digest: true,
          digestFrequency: 'daily',
        },
        push: {
          enabled: true,
          types: ['TRAINING', 'ASSIGNMENT', 'COMMENT', 'MENTION'],
          doNotDisturb: {
            enabled: false,
          },
        },
        inApp: {
          enabled: true,
          types: ['TRAINING', 'SYSTEM', 'ASSIGNMENT', 'COMMENT', 'MENTION', 'INFO', 'SUCCESS', 'WARNING', 'ERROR', 'COMPLETION'],
        },
      };
      
      // Varsayılan ayarları kaydet
      user.notificationSettings = defaultSettings;
      await user.save();
    }
    
    return NextResponse.json({
      settings: user.notificationSettings
    });
  } catch (error) {
    console.error('Bildirim ayarları alınamadı:', error);
    return NextResponse.json(
      { error: 'Bildirim ayarları alınamadı' },
      { status: 500 }
    );
  }
}

// Update notification settings
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 });
    }

    const data = await req.json();
    
    // Gelen veriyi doğrula
    if (!data.settings) {
      return NextResponse.json(
        { error: 'Eksik veya geçersiz veriler' },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    
    // Kullanıcıyı e-posta ile bul
    const user = await User.findOne({ email: session.user.email });
    
    if (!user) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }
    
    // Ayarları güncelle, mevcut değerleri koru
    user.notificationSettings = {
      ...user.notificationSettings || {}, // Mevcut ayarlar yoksa boş nesne oluştur
      ...data.settings
    };
    
    await user.save();
    
    return NextResponse.json({
      success: true,
      message: 'Bildirim ayarları güncellendi',
      settings: user.notificationSettings
    });
  } catch (error) {
    console.error('Bildirim ayarları güncellenemedi:', error);
    return NextResponse.json(
      { error: 'Bildirim ayarları güncellenemedi' },
      { status: 500 }
    );
  }
} 