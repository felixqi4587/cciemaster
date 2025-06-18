const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

console.log('==========================================');
console.log('CCIE培训网站 - 智能启动器');
console.log('==========================================');
console.log('Node.js版本:', process.version);
console.log('时间:', new Date().toLocaleString());

// 检测启动模式
function detectStartupMode() {
  const standaloneServerPath = path.join(__dirname, '.next', 'standalone', 'server.js');
  const nextBuildPath = path.join(__dirname, '.next');
  const packagePath = path.join(__dirname, 'package.json');
  
  console.log('\n🔍 检测项目配置...');
  
  // 检查是否构建过
  if (!fs.existsSync(nextBuildPath)) {
    console.log('❌ 项目未构建，请先运行: npm run build');
    process.exit(1);
  }
  
  // 检查next.config.js配置
  let nextConfig = {};
  try {
    nextConfig = require('./next.config.js');
  } catch (e) {
    console.log('⚠️  未找到next.config.js');
  }
  
  // 检查是否有standalone服务器
  if (fs.existsSync(standaloneServerPath)) {
    console.log('✅ 发现standalone模式构建');
    return 'standalone';
  }
  
  // 检查配置
  if (nextConfig.output === 'standalone') {
    console.log('⚠️  配置为standalone模式但未找到服务器文件');
    console.log('请重新构建: npm run build');
    process.exit(1);
  }
  
  console.log('✅ 使用标准Next.js模式');
  return 'standard';
}

// 启动服务器
function startServer() {
  const mode = detectStartupMode();
  
  console.log(`\n🚀 启动${mode === 'standalone' ? 'standalone' : '标准'}服务器...`);
  
  let command, args;
  
  if (mode === 'standalone') {
    command = 'node';
    args = ['.next/standalone/server.js'];
  } else {
    command = 'npm';
    args = ['run', 'start:next'];
  }
  
  const serverProcess = spawn(command, args, {
    stdio: 'inherit',
    shell: true
  });
  
  serverProcess.on('error', (err) => {
    console.error('❌ 启动失败:', err);
    process.exit(1);
  });
  
  serverProcess.on('exit', (code) => {
    if (code !== 0) {
      console.error(`❌ 服务器异常退出，代码: ${code}`);
    }
    process.exit(code);
  });
  
  // 优雅关闭
  process.on('SIGTERM', () => {
    console.log('\n⏹️  正在关闭服务器...');
    serverProcess.kill('SIGTERM');
  });
  
  process.on('SIGINT', () => {
    console.log('\n⏹️  正在关闭服务器...');
    serverProcess.kill('SIGINT');
  });
}

// 启动
startServer(); 