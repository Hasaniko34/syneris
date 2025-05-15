import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import User from '@/lib/models/User';

export async function POST(
  request: NextRequest
) {
  try {
    // URL'den öğrenme yolu ID'sini al
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
    
    // Body'den userId al (varsayılan olarak oturum sahibi)
    const body = await request.json();
    const userId = body.userId || currentUser.id;
    
    // Veritabanı bağlantısı
    await connectToDatabase();
    
    // Öğrenme yolunun var olup olmadığını kontrol et
    const learningPath = await mongoose.connection.collection('learningpaths').findOne({
      _id: new mongoose.Types.ObjectId(learningPathId)
    });
    
    if (!learningPath) {
      return NextResponse.json({ 
        success: false, 
        error: 'Öğrenme yolu bulunamadı' 
      }, { status: 404 });
    }
    
    // Kullanıcının bu öğrenme yolunda zaten bir ilerleme kaydı olup olmadığını kontrol et
    // Doğrudan schema yapısından sorgu oluşturuyoruz
    let progress = await mongoose.connection.collection('learningpathprogresses').findOne({
      userId: new mongoose.Types.ObjectId(userId),
      learningPathId: new mongoose.Types.ObjectId(learningPathId)
    });
    
    // İlerleme kaydı yoksa yeni bir tane oluştur
    if (!progress) {
      const newProgress = {
        userId: new mongoose.Types.ObjectId(userId),
        learningPathId: new mongoose.Types.ObjectId(learningPathId),
        completedTrainings: [],
        progress: 0,
        status: 'in-progress',
        startDate: new Date(),
        lastAccessed: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const result = await mongoose.connection.collection('learningpathprogresses').insertOne(newProgress);
      
      // Yeni oluşturulan kayıt için sonucu al
      progress = await mongoose.connection.collection('learningpathprogresses').findOne({
        _id: result.insertedId
      });
    } else {
      // Varolan kaydı güncelle
      const updateData: {
        lastAccessed: Date;
        updatedAt: Date;
        status?: string;
        startDate?: Date;
      } = {
        lastAccessed: new Date(),
        updatedAt: new Date()
      };
      
      if (progress.status === 'not-started') {
        updateData.status = 'in-progress';
        updateData.startDate = new Date();
      }
      
      await mongoose.connection.collection('learningpathprogresses').updateOne(
        { _id: progress._id },
        { $set: updateData }
      );
      
      // Güncellenmiş veriyi al
      progress = await mongoose.connection.collection('learningpathprogresses').findOne({
        _id: progress._id
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      data: progress
    });
  } catch (error) {
    console.error('Öğrenme yoluna başlarken hata:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Öğrenme yoluna başlanamadı' 
    }, { status: 500 });
  }
} 