import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import Notification from '@/lib/models/Notification';
import User from '@/lib/models/User';
import mongoose from 'mongoose';

// Toplu bildirim işlemleri için POST endpoint'i
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 });
    }

    await connectToDatabase();
    
    // Kullanıcı bilgilerini veritabanından al
    const user = await User.findOne({ email: session.user.email });
    
    if (!user) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 });
    }
    
    const userId = user.id;
    const data = await req.json();
    
    // İşlem türü ve bildirim ID'leri kontrolü
    if (!data.action || !data.notificationIds || !Array.isArray(data.notificationIds)) {
      return NextResponse.json(
        { error: 'Geçersiz istek formatı' },
        { status: 400 }
      );
    }
    
    // ID'lerin geçerliliğini kontrol et
    const validIds = data.notificationIds.filter((id: string) => 
      mongoose.Types.ObjectId.isValid(id)
    );
    
    if (validIds.length === 0) {
      return NextResponse.json(
        { error: 'Geçerli bildirim ID bulunamadı' },
        { status: 400 }
      );
    }
    
    let result;
    
    // İşlem türüne göre farklı operasyonlar gerçekleştir
    switch (data.action) {
      case 'markAsRead':
        // Bildirimleri okundu olarak işaretle
        result = await Notification.updateMany(
          { 
            _id: { $in: validIds }, 
            userId,
            read: false // Sadece okunmamış olanları güncelle
          },
          { $set: { read: true } }
        );
        
        return NextResponse.json({
          success: true,
          message: `${result.modifiedCount} bildirim okundu olarak işaretlendi`
        });
        
      case 'markAsUnread':
        // Bildirimleri okunmadı olarak işaretle
        result = await Notification.updateMany(
          { 
            _id: { $in: validIds }, 
            userId,
            read: true // Sadece okunmuş olanları güncelle
          },
          { $set: { read: false } }
        );
        
        return NextResponse.json({
          success: true,
          message: `${result.modifiedCount} bildirim okunmadı olarak işaretlendi`
        });
        
      case 'delete':
        // Bildirimleri sil
        result = await Notification.deleteMany({
          _id: { $in: validIds },
          userId
        });
        
        return NextResponse.json({
          success: true,
          message: `${result.deletedCount} bildirim silindi`
        });
        
      default:
        return NextResponse.json(
          { error: 'Desteklenmeyen işlem' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Toplu bildirim işlemi başarısız:', error);
    return NextResponse.json(
      { error: 'Toplu bildirim işlemi başarısız' },
      { status: 500 }
    );
  }
} 