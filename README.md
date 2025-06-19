# 🚀 CCIE培训网站 - 苹果风格静态**版本**：静态部署版 v2.1

## 📝 项目说明

这是一个采用苹果公司设计语言的CCIE认证培训网站，专为快速通过CCIE考试而设计。网站采用纯静态架构，可以直接上传到任何支持HTML的主机运行。

## 🎯 特点

- ✅ **苹果风格设计** - 简洁优雅，大量留白，现代化UI
- ✅ **即上传即运行** - 无需任何配置或后端服务
- ✅ **3个月通过保证** - 专业培训体系确保快速通过
- ✅ **响应式设计** - 完美支持手机、平板、电脑访问
- ✅ **SEO优化** - 搜索引擎友好的结构化设计
- ✅ **自动部署** - 一键更新和上传功能
- ✅ **多语言支持** - 英文默认，支持中英文切换

## 📁 文件结构

```
cciemaster/
├── index.html              # 苹果风格首页 ⭐
├── 404.html               # 404错误页面
├── .htaccess              # Apache配置（路由、缓存、安全）
├── auto-deploy.sh         # 自动部署脚本 🚀
├── start.sh               # 一键启动脚本
├── serve.py               # 本地Python服务器
├── README.md              # 使用说明
├── CHANGELOG.md           # 更新日志
├── PROJECT_STATUS.md      # 项目状态报告
├── DEPLOYMENT_CHECKLIST.md # 部署检查清单
├── _next/                 # Next.js优化的静态资源
├── contact/               # 联系页面
├── courses/               # 课程页面
├── blog/                  # 博客页面（4篇技术文章）
├── career-path/           # 职业路径页面
├── qa/                    # 问答页面
├── resources/             # 资源页面
├── success-stories/       # 成功案例页面
└── images/                # 图片资源
```

## 🚀 快速开始

### 本地预览
```bash
# 方法1：一键启动（推荐）
./start.sh

# 方法2：Python服务器
python3 serve.py

# 方法3：其他服务器
php -S localhost:8000        # 如果有PHP
npx serve .                  # 如果有Node.js
```

### 自动部署
```bash
# 自动更新日期、提交Git、上传到服务器
./auto-deploy.sh

# 首次使用需要配置FTP（可选）
cp ftp-config.example ftp-config.conf
# 编辑 ftp-config.conf 填入您的主机信息
```

## 🌐 部署到Namecheap

### 手动部署
1. **登录cPanel** - 访问您的Namecheap控制面板
2. **文件管理器** - 进入"文件管理器"
3. **上传文件** - 进入 `public_html` 目录，上传所有文件
4. **完成** - 访问您的域名即可看到网站

### 自动部署
1. **配置FTP**
   ```bash
   cp ftp-config.example ftp-config.conf
   nano ftp-config.conf  # 填入您的主机信息
   ```

2. **一键部署**
   ```bash
   ./auto-deploy.sh
   ```

## 🎨 设计特色

### 苹果风格设计系统
- **颜色方案**：iOS系统蓝色主题 (#007AFF)
- **字体**：苹果系统字体 (-apple-system)
- **圆角**：12px统一圆角设计
- **阴影**：轻微阴影增强层次感
- **动画**：流畅的缓动动画效果

### 用户体验优化
- **清晰导航**：简化菜单，移除冗余页面
- **快速理解**：首页立即展示CCIE培训价值
- **3个月保证**：突出显示通过保证
- **一键联系**：多个联系入口便于转化

## 🔧 修改网站内容

### 小改动（内容更新）
```bash
# 直接编辑HTML文件
nano index.html           # 更新首页内容
nano contact/index.html   # 更新联系信息
nano courses/index.html   # 更新课程内容

# 自动部署更新
./auto-deploy.sh
```

### 大改动（设计调整）
```bash
# 修改CSS样式（在index.html的<style>标签内）
# 或者使用开发**版本**：静态部署版 v2.1

git clone [开发**版本**：静态部署版 v2.1
cd cciemaster-dev
npm install && npm run build
cp -r out/* ../cciemaster/
```

## 📋 页面功能

### 核心页面
- **首页** - 苹果风格设计，突出3个月通过保证
- **课程** - CCIE培训课程详情（Enterprise, Security, Service Provider）
- **联系** - 多种联系方式和表单
- **博客** - 4篇专业技术文章
- **资源** - 学习资料下载
- **成功案例** - 学员成功故事
- **职业路径** - CCIE职业规划指导
- **问答** - 常见问题解答

### 移除的页面
- ❌ **About Us** - 已合并到首页和footer
- ❌ **网络模拟器** - 简化功能专注培训
- ❌ **技术讨论** - 专注核心培训服务

## 🛠️ 技术栈

- **前端框架**：纯HTML + CSS + JavaScript
- **设计系统**：苹果设计语言
- **样式**：CSS Grid + Flexbox + CSS Variables
- **部署**：静态文件 + Apache配置
- **自动化**：Bash脚本 + Git + FTP

## 📊 性能指标

- **首屏加载**：< 2秒（静态文件）
- **文件数量**：约60个文件
- **总大小**：约28MB
- **页面数量**：8个主要功能页面
- **博客文章**：4篇技术文章
- **浏览器兼容**：所有现代浏览器

## 🔄 自动化工作流

### 每次更新流程
1. **修改内容** - 编辑HTML/CSS文件
2. **运行脚本** - `./auto-deploy.sh`
3. **自动完成**：
   - 更新文档日期
   - Git提交和推送
   - FTP上传（如已配置）
   - 生成部署报告

### Git工作流
```bash
# 查看状态
git status

# 手动提交（如不使用自动脚本）
git add .
git commit -m "更新内容"
git push origin main
```

## 📞 技术支持

**项目维护**：CCIE培训团队  
**技术支持**：开发团队  
**联系方式**：
- 邮箱：info@cciemaster.com
- 电话：+1-400-123-4567
- 网站：https://cciemaster.com

## 📄 许可证

ISC License - 详见源代码仓库

---

**最后更新**：2025年06月19日
**版本**：静态部署版 v2.1
**构建时间**：2025年6月（苹果风格重设计） 