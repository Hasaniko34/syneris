"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building, Users, Package, PlusCircle, Search, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { motion } from "@/components/motion-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import axios from "axios";

// Şirket tipi
interface Company {
  _id: string;
  name: string;
  domain: string;
  logo?: string;
  description?: string;
  plan: string;
  createdAt: string;
  settings: {
    features: {
      maxUsers: number;
    };
  };
}

export default function CompaniesPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [newCompany, setNewCompany] = useState({
    name: "",
    domain: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Şirketleri yükle
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/companies');
        setCompanies(response.data.companies);
      } catch (error: any) {
        toast({
          title: "Hata",
          description: error.response?.data?.error || "Şirketler yüklenirken bir hata oluştu",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    // Admin değilse, erişimi reddet
    if (session?.user?.role !== 'admin') {
      router.push('/dashboard');
      toast({
        title: "Yetkisiz Erişim",
        description: "Bu sayfaya erişmek için admin yetkilerine sahip olmanız gerekiyor",
        variant: "destructive"
      });
      return;
    }

    fetchCompanies();
  }, [session, router, toast]);

  // Yeni şirket ekleme
  const handleAddCompany = async () => {
    try {
      setIsSubmitting(true);

      if (!newCompany.name || !newCompany.domain) {
        toast({
          title: "Hata",
          description: "Şirket adı ve domain alanları zorunludur",
          variant: "destructive"
        });
        return;
      }

      const response = await axios.post('/api/companies', newCompany);
      
      setCompanies([response.data.company, ...companies]);
      
      toast({
        title: "Başarılı",
        description: "Şirket başarıyla oluşturuldu"
      });
      
      setNewCompany({ name: "", domain: "" });
      setIsAddDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.response?.data?.error || "Şirket oluşturulurken bir hata oluştu",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Şirket silme
  const handleDeleteCompany = async () => {
    if (!selectedCompany) return;

    try {
      setIsSubmitting(true);
      
      await axios.delete(`/api/companies/${selectedCompany._id}`);
      
      setCompanies(companies.filter(company => company._id !== selectedCompany._id));
      
      toast({
        title: "Başarılı",
        description: "Şirket başarıyla silindi"
      });
      
      setIsDeleteDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.response?.data?.error || "Şirket silinirken bir hata oluştu",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filtrelenmiş şirketler
  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    company.domain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Plan renklerini belirle
  const getPlanBadgeVariant = (plan: string) => {
    switch (plan) {
      case 'free': return 'secondary';
      case 'basic': return 'default';
      case 'premium': return 'success';
      case 'enterprise': return 'destructive';
      default: return 'outline';
    }
  };

  // Animasyon varyantları
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p>Şirketler yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Formatlanmış tarih
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Şirket Yönetimi</h1>
          <p className="text-muted-foreground">Şirketleri görüntüleyin, ekleyin veya düzenleyin</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <PlusCircle size={16} />
              Yeni Şirket Ekle
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni Şirket Ekle</DialogTitle>
              <DialogDescription>
                Sisteme yeni bir şirket ekleyin. Eklenen şirket için varsayılan ayarlar otomatik olarak oluşturulacaktır.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="company-name">Şirket Adı</Label>
                <Input
                  id="company-name"
                  placeholder="Şirket Adı"
                  value={newCompany.name}
                  onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="company-domain">
                  Domain
                  <span className="text-muted-foreground text-xs ml-1">
                    (örn: acme.com)
                  </span>
                </Label>
                <Input
                  id="company-domain"
                  placeholder="acme.com"
                  value={newCompany.domain}
                  onChange={(e) => setNewCompany({ ...newCompany, domain: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  Bu domain, şirket e-postalarının doğrulanması için kullanılacaktır.
                </p>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsAddDialogOpen(false)}
                disabled={isSubmitting}
              >
                İptal
              </Button>
              <Button 
                onClick={handleAddCompany}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Ekleniyor..." : "Şirketi Ekle"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Search size={16} className="text-muted-foreground" />
          <Input
            placeholder="Şirket adı veya domain ile ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
        
        {filteredCompanies.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center h-32 p-6">
              <p className="text-muted-foreground mb-2">Şirket bulunamadı.</p>
              <Button 
                variant="outline" 
                onClick={() => setIsAddDialogOpen(true)}
              >
                <PlusCircle size={16} className="mr-2" />
                Yeni Şirket Ekle
              </Button>
            </CardContent>
          </Card>
        ) : (
          <motion.div 
            className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
          >
            {filteredCompanies.map((company) => (
              <motion.div key={company._id} variants={itemVariants}>
                <Card className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2">
                          {company.logo ? (
                            <img 
                              src={company.logo} 
                              alt={company.name} 
                              className="w-5 h-5 object-contain"
                            />
                          ) : (
                            <Building size={18} className="text-muted-foreground" />
                          )}
                          {company.name}
                        </CardTitle>
                        <CardDescription>{company.domain}</CardDescription>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-md shadow-lg border border-[#e0f0fa]/50">
                          <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/companies/${company._id}`} className="cursor-pointer">
                              <Edit size={14} className="mr-2" />
                              Düzenle
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/companies/${company._id}/users`} className="cursor-pointer">
                              <Users size={14} className="mr-2" />
                              Kullanıcılar
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive focus:text-destructive"
                            onClick={() => {
                              setSelectedCompany(company);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 size={14} className="mr-2" />
                            Sil
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Plan:</span>
                        <Badge variant={getPlanBadgeVariant(company.plan) as any}>
                          {company.plan.charAt(0).toUpperCase() + company.plan.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Oluşturulma:</span>
                        <span>{formatDate(company.createdAt)}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Kullanıcı Limiti:</span>
                        <span>{company.settings.features.maxUsers}</span>
                      </div>
                      
                      <div className="mt-4 flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          asChild
                        >
                          <Link href={`/dashboard/companies/${company._id}/users`}>
                            <Users size={14} className="mr-1" />
                            Kullanıcılar
                          </Link>
                        </Button>
                        <Button 
                          size="sm" 
                          asChild
                        >
                          <Link href={`/dashboard/companies/${company._id}`}>
                            <Edit size={14} className="mr-1" />
                            Düzenle
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      
      {/* Silme Onay Dialogu */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Şirketi Sil</DialogTitle>
            <DialogDescription>
              <span className="text-destructive font-semibold">{selectedCompany?.name}</span> şirketini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz ve şirkete ait tüm kullanıcılar ve veriler silinecektir.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="gap-2 sm:gap-0">
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isSubmitting}
            >
              İptal
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteCompany}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Siliniyor..." : "Evet, Sil"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
} 