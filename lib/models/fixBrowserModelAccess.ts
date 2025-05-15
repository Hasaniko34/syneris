/**
 * Tarayıcı ortamı için güvenli model nesnesini oluşturur
 * Bu fonksiyon istemci tarafında model kullanımı sırasında hataları önler
 */
export function createBrowserSafeModel() {
  return {
    findById: () => null,
    findOne: () => null,
    find: () => [],
    findAll: () => [],
    countDocuments: () => 0,
    create: () => null,
    updateOne: () => ({ modifiedCount: 0 }),
    deleteOne: () => ({ deletedCount: 0 }),
    deleteMany: () => ({ deletedCount: 0 }),
    aggregate: () => [],
    populate: () => null,
    exists: () => false
  };
}

/**
 * İstemci tarafında mı çalıştığımızı kontrol eder
 */
export function isClient(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Model oluşturma mantığını sarmalayan yardımcı fonksiyon
 * 
 * @param modelName - Model adı
 * @param schema - Mongoose şeması
 * @param mongoose - Mongoose instance
 * @returns Model nesnesi
 */
export function createSafeModel(modelName: string, schema: any, mongoose: any) {
  if (isClient()) {
    return createBrowserSafeModel();
  }
  
  try {
    return mongoose.models[modelName] || mongoose.model(modelName, schema);
  } catch (error) {
    console.error(`${modelName} modeli oluşturulurken hata:`, error);
    // Hata durumunda yine boş model döndür
    return createBrowserSafeModel();
  }
} 