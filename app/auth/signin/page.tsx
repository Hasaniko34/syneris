"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "@/components/motion-wrapper";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { GoogleIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { ErrorMessage } from "@/components/auth/ErrorMessage";
import { SuccessMessage } from "@/components/auth/SuccessMessage";

// Animasyon varyantları
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

// Validation schema
const formSchema = z.object({
  email: z.string().email({
    message: "Geçerli bir e-posta adresi giriniz",
  }),
  password: z.string().min(6, {
    message: "Şifre en az 6 karakter olmalıdır",
  }),
});

// Metadata'yı kaldırdık - client component'lerden metadata export edilemiyor

// Sistem başlatma bileşeni
const SystemInitializer = () => {
  useCallback(() => {
    // Uygulama başlatıldığında sistem kontrolünü yap
    const initSystem = async () => {
      try {
        const response = await fetch('/api/init');
        if (response.ok) {
          console.log('Sistem başlatma kontrolü tamamlandı');
        }
      } catch (error) {
        console.error('Sistem başlatma kontrolü başarısız:', error);
      }
    };

    initSystem();
  }, [])();

  return null; // Görsel bir bileşen değil
};

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = useCallback(
    async (data: any) => {
      try {
        setLoading(true);
        setErrorMsg("");
        
        console.log("Giriş denemesi:", data.email);
        
        const result = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (result?.error) {
          if (result.error.includes("Kullanıcı bulunamadı")) {
            setErrorMsg("Bu e-posta adresiyle kayıtlı bir kullanıcı bulunamadı. Lütfen kaydolun veya farklı bir hesap kullanın.");
          } else if (result.error.includes("Geçersiz şifre") || result.error.includes("Şifre hatalı")) {
            setErrorMsg("Şifre hatalı. Lütfen şifrenizi kontrol edip tekrar deneyin.");
          } else if (result.error.includes("doğrulanmamış")) {
            setErrorMsg("Hesabınız henüz doğrulanmamış. Lütfen e-posta adresinize gönderilen doğrulama bağlantısını kullanın veya yeni bir doğrulama e-postası talep edin.");
          } else if (result.error.includes("devre dışı")) {
            setErrorMsg("Bu hesap devre dışı bırakılmış. Lütfen yöneticinizle iletişime geçin.");
          } else {
            setErrorMsg("Giriş başarısız: " + result.error);
          }
          setLoading(false);
          return;
        }

        setSuccessMsg("Giriş başarılı! Yönlendiriliyorsunuz...");
        
        // Simulate a delay before redirecting
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } catch (error) {
        setErrorMsg("Bir sorun oluştu. Lütfen tekrar deneyin.");
        setLoading(false);
      }
    },
    [router]
  );

  const handleGoogleSignIn = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      
      await signIn("google", {
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      setErrorMsg("Google ile giriş yapılamadı. Lütfen tekrar deneyin.");
      setLoading(false);
    }
  }, []);

  const ForgotPasswordLink = () => {
    const [resetEmail, setResetEmail] = useState("");
    const [sending, setSending] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);
    const [resetError, setResetError] = useState("");

    const handlePasswordReset = async (e: React.MouseEvent) => {
      e.preventDefault();
      
      if (!resetEmail || !resetEmail.includes('@') || resetEmail.length < 5) {
        setResetError("Lütfen geçerli bir e-posta adresi girin");
        return;
      }
      
      try {
        setSending(true);
        setResetError("");
        
        const response = await fetch('/api/auth/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: resetEmail }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setResetSuccess(true);
        } else {
          setResetError(data.message || "İşlem sırasında bir hata oluştu");
        }
      } catch (error) {
        setResetError("Şifre sıfırlama isteği gönderilirken bir hata oluştu");
      } finally {
        setSending(false);
      }
    };
    
    return (
      <div className="relative group">
        <Link 
          href="#"
          onClick={(e) => e.preventDefault()}
          className="text-xs font-medium text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
        >
          Şifremi Unuttum
        </Link>
        
        <div className="absolute z-50 right-0 top-6 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
          <div className="bg-background/90 backdrop-blur-md border border-white/10 p-4 rounded-lg shadow-lg">
            {!resetSuccess ? (
              <>
                <h4 className="text-sm font-medium mb-2">Şifre Sıfırlama</h4>
                <p className="text-xs text-foreground/70 mb-3">
                  E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim.
                </p>
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="E-posta adresiniz"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="text-xs h-8"
                  />
                  {resetError && <p className="text-xs text-destructive">{resetError}</p>}
                  <Button 
                    size="sm"
                    className="w-full h-8 text-xs" 
                    onClick={handlePasswordReset}
                    disabled={sending}
                  >
                    {sending ? "Gönderiliyor..." : "Sıfırlama Bağlantısı Gönder"}
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-2">
                <div className="bg-primary/20 rounded-full p-2 w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-xs">Şifre sıfırlama bağlantısı e-posta adresinize gönderildi!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 space-y-8 relative z-10">
      <SystemInitializer />
      {/* Dekoratif arka plan elemanları */}
      <div className="absolute -z-10 top-1/3 -left-20 w-40 h-40 bg-gradient-to-r from-[#00A0D2]/40 to-[#FFD100]/40 rounded-full blur-3xl opacity-60 animate-pulse-slow"></div>
      <div className="absolute -z-10 top-2/3 -right-20 w-40 h-40 bg-gradient-to-l from-[#00A0D2]/40 to-[#FFD100]/40 rounded-full blur-3xl opacity-60 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      
      <motion.div 
        className="flex flex-col items-center space-y-3 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative p-2 rounded-xl bg-gradient-to-br from-[#00A0D2]/20 to-[#FFD100]/20 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00A0D2]/10 to-[#FFD100]/10 rounded-xl animate-pulse-slow"></div>
          <Image 
            src="/logo.svg" 
            alt="Syneris" 
            width={48} 
            height={48} 
            className="relative z-10"
          />
        </div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00A0D2] to-[#FFD100] drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
          Hesabınıza Giriş Yapın
        </h1>
        <p className="text-gray-800 max-w-sm font-medium">
          Syneris sistemine giriş yaparak kurumsal eğitim deneyiminize devam edin
        </p>
      </motion.div>

      <motion.div 
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <ErrorMessage message={errorMsg} />
        <SuccessMessage message={successMsg} />

        <motion.div 
          variants={itemVariants}
          className="backdrop-blur-md bg-background/70 rounded-xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00A0D2]/50 to-transparent"></div>
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit(handleSignIn)} className="space-y-5">
              <motion.div 
                className="space-y-1.5"
                variants={itemVariants}
              >
                <Label htmlFor="email" className="text-gray-800 flex items-center gap-2 font-medium">
                  <Mail className="h-4 w-4 text-[#00A0D2]" /> E-posta Adresiniz
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    placeholder="ornek@mail.com"
                    {...register("email")}
                    className="pl-4 pr-4 py-2.5 bg-background/70 border-white/10 focus:border-[#00A0D2]/50 focus:ring-2 focus:ring-[#00A0D2]/20 transition-all shadow-sm"
                    disabled={loading}
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00A0D2]/30 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                </div>
                {errors.email?.message && (
                  <p className="text-xs text-destructive font-medium bg-destructive/10 p-1.5 rounded">{errors.email.message as string}</p>
                )}
              </motion.div>
              
              <motion.div 
                className="space-y-1.5"
                variants={itemVariants}
              >
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-800 flex items-center gap-2 font-medium">
                    <Lock className="h-4 w-4 text-[#00A0D2]" /> Şifreniz
                  </Label>
                  <ForgotPasswordLink />
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...register("password")}
                    className="pl-4 pr-4 py-2.5 bg-background/70 border-white/10 focus:border-[#00A0D2]/50 focus:ring-2 focus:ring-[#00A0D2]/20 transition-all shadow-sm"
                    disabled={loading}
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00A0D2]/30 to-transparent opacity-0 focus-within:opacity-100 transition-opacity"></div>
                </div>
                {errors.password?.message && (
                  <p className="text-xs text-destructive font-medium bg-destructive/10 p-1.5 rounded">{errors.password.message as string}</p>
                )}
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#00A0D2] to-[#FFD100] hover:from-[#0090BD] hover:to-[#EBBD00] text-white shadow-lg shadow-[#00A0D2]/20 py-2.5 font-medium gap-2 hover:gap-3 transition-all"
                  disabled={loading}
                >
                  {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                  {!loading && <ArrowRight className="h-4 w-4 transition-transform" />}
                </Button>
              </motion.div>
            </form>

            <motion.div variants={itemVariants} className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-background/70 text-gray-700 font-medium">
                  veya
                </span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                variant="outline"
                className="w-full border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-[#00A0D2]/20 transition-colors shadow-sm py-2.5 font-medium"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                <GoogleIcon className="w-5 h-5 mr-2" />
                Google ile Devam Et
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-6 text-center text-sm text-gray-700">
              Hesabınız yok mu?{" "}
              <Link 
                href="/auth/signup" 
                className="text-[#00A0D2] hover:text-[#FFD100] transition-colors font-medium hover:underline underline-offset-4"
              >
                Hemen Kaydolun
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 