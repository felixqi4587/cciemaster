# 更新日志

本文档记录CCIE培训网站项目的所有重要变更。

## [1.6.0] - 2024-01-18

### 🎉 重大问题解决 - Node.js版本和启动配置修复

#### ✅ 问题诊断
- **原始问题**: Next.js启动失败，显示Node.js v10.24.1版本过低
- **升级后**: Node.js v20.18.3，但仍有启动配置问题
- **根本原因**: `output: 'standalone'` 配置需要特殊启动方式

#### 🔧 解决方案实施
1. **Node.js版本升级**
   - 从 v10.24.1 升级到 v20.18.3
   - 完全兼容Next.js 14.x要求

2. **启动脚本修复**
   - 更新 `npm start` 使用正确的standalone启动方式
   - 修改为: `node .next/standalone/server.js`
   - 保留 `npm run start:next` 作为标准模式备用

3. **智能启动器创建**
   - 新增 `start.js` 智能启动脚本
   - 自动检测standalone模式和标准模式
   - 提供详细的启动信息和错误诊断

#### 📁 新增文件
- `start.js` - 智能启动器，自动选择最佳启动方式

#### 🔧 修改文件
- `package.json` - 更新启动脚本配置
- `docs/namecheap_nodejs_deployment.md` - 添加Node.js版本要求说明
- `docs/changelog.md` - 记录问题解决过程

#### ✅ 验证结果
- ✅ 构建成功: 18个页面正常生成
- ✅ 服务器启动: 端口3000正常监听
- ✅ 应用响应: http://localhost:3000 可访问
- ✅ Node.js版本: v20.18.3 完全兼容

#### 🚀 部署说明
**Namecheap部署时请确保:**
1. Node.js版本 >= 16.0.0 (推荐v20.x)
2. 使用正确的启动命令: `node .next/standalone/server.js`
3. 完整上传 `.next/standalone/` 目录

### 💡 经验总结
- Next.js `output: 'standalone'` 配置需要特定启动方式
- 不能使用 `next start`，必须直接运行standalone服务器
- 建议使用智能启动器自动处理不同部署模式

---

## [1.5.3] - 2024-01-17

### 🔧 Namecheap部署支持和故障排除

#### 📁 新增功能
- **Node.js部署支持**
  - 创建 `server.js` 专用Node.js服务器
  - 兼容Namecheap环境变量
  - 优化生产环境配置

- **调试和故障排除工具**
  - 创建 `app.js` 详细调试启动器
  - 完整的错误信息输出和环境检测
  - 自动降级到静态服务器机制

#### 📚 文档完善
- `docs/namecheap_nodejs_deployment.md` - 完整部署指南
- `docs/namecheap_troubleshooting.md` - 503错误故障排除
- `deploy-namecheap.bat` - Windows自动化部署脚本

#### 🔧 配置优化
- 更新 `next.config.js` 支持多种输出模式
- 添加 `.nvmrc` 指定Node.js版本要求
- 优化 `package.json` 生产环境脚本

#### ✅ 解决的问题
- 503服务器错误诊断流程
- 依赖安装和构建问题
- 环境变量和端口配置
- 静态资源访问问题

---

## [1.5.2] - 2024-01-16

### 🎨 网络模拟器界面和功能增强

#### ✨ 新增功能
- **增强网络模拟器页面**
  - 新增拓扑配置面板
  - 实时控制台输出
  - 设备配置导入/导出功能
  - 模拟结果分析

#### 🔧 技术改进
- 优化博客文章关联逻辑，修复预渲染错误
- 改进页面加载性能
- 增强移动端响应式设计

#### 📁 文件更新
- `pages/network-simulator.js` - 功能增强
- `styles/NetworkSimulator.module.css` - 界面优化
- `pages/blog/[slug].js` - 修复related posts错误

---

## [1.5.1] - 2024-01-15

### 🔧 Stagewise工具栏集成

#### ✨ 新增功能
- **AI驱动的浏览器编辑**
  - 集成 @stagewise/toolbar
  - 实时页面编辑和优化建议
  - 仅在开发模式启用

#### 📁 新增文件
- `.vscode/extensions.json` - VS Code扩展推荐

#### 🔧 修改文件  
- `pages/_app.js` - 集成Stagewise工具栏
- `package.json` - 添加新依赖

---

## [1.5.0] - 2024-01-14

### 🚀 GitHub仓库连接和Vercel部署修复

#### ✅ 解决的关键问题
- **预渲染错误修复**
  - 修复博客页面 `relatedPosts.filter(Boolean)` 错误
  - 解决 `undefined.image` 引用问题
  - 确保所有18个页面正常生成

#### 🔧 技术改进
- 连接GitHub远程仓库: https://github.com/felixqi4587/cciemaster
- 成功推送所有代码到GitHub
- 通过本地构建测试验证

#### 📁 修改文件
- `pages/blog/[slug].js` - 修复related posts逻辑
- 所有文件已同步到GitHub

---

## [1.4.0] - 2024-01-13

### 🏗️ 项目重建和Vercel部署

#### 🚀 重大更新
- **完整项目重建**
  - 重新创建所有页面和组件
  - 优化网站结构和性能
  - 修复所有已知问题

#### 📱 页面完善
- 首页 (index.js) - 全新设计
- 课程页面 (courses.js) - 课程展示
- 博客系统 (blog/index.js, blog/[slug].js) - 完整博客功能
- 关于页面 (about.js) - 机构介绍
- 联系页面 (contact.js) - 联系方式
- 讨论区 (discussion/index.js, discussion/[id].js) - 互动功能
- 问答区 (qa.js) - Q&A系统
- 网络模拟器 (network-simulator.js) - 实验环境
- 学习资源 (resources.js) - 资料下载
- 职业规划 (career-path.js) - 发展指导
- 成功案例 (success-stories.js) - 学员故事

#### 🎨 样式系统
- 完整的CSS模块化样式
- 响应式设计适配
- 统一的设计语言

#### 📊 数据管理
- 本地化数据存储
- 博客文章管理系统
- 课程信息管理

---

## [1.3.0] - 2024-01-12

### 📝 博客系统优化

#### ✨ 功能增强
- 博客文章详情页优化
- 相关文章推荐功能
- 标签系统完善
- 评论区界面改进

#### 🎨 界面提升
- 更好的文章阅读体验
- 优化移动端显示
- 增强视觉层次

---

## [1.2.0] - 2024-01-11

### 🏠 首页和导航优化

#### ✨ 新增功能
- 英雄区域重设计
- 特色课程展示
- 服务介绍优化
- 统计数据展示

#### 🔧 技术改进
- 导航栏交互增强
- 页面加载性能优化
- SEO元数据完善

---

## [1.1.0] - 2024-01-10

### 🎯 核心页面开发

#### 📱 页面实现
- 课程列表页面
- 博客首页
- 讨论区首页
- 问答系统基础框架

#### 🎨 设计系统
- 建立统一色彩规范
- 响应式布局框架
- 组件化开发模式

---

## [1.0.0] - 2024-01-09

### 🚀 项目初始化

#### 🏗️ 基础架构
- Next.js 14.1.0 项目搭建
- 基础路由结构设计
- 开发环境配置

#### 📁 项目结构
- 页面目录结构规划
- 样式文件组织
- 公共资源管理

#### 🔧 开发配置
- ESLint 配置
- Git 仓库初始化
- 开发规范制定

---

## 技术栈

- **框架**: Next.js 14.1.0
- **前端**: React 18.2.0
- **样式**: CSS Modules
- **部署**: Vercel / Static Export
- **版本控制**: Git + GitHub

## [0.6.0] - 2024-12-19

### 新增Namecheap Node.js部署支持
- 创建专用的Node.js服务器配置文件（server.js）
- 添加Next.js生产环境优化配置（next.config.js）
- 集成Stagewise AI工具栏开发支持
- 创建详细的Namecheap Node.js部署文档
- 提供自动化部署脚本（deploy-namecheap.bat）

### 配置文件更新
- package.json：添加Node.js引擎要求和生产脚本
- next.config.js：优化生产环境性能和安全设置
- server.js：兼容Namecheap环境变量的服务器配置
- .nvmrc：指定Node.js版本16.20.0

### 开发工具集成
- 集成@stagewise/toolbar用于AI驱动的浏览器编辑
- 添加VS Code扩展推荐配置
- 客户端动态加载，仅在开发模式启用

### 文档完善
- docs/namecheap_nodejs_deployment.md：详细部署指南
- 包含性能优化、故障排除、安全建议
- 提供完整的部署流程和维护指南

## [0.5.2] - 2024-12-19

### 修复Vercel部署兼容性问题
- 修复博客页面在Vercel部署时的预渲染错误
- 解决relatedPosts中引用不存在文章导致的undefined错误
- 添加相关文章渲染的安全检查，过滤undefined值
- 确保所有博客页面可以正常构建和部署
- 本地构建测试通过，所有18个页面成功生成

### 技术改进
- 在相关文章映射中增加`.filter(Boolean)`过滤空值
- 添加null检查防止访问undefined对象的属性
- 优化相关文章链接生成逻辑

## [0.5.1] - 2024-12-19

### 项目状态检查
- 项目结构完整，包含所有必要文件
- Node.js 版本: v22.15.0，npm 版本: 10.9.2
- 开发服务器可以正常启动并运行在 http://localhost:3000
- Git 仓库状态良好，工作目录无未提交更改
- ✅ **已解决**: 配置GitHub远程仓库连接
- .gitignore 文件配置正确，排除了node_modules、.next等文件
- 项目包含完整的文档结构在 docs/ 目录
- GitHub Actions 部署配置已创建并可以使用
- 项目页面结构完整：首页、课程、博客、讨论等功能页面
- 包含网络模拟器、职业规划等高级功能

### 已完成修复
1. ✅ 配置GitHub远程仓库连接
2. ✅ 验证项目运行状态正常
3. ✅ 修复Vercel部署兼容性问题

## [0.5.0] - 2024-05-22

### 新增
- 添加Namecheap共享主机部署方案:
  - 创建部署文档（docs/namecheap_deployment.md）
  - 创建部署方案总结（docs/namecheap_deployment_summary.md）
  - 创建部署日志文件（docs/deployment_log.md）
- 添加自动化部署工具:
  - 创建Windows部署脚本（deploy.bat）
  - 配置GitHub Actions自动部署工作流（.github/workflows/deploy.yml）
- 修复构建问题:
  - 添加缺失的样式文件
  - 修复CSS模块选择器问题
  - 创建_document.js文件

### 改进
- 优化静态资源组织
- 提高部署效率和可靠性
- 建立自动化部署流程

## [0.4.0] - 2024-05-20

### 新增
- 添加网络模拟器功能：
  - 创建网络拓扑模拟器组件（NetworkSimulator.js）
  - 添加模拟器页面（network-simulator.js）
  - 实现基础拓扑设计工具
  - 添加终端命令模拟功能
  - 创建相关样式文件
- 添加多种引流元素：
  - 功能对比表格
  - 专业版升级推广
  - 学员使用反馈展示
  - 常见问题解答
  - 悬浮引流球
  - 信息收集表单
- 优化用户体验：
  - 实现响应式设计
  - 添加交互式提示
  - 设计浮动引流元素

## [0.3.0] - 2024-05-18

### 新增
- 添加技术讨论社区功能：
  - 添加讨论列表组件（TechDiscussion.js）
  - 添加讨论详情页面（discussion/[id].js）
  - 设计讨论列表页面（discussion/index.js）
  - 创建相关样式文件
- 添加用户互动功能：
  - 回复讨论
  - 点赞功能
  - 分享功能
  - 多种引流元素
- 提供技术专家推荐和热门主题功能
- 增强SEO优化，添加相关meta标签

### 改进
- 优化移动端响应式设计
- 增强用户互动体验
- 完善引流路径和转化漏斗

## [0.2.0] - 2024-05-15

### 新增
- 添加通用布局组件（Layout.js）
- 添加引流组件（LeadMagnet.js）：用于收集潜在客户信息
- 添加倒计时组件（CountdownTimer.js）：用于增加转化紧迫感
- 添加博客页面（blog.js）：用于内容营销和引流
- 添加免费资源页面（resources.js）：提供高价值内容吸引潜在客户
- 添加成功案例页面（success-stories.js）：展示学员成功故事促进转化
- 创建相关样式文件
- 创建图片目录结构

### 改进
- 优化页面结构和用户体验
- 增强网站引流能力
- 添加更多转化策略
- 完善网站导航 

## [0.1.0] - 2024-05-14

### 新增
- 初始化项目结构
- 添加首页（index.js）
- 添加课程页面（courses.js）
- 添加关于我们页面（about.js）
- 添加联系页面（contact.js）
- 设置基础样式和布局
- 实现响应式设计，适配PC、平板和手机

### 修改
- 优化项目结构
- 更新package.json配置

### 修复
- 初始项目无修复事项

## [0.0.1] - 2024-05-11

### 新增
- 项目初始化
- 创建基础Next.js应用
- 设置Git仓库
- 添加基础依赖包 