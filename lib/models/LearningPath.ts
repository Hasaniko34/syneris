import mongoose, { Schema, Document } from 'mongoose';

// Öğrenme Yolu arayüzü
export interface ILearningPath extends Document {
  title: string;
  description: string;
  category: string;
  level: string; // Başlangıç, Orta, İleri
  thumbnailUrl?: string;
  totalDuration: number; // dakika cinsinden
  trainings: mongoose.Types.ObjectId[]; // Bu yola dahil olan eğitimler
  tags: string[];
  isPublished: boolean;
  companyId?: mongoose.Types.ObjectId; // Şirkete özel ise
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const LearningPathSchema = new Schema<ILearningPath>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    level: { 
      type: String, 
      required: true,
      enum: ['Başlangıç', 'Orta', 'İleri']
    },
    thumbnailUrl: { type: String },
    totalDuration: { type: Number, default: 0 },
    trainings: [{ type: Schema.Types.ObjectId, ref: 'Training' }],
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: false },
    companyId: { type: Schema.Types.ObjectId, ref: 'Company' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

// İstemci tarafında çalışıp çalışmadığımızı kontrol et
const isClientSide = typeof window !== 'undefined';

// Tarayıcı ortamında model oluşturmayı atlayalım
let LearningPathModel;
if (!isClientSide) {
  LearningPathModel = mongoose.models.LearningPath || mongoose.model<ILearningPath>('LearningPath', LearningPathSchema);
} else {
  // Tarayıcı ortamında boş bir nesne döndür
  // @ts-expect-error - Bu kısım client tarafında çalışırken tiplemeler önemli değil
  LearningPathModel = {};
}

export default LearningPathModel; 