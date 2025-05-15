import mongoose from 'mongoose';
import { dbConnect } from '../mongoose';
import User from '../models/User';

// Analytics veri tipleri
export interface AnalyticsData {
  completionRate: number;
  topicAnalysis: {
    strengths: { topic: string; score: number }[];
    weaknesses: { topic: string; score: number }[];
  };
  learningPatterns: {
    timeOfDay: Record<string, number>;
    daysOfWeek: Record<string, number>;
    frequency: number;
    averageSessionLength: number;
  };
  progress: {
    currentMonth: number;
    previousMonth: number;
    trend: number;
  };
  recommendations: {
    id: string;
    text: string;
    importance: 'high' | 'medium' | 'low';
    category: 'content' | 'timing' | 'method';
  }[];
}

/**
 * Kullanıcının eğitim analizlerini getirir
 * @param userId Kullanıcı ID'si
 * @param timeRange Analiz zaman aralığı (week, month, quarter, year, all)
 */
export async function getUserLearningAnalytics(userId: string, timeRange: string = 'month'): Promise<AnalyticsData> {
  await dbConnect();
  
  try {
    // Gerçek projenizde burada veritabanından veri çekeceksiniz
    // Bu örnek için simülasyon verisi döndürüyoruz
    
    // Zaman aralığına göre veriler değişebilir
    const multiplier = timeRange === 'week' ? 0.8 : 
                      timeRange === 'month' ? 1 :
                      timeRange === 'quarter' ? 1.2 : 
                      timeRange === 'year' ? 1.5 : 1.3;
    
    return {
      completionRate: 0.72 * multiplier > 1 ? 1 : 0.72 * multiplier,
      topicAnalysis: {
        strengths: [
          { topic: "JavaScript", score: 0.85 * multiplier > 1 ? 1 : 0.85 * multiplier },
          { topic: "React", score: 0.78 * multiplier > 1 ? 1 : 0.78 * multiplier },
          { topic: "UI/UX", score: 0.76 * multiplier > 1 ? 1 : 0.76 * multiplier },
          { topic: "HTML/CSS", score: 0.82 * multiplier > 1 ? 1 : 0.82 * multiplier },
        ],
        weaknesses: [
          { topic: "TypeScript", score: 0.45 * multiplier },
          { topic: "Güvenlik", score: 0.52 * multiplier },
          { topic: "Backend", score: 0.58 * multiplier },
          { topic: "Performans", score: 0.60 * multiplier },
        ]
      },
      learningPatterns: {
        timeOfDay: {
          "Sabah": 15 * multiplier,
          "Öğlen": 25 * multiplier,
          "Akşam": 40 * multiplier,
          "Gece": 20 * multiplier
        },
        daysOfWeek: {
          "Pazartesi": 20 * multiplier,
          "Salı": 15 * multiplier,
          "Çarşamba": 25 * multiplier,
          "Perşembe": 10 * multiplier,
          "Cuma": 15 * multiplier,
          "Cumartesi": 10 * multiplier,
          "Pazar": 5 * multiplier
        },
        frequency: 3.5 * multiplier,
        averageSessionLength: 28 * multiplier
      },
      progress: {
        currentMonth: 75 * multiplier > 100 ? 100 : 75 * multiplier,
        previousMonth: 65 * multiplier > 100 ? 100 : 65 * multiplier,
        trend: 0.15 * multiplier
      },
      recommendations: [
        {
          id: "rec1",
          text: "TypeScript becerilerinizi geliştirmek için 'TypeScript Temelleri' kursunu tamamlamanızı öneriyoruz.",
          importance: "high",
          category: "content"
        },
        {
          id: "rec2",
          text: "Akşam saatlerinde daha verimli çalıştığınızı gözlemliyoruz. Zor konuları bu zaman diliminde çalışmayı deneyebilirsiniz.",
          importance: "medium",
          category: "timing"
        },
        {
          id: "rec3",
          text: "Pratiğe dayalı öğrenme stiliniz göz önünde bulundurularak, projelere dayalı eğitim içeriklerine yönelmenizi öneriyoruz.",
          importance: "medium",
          category: "method"
        },
        {
          id: "rec4",
          text: "Güvenlik konusundaki eksikliklerinizi gidermek için 'Web Uygulamalarında Güvenlik' kursunu inceleyebilirsiniz.",
          importance: "high",
          category: "content"
        }
      ]
    };
    
  } catch (error) {
    console.error("Analiz verilerini alırken hata oluştu:", error);
    throw new Error("Analiz verileri alınamadı");
  }
}

/**
 * Birden fazla kullanıcı için toplu analiz verileri oluşturur
 * @param userIds Kullanıcı ID'leri dizisi
 * @param timeRange Analiz zaman aralığı
 */
export async function getBatchUserAnalytics(userIds: string[], timeRange: string = 'month') {
  await dbConnect();
  
  try {
    // Tüm kullanıcılar için ayrı ayrı analiz verilerini getir
    const analyticsPromises = userIds.map(userId => 
      getUserLearningAnalytics(userId, timeRange)
    );
    
    const analyticsResults = await Promise.all(analyticsPromises);
    
    return {
      usersAnalyzed: userIds.length,
      analytics: analyticsResults
    };
  } catch (error) {
    console.error("Toplu analiz verilerini alırken hata oluştu:", error);
    throw new Error("Toplu analiz verileri alınamadı");
  }
}

/**
 * Şirket genelinde analiz verileri oluşturur
 * @param companyId Şirket ID'si
 * @param timeRange Analiz zaman aralığı
 */
export async function getCompanyAnalytics(companyId: string, timeRange: string = 'month') {
  await dbConnect();
  
  try {
    // Şirketteki tüm kullanıcıları bul
    const users = await User.find({ company: companyId }).select('_id');
    const userIds = users.map(user => user._id.toString());
    
    // Tüm kullanıcıların analiz verilerini getir
    return await getBatchUserAnalytics(userIds, timeRange);
  } catch (error) {
    console.error("Şirket analiz verilerini alırken hata oluştu:", error);
    throw new Error("Şirket analiz verileri alınamadı");
  }
} 