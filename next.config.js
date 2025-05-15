/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['placehold.co'],
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
}

module.exports = nextConfig 