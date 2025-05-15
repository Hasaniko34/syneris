"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "@/components/motion-wrapper";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Lock,
  KeyRound,
  Smartphone,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Shield,
  LogOut,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function SecurityPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorSetupMode, setTwoFactorSetupMode] = useState(false);
  const [twoFactorSetupStep, setTwoFactorSetupStep] = useState(1);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Şifre gücü durumu
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  // Şifre değişikliği hata/başarı durumu
  const [passwordChangeStatus, setPasswordChangeStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  // Oturum açma geçmişi
  const [loginHistory] = useState([
    {
      id: 1,
      device: "Chrome / Windows 10",
      location: "İstanbul, Türkiye",
      ipAddress: "78.173.xxx.xxx",
      date: "12 Haziran 2023, 15:23",
      current: true,
    },
    {
      id: 2,
      device: "Safari / macOS",
      location: "Ankara, Türkiye",
      ipAddress: "85.132.xxx.xxx",
      date: "10 Haziran 2023, 09:45",
      current: false,
    },
    {
      id: 3,
      device: "Mobile App / iOS 16",
      location: "İzmir, Türkiye",
      ipAddress: "88.243.xxx.xxx",
      date: "5 Haziran 2023, 18:12",
      current: false,
    },
  ]);

  // Şifre formunu güncelle
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));

    // Şifre gücünü hesapla (basit bir örnek)
    if (name === "newPassword") {
      let strength = 0;
      if (value.length >= 8) strength += 25;
      if (/[A-Z]/.test(value)) strength += 25;
      if (/[0-9]/.test(value)) strength += 25;
      if (/[^A-Za-z0-9]/.test(value)) strength += 25;
      setPasswordStrength(strength);
    }
  };

  // Şifre değiştirme işlemini başlat
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form doğrulama
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordChangeStatus({
        success: false,
        message: "Lütfen tüm alanları doldurun.",
      });
      return;
    }
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordChangeStatus({
        success: false,
        message: "Yeni şifre ve onay şifresi eşleşmiyor.",
      });
      return;
    }
    
    if (passwordStrength < 75) {
      setPasswordChangeStatus({
        success: false,
        message: "Daha güçlü bir şifre oluşturun.",
      });
      return;
    }
    
    setIsSaving(true);
    
    // API çağrısı simülasyonu
    setTimeout(() => {
      setIsSaving(false);
      setPasswordChangeStatus({
        success: true,
        message: "Şifreniz başarıyla değiştirildi.",
      });
      
      // Formu sıfırla
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      
      setPasswordStrength(0);
    }, 1500);
  };

  // İki faktörlü doğrulama ayarını güncelle
  const handleToggleTwoFactor = () => {
    if (!twoFactorEnabled) {
      // İki faktörlü doğrulama kurulum modunu aç
      setTwoFactorSetupMode(true);
      setTwoFactorSetupStep(1);
    } else {
      // İki faktörlü doğrulamayı kapat
      setTwoFactorEnabled(false);
      setTwoFactorSetupMode(false);
    }
  };

  // İki faktörlü doğrulama kurulumunu tamamla
  const handleCompleteTwoFactorSetup = () => {
    // Doğrulama kodunu kontrol et (gerçek uygulamada API isteği yapılır)
    if (twoFactorCode.length === 6) {
      setTwoFactorEnabled(true);
      setTwoFactorSetupMode(false);
      setTwoFactorSetupStep(1);
      setTwoFactorCode("");
    }
  };

  // İki faktörlü doğrulama kurulum adımını ilerlet
  const handleNextSetupStep = () => {
    setTwoFactorSetupStep(prev => prev + 1);
  };

  // Şifre gücü rengi
  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return "bg-destructive";
    if (passwordStrength < 50) return "bg-orange-500";
    if (passwordStrength < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  // Şifre gücü metni
  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return "Çok Zayıf";
    if (passwordStrength < 50) return "Zayıf";
    if (passwordStrength < 75) return "Orta";
    return "Güçlü";
  };

  // Animasyon varyantları
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/profile">
              <ArrowLeft size={16} />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Güvenlik Ayarları</h1>
        </div>
      </div>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Sol Sütun - Güvenlik Menüsü */}
        <div className="space-y-4 md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Hesap Güvenliği</CardTitle>
              <CardDescription>
                Hesabınızın güvenlik ayarlarını yönetin.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y rounded-md overflow-hidden">
                <li>
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-4 py-6 h-auto rounded-none text-primary"
                  >
                    <KeyRound className="h-4 w-4 mr-2" />
                    Şifre Değiştir
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-4 py-6 h-auto rounded-none"
                  >
                    <Smartphone className="h-4 w-4 mr-2" />
                    İki Faktörlü Doğrulama
                    {twoFactorEnabled && (
                      <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
                        Aktif
                      </Badge>
                    )}
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-4 py-6 h-auto rounded-none"
                  >
                    <History className="h-4 w-4 mr-2" />
                    Oturum Geçmişi
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-4 py-6 h-auto rounded-none text-destructive"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Tüm Cihazlardan Çıkış Yap
                  </Button>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hesap Güvenlik Durumu</CardTitle>
              <CardDescription>
                Hesabınızın güvenlik değerlendirmesi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Şifre Güvenliği</span>
                <Badge variant="outline" className="bg-green-500/10 text-green-500">
                  İyi
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">İki Faktörlü Doğrulama</span>
                <Badge variant={twoFactorEnabled ? "outline" : "destructive"} className={twoFactorEnabled ? "bg-green-500/10 text-green-500" : ""}>
                  {twoFactorEnabled ? "Etkin" : "Devre Dışı"}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Son Şifre Değişimi</span>
                <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
                  60 gün önce
                </Badge>
              </div>

              <Alert className="mt-4 bg-muted">
                <Shield className="h-4 w-4" />
                <AlertTitle>Güvenlik Önerisi</AlertTitle>
                <AlertDescription>
                  İki faktörlü doğrulamayı etkinleştirerek hesabınızı daha güvenli hale getirebilirsiniz.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* Sağ Sütun - Ana İçerik */}
        <div className="space-y-6 md:col-span-2">
          {/* Şifre Değiştirme */}
          <Card id="change-password">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyRound className="h-5 w-5" />
                Şifre Değiştir
              </CardTitle>
              <CardDescription>
                Hesabınızın şifresini güncelleyin. Güçlü ve benzersiz bir şifre seçmenizi öneririz.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {passwordChangeStatus.message && (
                <Alert 
                  variant={passwordChangeStatus.success ? "default" : "destructive"}
                  className={`mb-4 ${passwordChangeStatus.success ? "bg-green-500/10 text-green-500 border-green-500/20" : ""}`}
                >
                  {passwordChangeStatus.success ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertTitle>
                    {passwordChangeStatus.success ? "Başarılı" : "Hata"}
                  </AlertTitle>
                  <AlertDescription>
                    {passwordChangeStatus.message}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="currentPassword">Mevcut Şifre</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="Mevcut şifrenizi girin"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1 h-8 w-8"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="newPassword">Yeni Şifre</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Yeni şifrenizi girin"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1 h-8 w-8"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>

                  {passwordForm.newPassword && (
                    <>
                      <div className="space-y-1 mt-2">
                        <div className="flex justify-between text-xs">
                          <span>Şifre Gücü:</span>
                          <span className={
                            passwordStrength >= 75 ? "text-green-500" : 
                            passwordStrength >= 50 ? "text-yellow-500" : 
                            passwordStrength >= 25 ? "text-orange-500" : 
                            "text-destructive"
                          }>
                            {getPasswordStrengthText()}
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${getPasswordStrengthColor()}`}
                            style={{ width: `${passwordStrength}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 space-y-1">
                        <div className="flex items-center gap-1">
                          <div className={`w-1 h-1 rounded-full ${/[A-Z]/.test(passwordForm.newPassword) ? "bg-green-500" : "bg-destructive"}`} />
                          <span>En az bir büyük harf içermeli</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className={`w-1 h-1 rounded-full ${/[0-9]/.test(passwordForm.newPassword) ? "bg-green-500" : "bg-destructive"}`} />
                          <span>En az bir rakam içermeli</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className={`w-1 h-1 rounded-full ${/[^A-Za-z0-9]/.test(passwordForm.newPassword) ? "bg-green-500" : "bg-destructive"}`} />
                          <span>En az bir özel karakter içermeli</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className={`w-1 h-1 rounded-full ${passwordForm.newPassword.length >= 8 ? "bg-green-500" : "bg-destructive"}`} />
                          <span>En az 8 karakter uzunluğunda olmalı</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="confirmPassword">Yeni Şifre (Tekrar)</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Yeni şifrenizi tekrar girin"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1 h-8 w-8"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword && (
                    <p className="text-xs text-destructive mt-1">
                      Şifreler eşleşmiyor.
                    </p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full gap-2"
                  disabled={isSaving}
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? "Değiştiriliyor..." : "Şifreyi Değiştir"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* İki Faktörlü Doğrulama */}
          <Card id="two-factor-auth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                İki Faktörlü Doğrulama
              </CardTitle>
              <CardDescription>
                Hesabınıza ekstra bir güvenlik katmanı ekleyin. Oturum açarken şifrenize ek olarak bir doğrulama kodu istenecektir.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <div className="text-base font-medium">
                    {twoFactorEnabled ? "İki faktörlü doğrulama etkin" : "İki faktörlü doğrulama devre dışı"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {twoFactorEnabled
                      ? "Hesabınız şu anda iki faktörlü doğrulama ile korunuyor."
                      : "Şifreniz çalınsa bile hesabınızın güvende kalması için bu özelliği etkinleştirin."}
                  </div>
                </div>
                <Switch 
                  checked={twoFactorEnabled} 
                  onCheckedChange={handleToggleTwoFactor} 
                />
              </div>

              {twoFactorSetupMode && (
                <div className="mt-4 border rounded-lg p-4">
                  <h3 className="text-md font-medium mb-2">İki Faktörlü Doğrulama Kurulumu</h3>
                  <ol className="list-decimal pl-4 space-y-2 text-sm text-muted-foreground mb-4">
                    <li>Telefonunuza "Google Authenticator" veya "Microsoft Authenticator" gibi bir kimlik doğrulama uygulaması yükleyin.</li>
                    <li>Uygulama içerisinde QR kodunu tarayın.</li>
                    <li>Uygulama tarafından oluşturulan 6 haneli kodu aşağıya girin.</li>
                  </ol>
                  
                  <div className="flex justify-center mb-4">
                    <div className="border p-4 rounded-lg bg-muted">
                      <div className="text-center text-xs text-muted-foreground mb-2">
                        QR Kodunu Tarayın
                      </div>
                      <div className="w-40 h-40 bg-muted-foreground/10 flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">QR Kodu Görseli</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="verificationCode">Doğrulama Kodu</Label>
                    <Input
                      id="verificationCode"
                      placeholder="6 haneli kodu girin"
                      className="text-center tracking-widest"
                      maxLength={6}
                    />
                  </div>
                  
                  <div className="flex gap-2 justify-end mt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setTwoFactorSetupMode(false)}
                    >
                      İptal
                    </Button>
                    <Button onClick={handleCompleteTwoFactorSetup}>
                      Kurulumu Tamamla
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Oturum Geçmişi */}
          <Card id="login-history">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Oturum Geçmişi
              </CardTitle>
              <CardDescription>
                Hesabınızda gerçekleşen son oturum açma işlemleri. Tanımadığınız bir işlem varsa, şifrenizi değiştirin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border divide-y">
                {loginHistory.map((session) => (
                  <div key={session.id} className="p-4 flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{session.device}</span>
                        {session.current && (
                          <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                            Mevcut Oturum
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span>{session.location}</span>
                        <span className="mx-2">•</span>
                        <span>{session.ipAddress}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-center">
                      <div className="text-sm text-muted-foreground">
                        {session.date}
                      </div>
                      {!session.current && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive h-6 px-2 text-xs"
                        >
                          Oturumu Kapat
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full text-destructive">
                <LogOut className="h-4 w-4 mr-2" />
                Tüm Cihazlardan Çıkış Yap
              </Button>
            </CardFooter>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
} 