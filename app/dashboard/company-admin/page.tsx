import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CompanyAdminDashboardPage() {
  // Sayfa seviyesinde oturum ve rol kontrolü
  const session = await getServerSession(authOptions);
  
  if (!session) {
    // Oturumu yoksa giriş sayfasına yönlendir
    redirect("/auth/signin?callbackUrl=/dashboard/company-admin");
  }
  
  // Rol kontrolü - sadece admin ve manager rollerinde erişime izin ver
  if (session.user.role !== "admin" && session.user.role !== "manager") {
    console.warn("Yetkisiz şirket yönetici sayfası erişim girişimi:", {
      userId: session.user.id,
      email: session.user.email,
      role: session.user.role,
      requiredRole: "admin or manager"
    });
    
    // Yetkisiz kullanıcıyı ana dashboard'a yönlendir
    redirect("/dashboard");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Şirket Yönetimi</h1>
      
      <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Şirket Yönetim Paneli</h2>
        <p className="mb-4">Bu sayfaya sadece admin veya manager rolündeki kullanıcılar erişebilir.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
            <h3 className="font-medium mb-2">Şirket Kullanıcıları</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Şirket kullanıcılarını görüntüleyin ve yönetin
            </p>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
            <h3 className="font-medium mb-2">Kurs Atama</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Kullanıcılara kurs ve eğitim atama işlemleri
            </p>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
            <h3 className="font-medium mb-2">İlerleme Raporları</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Kullanıcı bazlı ilerleme raporlarını görüntüleyin
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Kullanıcı Bilgileri</h2>
        <pre className="bg-gray-100 dark:bg-slate-700 p-4 rounded overflow-auto">
          {JSON.stringify(
            {
              id: session.user.id,
              name: session.user.name,
              email: session.user.email,
              role: session.user.role,
              company: session.user.company
            }, 
            null, 2
          )}
        </pre>
      </div>
    </div>
  );
} 