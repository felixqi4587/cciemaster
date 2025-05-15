# CCIE培训网站 Namecheap 部署指南

## 简介

本文档介绍如何将CCIE培训网站部署到Namecheap共享主机上，包括手动部署和自动化部署两种方式。

## 前提条件

- Namecheap 共享主机账户
- FTP访问凭证
- Node.js和npm安装在本地开发环境
- Git和GitHub账户

## 手动部署步骤

### 1. 构建生产版本

```bash
# 安装依赖
npm install

# 构建生产版本
npm run build

# 导出静态网站
npm run export
```

构建完成后，将在`out`目录生成静态网站文件。

### 2. 通过FTP上传

使用任意FTP客户端(如FileZilla)，将`out`目录中的所有文件上传到Namecheap主机的网站根目录。

- 主机: ftp.yourdomain.com
- 用户名: 你的Namecheap FTP用户名
- 密码: 你的Namecheap FTP密码
- 端口: 21

## 自动部署设置

为了简化部署流程，我们可以设置GitHub Actions来自动构建和部署网站。

### 1. 配置FTP部署密钥

在GitHub仓库中，导航到 Settings > Secrets > Actions，添加以下密钥:

- `FTP_SERVER`: 你的FTP服务器地址
- `FTP_USERNAME`: 你的FTP用户名
- `FTP_PASSWORD`: 你的FTP密码
- `FTP_DIRECTORY`: 目标目录 (通常是 `/public_html/` 或根据你的Namecheap设置)

### 2. 创建GitHub Actions配置文件

在项目根目录创建 `.github/workflows/deploy.yml` 文件:

```yaml
name: Deploy to Namecheap

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Export static files
        run: npm run export

      - name: Deploy via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.4
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./out/
          server-dir: ${{ secrets.FTP_DIRECTORY }}
          dangerous-clean-slate: true
```

### 3. 添加导出脚本

在 `package.json` 文件中添加 export 脚本:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "export": "next export"
}
```

### 4. 启用GitHub Actions

将上述更改推送到GitHub主分支，GitHub Actions将自动运行部署流程。

```bash
git add .
git commit -m "添加自动部署配置"
git push origin main
```

## 部署验证

1. 检查GitHub仓库中的Actions标签页，查看工作流是否成功运行
2. 访问你的网站(如 https://yourdomain.com)验证部署是否成功
3. 检查所有页面是否正常工作，特别是表单提交功能

## 故障排除

如果部署过程中遇到问题:

1. 检查GitHub Actions日志以查看详细错误信息
2. 确认FTP凭证是否正确
3. 检查Namecheap主机设置，确保支持所需的文件类型
4. 联系Namecheap支持以获取更多帮助

## 更新网站

对网站进行更改后，只需将更改推送到GitHub主分支，自动部署将处理其余工作:

```bash
git add .
git commit -m "更新网站内容"
git push origin main
```

GitHub Actions会自动构建新版本并部署到Namecheap主机。

## 安全注意事项

- 永远不要在代码中硬编码FTP凭证
- 定期更新GitHub Actions依赖
- 考虑在生产环境中实施内容安全策略(CSP)
- 为Namecheap账户启用两因素认证

## 资源链接

- [Namecheap帮助中心](https://www.namecheap.com/support/)
- [Next.js静态导出文档](https://nextjs.org/docs/advanced-features/static-html-export)
- [cPanel用户指南](https://docs.cpanel.net/cpanel/) 