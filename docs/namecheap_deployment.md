# Namecheap共享主机部署计划

## 部署步骤

1. **准备静态网站文件**
   - 运行 `npm run export` 命令生成静态网站文件
   - 导出的文件将位于 `out` 目录

2. **上传文件到Namecheap共享主机**
   - 登录Namecheap cPanel控制面板
   - 使用文件管理器或FTP客户端（如FileZilla）
   - 将`out`目录中的所有文件上传到网站根目录（通常是`public_html`）

3. **配置域名指向**
   - 在Namecheap控制面板中，确保域名指向正确的共享主机服务器
   - 检查DNS设置是否正确

4. **测试网站**
   - 在浏览器中访问您的网站域名，确认网站正常显示
   - 测试网站的各项功能

## 自动化部署方案

### 方案一：使用GitHub Actions自动部署到Namecheap

1. **设置GitHub仓库**
   - 将项目代码推送到GitHub仓库
   - 设置仓库密钥，包括Namecheap主机的FTP凭据

2. **创建GitHub Actions工作流文件**
   - 在项目根目录创建`.github/workflows/deploy.yml`文件
   - 配置工作流在每次推送到main分支时触发
   - 工作流包括：安装依赖、构建项目、将静态文件部署到Namecheap服务器

3. **GitHub Actions工作流示例**:
   ```yaml
   name: Deploy to Namecheap

   on:
     push:
       branches: [ main ]

   jobs:
     deploy:
       runs-on: ubuntu-latest
       
       steps:
       - uses: actions/checkout@v2
       
       - name: Setup Node.js
         uses: actions/setup-node@v2
         with:
           node-version: '16'
           
       - name: Install dependencies
         run: npm install
         
       - name: Build and export
         run: npm run export
         
       - name: Deploy to Namecheap
         uses: SamKirkland/FTP-Deploy-Action@4.3.0
         with:
           server: ${{ secrets.FTP_SERVER }}
           username: ${{ secrets.FTP_USERNAME }}
           password: ${{ secrets.FTP_PASSWORD }}
           local-dir: ./out/
           server-dir: /public_html/
   ```

### 方案二：使用CI/CD工具与FTP部署

1. **设置Jenkins或GitLab CI**
   - 配置CI/CD服务器
   - 创建构建任务，包括安装依赖、构建项目
   - 使用FTP任务部署到Namecheap服务器

2. **本地自动化脚本**
   - 创建本地部署脚本（如deploy.sh或deploy.bat）
   - 脚本包括：构建项目、FTP上传到Namecheap

3. **Windows批处理脚本示例**:
   ```bat
   @echo off
   echo === 开始构建网站 ===
   call npm run export
   
   echo === 开始上传文件 ===
   cd out
   
   echo 正在连接FTP服务器...
   echo open %FTP_SERVER% > ftpcmd.txt
   echo %FTP_USER%>> ftpcmd.txt
   echo %FTP_PASSWORD%>> ftpcmd.txt
   echo cd /public_html>> ftpcmd.txt
   echo binary>> ftpcmd.txt
   echo mput *>> ftpcmd.txt
   echo disconnect>> ftpcmd.txt
   echo bye>> ftpcmd.txt
   
   ftp -s:ftpcmd.txt
   del ftpcmd.txt
   
   echo === 部署完成 ===
   ```

## 维护注意事项

1. **备份**
   - 在每次部署前备份远程服务器上的文件
   - 在本地保留网站文件的版本历史

2. **监控**
   - 定期检查网站状态和性能
   - 设置监控工具，在网站出现问题时发送通知

3. **安全更新**
   - 定期更新依赖包
   - 检查并修复安全漏洞

4. **日志记录**
   - 保持部署日志，记录每次部署的内容和结果
   - 在docs/changelog.md中持续记录网站更新 