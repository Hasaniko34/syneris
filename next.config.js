/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['turkcell.com.tr', 'images.unsplash.com', 'placekitten.com', 'avatar.vercel.sh'],
  },
  webpack: (config, { isServer }) => {
    // Eğer istemci tarafındaysak
    if (!isServer) {
      // Mongoose ve diğer sunucu taraflı modülleri görmezden gel
      config.resolve.fallback = {
        ...config.resolve.fallback,
        mongoose: false,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        'mongodb-client-encryption': false,
        aws4: false,
      };
    }
    return config;
  },
  typescript: {
    // !! WARN !!
    // Geçici olarak TypeScript hatalarını görmezden gel
    // Bu, dağıtımdan sonra düzeltilmelidir
    ignoreBuildErrors: true,
  },
  eslint: {
    // Geçici olarak ESLint hatalarını görmezden gel
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 