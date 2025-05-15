"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "@/components/motion-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Lock } from "lucide-react";
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
const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Şifre en az 8 karakter olmalıdır" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        { message: "Şifre en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir" }
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
  });

// SearchParams için wrapper component
function SearchParamsWrapper({ children }) {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  return children({ token });
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [complete, setComplete] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  
  // Token geçerliliğini kontrol et
  useEffect(() => {
    const validateToken = async () => {
      try {
        if (!token) {
          setErrorMsg("Geçersiz veya eksik şifre sıfırlama belirteci");
          setLoading(false);
          return;
        }
        
        // Token geçerliliğini kontrol etmek için gerçek bir API çağrısı yapılabilir
        // Bu örnekte sadece token'ın varlığını kontrol ediyoruz
        if (token.length > 10) {
          setTokenValid(true);
        } else {
          setErrorMsg("Geçersiz şifre sıfırlama belirteci");
        }
      } catch (error) {
        setErrorMsg("Belirteç doğrulanırken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      validateToken();
    }
  }, [token]);

  const handlePasswordReset = async (data: { password: string; confirmPassword: string }) => {
    try {
      setProcessing(true);
      setErrorMsg("");
      
      const response = await fetch('/api/auth/reset-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          token, 
          password: data.password 
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Şifre sıfırlama başarısız");
      }
      
      setSuccessMsg("Şifreniz başarıyla değiştirildi.");
      setComplete(true);
      
      // Kısa bir beklemeden sonra giriş sayfasına yönlendir
      setTimeout(() => {
        router.push('/auth/signin');
      }, 3000);
    } catch (error: any) {
      setErrorMsg(error.message || "Bir sorun oluştu. Lütfen tekrar deneyin.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 space-y-8 relative z-10">
      {/* SearchParams için Suspense boundary */}
      <Suspense fallback={<div className="w-10 h-10 border-t-2 border-primary rounded-full animate-spin"></div>}>
        <SearchParamsWrapper>
          {({ token: paramToken }) => {
            // Token'ı state'e ayarla
            if (paramToken !== token) {
              setToken(paramToken);
            }
            
            return null;
          }}
        </SearchParamsWrapper>
      </Suspense>
      
      {/* Dekoratif arka plan elemanları */}
      <div className="absolute -z-10 top-1/3 -left-20 w-40 h-40 bg-gradient-to-r from-primary/40 to-purple-500/40 rounded-full blur-3xl opacity-60 animate-pulse-slow"></div>
      <div className="absolute -z-10 top-2/3 -right-20 w-40 h-40 bg-gradient-to-l from-primary/40 to-cyan-500/40 rounded-full blur-3xl opacity-60 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      
      <motion.div 
        className="flex flex-col items-center space-y-3 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative p-2 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-xl animate-pulse-slow"></div>
          <Image 
            src="/logo.svg" 
            alt="Syneris" 
            width={48} 
            height={48} 
            className="relative z-10"
          />
        </div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
          Şifre Sıfırlama
        </h1>
        {!complete ? (
          <p className="text-foreground max-w-sm font-medium">
            Hesabınız için yeni ve güçlü bir şifre oluşturun
          </p>
        ) : (
          <p className="text-foreground max-w-sm font-medium">
            Şifreniz başarıyla değiştirildi
          </p>
        )}
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
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          <div className="p-6 sm:p-8">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-10 h-10 border-t-2 border-primary rounded-full animate-spin"></div>
              </div>
            ) : !tokenValid || complete ? (
              <motion.div 
                className="space-y-5 py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className={`bg-${complete ? "primary" : "destructive"}/10 rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center`}>
                  {complete ? (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                      <path d="M9 12L11 14L15 10M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-destructive">
                      <path d="M15 9L9 15M9 9L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                
                <div className="text-center space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">
                    {complete ? "Şifreniz Değiştirildi!" : "Geçersiz Bağlantı"}
                  </h3>
                  <p className="text-sm text-foreground/70">
                    {complete 
                      ? "Yeni şifreniz başarıyla ayarlandı. Şimdi giriş yapabilirsiniz." 
                      : "Bu şifre sıfırlama bağlantısı geçersiz veya süresi dolmuş. Lütfen yeni bir şifre sıfırlama isteği gönderin."}
                  </p>
                </div>

                <Button 
                  onClick={() => router.push('/auth/signin')}
                  variant="outline"
                  className="w-full border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-primary/20 transition-colors shadow-sm py-2.5 font-medium"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Giriş Sayfasına Dön
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(handlePasswordReset)} className="space-y-5">
                <motion.div 
                  className="space-y-1.5"
                  variants={itemVariants}
                >
                  <Label htmlFor="password" className="text-foreground flex items-center gap-2 font-medium">
                    <Lock className="h-4 w-4 text-primary" /> Yeni Şifreniz
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      {...register("password")}
                      className="pl-4 pr-4 py-2.5 bg-background/70 border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                      disabled={processing}
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                  </div>
                  {errors.password?.message && (
                    <p className="text-xs text-destructive font-medium bg-destructive/10 p-1.5 rounded">{errors.password.message as string}</p>
                  )}
                  <p className="text-xs text-foreground/70 mt-1">
                    Şifreniz en az 8 karakter uzunluğunda olmalı ve en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="space-y-1.5"
                  variants={itemVariants}
                >
                  <Label htmlFor="confirmPassword" className="text-foreground flex items-center gap-2 font-medium">
                    <Lock className="h-4 w-4 text-primary" /> Şifrenizi Onaylayın
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      {...register("confirmPassword")}
                      className="pl-4 pr-4 py-2.5 bg-background/70 border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                      disabled={processing}
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 focus-within:opacity-100 transition-opacity"></div>
                  </div>
                  {errors.confirmPassword?.message && (
                    <p className="text-xs text-destructive font-medium bg-destructive/10 p-1.5 rounded">{errors.confirmPassword.message as string}</p>
                  )}
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg shadow-primary/20 py-2.5 font-medium gap-2 hover:gap-3 transition-all"
                    disabled={processing}
                  >
                    {processing ? "İşleniyor..." : "Şifremi Sıfırla"}
                    {!processing && <ArrowRight className="h-4 w-4 transition-transform" />}
                  </Button>
                </motion.div>
                
                <motion.div variants={itemVariants} className="mt-6 text-center text-sm text-foreground/80">
                  <Link 
                    href="/auth/signin" 
                    className="text-primary hover:text-primary/80 transition-colors font-medium hover:underline underline-offset-4 flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Giriş Sayfasına Dön
                  </Link>
                </motion.div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 