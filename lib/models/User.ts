import mongoose, { Schema, model, Model } from 'mongoose';
import crypto from 'crypto';
import { createSafeModel } from './fixBrowserModelAccess';

// Kullanıcı arayüzü
export interface IUser {
  name: string;
  email: string;
  password?: string;
  image?: string;
  company: string;
  role: 'admin' | 'user' | 'trainer' | 'manager';
  active: boolean;
  isVerified: boolean;
  progress?: Record<string, any>;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
  // Profil yönetimi için ek alanlar
  phone?: string;
  department?: string;
  location?: string;
  bio?: string;
  skills?: Array<{
    id: number;
    name: string;
    level: number;
  }>;
  education?: Array<{
    id: number;
    degree: string;
    school: string;
    year: string;
  }>;
  notificationPreferences?: {
    email: boolean;
    push: boolean;
    sms: boolean;
    courseUpdates: boolean;
    marketingEmails: boolean;
  };
  notificationSettings?: {
    email: {
      enabled: boolean;
      types: string[];
      digest: boolean;
      digestFrequency: 'daily' | 'weekly';
    };
    push: {
      enabled: boolean;
      types: string[];
      doNotDisturb: {
        enabled: boolean;
        startTime?: string;
        endTime?: string;
      };
    };
    inApp: {
      enabled: boolean;
      types: string[];
    };
  };
}

// Kullanıcı şeması
const UserSchema = new Schema<IUser>(
  {
    name: { 
      type: String, 
      required: [true, 'Ad alanı zorunludur'],
      trim: true 
    },
    email: { 
      type: String, 
      required: [true, 'E-posta alanı zorunludur'], 
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Lütfen geçerli bir e-posta adresi giriniz'] 
    },
    password: { 
      type: String,
      minlength: [8, 'Şifre en az 8 karakter olmalıdır']
    },
    image: { type: String },
    company: { 
      type: String, 
      required: [true, 'Şirket alanı zorunludur'],
      trim: true 
    },
    role: { 
      type: String, 
      enum: {
        values: ['admin', 'user', 'trainer', 'manager'],
        message: '{VALUE} geçerli bir rol değil'
      },
      default: 'user' 
    },
    active: { 
      type: Boolean, 
      default: true 
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    progress: { 
      type: Schema.Types.Mixed 
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    
    // Profil yönetimi için ek alanlar
    phone: { 
      type: String,
      trim: true
    },
    department: { 
      type: String,
      trim: true 
    },
    location: { 
      type: String,
      trim: true 
    },
    bio: { 
      type: String,
      trim: true
    },
    skills: [{ 
      id: Number,
      name: {
        type: String,
        trim: true
      },
      level: {
        type: Number,
        min: [1, 'Seviye 1-5 arasında olmalıdır'],
        max: [5, 'Seviye 1-5 arasında olmalıdır']
      }
    }],
    education: [{ 
      id: Number,
      degree: {
        type: String,
        trim: true
      },
      school: {
        type: String,
        trim: true
      },
      year: {
        type: String,
        trim: true
      }
    }],
    notificationPreferences: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      courseUpdates: { type: Boolean, default: true },
      marketingEmails: { type: Boolean, default: false }
    },
    notificationSettings: {
      email: {
        enabled: { type: Boolean, default: true },
        types: { type: [String], default: ['TRAINING', 'SYSTEM', 'ASSIGNMENT', 'MENTION'] },
        digest: { type: Boolean, default: true },
        digestFrequency: { type: String, enum: ['daily', 'weekly'], default: 'daily' }
      },
      push: {
        enabled: { type: Boolean, default: true },
        types: { type: [String], default: ['TRAINING', 'ASSIGNMENT', 'COMMENT', 'MENTION'] },
        doNotDisturb: {
          enabled: { type: Boolean, default: false },
          startTime: { type: String },
          endTime: { type: String }
        }
      },
      inApp: {
        enabled: { type: Boolean, default: true },
        types: { type: [String], default: ['TRAINING', 'SYSTEM', 'ASSIGNMENT', 'COMMENT', 'MENTION', 'INFO', 'SUCCESS', 'WARNING', 'ERROR', 'COMPLETION'] }
      }
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true }, // JSON çıktısında virtuals'ı dahil et
    toObject: { virtuals: true } // Object çıktısında virtuals'ı dahil et
  }
);

// Parola girişlerini güvenli hale getirmek için pre-save hook (örnek olarak)
// Not: Bu gerçek uygulamada route handler içerisinde bcrypt ile şifrelenmeli
UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  // Şifre değişmişse, burada bcrypt ile şifrelenebilir
  next();
});

// Kullanıcının tam adını birleştiren virtual alan
UserSchema.virtual('fullName').get(function() {
  return this.name;
});

// E-posta adresinden avatar URL oluşturan yardımcı method
UserSchema.methods.getAvatarUrl = function() {
  if (this.image) return this.image;
  
  // Gravatar kullanımı
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?d=mp`;
};

// Güvenli model oluşturma yardımcı fonksiyonu ile modeli tanımlama
const User = createSafeModel('User', UserSchema, mongoose);

export default User; 