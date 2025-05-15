import mongoose, { Schema } from 'mongoose';

export interface ICompany {
  name: string;
  domain: string;
  logo?: string;
  description?: string;
  website?: string;
  address?: string;
  phone?: string;
  employees?: number;
  industry?: string;
  plan?: 'free' | 'basic' | 'premium' | 'enterprise';
  settings?: {
    allowedEmailDomains?: string[];
    autoApproveUsers?: boolean;
    defaultUserRole?: 'user' | 'trainer' | 'manager';
    customization?: {
      primaryColor?: string;
      secondaryColor?: string;
      logo?: string;
      favicon?: string;
    };
    features?: {
      enabledFeatures?: string[];
      maxUsers?: number;
      maxCourses?: number;
      maxStorage?: number; // MB cinsinden
    };
  };
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  subscription?: {
    plan?: string;
    startDate?: Date;
    active?: boolean;
  };
}

const CompanySchema = new Schema<ICompany>(
  {
    name: { type: String, required: true },
    domain: { type: String, required: true, unique: true },
    logo: { type: String },
    description: { type: String },
    website: { type: String },
    address: { type: String },
    phone: { type: String },
    employees: { type: Number },
    industry: { type: String },
    plan: { 
      type: String, 
      enum: ['free', 'basic', 'premium', 'enterprise'], 
      default: 'free' 
    },
    subscription: {
      plan: { type: String, default: 'free' },
      startDate: { type: Date, default: Date.now },
      active: { type: Boolean, default: true }
    },
    settings: {
      allowedEmailDomains: [{ type: String }],
      autoApproveUsers: { type: Boolean, default: true },
      defaultUserRole: { 
        type: String, 
        enum: ['user', 'trainer', 'manager'], 
        default: 'user' 
      },
      customization: {
        primaryColor: { type: String },
        secondaryColor: { type: String },
        logo: { type: String },
        favicon: { type: String }
      },
      features: {
        enabledFeatures: [{ type: String }],
        maxUsers: { type: Number, default: 10 },
        maxCourses: { type: Number, default: 5 },
        maxStorage: { type: Number, default: 1024 } // 1GB
      }
    },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

console.log('Company şeması tanımlandı');

// Company modelini güvenli bir şekilde oluştur
let CompanyModel: any;

try {
  console.log('MongoDB bağlantı durumu:', mongoose.connection.readyState);
  
  // İstemci tarafında çalışırken mongoose kullanmaya çalışırsa hata vermemesi için
  if (mongoose.connection.readyState >= 1) {
    if (mongoose.models.Company) {
      console.log('Mevcut Company modeli kullanılıyor');
      CompanyModel = mongoose.models.Company;
    } else {
      console.log('Yeni Company modeli oluşturuluyor');
      CompanyModel = mongoose.model<ICompany>('Company', CompanySchema);
    }
  } else {
    console.log('Veritabanı bağlantısı yok, dummy model döndürülüyor');
    // Bağlantı yoksa dummy bir model döndür
    CompanyModel = { findById: () => null, find: () => [], findOne: () => null, create: () => null };
  }
} catch (error) {
  console.error('Company modeli oluşturulurken hata:', error);
  // Hata durumunda boş bir nesne döndür
  CompanyModel = { findById: () => null, find: () => [], findOne: () => null, create: () => null };
}

export default CompanyModel; 