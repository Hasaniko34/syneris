import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, subject, message } = body;

    // Temel doğrulama
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tüm alanların doldurulması zorunludur' },
        { status: 400 }
      );
    }

    // E-posta formatı doğrulama
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi giriniz' },
        { status: 400 }
      );
    }

    // Burada e-posta gönderme, veritabanına kaydetme gibi işlemler yapılabilir
    // Örnek amaçlı sadece başarılı yanıt dönüyoruz

    // YAPILACAK: E-posta gönderme işlemini entegre et
    // YAPILACAK: Veritabanına iletişim mesajını kaydet

    return NextResponse.json(
      { 
        success: true, 
        message: 'Mesajınız başarıyla alındı. En kısa sürede size dönüş yapacağız.' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('İletişim formu hatası:', error);
    return NextResponse.json(
      { error: 'İşlem sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.' },
      { status: 500 }
    );
  }
} 