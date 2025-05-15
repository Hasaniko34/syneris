"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileQuestion, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  
  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full mx-auto text-center space-y-6">
        <div className="relative mx-auto">
          <div className="w-24 h-24 bg-[#00A0D2]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileQuestion className="h-12 w-12 text-[#00A0D2]" />
          </div>
          <div className="absolute -top-2 -right-2">
            <div className="relative">
              <div className="animate-ping absolute h-6 w-6 rounded-full bg-[#FFD100]/50"></div>
              <div className="h-6 w-6 rounded-full bg-[#FFD100] flex items-center justify-center text-white font-bold text-sm">
                ?
              </div>
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-[#00A0D2] mb-2">Sayfa Bulunamadı</h1>
        
        <p className="text-muted-foreground mb-4">
          Aradığınız sayfa taşınmış, kaldırılmış veya hiç var olmamış olabilir.
        </p>
        
        <div className="bg-[#00A0D2]/5 p-6 rounded-lg mx-auto max-w-md mb-6">
          <h2 className="font-medium mb-2">Şunları deneyebilirsiniz:</h2>
          <ul className="text-left text-muted-foreground space-y-2">
            <li className="flex items-start gap-2">
              <div className="min-w-5 mt-0.5">•</div>
              <div>URL'yi kontrol edin, yazım hatası yapmış olabilirsiniz</div>
            </li>
            <li className="flex items-start gap-2">
              <div className="min-w-5 mt-0.5">•</div>
              <div>Ana sayfaya dönün ve aradığınız içeriğe tekrar ulaşmayı deneyin</div>
            </li>
            <li className="flex items-start gap-2">
              <div className="min-w-5 mt-0.5">•</div>
              <div>Eğitim kataloğunu ziyaret edin ve istediğiniz eğitimi arayın</div>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-[#00A0D2]/20 text-[#00A0D2] hover:bg-[#00A0D2]/10"
            onClick={handleGoBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Geri Dön
          </Button>
          
          <Button 
            size="lg" 
            className="bg-[#00A0D2] hover:bg-[#0080A8]"
            asChild
          >
            <Link href="/dashboard">
              <Home className="mr-2 h-4 w-4" />
              Ana Sayfaya Git
            </Link>
          </Button>
        </div>
        
        <div className="border-t border-[#e0f0fa] pt-6 mt-6">
          <p className="text-sm text-muted-foreground">
            Yardıma mı ihtiyacınız var? <Link href="/help" className="text-[#00A0D2] hover:underline">Destek sayfamızı</Link> ziyaret edin veya <Link href="/contact" className="text-[#00A0D2] hover:underline">bizimle iletişime geçin</Link>.
          </p>
        </div>
      </div>
    </div>
  );
} 