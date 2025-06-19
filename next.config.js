/** @type {import('next').NextConfig} */
const nextConfig = {
  // 生产环境优化
  compress: true,
  poweredByHeader: false,
  
  // 图片优化配置
  images: {
    domains: [],
    unoptimized: true, // Namecheap共享主机可能不支持图片优化
  },
  
  // 静态文件导出配置（备用方案）
  trailingSlash: true,
  
  // 环境变量配置
  env: {
    CUSTOM_KEY: 'CCIE_TRAINING_SITE',
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
  
  // 输出配置 - 支持静态导出和Node.js部署
  output: 'standalone', // 默认Node.js部署，需要静态时手动改为'export'
  
  // 实验性功能
  experimental: {
    // 根据需要启用
  },
};

module.exports = nextConfig; 