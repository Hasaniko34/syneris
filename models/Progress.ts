import mongoose, { Schema, models, model } from 'mongoose';

// Ders ilerleme modeli
interface ILessonProgress {
  lessonId: mongoose.Types.ObjectId;
  completed: boolean;
  lastWatched?: Date;
  watchedSeconds: number;
}

const LessonProgressSchema = new Schema<ILessonProgress>({
  lessonId: { 
    type: Schema.Types.ObjectId, 
    required: true,
  },
  completed: { type: Boolean, default: false },
  lastWatched: { type: Date },
  watchedSeconds: { type: Number, default: 0 },
});

// Quiz cevapları modeli
interface IQuizAnswer {
  questionId: mongoose.Types.ObjectId;
  selectedAnswer: number;
  isCorrect: boolean;
}

const QuizAnswerSchema = new Schema<IQuizAnswer>({
  questionId: { 
    type: Schema.Types.ObjectId, 
    required: true,
  },
  selectedAnswer: { type: Number, required: true },
  isCorrect: { type: Boolean, required: true },
});

// Quiz ilerleme modeli
interface IQuizProgress {
  quizId: mongoose.Types.ObjectId;
  completed: boolean;
  score: number; // 0-100 arası yüzde değeri
  answers: IQuizAnswer[];
  lastAttempt?: Date;
  attempts: number;
  passed: boolean;
}

const QuizProgressSchema = new Schema<IQuizProgress>({
  quizId: { 
    type: Schema.Types.ObjectId, 
    required: true,
  },
  completed: { type: Boolean, default: false },
  score: { type: Number, default: 0 },
  answers: [QuizAnswerSchema],
  lastAttempt: { type: Date },
  attempts: { type: Number, default: 0 },
  passed: { type: Boolean, default: false },
});

// Ana ilerleme modeli
export interface IProgress {
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  startDate: Date;
  lastActivity: Date;
  completionPercentage: number; // 0-100 arası
  isCompleted: boolean;
  completedOn?: Date;
  lessonsProgress: ILessonProgress[];
  quizzesProgress: IQuizProgress[];
  currentSection: number;
  currentLesson: number;
  certificateIssued: boolean;
  certificateIssuedDate?: Date;
  certificateId?: string;
}

const ProgressSchema = new Schema<IProgress>(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    courseId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Course', 
      required: true 
    },
    startDate: { type: Date, default: Date.now },
    lastActivity: { type: Date, default: Date.now },
    completionPercentage: { type: Number, default: 0 },
    isCompleted: { type: Boolean, default: false },
    completedOn: { type: Date },
    lessonsProgress: [LessonProgressSchema],
    quizzesProgress: [QuizProgressSchema],
    currentSection: { type: Number, default: 0 },
    currentLesson: { type: Number, default: 0 },
    certificateIssued: { type: Boolean, default: false },
    certificateIssuedDate: { type: Date },
    certificateId: { type: String },
  },
  {
    timestamps: true,
  }
);

// Benzersiz bir bileşik indeks oluştur (bir kullanıcı/kurs kombinasyonu için sadece bir ilerleme kaydı olabilir)
ProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

// Koleksiyon adını progresses olarak belirle
const Progress = models.Progress || model<IProgress>('Progress', ProgressSchema);

export default Progress; 