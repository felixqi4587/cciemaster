# 项目目录结构

本文档描述了CCIE培训网站的目录结构，帮助开发者快速了解项目组织。

## 顶级目录

```
cciemaster/
├── pages/             # 页面组件
├── components/        # 可复用组件
├── styles/            # 样式文件
├── public/            # 静态资源
├── docs/              # 项目文档
├── .next/             # Next.js构建文件（自动生成）
├── node_modules/      # 依赖库（自动生成）
├── .cursor/           # Cursor AI配置
├── .gitignore         # Git忽略文件配置
├── package.json       # 项目配置和依赖
├── package-lock.json  # 依赖锁定文件
└── README.md          # 项目说明
```

## pages 目录

```
pages/
├── _app.js            # 应用入口
├── index.js           # 首页
├── courses.js         # 课程页面  
├── about.js           # 关于我们
└── contact.js         # 联系页面
```

## styles 目录

```
styles/
├── globals.css        # 全局样式
├── Home.module.css    # 首页样式
├── Courses.module.css # 课程页面样式
├── About.module.css   # 关于我们页面样式
└── Contact.module.css # 联系页面样式
```

## docs 目录

```
docs/
├── development_guide.md  # 项目开发说明
├── setup_guide.md        # 环境搭建指南
├── changelog.md          # 版本更新历史
├── todo.md               # 待办事项
├── project_status.md     # 项目进度和计划
├── project_guidelines.md # 项目规范
└── project_structure.md  # 目录结构(本文档)
```

## .cursor 目录

```
.cursor/
└── rules/
    └── cciemaster.mdc    # 项目规则
```

## public 目录

```
public/
└── images/              # 图片资源
```

## components 目录

```
components/
```
目前尚未添加组件，将在未来开发中添加。 