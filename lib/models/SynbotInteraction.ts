import mongoose, { Schema, Document, Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { connectToDatabase } from '@/lib/utils/mongodb';
import { 
  ISynbotInteraction, 
  SynbotInteractionType, 
  FeedbackType 
} from '@/lib/types/SynbotTypes';

// SynbotTypes'dan enum değerlerini dışa aktarıyoruz
export { SynbotInteractionType, FeedbackType };

// Sunucu tarafında mı çalışıyoruz?
const isClientSide = typeof window !== 'undefined';

// Document tipi
export interface SynbotInteractionDocument extends ISynbotInteraction, Document {
  // Ekstra metotlar burada tanımlanabilir
}

// Mongoose schema tanımı
const SynbotInteractionSchema = new Schema({
  _id: {
    type: String,
    default: () => uuidv4()
  },
  userId: {
    type: String,
    required: true,
    index: true
  },
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  content: {
    type: String,
    required: true
  },
  response: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: Object.values(SynbotInteractionType),
    default: SynbotInteractionType.CHAT
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  feedback: {
    type: String,
    enum: Object.values(FeedbackType),
  },
  metadata: {
    type: Map,
    of: Schema.Types.Mixed,
    default: {}
  }
}, { 
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// İndeksleme
SynbotInteractionSchema.index({ sessionId: 1, timestamp: 1 });
SynbotInteractionSchema.index({ userId: 1, timestamp: -1 });
SynbotInteractionSchema.index({ type: 1, timestamp: -1 });

// Model tipini tanımla
export type SynbotInteractionModel = Model<SynbotInteractionDocument>;

// Modeli oluştur
let SynbotInteraction: SynbotInteractionModel | null = null;

// Eğer tarayıcı tarafındaysak model oluşturma
if (!isClientSide) {
  try {
    // Model önceden tanımlı mı kontrol et
    SynbotInteraction = (mongoose.models.SynbotInteraction as SynbotInteractionModel) || 
      mongoose.model<SynbotInteractionDocument>('SynbotInteraction', SynbotInteractionSchema);
  } catch (error) {
    SynbotInteraction = mongoose.model<SynbotInteractionDocument>('SynbotInteraction', SynbotInteractionSchema);
  }
}

// Yeni bir etkileşim oluştur
export async function createInteraction(data: {
  userId: string;
  sessionId: string;
  content: string;
  response: string;
  type?: SynbotInteractionType;
  metadata?: Record<string, any>;
}) {
  const { 
    userId, 
    sessionId, 
    content, 
    response, 
    type = SynbotInteractionType.CHAT,
    metadata = {}
  } = data;
  
  if (!SynbotInteraction) {
    throw new Error('SynbotInteraction modeli oluşturulmamış');
  }
  
  const interaction = await SynbotInteraction.create({
    userId,
    sessionId,
    content,
    response,
    type,
    metadata,
    timestamp: new Date()
  });
  
  return interaction;
}

// Oturuma ait etkileşimleri getir
export async function getSessionInteractions(sessionId: string) {
  if (!SynbotInteraction) {
    throw new Error('SynbotInteraction modeli oluşturulmamış');
  }
  
  const interactions = await SynbotInteraction.find({ sessionId })
    .sort({ timestamp: 1 });
  
  return interactions;
}

// Kullanıcının son etkileşimlerini getir
export async function getUserInteractions(userId: string, limit = 50) {
  if (!SynbotInteraction) {
    throw new Error('SynbotInteraction modeli oluşturulmamış');
  }
  
  const interactions = await SynbotInteraction.find({ userId })
    .sort({ timestamp: -1 })
    .limit(limit);
  
  return interactions;
}

// Etkileşime geri bildirim ekle
export async function addFeedback(interactionId: string, feedback: FeedbackType) {
  if (!SynbotInteraction) {
    throw new Error('SynbotInteraction modeli oluşturulmamış');
  }
  
  const interaction = await SynbotInteraction.findByIdAndUpdate(
    interactionId,
    { feedback },
    { new: true }
  );
  
  return interaction;
}

// Belirli bir etkileşimi ID'ye göre getir
export async function getInteractionById(interactionId: string) {
  if (!SynbotInteraction) {
    throw new Error('SynbotInteraction modeli oluşturulmamış');
  }
  
  const interaction = await SynbotInteraction.findById(interactionId);
  return interaction;
}

// Tip güvenliği için model export edilmeden önce tanım kontrolü
const SynbotInteractionExport = SynbotInteraction as SynbotInteractionModel;
export default SynbotInteractionExport; 