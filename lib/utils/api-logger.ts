import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

// Log seviyeleri
export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

// Log kayıt tipi
export enum LogType {
  API_REQUEST = 'API_REQUEST',
  API_RESPONSE = 'API_RESPONSE',
  AUTH = 'AUTH',
  ERROR = 'ERROR',
  SECURITY = 'SECURITY',
  PERFORMANCE = 'PERFORMANCE'
}

// Log kaydı arayüzü
interface LogEntry {
  timestamp: string;
  level: LogLevel;
  type: LogType;
  message: string;
  method?: string;
  path?: string;
  userId?: string;
  userRole?: string;
  ip?: string;
  userAgent?: string;
  requestId?: string;
  responseTime?: number;
  statusCode?: number;
  details?: any;
}

/**
 * API Loglama sınıfı
 * API isteklerini ve yanıtlarını loglamak için kullanılır
 */
class ApiLogger {
  private logDir: string;
  private logFile: string;
  private isProduction: boolean;
  private isEnabled: boolean;
  private useConsole: boolean;
  private useFile: boolean;

  constructor() {
    this.isProduction = process.env.NODE_ENV === 'production';
    this.isEnabled = process.env.API_LOGGING !== 'false';
    this.useConsole = process.env.API_LOG_CONSOLE !== 'false';
    this.useFile = this.isProduction || process.env.API_LOG_FILE === 'true';
    
    // Log dizini ve dosyasını ayarla
    this.logDir = process.env.API_LOG_DIR || 'logs';
    this.logFile = path.join(this.logDir, `api-${new Date().toISOString().split('T')[0]}.log`);
    
    // Log dizinini oluştur (yoksa)
    if (this.useFile && !fs.existsSync(this.logDir)) {
      try {
        fs.mkdirSync(this.logDir, { recursive: true });
      } catch (error) {
        console.error('Log dizini oluşturulamadı:', error);
        this.useFile = false;
      }
    }
  }

  /**
   * Log kaydı oluştur
   */
  private log(logEntry: LogEntry): void {
    if (!this.isEnabled) return;

    const formattedEntry = JSON.stringify({
      ...logEntry,
      timestamp: logEntry.timestamp || new Date().toISOString()
    });

    // Konsola yazdır
    if (this.useConsole) {
      const colorMap = {
        [LogLevel.DEBUG]: '\x1b[36m', // Cyan
        [LogLevel.INFO]: '\x1b[32m',  // Green
        [LogLevel.WARN]: '\x1b[33m',  // Yellow
        [LogLevel.ERROR]: '\x1b[31m', // Red
      };
      
      const reset = '\x1b[0m';
      const color = colorMap[logEntry.level] || '';
      
      console.log(`${color}[${logEntry.timestamp}] [${logEntry.level}] [${logEntry.type}] ${logEntry.message}${reset}`);
      
      if (logEntry.details && Object.keys(logEntry.details).length > 0) {
        console.log(logEntry.details);
      }
    }

    // Dosyaya yazdır
    if (this.useFile) {
      try {
        fs.appendFileSync(this.logFile, formattedEntry + '\n');
      } catch (error) {
        console.error('Log dosyasına yazılamadı:', error);
      }
    }
  }

  /**
   * İstek bilgilerini al
   */
  private getRequestInfo(req: NextRequest, userId?: string, userRole?: string): Partial<LogEntry> {
    const headers = req.headers;
    return {
      method: req.method,
      path: req.nextUrl.pathname,
      userId,
      userRole,
      ip: req.ip || headers.get('x-forwarded-for') || headers.get('x-real-ip') || 'unknown',
      userAgent: headers.get('user-agent') || 'unknown',
      requestId: headers.get('x-request-id') || crypto.randomUUID()
    };
  }

  /**
   * API isteğini logla
   */
  logRequest(req: NextRequest, userId?: string, userRole?: string, message?: string): string {
    const requestInfo = this.getRequestInfo(req, userId, userRole);
    const requestId = requestInfo.requestId as string;
    
    this.log({
      timestamp: new Date().toISOString(),
      level: LogLevel.INFO,
      type: LogType.API_REQUEST,
      message: message || `API İstek: ${req.method} ${req.nextUrl.pathname}`,
      ...requestInfo
    });
    
    return requestId;
  }

  /**
   * API yanıtını logla
   */
  logResponse(
    req: NextRequest, 
    statusCode: number, 
    responseTime: number, 
    requestId: string, 
    userId?: string, 
    userRole?: string
  ): void {
    const requestInfo = this.getRequestInfo(req, userId, userRole);
    
    const level = statusCode >= 400 
      ? (statusCode >= 500 ? LogLevel.ERROR : LogLevel.WARN)
      : LogLevel.INFO;
    
    this.log({
      timestamp: new Date().toISOString(),
      level,
      type: LogType.API_RESPONSE,
      message: `API Yanıt: ${req.method} ${req.nextUrl.pathname} - ${statusCode} (${responseTime}ms)`,
      statusCode,
      responseTime,
      requestId,
      ...requestInfo
    });
  }

  /**
   * Performans metriklerini logla
   */
  logPerformance(req: NextRequest, operation: string, duration: number): void {
    this.log({
      timestamp: new Date().toISOString(),
      level: duration > 1000 ? LogLevel.WARN : LogLevel.DEBUG,
      type: LogType.PERFORMANCE,
      message: `Performans: ${operation} - ${duration}ms`,
      path: req.nextUrl.pathname,
      method: req.method,
      responseTime: duration
    });
  }

  /**
   * Yetkilendirme işlemlerini logla
   */
  logAuth(
    req: NextRequest, 
    success: boolean, 
    userId?: string, 
    userRole?: string, 
    details?: any
  ): void {
    const requestInfo = this.getRequestInfo(req, userId, userRole);
    
    this.log({
      timestamp: new Date().toISOString(),
      level: success ? LogLevel.INFO : LogLevel.WARN,
      type: LogType.AUTH,
      message: `Yetkilendirme ${success ? 'başarılı' : 'başarısız'}: ${req.method} ${req.nextUrl.pathname}`,
      details,
      ...requestInfo
    });
  }

  /**
   * Güvenlik olaylarını logla
   */
  logSecurity(
    req: NextRequest, 
    issue: string, 
    details?: any
  ): void {
    const requestInfo = this.getRequestInfo(req);
    
    this.log({
      timestamp: new Date().toISOString(),
      level: LogLevel.WARN,
      type: LogType.SECURITY,
      message: `Güvenlik: ${issue} - ${req.method} ${req.nextUrl.pathname}`,
      details,
      ...requestInfo
    });
  }

  /**
   * Hataları logla
   */
  logError(
    req: NextRequest, 
    error: any, 
    userId?: string, 
    userRole?: string
  ): void {
    const requestInfo = this.getRequestInfo(req, userId, userRole);
    
    this.log({
      timestamp: new Date().toISOString(),
      level: LogLevel.ERROR,
      type: LogType.ERROR,
      message: `Hata: ${error.message || 'Bilinmeyen hata'} - ${req.method} ${req.nextUrl.pathname}`,
      details: {
        error: this.isProduction ? error.message : error.stack || error.message,
        ...requestInfo
      },
      ...requestInfo
    });
  }
}

// Singleton loglayıcı örneği 
export const apiLogger = new ApiLogger();

// API isteği performans ölçümü için yardımcı fonksiyon
export function measurePerformance<T>(
  req: NextRequest, 
  operation: string, 
  fn: () => Promise<T>
): Promise<T> {
  const startTime = performance.now();
  
  return fn().finally(() => {
    const duration = Math.round(performance.now() - startTime);
    apiLogger.logPerformance(req, operation, duration);
  });
} 