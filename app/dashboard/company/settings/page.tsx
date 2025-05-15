"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building2, Users, Mail, Globe, Phone, ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CompanySettingsPage() {
  const [company, setCompany] = useState({
    name: "Türk Ekonomi Bankası",
    description: "Müşterilerimize yenilikçi finansal çözümler sunma konusunda 90 yılı aşkın deneyime sahip, BNP Paribas ortaklığında güçlü bir banka.",
    address: "Turkcell Maltepe Plaza, Aydınevler Mahallesi İnönü Caddesi No:20, 34854 Maltepe / İstanbul",
    employees: 9560,
    website: "https://www.turkcell.com.tr",
    email: "info@turkcell.com.tr",
    phone: "+90 212 373 00 00",
    logo: "/images/logos/turkcell-logo.png",
    founded: "1927",
    industry: "Bankacılık ve Finans",
    taxId: "3795880072",
  });

  // Form değişiklikleri için state
  const [formState, setFormState] = useState(company);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Burada normalde API çağrısı yapılacak
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setCompany(formState);
    setLoading(false);
    setSuccess(true);
    
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild className="border-[#005f9e]/30 text-[#005f9e] hover:bg-[#005f9e]/10">
          <Link href="/dashboard/company">
            <ArrowLeft size={16} />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-[#ffc72c]">Turkcell Şirket Ayarları</h1>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4 grid grid-cols-3 w-full max-w-md bg-[#e0f0fa] text-[#005f9e]">
          <TabsTrigger value="general" className="data-[state=active]:bg-[#005f9e] data-[state=active]:text-white">Genel Bilgiler</TabsTrigger>
          <TabsTrigger value="branding" className="data-[state=active]:bg-[#005f9e] data-[state=active]:text-white">Görsel Kimlik</TabsTrigger>
          <TabsTrigger value="advanced" className="data-[state=active]:bg-[#005f9e] data-[state=active]:text-white">Gelişmiş</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <form onSubmit={handleSave}>
            <Card className="border-[#005f9e]/20">
              <CardHeader>
                <CardTitle className="text-[#005f9e]">Banka Bilgileri</CardTitle>
                <CardDescription>
                  Turkcell'in temel kurumsal bilgilerini güncelleyin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#005f9e]">Banka Adı</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formState.name} 
                      onChange={handleChange} 
                      placeholder="Banka Adı"
                      className="border-[#005f9e]/30 focus-visible:ring-[#005f9e]" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="industry" className="text-[#005f9e]">Sektör</Label>
                    <Input 
                      id="industry" 
                      name="industry" 
                      value={formState.industry} 
                      onChange={handleChange} 
                      placeholder="Sektör" 
                      className="border-[#005f9e]/30 focus-visible:ring-[#005f9e]" 
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description" className="text-[#005f9e]">Banka Açıklaması</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      value={formState.description} 
                      onChange={handleChange} 
                      placeholder="Banka açıklaması..." 
                      rows={4}
                      className="border-[#005f9e]/30 focus-visible:ring-[#005f9e]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-[#005f9e]">Adres</Label>
                    <Input 
                      id="address" 
                      name="address" 
                      value={formState.address} 
                      onChange={handleChange} 
                      placeholder="Adres" 
                      className="border-[#005f9e]/30 focus-visible:ring-[#005f9e]" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="employees" className="text-[#005f9e]">Çalışan Sayısı</Label>
                    <Input 
                      id="employees" 
                      name="employees" 
                      type="number" 
                      value={formState.employees} 
                      onChange={handleChange} 
                      placeholder="Çalışan Sayısı" 
                      className="border-[#005f9e]/30 focus-visible:ring-[#005f9e]" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="founded" className="text-[#005f9e]">Kuruluş Yılı</Label>
                    <Input 
                      id="founded" 
                      name="founded" 
                      value={formState.founded} 
                      onChange={handleChange} 
                      placeholder="Kuruluş Yılı" 
                      className="border-[#005f9e]/30 focus-visible:ring-[#005f9e]" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="taxId" className="text-[#005f9e]">Vergi Numarası</Label>
                    <Input 
                      id="taxId" 
                      name="taxId" 
                      value={formState.taxId} 
                      onChange={handleChange} 
                      placeholder="Vergi Numarası" 
                      className="border-[#005f9e]/30 focus-visible:ring-[#005f9e]" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2 pt-4 border-t border-[#005f9e]/20">
                  <CardTitle className="text-lg mb-4 text-[#005f9e]">İletişim Bilgileri</CardTitle>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2 text-[#005f9e]">
                        <Mail size={14} /> E-posta
                      </Label>
                      <Input 
                        id="email" 
                        name="email" 
                        value={formState.email} 
                        onChange={handleChange} 
                        placeholder="E-posta" 
                        className="border-[#005f9e]/30 focus-visible:ring-[#005f9e]" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2 text-[#005f9e]">
                        <Phone size={14} /> Telefon
                      </Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        value={formState.phone} 
                        onChange={handleChange} 
                        placeholder="Telefon" 
                        className="border-[#005f9e]/30 focus-visible:ring-[#005f9e]" 
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="website" className="flex items-center gap-2 text-[#005f9e]">
                        <Globe size={14} /> Web Sitesi
                      </Label>
                      <Input 
                        id="website" 
                        name="website" 
                        value={formState.website} 
                        onChange={handleChange} 
                        placeholder="Web Sitesi" 
                        className="border-[#005f9e]/30 focus-visible:ring-[#005f9e]" 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" type="button" asChild className="border-[#005f9e]/30 text-[#005f9e] hover:bg-[#005f9e]/10">
                    <Link href="/dashboard/company">
                      İptal
                    </Link>
                  </Button>
                  <Button type="submit" disabled={loading} className="bg-[#005f9e] hover:bg-[#004b7f]">
                    {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                  </Button>
                </div>
                
                {success && (
                  <div className="p-3 bg-[#005f9e]/10 border border-[#005f9e]/30 rounded-md text-[#005f9e] text-center">
                    Değişiklikler başarıyla kaydedildi!
                  </div>
                )}
              </CardContent>
            </Card>
          </form>
        </TabsContent>
        
        <TabsContent value="branding">
          <Card className="border-[#005f9e]/20">
            <CardHeader>
              <CardTitle className="text-[#005f9e]">Kurumsal Görsel Kimlik</CardTitle>
              <CardDescription>
                Turkcell'in logo ve marka görsellerini yönetin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-[#005f9e]">Banka Logosu</Label>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <Avatar className="h-32 w-32 border border-[#005f9e]/30">
                    <AvatarImage src={company.logo} alt={company.name} />
                    <AvatarFallback className="text-4xl font-bold bg-[#ffc72c] text-[#333333]">TC</AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <span className="text-sm text-muted-foreground">Yeni logo yükleyin (SVG, PNG veya JPG formatında, en az 512x512px)</span>
                      <Button variant="outline" className="gap-2 border-[#005f9e]/30 text-[#005f9e] hover:bg-[#005f9e]/10">
                        <Upload size={16} />
                        Logo Yükle
                      </Button>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="destructive" size="sm">
                        Logoyu Sil
                      </Button>
                      <Button variant="outline" size="sm" className="border-[#005f9e]/30 text-[#005f9e] hover:bg-[#005f9e]/10">
                        Logoyu Sıfırla
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 space-y-4 border-t border-[#005f9e]/20">
                <div className="flex justify-between items-center">
                  <Label className="text-[#005f9e]">Kurumsal Renkler</Label>
                  <Button variant="ghost" size="sm" className="text-[#005f9e] hover:bg-[#005f9e]/10">
                    Turkcell Marka Kılavuzunu Görüntüle
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="h-12 rounded-md bg-[#005f9e]"></div>
                    <div className="text-xs">
                      <p className="font-medium">Ana Renk</p>
                      <p className="text-muted-foreground">#005f9e</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="h-12 rounded-md bg-[#0090c8]"></div>
                    <div className="text-xs">
                      <p className="font-medium">İkincil Renk</p>
                      <p className="text-muted-foreground">#0090c8</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="h-12 rounded-md bg-[#00487a]"></div>
                    <div className="text-xs">
                      <p className="font-medium">Koyu Mavi</p>
                      <p className="text-muted-foreground">#00487a</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="h-12 rounded-md bg-[#e0f0fa]"></div>
                    <div className="text-xs">
                      <p className="font-medium">Açık Mavi</p>
                      <p className="text-muted-foreground">#e0f0fa</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 space-y-4 border-t border-[#005f9e]/20">
                <Label className="text-[#005f9e]">Banka Tanıtım Görselleri</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border border-[#005f9e]/30">
                    <CardContent className="p-4">
                      <div className="aspect-video bg-[#e0f0fa] rounded-md flex items-center justify-center text-[#005f9e] mb-2">
                        Görsel 1
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">Ana Görsel</span>
                        <Button variant="ghost" size="sm" className="h-6 text-xs text-[#005f9e] hover:bg-[#005f9e]/10">
                          Değiştir
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-[#005f9e]/30">
                    <CardContent className="p-4">
                      <div className="aspect-video bg-[#e0f0fa] rounded-md flex items-center justify-center text-[#005f9e] mb-2">
                        Görsel 2
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">Hakkımızda</span>
                        <Button variant="ghost" size="sm" className="h-6 text-xs text-[#005f9e] hover:bg-[#005f9e]/10">
                          Değiştir
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-[#005f9e]/30">
                    <CardContent className="p-4">
                      <div className="aspect-video bg-[#e0f0fa] rounded-md flex items-center justify-center text-[#005f9e] mb-2">
                        Görsel 3
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">Şubeler</span>
                        <Button variant="ghost" size="sm" className="h-6 text-xs text-[#005f9e] hover:bg-[#005f9e]/10">
                          Değiştir
                </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced">
          <Card className="border-[#005f9e]/20">
            <CardHeader>
              <CardTitle className="text-[#005f9e]">Gelişmiş Ayarlar</CardTitle>
              <CardDescription>
                Eğitim platformu entegrasyonları ve sistem ayarları
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 pb-6 border-b border-[#005f9e]/20">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-[#005f9e]">E-posta Bildirimleri</h3>
                    <p className="text-sm text-muted-foreground">Sistem tarafından gönderilen e-posta bildirimleri</p>
                  </div>
                  <Button className="bg-[#005f9e] hover:bg-[#004b7f]">Yapılandır</Button>
                </div>
              </div>
              
              <div className="space-y-4 pb-6 border-b border-[#005f9e]/20">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-[#005f9e]">Kullanıcı Yönetimi</h3>
                    <p className="text-sm text-muted-foreground">SSO entegrasyonu ve kullanıcı erişim politikaları</p>
                  </div>
                  <Button className="bg-[#005f9e] hover:bg-[#004b7f]">Ayarları Düzenle</Button>
                </div>
              </div>
              
              <div className="space-y-4 pb-6 border-b border-[#005f9e]/20">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-[#005f9e]">Veri Yedekleme ve İhracat</h3>
                    <p className="text-sm text-muted-foreground">Sistem verilerinizi yedekleyin veya dışa aktarın</p>
                  </div>
                  <Button className="bg-[#005f9e] hover:bg-[#004b7f]">Veri Yönetimi</Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-[#005f9e]">API Entegrasyonu</h3>
                    <p className="text-sm text-muted-foreground">Turkcell sistemleri için API anahtarları ve webhook'lar</p>
                  </div>
                  <Button className="bg-[#005f9e] hover:bg-[#004b7f]">API Ayarları</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 