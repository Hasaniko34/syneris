"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HizmetSeviyeAnlasmasiPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <span>Daha Fazla Bilgi</span>
        <ChevronRight className="mx-1 h-4 w-4" />
        <span>Hizmet Seviye Anlaşması</span>
      </div>
      
      <h1 className="text-4xl font-bold mb-8 border-b pb-4">Hizmet Seviye Anlaşması (SLA)</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-xl mb-6">
          Bu Hizmet Seviye Anlaşması (SLA), Syneris platformunun kullanımına ilişkin garanti edilen hizmet düzeylerini tanımlar. 
          Müşterilerimize sağladığımız hizmetin kalitesi ve güvenilirliği en önemli önceliğimizdir.
        </p>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4">1. Hizmet Kullanılabilirliği</h2>
        <p>
          Syneris, hizmetlerini %99.9 kullanılabilirlik oranıyla sunmayı taahhüt eder. 
          Bu, planlı bakım süreleri dışında hizmetin yılda en fazla 8.76 saat (365 günün %0.1'i) kesintiye uğrayabileceği anlamına gelir.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">1.1 Ölçüm Yöntemi</h3>
        <p>
          Kullanılabilirlik, aşağıdaki formülle ölçülür:
        </p>
        <div className="bg-muted p-4 rounded-md my-4">
          <code>Kullanılabilirlik = (Toplam Zaman - Plansız Kesinti Süresi) / Toplam Zaman</code>
        </div>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">1.2 Planlı Bakım</h3>
        <p>
          Planlı bakım süreleri SLA hesaplamalarına dahil edilmez. Planlı bakımlar, en az 48 saat öncesinden bildirilir 
          ve genellikle düşük kullanım saatlerinde gerçekleştirilir.
        </p>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4">2. Hizmet Yanıt Süresi</h2>
        <p>
          Syneris platformunun API yanıt süreleri optimum performans için izlenmektedir:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Standard API çağrıları: &lt; 500ms</li>
          <li>Veri yükleme işlemleri: &lt; 2 saniye</li>
          <li>Raporlama sorguları: &lt; 5 saniye</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4">3. Destek Süreleri ve Yanıt Süreleri</h2>
        <div className="overflow-x-auto my-6">
          <table className="min-w-full border-collapse border border-border">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border p-2">Öncelik Seviyesi</th>
                <th className="border border-border p-2">Tanım</th>
                <th className="border border-border p-2">İlk Yanıt Süresi</th>
                <th className="border border-border p-2">Çözüm Hedefi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-2 font-medium">Kritik</td>
                <td className="border border-border p-2">Servis kullanılamıyor veya ciddi performans sorunları var</td>
                <td className="border border-border p-2">30 dakika</td>
                <td className="border border-border p-2">4 saat</td>
              </tr>
              <tr>
                <td className="border border-border p-2 font-medium">Yüksek</td>
                <td className="border border-border p-2">Önemli işlevler etkilendi, iş operasyonları kısmen engellendi</td>
                <td className="border border-border p-2">2 saat</td>
                <td className="border border-border p-2">8 saat</td>
              </tr>
              <tr>
                <td className="border border-border p-2 font-medium">Orta</td>
                <td className="border border-border p-2">Küçük işlev sorunları, iş operasyonları devam edebilir</td>
                <td className="border border-border p-2">4 saat</td>
                <td className="border border-border p-2">24 saat</td>
              </tr>
              <tr>
                <td className="border border-border p-2 font-medium">Düşük</td>
                <td className="border border-border p-2">Küçük hatalar, kozmetik sorunlar</td>
                <td className="border border-border p-2">1 iş günü</td>
                <td className="border border-border p-2">3 iş günü</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4">4. Hizmet Kredileri</h2>
        <p>
          SLA taahhütlerimiz karşılanmadığı durumlarda, aşağıdaki tabloya göre hizmet kredileri sunulacaktır:
        </p>
        <div className="overflow-x-auto my-6">
          <table className="min-w-full border-collapse border border-border">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border p-2">Aylık Kullanılabilirlik</th>
                <th className="border border-border p-2">Hizmet Kredisi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-2">%99.0 - %99.89</td>
                <td className="border border-border p-2">Aylık faturanın %10'u</td>
              </tr>
              <tr>
                <td className="border border-border p-2">%95.0 - %98.99</td>
                <td className="border border-border p-2">Aylık faturanın %25'i</td>
              </tr>
              <tr>
                <td className="border border-border p-2">%95.0'dan düşük</td>
                <td className="border border-border p-2">Aylık faturanın %50'si</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4">5. İletişim</h2>
        <p>
          7/24 teknik destek ekibimizle aşağıdaki kanallardan iletişime geçebilirsiniz:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Destek Portalı: <a href="#" className="text-primary hover:underline">support.syneris.com</a></li>
          <li>Email: <a href="mailto:support@syneris.com" className="text-primary hover:underline">support@syneris.com</a></li>
          <li>Acil Destek Hattı: <a href="tel:+902123456789" className="text-primary hover:underline">+90 (212) 345 67 89</a></li>
        </ul>
        
        <div className="bg-muted p-6 rounded-lg mt-10">
          <h2 className="text-xl font-semibold mb-4">Bu anlaşmayla ilgili sorularınız mı var?</h2>
          <p className="mb-4">Satış veya destek ekibimiz, SLA koşullarımız hakkında daha fazla bilgi vermekten mutluluk duyacaktır.</p>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Satış Ekibiyle Görüşün</Button>
            <Button variant="outline">Destek Biletini Oluşturun</Button>
          </div>
        </div>
      </div>
    </div>
  );
} 