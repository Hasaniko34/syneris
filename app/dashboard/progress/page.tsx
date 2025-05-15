'use client';

import React, { useState } from 'react';
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  BarChart, Activity, Award, BookOpen, Calendar, 
  CheckSquare, Clock, Trophy, TrendingUp, Users, Tag 
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Örnek veri 
const userData = {
  name: "Hasan Taşdemir",
  email: "hasan@example.com",
  avatarUrl: "/avatars/user.png",
  role: "Yazılım Geliştirici",
  joinedAt: new Date('2023-09-15'),
  stats: {
    completedCourses: 8,
    inProgressCourses: 3,
    totalHoursLearned: 47,
    completionRate: 72,
    certificatesEarned: 5,
    badgesEarned: 12,
    streakDays: 15,
    pointsEarned: 2450,
    rank: 'Uzman',
    nextRank: 'Usta',
    nextRankPoints: 3000
  },
  achievements: [
    { id: '1', name: 'Düzenli Öğrenen', icon: '🔄', awardedAt: new Date('2023-10-10'), description: '7 gün boyunca her gün öğrenme' },
    { id: '2', name: 'JavaScript Uzmanı', icon: '📜', awardedAt: new Date('2023-11-05'), description: 'Tüm JavaScript eğitimlerini tamamlama' },
    { id: '3', name: 'Hızlı Öğrenen', icon: '⚡', awardedAt: new Date('2023-11-20'), description: 'Bir kursu 3 günden kısa sürede tamamlama' },
    { id: '4', name: 'Test Ustası', icon: '🧪', awardedAt: new Date('2023-12-01'), description: 'Tüm test modüllerinde %90+ başarı sağlama' },
    { id: '5', name: 'İşbirlikçi', icon: '🤝', awardedAt: new Date('2023-12-15'), description: '10 yorum yapma' }
  ],
  recentActivities: [
    { id: '1', type: 'course_completed', title: 'React Hooks Eğitimi', date: new Date('2023-12-25'), points: 150 },
    { id: '2', type: 'badge_earned', title: 'Frontend Geliştirici Rozeti', date: new Date('2023-12-22'), points: 100 },
    { id: '3', type: 'quiz_completed', title: 'TypeScript Test', date: new Date('2023-12-20'), points: 50, score: 85 },
    { id: '4', type: 'course_started', title: 'Next.js Temelleri', date: new Date('2023-12-18'), points: 10 },
    { id: '5', type: 'certificate_earned', title: 'JavaScript Sertifikası', date: new Date('2023-12-15'), points: 200 }
  ],
  skills: [
    { name: 'JavaScript', level: 82 },
    { name: 'React', level: 75 },
    { name: 'TypeScript', level: 68 },
    { name: 'HTML/CSS', level: 90 },
    { name: 'Node.js', level: 60 },
    { name: 'Git', level: 85 }
  ],
  recommendations: [
    { id: '1', title: 'CSS Grid ve Flexbox Eğitimi', match: 95, tags: ['Frontend', 'CSS'] },
    { id: '2', title: 'React Context API Eğitimi', match: 90, tags: ['React', 'Frontend'] },
    { id: '3', title: 'Node.js Performans Optimizasyonu', match: 85, tags: ['Backend', 'Node.js'] }
  ]
};

// İstatistik kart bileşeni
const StatCard = ({ title, value, icon, description, trend = null }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <div className="flex items-baseline gap-1">
            <h4 className="text-2xl font-bold">{value}</h4>
            {trend && (
              <span className={`text-sm ${trend > 0 ? 'text-green-500' : trend < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                {trend > 0 ? '+' : ''}{trend}%
              </span>
            )}
          </div>
          {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        </div>
        <div className="bg-primary/10 p-2 rounded-full">
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

// Etkinlik öğe bileşeni
const ActivityItem = ({ activity }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'course_completed':
        return <CheckSquare className="h-4 w-4 text-green-500" />;
      case 'badge_earned':
        return <Award className="h-4 w-4 text-purple-500" />;
      case 'quiz_completed':
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      case 'course_started':
        return <Activity className="h-4 w-4 text-orange-500" />;
      case 'certificate_earned':
        return <Trophy className="h-4 w-4 text-yellow-500" />;
      default:
        return <Calendar className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="flex items-start gap-4 py-3">
      <div className="bg-muted rounded-full p-2">
        {getActivityIcon(activity.type)}
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <h4 className="font-medium">{activity.title}</h4>
          <span className="text-sm text-muted-foreground">
            {activity.date.toLocaleDateString('tr-TR')}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {activity.type === 'course_completed' && 'Eğitimi tamamladınız'}
          {activity.type === 'badge_earned' && 'Yeni bir rozet kazandınız'}
          {activity.type === 'quiz_completed' && `Testi %${activity.score} başarıyla tamamladınız`}
          {activity.type === 'course_started' && 'Eğitime başladınız'}
          {activity.type === 'certificate_earned' && 'Sertifika kazandınız'}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            +{activity.points} puan
          </Badge>
        </div>
      </div>
    </div>
  );
};

// Başarı bileşeni
const AchievementItem = ({ achievement }) => (
  <Card className="h-full">
    <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
      <div className="text-4xl mb-3">{achievement.icon}</div>
      <h4 className="font-medium">{achievement.name}</h4>
      <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
      <Badge variant="outline" className="mt-3 text-xs">
        {achievement.awardedAt.toLocaleDateString('tr-TR')}
      </Badge>
    </CardContent>
  </Card>
);

// Beceri bileşeni
const SkillItem = ({ skill }) => (
  <div className="space-y-2">
    <div className="flex justify-between">
      <h4 className="text-sm font-medium">{skill.name}</h4>
      <span className="text-sm">{skill.level}%</span>
    </div>
    <Progress value={skill.level} className="h-2" />
  </div>
);

// Önerilen kurs bileşeni
const RecommendedCourse = ({ course, onViewCourse }) => (
  <Card className="h-full">
    <CardHeader className="p-5 pb-0">
      <div className="flex justify-between items-start">
        <CardTitle className="text-base">{course.title}</CardTitle>
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
          %{course.match} Eşleşme
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="p-5">
      <div className="flex flex-wrap gap-2">
        {course.tags.map((tag, index) => (
          <Badge key={index} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
    </CardContent>
    <CardFooter className="p-5 pt-0 justify-end">
      <Button size="sm" onClick={() => onViewCourse(course.id)}>
        Eğitimi Görüntüle
      </Button>
    </CardFooter>
  </Card>
);

const ProgressDashboardPage = () => {
  const router = useRouter();
  const [period, setPeriod] = useState('all');
  
  // Kurs detayına git
  const handleViewCourse = (courseId) => {
    router.push(`/dashboard/trainings/${courseId}`);
  };
  
  // İlerleme puanı yüzdesi hesapla
  const progressPercentage = (userData.stats.pointsEarned / userData.stats.nextRankPoints) * 100;
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-6">
        {/* Üst kart - Kullanıcı Profili ve İlerleme */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Kullanıcı Bilgileri */}
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={userData.avatarUrl} alt={userData.name} />
                  <AvatarFallback>{userData.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">{userData.name}</h1>
                  <p className="text-muted-foreground">{userData.role}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{userData.stats.rank}</Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Trophy className="h-3 w-3" /> {userData.stats.pointsEarned} Puan
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {userData.stats.streakDays} Gün Serisi
                    </Badge>
                  </div>
                </div>
              </div>
              
              {/* İlerleme Çubuğu */}
              <div className="w-full md:w-1/3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{userData.stats.rank}</span>
                  <span>{userData.stats.nextRank}</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <p className="text-xs text-muted-foreground text-center">
                  Bir sonraki seviyeye {userData.stats.nextRankPoints - userData.stats.pointsEarned} puan kaldı
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Tamamlanan Eğitimler" 
            value={userData.stats.completedCourses}
            icon={<CheckSquare className="h-5 w-5 text-green-500" />}
            trend={15}
          />
          <StatCard 
            title="Öğrenilen Toplam Saat" 
            value={`${userData.stats.totalHoursLearned}`}
            icon={<Clock className="h-5 w-5 text-blue-500" />}
            description="Son 30 günde"
            trend={5}
          />
          <StatCard 
            title="Tamamlama Oranı" 
            value={`%${userData.stats.completionRate}`}
            icon={<Activity className="h-5 w-5 text-purple-500" />}
            trend={8}
          />
          <StatCard 
            title="Kazanılan Sertifikalar" 
            value={userData.stats.certificatesEarned}
            icon={<Award className="h-5 w-5 text-amber-500" />}
            trend={0}
          />
        </div>
        
        {/* Ana İçerik Bölümü */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sol kolon - İlerleme ve Başarılar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sekmeler */}
            <Tabs defaultValue="progress">
              <TabsList className="mb-4">
                <TabsTrigger value="progress">İlerleme</TabsTrigger>
                <TabsTrigger value="skills">Beceriler</TabsTrigger>
                <TabsTrigger value="achievements">Başarılar</TabsTrigger>
              </TabsList>
              
              {/* İlerleme Sekmesi */}
              <TabsContent value="progress" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>İlerleme Durumu</CardTitle>
                    <CardDescription>
                      Eğitim ilerleme durumunuz ve tamamlama oranlarınız
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {/* Devam Eden Eğitimler */}
                      <div>
                        <h3 className="text-lg font-medium mb-4">Devam Eden Eğitimler</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="font-medium">React Hooks Eğitimi</span>
                              <span>%75</span>
                            </div>
                            <Progress value={75} className="h-2" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>6/8 modül tamamlandı</span>
                              <span>Tahmini bitiş: 2 gün</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="font-medium">TypeScript İleri Seviye</span>
                              <span>%40</span>
                            </div>
                            <Progress value={40} className="h-2" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>4/10 modül tamamlandı</span>
                              <span>Tahmini bitiş: 1 hafta</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="font-medium">Git ve GitHub Eğitimi</span>
                              <span>%20</span>
                            </div>
                            <Progress value={20} className="h-2" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>1/5 modül tamamlandı</span>
                              <span>Tahmini bitiş: 10 gün</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Tamamlanan Son Eğitimler */}
                      <div>
                        <h3 className="text-lg font-medium mb-4">Tamamlanan Son Eğitimler</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">JavaScript ES6+ Özellikleri</h4>
                              <p className="text-sm text-muted-foreground">12 saat ∙ 8 modül</p>
                            </div>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                              Tamamlandı
                            </Badge>
                          </div>
                          
                          <Separator />
                          
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">CSS Grid ve Flexbox</h4>
                              <p className="text-sm text-muted-foreground">8 saat ∙ 6 modül</p>
                            </div>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                              Tamamlandı
                            </Badge>
                          </div>
                          
                          <Separator />
                          
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">React Component Patterns</h4>
                              <p className="text-sm text-muted-foreground">10 saat ∙ 7 modül</p>
                            </div>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                              Tamamlandı
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="mt-4 text-center">
                          <Link href="/dashboard/trainings/completed">
                            <Button variant="outline" size="sm">
                              Tüm Tamamlanan Eğitimleri Görüntüle
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Öğrenme İstatistikleri */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Öğrenme İstatistikleri</CardTitle>
                        <CardDescription>
                          Öğrenme alışkanlıklarınız ve ilerleme grafiğiniz
                        </CardDescription>
                      </div>
                      <div>
                        <select 
                          className="p-2 text-sm border rounded-md"
                          value={period}
                          onChange={(e) => setPeriod(e.target.value)}
                        >
                          <option value="week">Bu Hafta</option>
                          <option value="month">Bu Ay</option>
                          <option value="year">Bu Yıl</option>
                          <option value="all">Tüm Zamanlar</option>
                        </select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="h-48 flex items-center justify-center bg-muted/20 rounded-md">
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <BarChart className="h-10 w-10" />
                          <p>Öğrenme aktivite grafiği burada görüntülenecek</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-muted/20 p-4 rounded-md">
                          <h4 className="text-sm font-medium mb-1">Toplam Öğrenme Süresi</h4>
                          <p className="text-2xl font-bold">{userData.stats.totalHoursLearned} saat</p>
                        </div>
                        <div className="bg-muted/20 p-4 rounded-md">
                          <h4 className="text-sm font-medium mb-1">Günlük Ortalama</h4>
                          <p className="text-2xl font-bold">1.2 saat</p>
                        </div>
                        <div className="bg-muted/20 p-4 rounded-md">
                          <h4 className="text-sm font-medium mb-1">En Verimli Gün</h4>
                          <p className="text-2xl font-bold">Çarşamba</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Beceriler Sekmesi */}
              <TabsContent value="skills" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Beceri Haritanız</CardTitle>
                    <CardDescription>
                      Eğitimlerde gösterdiğiniz performansa göre beceri seviyeleriniz
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {userData.skills.map((skill, index) => (
                        <React.Fragment key={index}>
                          <SkillItem skill={skill} />
                          {index < userData.skills.length - 1 && <Separator />}
                        </React.Fragment>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="justify-between">
                    <p className="text-sm text-muted-foreground">
                      Becerilerinizi eğitimler ve testlerdeki başarınıza göre güncelliyoruz
                    </p>
                    <Link href="/dashboard/trainings/search">
                      <Button variant="outline" size="sm">
                        Becerilerimi Geliştir
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Beceri Önerileri</CardTitle>
                    <CardDescription>
                      Kariyer hedeflerinize ulaşmak için geliştirmenizi önerdiğimiz beceriler
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-md p-4">
                        <h4 className="font-medium mb-2">Next.js</h4>
                        <p className="text-sm text-muted-foreground">
                          React becerilerinizi Next.js ile genişleterek full-stack yeteneklerinizi geliştirebilirsiniz.
                        </p>
                        <Button size="sm" className="mt-4" onClick={() => handleViewCourse('nextjs-101')}>
                          İlgili Eğitimleri Gör
                        </Button>
                      </div>
                      
                      <div className="border rounded-md p-4">
                        <h4 className="font-medium mb-2">MongoDB</h4>
                        <p className="text-sm text-muted-foreground">
                          Backend bilgilerinizi NoSQL veritabanları ile tamamlayarak daha kapsamlı projeler geliştirebilirsiniz.
                        </p>
                        <Button size="sm" className="mt-4" onClick={() => handleViewCourse('mongodb-101')}>
                          İlgili Eğitimleri Gör
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Başarılar Sekmesi */}
              <TabsContent value="achievements" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Kazanılan Başarılar</CardTitle>
                    <CardDescription>
                      Eğitim yolculuğunuzda elde ettiğiniz başarılar ve rozetler
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {userData.achievements.map(achievement => (
                        <AchievementItem key={achievement.id} achievement={achievement} />
                      ))}
                      
                      <Card className="h-full border-dashed">
                        <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                          <div className="text-4xl mb-3 text-muted-foreground">🔒</div>
                          <h4 className="font-medium">İleri Seviye</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            5 eğitimi daha tamamladığınızda açılacak
                          </p>
                          <Progress value={60} className="mt-3 h-2 w-3/4" />
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Link href="/dashboard/achievements">
                      <Button variant="outline" size="sm">
                        Tüm Başarıları Görüntüle
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Sıradaki Hedefler</CardTitle>
                    <CardDescription>
                      Bu hedefleri tamamlayarak yeni başarılar elde edebilirsiniz
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="bg-muted p-2 rounded-full">
                            <TrendingUp className="h-5 w-5 text-orange-500" />
                          </div>
                          <div>
                            <h4 className="font-medium">Öğrenme Serisi</h4>
                            <p className="text-sm text-muted-foreground">30 gün boyunca her gün en az 15 dakika öğrenin</p>
                          </div>
                        </div>
                        <Progress value={50} className="w-20 h-2" />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="bg-muted p-2 rounded-full">
                            <Users className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <h4 className="font-medium">Sosyal Öğrenen</h4>
                            <p className="text-sm text-muted-foreground">En az 5 tartışmaya katılın ve yorum yapın</p>
                          </div>
                        </div>
                        <Progress value={20} className="w-20 h-2" />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="bg-muted p-2 rounded-full">
                            <Trophy className="h-5 w-5 text-amber-500" />
                          </div>
                          <div>
                            <h4 className="font-medium">Full-Stack Ustası</h4>
                            <p className="text-sm text-muted-foreground">Hem frontend hem backend eğitimlerini tamamlayın</p>
                          </div>
                        </div>
                        <Progress value={35} className="w-20 h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sağ kolon - Aktiviteler ve Öneriler */}
          <div className="space-y-6">
            {/* Son Aktiviteler */}
            <Card>
              <CardHeader>
                <CardTitle>Son Aktiviteler</CardTitle>
                <CardDescription>
                  Eğitim platformundaki son aktiviteleriniz
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {userData.recentActivities.map((activity, index) => (
                    <React.Fragment key={activity.id}>
                      <ActivityItem activity={activity} />
                      {index < userData.recentActivities.length - 1 && <Separator />}
                    </React.Fragment>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Link href="/dashboard/activities">
                  <Button variant="outline" size="sm">
                    Tüm Aktiviteleri Görüntüle
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            {/* Önerilen Eğitimler */}
            <Card>
              <CardHeader>
                <CardTitle>Size Özel Öneriler</CardTitle>
                <CardDescription>
                  Becerilerinize ve öğrenme hedeflerinize göre önerilen eğitimler
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.recommendations.map(course => (
                    <RecommendedCourse 
                      key={course.id} 
                      course={course} 
                      onViewCourse={handleViewCourse} 
                    />
                  ))}
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Link href="/dashboard/trainings/search">
                  <Button variant="outline" size="sm">
                    Tüm Eğitimlere Göz At
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            {/* İstatistik Özeti */}
            <Card>
              <CardHeader>
                <CardTitle>Öğrenme Özeti</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/20 p-3 rounded-md text-center">
                    <h4 className="text-sm font-medium mb-1">Bu Haftaki Öğrenme</h4>
                    <p className="text-xl font-bold">4.5 saat</p>
                  </div>
                  <div className="bg-muted/20 p-3 rounded-md text-center">
                    <h4 className="text-sm font-medium mb-1">Tamamlanan Modüller</h4>
                    <p className="text-xl font-bold">12</p>
                  </div>
                  <div className="bg-muted/20 p-3 rounded-md text-center">
                    <h4 className="text-sm font-medium mb-1">Başarı Oranı</h4>
                    <p className="text-xl font-bold">%92</p>
                  </div>
                  <div className="bg-muted/20 p-3 rounded-md text-center">
                    <h4 className="text-sm font-medium mb-1">Aktif Günler</h4>
                    <p className="text-xl font-bold">15</p>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Öğrenme Dağılımı</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                      <div className="flex h-full">
                        <div className="bg-blue-500 h-full" style={{ width: '40%' }}></div>
                        <div className="bg-green-500 h-full" style={{ width: '25%' }}></div>
                        <div className="bg-amber-500 h-full" style={{ width: '20%' }}></div>
                        <div className="bg-purple-500 h-full" style={{ width: '15%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 bg-blue-500 rounded-full inline-block"></span> Frontend
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 bg-green-500 rounded-full inline-block"></span> Backend
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 bg-amber-500 rounded-full inline-block"></span> DevOps
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 bg-purple-500 rounded-full inline-block"></span> Diğer
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboardPage; 