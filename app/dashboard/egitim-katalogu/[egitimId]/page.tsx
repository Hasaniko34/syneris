"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Clock,
  Star,
  PlayCircle,
  Tag,
  UserCheck,
  Calendar,
  CheckCircle2,
  FileText,
  Video,
  ListChecks,
  Users,
  Trophy,
  Target,
  Smartphone,
  Bot,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { egitimKataloguVerileri } from "../data";

export default function EgitimDetayPage() {
  const { egitimId } = useParams();
  const router = useRouter();
  const egitim = egitimKataloguVerileri.find((e) => e.id === egitimId);

  if (!egitim) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Eğitim Bulunamadı</h1>
        <p className="text-muted-foreground mb-6">
          İstediğiniz eğitim bulunamadı veya kaldırılmış olabilir.
        </p>
        <Button className="bg-[#00A0D2] hover:bg-[#0080A8]" asChild>
          <Link href="/dashboard/egitim-katalogu">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Eğitim Kataloğuna Dön
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      {/* Üst Bar */}
      <div className="flex items-center gap-2 mb-6 text-sm">
        <Link href="/dashboard/egitim-katalogu" className="text-muted-foreground hover:text-foreground">
          Eğitim Kataloğu
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="font-medium">{egitim.baslik}</span>
      </div>

      {/* Ana İçerik */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        {/* Sol Kolon */}
        <div className="space-y-6">
          {/* Başlık Kartı */}
          <Card className="border-[#00A0D2]/10 hover:border-[#00A0D2]/30 transition-all">
            <CardHeader className="pb-2">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="outline" className="bg-[#FFD100]/20 text-[#00A0D2] border-[#00A0D2]/20">{egitim.kategori}</Badge>
                <Badge variant="outline" className={
                  egitim.seviye === "Başlangıç" ? "bg-green-100 text-green-700 border-green-200" :
                  egitim.seviye === "Orta" ? "bg-[#FFD100]/20 text-amber-700 border-amber-200" :
                  "bg-red-100 text-red-700 border-red-200"
                }>
                  {egitim.seviye}
                </Badge>
                {egitim.enYeni && (
                  <Badge variant="outline" className="bg-[#FFD100]/30 text-amber-700 border-amber-200">Yeni</Badge>
                )}
              </div>
              <CardTitle className="text-2xl text-[#00A0D2]">{egitim.baslik}</CardTitle>
              <CardDescription className="mt-2">{egitim.aciklama}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="font-medium">{egitim.puan}</span>
                  <span className="text-muted-foreground">({egitim.degerlendirmeSayisi} değerlendirme)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <UserCheck className="h-5 w-5" />
                  <span>{egitim.katilimciSayisi} katılımcı</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-5 w-5" />
                  <span>{egitim.sure}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-5 w-5" />
                  <span>Son güncelleme: {new Date(egitim.tarih).toLocaleDateString("tr-TR")}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* İçerik Sekmeler */}
          <Card className="border-[#00A0D2]/10 hover:border-[#00A0D2]/30 transition-all">
            <CardHeader>
              <CardTitle className="text-[#00A0D2]">Eğitim İçeriği</CardTitle>
              <CardDescription>
                Bu eğitimde öğrenecekleriniz ve kazanımlarınız
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Kazanımlar */}
              <div className="space-y-4">
                <h3 className="font-medium">Kazanımlar</h3>
                <div className="grid gap-2">
                  {egitim.kazanimlar?.map((kazanim, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#00A0D2] mt-0.5" />
                      <span>{kazanim}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modüller */}
              <div className="space-y-4">
                <h3 className="font-medium">Modüller</h3>
                <div className="space-y-2">
                  {egitim.moduller?.map((modul, idx) => (
                    <div key={idx} className="border border-[#00A0D2]/10 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{modul.baslik}</h4>
                        <Badge variant="outline" className="bg-[#FFD100]/10 text-gray-700 border-[#FFD100]/30">
                          {modul.sure}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{modul.aciklama}</p>
                      <div className="flex flex-wrap gap-2">
                        {modul.icerikler?.map((icerik, i) => (
                          <Badge key={i} variant="secondary" className="bg-[#FFD100]/10 text-gray-700">
                            {icerik}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eğitmenler */}
              <div className="space-y-4">
                <h3 className="font-medium">Eğitmenler</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {egitim.egitmenler?.map((egitmen, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 bg-[#00A0D2]/5 rounded-lg">
                      <div className="w-12 h-12 rounded-full bg-[#00A0D2]/10 flex items-center justify-center">
                        <Users className="h-6 w-6 text-[#00A0D2]" />
                      </div>
                      <div>
                        <h4 className="font-medium">{egitmen.ad}</h4>
                        <p className="text-sm text-muted-foreground mb-1">{egitmen.unvan}</p>
                        <p className="text-sm">{egitmen.aciklama}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sağ Kolon */}
        <div className="space-y-6">
          {/* Kayıt Kartı */}
          <Card className="border-[#00A0D2]/10 hover:border-[#00A0D2]/30 transition-all sticky top-6">
            <CardHeader>
              <CardTitle className="text-[#00A0D2]">Eğitime Katıl</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                {egitim.fiyat === 0 ? (
                  <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">Ücretsiz</Badge>
                ) : (
                  <div className="text-2xl font-bold">{egitim.fiyat} TL</div>
                )}
              </div>
              <Button className="w-full bg-[#00A0D2] hover:bg-[#0080A8]" asChild>
                <Link href={egitim.URL || `/dashboard/egitimlerim/kayit/${egitim.id}`}>
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Hemen Başla
                </Link>
              </Button>
              <div className="text-sm text-muted-foreground text-center">
                {egitim.sertifikaSayisi} adet sertifika kazanma fırsatı
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <div className="w-full p-4 bg-[#00A0D2]/5 rounded-lg">
                <h4 className="font-medium mb-2">Eğitim İçeriği:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[#00A0D2]" />
                    {egitim.modulSayisi} modül
                  </li>
                  <li className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-[#00A0D2]" />
                    {egitim.videoSayisi} video
                  </li>
                  <li className="flex items-center gap-2">
                    <ListChecks className="h-4 w-4 text-[#00A0D2]" />
                    {egitim.testSayisi} test
                  </li>
                  <li className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-[#00A0D2]" />
                    {egitim.sertifikaSayisi} sertifika
                  </li>
                  <li className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-[#00A0D2]" />
                    Mobil uyumlu
                  </li>
                </ul>
              </div>
            </CardFooter>
          </Card>

          {/* Synbot Yardımcı */}
          <Card className="border-[#00A0D2]/10 bg-gradient-to-r from-[#00A0D2]/5 to-[#00A0D2]/10">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-3 rounded-full bg-[#00A0D2]/10">
                <Bot className="h-6 w-6 text-[#00A0D2]" />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium mb-1">Synbot Yardımcınız</h3>
                <p className="text-sm text-muted-foreground">
                  Eğitim içeriği ve süreçleri hakkında sorularınızı yanıtlamaya hazırım.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Benzer Eğitimler */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-[#00A0D2] mb-6">Benzer Eğitimler</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* ... existing code ... */}
        </div>
      </div>
    </div>
  );
} 