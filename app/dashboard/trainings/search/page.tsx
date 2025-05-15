'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { 
  Search, BookOpen, Clock, Filter, X, Tag, Star, Calendar, Award, Bookmark 
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Örnek eğitim verileri
const SAMPLE_TRAININGS = Array(20).fill(null).map((_, index) => ({
  id: `training-${index + 1}`,
  title: `${[
    'TEB Bireysel Bankacılık Müşteri İlişkileri Yönetimi', 
    'TEB Dijital Bankacılık Uygulamaları ve Müşteri Deneyimi', 
    'Kurumsal Krediler ve Risk Değerlendirme Süreçleri', 
    'KOBİ Bankacılığı Finansal Analiz Teknikleri', 
    'Dijital Bankacılık Güvenliği ve Dolandırıcılık Önleme',
    'Yatırım Ürünleri ve Portföy Yönetimi',
    'Kredi Tahsis ve İzleme Süreçleri',
    'BDDK ve SPK Mevzuat Uyum Eğitimi',
    'TEB Müşteri Memnuniyeti ve Şikayet Yönetimi',
    'TEB Liderlik ve Yöneticilik Becerileri'
  ][index % 10]}`,
  description: `Bu eğitim, TEB ${['bireysel bankacılık', 'kurumsal bankacılık', 'KOBİ bankacılığı', 'dijital bankacılık', 'yatırım bankacılığı'][index % 5]} departmanında çalışan personelin ${['müşteri ilişkileri', 'risk yönetimi', 'ürün bilgisi', 'mevzuat uyumu', 'dijital yetkinlikler'][index % 5]} konusundaki becerilerini geliştirmek için tasarlanmıştır.`,
  duration: Math.floor(Math.random() * 30) + 10, // 10-40 saat arası
  modules: Math.floor(Math.random() * 10) + 3, // 3-12 modül arası
  progress: Math.floor(Math.random() * 101), // 0-100 arası
  tags: [
    'Bankacılık', 'TEB', 'Finans', 'Müşteri İlişkileri', 'Risk Yönetimi', 
    'Krediler', 'Mevzuat', 'Dijital Bankacılık', 'Yatırım Ürünleri', 'Liderlik'
  ].slice(0, Math.floor(Math.random() * 3) + 2),
  difficulty: ['Başlangıç', 'Orta', 'İleri'][Math.floor(Math.random() * 3)],
  category: ['Bireysel Bankacılık', 'Kurumsal Bankacılık', 'KOBİ Bankacılığı', 'Dijital Bankacılık', 'Yatırım Bankacılığı', 'Risk Yönetimi', 'Mevzuat ve Uyum'][Math.floor(Math.random() * 7)],
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000), // Son 30 gün içinde
  isFeatured: Math.random() > 0.7, // %30 ihtimalle öne çıkan eğitim
  isSaved: Math.random() > 0.5, // %50 ihtimalle kaydedilmiş
  author: ['Ahmet Yılmaz - Eğitim Departmanı', 'Ayşe Demir - İnsan Kaynakları', 'Mehmet Kaya - Ürün Yönetimi', 'Zeynep Şahin - Dijital Bankacılık'][Math.floor(Math.random() * 4)],
  requiredFor: ['Şube Personeli', 'Müşteri İlişkileri Yöneticileri', 'Kredi Tahsis Uzmanları', 'Şube Müdürleri', 'Tüm Personel'][Math.floor(Math.random() * 5)]
}));

// Zorluk seviyesine göre badge rengi belirleme
const getDifficultyBadgeClass = (difficulty: string) => {
  switch (difficulty) {
    case 'Başlangıç':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
    case 'Orta':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
    case 'İleri':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
    default:
      return '';
  }
};

// Kategoriye göre badge rengi belirleme
const getCategoryBadgeClass = (category: string) => {
  switch (category) {
    case 'Bireysel Bankacılık':
      return 'bg-[#005f9e]/10 text-[#005f9e] dark:bg-[#005f9e]/20 dark:text-[#8cd0ff]';
    case 'Kurumsal Bankacılık':
      return 'bg-[#0090c8]/10 text-[#0090c8] dark:bg-[#0090c8]/20 dark:text-[#8cd0ff]';
    case 'KOBİ Bankacılığı':
      return 'bg-[#3fc1c9]/10 text-[#3fc1c9] dark:bg-[#3fc1c9]/20 dark:text-[#8cd0ff]';
    case 'Dijital Bankacılık':
      return 'bg-[#00487a]/10 text-[#00487a] dark:bg-[#00487a]/20 dark:text-[#8cd0ff]';
    case 'Yatırım Bankacılığı':
      return 'bg-[#364f6b]/10 text-[#364f6b] dark:bg-[#364f6b]/20 dark:text-[#8cd0ff]';
    default:
      return '';
  }
};

const SearchTrainingsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Arama ve filtreleme durumları
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [minDuration, setMinDuration] = useState(0);
  const [maxDuration, setMaxDuration] = useState(40);
  const [sortBy, setSortBy] = useState('relevance');
  const [showCompleted, setShowCompleted] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filtrelenmiş eğitimler
  const [filteredTrainings, setFilteredTrainings] = useState(SAMPLE_TRAININGS);

  // Eğitimleri filtrele
  useEffect(() => {
    let filtered = [...SAMPLE_TRAININGS];
    
    // Arama sorgusuna göre filtrele
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        training => 
          training.title.toLowerCase().includes(query) || 
          training.description.toLowerCase().includes(query) ||
          training.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Kategorilere göre filtrele
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(training => 
        selectedCategories.includes(training.category)
      );
    }
    
    // Zorluk seviyelerine göre filtrele
    if (selectedDifficulties.length > 0) {
      filtered = filtered.filter(training => 
        selectedDifficulties.includes(training.difficulty)
      );
    }
    
    // Etiketlere göre filtrele
    if (selectedTags.length > 0) {
      filtered = filtered.filter(training => 
        training.tags.some(tag => selectedTags.includes(tag))
      );
    }
    
    // Süreye göre filtrele
    filtered = filtered.filter(training => 
      training.duration >= minDuration && training.duration <= maxDuration
    );
    
    // Tamamlanmış eğitimleri filtrele
    if (!showCompleted) {
      filtered = filtered.filter(training => training.progress < 100);
    }
    
    // Kaydedilmiş eğitimleri filtrele
    if (showSaved) {
      filtered = filtered.filter(training => training.isSaved);
    }
    
    // Sıralama
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        break;
      case 'duration-asc':
        filtered.sort((a, b) => a.duration - b.duration);
        break;
      case 'duration-desc':
        filtered.sort((a, b) => b.duration - a.duration);
        break;
      case 'progress':
        filtered.sort((a, b) => b.progress - a.progress);
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'relevance':
      default:
        // Öne çıkan eğitimler önce
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }
    
    setFilteredTrainings(filtered);
  }, [searchQuery, selectedCategories, selectedDifficulties, selectedTags, 
      minDuration, maxDuration, sortBy, showCompleted, showSaved]);
  
  // Arama işlemi
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // URL'yi güncelle
    router.push(`/dashboard/trainings/search?q=${encodeURIComponent(searchQuery)}`);
  };
  
  // Kategori seçimi
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  // Zorluk seçimi
  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulties(prev => 
      prev.includes(difficulty)
        ? prev.filter(d => d !== difficulty)
        : [...prev, difficulty]
    );
  };
  
  // Etiket seçimi
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };
  
  // Tüm filtreleri temizle
  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedDifficulties([]);
    setSelectedTags([]);
    setMinDuration(0);
    setMaxDuration(40);
    setSortBy('relevance');
    setShowCompleted(false);
    setShowSaved(false);
    router.push('/dashboard/trainings/search');
  };

  // Tüm etiketler listesi
  const allTags = Array.from(new Set(SAMPLE_TRAININGS.flatMap(t => t.tags))).sort();
  
  // Tüm kategoriler listesi
  const allCategories = Array.from(new Set(SAMPLE_TRAININGS.map(t => t.category))).sort();
  
  // Tüm zorluk seviyeleri
  const allDifficulties = ['Başlangıç', 'Orta', 'İleri'];

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-[#005f9e]">TEB Eğitim Kataloğu</h1>
          <p className="text-muted-foreground">
            TEB bankacılık eğitimlerini keşfedin ve kariyerinizi geliştirin
          </p>
        </div>
        
        {/* Arama ve Filtre Bölümü */}
        <Card className="border-[#005f9e]/20">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Eğitim ara..."
                    className="pl-9 border-[#005f9e]/30 focus-visible:ring-[#005f9e]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit" className="bg-[#005f9e] hover:bg-[#00487a]">Ara</Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="border-[#005f9e]/30 text-[#005f9e] hover:bg-[#005f9e]/10"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtreler
                  {(selectedCategories.length > 0 || selectedDifficulties.length > 0 || 
                    selectedTags.length > 0 || showCompleted || showSaved || 
                    minDuration > 0 || maxDuration < 40) && (
                    <Badge variant="secondary" className="ml-2 bg-[#005f9e]/20 text-[#005f9e]">
                      {selectedCategories.length + selectedDifficulties.length + 
                       selectedTags.length + (showCompleted ? 1 : 0) + 
                       (showSaved ? 1 : 0) + (minDuration > 0 || maxDuration < 40 ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
              </div>
              
              {showFilters && (
                <div className="border rounded-md p-4 mt-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Kategori Filtreleri */}
                  <div className="space-y-3">
                    <div className="font-medium">Kategoriler</div>
                    <div className="space-y-2">
                      {allCategories.map(category => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => toggleCategory(category)}
                          />
                          <Label htmlFor={`category-${category}`}>{category}</Label>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-4" />
                    
                    <div className="font-medium">Zorluk Seviyesi</div>
                    <div className="space-y-2">
                      {allDifficulties.map(difficulty => (
                        <div key={difficulty} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`difficulty-${difficulty}`}
                            checked={selectedDifficulties.includes(difficulty)}
                            onCheckedChange={() => toggleDifficulty(difficulty)}
                          />
                          <Label htmlFor={`difficulty-${difficulty}`}>{difficulty}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Etiket Filtreleri */}
                  <div className="space-y-3">
                    <div className="font-medium">Etiketler</div>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map(tag => (
                        <Badge 
                          key={tag}
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                          {selectedTags.includes(tag) && <X className="ml-1 h-3 w-3" />}
                        </Badge>
                      ))}
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="font-medium">Süre (Saat)</div>
                    <div className="space-y-4">
                      <Slider 
                        min={0} 
                        max={40} 
                        step={1} 
                        value={[minDuration, maxDuration]}
                        onValueChange={([min, max]) => {
                          setMinDuration(min);
                          setMaxDuration(max);
                        }}
                      />
                      <div className="flex justify-between">
                        <span>{minDuration} saat</span>
                        <span>{maxDuration} saat</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Diğer Filtreler */}
                  <div className="space-y-3">
                    <div className="font-medium">Sıralama</div>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sıralama seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevance">İlgi Düzeyi</SelectItem>
                        <SelectItem value="newest">En Yeni</SelectItem>
                        <SelectItem value="oldest">En Eski</SelectItem>
                        <SelectItem value="duration-asc">Süre (Artan)</SelectItem>
                        <SelectItem value="duration-desc">Süre (Azalan)</SelectItem>
                        <SelectItem value="progress">İlerleme Durumu</SelectItem>
                        <SelectItem value="alphabetical">A-Z</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="show-completed"
                          checked={showCompleted}
                          onCheckedChange={(checked) => setShowCompleted(checked === true)}
                        />
                        <Label htmlFor="show-completed">Tamamlanan eğitimleri göster</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="show-saved"
                          checked={showSaved}
                          onCheckedChange={(checked) => setShowSaved(checked === true)}
                        />
                        <Label htmlFor="show-saved">Sadece kaydedilenleri göster</Label>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full"
                        onClick={clearAllFilters}
                      >
                        Tüm Filtreleri Temizle
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
        
        {/* Sonuçlar Bölümü */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {filteredTrainings.length} Eğitim Bulundu
            </h2>
            <div className="text-sm text-muted-foreground">
              {(selectedCategories.length > 0 || selectedDifficulties.length > 0 || 
                selectedTags.length > 0 || showCompleted || showSaved || 
                minDuration > 0 || maxDuration < 40) && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={clearAllFilters}
                >
                  <X className="h-3 w-3 mr-1" />
                  Filtreleri Temizle
                </Button>
              )}
            </div>
          </div>
          
          {/* Eğitim Kartları */}
          <Tabs defaultValue="grid">
            <div className="flex justify-end mb-4">
              <TabsList>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="list">Liste</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="grid" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTrainings.map((training) => (
                  <Card key={training.id} className="overflow-hidden">
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{training.title}</CardTitle>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Bookmark className={`h-4 w-4 ${training.isSaved ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                      <CardDescription className="line-clamp-2">{training.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          <Badge className={getDifficultyBadgeClass(training.difficulty)}>
                            {training.difficulty}
                          </Badge>
                          <Badge className={getCategoryBadgeClass(training.category)}>
                            {training.category}
                          </Badge>
                          {training.isFeatured && (
                            <Badge variant="secondary">
                              <Star className="h-3 w-3 mr-1" /> Öne Çıkan
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{training.duration} Saat</span>
                          <Separator orientation="vertical" className="mx-2 h-4" />
                          <BookOpen className="h-4 w-4 mr-1" />
                          <span>{training.modules} Modül</span>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>İlerleme</span>
                            <span>{training.progress}%</span>
                          </div>
                          <Progress value={training.progress} className="h-2 bg-[#e0f0fa]" indicatorClassName="bg-[#005f9e]" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <div className="text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        {training.createdAt.toLocaleDateString('tr-TR')}
                      </div>
                      <Button size="sm" className="bg-[#005f9e] hover:bg-[#00487a]">Eğitime Git</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="list" className="m-0">
              <div className="space-y-4">
                {filteredTrainings.map((training) => (
                  <Card key={training.id}>
                    <div className="flex flex-col md:flex-row">
                      <div className="p-4 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{training.title}</h3>
                            <p className="text-sm text-muted-foreground">{training.description}</p>
                          </div>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Bookmark className={`h-4 w-4 ${training.isSaved ? 'fill-current' : ''}`} />
                          </Button>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge className={getDifficultyBadgeClass(training.difficulty)}>
                            {training.difficulty}
                          </Badge>
                          <Badge className={getCategoryBadgeClass(training.category)}>
                            {training.category}
                          </Badge>
                          {training.tags.map(tag => (
                            <Badge key={tag} variant="outline">{tag}</Badge>
                          ))}
                          {training.isFeatured && (
                            <Badge variant="secondary">
                              <Star className="h-3 w-3 mr-1" /> Öne Çıkan
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="p-4 border-t md:border-t-0 md:border-l flex flex-col justify-between md:w-64">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" /> Süre:
                            </span>
                            <span>{training.duration} Saat</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center">
                              <BookOpen className="h-4 w-4 mr-1" /> Modüller:
                            </span>
                            <span>{training.modules}</span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>İlerleme:</span>
                              <span>{training.progress}%</span>
                            </div>
                            <Progress value={training.progress} className="h-2 bg-[#e0f0fa]" indicatorClassName="bg-[#005f9e]" />
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 inline mr-1" />
                            {training.createdAt.toLocaleDateString('tr-TR')}
                          </div>
                          <Button size="sm" className="bg-[#005f9e] hover:bg-[#00487a]">Eğitime Git</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SearchTrainingsPage; 