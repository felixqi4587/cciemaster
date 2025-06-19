#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ftp = require('ftp');

// Namecheap FTP配置
const FTP_CONFIG = {
  host: '', // 你的Namecheap FTP主机地址
  user: '', // FTP用户名
  password: '', // FTP密码
  secure: false, // 大多数共享主机使用普通FTP
  connTimeout: 60000,
  pasvTimeout: 60000
};

class NamecheapDeployer {
  constructor() {
    this.client = new ftp();
    this.localPath = path.join(__dirname, 'out');
    this.remotePath = '/public_html'; // Namecheap的网站根目录
  }

  async deploy() {
    try {
      console.log('🚀 开始部署到Namecheap...');
      
      // 检查静态文件是否存在
      if (!fs.existsSync(this.localPath)) {
        console.error('❌ 静态文件不存在，请先运行: npm run build:static');
        process.exit(1);
      }

      // 连接FTP
      await this.connect();
      
      // 上传文件
      await this.uploadDirectory(this.localPath, this.remotePath);
      
      console.log('✅ 部署完成！');
      this.client.end();
      
    } catch (error) {
      console.error('❌ 部署失败:', error.message);
      this.client.end();
      process.exit(1);
    }
  }

  connect() {
    return new Promise((resolve, reject) => {
      if (!FTP_CONFIG.host || !FTP_CONFIG.user || !FTP_CONFIG.password) {
        reject(new Error('请在deploy-namecheap.js中配置FTP连接信息'));
        return;
      }

      this.client.on('ready', () => {
        console.log('📡 FTP连接成功');
        resolve();
      });

      this.client.on('error', (err) => {
        reject(err);
      });

      this.client.connect(FTP_CONFIG);
    });
  }

  async uploadDirectory(localDir, remoteDir) {
    const files = fs.readdirSync(localDir);
    
    for (const file of files) {
      const localFilePath = path.join(localDir, file);
      const remoteFilePath = `${remoteDir}/${file}`;
      const stat = fs.statSync(localFilePath);

      if (stat.isDirectory()) {
        // 创建远程目录
        await this.createRemoteDir(remoteFilePath);
        // 递归上传子目录
        await this.uploadDirectory(localFilePath, remoteFilePath);
      } else {
        // 上传文件
        await this.uploadFile(localFilePath, remoteFilePath);
      }
    }
  }

  createRemoteDir(remoteDir) {
    return new Promise((resolve, reject) => {
      this.client.mkdir(remoteDir, true, (err) => {
        if (err && err.code !== 550) { // 550表示目录已存在
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  uploadFile(localPath, remotePath) {
    return new Promise((resolve, reject) => {
      console.log(`📤 上传: ${localPath} -> ${remotePath}`);
      
      this.client.put(localPath, remotePath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

// 运行部署
if (require.main === module) {
  const deployer = new NamecheapDeployer();
  deployer.deploy();
}

module.exports = NamecheapDeployer; 