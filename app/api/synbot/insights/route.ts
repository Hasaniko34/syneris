import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { SynbotService } from "@/lib/services/synbotService";
import mongoose from 'mongoose';
import { dbConnect } from '@/lib/mongoose';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }
    
    // Session user.id artık Next.js 15'te doğrudan mevcut değil
    // E-posta üzerinden kullanıcı ID'sini bulalım
    await dbConnect();
    let userId = null;
    
    if (session.user.email) {
      const user = await mongoose.models.User.findOne({ email: session.user.email });
      if (user) {
        userId = user._id.toString();
      } else {
        return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });
      }
    } else {
      return NextResponse.json({ error: "Kullanıcı e-postası bulunamadı" }, { status: 400 });
    }
    
    // SynbotService'i kullanarak kullanıcı etkileşimlerini analiz et
    const insights = await SynbotService.getUserInsights(userId);
    
    return NextResponse.json({ insights });
  } catch (error) {
    console.error("SynBot insights error:", error);
    return NextResponse.json(
      { 
        error: "Etkileşim verileri alınırken bir hata oluştu", 
        details: error instanceof Error ? error.message : 'Bilinmeyen hata'
      }, 
      { status: 500 }
    );
  }
}

// Eğitim planı al
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }
    
    // Session user.id artık Next.js 15'te doğrudan mevcut değil
    // E-posta üzerinden kullanıcı ID'sini bulalım
    await dbConnect();
    let userId = null;
    
    if (session.user.email) {
      const user = await mongoose.models.User.findOne({ email: session.user.email });
      if (user) {
        userId = user._id.toString();
      } else {
        return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });
      }
    } else {
      return NextResponse.json({ error: "Kullanıcı e-postası bulunamadı" }, { status: 400 });
    }
    
    // SynbotService'i kullanarak kişiselleştirilmiş eğitim planı oluştur
    const plan = await SynbotService.createPersonalizedPlan(userId);
    
    return NextResponse.json({ plan });
  } catch (error) {
    console.error("SynBot training plan error:", error);
    return NextResponse.json(
      { 
        error: "Eğitim planı oluşturulurken bir hata oluştu", 
        details: error instanceof Error ? error.message : 'Bilinmeyen hata'
      }, 
      { status: 500 }
    );
  }
} 