import mongoose, { Schema, Document } from 'mongoose';

// Öğrenme Yolundaki İlerleme arayüzü
export interface ILearningPathProgress extends Document {
  userId: mongoose.Types.ObjectId;
  learningPathId: mongoose.Types.ObjectId;
  completedTrainings: mongoose.Types.ObjectId[]; // Tamamlanan eğitimler
  progress: number; // Yüzde olarak ilerleme (0-100)
  lastAccessed: Date;
  startDate: Date;
  completionDate?: Date;
  status: 'not-started' | 'in-progress' | 'completed';
  totalTimeSpent: number; // dakika cinsinden
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LearningPathProgressSchema = new Schema<ILearningPathProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    learningPathId: { type: Schema.Types.ObjectId, ref: 'LearningPath', required: true },
    completedTrainings: [{ type: Schema.Types.ObjectId, ref: 'Training' }],
    progress: { type: Number, default: 0, min: 0, max: 100 },
    lastAccessed: { type: Date, default: Date.now },
    startDate: { type: Date, default: Date.now },
    completionDate: { type: Date },
    status: { 
      type: String, 
      enum: ['not-started', 'in-progress', 'completed'], 
      default: 'not-started' 
    },
    totalTimeSpent: { type: Number, default: 0 },
    notes: { type: String }
  },
  { timestamps: true }
);

// Bileşik indeks - bir kullanıcının bir öğrenme yolunda yalnızca bir ilerleme kaydı olabilir
LearningPathProgressSchema.index({ userId: 1, learningPathId: 1 }, { unique: true });

// İstemci tarafında çalışıp çalışmadığımızı kontrol et
const isClientSide = typeof window !== 'undefined';

// Tarayıcı ortamında model oluşturmayı atlayalım
let LearningPathProgressModel;
if (!isClientSide) {
  LearningPathProgressModel = mongoose.models.LearningPathProgress || 
                            mongoose.model<ILearningPathProgress>('LearningPathProgress', LearningPathProgressSchema);
} else {
  // Tarayıcı ortamında boş bir nesne döndür
  // @ts-expect-error - Bu kısım client tarafında çalışırken tiplemeler önemli değil
  LearningPathProgressModel = {};
}

export default LearningPathProgressModel; 