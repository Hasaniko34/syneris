import { ObjectId } from 'mongodb';
import { dbConnect } from '@/lib/mongoose';
import SynbotInteraction from '@/lib/models/SynbotInteraction';
import SynbotSession from '@/lib/models/SynbotSession';
import Training from '@/lib/models/Training';
import Progress from '@/lib/models/Progress';
import User from '@/lib/models/User';
import { 
  SynbotInteractionType, 
  FeedbackType, 
  SessionStatus 
} from '@/lib/types/SynbotTypes';

/**
 * SynBot Servisi
 * 
 * SynBot ile ilgili tüm işlemleri yöneten merkezi servis.
 * Etkileşimler, analiz, hata tespiti ve eğitim rehberliği işlevlerini içerir.
 */
export class SynbotService {
  /**
   * Yeni bir etkileşim kaydeder
   */
  static async createInteraction(data: {
    userId: string;
    sessionId: string;
    content: string;
    response: string;
    type: SynbotInteractionType;
    metadata?: Record<string, any>;
  }) {
    await dbConnect();
    
    const interaction = await SynbotInteraction.create({
      userId: data.userId,
      sessionId: data.sessionId,
      content: data.content,
      response: data.response,
      type: data.type,
      metadata: data.metadata || {},
      timestamp: new Date()
    });
    
    // Oturumu güncelle
    await SynbotSession.findOneAndUpdate(
      { _id: data.sessionId },
      { 
        $inc: { messageCount: 1 },
        lastInteractionAt: new Date(),
        lastMessage: data.content,
        lastResponse: data.response
      }
    );
    
    return interaction;
  }
  
  /**
   * Kullanıcının SynBot etkileşim geçmişini getirir
   */
  static async getUserInteractions(userId: string, limit = 50, skip = 0, sessionId?: string) {
    await dbConnect();
    
    const query = { userId };
    if (sessionId) {
      query['sessionId'] = sessionId;
    }
    
    const interactions = await SynbotInteraction.find(query)
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);
      
    return interactions;
  }
  
  /**
   * Bir etkileşim için geri bildirim kaydeder
   */
  static async updateFeedback(interactionId: string, feedback: FeedbackType) {
    await dbConnect();
    
    const interaction = await SynbotInteraction.findByIdAndUpdate(
      interactionId,
      { feedback },
      { new: true }
    );
    
    return interaction;
  }
  
  /**
   * Verilen hata mesajını analiz eder ve olası çözümler önerir
   */
  static async analyzeError(errorMessage: string, context?: string) {
    // Hatanın türünü ve olası nedenlerini belirlemek için basit bir pattern eşleştirme
    // Gerçek uygulamada yapay zeka API'si ile daha gelişmiş analiz yapılabilir
    
    const errorPatterns = [
      { 
        type: 'TypeError', 
        patterns: ['is not a function', 'is not defined', 'undefined', 'null', 'cannot read property'],
        causes: [
          'Değişken, fonksiyon veya obje henüz tanımlanmamış.',
          'Yanlış tip veya değeri olmayan bir değişken üzerinde operasyon yapılmaya çalışılıyor.',
          'Null veya undefined bir değer üzerinde metot çağrısı yapılıyor.'
        ],
        fixes: [
          'Değişken adının doğru yazıldığından emin olun.',
          'Değişkenin veya fonksiyonun kullanılmadan önce tanımlandığından emin olun.',
          'Metot kullanmadan önce değişkenin null veya undefined olmadığından emin olun.'
        ]
      },
      { 
        type: 'SyntaxError', 
        patterns: ['unexpected token', 'unexpected identifier', 'missing', 'invalid syntax'],
        causes: [
          'JavaScript/TypeScript sözdizimi kurallarına uyulmuyor.',
          'Eksik veya yanlış yerleştirilmiş parantez, virgül veya noktalı virgül.',
          'String ifadelerde eksik kapama tırnak işareti.'
        ],
        fixes: [
          'Parantezlerin, süslü ayraçların ve köşeli ayraçların doğru şekilde eşleştiğini kontrol edin.',
          'String ifadelerin açılış ve kapanış tırnaklarını kontrol edin.',
          'Deyimlerin noktalı virgül ile sonlandığını kontrol edin.'
        ]
      },
      { 
        type: 'NextJsError', 
        patterns: ['next', 'router', 'page', 'component', 'import', 'module'],
        causes: [
          'Bir Next.js dosya veya bileşeni doğru şekilde yapılandırılmamış.',
          'Import ifadeleri yanlış veya dosya yolu hatalı.',
          'Next.js özel dosya adlandırma kuralları takip edilmemiş.'
        ],
        fixes: [
          'Next.js klasör ve dosya yapısını kontrol edin.',
          'Import ifadelerini ve dosya yollarını kontrol edin.',
          'Next.js belgelerini inceleyerek doğru yapılandırmayı uygulayın.'
        ]
      }
    ];
    
    // En uygun hata tipini bul
    let bestMatch = null;
    let highestScore = 0;
    let confidence = 0.5; // Varsayılan güven skoru
    
    for (const error of errorPatterns) {
      const matches = error.patterns.filter(pattern => 
        errorMessage.toLowerCase().includes(pattern.toLowerCase())
      ).length;
      
      if (matches > highestScore) {
        highestScore = matches;
        bestMatch = error;
        // Eşleşme sayısına göre güven skorunu hesapla
        confidence = Math.min(0.5 + (matches * 0.1), 0.95);
      }
    }
    
    // Eşleşme bulunamazsa genel bir hata yanıtı döndür
    if (!bestMatch) {
      return {
        errorType: 'Bilinmeyen Hata',
        possibleCauses: ['Hata tipi otomatik olarak belirlenemedi.'],
        suggestedFixes: [
          'Tam hata mesajını ve stack trace\'i kontrol edin.',
          'Kodun çalıştığı ortamı ve sürümleri kontrol edin.',
          'Daha spesifik bir hata mesajı sağlamayı deneyin.'
        ],
        confidence: 0.4
      };
    }
    
    // Eğer bağlam sağlanmışsa ve TypeScript hatası içeriyorsa güven skorunu artır
    if (context && (context.includes('typescript') || context.includes('tsx') || context.includes('ts'))) {
      confidence = Math.min(confidence + 0.1, 0.95);
    }
    
    return {
      errorType: bestMatch.type,
      possibleCauses: bestMatch.causes,
      suggestedFixes: bestMatch.fixes,
      confidence
    };
  }
  
  /**
   * Kullanıcının eğitim etkileşimlerini analiz ederek içgörüler sağlar
   */
  static async getUserInsights(userId: string) {
    await dbConnect();
    
    // Kullanıcının eğitim ilerlemesini al
    const userProgress = await Progress.find({ userId });
    
    // Kullanıcının SynBot etkileşimlerini al
    const interactions = await SynbotInteraction.find({ userId }).sort({ timestamp: -1 }).limit(200);
    
    // Kullanıcının tamamladığı eğitimleri al
    const completedTrainings = userProgress.filter(p => p.completionRate >= 0.9).map(p => p.trainingId);
    const trainingIds = userProgress.map(p => p.trainingId);
    
    // Eğitim içeriklerini al
    const trainings = await Training.find({ _id: { $in: trainingIds } });
    
    // İlerleme oranını hesapla
    const avgCompletionRate = userProgress.length > 0 
      ? userProgress.reduce((sum, p) => sum + p.completionRate, 0) / userProgress.length 
      : 0;
    
    // Konu bazlı güçlü ve zayıf yönleri belirle
    const topicStrengths = [];
    const topicWeaknesses = [];
    
    // Eğitim konularını ve ilerleme oranlarını eşleştir
    const topicProgress = {};
    
    for (const progress of userProgress) {
      const training = trainings.find(t => t._id.toString() === progress.trainingId.toString());
      if (training) {
        for (const topic of training.topics) {
          if (!topicProgress[topic]) {
            topicProgress[topic] = [];
          }
          topicProgress[topic].push(progress.completionRate);
        }
      }
    }
    
    // Her konu için ortalama ilerleme hesapla
    for (const [topic, rates] of Object.entries(topicProgress)) {
      const avgRate = rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
      
      if (avgRate >= 0.7) {
        topicStrengths.push({ topic, strength: avgRate });
      } else if (avgRate <= 0.6) {
        topicWeaknesses.push({ topic, strength: avgRate });
      }
    }
    
    // Öğrenme kalıplarını analiz et
    const timeDistribution = {
      morning: 0,   // 06:00 - 12:00
      afternoon: 0, // 12:00 - 18:00
      evening: 0,   // 18:00 - 00:00
      night: 0      // 00:00 - 06:00
    };
    
    const dayDistribution = {
      "Pazartesi": 0,
      "Salı": 0,
      "Çarşamba": 0,
      "Perşembe": 0,
      "Cuma": 0,
      "Cumartesi": 0,
      "Pazar": 0
    };
    
    const weekdays = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    
    // Etkileşimlerin zaman dağılımını hesapla
    for (const interaction of interactions) {
      const date = new Date(interaction.timestamp);
      const hours = date.getHours();
      const day = weekdays[date.getDay()];
      
      if (hours >= 6 && hours < 12) {
        timeDistribution.morning++;
      } else if (hours >= 12 && hours < 18) {
        timeDistribution.afternoon++;
      } else if (hours >= 18 && hours < 24) {
        timeDistribution.evening++;
      } else {
        timeDistribution.night++;
      }
      
      dayDistribution[day]++;
    }
    
    // Toplam etkileşim sayısı
    const totalInteractions = interactions.length;
    
    // Zaman dağılımını yüzdeye çevir
    for (const key in timeDistribution) {
      timeDistribution[key] = Math.round((timeDistribution[key] / totalInteractions) * 100);
    }
    
    for (const key in dayDistribution) {
      dayDistribution[key] = Math.round((dayDistribution[key] / totalInteractions) * 100);
    }
    
    // Önerileri oluştur
    const recommendations = [];
    
    // Zayıf konular için öneriler
    if (topicWeaknesses.length > 0) {
      const weakestTopic = topicWeaknesses.sort((a, b) => a.strength - b.strength)[0];
      recommendations.push({
        text: `${weakestTopic.topic} konusunda bilgi seviyenizi artırmak için daha fazla eğitim içeriği tamamlamanızı öneririz.`,
        confidence: 0.85,
        type: "content"
      });
    }
    
    // Öğrenme zamanı için öneriler
    const bestTime = Object.entries(timeDistribution)
      .sort((a, b) => b[1] - a[1])[0][0];
      
    const timeRecommendation = {
      morning: "Sabah saatlerinde öğrenme verimi yüksek. Zor konuları bu zamanda çalışmayı deneyebilirsiniz.",
      afternoon: "Öğleden sonra daha verimli çalıştığınız görülüyor. Bu zaman diliminde zorlu konuları çalışmayı tercih edebilirsiniz.",
      evening: "Akşam saatlerinde öğrenme veriminiz daha yüksek. Bu zaman dilimini zorlu konular için ayırabilirsiniz.",
      night: "Gece çalışmayı tercih ediyorsunuz. Ancak düzenli bir uyku düzeni için çalışma saatlerinizi optimize etmeyi düşünebilirsiniz."
    };
    
    recommendations.push({
      text: timeRecommendation[bestTime],
      confidence: 0.75,
      type: "timing"
    });
    
    // Günler için öneriler
    const activeDays = Object.entries(dayDistribution)
      .filter(([_, percent]) => percent > 10)
      .map(([day, _]) => day);
      
    if (activeDays.length <= 3) {
      recommendations.push({
        text: "Öğrenme sürecinin daha verimli olması için çalışma günlerinizi hafta içine daha düzenli yaymayı deneyebilirsiniz.",
        confidence: 0.7,
        type: "consistency"
      });
    }
    
    return {
      completionRate: avgCompletionRate,
      topicStrengths: topicStrengths.sort((a, b) => b.strength - a.strength).slice(0, 3),
      topicWeaknesses: topicWeaknesses.sort((a, b) => a.strength - b.strength).slice(0, 3),
      learningPatterns: {
        timeOfDay: timeDistribution,
        daysOfWeek: dayDistribution,
        averageSessionLength: 25 // Ortalama seans uzunluğu dakika cinsinden
      },
      recommendations
    };
  }
  
  /**
   * Kullanıcıya kişiselleştirilmiş eğitim planı oluşturur
   */
  static async createPersonalizedPlan(userId: string) {
    await dbConnect();
    
    // Kullanıcının mevcut ilerlemesini al
    const userProgress = await Progress.find({ userId });
    
    // Kullanıcının tamamladığı eğitimleri al
    const completedTrainingIds = userProgress
      .filter(p => p.completionRate >= 0.9)
      .map(p => p.trainingId.toString());
    
    // Kullanıcının başladığı ama tamamlamadığı eğitimleri al
    const inProgressTrainingIds = userProgress
      .filter(p => p.completionRate > 0 && p.completionRate < 0.9)
      .map(p => ({
        id: p.trainingId.toString(),
        rate: p.completionRate
      }));
    
    // Tüm eğitimleri al
    const allTrainings = await Training.find({});
    
    // Tamamlanmamış eğitimleri al
    const incompleteTrainings = allTrainings
      .filter(t => !completedTrainingIds.includes(t._id.toString()))
      .map(t => {
        const progress = inProgressTrainingIds.find(p => p.id === t._id.toString());
        return {
          id: t._id.toString(),
          title: t.title,
          description: t.description,
          type: t.type,
          duration: t.duration,
          difficulty: t.difficulty,
          topics: t.topics,
          completionRate: progress ? progress.rate : 0
        };
      });
    
    // Önce başlanmış ama tamamlanmamış eğitimleri öner
    const inProgressRecommendations = incompleteTrainings
      .filter(t => t.completionRate > 0)
      .sort((a, b) => b.completionRate - a.completionRate);
    
    // Sonra başlanmamış eğitimleri öner
    const newRecommendations = incompleteTrainings
      .filter(t => t.completionRate === 0)
      .sort((a, b) => {
        // Zorluk seviyesine göre sırala (başlangıç > orta > ileri)
        const difficultyOrder = { 'beginner': 0, 'intermediate': 1, 'advanced': 2 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      });
    
    // Birleştirilmiş öneriler
    const allRecommendations = [...inProgressRecommendations, ...newRecommendations];
    
    // Haftanın günlerine göre planı oluştur
    const weekdays = ["Pazartesi", "Çarşamba", "Cuma"];
    const plan = [];
    
    // Her gün için 1-2 eğitim önerisi ekle
    let trainingIndex = 0;
    
    for (const day of weekdays) {
      const dayPlan = {
        dayOfWeek: day,
        contents: [],
        totalDuration: 0
      };
      
      // O gün için 1-2 eğitim ekle
      for (let i = 0; i < 2; i++) {
        if (trainingIndex < allRecommendations.length) {
          const training = allRecommendations[trainingIndex];
          dayPlan.contents.push(training);
          dayPlan.totalDuration += training.duration;
          trainingIndex++;
        }
      }
      
      if (dayPlan.contents.length > 0) {
        plan.push(dayPlan);
      }
    }
    
    return plan;
  }
}

export default SynbotService; 