/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // 强制静态导出
  output: 'export',
  
  // 静态导出配置
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  // 图片优化配置（静态导出不支持Next.js图片优化）
  images: {
    unoptimized: true
  },
  
  // 生产环境优化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  
  // 压缩配置
  compress: true,
  
  // 环境变量
  env: {
    SITE_NAME: 'CCIE培训中心',
    SITE_DESCRIPTION: 'CCIE培训网站，静态部署版本'
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
};

module.exports = nextConfig; 