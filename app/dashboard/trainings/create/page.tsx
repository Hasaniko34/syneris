"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Upload, X, Calendar, Clock, BookOpen, Trash2, FileText, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Form şeması
const trainingFormSchema = z.object({
  title: z.string().min(5, {
    message: "Eğitim başlığı en az 5 karakter olmalıdır.",
  }),
  description: z.string().min(20, {
    message: "Eğitim açıklaması en az 20 karakter olmalıdır.",
  }),
  category: z.string({
    required_error: "Lütfen bir kategori seçin.",
  }),
  difficulty: z.string({
    required_error: "Lütfen bir zorluk seviyesi seçin.",
  }),
  duration: z.string().min(1, {
    message: "Eğitim süresi gereklidir.",
  }),
  isFeatured: z.boolean().default(false),
  isRequired: z.boolean().default(false),
  targetAudience: z.array(z.string()).min(1, {
    message: "En az bir hedef kitle seçmelisiniz.",
  }),
  tags: z.array(z.string()).optional(),
  approvalRequired: z.boolean().default(false),
  certificateProvided: z.boolean().default(false),
  expiryPeriod: z.string().optional(),
});

// Hedef kitle seçenekleri
const audienceOptions = [
  { id: "bireysel-sube", label: "Bireysel Bankacılık - Şube Personeli" },
  { id: "bireysel-merkez", label: "Bireysel Bankacılık - Genel Müdürlük" },
  { id: "kurumsal-sube", label: "Kurumsal Bankacılık - Şube Personeli" },
  { id: "kurumsal-merkez", label: "Kurumsal Bankacılık - Genel Müdürlük" },
  { id: "kobi-sube", label: "KOBİ Bankacılığı - Şube Personeli" },
  { id: "kobi-merkez", label: "KOBİ Bankacılığı - Genel Müdürlük" },
  { id: "dijital", label: "Dijital Bankacılık Departmanı" },
  { id: "yatirim", label: "Yatırım Bankacılığı Departmanı" },
  { id: "risk", label: "Risk Yönetimi Departmanı" },
  { id: "operasyon", label: "Operasyon Departmanı" },
  { id: "insan-kaynaklari", label: "İnsan Kaynakları Departmanı" },
  { id: "sube-mudur", label: "Şube Müdürleri" },
  { id: "bolge-mudur", label: "Bölge Müdürleri" },
  { id: "genel-mudur-yrd", label: "Genel Müdür Yardımcıları" },
  { id: "tum-personel", label: "Tüm TEB Personeli" },
];

export default function CreateTrainingPage() {
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [modules, setModules] = useState<{ title: string; duration: string }[]>([
    { title: "", duration: "" },
  ]);

  // Form tanımı
  const form = useForm<z.infer<typeof trainingFormSchema>>({
    resolver: zodResolver(trainingFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      difficulty: "",
      duration: "",
      isFeatured: false,
      isRequired: false,
      targetAudience: [],
      tags: [],
      approvalRequired: false,
      certificateProvided: false,
      expiryPeriod: "",
    },
  });

  // Form gönderimi
  function onSubmit(data: z.infer<typeof trainingFormSchema>) {
    // Etiketleri ekleyelim
    data.tags = tags;
    
    // API'ye gönderme işlemi burada yapılacak
    console.log("Form verileri:", data);
    console.log("Modüller:", modules);
    
    // Başarılı oluşturma sonrası yönlendirme
    router.push("/dashboard/trainings/search");
  }

  // Etiket ekleme
  const addTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  // Etiket silme
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Modül ekleme
  const addModule = () => {
    setModules([...modules, { title: "", duration: "" }]);
  };

  // Modül silme
  const removeModule = (index: number) => {
    if (modules.length > 1) {
      const newModules = [...modules];
      newModules.splice(index, 1);
      setModules(newModules);
    }
  };

  // Modül güncelleme
  const updateModule = (index: number, field: string, value: string) => {
    const newModules = [...modules];
    newModules[index] = { ...newModules[index], [field]: value };
    setModules(newModules);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" asChild className="mr-2 text-[#005f9e]">
          <Link href="/dashboard/trainings/search">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-[#005f9e]">TEB Eğitim Programı Oluşturma</h1>
          <p className="text-muted-foreground">
            TEB çalışanları için yeni bir bankacılık eğitim programı oluşturun
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Ana Bilgiler */}
            <div className="md:col-span-2 space-y-6">
              <Card className="border-[#005f9e]/20">
                <CardHeader>
                  <CardTitle className="text-[#005f9e]">Eğitim Bilgileri</CardTitle>
                  <CardDescription>
                    TEB bankacılık eğitiminin temel bilgilerini girin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Eğitim Başlığı</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Örn: TEB Bireysel Bankacılık Müşteri İlişkileri Yönetimi" 
                            className="border-[#005f9e]/30 focus-visible:ring-[#005f9e]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Eğitim Açıklaması</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Eğitimin içeriği ve kazanımları hakkında detaylı bilgi verin" 
                            className="min-h-[120px] border-[#005f9e]/30 focus-visible:ring-[#005f9e]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kategori</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-[#005f9e]/30 focus-visible:ring-[#005f9e]">
                                <SelectValue placeholder="Kategori seçin" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="bireysel-bankacilik">Bireysel Bankacılık</SelectItem>
                              <SelectItem value="kurumsal-bankacilik">Kurumsal Bankacılık</SelectItem>
                              <SelectItem value="kobi-bankaciligi">KOBİ Bankacılığı</SelectItem>
                              <SelectItem value="dijital-bankacilik">Dijital Bankacılık</SelectItem>
                              <SelectItem value="yatirim-bankaciligi">Yatırım Bankacılığı</SelectItem>
                              <SelectItem value="risk-yonetimi">Risk Yönetimi</SelectItem>
                              <SelectItem value="mevzuat-uyum">Mevzuat ve Uyum</SelectItem>
                              <SelectItem value="liderlik-yonetim">Liderlik ve Yönetim</SelectItem>
                              <SelectItem value="musteri-deneyimi">Müşteri Deneyimi</SelectItem>
                              <SelectItem value="satis-teknikleri">Satış Teknikleri</SelectItem>
                              <SelectItem value="kredi-tahsis">Kredi Tahsis Süreçleri</SelectItem>
                              <SelectItem value="operasyonel-islemler">Operasyonel İşlemler</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="difficulty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Zorluk Seviyesi</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-[#005f9e]/30 focus-visible:ring-[#005f9e]">
                                <SelectValue placeholder="Zorluk seviyesi seçin" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="baslangic">Başlangıç</SelectItem>
                              <SelectItem value="orta">Orta</SelectItem>
                              <SelectItem value="ileri">İleri</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Toplam Süre (Saat)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="1" 
                            placeholder="Örn: 10" 
                            className="border-[#005f9e]/30 focus-visible:ring-[#005f9e]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Eğitimin tamamlanması için gereken tahmini süre
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col space-y-4">
                    <Label>Etiketler</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        placeholder="Etiket ekleyin (Örn: Müşteri İlişkileri, Kredi Tahsis, Mevzuat)"
                        className="flex-1 border-[#005f9e]/30 focus-visible:ring-[#005f9e]"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTag();
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="border-[#005f9e]/30 text-[#005f9e] hover:bg-[#005f9e]/10"
                        onClick={addTag}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Ekle
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-[#005f9e]/10 text-[#005f9e] hover:bg-[#005f9e]/20"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                          <button
                            type="button"
                            className="ml-1 hover:text-red-500"
                            onClick={() => removeTag(tag)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                      {tags.length === 0 && (
                        <span className="text-sm text-muted-foreground">
                          Henüz etiket eklenmedi
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#005f9e]/20">
                <CardHeader>
                  <CardTitle className="text-[#005f9e]">Eğitim Modülleri</CardTitle>
                  <CardDescription>
                    TEB bankacılık eğitiminin içeriğini oluşturan modülleri ekleyin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {modules.map((module, index) => (
                    <div key={index} className="space-y-4 pb-4 border-b border-[#005f9e]/10">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Modül {index + 1}</h3>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeModule(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-3">
                          <Label htmlFor={`module-title-${index}`}>Başlık</Label>
                          <Input
                            id={`module-title-${index}`}
                            value={module.title}
                            onChange={(e) => updateModule(index, "title", e.target.value)}
                            placeholder="Modül başlığı"
                            className="border-[#005f9e]/30 focus-visible:ring-[#005f9e]"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`module-duration-${index}`}>Süre (Saat)</Label>
                          <Input
                            id={`module-duration-${index}`}
                            type="number"
                            min="1"
                            value={module.duration}
                            onChange={(e) => updateModule(index, "duration", e.target.value)}
                            placeholder="Süre"
                            className="border-[#005f9e]/30 focus-visible:ring-[#005f9e]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-[#005f9e]/30 text-[#005f9e] hover:bg-[#005f9e]/10"
                    onClick={addModule}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Yeni Modül Ekle
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Yan Panel */}
            <div className="space-y-6">
              <Card className="border-[#005f9e]/20">
                <CardHeader>
                  <CardTitle className="text-[#005f9e]">Eğitim Ayarları</CardTitle>
                  <CardDescription>
                    TEB bankacılık eğitiminin yayın ve hedef kitle ayarları
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="isFeatured"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-[#005f9e]/20 p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-[#005f9e] data-[state=checked]:border-[#005f9e]"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Öne Çıkan Eğitim</FormLabel>
                          <FormDescription>
                            Bu eğitimi TEB Akademi ana sayfasında öne çıkar
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isRequired"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-[#005f9e]/20 p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-[#005f9e] data-[state=checked]:border-[#005f9e]"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Zorunlu Eğitim</FormLabel>
                          <FormDescription>
                            Bu eğitim seçilen hedef kitle için zorunludur
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="approvalRequired"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-[#005f9e]/20 p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-[#005f9e] data-[state=checked]:border-[#005f9e]"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Yönetici Onayı Gerekli</FormLabel>
                          <FormDescription>
                            Bu eğitime katılım için yönetici onayı gereklidir
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="certificateProvided"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-[#005f9e]/20 p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-[#005f9e] data-[state=checked]:border-[#005f9e]"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Sertifika Verilecek</FormLabel>
                          <FormDescription>
                            Eğitimi tamamlayan personele TEB sertifikası verilecek
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="expiryPeriod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Geçerlilik Süresi (Ay)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="0" 
                            placeholder="Örn: 12 (Süresiz için boş bırakın)" 
                            className="border-[#005f9e]/30 focus-visible:ring-[#005f9e]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Eğitimin geçerlilik süresi (ay cinsinden, süresiz için boş bırakın)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator className="my-4" />

                  <FormField
                    control={form.control}
                    name="targetAudience"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>Hedef Kitle</FormLabel>
                          <FormDescription>
                            Bu eğitimin hedef kitlesini seçin
                          </FormDescription>
                        </div>
                        {audienceOptions.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="targetAudience"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, item.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id
                                              )
                                            )
                                      }}
                                      className="data-[state=checked]:bg-[#005f9e] data-[state=checked]:border-[#005f9e]"
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card className="border-[#005f9e]/20">
                <CardHeader>
                  <CardTitle className="text-[#005f9e]">Eğitim Görseli</CardTitle>
                  <CardDescription>
                    TEB kurumsal kimliğine uygun eğitim kapak görseli yükleyin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-[#005f9e]/30 rounded-lg p-8 text-center">
                    <div className="flex flex-col items-center">
                      <Upload className="h-10 w-10 text-[#005f9e]/50 mb-4" />
                      <p className="text-sm font-medium mb-1">Görseli buraya sürükleyin</p>
                      <p className="text-xs text-muted-foreground mb-4">PNG, JPG veya WEBP (max. 2MB)</p>
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="border-[#005f9e]/30 text-[#005f9e] hover:bg-[#005f9e]/10"
                      >
                        Dosya Seç
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button 
              type="button" 
              variant="outline" 
              className="border-[#005f9e]/30 text-[#005f9e] hover:bg-[#005f9e]/10"
              onClick={() => router.push("/dashboard/trainings/search")}
            >
              İptal
            </Button>
            <Button type="submit" className="bg-[#005f9e] hover:bg-[#00487a]">
              TEB Eğitimini Oluştur
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
} 