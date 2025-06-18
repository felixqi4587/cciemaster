const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// 从环境变量获取配置，兼容Namecheap环境
const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 3000;

// Namecheap可能使用的环境变量
const serverPort = process.env.SERVER_PORT || process.env.OPENSHIFT_NODEJS_PORT || port;
const serverHostname = process.env.SERVER_IP || process.env.OPENSHIFT_NODEJS_IP || hostname;

console.log(`启动模式: ${dev ? '开发' : '生产'}`);
console.log(`服务器地址: ${serverHostname}:${serverPort}`);

const app = next({ 
  dev,
  hostname: serverHostname,
  port: serverPort 
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // 解析请求URL
      const parsedUrl = parse(req.url, true);
      
      // 处理静态文件和页面请求
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('请求处理错误:', err);
      res.statusCode = 500;
      res.end('内部服务器错误');
    }
  })
  .once('error', (err) => {
    console.error('服务器启动错误:', err);
    process.exit(1);
  })
  .listen(serverPort, serverHostname, () => {
    console.log(`> CCIE培训网站已启动 http://${serverHostname}:${serverPort}`);
    console.log(`> 环境: ${process.env.NODE_ENV || 'development'}`);
  });
});

// 优雅关闭处理
process.on('SIGTERM', () => {
  console.log('收到SIGTERM信号，正在关闭服务器...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('收到SIGINT信号，正在关闭服务器...');
  process.exit(0);
}); 