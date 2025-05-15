# CCIE培训网站开发指南

## 项目概述
这是一个用于CCIE培训的展示型网站，主要用于引流和展示培训信息。网站使用Next.js框架开发，提供响应式设计，适配各种设备。

## 环境配置
- Node.js (v14.0.0 或更高版本)
- npm (包管理器)

## 开发指南

### 克隆项目
```bash
git clone https://github.com/felixqi4587/cciemaster.git
cd cciemaster
```

### 安装依赖
```bash
npm install
```

### 运行开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
npm start
```

### 导出静态页面（如需部署到静态主机）
```bash
npm run export
```

## 项目结构
```
cciemaster/
├── pages/             # 页面组件
│   ├── _app.js        # 应用入口
│   ├── index.js       # 首页
│   ├── courses.js     # 课程页面  
│   ├── about.js       # 关于我们
│   └── contact.js     # 联系页面
├── styles/            # 样式文件
│   ├── globals.css    # 全局样式
│   ├── Home.module.css    # 首页样式
│   ├── Courses.module.css # 课程页面样式
│   ├── About.module.css   # 关于我们页面样式
│   └── Contact.module.css # 联系页面样式
├── components/        # 可复用组件
├── public/            # 静态资源
└── docs/              # 项目文档
```

## 开发进度

### 已完成
- [x] 项目初始化与基础架构
- [x] 首页设计与开发
- [x] 课程页面
- [x] 关于我们页面
- [x] 联系页面
- [x] 响应式布局适配

### 待完成
- [ ] SEO优化
- [ ] 添加更多课程内容
- [ ] 表单提交功能
- [ ] 性能优化
- [ ] 在线咨询功能
- [ ] 用户注册和登录功能（未来规划）

## Git操作规范
1. 不要直接在main分支操作
2. 创建新功能时使用feature分支: `git checkout -b feature/功能名称`
3. 修复问题时使用fix分支: `git checkout -b fix/问题描述`
4. 提交前先确保测试通过: `npm test`
5. 提交信息保持简洁明了，格式为: `类型: 简短描述`
   - 类型包括: feat(新功能), fix(修复), docs(文档), style(样式), refactor(重构), test(测试)
   - 例如: `feat: 添加课程预览功能`

## 常见问题解决
1. 如果遇到npm依赖问题，尝试删除node_modules文件夹并重新安装: `rm -rf node_modules && npm install`
2. 确保使用正确的Node.js版本，推荐使用nvm进行Node版本管理

## 参考资源
- [Next.js官方文档](https://nextjs.org/docs)
- [React官方文档](https://reactjs.org/docs/getting-started.html)
- [CSS Modules](https://github.com/css-modules/css-modules) 