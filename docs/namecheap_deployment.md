# Namecheap部署指南

## 概述

本文档详细说明如何将CCIE培训网站部署到Namecheap共享主机上。提供多种部署方案以应对不同的技术环境。

## 推荐部署方案

### 方案1: 静态站点部署 ⭐⭐⭐⭐⭐ (强烈推荐)

这是最稳定、兼容性最好的部署方案。

#### 特点：
- ✅ 无需Node.js运行时环境
- ✅ 加载速度快
- ✅ 兼容所有共享主机
- ✅ 安全性高
- ✅ 维护成本低

#### 部署步骤：

1. **本地构建**
   ```bash
   # Windows
   npm run build:static
   
   # macOS/Linux
   npm run build:static-unix
   ```

2. **上传文件**
   - 登录Namecheap cPanel
   - 进入"文件管理器"
   - 进入 `public_html` 目录
   - 上传 `out` 目录中的所有文件

3. **验证部署**
   - 访问您的域名检查网站是否正常

#### 自动化脚本：
```bash
# Windows
./deploy.bat

# macOS/Linux
chmod +x deploy.sh
./deploy.sh
```

### 方案2: FTP自动上传 ⭐⭐⭐⭐

适合需要频繁更新的情况。

#### 配置FTP信息：

1. 复制配置文件：
   ```bash
   cp deploy-namecheap-config.example.js deploy-namecheap-config.js
   ```

2. 编辑 `deploy-namecheap-config.js`：
   ```javascript
   module.exports = {
     ftp: {
       host: 'ftp.yourdomain.com',
       user: 'your-ftp-username',
       password: 'your-ftp-password',
       remotePath: '/public_html'
     }
   };
   ```

3. 运行部署：
   ```bash
   npm run deploy:namecheap
   ```

### 方案3: 压缩包上传 ⭐⭐⭐

适合网络不稳定或大文件上传的情况。

#### 步骤：
1. 生成压缩包：
   ```bash
   npm run build:static
   ```

2. 创建压缩包（自动或手动）

3. 上传并解压到 `public_html`

## Namecheap cPanel操作指南

### 1. 登录cPanel
- 访问：`https://cpanel.yourdomain.com`
- 或通过Namecheap账户面板进入

### 2. 文件管理器操作
1. 点击"文件管理器"
2. 进入 `public_html` 目录
3. 清空现有文件（如有）
4. 上传新文件

### 3. 域名设置
- 确保域名正确指向主机
- 检查DNS设置
- 可能需要等待DNS传播（最多48小时）

## 问题排查

### 常见问题：

#### 1. Node.js部署失败
**原因**：Namecheap共享主机通常不支持Node.js或版本太低
**解决**：使用静态站点部署

#### 2. 上传后网站显示404
**原因**：文件路径不正确
**解决**：
- 确保文件在 `public_html` 根目录
- 检查 `index.html` 是否存在
- 检查文件权限（通常设为644）

#### 3. 样式或图片不显示
**原因**：路径问题或文件损坏
**解决**：
- 重新上传丢失的文件
- 检查 `.htaccess` 文件配置
- 清除浏览器缓存

#### 4. FTP上传失败
**原因**：FTP配置错误或网络问题
**解决**：
- 检查FTP凭据
- 尝试使用SFTP（端口22）
- 联系Namecheap支持

### .htaccess配置

创建 `.htaccess` 文件（如果需要）：
```apache
# 启用Gzip压缩
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# 缓存设置
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/gif "access plus 1 month"
</IfModule>

# 单页应用路由支持
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [QSA,L]
```

## 性能优化建议

1. **图片优化**
   - 使用WebP格式
   - 压缩图片文件
   - 使用适当的尺寸

2. **代码优化**
   - 启用代码压缩
   - 移除开发依赖
   - 使用CDN加速

3. **缓存策略**
   - 配置正确的缓存头
   - 使用浏览器缓存
   - 启用Gzip压缩

## 更新流程

1. **本地开发和测试**
2. **构建静态文件**
3. **备份现有网站**（可选）
4. **上传新文件**
5. **测试验证**

## 备份策略

建议定期备份：
- 网站文件
- 数据库（如有）
- 配置文件

## 支持联系方式

如果遇到问题：
1. 查看本文档的问题排查部分
2. 联系Namecheap技术支持
3. 查看项目的GitHub Issues

---

**最后更新**: {当前日期}
**版本**: 1.0
**状态**: 生产就绪 