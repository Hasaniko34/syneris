import LearningPathModel, { ILearningPath } from '../models/LearningPath';
import LearningPathProgressModel, { ILearningPathProgress } from '../models/LearningPathProgress';
import TrainingModel from '../models/Training';
import ProgressModel from '../models/Progress';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// Tüm öğrenme yollarını getir
export async function getAllLearningPaths(
  companyId?: string,
  category?: string,
  level?: string,
  published: boolean = true
) {
  try {
    const filter: any = {};
    
    if (companyId) filter.companyId = companyId;
    if (category && category !== 'Tümü') filter.category = category;
    if (level && level !== 'Tümü') filter.level = level;
    if (published !== undefined) filter.isPublished = published;
    
    const learningPaths = await LearningPathModel
      .find(filter)
      .populate('trainings', 'title thumbnail')
      .sort({ createdAt: -1 });
      
    return { success: true, data: learningPaths };
  } catch (error) {
    console.error('Öğrenme yolları alınırken hata:', error);
    return { success: false, error: 'Öğrenme yolları alınamadı' };
  }
}

// Belirli bir öğrenme yolunu getir
export async function getLearningPathById(id: string) {
  try {
    const learningPath = await LearningPathModel
      .findById(id)
      .populate('trainings')
      .populate('createdBy', 'name email');
      
    if (!learningPath) {
      return { success: false, error: 'Öğrenme yolu bulunamadı' };
    }
    
    return { success: true, data: learningPath };
  } catch (error) {
    console.error('Öğrenme yolu alınırken hata:', error);
    return { success: false, error: 'Öğrenme yolu alınamadı' };
  }
}

// Öğrenme yolu oluştur
export async function createLearningPath(pathData: Partial<ILearningPath>) {
  try {
    // Oturum bilgilerini al
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: 'Oturum bulunamadı' };
    }
    
    const newLearningPath = new LearningPathModel({
      ...pathData,
      createdBy: session.user.id
    });
    
    await newLearningPath.save();
    return { success: true, data: newLearningPath };
  } catch (error) {
    console.error('Öğrenme yolu oluşturulurken hata:', error);
    return { success: false, error: 'Öğrenme yolu oluşturulamadı' };
  }
}

// Kullanıcının öğrenme yolundaki ilerlemesini getir
export async function getUserLearningPathProgress(userId: string, learningPathId: string) {
  try {
    const progress = await LearningPathProgressModel.findOne({
      userId,
      learningPathId
    });
    
    return { success: true, data: progress };
  } catch (error) {
    console.error('İlerleme bilgisi alınırken hata:', error);
    return { success: false, error: 'İlerleme bilgisi alınamadı' };
  }
}

// Kullanıcının tüm öğrenme yollarındaki ilerlemelerini getir
export async function getUserAllLearningPathsProgress(userId: string) {
  try {
    const progress = await LearningPathProgressModel.find({
      userId
    }).populate({
      path: 'learningPathId',
      select: 'title description category level thumbnailUrl tags'
    });
    
    return { success: true, data: progress };
  } catch (error) {
    console.error('İlerleme bilgileri alınırken hata:', error);
    return { success: false, error: 'İlerleme bilgileri alınamadı' };
  }
}

// Eğitim tamamlandığında öğrenme yolları ilerlemesini güncelle
export async function updateLearningPathProgressAfterTrainingCompletion(userId: string, trainingId: string) {
  try {
    // Bu eğitimin dahil olduğu öğrenme yollarını bul
    const learningPaths = await LearningPathModel.find({
      trainings: trainingId
    });
    
    // Eğer eğitim herhangi bir öğrenme yoluna dahil değilse, işlemi sonlandır
    if (!learningPaths || learningPaths.length === 0) {
      return { success: true, message: 'Bu eğitim herhangi bir öğrenme yoluna dahil değil' };
    }
    
    // Her bir öğrenme yolu için ilerlemeyi güncelle
    for (const path of learningPaths) {
      // Kullanıcının bu öğrenme yolundaki mevcut ilerlemesini bul veya oluştur
      let progress = await LearningPathProgressModel.findOne({
        userId,
        learningPathId: path._id
      });
      
      if (!progress) {
        progress = new LearningPathProgressModel({
          userId,
          learningPathId: path._id,
          completedTrainings: [trainingId],
          status: 'in-progress',
          startDate: new Date()
        });
      } else {
        // Tamamlanan eğitimi ekle (eğer zaten yoksa)
        if (!progress.completedTrainings.includes(new mongoose.Types.ObjectId(trainingId))) {
          progress.completedTrainings.push(new mongoose.Types.ObjectId(trainingId));
        }
        
        // Son erişim zamanını güncelle
        progress.lastAccessed = new Date();
      }
      
      // İlerlemeyi hesapla
      const totalTrainings = path.trainings.length;
      const completedTrainings = progress.completedTrainings.length;
      progress.progress = Math.round((completedTrainings / totalTrainings) * 100);
      
      // Tüm eğitimler tamamlandıysa, öğrenme yolunu tamamlanmış olarak işaretle
      if (progress.progress === 100) {
        progress.status = 'completed';
        progress.completionDate = new Date();
      }
      
      await progress.save();
    }
    
    return { success: true, message: 'Öğrenme yolu ilerlemesi güncellendi' };
  } catch (error) {
    console.error('Öğrenme yolu ilerlemesi güncellenirken hata:', error);
    return { success: false, error: 'Öğrenme yolu ilerlemesi güncellenemedi' };
  }
}

// Öğrenme yolu için kullanıcıya önerilen eğitimleri getir
export async function getRecommendedLearningPaths(userId: string, limit = 5) {
  try {
    // Kullanıcının tamamladığı eğitimleri bul
    const completedTrainings = await ProgressModel.find({
      userId,
      status: 'completed'
    }).select('trainingId');
    
    const completedTrainingIds = completedTrainings.map(p => p.trainingId);
    
    // Kullanıcının başladığı ama tamamlamadığı öğrenme yollarını bul
    const inProgressPaths = await LearningPathProgressModel.find({
      userId,
      status: 'in-progress'
    }).select('learningPathId');
    
    const inProgressPathIds = inProgressPaths.map(p => p.learningPathId);
    
    // Kullanıcının tamamladığı eğitimlerin kategorilerini bul
    const userTrainings = await TrainingModel.find({
      _id: { $in: completedTrainingIds }
    }).select('tags category');
    
    const userCategories = [...new Set(userTrainings.map(t => t.category))];
    const userTags = [...new Set(userTrainings.flatMap(t => t.tags))];
    
    // Kullanıcının ilgili olabileceği öğrenme yollarını getir
    const recommendedPaths = await LearningPathModel.find({
      isPublished: true,
      _id: { $nin: inProgressPathIds }, // Başlanmamış olanları getir
      $or: [
        { category: { $in: userCategories } }, // Aynı kategoride olanlar
        { tags: { $in: userTags } } // Benzer etiketlere sahip olanlar
      ]
    })
    .limit(limit)
    .sort({ createdAt: -1 });
    
    return { success: true, data: recommendedPaths };
  } catch (error) {
    console.error('Önerilen öğrenme yolları alınırken hata:', error);
    return { success: false, error: 'Önerilen öğrenme yolları alınamadı' };
  }
}

// Öğrenme yolu için eksik eğitimleri getir
export async function getRemainingTrainingsForLearningPath(userId: string, learningPathId: string) {
  try {
    // Öğrenme yolunu bul
    const learningPath = await LearningPathModel.findById(learningPathId);
    if (!learningPath) {
      return { success: false, error: 'Öğrenme yolu bulunamadı' };
    }
    
    // Kullanıcının ilerleme bilgisini bul
    const progress = await LearningPathProgressModel.findOne({
      userId,
      learningPathId
    });
    
    // Tamamlanan eğitimleri belirle
    const completedTrainingIds = progress ? progress.completedTrainings.map(id => id.toString()) : [];
    
    // Eksik eğitimleri belirle
    const remainingTrainingIds = learningPath.trainings
      .map(id => id.toString())
      .filter(id => !completedTrainingIds.includes(id));
    
    // Eksik eğitimlerin detaylarını getir
    const remainingTrainings = await TrainingModel.find({
      _id: { $in: remainingTrainingIds }
    });
    
    return { success: true, data: remainingTrainings };
  } catch (error) {
    console.error('Eksik eğitimler alınırken hata:', error);
    return { success: false, error: 'Eksik eğitimler alınamadı' };
  }
}

// Öğrenme yolunu güncelle
export async function updateLearningPath(id: string, updateData: Partial<ILearningPath>) {
  try {
    const updatedPath = await LearningPathModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    
    if (!updatedPath) {
      return { success: false, error: 'Öğrenme yolu bulunamadı' };
    }
    
    return { success: true, data: updatedPath };
  } catch (error) {
    console.error('Öğrenme yolu güncellenirken hata:', error);
    return { success: false, error: 'Öğrenme yolu güncellenemedi' };
  }
}

// Öğrenme yolunu sil
export async function deleteLearningPath(id: string) {
  try {
    // Öğrenme yolunu sil
    const deletedPath = await LearningPathModel.findByIdAndDelete(id);
    
    if (!deletedPath) {
      return { success: false, error: 'Öğrenme yolu bulunamadı' };
    }
    
    // İlgili ilerleme kayıtlarını da sil
    await LearningPathProgressModel.deleteMany({ learningPathId: id });
    
    return { success: true, data: deletedPath };
  } catch (error) {
    console.error('Öğrenme yolu silinirken hata:', error);
    return { success: false, error: 'Öğrenme yolu silinemedi' };
  }
} 