'use client';

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, AlertTriangle, Loader2 } from "lucide-react";

// useSearchParams kullanan asıl içerik
function AuthErrorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("Geçersiz kimlik bilgileri veya oturum zaman aşımına uğramış olabilir. Lütfen bilgilerinizi kontrol edip tekrar deneyin.");
  const [errorTitle, setErrorTitle] = useState("Kimlik Doğrulama Hatası");

  useEffect(() => {
    // URL'den error parametresini alma
    const error = searchParams.get("error");
    
    if (error) {
      // Hata türüne göre mesaj güncelleme
      switch (error) {
        case "Signin":
          setErrorMessage("Giriş yaparken bir hata oluştu. Lütfen tekrar deneyin.");
          break;
        case "CredentialsSignin":
          setErrorMessage("E-posta adresiniz veya şifreniz hatalı. Lütfen bilgilerinizi kontrol edip tekrar deneyin.");
          break;
        case "OAuthSignin":
        case "OAuthCallback":
          setErrorMessage("Sosyal giriş sırasında bir hata oluştu. Lütfen tekrar deneyin veya başka bir yöntem kullanın.");
          break;
        case "OAuthAccountNotLinked":
          setErrorMessage("Bu e-posta adresi başka bir giriş yöntemiyle ilişkilendirilmiş. Lütfen daha önce kullandığınız giriş yöntemini deneyin.");
          break;
        case "EmailCreateAccount":
          setErrorMessage("E-posta ile hesap oluşturma sırasında bir hata oluştu. Lütfen tekrar deneyin.");
          break;
        case "AccessDenied":
          setErrorTitle("Erişim Reddedildi");
          setErrorMessage("Bu sayfaya erişim izniniz bulunmuyor. Erişim yetkiniz olduğunu düşünüyorsanız lütfen yöneticinizle iletişime geçin.");
          break;
        case "SessionRequired":
          setErrorMessage("Bu sayfaya erişmek için oturum açmanız gerekmektedir. Lütfen giriş yapın.");
          break;
        default:
          setErrorMessage("Giriş işlemi sırasında beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.");
      }
    }
  }, [searchParams]);

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Bir Hata Oluştu</h1>
        <p className="text-muted-foreground">
          Giriş işlemi sırasında bir sorunla karşılaştık.
        </p>
      </div>
      
      <Card className="border-destructive/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <CardTitle>{errorTitle}</CardTitle>
          </div>
          <CardDescription>
            Hesabınıza erişim sağlarken bir sorun oluştu.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-destructive/10 text-destructive p-4 rounded-md">
            <p className="font-medium">Hata Nedeni:</p>
            <p className="text-sm mt-1">
              {errorMessage}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/auth/signin">
              Giriş Sayfasına Dön
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/contact">
              Yardım İsteyin
            </Link>
          </Button>
        </CardFooter>
      </Card>
      
      <div className="space-y-4">
        <div className="bg-muted/50 p-4 rounded-md">
          <h3 className="text-sm font-medium mb-2">Sorunu çözmek için şunları deneyebilirsiniz:</h3>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
            <li>Tarayıcı çerezlerinizi temizleyin ve tekrar deneyin</li>
            <li>Farklı bir tarayıcı veya cihaz kullanın</li>
            <li>Şifrenizi sıfırlayın ve yeni bir şifre oluşturun</li>
            <li>Kurumsal e-posta adresinizin doğru olduğundan emin olun</li>
          </ul>
        </div>
        
        <div className="text-center">
          <Link href="/" className="inline-flex items-center text-sm text-primary hover:underline">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}

// Ana sayfa bileşeni
export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    }>
      <AuthErrorContent />
    </Suspense>
  );
} 