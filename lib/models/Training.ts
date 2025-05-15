import mongoose, { Schema, Document } from 'mongoose';

// Adım arayüzü
export interface IStep extends Document {
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  order: number;
}

// Modül arayüzü
export interface IModule extends Document {
  title: string;
  description: string;
  steps: IStep[];
  order: number;
}

// Eğitim arayüzü
export interface ITraining extends Document {
  title: string;
  description: string;
  company: string;
  thumbnail?: string;
  modules: IModule[];
  tags: string[];
  isPublished: boolean;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const StepSchema = new Schema<IStep>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  videoUrl: { type: String },
  order: { type: Number, required: true }
});

const ModuleSchema = new Schema<IModule>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  steps: [StepSchema],
  order: { type: Number, required: true }
});

const TrainingSchema = new Schema<ITraining>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    thumbnail: { type: String },
    modules: [ModuleSchema],
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

// İstemci tarafında çalışıp çalışmadığımızı kontrol et
const isClientSide = typeof window !== 'undefined';

// Tarayıcı ortamında model oluşturmayı atlayalım
let TrainingModel;
if (!isClientSide) {
  TrainingModel = mongoose.models.Training || mongoose.model<ITraining>('Training', TrainingSchema);
} else {
  // Tarayıcı ortamında boş bir nesne döndür
  // @ts-expect-error - Bu kısım client tarafında çalışırken tiplemeler önemli değil
  TrainingModel = {};
}

export default TrainingModel; 