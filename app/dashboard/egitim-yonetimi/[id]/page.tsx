"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  BookOpen,
  CheckCircle2, 
  Clock, 
  Download, 
  FileText, 
  MoreHorizontal, 
  PenSquare,
  Play, 
  Plus, 
  Share2, 
  Users,
  Trash2
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { PageProps } from "next/navigation";

// Mock eğitim verisi - Gerçek uygulamada API'den alınacak
const egitim = {
  id: "1",
  baslik: "React Temelleri",
  aciklama: "React kütüphanesinin temel özelliklerini ve modern web uygulaması geliştirme prensiplerini öğrenin. Hooks, bileşenler, state yönetimi ve daha fazlasını içerir.",
  kategori: "Yazılım Geliştirme",
  olusturulmaTarihi: "2023-10-15",
  guncellenmeTarihi: "2023-11-02",
  sure: "6 saat",
  tamamlanmaOrani: 68,
  modulSayisi: 12,
  durum: "Aktif",
  zorunlu: true,
  atanmaSayisi: 24,
  tamamlayanSayisi: 18,
  puan: 4.7,
  hedefKitle: ["Teknik Ekip", "Yazılım Geliştiriciler", "Yeni Başlayanlar"],
  etiketler: ["Frontend", "JavaScript", "Temel Seviye"],
  egitmen: {
    id: "e1",
    ad: "Ahmet Yılmaz",
    unvan: "Kıdemli Yazılım Geliştirici",
    fotograf: "/avatars/ahmet.png"
  },
  moduller: [
    {
      id: "m1",
      sira: 1,
      baslik: "React'e Giriş",
      aciklama: "React kütüphanesinin temel kavramları ve JSX sözdizimi",
      sure: "45 dakika",
      tamamlandi: true
    },
    {
      id: "m2",
      sira: 2,
      baslik: "Bileşenler ve Props",
      aciklama: "React bileşenlerinin oluşturulması ve props ile veri aktarımı",
      sure: "60 dakika",
      tamamlandi: true
    },
    {
      id: "m3",
      sira: 3,
      baslik: "State ve Yaşam Döngüsü",
      aciklama: "React bileşenlerinde durum yönetimi ve yaşam döngüsü metodları",
      sure: "75 dakika",
      tamamlandi: false
    },
    {
      id: "m4",
      sira: 4,
      baslik: "Hooks API",
      aciklama: "useState, useEffect ve diğer React Hooks'ların kullanımı",
      sure: "90 dakika",
      tamamlandi: false
    },
    {
      id: "m5",
      sira: 5,
      baslik: "Form İşlemleri",
      aciklama: "React'te form yönetimi ve doğrulama teknikleri",
      sure: "60 dakika",
      tamamlandi: false
    }
  ],
  katilimcilar: [
    {
      id: "u1",
      ad: "Mehmet Kaya",
      departman: "Yazılım Geliştirme",
      tamamlanma: 100,
      fotograf: "/avatars/mehmet.png"
    },
    {
      id: "u2",
      ad: "Ayşe Demir",
      departman: "Ürün Yönetimi",
      tamamlanma: 75,
      fotograf: "/avatars/ayse.png"
    },
    {
      id: "u3",
      ad: "Emre Yıldız",
      departman: "Yazılım Geliştirme",
      tamamlanma: 50,
      fotograf: "/avatars/emre.png"
    },
    {
      id: "u4",
      ad: "Zeynep Şahin",
      departman: "Tasarım",
      tamamlanma: 25,
      fotograf: "/avatars/zeynep.png"
    },
    {
      id: "u5",
      ad: "Burak Öztürk",
      departman: "Yazılım Geliştirme",
      tamamlanma: 0,
      fotograf: "/avatars/burak.png"
    }
  ]
};

// Form şeması
const formSchema = z.object({
  title: z.string().min(3, "Başlık en az 3 karakter olmalıdır"),
  category: z.string().min(1, "Kategori seçilmelidir"),
  description: z.string().min(10, "Açıklama en az 10 karakter olmalıdır"),
  duration: z.string().min(1, "Süre belirtilmelidir"),
  difficulty: z.string().min(1, "Zorluk seviyesi seçilmelidir"),
  targetAudience: z.string().min(1, "Hedef kitle belirtilmelidir"),
  learningOutcomes: z.string().min(10, "Öğrenme çıktıları belirtilmelidir"),
  prerequisites: z.string().optional(),
});

// Kategori seçenekleri
const categoryOptions = [
  { value: "yazilim", label: "Yazılım Geliştirme" },
  { value: "veri-bilimi", label: "Veri Bilimi" },
  { value: "yonetim", label: "Yönetim ve Liderlik" },
  { value: "kisisel-gelisim", label: "Kişisel Gelişim" },
  { value: "dil", label: "Dil Eğitimi" },
];

// Zorluk seviyeleri
const difficultyOptions = [
  { value: "baslangic", label: "Başlangıç" },
  { value: "orta", label: "Orta" },
  { value: "ileri", label: "İleri" },
];

export default function EgitimDetayPage({ params }: PageProps<{ id: string }>) {
  const router = useRouter();
  const [aktifTab, setAktifTab] = useState("genel-bilgiler");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [attachments, setAttachments] = useState<{ name: string; type: string; size: string }[]>([]);
  const [modules, setModules] = useState<{ title: string; description: string; duration: string }[]>([]);
  const [education, setEducation] = useState<any>(null);

  // Form oluştur
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      duration: "",
      difficulty: "",
      targetAudience: "",
      learningOutcomes: "",
      prerequisites: "",
    },
  });

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-6">
        {/* Üst Bar */}
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            className="gap-1"
            onClick={() => router.push("/dashboard/egitim-yonetimi")}
          >
            <ArrowLeft className="h-4 w-4" /> Eğitim Yönetimine Dön
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => router.push(`/dashboard/egitim-yonetimi/${params.id}/duzenle`)}
            >
              <PenSquare className="mr-2 h-4 w-4" /> Düzenle
            </Button>
            <Button>
              <Play className="mr-2 h-4 w-4" /> Eğitime Başla
            </Button>
          </div>
        </div>

        {/* Ana Kart */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getDurumRengi(egitim.durum)}>{egitim.durum}</Badge>
                  {egitim.zorunlu && 
                    <Badge variant="outline" className="border-red-200 text-red-700 bg-red-50">
                      Zorunlu Eğitim
                    </Badge>
                  }
                  <Badge variant="outline">{egitim.kategori}</Badge>
                </div>
                <CardTitle className="text-2xl font-bold">{egitim.baslik}</CardTitle>
                <CardDescription className="mt-1 text-base">
                  {egitim.aciklama}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={aktifTab} onValueChange={setAktifTab}>
              <TabsList className="mb-6 grid w-full grid-cols-4">
                <TabsTrigger value="genel-bilgiler">Genel Bilgiler</TabsTrigger>
                <TabsTrigger value="icerik">İçerik</TabsTrigger>
                <TabsTrigger value="katilimcilar">Katılımcılar</TabsTrigger>
                <TabsTrigger value="raporlar">Raporlar</TabsTrigger>
              </TabsList>

              <TabsContent value="genel-bilgiler">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium">Eğitim Bilgileri</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Kategori:</dt>
                          <dd className="font-medium">{egitim.kategori}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Toplam Süre:</dt>
                          <dd className="font-medium">{egitim.sure}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Modül Sayısı:</dt>
                          <dd className="font-medium">{egitim.modulSayisi}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Oluşturulma:</dt>
                          <dd className="font-medium">
                            {new Date(egitim.olusturulmaTarihi).toLocaleDateString("tr-TR")}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Son Güncelleme:</dt>
                          <dd className="font-medium">
                            {new Date(egitim.guncellenmeTarihi).toLocaleDateString("tr-TR")}
                          </dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium">Eğitmen</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={egitim.egitmen.fotograf} alt={egitim.egitmen.ad} />
                          <AvatarFallback>{egitim.egitmen.ad.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{egitim.egitmen.ad}</h4>
                          <p className="text-sm text-muted-foreground">{egitim.egitmen.unvan}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div className="text-center">
                          <div className="text-xl font-bold">16</div>
                          <div className="text-xs text-muted-foreground">Eğitim</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold">4.8</div>
                          <div className="text-xs text-muted-foreground">Ortalama Puan</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold">320</div>
                          <div className="text-xs text-muted-foreground">Öğrenci</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium">Eğitim İstatistikleri</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-muted-foreground">Tamamlanma Oranı</span>
                            <span className="text-sm font-medium">{egitim.tamamlanmaOrani}%</span>
                          </div>
                          <Progress value={egitim.tamamlanmaOrani} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-muted/50 rounded-md p-3">
                            <div className="text-xl font-bold">{egitim.atanmaSayisi}</div>
                            <div className="text-xs text-muted-foreground">Atanan Kişi</div>
                          </div>
                          <div className="bg-muted/50 rounded-md p-3">
                            <div className="text-xl font-bold">{egitim.tamamlayanSayisi}</div>
                            <div className="text-xs text-muted-foreground">Tamamlayan</div>
                          </div>
                        </div>

                        <div className="bg-muted/50 rounded-md p-3">
                          <div className="flex items-center gap-1">
                            <div className="text-xl font-bold">{egitim.puan}</div>
                            <div className="flex items-center text-yellow-500">
                              {Array.from({ length: 5 }, (_, i) => (
                                <svg
                                  key={i}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className={`w-4 h-4 ${i < Math.floor(egitim.puan) ? "opacity-100" : "opacity-30"}`}
                                >
                                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">Ortalama Değerlendirme</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium">Hedef Kitle</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {egitim.hedefKitle.map((kitle, index) => (
                          <Badge key={index} variant="outline">
                            {kitle}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium">Etiketler</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {egitim.etiketler.map((etiket, index) => (
                          <Badge key={index} variant="secondary">
                            {etiket}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="icerik">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-medium">Eğitim Modülleri</CardTitle>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Toplam: {egitim.sure}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {egitim.moduller.map((modul, index) => (
                        <div
                          key={modul.id}
                          className="flex items-start border rounded-md p-4 bg-card hover:bg-muted/40 transition-colors"
                        >
                          <div className="flex justify-center items-center w-8 h-8 rounded-full bg-primary/10 text-primary mr-4">
                            {modul.tamamlandi ? (
                              <CheckCircle2 className="h-5 w-5" />
                            ) : (
                              <span className="font-medium">{modul.sira}</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium flex items-center gap-1">
                              {modul.baslik}
                              {modul.tamamlandi && (
                                <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                                  Tamamlandı
                                </Badge>
                              )}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {modul.aciklama}
                            </p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" /> {modul.sure}
                              </span>
                              <Button size="sm" variant="ghost" className="h-8">
                                <Play className="h-4 w-4 mr-1" />
                                {modul.tamamlandi ? "Tekrar İzle" : "İzle"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      <Button variant="outline" className="gap-1">
                        <FileText className="h-4 w-4" /> Eğitim Kaynaklarını İndir
                      </Button>
                      <Button variant="default" className="gap-1">
                        <Play className="h-4 w-4" /> Eğitime Başla
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="katilimcilar">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-medium">Katılımcılar</CardTitle>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="gap-1">
                          <Download className="h-4 w-4" /> Rapor İndir
                        </Button>
                        <Button size="sm" className="gap-1">
                          <Plus className="h-4 w-4" /> Katılımcı Ekle
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Katılımcı</TableHead>
                          <TableHead>Departman</TableHead>
                          <TableHead>İlerleme</TableHead>
                          <TableHead>Durum</TableHead>
                          <TableHead className="text-right">İşlemler</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {egitim.katilimcilar.map((katilimci) => (
                          <TableRow key={katilimci.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={katilimci.fotograf} alt={katilimci.ad} />
                                  <AvatarFallback>{katilimci.ad.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{katilimci.ad}</span>
                              </div>
                            </TableCell>
                            <TableCell>{katilimci.departman}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2 w-[150px]">
                                <Progress value={katilimci.tamamlanma} className="h-2" />
                                <span className={`text-xs font-medium ${getTamamlanmaRengi(katilimci.tamamlanma)}`}>
                                  {katilimci.tamamlanma}%
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {katilimci.tamamlanma === 100 ? (
                                <Badge className="bg-green-100 text-green-800">Tamamlandı</Badge>
                              ) : katilimci.tamamlanma > 0 ? (
                                <Badge className="bg-blue-100 text-blue-800">Devam Ediyor</Badge>
                              ) : (
                                <Badge className="bg-gray-100 text-gray-800">Başlamadı</Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="raporlar">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Eğitim Raporları</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex flex-col items-center text-center">
                            <BookOpen className="h-8 w-8 text-primary mb-2" />
                            <h3 className="font-medium">Tamamlanma Raporu</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Eğitim tamamlanma oranları ve süreler
                            </p>
                            <Button size="sm" variant="ghost" className="mt-2">
                              <Download className="h-4 w-4 mr-1" /> İndir
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex flex-col items-center text-center">
                            <Users className="h-8 w-8 text-primary mb-2" />
                            <h3 className="font-medium">Katılımcı Raporu</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Katılımcı bilgileri ve ilerleme durumları
                            </p>
                            <Button size="sm" variant="ghost" className="mt-2">
                              <Download className="h-4 w-4 mr-1" /> İndir
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex flex-col items-center text-center">
                            <FileText className="h-8 w-8 text-primary mb-2" />
                            <h3 className="font-medium">Değerlendirme Raporu</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Katılımcı geri bildirimleri ve değerlendirmeler
                            </p>
                            <Button size="sm" variant="ghost" className="mt-2">
                              <Download className="h-4 w-4 mr-1" /> İndir
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">
                          Eğitim Değerlendirmeleri
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="text-3xl font-bold">{egitim.puan}</div>
                            <div className="flex flex-col">
                              <div className="flex items-center text-yellow-500">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <svg
                                    key={i}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className={`w-5 h-5 ${i < Math.floor(egitim.puan) ? "opacity-100" : "opacity-30"}`}
                                  >
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                  </svg>
                                ))}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {egitim.tamamlayanSayisi} değerlendirme
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" className="gap-1">
                            <Share2 className="h-4 w-4" /> Paylaş
                          </Button>
                        </div>

                        <Separator className="my-4" />

                        <div className="text-center mt-8 text-muted-foreground">
                          <p>Katılımcıların geri bildirimleri burada görüntülenecek.</p>
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Durum rengi belirleme
const getDurumRengi = (durum: string) => {
  switch (durum) {
    case "Aktif":
      return "bg-green-100 text-green-800";
    case "Pasif":
      return "bg-gray-100 text-gray-800";
    case "Taslak":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-blue-100 text-blue-800";
  }
};

// Tamamlanma durumu rengi
const getTamamlanmaRengi = (oran: number) => {
  if (oran >= 75) return "text-green-600";
  if (oran >= 50) return "text-amber-600";
  if (oran >= 25) return "text-orange-600";
  return "text-red-600";
}; 