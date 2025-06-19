# CCIE培训网站 - Namecheap部署摘要

本文档简要总结了CCIE培训网站部署到Namecheap共享主机的步骤和注意事项。

## 部署方式

我们提供了两种部署方式：

1. **自动部署** - 使用GitHub Actions
2. **手动部署** - 使用Windows批处理脚本

## 自动部署 (GitHub Actions)

### 配置步骤

1. 在GitHub仓库中，转到 Settings > Secrets > Actions，添加以下密钥：
   - `FTP_SERVER`: 您的FTP服务器地址 (例如: ftp.yourdomain.com)
   - `FTP_USERNAME`: 您的FTP用户名
   - `FTP_PASSWORD`: 您的FTP密码
   - `FTP_DIRECTORY`: 目标目录 (通常是 `/public_html/`)

2. 将代码推送到main分支，GitHub Actions将自动运行部署流程。

### 确认部署状态

- 在GitHub仓库的Actions标签页中查看部署日志
- 访问您的网站确认部署是否成功

## 手动部署 (Windows)

### 部署步骤

1. 首次运行 `deploy.bat` 脚本，系统将创建配置文件 `deploy-config.txt`
2. 编辑配置文件，输入FTP服务器信息
3. 再次运行 `deploy.bat` 脚本进行部署
4. 脚本将自动：
   - 安装依赖
   - 构建项目
   - 导出静态文件
   - 创建必要的.htaccess文件
   - 通过FTP上传文件
   - 记录部署日志

### 注意事项

- 需要安装WinSCP并添加到PATH环境变量
- 如果没有WinSCP，脚本会准备好文件，但需要手动上传
- 每次部署会记录到 `docs/deployment_log.md` 文件中

## Namecheap主机配置

### 必要设置

1. **启用对.htaccess的支持**
   - 在Namecheap cPanel中，找到 "Apache处理器" 或类似选项
   - 确保已启用对.htaccess的支持

2. **配置域名DNS**
   - 确保您的域名指向Namecheap共享主机IP
   - 如果使用子域名，请正确设置子域名记录

## 测试部署

部署完成后，测试以下功能：

1. 网站各页面是否正常加载
2. 表单提交功能是否正常工作
3. 语言切换功能是否正常
4. 管理员页面是否可以访问并查看表单提交数据

## 日志记录

- 每次部署都会在 `docs/deployment_log.md` 中记录
- 自动部署记录包含提交哈希值、触发者和日期
- 手动部署记录包含日期和时间信息

## 故障排除

如遇部署问题：

1. 检查FTP凭据是否正确
2. 确认Namecheap主机上的PHP版本支持所需功能
3. 查看GitHub Actions日志以获取更详细的错误信息
4. 检查.htaccess文件是否已正确上传和配置

## 更新部署

更新网站内容时：

1. 自动部署：推送更改到main分支即可触发部署
2. 手动部署：重新运行 `deploy.bat` 脚本

详情请参阅完整的部署文档：[docs/namecheap_deployment.md](./namecheap_deployment.md) 