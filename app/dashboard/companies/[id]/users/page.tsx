"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, UserPlus, Search, Edit, Trash2, MoreHorizontal, Check, X, Shield } from "lucide-react";
import { motion } from "framer-motion";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import axios from "axios";

// Kullanıcı tipi
interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
  active: boolean;
  createdAt: string;
}

// Şirket tipi
interface Company {
  _id: string;
  name: string;
  domain: string;
  settings: {
    features: {
      maxUsers: number;
    };
    defaultUserRole: string;
    allowedEmailDomains: string[];
  };
}

export default function CompanyUsersPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const companyId = params.id as string;
  const { toast } = useToast();
  
  const [company, setCompany] = useState<Company | null>(null);
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
  
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    password: ""
  });
  
  const [editUser, setEditUser] = useState({
    name: "",
    role: "",
    active: true,
    password: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Şirket bilgileri ve kullanıcıları yükle
  useEffect(() => {
    const fetchCompanyAndUsers = async () => {
      try {
        setLoading(true);
        
        // Şirket bilgilerini getir
        const companyResponse = await axios.get(`/api/companies/${companyId}`);
        setCompany(companyResponse.data.company);
        
        // Kullanıcıları getir
        await fetchUsers();
      } catch (error: any) {
        toast({
          title: "Hata",
          description: error.response?.data?.error || "Şirket bilgileri yüklenirken bir hata oluştu",
          variant: "destructive"
        });
        router.push('/dashboard/companies');
      } finally {
        setLoading(false);
      }
    };

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

    if (companyId) {
      fetchCompanyAndUsers();
    }
  }, [companyId, session, router, toast]);

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
      
      const response = await axios.get(`/api/companies/${companyId}/users?${params.toString()}`);
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

  // Yeni kullanıcı ekleme
  const handleAddUser = async () => {
    try {
      setIsSubmitting(true);

      if (!newUser.name || !newUser.email || !newUser.password) {
        toast({
          title: "Hata",
          description: "Ad, e-posta ve şifre alanları zorunludur",
          variant: "destructive"
        });
        return;
      }

      // E-posta kontrolü
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newUser.email)) {
        toast({
          title: "Hata",
          description: "Geçerli bir e-posta adresi giriniz",
          variant: "destructive"
        });
        return;
      }

      const response = await axios.post(`/api/companies/${companyId}/users`, {
        ...newUser,
        role: newUser.role || company?.settings.defaultUserRole || "user"
      });
      
      // Kullanıcıları yenile
      await fetchUsers(1);
      
      toast({
        title: "Başarılı",
        description: "Kullanıcı başarıyla oluşturuldu"
      });
      
      // Formu temizle
      setNewUser({
        name: "",
        email: "",
        role: "",
        password: ""
      });
      
      setIsAddDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.response?.data?.error || "Kullanıcı oluşturulurken bir hata oluştu",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Kullanıcı düzenleme
  const handleEditUser = async () => {
    if (!selectedUser) return;

    try {
      setIsSubmitting(true);

      // Güncelleme verilerini hazırla
      const updateData: any = {};
      if (editUser.name) updateData.name = editUser.name;
      if (editUser.role) updateData.role = editUser.role;
      if (editUser.password) updateData.password = editUser.password;
      updateData.active = editUser.active;

      await axios.put(`/api/companies/${companyId}/users/${selectedUser._id}`, updateData);
      
      // Kullanıcıları yenile
      await fetchUsers(pagination.page);
      
      toast({
        title: "Başarılı",
        description: "Kullanıcı başarıyla güncellendi"
      });
      
      setIsEditDialogOpen(false);
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
    if (!selectedUser) return;

    try {
      setIsSubmitting(true);
      
      await axios.delete(`/api/companies/${companyId}/users/${selectedUser._id}`);
      
      // Kullanıcıları yenile
      await fetchUsers(pagination.page);
      
      toast({
        title: "Başarılı",
        description: "Kullanıcı başarıyla silindi"
      });
      
      setIsDeleteDialogOpen(false);
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

  // Arama işlevi
  const handleSearch = () => {
    fetchUsers(1);
  };

  // Filtreleme işlevi
  const handleFilterChange = (role: string) => {
    setRoleFilter(role);
    fetchUsers(1);
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
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/companies">
              <ArrowLeft size={16} />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{company?.name} - Kullanıcılar</h1>
            <p className="text-muted-foreground">
              Şirket kullanıcılarını yönet ({pagination.total} kullanıcı / {company?.settings.features.maxUsers} limit)
            </p>
          </div>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus size={16} />
              Yeni Kullanıcı Ekle
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni Kullanıcı Ekle</DialogTitle>
              <DialogDescription>
                {company?.name} şirketine yeni bir kullanıcı ekleyin.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Ad Soyad</Label>
                <Input
                  id="name"
                  placeholder="Ad Soyad"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@{company?.domain}"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                {company?.settings.allowedEmailDomains.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    İzin verilen e-posta domainleri: {company.settings.allowedEmailDomains.join(", ")}
                  </p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="role">Rol</Label>
                <Select
                  value={newUser.role || company?.settings.defaultUserRole || "user"}
                  onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                >
                  <SelectTrigger id="role">
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
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="password">Şifre</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Şifre"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  En az 8 karakter olmalıdır.
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
                onClick={handleAddUser}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Ekleniyor..." : "Kullanıcı Ekle"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Search size={16} className="text-muted-foreground" />
            <Input
              placeholder="Ad veya e-posta ile ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="max-w-sm"
            />
            <Button variant="outline" onClick={handleSearch}>
              Ara
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={roleFilter} onValueChange={handleFilterChange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Tüm Roller" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tüm Roller</SelectItem>
                <SelectItem value="admin">Yönetici</SelectItem>
                <SelectItem value="manager">Şirket Yöneticisi</SelectItem>
                <SelectItem value="trainer">Eğitmen</SelectItem>
                <SelectItem value="user">Kullanıcı</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {users.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center h-40 p-6">
              <User size={36} className="text-muted-foreground mb-2" />
              <p className="text-muted-foreground mb-2">Hiç kullanıcı bulunamadı.</p>
              <Button 
                variant="outline" 
                onClick={() => setIsAddDialogOpen(true)}
              >
                <UserPlus size={16} className="mr-2" />
                Yeni Kullanıcı Ekle
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kullanıcı</TableHead>
                    <TableHead>E-posta</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Kayıt Tarihi</TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
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
            </CardContent>
          </Card>
        )}
        
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
                  Kendi hesabınızı pasif duruma getiremezsiniz.
                </p>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-password">
                Yeni Şifre
                <span className="text-muted-foreground text-xs ml-1">
                  (Boş bırakırsanız değişmez)
                </span>
              </Label>
              <Input
                id="edit-password"
                type="password"
                placeholder="Yeni şifre"
                value={editUser.password}
                onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Şifreyi değiştirmek istemiyorsanız boş bırakın.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditDialogOpen(false)}
              disabled={isSubmitting}
            >
              İptal
            </Button>
            <Button 
              onClick={handleEditUser}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Güncelleniyor..." : "Kaydet"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Kullanıcı Silme Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kullanıcıyı Sil</DialogTitle>
            <DialogDescription>
              <span className="text-destructive font-semibold">{selectedUser?.name}</span> kullanıcısını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz ve kullanıcıya ait tüm veriler silinecektir.
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
              onClick={handleDeleteUser}
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