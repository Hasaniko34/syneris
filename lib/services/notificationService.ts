import { connectDB } from "@/lib/db";
import Notification, { INotification, NotificationType } from "@/lib/models/Notification";
import { Types } from "mongoose";
import mongoose from 'mongoose';
import { FilterQuery } from 'mongoose';
import { EventEmitter } from 'events';

// Bildirim oluşturma için parametre arayüzü
interface CreateNotificationParams {
  type: NotificationType;
  title: string;
  content?: string;
  link?: string;
  recipient: string; // userId
  sender?: string; // userId (isteğe bağlı)
  importance?: "low" | "medium" | "high";
  expiresAt?: Date;
  metadata?: Record<string, any>;
}

// Bildirim filtreleme için parametre arayüzü
interface GetNotificationsParams {
  userId: string;
  limit?: number;
  skip?: number;
  read?: boolean;
  type?: NotificationType | NotificationType[];
  dateFrom?: Date;
  dateTo?: Date;
}

// Bildirim sorgulama parametreleri arayüzü
export interface NotificationQueryParams {
  page?: number;
  limit?: number;
  read?: boolean;
  type?: string;
}

// Bildirim yanıt arayüzü
export interface NotificationResponse {
  notifications: INotification[];
  totalCount: number;
  unreadCount: number;
  page: number;
  totalPages: number;
  limit: number;
}

// Bildirim oluşturma veri arayüzü
export interface CreateNotificationDto {
  userId: string;
  title: string;
  message: string;
  type: string;
  link?: string;
  data?: any;
}

// Bildirim olayları için enum
export enum NotificationEvent {
  NEW_NOTIFICATION = 'newNotification',
  READ_NOTIFICATION = 'readNotification',
  READ_ALL_NOTIFICATIONS = 'readAllNotifications',
  DELETE_NOTIFICATION = 'deleteNotification',
  DELETE_ALL_NOTIFICATIONS = 'deleteAllNotifications'
}

// Gerçek zamanlı bildirim olaylarını yönetmek için sınıf
export class NotificationEvents extends EventEmitter {
  constructor() {
    super();
  }
}

// Bildirim olayları örneği
export const notificationEvents = new NotificationEvents();

/**
 * Bildirim servis sınıfı
 */
export class NotificationService {
  /**
   * Yeni bir bildirim oluşturur
   */
  static async createNotification(params: CreateNotificationParams): Promise<INotification> {
    await connectDB();
    
    const notification = new Notification({
      type: params.type,
      title: params.title,
      content: params.content,
      link: params.link,
      recipient: new Types.ObjectId(params.recipient),
      sender: params.sender ? new Types.ObjectId(params.sender) : undefined,
      importance: params.importance || "medium",
      expiresAt: params.expiresAt,
      metadata: params.metadata,
      read: false,
    });
    
    await notification.save();
    return notification;
  }
  
  /**
   * Kullanıcının bildirimlerini alır
   */
  static async getNotifications(
    userId: string,
    params: NotificationQueryParams = {}
  ): Promise<NotificationResponse> {
    await connectDB();
    
    const { page = 1, limit = 10, read, type } = params;
    const skip = (page - 1) * limit;
    
    const filter: FilterQuery<INotification> = { userId };
    
    if (typeof read === 'boolean') {
      filter.read = read;
    }
    
    if (type) {
      filter.type = type;
    }
    
    const [totalCount, unreadCount, notifications] = await Promise.all([
      Notification.countDocuments(filter),
      Notification.countDocuments({ userId, read: false }),
      Notification.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
    ]);
    
    const totalPages = Math.ceil(totalCount / limit);
    
    return {
      notifications,
      totalCount,
      unreadCount,
      page,
      totalPages,
      limit
    };
  }
  
  /**
   * Bir bildirimi okundu olarak işaretler
   */
  static async markAsRead(notificationId: string, userId: string): Promise<INotification | null> {
    await connectDB();
    
    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, recipient: userId },
      { read: true },
      { new: true }
    );
    
    if (notification) {
      // Gerçek zamanlı bildirim olayını tetikle
      notificationEvents.emit(NotificationEvent.READ_NOTIFICATION, {
        notificationId,
        userId
      });
    }
    
    return notification;
  }
  
  /**
   * Tüm bildirimleri okundu olarak işaretler
   */
  static async markAllAsRead(userId: string): Promise<void> {
    await connectDB();
    
    await Notification.updateMany(
      { recipient: userId, read: false },
      { read: true }
    );
    
    // Gerçek zamanlı bildirim olayını tetikle
    notificationEvents.emit(NotificationEvent.READ_ALL_NOTIFICATIONS, {
      userId
    });
  }
  
  /**
   * Bir bildirimi siler
   */
  static async deleteNotification(notificationId: string, userId: string): Promise<boolean> {
    await connectDB();
    
    const result = await Notification.deleteOne({
      _id: notificationId,
      recipient: userId
    });
    
    if (result.deletedCount > 0) {
      // Gerçek zamanlı bildirim olayını tetikle
      notificationEvents.emit(NotificationEvent.DELETE_NOTIFICATION, {
        notificationId,
        userId
      });
      return true;
    }
    
    return false;
  }
  
  /**
   * Okunmuş bildirimleri temizler
   */
  static async clearReadNotifications(userId: string): Promise<number> {
    await connectDB();
    
    const result = await Notification.deleteMany({
      recipient: new Types.ObjectId(userId),
      read: true,
    });
    
    return result.deletedCount;
  }
  
  /**
   * Okunmamış bildirim sayısını alır
   */
  static async getUnreadCount(userId: string): Promise<number> {
    await connectDB();
    
    const count = await Notification.countDocuments({
      recipient: new Types.ObjectId(userId),
      read: false,
    });
    
    return count;
  }

  /**
   * Kullanıcının tüm bildirimlerini siler
   */
  static async deleteAllNotifications(userId: string): Promise<boolean> {
    await connectDB();
    
    const result = await Notification.deleteMany({ recipient: userId });
    
    if (result.deletedCount > 0) {
      // Gerçek zamanlı bildirim olayını tetikle
      notificationEvents.emit(NotificationEvent.DELETE_ALL_NOTIFICATIONS, {
        userId
      });
      return true;
    }
    
    return false;
  }
}

export default NotificationService; 