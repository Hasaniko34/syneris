import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { getUserLearningAnalytics } from "@/lib/services/analytics";

// Session türü için genişletilmiş interface
interface ExtendedUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  id?: string;
  role?: string;
}

export async function GET(req: NextRequest) {
  try {
    // Kullanıcı oturumunu kontrol et
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Yetkilendirme hatası" }, { status: 401 });
    }

    // Kullanıcıyı genişletilmiş tipe dönüştür
    const user = session.user as ExtendedUser;

    // URL'den parametreleri al
    const searchParams = req.nextUrl.searchParams;
    const timeRange = searchParams.get("timeRange") || "month";
    const userId = searchParams.get("userId") || user.id;

    // userId'nin tanımlı olduğundan emin ol
    if (!userId) {
      return NextResponse.json({ error: "Kullanıcı ID'si belirtilmemiş" }, { status: 400 });
    }

    // Yönetici olmayan kullanıcılar sadece kendi verilerini görebilir
    if (userId !== user.id && user.role !== "admin") {
      return NextResponse.json({ error: "Yetkilendirme hatası" }, { status: 403 });
    }

    // Analiz verilerini getir
    const analyticsData = await getUserLearningAnalytics(userId, timeRange as string);

    return NextResponse.json({ 
      success: true, 
      data: analyticsData,
      meta: {
        userId,
        timeRange,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error: any) {
    console.error("Analiz verileri alınırken hata oluştu:", error);
    
    return NextResponse.json(
      { error: error.message || "Analiz verileri alınamadı" },
      { status: 500 }
    );
  }
} 