# 🚀 Namecheap快速部署指南

## 推荐方案：静态站点部署

### 第一步：构建静态文件

**Windows用户：**
```cmd
npm run build:static
```

**macOS/Linux用户：**
```bash
npm run build:static-unix
```

### 第二步：上传到Namecheap

1. **登录cPanel**
   - 访问：`https://cpanel.yourdomain.com`
   - 或通过Namecheap账户面板进入

2. **进入文件管理器**
   - 点击"File Manager"（文件管理器）
   - 进入 `public_html` 目录

3. **清空并上传**
   - 删除 `public_html` 中的现有文件
   - 上传 `out` 目录中的**所有文件**
   - **注意**：是上传文件，不是上传整个out文件夹

### 第三步：验证部署

访问您的域名，检查网站是否正常显示。

---

## 自动化脚本（可选）

### Windows
```cmd
./deploy.bat
```

### macOS/Linux
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## 常见问题

### Q: 网站显示404错误？
**A:** 确保 `index.html` 在 `public_html` 根目录

### Q: 样式不显示？
**A:** 确保上传了 `_next` 文件夹及其所有内容

### Q: Node.js部署失败？
**A:** Namecheap共享主机不完全支持Node.js，建议使用静态部署

---

## 需要帮助？

查看详细文档：`docs/namecheap_deployment.md` 