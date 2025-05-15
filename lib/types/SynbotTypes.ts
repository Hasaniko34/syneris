/**
 * SynBot Etkileşim Tipleri
 */
export enum SynbotInteractionType {
  CHAT = 'chat',                      // Normal sohbet etkileşimi
  ERROR_CORRECTION = 'error',         // Hata düzeltme yardımı
  CODE_EXPLANATION = 'explanation',   // Kod açıklama
  TRAINING = 'training',              // Eğitim içeriği sunma
  CODE_GENERATION = 'generation',     // Kod oluşturma
  ASSESSMENT = 'assessment',          // Değerlendirme/quiz
  TRAINING_GUIDANCE = 'training_guidance', // Eğitim rehberliği
  RECOMMENDATION = 'recommendation'   // Öneriler
}

/**
 * SynBot Session Durumu
 */
export enum SessionStatus {
  ACTIVE = 'active',           // Aktif oturum
  ARCHIVED = 'archived',       // Arşivlenmiş oturum
  COMPLETED = 'completed'      // Tamamlanmış oturum
}

/**
 * Kullanıcı Geri Bildirim Tipleri
 */
export enum FeedbackType {
  HELPFUL = 'helpful',         // Yardımcı oldu
  NOT_HELPFUL = 'not_helpful', // Yardımcı olmadı 
  INCORRECT = 'incorrect'      // Yanlış bilgi
}

/**
 * Eğitim İçeriği Zorluk Seviyesi
 */
export enum TrainingDifficulty {
  BEGINNER = 'beginner',         // Başlangıç seviyesi
  INTERMEDIATE = 'intermediate', // Orta seviye
  ADVANCED = 'advanced'          // İleri seviye
}

/**
 * Eğitim İçeriği Tipi
 */
export enum TrainingType {
  ARTICLE = 'article',       // Makale
  VIDEO = 'video',           // Video
  INTERACTIVE = 'interactive', // Etkileşimli içerik
  EXERCISE = 'exercise',     // Alıştırma
  PROJECT = 'project'        // Proje
}

/**
 * SynBot Oturumu arayüzü
 */
export interface ISynbotSession {
  id: string;
  title: string;
  description?: string;
  userId: string;
  createdAt: Date;
  lastInteractionAt: Date;
  messageCount: number;
  status: SessionStatus;
  primaryType: SynbotInteractionType;
  lastMessage?: string;
  lastResponse?: string;
  metadata?: Record<string, any>;
}

/**
 * SynBot Etkileşim arayüzü
 */
export interface ISynbotInteraction {
  id: string;
  userId: string;
  sessionId: string;
  content: string;
  response: string;
  type: SynbotInteractionType;
  timestamp: Date;
  feedback?: FeedbackType;
  metadata?: Record<string, any>;
}

/**
 * Eğitim İçeriği arayüzü
 */
export interface ITraining {
  id: string;
  title: string;
  description: string;
  content: string;
  type: TrainingType;
  duration: number; // Dakika cinsinden
  difficulty: TrainingDifficulty;
  topics: string[];
  prerequisites?: string[];
  resources?: {
    title: string;
    url: string;
    type: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Kullanıcı İlerleme arayüzü
 */
export interface IProgress {
  id: string;
  userId: string;
  trainingId: string;
  completionRate: number; // 0-1 arası
  startedAt: Date;
  lastAccessedAt: Date;
  completedAt?: Date;
  assessmentScore?: number; // 0-100 arası
  notes?: string;
}

/**
 * Hata Analizi Sonucu arayüzü
 */
export interface IErrorAnalysis {
  errorType: string;
  possibleCauses: string[];
  suggestedFixes: string[];
  confidence: number; // 0-1 arası
}

/**
 * Kullanıcı İçgörüsü arayüzü
 */
export interface IUserInsight {
  completionRate: number;
  topicStrengths: {
    topic: string;
    strength: number;
  }[];
  topicWeaknesses: {
    topic: string;
    strength: number;
  }[];
  learningPatterns: {
    timeOfDay: {
      morning: number;
      afternoon: number;
      evening: number;
      night: number;
    };
    daysOfWeek: Record<string, number>;
    averageSessionLength: number;
  };
  recommendations: {
    text: string;
    confidence: number;
    type: string;
  }[];
}

/**
 * Eğitim Planı Günü arayüzü
 */
export interface ITrainingPlanDay {
  dayOfWeek: string;
  contents: {
    id: string;
    title: string;
    description: string;
    type: TrainingType;
    duration: number;
    difficulty: TrainingDifficulty;
    topics: string[];
    completionRate: number;
  }[];
  totalDuration: number;
}

// SynbotSession enum tipleri
export enum SynbotSessionType {
  CHAT = 'chat',
  TASK = 'task',
  LEARNING = 'learning',
  PROBLEM_SOLVING = 'problem_solving'
}

// Client taraflı basit arayüzler
export interface IClientSynbotInteraction {
  interactionId: string;
  sessionId: string;
  userId: string;
  isUserMessage: boolean;
  content: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

export interface IClientSynbotSession {
  sessionId: string;
  userId: string;
  title: string;
  description?: string;
  status: SessionStatus;
  type: SynbotSessionType;
  context?: Record<string, any>;
  metadata?: Record<string, any>;
  lastInteractionAt: Date;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  messageCount: number;
  relatedResourceId?: string;
} 