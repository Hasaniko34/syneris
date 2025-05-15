import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { getCompanyAnalytics } from "@/lib/services/analytics";

// Session türü için genişletilmiş interface
interface ExtendedUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
  company?: string;
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

    // Sadece admin ve manager rolündeki kullanıcılar şirket verilerini görebilir
    if (!user.role || !["admin", "manager"].includes(user.role)) {
      return NextResponse.json({ error: "Bu veriye erişim yetkiniz yok" }, { status: 403 });
    }

    // URL'den parametreleri al
    const searchParams = req.nextUrl.searchParams;
    const timeRange = searchParams.get("timeRange") || "month";
    const companyId = searchParams.get("companyId") || user.company;

    // companyId'nin tanımlı olduğundan emin ol
    if (!companyId) {
      return NextResponse.json({ error: "Şirket ID'si belirtilmemiş" }, { status: 400 });
    }

    // Yönetici değilseniz, sadece kendi şirketinizi görebilirsiniz
    if (user.role !== "admin" && companyId !== user.company) {
      return NextResponse.json({ error: "Bu şirketin verilerine erişim yetkiniz yok" }, { status: 403 });
    }

    // Analiz verilerini getir
    const analyticsData = await getCompanyAnalytics(companyId, timeRange as string);

    return NextResponse.json({ 
      success: true, 
      data: analyticsData,
      meta: {
        companyId,
        timeRange,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error: any) {
    console.error("Şirket analiz verileri alınırken hata oluştu:", error);
    
    return NextResponse.json(
      { error: error.message || "Şirket analiz verileri alınamadı" },
      { status: 500 }
    );
  }
} 