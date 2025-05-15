import { NextRequest, NextResponse } from 'next/server';
import { generateGeminiEmail } from '@/lib/utils/gemini-ai';

export async function POST(req: NextRequest) {
  try {
    const { subject, context } = await req.json();
    if (!subject || !context) {
      return NextResponse.json({ success: false, message: 'Konu ve açıklama zorunludur.' }, { status: 400 });
    }
    // Gemini AI ile e-posta üret
    const email = await generateGeminiEmail(subject, context);
    return NextResponse.json({ success: true, email });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'E-posta üretilemedi.' }, { status: 500 });
  }
} 