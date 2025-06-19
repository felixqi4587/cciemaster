// Namecheap部署配置示例
// 复制此文件为 deploy-namecheap-config.js 并填入你的实际信息

module.exports = {
  // 方式1: FTP部署（推荐，最兼容）
  ftp: {
    host: 'ftp.yourdomain.com', // 你的域名FTP地址
    user: 'your-ftp-username',  // FTP用户名
    password: 'your-ftp-password', // FTP密码
    secure: false, // 大多数共享主机使用普通FTP
    remotePath: '/public_html' // 网站根目录
  },

  // 方式2: SSH/SFTP部署（如果支持）
  ssh: {
    host: 'your-server.com',
    username: 'your-username',
    password: 'your-password', // 或使用privateKey
    // privateKey: require('fs').readFileSync('/path/to/private/key'),
    remotePath: '/public_html'
  },

  // 方式3: cPanel文件管理器（手动上传）
  cpanel: {
    url: 'https://cpanel.yourdomain.com',
    username: 'your-cpanel-username',
    password: 'your-cpanel-password'
  },

  // 构建设置
  build: {
    outputDir: 'out', // 静态文件输出目录
    cleanBefore: true, // 部署前清理远程目录
    backup: true // 是否备份现有文件
  }
}; 