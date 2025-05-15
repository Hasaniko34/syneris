import mongoose, { Schema, models, model } from 'mongoose';

// Bölüm içindeki dersleri temsil eden model
interface ILesson {
  title: string;
  description: string;
  videoUrl?: string;
  duration: number; // dakika cinsinden
  order: number;
}

const LessonSchema = new Schema<ILesson>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String },
  duration: { type: Number, required: true, min: 0 },
  order: { type: Number, required: true, min: 0 },
});

// Bölüm modeli
interface ISection {
  title: string;
  description: string;
  order: number;
  lessons: ILesson[];
}

const SectionSchema = new Schema<ISection>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, required: true, min: 0 },
  lessons: [LessonSchema],
});

// Quiz sorusu modeli
interface IQuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // doğru cevabın options dizisindeki indeksi
}

const QuizQuestionSchema = new Schema<IQuizQuestion>({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: Number, required: true },
});

// Quiz modeli
interface IQuiz {
  title: string;
  description: string;
  questions: IQuizQuestion[];
  passingScore: number; // geçiş için gereken yüzde (0-100)
}

const QuizSchema = new Schema<IQuiz>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: [QuizQuestionSchema],
  passingScore: { type: Number, required: true, min: 0, max: 100, default: 70 },
});

// Ana kurs modeli
export interface ICourse {
  title: string;
  description: string;
  shortDescription: string;
  category: string[];
  level: 'Başlangıç' | 'Orta' | 'İleri';
  image: string;
  instructor: mongoose.Types.ObjectId;
  duration: number; // toplam dakika
  language: string;
  sections: ISection[];
  quizzes: IQuiz[];
  students: mongoose.Types.ObjectId[];
  requirements: string[];
  objectives: string[];
  price: number;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  isPublished: boolean;
  isFeatured: boolean;
  createdBy: mongoose.Types.ObjectId;
}

const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    category: { type: [String], required: true },
    level: { 
      type: String, 
      required: true, 
      enum: ['Başlangıç', 'Orta', 'İleri'] 
    },
    image: { type: String, required: true },
    instructor: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    duration: { type: Number, required: true, min: 0 },
    language: { type: String, required: true, default: 'Türkçe' },
    sections: [SectionSchema],
    quizzes: [QuizSchema],
    students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    requirements: { type: [String] },
    objectives: { type: [String] },
    price: { type: Number, required: true, default: 0 },
    discount: { type: Number, min: 0, max: 100 },
    rating: { type: Number, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    createdBy: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
  },
  {
    timestamps: true,
  }
);

// Toplam süreyi hesaplayan bir virtuel özellik ekleyelim
CourseSchema.virtual('totalDuration').get(function() {
  let total = 0;
  this.sections.forEach(section => {
    section.lessons.forEach(lesson => {
      total += lesson.duration;
    });
  });
  return total;
});

// Koleksiyon adını courses olarak belirle
const Course = models.Course || model<ICourse>('Course', CourseSchema);

export default Course; 