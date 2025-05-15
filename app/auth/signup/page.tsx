'use client';

import Link from "next/link";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "@/components/motion-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Loader2, 
  UserPlus, 
  Mail, 
  User, 
  Building, 
  Briefcase, 
  Lock, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  Hash
} from "lucide-react";
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

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    role: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const validateForm = () => {
    if (!formData.terms) {
      setError("Devam etmek için hizmet şartlarını ve gizlilik politikasını kabul etmelisiniz.");
      return false;
    }

    if (formData.password.length < 8) {
      setError("Şifre en az 8 karakter uzunluğunda olmalıdır.");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Şifreler eşleşmiyor.");
      return false;
    }

    // Basit e-posta doğrulama
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Geçerli bir e-posta adresi giriniz.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // API çağrısı
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          company: formData.company,
          role: formData.role,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Kayıt işlemi sırasında bir hata oluştu.");
      }

      // Başarılı kayıt
      setSuccess(true);
      setTimeout(() => {
        // Giriş sayfasına yönlendir
        router.push("/auth/signin?registered=true");
      }, 2000);
    } catch (error: any) {
      console.error("Kayıt hatası:", error);
      setError(error.message || "Kayıt işlemi sırasında bir hata oluştu.");
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/onboarding" });
    } catch (error) {
      setError("Google ile kayıt olurken bir hata oluştu. Lütfen tekrar deneyin.");
      setIsLoading(false);
    }
  };

  // Başarılı kayıt durumunda gösterilecek içerik
  if (success) {
    return (
      <div className="space-y-6 animate-fade-in-slow">
        <Card className="card-glass border-primary/20 shadow-2xl bg-gradient-to-br from-primary/5 to-[#00A0D2]/5 backdrop-blur-md overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          <CardContent className="pt-10 pb-8 text-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto mb-6 h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-[#00A0D2]/20 flex items-center justify-center"
            >
              <CheckCircle2 className="h-8 w-8 text-primary drop-shadow-lg" />
            </motion.div>
            <motion.h3 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#00A0D2] drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)] mb-3"
            >
              Kayıt Başarılı!
            </motion.h3>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-foreground font-medium mx-auto max-w-md"
            >
              Hesabınız başarıyla oluşturuldu. Giriş sayfasına yönlendiriliyorsunuz...
            </motion.p>
            <motion.div 
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex justify-center"
            >
              <div className="h-1.5 w-40 bg-primary/10 rounded-full overflow-hidden">
                <div className="h-full w-full bg-gradient-to-r from-primary via-[#00A0D2] to-primary animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative z-10">
      {/* Dekoratif arka plan elemanları */}
      <div className="absolute -z-10 top-1/3 -left-20 w-40 h-40 bg-gradient-to-r from-[#00A0D2]/40 to-[#FFD100]/40 rounded-full blur-3xl opacity-60 animate-pulse-slow"></div>
      <div className="absolute -z-10 top-2/3 -right-20 w-40 h-40 bg-gradient-to-l from-[#00A0D2]/40 to-[#FFD100]/40 rounded-full blur-3xl opacity-60 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      
      <motion.div 
        className="space-y-3 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00A0D2] to-[#FFD100] drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
          Hesap Oluşturun
        </h1>
        <p className="text-gray-800 max-w-md mx-auto font-medium">
          Syneris'e katılın ve şirketinizin eğitim süreçlerini dijital deneyimle dönüştürün
        </p>
      </motion.div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.12)] bg-background/70 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          
          <form onSubmit={handleSubmit}>
            <CardHeader className="space-y-1 pb-4">
              <motion.div variants={itemVariants} className="flex items-center gap-3 mb-1">
                <div className="h-8 w-1 rounded-full bg-gradient-to-b from-[#FFD100] to-[#00A0D2]"></div>
                <CardTitle className="text-xl font-bold">Kişisel Bilgileriniz</CardTitle>
              </motion.div>
              <motion.div variants={itemVariants}>
                <CardDescription className="text-gray-700">
                  Şirketinize özel eğitim platformu için hesap oluşturun
                </CardDescription>
              </motion.div>
            </CardHeader>
            
            <CardContent className="space-y-5 pt-2">
              {error && (
                <ErrorMessage message={error} />
              )}
              
              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-800 flex items-center gap-2 font-medium">
                    <User className="h-4 w-4 text-primary" /> Adınız
                  </Label>
                  <div className="relative">
                    <Input 
                      id="firstName" 
                      name="firstName"
                      placeholder="Adınız" 
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className="pl-4 pr-4 py-2.5 bg-background/70 border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 focus-within:opacity-100 transition-opacity"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-800 flex items-center gap-2 font-medium">
                    <span className="w-4"></span> Soyadınız
                  </Label>
                  <div className="relative">
                    <Input 
                      id="lastName" 
                      name="lastName"
                      placeholder="Soyadınız" 
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className="pl-4 pr-4 py-2.5 bg-background/70 border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 focus-within:opacity-100 transition-opacity"></div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="email" className="text-gray-800 flex items-center gap-2 font-medium">
                  <Mail className="h-4 w-4 text-primary" /> E-posta Adresiniz
                </Label>
                <div className="relative">
                  <Input 
                    id="email" 
                    name="email"
                    placeholder="ornek@sirketiniz.com" 
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="pl-4 pr-4 py-2.5 bg-background/70 border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 focus-within:opacity-100 transition-opacity"></div>
                </div>
                <p className="text-xs text-gray-700 pl-6">
                  Kurumsal e-posta adresinizi kullanmanız önerilir
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="company" className="text-gray-800 flex items-center gap-2 font-medium">
                  <Building className="h-4 w-4 text-primary" /> Şirket Adı
                </Label>
                <div className="relative">
                  <Input 
                    id="company" 
                    name="company"
                    placeholder="Şirketinizin adı" 
                    value={formData.company}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="pl-4 pr-4 py-2.5 bg-background/70 border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 focus-within:opacity-100 transition-opacity"></div>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="role" className="text-gray-800 flex items-center gap-2 font-medium">
                  <Briefcase className="h-4 w-4 text-primary" /> Pozisyonunuz
                </Label>
                <Select 
                  value={formData.role} 
                  onValueChange={handleSelectChange}
                  disabled={isLoading}
                >
                  <SelectTrigger className="pl-4 pr-4 py-2.5 bg-background/70 border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm">
                    <SelectValue placeholder="Pozisyonunuzu seçin" />
                  </SelectTrigger>
                  <SelectContent className="bg-background/90 backdrop-blur-md border-white/10">
                    <SelectItem value="hr">İnsan Kaynakları</SelectItem>
                    <SelectItem value="manager">Yönetici</SelectItem>
                    <SelectItem value="trainer">Eğitmen</SelectItem>
                    <SelectItem value="employee">Çalışan</SelectItem>
                    <SelectItem value="other">Diğer</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-5 pt-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-1 rounded-full bg-gradient-to-b from-[#00A0D2] to-[#FFD100]"></div>
                  <h3 className="text-lg font-bold text-gray-800">Güvenlik Bilgileri</h3>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-800 flex items-center gap-2 font-medium">
                    <Lock className="h-4 w-4 text-[#00A0D2]" /> Şifre
                  </Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      name="password"
                      type="password" 
                      placeholder="••••••••" 
                      value={formData.password}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className="pl-4 pr-4 py-2.5 bg-background/70 border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00A0D2]/30 to-transparent opacity-0 focus-within:opacity-100 transition-opacity"></div>
                  </div>
                  <p className="text-xs text-gray-700 pl-6">
                    En az 8 karakter olmalıdır
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-800 flex items-center gap-2 font-medium">
                    <Lock className="h-4 w-4 text-[#00A0D2]" /> Şifre Tekrar
                  </Label>
                  <div className="relative">
                    <Input 
                      id="confirmPassword" 
                      name="confirmPassword"
                      type="password" 
                      placeholder="••••••••" 
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className="pl-4 pr-4 py-2.5 bg-background/70 border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00A0D2]/30 to-transparent opacity-0 focus-within:opacity-100 transition-opacity"></div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-start pt-4">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={formData.terms}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary border-white/20 rounded focus:ring-primary focus:ring-offset-0"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-800">
                    <span className="font-medium">Hizmet şartlarını</span> ve <span className="font-medium">gizlilik politikasını</span> kabul ediyorum
                  </label>
                </div>
              </motion.div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4 pt-5">
              <motion.div variants={itemVariants} className="w-full">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#00A0D2] to-[#FFD100] hover:from-[#0090BD] hover:to-[#EBBD00] text-white shadow-lg shadow-[#00A0D2]/20 py-2.5 font-medium flex gap-2 hover:gap-3 transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      İşleniyor...
                    </>
                  ) : (
                    <>
                      Hesap Oluştur
                      <ArrowRight className="h-4 w-4 transition-transform" />
                    </>
                  )}
                </Button>
              </motion.div>
              
              <motion.div variants={itemVariants} className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-background/70 backdrop-blur-sm px-2 text-gray-700 font-medium">
                    Veya
                  </span>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="w-full">
                <Button 
                  type="button" 
                  variant="outline"
                  className="w-full border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-primary/20 transition-colors shadow-sm py-2.5 font-medium"
                  onClick={handleGoogleSignUp}
                  disabled={isLoading}
                >
                  <svg className="mr-2 h-4 w-4" aria-hidden="true" viewBox="0 0 24 24">
                    <path
                      d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0353 3.12C17.9503 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                      fill="#EA4335"
                    />
                    <path
                      d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                      fill="#34A853"
                    />
                  </svg>
                  Google ile Kayıt Ol
                </Button>
              </motion.div>
              
              <motion.div variants={itemVariants} className="text-center text-sm text-gray-700 pt-2">
                Zaten hesabınız var mı?{" "}
                <Link href="/auth/signin" className="text-[#00A0D2] hover:text-[#FFD100] transition-colors font-medium hover:underline underline-offset-4">
                  Giriş Yapın
                </Link>
              </motion.div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
} 