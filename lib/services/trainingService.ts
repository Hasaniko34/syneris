import TrainingModel, { ITraining } from '../models/Training';
import ProgressModel, { IProgress } from '../models/Progress';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { updateLearningPathProgressAfterTrainingCompletion } from './learningPathService';

// Tüm eğitimleri getir
export async function getAllTrainings(
  companyId?: string,
  category?: string,
  tag?: string,
  published: boolean = true
) {
  try {
    const filter: any = {};
    
    if (companyId) filter.company = companyId;
    if (category && category !== 'Tümü') filter.category = category;
    if (tag) filter.tags = tag;
    if (published !== undefined) filter.isPublished = published;
    
    const trainings = await TrainingModel
      .find(filter)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
      
    return { success: true, data: trainings };
  } catch (error) {
    console.error('Eğitimler alınırken hata:', error);
    return { success: false, error: 'Eğitimler alınamadı' };
  }
}

// Belirli bir eğitimi getir
export async function getTrainingById(id: string) {
  try {
    const training = await TrainingModel
      .findById(id)
      .populate('createdBy', 'name email');
      
    if (!training) {
      return { success: false, error: 'Eğitim bulunamadı' };
    }
    
    return { success: true, data: training };
  } catch (error) {
    console.error('Eğitim alınırken hata:', error);
    return { success: false, error: 'Eğitim alınamadı' };
  }
}

// Eğitim oluştur
export async function createTraining(trainingData: Partial<ITraining>) {
  try {
    // Oturum bilgilerini al
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: 'Oturum bulunamadı' };
    }
    
    const newTraining = new TrainingModel({
      ...trainingData,
      createdBy: session.user.id
    });
    
    await newTraining.save();
    return { success: true, data: newTraining };
  } catch (error) {
    console.error('Eğitim oluşturulurken hata:', error);
    return { success: false, error: 'Eğitim oluşturulamadı' };
  }
}

// Kullanıcının eğitimdeki ilerlemesini getir
export async function getUserTrainingProgress(userId: string, trainingId: string) {
  try {
    const progress = await ProgressModel.findOne({
      userId,
      trainingId
    });
    
    return { success: true, data: progress };
  } catch (error) {
    console.error('İlerleme bilgisi alınırken hata:', error);
    return { success: false, error: 'İlerleme bilgisi alınamadı' };
  }
}

// Kullanıcının tüm eğitimlerdeki ilerlemelerini getir
export async function getUserAllTrainingsProgress(userId: string) {
  try {
    const progress = await ProgressModel.find({
      userId
    }).populate({
      path: 'trainingId',
      select: 'title description thumbnail tags'
    });
    
    return { success: true, data: progress };
  } catch (error) {
    console.error('İlerleme bilgileri alınırken hata:', error);
    return { success: false, error: 'İlerleme bilgileri alınamadı' };
  }
}

// Eğitim adımını tamamla ve ilerlemeyi güncelle
export async function completeTrainingStep(userId: string, trainingId: string, stepId: string) {
  try {
    // Kullanıcının eğitimdeki mevcut ilerlemesini bul veya oluştur
    let progress = await ProgressModel.findOne({
      userId,
      trainingId
    });
    
    if (!progress) {
      progress = new ProgressModel({
        userId,
        trainingId,
        completedSteps: [stepId],
        status: 'in-progress',
        startDate: new Date()
      });
    } else if (!progress.completedSteps.includes(stepId)) {
      progress.completedSteps.push(stepId);
    }
    
    // Eğitimi al
    const training = await TrainingModel.findById(trainingId);
    if (!training) {
      return { success: false, error: 'Eğitim bulunamadı' };
    }
    
    // Toplam adım sayısını hesapla
    let totalSteps = 0;
    training.modules.forEach(module => {
      totalSteps += module.steps.length;
    });
    
    // İlerleme yüzdesini hesapla
    const completedSteps = progress.completedSteps.length;
    const progressPercentage = Math.round((completedSteps / totalSteps) * 100);
    
    // Tüm adımlar tamamlandıysa, eğitimi tamamlanmış olarak işaretle
    if (progressPercentage === 100) {
      progress.status = 'completed';
      progress.completionDate = new Date();
      
      // Öğrenme yolu ilerlemesini güncelle
      await updateLearningPathProgressAfterTrainingCompletion(userId, trainingId);
    }
    
    // Son erişim zamanını güncelle
    progress.lastAccessed = new Date();
    
    await progress.save();
    
    return { 
      success: true, 
      data: { 
        progress: progressPercentage, 
        status: progress.status 
      }
    };
  } catch (error) {
    console.error('Adım tamamlanırken hata:', error);
    return { success: false, error: 'Adım tamamlanamadı' };
  }
}

// Kullanıcıya önerilen eğitimleri getir
export async function getRecommendedTrainings(userId: string, limit = 5) {
  try {
    // Kullanıcının tamamladığı eğitimleri bul
    const completedTrainings = await ProgressModel.find({
      userId,
      status: 'completed'
    }).select('trainingId');
    
    const completedTrainingIds = completedTrainings.map(p => p.trainingId);
    
    // Kullanıcının başladığı ama tamamlamadığı eğitimleri bul
    const inProgressTrainings = await ProgressModel.find({
      userId,
      status: 'in-progress'
    }).select('trainingId');
    
    const inProgressTrainingIds = inProgressTrainings.map(p => p.trainingId);
    
    // Kullanıcının tamamladığı eğitimlerin kategorilerini bul
    const userCompletedTrainings = await TrainingModel.find({
      _id: { $in: completedTrainingIds }
    }).select('tags category');
    
    const userCategories = [...new Set(userCompletedTrainings.map(t => t.category))];
    const userTags = [...new Set(userCompletedTrainings.flatMap(t => t.tags))];
    
    // Kullanıcının ilgili olabileceği eğitimleri getir
    const recommendedTrainings = await TrainingModel.find({
      isPublished: true,
      _id: { 
        $nin: [...completedTrainingIds, ...inProgressTrainingIds] // Tamamlanmamış ve başlanmamış olanları getir
      },
      $or: [
        { category: { $in: userCategories } }, // Aynı kategoride olanlar
        { tags: { $in: userTags } } // Benzer etiketlere sahip olanlar
      ]
    })
    .limit(limit)
    .sort({ createdAt: -1 });
    
    return { success: true, data: recommendedTrainings };
  } catch (error) {
    console.error('Önerilen eğitimler alınırken hata:', error);
    return { success: false, error: 'Önerilen eğitimler alınamadı' };
  }
} 