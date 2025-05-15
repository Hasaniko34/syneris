import { NextRequest, NextResponse } from 'next/server';
import { secureApiRoute, standardApiResponse } from '@/lib/utils/api-security';
import { apiLogger } from '@/lib/utils/api-logger';
import path from 'path';
import fs from 'fs';

// Gün bazında toplam istek sayısını hesapla
function calculateDailyRequestCount(logFile: string): { date: string; count: number }[] {
  try {
    // Log dosyası yoksa boş dizi döndür
    if (!fs.existsSync(logFile)) {
      return [];
    }
    
    // Log dosyasını oku
    const logContent = fs.readFileSync(logFile, 'utf-8');
    const logLines = logContent.split('\n').filter(line => line.trim());
    
    // Günlük istek sayısını hesapla
    const dailyCounts = new Map<string, number>();
    
    for (const line of logLines) {
      try {
        const logEntry = JSON.parse(line);
        if (logEntry.timestamp) {
          const date = logEntry.timestamp.split('T')[0];
          dailyCounts.set(date, (dailyCounts.get(date) || 0) + 1);
        }
      } catch (error) {
        // Geçersiz JSON formatı, bu satırı atla
        continue;
      }
    }
    
    // Map'i dizi formatına dönüştür ve tarihe göre sırala
    return Array.from(dailyCounts.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
      
  } catch (error) {
    console.error('Log analizi hatası:', error);
    return [];
  }
}

// API rotalarına göre kullanım istatistiklerini hesapla
function calculateEndpointUsage(logFile: string): { endpoint: string; count: number; avgResponseTime: number }[] {
  try {
    // Log dosyası yoksa boş dizi döndür
    if (!fs.existsSync(logFile)) {
      return [];
    }
    
    // Log dosyasını oku
    const logContent = fs.readFileSync(logFile, 'utf-8');
    const logLines = logContent.split('\n').filter(line => line.trim());
    
    // Endpoint bazında istek sayısı ve toplam yanıt süresi
    const endpointStats = new Map<string, { count: number; totalResponseTime: number }>();
    
    for (const line of logLines) {
      try {
        const logEntry = JSON.parse(line);
        
        // API_RESPONSE tipindeki ve path bilgisi olan kayıtları kullan
        if (logEntry.type === 'API_RESPONSE' && logEntry.path && logEntry.responseTime) {
          // /api/xyz/123 formatındaki yolları /api/xyz olarak normalize et
          const pathParts = logEntry.path.split('/');
          let endpoint = pathParts.slice(0, 3).join('/');
          
          // İstek sayısı ve toplam yanıt süresini güncelle
          const stats = endpointStats.get(endpoint) || { count: 0, totalResponseTime: 0 };
          stats.count += 1;
          stats.totalResponseTime += logEntry.responseTime;
          endpointStats.set(endpoint, stats);
        }
      } catch (error) {
        // Geçersiz JSON formatı, bu satırı atla
        continue;
      }
    }
    
    // Map'i dizi formatına dönüştür ve kullanım sayısına göre sırala
    return Array.from(endpointStats.entries())
      .map(([endpoint, { count, totalResponseTime }]) => ({
        endpoint,
        count,
        avgResponseTime: Math.round(totalResponseTime / count)
      }))
      .sort((a, b) => b.count - a.count);
      
  } catch (error) {
    console.error('Endpoint analizi hatası:', error);
    return [];
  }
}

// Kullanıcı bazında API kullanımını hesapla
function calculateUserUsage(logFile: string): { userId: string; userRole: string; count: number }[] {
  try {
    // Log dosyası yoksa boş dizi döndür
    if (!fs.existsSync(logFile)) {
      return [];
    }
    
    // Log dosyasını oku
    const logContent = fs.readFileSync(logFile, 'utf-8');
    const logLines = logContent.split('\n').filter(line => line.trim());
    
    // Kullanıcı bazında istek sayısı
    const userStats = new Map<string, { userId: string; userRole: string; count: number }>();
    
    for (const line of logLines) {
      try {
        const logEntry = JSON.parse(line);
        
        if (logEntry.userId) {
          const key = logEntry.userId;
          const userRole = logEntry.userRole || 'unknown';
          
          const stats = userStats.get(key) || { userId: key, userRole, count: 0 };
          stats.count += 1;
          userStats.set(key, stats);
        }
      } catch (error) {
        // Geçersiz JSON formatı, bu satırı atla
        continue;
      }
    }
    
    // Map'i dizi formatına dönüştür ve kullanım sayısına göre sırala
    return Array.from(userStats.values())
      .sort((a, b) => b.count - a.count);
      
  } catch (error) {
    console.error('Kullanıcı analizi hatası:', error);
    return [];
  }
}

// Güvenlik olaylarını analiz et
function analyzeSecurityEvents(logFile: string): { issue: string; count: number; lastOccurred: string }[] {
  try {
    // Log dosyası yoksa boş dizi döndür
    if (!fs.existsSync(logFile)) {
      return [];
    }
    
    // Log dosyasını oku
    const logContent = fs.readFileSync(logFile, 'utf-8');
    const logLines = logContent.split('\n').filter(line => line.trim());
    
    // Güvenlik olayları istatistikleri
    const securityStats = new Map<string, { issue: string; count: number; lastTimestamp: string }>();
    
    for (const line of logLines) {
      try {
        const logEntry = JSON.parse(line);
        
        // SECURITY tipindeki kayıtları kullan
        if (logEntry.type === 'SECURITY' && logEntry.message) {
          const issue = logEntry.message;
          
          const stats = securityStats.get(issue) || { issue, count: 0, lastTimestamp: '' };
          stats.count += 1;
          stats.lastTimestamp = logEntry.timestamp;
          securityStats.set(issue, stats);
        }
      } catch (error) {
        // Geçersiz JSON formatı, bu satırı atla
        continue;
      }
    }
    
    // Map'i dizi formatına dönüştür
    return Array.from(securityStats.values())
      .map(({ issue, count, lastTimestamp }) => ({
        issue,
        count,
        lastOccurred: lastTimestamp
      }))
      .sort((a, b) => b.count - a.count);
      
  } catch (error) {
    console.error('Güvenlik olayları analizi hatası:', error);
    return [];
  }
}

export async function GET(req: NextRequest) {
  return secureApiRoute(req, async (req: NextRequest, authData) => {
    const logDir = process.env.API_LOG_DIR || 'logs';
    const today = new Date().toISOString().split('T')[0];
    const logFile = path.join(logDir, `api-${today}.log`);
    
    // URL parametrelerini al
    const searchParams = new URL(req.url).searchParams;
    const type = searchParams.get('type') || 'daily';
    const days = parseInt(searchParams.get('days') || '7');
    
    // İstek tipine göre analiz yap
    let data: any = {};
    
    if (type === 'daily') {
      data.dailyRequests = calculateDailyRequestCount(logFile);
    } else if (type === 'endpoints') {
      data.endpointUsage = calculateEndpointUsage(logFile);
    } else if (type === 'users') {
      data.userUsage = calculateUserUsage(logFile);
    } else if (type === 'security') {
      data.securityEvents = analyzeSecurityEvents(logFile);
    } else if (type === 'all') {
      data.dailyRequests = calculateDailyRequestCount(logFile);
      data.endpointUsage = calculateEndpointUsage(logFile);
      data.userUsage = calculateUserUsage(logFile);
      data.securityEvents = analyzeSecurityEvents(logFile);
    }
    
    // Genel istatistikler - toplam istek sayısı
    const dailyRequests = calculateDailyRequestCount(logFile);
    data.totalRequests = dailyRequests.reduce((total, day) => total + day.count, 0);
    
    return standardApiResponse(data, {
      message: 'API kullanım istatistikleri başarıyla alındı'
    });
  }, { 
    allowedRoles: ['admin', 'manager'],
    operationName: 'API Kullanım İstatistikleri'
  });
} 