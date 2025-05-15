"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Mail, ArrowLeft, ArrowRight } from "lucide-react";
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
});

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [complete, setComplete] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handlePasswordReset = async (data: { email: string }) => {
    try {
      setLoading(true);
      setErrorMsg("");
      
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Şifre sıfırlama isteği başarısız");
      }
      
      setSuccessMsg("Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.");
      setComplete(true);
    } catch (error: any) {
      setErrorMsg(error.message || "Bir sorun oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 space-y-8 relative z-10">
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
          Şifrenizi mi Unuttunuz?
        </h1>
        {!complete ? (
          <p className="text-foreground max-w-sm font-medium">
            Endişelenmeyin, hesabınız için yeni bir şifre oluşturabilirsiniz
          </p>
        ) : (
          <p className="text-foreground max-w-sm font-medium">
            Şifre sıfırlama bağlantısı gönderildi
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
            {!complete ? (
              <form onSubmit={handleSubmit(handlePasswordReset)} className="space-y-5">
                <motion.div 
                  className="space-y-1.5"
                  variants={itemVariants}
                >
                  <Label htmlFor="email" className="text-foreground flex items-center gap-2 font-medium">
                    <Mail className="h-4 w-4 text-primary" /> E-posta Adresiniz
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      placeholder="ornek@mail.com"
                      {...register("email")}
                      className="pl-4 pr-4 py-2.5 bg-background/70 border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                      disabled={loading}
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                  </div>
                  {errors.email?.message && (
                    <p className="text-xs text-destructive font-medium bg-destructive/10 p-1.5 rounded">{errors.email.message as string}</p>
                  )}
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg shadow-primary/20 py-2.5 font-medium gap-2 hover:gap-3 transition-all"
                    disabled={loading}
                  >
                    {loading ? "İşleniyor..." : "Şifre Sıfırlama Bağlantısı Gönder"}
                    {!loading && <ArrowRight className="h-4 w-4 transition-transform" />}
                  </Button>
                </motion.div>
              </form>
            ) : (
              <motion.div 
                className="space-y-5 py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-primary/10 rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                    <path d="M9 12L11 14L15 10M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                
                <div className="text-center space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">Kontrolünüzü Yapın!</h3>
                  <p className="text-sm text-foreground/70">
                    Şifre sıfırlama talimatlarını içeren bir e-posta gönderdik.<br />
                    Lütfen gelen kutunuzu ve spam klasörünüzü kontrol edin.
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
            )}

            {!complete && (
              <motion.div variants={itemVariants} className="mt-6 text-center text-sm text-foreground/80">
                <Link 
                  href="/auth/signin" 
                  className="text-primary hover:text-primary/80 transition-colors font-medium hover:underline underline-offset-4 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Giriş Sayfasına Dön
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 