# Namecheap Node.js 部署指南

## ⚠️ 重要：Node.js版本要求

**项目要求：Node.js >= 16.0.0**
**检查您的Namecheap Node.js版本！**

如果您的Namecheap提供的Node.js版本低于16.0.0，请：
1. 升级到更高版本的Node.js（推荐）
2. 或使用兼容配置（见下方说明）

## 📋 部署前准备

### 1. 检查Node.js版本

在Namecheap cPanel中：
1. 进入 "Node.js应用管理"
2. 查看可用的Node.js版本
3. 选择16.0.0或更高版本

### 2. 选择部署配置

#### 方案A：标准配置（Node.js >= 16）
```bash
# 使用标准配置文件
package.json      # 主配置文件
server.js        # 主启动文件
```

#### 方案B：兼容配置（Node.js v10-v14）
```bash
# 使用兼容配置文件
package-legacy.json  # 兼容配置文件
app-legacy.js       # 兼容启动文件
```

如果使用兼容配置，需要：
```bash
# 重命名配置文件
mv package.json package-standard.json
mv package-legacy.json package.json
mv app.js app-standard.js  
mv app-legacy.js app.js
```

## 🚀 部署步骤

### 步骤1：构建项目
```bash
npm run build
```

### 步骤2：上传文件
上传以下文件到Namecheap的public_html目录：

**核心文件（必需）：**
- `package.json`
- `app.js` (或选择的启动文件)
- `.next/` 目录（完整）
- `public/` 目录
- `next.config.js`

**配置文件（推荐）：**
- `.nvmrc`
- `docs/` 目录

### 步骤3：在Namecheap中配置Node.js应用

1. **登录cPanel**
2. **进入"Node.js Apps"**
3. **创建新应用**：
   - Node.js版本：选择16.0.0+（或兼容版本）
   - 应用根目录：`public_html`
   - 应用URL：您的域名
   - 启动文件：`app.js`

4. **安装依赖**：
```bash
npm install --production
```

5. **启动应用**

### 步骤4：验证部署

检查应用状态：
- 访问您的域名
- 查看应用日志
- 确认所有页面正常加载

## 🔧 故障排除

### 常见问题

#### 1. Node.js版本不兼容
**症状**：应用启动失败，显示版本错误
**解决**：
- 升级Node.js版本，或
- 使用兼容配置（package-legacy.json + app-legacy.js）

#### 2. 503 服务器错误
**症状**：网站无法访问
**解决**：
- 检查.next目录是否完整上传
- 重新运行 `npm install --production`
- 查看应用日志获取详细错误

#### 3. 静态资源加载失败
**症状**：页面样式异常，图片不显示
**解决**：
- 确认public目录已上传
- 检查next.config.js配置
- 验证CDN设置

### 调试命令

```bash
# 查看应用状态
node app.js

# 查看依赖
npm list

# 检查配置
cat package.json

# 查看环境信息
node -v
npm -v
```

## 📊 性能优化

### 1. 启用压缩
在next.config.js中已配置gzip压缩

### 2. 优化图片
- 使用WebP格式
- 压缩图片文件
- 启用lazy loading

### 3. 缓存策略
- 静态资源长期缓存
- API响应适当缓存
- 使用CDN加速

## 🔒 安全配置

### 安全头部
已在next.config.js中配置：
- X-Content-Type-Options
- X-Frame-Options  
- X-XSS-Protection
- Referrer-Policy

### 环境变量
```bash
NODE_ENV=production
PORT=3000
```

## 📝 维护建议

### 定期任务
- 监控应用性能
- 更新依赖包
- 备份重要数据
- 检查安全更新

### 日志管理
- 定期清理日志文件
- 监控错误日志
- 设置日志轮转

## 🆘 紧急恢复

如果Node.js部署失败，可以快速回退到静态部署：

```bash
# 导出静态文件
npm run export

# 上传out目录内容到public_html
# 删除Node.js应用配置
```

## 📞 支持联系

遇到问题？
1. 查看调试日志
2. 参考故障排除指南
3. 联系Namecheap技术支持

---

**最后更新：** 2024年1月
**适用版本：** Next.js 12.x - 14.x

## 概述
本指南详细说明如何将CCIE培训网站部署到Namecheap的Node.js托管服务上。

## 前提条件

### Namecheap端要求
- 购买支持Node.js的托管方案（如Shared Hosting Plus或以上）
- Node.js版本：16.0.0或更高
- 内存限制：建议至少512MB
- 磁盘空间：建议至少1GB

### 本地环境
- Node.js 16.0.0+
- npm 8.0+
- Git

## 部署步骤

### 1. 准备项目文件

确保项目已经配置为生产模式：

```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 测试生产模式
npm run production
```

### 2. 文件上传

#### 方法一：使用cPanel文件管理器
1. 登录Namecheap cPanel
2. 打开"文件管理器"
3. 导航到网站根目录（通常是`public_html`）
4. 上传以下文件和目录：
   - `package.json`
   - `server.js`
   - `next.config.js`
   - `.next/` 目录（构建后生成）
   - `public/` 目录
   - `pages/` 目录
   - `styles/` 目录
   - `components/` 目录
   - `src/` 目录（如果存在）

#### 方法二：使用Git（推荐）
```bash
# 在Namecheap服务器上克隆仓库
git clone https://github.com/felixqi4587/cciemaster.git
cd cciemaster

# 安装依赖并构建
npm install
npm run build
```

### 3. Namecheap Node.js 应用配置

#### 在cPanel中设置Node.js应用：
1. 进入cPanel -> Node.js 应用
2. 点击"创建应用"
3. 配置以下参数：
   - **Node.js版本**：16.0.0或更高
   - **应用模式**：生产模式
   - **应用根目录**：`/public_html/cciemaster`（根据实际路径）
   - **应用URL**：您的域名
   - **启动文件**：`server.js`

#### 环境变量设置：
```bash
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
```

### 4. 安装依赖并启动

在Node.js应用管理界面：
1. 点击"包管理"
2. 运行 `npm install`
3. 点击"重启应用"

### 5. 域名配置

确保域名正确指向Node.js应用：
- 在Namecheap域名管理中设置DNS记录
- A记录指向服务器IP
- 等待DNS传播（通常5-10分钟）

## 性能优化建议

### 内存优化
```javascript
// 在server.js中添加内存限制
process.env.NODE_OPTIONS = '--max-old-space-size=512';
```

### 缓存设置
在`next.config.js`中添加：
```javascript
headers: [
  {
    key: 'Cache-Control',
    value: 'public, max-age=3600, s-maxage=3600',
  },
]
```

### 启用gzip压缩
```javascript
// 在next.config.js中
compress: true,
```

## 监控和维护

### 日志查看
通过cPanel的Node.js应用界面查看应用日志：
1. 进入Node.js应用管理
2. 选择您的应用
3. 点击"日志"查看运行日志

### 性能监控
```javascript
// 在server.js中添加性能监控
console.log('内存使用:', process.memoryUsage());
console.log('运行时间:', process.uptime());
```

### 自动重启配置
如果应用意外停止，在cPanel中设置自动重启：
1. Node.js应用管理
2. 选择应用
3. 启用"自动重启"

## 故障排除

### 常见问题

#### 1. 应用无法启动
- 检查Node.js版本兼容性
- 确认`server.js`文件存在且可执行
- 查看错误日志

#### 2. 内存不足
- 减少并发连接数
- 优化图片和静态资源
- 启用缓存机制

#### 3. 静态文件404错误
- 确认`public/`目录已上传
- 检查文件路径大小写
- 验证Next.js静态文件配置

#### 4. 页面加载缓慢
- 启用gzip压缩
- 优化图片大小
- 使用CDN加速

### 调试模式
临时启用调试模式：
```bash
NODE_ENV=development npm run production
```

## 备份策略

### 定期备份
1. 每周备份应用文件
2. 备份数据库（如果使用）
3. 导出环境变量配置

### 版本回滚
使用Git标签管理版本：
```bash
# 创建版本标签
git tag -a v1.0.0 -m "版本1.0.0"

# 回滚到特定版本
git checkout v1.0.0
npm install
npm run build
```

## 安全建议

### 环境变量
- 不要在代码中硬编码敏感信息
- 使用Namecheap的环境变量功能

### 访问控制
- 限制不必要的端口访问
- 定期更新依赖包
- 启用HTTPS

## 成本优化

### 资源使用监控
- 定期检查内存和CPU使用率
- 优化长时间运行的进程
- 及时清理临时文件

### 托管方案选择
- 根据访问量选择合适的托管方案
- 考虑升级到VPS获得更好性能

## 联系支持

如果遇到问题：
1. 查看Namecheap官方文档
2. 联系Namecheap技术支持
3. 参考项目GitHub Issues

---

*更新时间：2024年12月19日*
*适用于：Namecheap Node.js托管服务* 