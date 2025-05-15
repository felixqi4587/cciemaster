# CCIE培训网站

这是一个用于CCIE培训的展示型网站，主要用于引流和展示培训信息。网站使用Next.js框架开发，提供响应式设计，适配各种设备。

## 功能特点

- 响应式设计，完美适配PC、平板和手机
- 专业的CCIE培训课程信息展示
- 用户友好的联系表单，方便潜在学员咨询
- 详细的"关于我们"页面展示培训优势
- 简洁现代的UI设计，突出专业形象

## 技术栈

- **Next.js** - React框架，提供服务端渲染和静态网站生成
- **React** - 前端UI库
- **CSS Modules** - 模块化样式管理，避免样式冲突
- **响应式设计** - 自适应各种屏幕尺寸

## 项目文档

详细的项目文档位于 `docs/` 目录:

- [开发指南](docs/development_guide.md) - 项目开发相关说明
- [环境搭建指南](docs/setup_guide.md) - 新电脑上配置开发环境
- [更新日志](docs/changelog.md) - 版本更新历史
- [待办事项](docs/todo.md) - 计划中的任务
- [项目状态](docs/project_status.md) - 当前进度和计划
- [项目规范](docs/project_guidelines.md) - 开发规范和Cursor使用指南
- [项目结构](docs/project_structure.md) - 目录结构详解

## 如何运行

确保已安装Node.js (v14.0.0或更高版本)

1. 克隆此仓库
```bash
git clone https://github.com/felixqi4587/cciemaster.git
cd cciemaster
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```
然后在浏览器中访问 http://localhost:3000

4. 构建生产版本
```bash
npm run build
npm start
```

## 部署方法

该项目可以部署到任何支持Node.js的托管服务上：

1. **Vercel** (推荐)：
   - 提供免费托管
   - 自动部署Git仓库
   - 内置Next.js优化

2. **Netlify**：
   - 支持静态导出的Next.js项目
   - 提供免费SSL证书

3. **传统主机**：
   - 运行`npm run export`生成静态文件
   - 上传到任何Web主机

## 未来规划

- 添加用户注册和登录功能
- 集成支付系统处理课程报名
- 添加在线学习内容和学员管理系统
- 实现多语言支持

## 更新日志

### 2024-05-14
- 初始版本发布
- 完成首页、课程、关于我们和联系页面
- 实现响应式设计
- 添加项目文档 