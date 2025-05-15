# 环境搭建指南

本文档提供了在新电脑上搭建CCIE培训网站开发环境的详细步骤。

## 前提条件

在开始之前，确保您的系统已经安装了以下软件：

1. **Git** - 版本控制工具
   - Windows: 下载并安装 [Git for Windows](https://git-scm.com/download/win)
   - macOS: 通过 Homebrew 安装 `brew install git` 或下载 [安装包](https://git-scm.com/download/mac)
   - Linux: 使用包管理器安装，例如 `sudo apt-get install git`

2. **Node.js** - JavaScript 运行环境 (v14.0.0 或更高版本)
   - 所有平台: 从 [Node.js 官网](https://nodejs.org/) 下载安装包
   - 或使用 nvm 安装管理多个 Node.js 版本:
     - [nvm for Windows](https://github.com/coreybutler/nvm-windows)
     - [nvm for macOS/Linux](https://github.com/nvm-sh/nvm)

3. **代码编辑器** - 推荐使用 Visual Studio Code
   - 从 [VS Code 官网](https://code.visualstudio.com/) 下载安装

## 步骤一: 克隆项目

1. 打开终端或命令提示符
2. 导航到您想要保存项目的目录
3. 克隆项目仓库:
```bash
git clone https://github.com/felixqi4587/cciemaster.git
cd cciemaster
```

## 步骤二: 安装依赖

在项目根目录中执行:
```bash
npm install
```

这将安装 `package.json` 中定义的所有依赖项。

## 步骤三: 启动开发服务器

安装完依赖后，启动开发服务器:
```bash
npm run dev
```

服务器启动后，打开浏览器访问 [http://localhost:3000](http://localhost:3000) 查看网站。

## 步骤四: 配置 Git

配置 Git 用户信息:
```bash
git config --global user.name "您的姓名"
git config --global user.email "您的邮箱"
```

## 常见问题解决

### 依赖安装失败
如果遇到依赖安装问题，尝试以下方法:
1. 清除 npm 缓存: `npm cache clean --force`
2. 删除 node_modules 文件夹并重新安装: `rm -rf node_modules && npm install`
3. 确保 npm 版本最新: `npm install -g npm@latest`

### 端口已被占用
如果 3000 端口已被占用，可以修改 `package.json` 中的 dev 脚本，指定不同端口:
```json
"dev": "next dev -p 3001"
```

### Git 问题
如果遇到 Git 权限问题，确保您有正确的访问权限，或联系仓库管理员。

## 推荐的 VS Code 扩展

为提高开发效率，推荐安装以下扩展:
- ESLint: JavaScript 代码检查
- Prettier: 代码格式化
- JavaScript and TypeScript Nightly: JavaScript/TypeScript 支持
- GitLens: Git 增强功能
- IntelliSense for CSS class names: CSS 类名智能提示

## 更多资源

- [Next.js 文档](https://nextjs.org/docs)
- [React 文档](https://reactjs.org/docs)
- [Node.js 文档](https://nodejs.org/en/docs/)
- [npm 文档](https://docs.npmjs.com/) 