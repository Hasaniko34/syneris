"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  User, UserPlus, Search, Edit, Trash2, MoreHorizontal, 
  Check, X, Shield, Filter, Download, SortAsc, Building 
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import axios from "axios";

// Kullanıcı tipi
interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
  company: string;
  companyName?: string;
  active: boolean;
  createdAt: string;
}

export default function UsersPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 1
  });
  const [roleFilter, setRoleFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [companies, setCompanies] = useState<{_id: string, name: string}[]>([]);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    password: ""
  });

  const [editUser, setEditUser] = useState({
    name: "",
    role: "",
    company: "",
    active: true,
    password: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Kullanıcıları ve şirketleri yükle
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Admin veya manager değilse, erişimi reddet
        if (session?.user?.role !== 'admin' && session?.user?.role !== 'manager') {
          router.push('/dashboard');
          toast({
            title: "Yetkisiz Erişim",
            description: "Bu sayfaya erişmek için gerekli yetkilere sahip değilsiniz",
            variant: "destructive"
          });
          return;
        }

        // Şirketleri getir (sadece admin için)
        if (session?.user?.role === 'admin') {
          const companiesResponse = await axios.get('/api/companies');
          setCompanies(companiesResponse.data.companies);
        }
        
        // Kullanıcıları getir
        await fetchUsers();
      } catch (error: any) {
        console.error("Veri yükleme hatası:", error);
        toast({
          title: "Hata",
          description: error.response?.data?.error || "Veriler yüklenirken bir hata oluştu",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchData();
    }
  }, [session, router, toast]);

  // Kullanıcıları getirme
  const fetchUsers = async (page = 1) => {
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', pagination.limit.toString());
      
      if (searchQuery) {
        params.append('search', searchQuery);
      }
      
      if (roleFilter) {
        params.append('role', roleFilter);
      }

      if (companyFilter && session?.user?.role === 'admin') {
        params.append('company', companyFilter);
      }
      
      const apiUrl = session?.user?.role === 'admin' 
        ? `/api/users?${params.toString()}`
        : `/api/companies/${session?.user?.company}/users?${params.toString()}`;
      
      const response = await axios.get(apiUrl);
      setUsers(response.data.users);
      setPagination(response.data.pagination);
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.response?.data?.error || "Kullanıcılar yüklenirken bir hata oluştu",
        variant: "destructive"
      });
    }
  };

  // Arama yapma
  const handleSearch = () => {
    fetchUsers(1);
  };

  // Rol filtresi değiştiğinde
  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(value);
    setTimeout(() => fetchUsers(1), 100);
  };

  // Şirket filtresi değiştiğinde (sadece admin için)
  const handleCompanyFilterChange = (value: string) => {
    setCompanyFilter(value);
    setTimeout(() => fetchUsers(1), 100);
  };

  // Yeni kullanıcı ekleme
  const handleAddUser = async () => {
    try {
      if (!newUser.name || !newUser.email || !newUser.password) {
        toast({
          title: "Eksik Bilgi",
          description: "Lütfen tüm zorunlu alanları doldurun",
          variant: "destructive"
        });
        return;
      }

      setIsSubmitting(true);
      
      // Admin ise ve şirket seçimi yapmamışsa hata ver
      if (session?.user?.role === 'admin' && !newUser.company) {
        toast({
          title: "Eksik Bilgi",
          description: "Lütfen bir şirket seçin",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      const userData = {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role || 'user',
        password: newUser.password,
        company: session?.user?.role === 'admin' ? newUser.company : session?.user?.company
      };

      // API çağrısı
      const response = await axios.post('/api/users', userData);
      
      toast({
        title: "Başarılı",
        description: "Kullanıcı başarıyla eklendi",
      });
      
      // Formu temizle ve dialogu kapat
      setNewUser({
        name: "",
        email: "",
        company: "",
        role: "",
        password: ""
      });
      setIsAddDialogOpen(false);
      
      // Kullanıcı listesini yenile
      fetchUsers();
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.response?.data?.error || "Kullanıcı eklenirken bir hata oluştu",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Kullanıcı düzenleme
  const handleEditUser = async () => {
    try {
      if (!selectedUser || !editUser.name) {
        toast({
          title: "Eksik Bilgi",
          description: "Lütfen gerekli alanları doldurun",
          variant: "destructive"
        });
        return;
      }

      setIsSubmitting(true);
      
      const userData: any = {
        name: editUser.name,
        role: editUser.role,
        active: editUser.active
      };
      
      // Admin ise ve şirket değiştiyse
      if (session?.user?.role === 'admin' && editUser.company) {
        userData.company = editUser.company;
      }
      
      // Şifre değiştiyse ekle
      if (editUser.password) {
        userData.password = editUser.password;
      }

      // API çağrısı
      const response = await axios.put(`/api/users/${selectedUser._id}`, userData);
      
      toast({
        title: "Başarılı",
        description: "Kullanıcı başarıyla güncellendi",
      });
      
      // Formu kapat
      setIsEditDialogOpen(false);
      
      // Kullanıcı listesini yenile
      fetchUsers();
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.response?.data?.error || "Kullanıcı güncellenirken bir hata oluştu",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Kullanıcı silme
  const handleDeleteUser = async () => {
    try {
      if (!selectedUser) return;
      
      setIsSubmitting(true);
      
      // API çağrısı
      const response = await axios.delete(`/api/users/${selectedUser._id}`);
      
      toast({
        title: "Başarılı",
        description: "Kullanıcı başarıyla silindi",
      });
      
      // Formu kapat
      setIsDeleteDialogOpen(false);
      
      // Kullanıcı listesini yenile
      fetchUsers();
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.response?.data?.error || "Kullanıcı silinirken bir hata oluştu",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sayfa değiştirme
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.pages) return;
    fetchUsers(newPage);
  };

  // Rol için badge rengi
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'manager': return 'default';
      case 'trainer': return 'success';
      case 'user': return 'secondary';
      default: return 'outline';
    }
  };

  // Rol Türkçe karşılıkları
  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin': return 'Yönetici';
      case 'manager': return 'Şirket Yöneticisi';
      case 'trainer': return 'Eğitmen';
      case 'user': return 'Kullanıcı';
      default: return role;
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
          <p>Yükleniyor...</p>
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-[#005f9e]">TEB Kullanıcı Yönetimi</h1>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-[#005f9e] hover:bg-[#00487a] text-white"
        >
          <UserPlus className="mr-2 h-4 w-4" /> Yeni Kullanıcı Ekle
        </Button>
      </div>

      <Card className="border-[#005f9e]/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-[#005f9e]">Filtreleme ve Arama</CardTitle>
          <CardDescription>
            İsim veya e-posta ile kullanıcıları arayın
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Kullanıcı adı veya e-posta ile ara..."
                className="pl-8 border-[#005f9e]/30 focus-visible:ring-[#005f9e]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            
            <div className="flex flex-col md:flex-row gap-2 md:gap-4">
              <Select value={roleFilter} onValueChange={handleRoleFilterChange}>
                <SelectTrigger className="w-full md:w-40 border-[#005f9e]/30 focus-visible:ring-[#005f9e]">
                  <SelectValue placeholder="Rol Filtresi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tüm Roller</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Yönetici</SelectItem>
                  <SelectItem value="user">Kullanıcı</SelectItem>
                </SelectContent>
              </Select>
              
              {session?.user?.role === 'admin' && (
                <Select value={companyFilter} onValueChange={handleCompanyFilterChange}>
                  <SelectTrigger className="w-full md:w-40 border-[#005f9e]/30 focus-visible:ring-[#005f9e]">
                    <SelectValue placeholder="Şube Filtresi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tüm Şubeler</SelectItem>
                    {companies.map((company) => (
                      <SelectItem key={company._id} value={company._id}>{company.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              
              <Button onClick={handleSearch} variant="outline" className="border-[#005f9e]/30 text-[#005f9e] hover:bg-[#005f9e]/10">
                <Filter className="mr-2 h-4 w-4" /> Filtrele
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-white rounded-lg border border-[#005f9e]/20 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#e0f0fa]">
              <TableRow>
                <TableHead className="text-[#005f9e]">Kullanıcı</TableHead>
                <TableHead className="text-[#005f9e]">Rol</TableHead>
                {session?.user?.role === 'admin' && (
                  <TableHead className="text-[#005f9e]">Şube</TableHead>
                )}
                <TableHead className="text-[#005f9e]">Durum</TableHead>
                <TableHead className="text-[#005f9e]">Kayıt Tarihi</TableHead>
                <TableHead className="text-right text-[#005f9e]">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback>
                        {user.name.split(' ').map(name => name[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  {session?.user?.role === 'admin' && (
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Building size={14} className="text-muted-foreground" />
                        <span>{user.companyName}</span>
                      </div>
                    </TableCell>
                  )}
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(user.role) as any}>
                      {getRoleText(user.role)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.active ? (
                      <span className="flex items-center text-emerald-600">
                        <Check size={16} className="mr-1" />
                        Aktif
                      </span>
                    ) : (
                      <span className="flex items-center text-rose-500">
                        <X size={16} className="mr-1" />
                        Pasif
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => {
                            setSelectedUser(user);
                            setEditUser({
                              name: user.name,
                              role: user.role,
                              company: user.company,
                              active: user.active,
                              password: ""
                            });
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit size={14} className="mr-2" />
                          Düzenle
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsDeleteDialogOpen(true);
                          }}
                          disabled={user.email === session?.user?.email}
                        >
                          <Trash2 size={14} className="mr-2" />
                          Sil
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {pagination.pages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              Önceki
            </Button>
            
            <div className="flex items-center gap-1">
              {[...Array(pagination.pages)].map((_, i) => (
                <Button
                  key={i}
                  variant={i + 1 === pagination.page ? "default" : "outline"}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.pages}
            >
              Sonraki
            </Button>
          </div>
        )}
      </div>
      
      {/* Kullanıcı Düzenleme Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kullanıcı Düzenle</DialogTitle>
            <DialogDescription>
              {selectedUser?.name} kullanıcısının bilgilerini düzenleyin.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Ad Soyad</Label>
              <Input
                id="edit-name"
                placeholder="Ad Soyad"
                value={editUser.name}
                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
              />
            </div>
            
            {session?.user?.role === 'admin' && (
              <div className="grid gap-2">
                <Label htmlFor="edit-company">Şirket</Label>
                <Select 
                  value={editUser.company} 
                  onValueChange={(value) => setEditUser({ ...editUser, company: value })}
                >
                  <SelectTrigger id="edit-company">
                    <SelectValue placeholder="Şirket seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company._id} value={company._id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor="edit-role">Rol</Label>
              <Select
                value={editUser.role}
                onValueChange={(value) => setEditUser({ ...editUser, role: value })}
                disabled={selectedUser?.email === session?.user?.email}
              >
                <SelectTrigger id="edit-role">
                  <SelectValue placeholder="Rol seçin" />
                </SelectTrigger>
                <SelectContent>
                  {session?.user?.role === "admin" && (
                    <SelectItem value="admin">Yönetici</SelectItem>
                  )}
                  <SelectItem value="manager">Şirket Yöneticisi</SelectItem>
                  <SelectItem value="trainer">Eğitmen</SelectItem>
                  <SelectItem value="user">Kullanıcı</SelectItem>
                </SelectContent>
              </Select>
              {selectedUser?.email === session?.user?.email && (
                <p className="text-xs text-muted-foreground">
                  Kendi rolünüzü değiştiremezsiniz.
                </p>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-status">Durum</Label>
              <Select
                value={editUser.active ? "active" : "inactive"}
                onValueChange={(value) => setEditUser({ ...editUser, active: value === "active" })}
                disabled={selectedUser?.email === session?.user?.email}
              >
                <SelectTrigger id="edit-status">
                  <SelectValue placeholder="Durum seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Pasif</SelectItem>
                </SelectContent>
              </Select>
              {selectedUser?.email === session?.user?.email && (
                <p className="text-xs text-muted-foreground">
                  Kendi hesabınızı pasif yapamazsınız.
                </p>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-password">Yeni Şifre (Opsiyonel)</Label>
              <Input
                id="edit-password"
                type="password"
                placeholder="Yeni şifre belirlemek için doldurun"
                value={editUser.password}
                onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Şifreyi değiştirmek istemiyorsanız boş bırakın.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              İptal
            </Button>
            <Button onClick={handleEditUser} disabled={isSubmitting}>
              {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Kullanıcı Silme Onay Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kullanıcıyı Sil</DialogTitle>
            <DialogDescription>
              Bu işlem geri alınamaz. {selectedUser?.name} kullanıcısını silmek istediğinize emin misiniz?
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="p-4 border border-destructive/30 bg-destructive/10 rounded-lg text-destructive">
              <p>Kullanıcıyı sildiğinizde:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
                <li>Kullanıcının tüm etkinlik geçmişi silinir</li>
                <li>Eğitim kayıtları ve ilerlemeleri silinir</li>
                <li>Kullanıcı erişim yetkisi hemen iptal edilir</li>
              </ul>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              İptal
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser} disabled={isSubmitting}>
              {isSubmitting ? "Siliniyor..." : "Kullanıcıyı Sil"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 