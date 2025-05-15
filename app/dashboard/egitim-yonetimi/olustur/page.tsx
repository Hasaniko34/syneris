"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowLeft, Plus, Trash2, Clock } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Loader2,
  Save,
  Upload,
  X,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { RichEditor } from "@/components/ui/rich-editor";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

// Form doğrulama şeması
const egitimFormSchema = z.object({
  baslik: z
    .string()
    .min(5, { message: "Başlık en az 5 karakter olmalıdır" })
    .max(100, { message: "Başlık en fazla 100 karakter olabilir" }),
  aciklama: z
    .string()
    .min(10, { message: "Açıklama en az 10 karakter olmalıdır" })
    .max(500, { message: "Açıklama en fazla 500 karakter olabilir" }),
  kategori: z.string({
    required_error: "Lütfen bir kategori seçin",
  }),
  sure: z.string().min(1, { message: "Süre belirtilmelidir" }),
  zorunlu: z.boolean().default(false),
  durum: z.enum(["Taslak", "Aktif", "Pasif"], {
    required_error: "Lütfen bir durum seçin",
  }),
  hedefKitle: z.array(z.string()).optional(),
  aktif: z.boolean().default(true),
  etiketler: z.string().optional(),
});

// Eğitim kategorileri
const kategoriler = [
  "Yazılım Geliştirme",
  "İSG",
  "Yönetim",
  "Veri Bilimi",
  "Kişisel Gelişim",
  "Satış ve Pazarlama",
  "İnsan Kaynakları",
  "Teknik Beceriler",
  "Yabancı Dil",
];

// Hedef kitle seçenekleri
const hedefKitleSecenek = [
  { id: "yeni-calisanlar", label: "Yeni Çalışanlar" },
  { id: "tum-calisanlar", label: "Tüm Çalışanlar" },
  { id: "yoneticiler", label: "Yöneticiler" },
  { id: "satis-ekibi", label: "Satış Ekibi" },
  { id: "teknik-ekip", label: "Teknik Ekip" },
  { id: "insan-kaynaklari", label: "İnsan Kaynakları" },
];

// SearchParams için bir wrapper component
function SearchParamsWrapper({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const templateId = searchParams.get('template');
  
  return children({ templateId });
}

export default function EgitimOlusturPage() {
  const router = useRouter();
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [aktifTab, setAktifTab] = useState("genel-bilgiler");
  const [moduller, setModuller] = useState([
    { 
      id: 1, 
      baslik: "", 
      aciklama: "", 
      sure: "",
      icerik: "",
      ogrenmeCiktilari: "",
      onKosullar: ""
    },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [yeniModulBaslik, setYeniModulBaslik] = useState("");
  const [yeniModulIcerik, setYeniModulIcerik] = useState("");
  const [yeniModulSure, setYeniModulSure] = useState("");
  const [etiketler, setEtiketler] = useState<string[]>([]);
  const [yeniEtiket, setYeniEtiket] = useState("");

  // Form tanımlama
  const form = useForm<z.infer<typeof egitimFormSchema>>({
    resolver: zodResolver(egitimFormSchema),
    defaultValues: {
      baslik: "",
      aciklama: "",
      zorunlu: false,
      durum: "Taslak",
      hedefKitle: [],
      aktif: true,
      etiketler: "",
    },
  });

  // Sayfa parametrelerini ve şablon durumunu izleme
  useEffect(() => {
    // Şablon ID varsa, şablon verilerini yükleyebiliriz
    if (templateId) {
      // Burada gerçek API çağrısı olacak
      toast({
        title: "Şablon Yüklendi",
        description: `${templateId} ID'li şablon başarıyla yüklendi.`,
      });
      
      // Şablon verilerini form alanlarına doldurma işlemi burada yapılacak
      setAktifTab("genel");
    }
  }, [templateId]);

  // Form gönderimi
  const onSubmit = async (values: z.infer<typeof egitimFormSchema>) => {
    if (moduller.length === 0) {
      alert("En az bir modül eklemelisiniz");
      setAktifTab("moduller");
      return;
    }

    setIsSubmitting(true);

    // Etiketleri form değerine dahil et
    const egitimVerisi = {
      ...values,
      moduller,
      etiketler,
    };

    // API çağrısı simülasyonu
    try {
      console.log("Eğitim verisi:", egitimVerisi);
      
      // Gerçek uygulamada burada bir API çağrısı yapılabilir
      // const response = await fetch('/api/egitimler', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(egitimVerisi),
      // });
      
      // API yanıtını bekliyormuş gibi bir gecikme simülasyonu
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Başarılı olduğunu varsayalım
      alert("Eğitim başarıyla oluşturuldu!");
      router.push("/dashboard/egitim-yonetimi");
    } catch (error) {
      console.error("Eğitim oluşturma hatası:", error);
      alert("Eğitim oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Yeni modül ekleme
  const modulEkle = () => {
    const yeniId = moduller.length > 0 ? moduller[moduller.length - 1].id + 1 : 1;
    setModuller([...moduller, { id: yeniId, baslik: "", aciklama: "", sure: "", icerik: "", ogrenmeCiktilari: "", onKosullar: "" }]);
  };

  // Modül silme
  const modulSil = (id: number) => {
    if (moduller.length <= 1) {
      alert("En az bir modül bulunmalıdır");
      return;
    }
    setModuller(moduller.filter((modul) => modul.id !== id));
  };

  // Modül güncelleme
  const modulGuncelle = (id: number, field: string, value: string) => {
    setModuller(
      moduller.map((modul) =>
        modul.id === id ? { ...modul, [field]: value } : modul
      )
    );
  };

  // Etiket ekleme
  const handleEtiketEkle = () => {
    if (
      yeniEtiket.trim() &&
      !etiketler.includes(yeniEtiket.trim())
    ) {
      setEtiketler([...etiketler, yeniEtiket.trim()]);
      setYeniEtiket("");
    }
  };

  // Etiket silme
  const handleEtiketSil = (etiket: string) => {
    setEtiketler(etiketler.filter((e) => e !== etiket));
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-4" asChild>
          <Link href="/dashboard/egitim-yonetimi">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Geri Dön
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Yeni Eğitim Oluştur</h1>
      </div>

      <Suspense fallback={<div>Yükleniyor...</div>}>
        <SearchParamsWrapper>
          {({ templateId: id }) => {
            // ID'yi state'e ayarla
            if (id !== templateId) {
              setTemplateId(id);
            }
            
            return null;
          }}
        </SearchParamsWrapper>
      </Suspense>

      <Tabs value={aktifTab} onValueChange={setAktifTab}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="genel-bilgiler">Eğitim Bilgileri</TabsTrigger>
          <TabsTrigger value="moduller">İçerik ve Modüller</TabsTrigger>
          <TabsTrigger value="attachments">Ekler ve Kaynaklar</TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <TabsContent value="genel-bilgiler">
              <Card>
                <CardHeader>
                  <CardTitle>Eğitim Detayları</CardTitle>
                  <CardDescription>
                    Eğitimin temel bilgilerini ve özelliklerini tanımlayın.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="baslik"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Eğitim Başlığı*</FormLabel>
                        <FormControl>
                          <Input placeholder="Eğitim başlığını girin" {...field} />
                        </FormControl>
                        <FormDescription>
                          Açıklayıcı ve kısa bir başlık seçin.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="aciklama"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Açıklama*</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Eğitimin detaylı açıklamasını girin"
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Eğitimin içeriği ve katılımcılara katkısı hakkında bilgi verin.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="kategori"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kategori*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Bir kategori seçin" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {kategoriler.map((kategori) => (
                                <SelectItem key={kategori} value={kategori}>
                                  {kategori}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sure"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tahmini Süre*</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="Örn: 2 saat 30 dakika" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="durum"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Durum</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                          >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Taslak" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Taslak
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Aktif" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Aktif
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Pasif" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Pasif
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="zorunlu"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Zorunlu Eğitim</FormLabel>
                          <FormDescription>
                            Tüm çalışanlar için zorunlu ise etkinleştirin.
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hedefKitle"
                    render={() => (
                      <FormItem>
                        <div className="mb-2">
                          <FormLabel>Hedef Kitle</FormLabel>
                          <FormDescription>
                            Bu eğitimin hedeflediği çalışan gruplarını belirtin.
                          </FormDescription>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {hedefKitleSecenek.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="hedefKitle"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-start space-x-3 space-y-0 py-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value || [], item.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {item.label}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <FormLabel>Etiketler</FormLabel>
                    <div className="flex flex-wrap gap-2 mt-2 mb-4">
                      {etiketler.map((etiket) => (
                        <Badge key={etiket} className="gap-1">
                          {etiket}
                          <button
                            type="button"
                            onClick={() => handleEtiketSil(etiket)}
                            className="ml-1 rounded-full hover:bg-primary-foreground"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                      {etiketler.length === 0 && (
                        <span className="text-sm text-muted-foreground">
                          Henüz etiket eklenmedi
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={yeniEtiket}
                        onChange={(e) => setYeniEtiket(e.target.value)}
                        placeholder="Yeni etiket"
                        className="max-w-xs"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleEtiketEkle();
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleEtiketEkle}
                      >
                        Ekle
                      </Button>
                    </div>
                    <FormDescription>
                      Eğitimi kategorize etmek için etiketler ekleyin
                    </FormDescription>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => router.push("/dashboard/egitim-yonetimi")}>
                    İptal
                  </Button>
                  <Button type="button" onClick={() => setAktifTab("moduller")}>
                    Devam Et
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="moduller">
              <Card>
                <CardHeader>
                  <CardTitle>Eğitim Modülleri</CardTitle>
                  <CardDescription>
                    Eğitim içeriğini modüller halinde organize edin. Her modüle başlık, açıklama ve süre ekleyin.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {moduller.map((modul, index) => (
                    <div key={modul.id} className="border rounded-md p-4 relative">
                      <div className="absolute top-4 right-4">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => modulSil(modul.id)}
                          className="h-8 w-8"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <h3 className="text-lg font-medium mb-4">Modül {index + 1}</h3>
                      <div className="grid gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="md:col-span-3">
                            <Label htmlFor={`modul-${modul.id}-baslik`}>Modül Başlığı</Label>
                            <Input
                              id={`modul-${modul.id}-baslik`}
                              value={modul.baslik}
                              onChange={(e) =>
                                modulGuncelle(modul.id, "baslik", e.target.value)
                              }
                              placeholder="Modül başlığını girin"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`modul-${modul.id}-sure`}>Süre</Label>
                            <Input
                              id={`modul-${modul.id}-sure`}
                              value={modul.sure}
                              onChange={(e) =>
                                modulGuncelle(modul.id, "sure", e.target.value)
                              }
                              placeholder="örn: 30 dakika"
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor={`modul-${modul.id}-aciklama`}>Modül Açıklaması</Label>
                          <Textarea
                            id={`modul-${modul.id}-aciklama`}
                            value={modul.aciklama}
                            onChange={(e) =>
                              modulGuncelle(modul.id, "aciklama", e.target.value)
                            }
                            placeholder="Modül içeriği hakkında kısa bir açıklama girin"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`modul-${modul.id}-icerik`}>İçerik</Label>
                          <div className="mt-1">
                            <RichEditor
                              value={modul.icerik || ""}
                              onChange={(value) => modulGuncelle(modul.id, "icerik", value)}
                              placeholder="Modül içeriğini buraya girin..."
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            İçeriğe metin, görsel, video ve bağlantı ekleyebilirsiniz.
                          </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`modul-${modul.id}-ogrenme-ciktilari`}>Öğrenme Çıktıları</Label>
                            <Textarea
                              id={`modul-${modul.id}-ogrenme-ciktilari`}
                              value={modul.ogrenmeCiktilari || ""}
                              onChange={(e) =>
                                modulGuncelle(modul.id, "ogrenmeCiktilari", e.target.value)
                              }
                              placeholder="Bu modülün öğrenme çıktılarını girin"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`modul-${modul.id}-on-kosullar`}>Ön Koşullar (Opsiyonel)</Label>
                            <Textarea
                              id={`modul-${modul.id}-on-kosullar`}
                              value={modul.onKosullar || ""}
                              onChange={(e) =>
                                modulGuncelle(modul.id, "onKosullar", e.target.value)
                              }
                              placeholder="Bu modül için gerekli ön koşulları girin (opsiyonel)"
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" className="w-full" onClick={modulEkle}>
                    <Plus className="mr-2 h-4 w-4" /> Yeni Modül Ekle
                  </Button>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setAktifTab("genel-bilgiler")}
                  >
                    Geri
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setAktifTab("attachments")}
                  >
                    Devam Et
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="attachments">
              <Card>
                <CardHeader>
                  <CardTitle>Ekler ve Kaynaklar</CardTitle>
                  <CardDescription>
                    Eğitim için ek kaynaklar ve dokümanlar ekleyin.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Ekler</h3>
                      <Button type="button" variant="outline" size="sm" onClick={() => {}}>
                        <Plus className="mr-2 h-4 w-4" /> Ek Ekle
                      </Button>
                    </div>
                    
                    {/* Eklerin listesi burada görüntülenecek */}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setAktifTab("moduller")}
                    >
                      Geri
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push("/dashboard/egitim-yonetimi")}
                    >
                      İptal
                    </Button>
                  </div>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>Kaydediliyor...</>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" /> Eğitimi Kaydet
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </form>
        </Form>
      </Tabs>
    </div>
  );
} 