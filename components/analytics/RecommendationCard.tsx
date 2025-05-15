import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, BookOpen, Clock, Target } from 'lucide-react';

type Recommendation = {
  id: string;
  text: string;
  importance: 'high' | 'medium' | 'low';
  category: 'content' | 'timing' | 'method';
};

export function RecommendationCard({ recommendation }: { recommendation: Recommendation }) {
  // Önem seviyesine göre stil belirle
  const getImportanceBadge = () => {
    switch (recommendation.importance) {
      case 'high':
        return <Badge className="bg-red-500 hover:bg-red-600">Yüksek Öncelik</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Orta Öncelik</Badge>;
      case 'low':
        return <Badge className="bg-green-500 hover:bg-green-600">Düşük Öncelik</Badge>;
      default:
        return null;
    }
  };
  
  // Kategori tipine göre simge belirle
  const getCategoryIcon = () => {
    switch (recommendation.category) {
      case 'content':
        return <BookOpen className="h-5 w-5 text-blue-500" />;
      case 'timing':
        return <Clock className="h-5 w-5 text-purple-500" />;
      case 'method':
        return <Target className="h-5 w-5 text-green-500" />;
      default:
        return <Lightbulb className="h-5 w-5 text-amber-500" />;
    }
  };
  
  // Kategori tipine göre başlık belirle
  const getCategoryTitle = () => {
    switch (recommendation.category) {
      case 'content':
        return "İçerik Önerisi";
      case 'timing':
        return "Zamanlama Önerisi";
      case 'method':
        return "Yöntem Önerisi";
      default:
        return "Öneri";
    }
  };

  return (
    <Card className="shadow-sm h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {getCategoryIcon()}
            <CardTitle className="text-lg">{getCategoryTitle()}</CardTitle>
          </div>
          {getImportanceBadge()}
        </div>
        <CardDescription>
          ID: {recommendation.id}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{recommendation.text}</p>
      </CardContent>
      <CardFooter className="pt-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Lightbulb className="h-3.5 w-3.5" />
          <span>Kişiselleştirilmiş Öneri</span>
        </div>
      </CardFooter>
    </Card>
  );
}

export function RecommendationList({ recommendations }: { recommendations: Recommendation[] }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Kişiselleştirilmiş Öneriler</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {recommendations.map((recommendation) => (
          <RecommendationCard key={recommendation.id} recommendation={recommendation} />
        ))}
      </div>
    </div>
  );
} 