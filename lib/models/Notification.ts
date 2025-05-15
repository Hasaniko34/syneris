import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User";
import { createSafeModel, isClient } from './fixBrowserModelAccess';

// Bildirim tipleri
export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  TRAINING = 'training',
  SYSTEM = 'system',
  ASSIGNMENT = 'assignment',
  COMMENT = 'comment',
  MENTION = 'mention',
  COMPLETION = 'completion'
}

// Notification arayüzü
export interface INotification extends Document {
  userId: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  link?: string;
  data?: any;
  createdAt: Date;
  updatedAt: Date;
}

// Notification şeması
const NotificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: Object.values(NotificationType),
      default: NotificationType.INFO
    },
    read: {
      type: Boolean,
      default: false,
      index: true
    },
    link: {
      type: String,
      default: null
    },
    data: {
      type: Schema.Types.Mixed,
      default: null
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Bildirim sayısını almak için endeks
NotificationSchema.index({ userId: 1, read: 1 });

// createSafeModel yardımcı fonksiyonu ile güvenli model oluşturma
const NotificationModel = createSafeModel('Notification', NotificationSchema, mongoose);

export const Notification = NotificationModel;

export default Notification; 