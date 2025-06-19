/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // 根据环境变量决定是否使用静态导出
  output: process.env.BUILD_STATIC === 'true' ? 'export' : 'standalone',
  
  // 静态导出配置
  ...(process.env.BUILD_STATIC === 'true' && {
    trailingSlash: true,
    images: {
      unoptimized: true
    },
    // 禁用不支持静态导出的功能
    experimental: {
      appDir: false
    }
  }),
  
  // 生产环境优化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  
  // 图片域名配置
  images: {
    domains: ['cciemaster.com'],
    ...(process.env.BUILD_STATIC === 'true' && { unoptimized: true })
  },
  
  // 压缩配置
  compress: true,
  
  // 环境变量
  env: {
    CUSTOM_KEY: 'cciemaster',
  },
  
  // 头部安全配置
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // 重定向配置
  async redirects() {
    return [
      // 可以在这里添加URL重定向规则
    ];
  },
  
  // 重写配置（如果需要）
  async rewrites() {
    return [
      // 可以在这里添加URL重写规则
    ];
  },
  
  // 实验性功能
  experimental: {
    // 根据需要启用
  },
};

module.exports = nextConfig; 