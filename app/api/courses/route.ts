import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Course, { ICourse } from '@/models/Course';
import { secureApiRoute, standardApiResponse, apiErrorResponse } from '@/lib/utils/api-security';

// Kursları listele
export async function GET(request: NextRequest) {
  return secureApiRoute(request, async (req: NextRequest) => {
    await connectToDatabase();
    
    // URL parametrelerini al
    const searchParams = req.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;
    const category = searchParams.get('category');
    const level = searchParams.get('level');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured') === 'true';
    
    // Filtreleme
    const query: any = {};
    if (category) query.category = { $in: [category] };
    if (level) query.level = level;
    if (featured) query.isFeatured = true;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    
    // Sadece yayınlanmış kursları göster
    query.isPublished = true;
    
    // Kursları say ve getir
    const total = await Course.countDocuments(query);
    const courses = await Course.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('instructor', 'name avatar')
      .lean();
    
    return standardApiResponse({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      courses
    }, { 
      message: 'Kurslar başarıyla listelendi'
    });
  }, { skipRoleCheck: true }); // Kurs listesi herkes tarafından görüntülenebilir
}

// Yeni kurs oluştur
export async function POST(request: NextRequest) {
  return secureApiRoute(request, async (req: NextRequest, authData) => {
    await connectToDatabase();
    
    // İstek gövdesini al
    const body = await req.json();
    
    // Gerekli alanları kontrol et
    if (!body.title || !body.description || !body.instructor) {
      return standardApiResponse(null, { 
        status: 400,
        success: false, 
        message: 'Başlık, açıklama ve eğitmen alanları gereklidir'
      });
    }
    
    // Kullanıcının kurs ekleyebilme yetkisini kontrol et
    // Eğitmen kendi ID'sini kullanabilir, admin/manager başkalarının ID'sini kullanabilir
    const session = authData.session;
    const isInstructorValid = body.instructor === session.user.id || 
                             ['admin', 'manager', 'trainer'].includes(session.user.role);
    
    if (!isInstructorValid) {
      return standardApiResponse(null, {
        status: 403,
        success: false,
        message: 'Başka bir eğitmen adına kurs ekleyemezsiniz'
      });
    }
    
    // Yeni kurs oluştur
    const newCourse = new Course({
      title: body.title,
      description: body.description,
      shortDescription: body.shortDescription || body.title,
      category: body.category || ['Genel'],
      level: body.level || 'Başlangıç',
      image: body.image || '/images/courses/default.webp',
      instructor: body.instructor,
      duration: body.duration || 0,
      language: body.language || 'Türkçe',
      sections: body.sections || [],
      quizzes: body.quizzes || [],
      students: [],
      requirements: body.requirements || [],
      objectives: body.objectives || [],
      price: body.price || 0,
      isPublished: body.isPublished || false,
      isFeatured: body.isFeatured || false,
      createdBy: session.user.id, // Güvenli bir şekilde oluşturan kişiyi kaydediyoruz
    });
    
    // Veritabanına kaydet
    await newCourse.save();
    
    return standardApiResponse(newCourse, {
      status: 201,
      message: 'Kurs başarıyla oluşturuldu'
    });
  }, { allowedRoles: ['admin', 'manager', 'trainer'] }); // Sadece admin, manager ve trainer rol ekleyebilir
} 