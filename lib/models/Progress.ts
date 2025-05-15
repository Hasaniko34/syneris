import mongoose, { Schema } from 'mongoose';
import { createSafeModel } from './fixBrowserModelAccess';

export interface IProgress {
  userId: mongoose.Types.ObjectId;
  trainingId: mongoose.Types.ObjectId;
  completedModules: mongoose.Types.ObjectId[];
  completedSteps: mongoose.Types.ObjectId[];
  lastAccessed: Date;
  startDate: Date;
  completionDate?: Date;
  status: 'not-started' | 'in-progress' | 'completed';
  score?: number;
  timeSpent: number; // in minutes
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProgressSchema = new Schema<IProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    trainingId: { type: Schema.Types.ObjectId, ref: 'Training', required: true },
    completedModules: [{ type: Schema.Types.ObjectId, ref: 'Module' }],
    completedSteps: [{ type: Schema.Types.ObjectId, ref: 'Step' }],
    lastAccessed: { type: Date, default: Date.now },
    startDate: { type: Date, default: Date.now },
    completionDate: { type: Date },
    status: { 
      type: String, 
      enum: ['not-started', 'in-progress', 'completed'], 
      default: 'not-started' 
    },
    score: { type: Number },
    timeSpent: { type: Number, default: 0 },
    notes: { type: String }
  },
  { timestamps: true }
);

// Bileşik indeks
ProgressSchema.index({ userId: 1, trainingId: 1 }, { unique: true });

// Güvenli model oluşturma
const ProgressModel = createSafeModel('Progress', ProgressSchema, mongoose);

export default ProgressModel; 