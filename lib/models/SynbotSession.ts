import mongoose, { Schema, Document, Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { 
  ISynbotSession, 
  SynbotInteractionType, 
  SessionStatus,
  SynbotSessionType
} from '@/lib/types/SynbotTypes';

// SynbotTypes'dan enum değerlerini dışa aktarıyoruz
export { SessionStatus, SynbotSessionType };

// Sunucu tarafında mı çalışıyoruz?
const isClientSide = typeof window !== 'undefined';

// Document tipi
export interface SynbotSessionDocument extends ISynbotSession, Document {
  // Ekstra metotlar burada tanımlanabilir
}

// Model tipini tanımla
export type SynbotSessionModel = Model<SynbotSessionDocument>;

// Mongoose schema tanımı
const SynbotSessionSchema = new Schema({
  _id: {
    type: String,
    default: () => uuidv4()
  },
  title: {
    type: String,
    required: true,
    default: 'Yeni SynBot Oturumu'
  },
  description: {
    type: String
  },
  userId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastInteractionAt: {
    type: Date,
    default: Date.now
  },
  messageCount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: Object.values(SessionStatus),
    default: SessionStatus.ACTIVE
  },
  primaryType: {
    type: String,
    enum: Object.values(SynbotInteractionType),
    default: SynbotInteractionType.CHAT
  },
  lastMessage: {
    type: String
  },
  lastResponse: {
    type: String
  },
  metadata: {
    type: Map,
    of: Schema.Types.Mixed,
    default: {}
  },
  type: {
    type: String,
    enum: Object.values(SynbotSessionType),
    default: SynbotSessionType.CHAT,
    index: true
  },
  context: {
    type: Schema.Types.Mixed,
    default: {}
  },
  completedAt: { type: Date },
  relatedResourceId: { type: String },
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

// İndeksler
SynbotSessionSchema.index({ userId: 1, status: 1, updatedAt: -1 });
SynbotSessionSchema.index({ type: 1, updatedAt: -1 });
SynbotSessionSchema.index({ userId: 1, lastInteractionAt: -1 });

// Modeli oluştur
let SynbotSession: SynbotSessionModel | null = null;

// Eğer tarayıcı tarafındaysak model oluşturma
if (!isClientSide) {
  try {
    // Model önceden tanımlı mı kontrol et
    SynbotSession = (mongoose.models.SynbotSession as SynbotSessionModel) || 
      mongoose.model<SynbotSessionDocument>('SynbotSession', SynbotSessionSchema);
  } catch (error) {
    SynbotSession = mongoose.model<SynbotSessionDocument>('SynbotSession', SynbotSessionSchema);
  }
}

// Yeni bir oturum oluştur
export async function createSession(data: {
  userId: string;
  title?: string;
  description?: string;
  primaryType?: SynbotInteractionType;
  metadata?: Record<string, any>;
}) {
  const { 
    userId, 
    title = 'Yeni SynBot Oturumu', 
    description, 
    primaryType = SynbotInteractionType.CHAT,
    metadata = {}
  } = data;
  
  if (!SynbotSession) {
    throw new Error('SynbotSession modeli oluşturulmamış');
  }
  
  const session = await SynbotSession.create({
    userId,
    title,
    description,
    primaryType,
    metadata,
    status: SessionStatus.ACTIVE,
    createdAt: new Date(),
    lastInteractionAt: new Date()
  });
  
  return session;
}

// Kullanıcının tüm oturumlarını getir
export async function getUserSessions(userId: string) {
  if (!SynbotSession) {
    console.warn('SynbotSession modeli oluşturulmamış, dummy veri dönüyor');
    // MongoDB bağlantısı yoksa örnek veri döndür
    return [
      {
        _id: "dummy-session-1",
        title: "Örnek Oturum 1",
        userId: userId,
        status: SessionStatus.ACTIVE,
        primaryType: SynbotInteractionType.CHAT,
        messageCount: 0,
        lastInteractionAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        metadata: {},
      }
    ];
  }
  
  try {
    const sessions = await SynbotSession.find({ userId })
      .sort({ lastInteractionAt: -1 })
      .lean()
      .exec();
    
    return sessions;
  } catch (error) {
    console.error("MongoDB oturum getirme hatası:", error);
    // Hata durumunda örnek veri döndür
    return [
      {
        _id: "error-session-1",
        title: "Veritabanı Bağlantı Hatası",
        userId: userId,
        status: SessionStatus.ACTIVE,
        primaryType: SynbotInteractionType.CHAT,
        messageCount: 0,
        lastInteractionAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        metadata: { error: true },
      }
    ];
  }
}

// Oturum durumunu güncelle
export async function updateSessionStatus(sessionId: string, status: SessionStatus) {
  if (!SynbotSession) {
    throw new Error('SynbotSession modeli oluşturulmamış');
  }
  
  const session = await SynbotSession.findByIdAndUpdate(
    sessionId,
    { status },
    { new: true }
  );
  
  return session;
}

// Oturumu sil
export async function deleteSession(sessionId: string) {
  if (!SynbotSession) {
    throw new Error('SynbotSession modeli oluşturulmamış');
  }
  
  await SynbotSession.findByIdAndDelete(sessionId);
  return { success: true };
}

// Birden fazla oturumu sil
export async function deleteSessions(sessionIds: string[]) {
  if (!SynbotSession) {
    throw new Error('SynbotSession modeli oluşturulmamış');
  }
  
  await SynbotSession.deleteMany({ _id: { $in: sessionIds } });
  return { success: true, count: sessionIds.length };
}

// Oturumu ID'ye göre getir
export async function getSessionById(sessionId: string) {
  if (!SynbotSession) {
    throw new Error('SynbotSession modeli oluşturulmamış');
  }
  
  const session = await SynbotSession.findById(sessionId);
  return session;
}

// Oturumu güncelle
export async function updateSession(sessionId: string, updateData: Record<string, any>) {
  if (!SynbotSession) {
    throw new Error('SynbotSession modeli oluşturulmamış');
  }
  
  const session = await SynbotSession.findByIdAndUpdate(
    sessionId,
    { $set: updateData },
    { new: true }
  );
  
  return session;
}

// Tip güvenliği için model export edilmeden önce tanım kontrolü
const SynbotSessionExport = SynbotSession as SynbotSessionModel;
export default SynbotSessionExport; 