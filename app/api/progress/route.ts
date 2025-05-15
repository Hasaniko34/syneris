import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Progress from '@/models/Progress';
import Course from '@/models/Course';
import User from '@/models/User';
import mongoose from 'mongoose';

// Kullanıcının tüm kurs ilerlemelerini listele
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // URL parametrelerini al
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const courseId = searchParams.get('courseId');
    
    if (!userId) {
      return NextResponse.json({ 
        success: false, 
        message: 'Kullanıcı ID gereklidir' 
      }, { status: 400 });
    }
    
    // Kullanıcıyı kontrol et
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        message: 'Kullanıcı bulunamadı' 
      }, { status: 404 });
    }
    
    let query: any = { userId: new mongoose.Types.ObjectId(userId) };
    
    // Belirli bir kurs için ilerlemeyi getir
    if (courseId) {
      // Kursu kontrol et
      const course = await Course.findById(courseId);
      if (!course) {
        return NextResponse.json({ 
          success: false, 
          message: 'Kurs bulunamadı' 
        }, { status: 404 });
      }
      
      query.courseId = new mongoose.Types.ObjectId(courseId);
      
      // Tek bir ilerleme kaydı getir
      const progress = await Progress.findOne(query).populate('courseId', 'title image level');
      
      if (!progress) {
        return NextResponse.json({ 
          success: false, 
          message: 'İlerleme kaydı bulunamadı' 
        }, { status: 404 });
      }
      
      return NextResponse.json({
        success: true,
        data: progress
      }, { status: 200 });
    }
    
    // Tüm ilerleme kayıtlarını getir
    const progressRecords = await Progress.find(query)
      .populate('courseId', 'title image level')
      .sort({ lastActivity: -1 });
    
    return NextResponse.json({
      success: true,
      total: progressRecords.length,
      data: progressRecords
    }, { status: 200 });
  } catch (error) {
    console.error('İlerleme kayıtları getirilirken hata oluştu:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'İlerleme kayıtları getirilirken bir hata oluştu',
      error: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}

// Yeni ilerleme kaydı oluştur veya güncelle
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // İstek gövdesini al
    const body = await request.json();
    
    // Gerekli alanları kontrol et
    if (!body.userId || !body.courseId) {
      return NextResponse.json({ 
        success: false, 
        message: 'Kullanıcı ID ve kurs ID gereklidir' 
      }, { status: 400 });
    }
    
    // Kullanıcı ve kursu kontrol et
    const [user, course] = await Promise.all([
      User.findById(body.userId),
      Course.findById(body.courseId)
    ]);
    
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        message: 'Kullanıcı bulunamadı' 
      }, { status: 404 });
    }
    
    if (!course) {
      return NextResponse.json({ 
        success: false, 
        message: 'Kurs bulunamadı' 
      }, { status: 404 });
    }
    
    // Mevcut ilerleme kaydını bul
    let progress = await Progress.findOne({ 
      userId: body.userId,
      courseId: body.courseId
    });
    
    if (progress) {
      // Mevcut kaydı güncelle
      progress.lastActivity = new Date();
      
      // İlerleme oranını kontrol et
      if (body.completionPercentage !== undefined) {
        progress.completionPercentage = body.completionPercentage;
      }
      
      // Tamamlanma durumunu kontrol et
      if (body.isCompleted !== undefined) {
        progress.isCompleted = body.isCompleted;
        
        if (body.isCompleted && !progress.completedOn) {
          progress.completedOn = new Date();
        }
      }
      
      // Mevcut bölüm ve ders bilgilerini güncelle
      if (body.currentSection !== undefined) {
        progress.currentSection = body.currentSection;
      }
      
      if (body.currentLesson !== undefined) {
        progress.currentLesson = body.currentLesson;
      }
      
      // Ders ilerlemelerini güncelle
      if (body.lessonsProgress) {
        // Her bir ders güncellemesi için
        body.lessonsProgress.forEach((lessonProgress: any) => {
          const existingLessonIndex = progress.lessonsProgress.findIndex(
            (lesson: any) => lesson.lessonId.toString() === lessonProgress.lessonId
          );
          
          if (existingLessonIndex >= 0) {
            // Mevcut dersi güncelle
            progress.lessonsProgress[existingLessonIndex].completed = 
              lessonProgress.completed !== undefined 
                ? lessonProgress.completed 
                : progress.lessonsProgress[existingLessonIndex].completed;
            
            progress.lessonsProgress[existingLessonIndex].watchedSeconds = 
              lessonProgress.watchedSeconds !== undefined 
                ? lessonProgress.watchedSeconds 
                : progress.lessonsProgress[existingLessonIndex].watchedSeconds;
            
            if (lessonProgress.completed) {
              progress.lessonsProgress[existingLessonIndex].lastWatched = new Date();
            }
          } else {
            // Yeni ders ekle
            progress.lessonsProgress.push({
              lessonId: new mongoose.Types.ObjectId(lessonProgress.lessonId),
              completed: lessonProgress.completed || false,
              watchedSeconds: lessonProgress.watchedSeconds || 0,
              lastWatched: lessonProgress.completed ? new Date() : undefined
            });
          }
        });
      }
      
      // Quiz ilerlemelerini güncelle
      if (body.quizzesProgress) {
        // Her bir quiz güncellemesi için
        body.quizzesProgress.forEach((quizProgress: any) => {
          const existingQuizIndex = progress.quizzesProgress.findIndex(
            (quiz: any) => quiz.quizId.toString() === quizProgress.quizId
          );
          
          if (existingQuizIndex >= 0) {
            // Mevcut quizi güncelle
            const quiz = progress.quizzesProgress[existingQuizIndex];
            
            quiz.completed = quizProgress.completed !== undefined 
              ? quizProgress.completed : quiz.completed;
            
            quiz.score = quizProgress.score !== undefined 
              ? quizProgress.score : quiz.score;
            
            quiz.passed = quizProgress.passed !== undefined 
              ? quizProgress.passed : quiz.passed;
            
            if (quizProgress.answers) {
              quiz.answers = quizProgress.answers;
            }
            
            if (quizProgress.completed) {
              quiz.attempts += 1;
              quiz.lastAttempt = new Date();
            }
          } else {
            // Yeni quiz ekle
            progress.quizzesProgress.push({
              quizId: new mongoose.Types.ObjectId(quizProgress.quizId),
              completed: quizProgress.completed || false,
              score: quizProgress.score || 0,
              answers: quizProgress.answers || [],
              attempts: quizProgress.completed ? 1 : 0,
              passed: quizProgress.passed || false,
              lastAttempt: quizProgress.completed ? new Date() : undefined
            });
          }
        });
      }
      
      // Veritabanına kaydet
      await progress.save();
    } else {
      // Yeni ilerleme kaydı oluştur
      progress = new Progress({
        userId: body.userId,
        courseId: body.courseId,
        startDate: new Date(),
        lastActivity: new Date(),
        completionPercentage: body.completionPercentage || 0,
        isCompleted: body.isCompleted || false,
        currentSection: body.currentSection || 0,
        currentLesson: body.currentLesson || 0,
        lessonsProgress: [],
        quizzesProgress: [],
        certificateIssued: false
      });
      
      // Veritabanına kaydet
      await progress.save();
      
      // Kursa öğrenciyi ekle
      if (!course.students.includes(body.userId)) {
        course.students.push(body.userId);
        await course.save();
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'İlerleme kaydı başarıyla güncellendi',
      data: progress
    }, { status: 200 });
  } catch (error) {
    console.error('İlerleme kaydı oluşturulurken hata oluştu:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'İlerleme kaydı oluşturulurken bir hata oluştu',
      error: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
} 