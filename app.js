const { createServer } = require('http');
const { parse } = require('url');

// 简化的启动配置，用于调试
console.log('=== CCIE培训网站启动调试 ===');
console.log('Node.js版本:', process.version);
console.log('当前目录:', process.cwd());
console.log('环境变量PORT:', process.env.PORT);
console.log('环境变量NODE_ENV:', process.env.NODE_ENV);

try {
  // 检查Next.js是否可用
  const next = require('next');
  console.log('✅ Next.js模块加载成功');
  
  // 环境变量配置
  const dev = process.env.NODE_ENV !== 'production';
  const port = process.env.PORT || process.env.SERVER_PORT || 3000;
  const hostname = process.env.HOSTNAME || process.env.SERVER_IP || '0.0.0.0';
  
  console.log(`启动模式: ${dev ? '开发' : '生产'}`);
  console.log(`监听地址: ${hostname}:${port}`);
  
  // 初始化Next.js应用
  const app = next({ 
    dev: false,  // 强制生产模式
    dir: process.cwd()
  });
  
  const handle = app.getRequestHandler();
  
  console.log('正在准备Next.js应用...');
  
  app.prepare()
    .then(() => {
      console.log('✅ Next.js应用准备完成');
      
      // 创建HTTP服务器
      const server = createServer(async (req, res) => {
        try {
          const parsedUrl = parse(req.url, true);
          await handle(req, res, parsedUrl);
        } catch (err) {
          console.error('请求处理错误:', err);
          res.statusCode = 500;
          res.end('Internal Server Error');
        }
      });
      
      // 错误处理
      server.on('error', (err) => {
        console.error('❌ 服务器错误:', err);
        if (err.code === 'EADDRINUSE') {
          console.error(`端口 ${port} 已被占用`);
        }
      });
      
      // 启动服务器
      server.listen(port, hostname, () => {
        console.log('✅ 服务器启动成功！');
        console.log(`🌐 访问地址: http://${hostname}:${port}`);
        console.log('=== 启动完成 ===');
      });
      
    })
    .catch((err) => {
      console.error('❌ Next.js应用准备失败:', err);
      console.error('错误详情:', err.message);
      process.exit(1);
    });
    
} catch (err) {
  console.error('❌ 严重错误 - 无法加载Next.js:', err);
  console.error('请检查以下事项:');
  console.error('1. package.json是否存在');
  console.error('2. node_modules是否完整安装');
  console.error('3. Next.js是否正确安装');
  
  // 尝试基础HTTP服务器
  console.log('尝试启动基础HTTP服务器...');
  const basicServer = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <h1>CCIE培训网站 - 调试模式</h1>
      <p>Next.js启动失败，当前运行基础服务器</p>
      <p>Node.js版本: ${process.version}</p>
      <p>时间: ${new Date().toLocaleString()}</p>
      <p>请检查服务器日志获取详细错误信息</p>
    `);
  });
  
  const fallbackPort = process.env.PORT || 3000;
  basicServer.listen(fallbackPort, () => {
    console.log(`🆘 基础服务器启动在端口 ${fallbackPort}`);
  });
} 