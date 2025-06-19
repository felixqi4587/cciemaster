# 📡 FTP自动上传设置指南

## 🎯 目标
配置自动上传功能，每次运行 `./auto-deploy.sh` 时自动将网站文件上传到Namecheap主机。

## 📋 前提条件

### 1. 获取Namecheap主机信息
登录您的Namecheap控制面板，获取以下信息：
- **主机域名**：您的网站域名（如：cciemaster.com）
- **cPanel用户名**：通常与域名相同
- **cPanel密码**：您设置的密码
- **上传目录**：通常是 `/public_html`

### 2. 安装必要工具（macOS）
```bash
# 安装 lftp（FTP客户端）
brew install lftp

# 如果没有 Homebrew，先安装：
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## ⚙️ 配置步骤

### 步骤1：创建FTP配置文件
```bash
# 复制模板文件
cp ftp-config.example ftp-config.conf

# 编辑配置文件
nano ftp-config.conf
```

### 步骤2：填写您的信息
在 `ftp-config.conf` 文件中填入：
```bash
# 替换为您的实际信息
FTP_HOST=your-domain.com          # 您的域名
FTP_USER=your-cpanel-username     # cPanel用户名
FTP_PASS=your-cpanel-password     # cPanel密码
FTP_DIR=/public_html              # 上传目录
```

**示例配置：**
```bash
FTP_HOST=cciemaster.com
FTP_USER=cciemaster
FTP_PASS=MySecurePassword123!
FTP_DIR=/public_html
```

### 步骤3：设置文件权限
```bash
# 设置配置文件为只有您可以读写
chmod 600 ftp-config.conf
```

### 步骤4：测试上传
```bash
# 运行自动部署脚本测试
./auto-deploy.sh
```

## 🔍 故障排除

### 问题1：连接失败
**错误信息**：`Login failed`
**解决方案**：
1. 检查用户名和密码是否正确
2. 确认主机域名是否正确
3. 检查Namecheap是否启用了FTP访问

### 问题2：权限错误
**错误信息**：`Permission denied`
**解决方案**：
1. 检查上传目录路径是否正确
2. 确认cPanel用户有写入权限
3. 尝试使用 `/public_html` 或 `/www` 作为目录

### 问题3：SSL错误
**错误信息**：`SSL connection failed`
**解决方案**：
脚本已经设置了 `set ftp:ssl-allow no`，如果仍有问题，请联系Namecheap支持。

### 问题4：文件上传不完整
**解决方案**：
1. 检查网络连接是否稳定
2. 手动运行上传命令测试：
```bash
lftp -c "
set ftp:ssl-allow no;
open -u your-user,your-pass your-host.com;
lcd $(pwd);
cd /public_html;
ls;
quit
"
```

## 🔐 安全注意事项

### 1. 保护配置文件
- ✅ `ftp-config.conf` 已在 `.gitignore` 中排除
- ✅ 文件权限设置为 600（只有您可以读写）
- ❌ 不要将密码提交到Git仓库
- ❌ 不要在公共场所编辑此文件

### 2. 密码安全
- 使用强密码（包含大小写字母、数字、特殊字符）
- 定期更换密码
- 考虑使用cPanel的API令牌替代密码

### 3. 网络安全
- 在安全的网络环境下进行上传
- 避免在公共WiFi下使用FTP

## 🚀 使用方法

配置完成后，每次更新网站只需：

```bash
# 编辑网站内容
nano index.html

# 一键部署（包含Git提交和FTP上传）
./auto-deploy.sh
```

脚本会自动：
1. ✅ 更新文档日期
2. ✅ 提交到Git仓库
3. ✅ 推送到GitHub
4. ✅ 上传到Namecheap主机
5. ✅ 生成部署报告

## 📞 获取帮助

### Namecheap支持
- **帮助中心**：https://www.namecheap.com/support/
- **在线聊天**：登录后台点击右下角聊天图标
- **邮件支持**：support@namecheap.com

### cPanel信息获取
1. 登录Namecheap账户
2. 进入"Domain List"
3. 点击您的域名旁边的"Manage"
4. 在"Hosting"部分找到cPanel信息

### 技术支持
如需技术支持，请联系：
- 邮箱：info@cciemaster.com
- 项目仓库：提交Issue获取帮助

---

**创建时间**：2025年6月19日  
**适用版本**：v2.1及以上  
**最后更新**：2025年6月19日 