"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { AnalyticsData } from '@/lib/services/analytics';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// Çubuk Grafik bileşeni
export function TopicBarChart({ data, title, description }: { 
  data: { topic: string; score: number }[]; 
  title: string;
  description?: string;
}) {
  // Verileri yüzdelik olarak formatla
  const formattedData = data.map(item => ({
    ...item,
    score: Math.round(item.score * 100)
  }));

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={formattedData}
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="topic" type="category" width={100} />
              <Tooltip 
                formatter={(value: number) => [`${value}%`, 'Puan']}
                contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
              />
              <Bar dataKey="score" fill="var(--primary)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// Pasta Grafik bileşeni
export function ActivityPieChart({ data, title, description }: {
  data: Record<string, number>;
  title: string;
  description?: string;
}) {
  // Formatlanmış veri yapısını oluştur
  const formattedData = Object.entries(data).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-64 flex flex-col items-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={formattedData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {formattedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [value, 'Saat']}
                contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// Trend Grafik bileşeni
export function TrendLineChart({ data, title, description }: {
  data: { name: string; value: number }[];
  title: string;
  description?: string;
}) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
              />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="var(--primary)" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// Analiz Dashboard bileşeni
export function AnalyticsDashboard({ analyticsData, timeRangeTitle }: {
  analyticsData: AnalyticsData;
  timeRangeTitle: string;
}) {
  // Zaman içinde ilerleme verisi
  const progressTrendData = [
    { name: 'Önceki Dönem', value: analyticsData.progress.previousMonth },
    { name: 'Şimdiki Dönem', value: analyticsData.progress.currentMonth }
  ];

  // Haftalık çalışma günleri verisi
  const weekdayData = Object.entries(analyticsData.learningPatterns.daysOfWeek).map(
    ([name, value]) => ({ name, value })
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TopicBarChart 
        data={analyticsData.topicAnalysis.strengths} 
        title="Güçlü Olduğunuz Konular" 
        description={`${timeRangeTitle} içindeki en yüksek skorlarınız`}
      />
      
      <TopicBarChart 
        data={analyticsData.topicAnalysis.weaknesses} 
        title="Geliştirilebilir Konular" 
        description={`${timeRangeTitle} içinde odaklanmanız gereken alanlar`}
      />
      
      <ActivityPieChart 
        data={analyticsData.learningPatterns.timeOfDay} 
        title="Günün En Verimli Saatleri" 
        description="Çalışma saatlerinizin dağılımı"
      />
      
      <TrendLineChart 
        data={weekdayData} 
        title="Haftalık Çalışma Dağılımı" 
        description="Haftanın günlerine göre çalışma süreniz (saat)"
      />
      
      <TrendLineChart 
        data={progressTrendData} 
        title={`İlerleme Trendi (${timeRangeTitle})`} 
        description="Dönemsel öğrenme performansınız"
      />
    </div>
  );
} 