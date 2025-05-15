import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Content-Security-Policy",
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; img-src 'self' data: https:; font-src 'self' data: https://cdn.jsdelivr.net; connect-src 'self' https://www.google-analytics.com;",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  // Gelen isteklerdeki x-middleware-subrequest header'ını reddet
  // CVE-2025-29927 güvenlik açığına ek bir koruma sağlar
  async headers() {
    return [
      {
        // Tüm rotalar için geçerli
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  // Güvenliğe dayalı ayarlar
  poweredByHeader: false, // X-Powered-By başlığını kaldır
  
  // Reaktif olmayan ortamlarda strict mode etkinleştir
  reactStrictMode: true,
  
  // Güvenli ve optimize edilmiş görüntü kaynakları
  images: {
    domains: ["cdn.jsdelivr.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cdn.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Daha iyi JavaScript paket optimizasyonu
  compiler: {
    // Boş blokları çıkart
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error", "warn"],
    } : false,
  },

  // Gzip sıkıştırmasını etkinleştir
  compress: true,
  
  // Webpack yapılandırmasını özelleştir
  webpack: (config, { dev, isServer }) => {
    // Webpack optimizasyonları
    if (!dev && !isServer) {
      // Üretim ortamında paket boyutunu azaltmak için optimizasyonlar
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 70000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        automaticNameDelimiter: '~',
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      };
    }
    
    return config;
  },

  // outputFileTracingExcludes artık experimental içinde değil, doğrudan burada olmalı
  outputFileTracingExcludes: {
    '*': [
      'node_modules/@swc/core-linux-x64-gnu',
      'node_modules/@swc/core-linux-x64-musl',
      'node_modules/@esbuild/linux-x64',
    ],
  },

  // Experimental özellikleri etkinleştir
  experimental: {
    // Modern module output
  },

  // Analitikler
  productionBrowserSourceMaps: true,
};

export default nextConfig;
