# 🚀 静态部署快速指南

## 一键部署方案

### 第一步：构建静态文件

**Windows用户：**
```cmd
npm run build:windows
```

**macOS/Linux用户：**
```bash
npm run build
```

### 第二步：上传到Namecheap

1. **登录cPanel**
   - 访问：`https://cpanel.yourdomain.com`

2. **进入文件管理器**
   - 点击"File Manager"（文件管理器）
   - 进入 `public_html` 目录
   - 删除现有文件（如果有）

3. **上传静态文件**
   - 选择 `out` 目录中的**所有文件**
   - 拖拽上传到 `public_html` 根目录
   - ⚠️ **重要**：上传文件内容，不要上传out文件夹本身

### 第三步：完成
访问您的域名，网站即可正常运行！

---

## 自动化脚本

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

## 项目特点

✅ **纯静态文件** - 无需Node.js运行时  
✅ **兼容性100%** - 支持所有共享主机  
✅ **加载速度快** - 无服务器处理延迟  
✅ **安全性高** - 无后端安全风险  
✅ **维护简单** - 只需上传文件  

---

## 快速预览

本地预览构建结果：
```bash
npm run preview
```

---

## 文件结构

上传后的文件结构：
```
public_html/
├── index.html          # 首页
├── _next/              # Next.js资源
├── about/              # 关于页面
├── contact/            # 联系页面
├── courses/            # 课程页面
└── ...                 # 其他页面
```

---

## 常见问题

### Q: 网站显示空白？
**A:** 检查是否上传了所有文件，特别是 `_next` 文件夹

### Q: 样式不正确？
**A:** 确保 `_next/static` 文件夹完整上传

### Q: 404错误？
**A:** 确保 `index.html` 在 `public_html` 根目录

---

## 更新网站

1. 修改代码
2. 运行 `npm run build`  
3. 重新上传 `out` 目录中的文件

---

## 需要帮助？

查看详细文档：`docs/namecheap_deployment.md` 