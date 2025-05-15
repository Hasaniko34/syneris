import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';

export async function GET() {
  try {
    // Veritabanına bağlan
    const connection = await connectToDatabase();
    
    // Bağlantı başarılı 
    return NextResponse.json({ 
      success: true, 
      message: 'MongoDB bağlantısı başarılı!',
      database: connection.name
    }, { status: 200 });
  } catch (error) {
    console.error('Veritabanı bağlantı hatası:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'MongoDB bağlantısı başarısız!',
      error: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
} 