# 📁 整个项目复制部署指南

## 方案概述

这种方法是将整个项目文件夹复制到Namecheap服务器，然后在服务器上构建和运行。

## ⚠️ 重要提醒

由于Namecheap共享主机的限制，推荐使用**静态部署**方案。如果您坚持要上传整个项目，请注意以下限制：

### Namecheap共享主机限制：
- Node.js版本可能较旧
- 内存限制（通常128MB-512MB）
- CPU时间限制
- 文件数量限制
- npm安装可能失败

## 📝 如果您要尝试完整项目部署

### 第一步：准备项目文件

1. **清理不必要的文件**
```bash
# 删除开发依赖和缓存
rm -rf node_modules
rm -rf .next
rm -rf out
rm -rf .git
```

2. **创建生产配置**
创建 `production.json` 文件：
```json
{
  "name": "cciemaster-production",
  "scripts": {
    "install": "npm ci --only=production",
    "build": "npm run build",
    "start": "node server.js"
  }
}
```

### 第二步：上传项目

1. **压缩项目**
```bash
zip -r cciemaster-project.zip . -x "node_modules/*" ".next/*" "out/*" ".git/*"
```

2. **上传到Namecheap**
- 登录cPanel
- 进入文件管理器
- 上传压缩包到 `public_html`
- 解压缩

### 第三步：服务器端设置

在Namecheap的终端（如果有）或通过cPanel执行：

```bash
# 进入项目目录
cd public_html

# 安装依赖
npm install --only=production

# 构建项目
npm run build

# 启动服务（如果支持）
npm start
```

## 🚨 预期问题

### 1. Node.js版本不兼容
**解决方案**：降级项目依赖或使用静态部署

### 2. 内存不足
**错误**：`JavaScript heap out of memory`
**解决方案**：使用静态部署

### 3. 权限问题
**错误**：无法写入文件
**解决方案**：检查文件权限或使用静态部署

### 4. 端口问题
**错误**：无法绑定端口
**解决方案**：Namecheap可能不支持自定义端口

## ✅ 推荐解决方案

**强烈建议使用静态部署**：

1. **本地构建**
```bash
npm run build
```

2. **上传静态文件**
只上传 `out` 目录中的文件到 `public_html`

3. **优势**
- ✅ 100% 兼容性
- ✅ 无服务器依赖
- ✅ 加载速度快
- ✅ 安全性高
- ✅ 维护简单

## 📋 静态部署步骤

详细步骤请参考：`DEPLOYMENT_QUICK_START.md`

## 📞 需要帮助？

如果遇到问题：
1. 首先尝试静态部署方案
2. 查看 `docs/namecheap_deployment.md` 详细文档
3. 联系Namecheap技术支持了解Node.js支持情况 