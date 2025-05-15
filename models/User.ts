import mongoose, { Schema, models, model } from 'mongoose';

// Kullanıcının yetenek modeli
interface ISkill {
  name: string;
  level: number;
}

const SkillSchema = new Schema<ISkill>({
  name: { type: String, required: true },
  level: { type: Number, required: true, min: 0, max: 100 },
});

// Kullanıcının eğitim bilgileri modeli
interface IEducation {
  degree: string;
  school: string;
  year: string;
}

const EducationSchema = new Schema<IEducation>({
  degree: { type: String, required: true },
  school: { type: String, required: true },
  year: { type: String, required: true },
});

// Sertifika modeli
interface ICertificate {
  name: string;
  issuer: string;
  date: string;
  expires: string;
  id: string;
}

const CertificateSchema = new Schema<ICertificate>({
  name: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: String, required: true },
  expires: { type: String, required: true },
  id: { type: String, required: true },
});

// Ana kullanıcı modeli
export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'Admin' | 'Trainer' | 'User' | 'Manager';
  avatar?: string;
  company?: string;
  department?: string;
  phone?: string;
  location?: string;
  joinDate: Date;
  bio?: string;
  skills: ISkill[];
  education: IEducation[];
  certificates: ICertificate[];
  passwordLastChanged?: Date;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  lastLogin?: Date;
  isActive: boolean;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      required: true, 
      enum: ['Admin', 'Trainer', 'User', 'Manager'],
      default: 'User' 
    },
    avatar: { type: String },
    company: { type: String },
    department: { type: String },
    phone: { type: String },
    location: { type: String },
    joinDate: { type: Date, default: Date.now },
    bio: { type: String },
    skills: [SkillSchema],
    education: [EducationSchema],
    certificates: [CertificateSchema],
    passwordLastChanged: { type: Date },
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String },
    lastLogin: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// Koleksiyon adını users olarak belirle
const User = models.User || model<IUser>('User', UserSchema);

export default User; 