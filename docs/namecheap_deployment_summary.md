# CCIE培训网站部署方案总结

## 部署平台
Namecheap共享Web主机服务，作为静态网站托管平台。

## 部署方案特点

1. **以静态网站方式部署**
   - 使用Next.js的`export`功能生成纯静态HTML/CSS/JS文件
   - 不需要服务器端渲染，降低主机要求，提高加载速度

2. **自动化部署选项**
   - **GitHub Actions自动部署**: 代码推送到GitHub仓库后自动构建和部署
   - **本地批处理脚本**: 在本地构建后使用FTP自动上传到Namecheap服务器

3. **便于维护**
   - 部署日志自动记录
   - 简化的操作流程，无需手动执行复杂步骤

## 部署文件说明

| 文件路径 | 说明 |
|---------|------|
| `deploy.bat` | Windows本地部署批处理脚本，自动执行构建和FTP上传 |
| `.github/workflows/deploy.yml` | GitHub Actions工作流配置，用于自动部署 |
| `docs/deployment_log.md` | 部署历史记录文件 |
| `docs/namecheap_deployment.md` | 详细部署步骤和方案文档 |

## 部署前准备

1. **Namecheap账户设置**
   - 购买共享主机服务
   - 设置FTP账户和密码
   - 配置域名指向

2. **GitHub仓库设置**
   - 创建私有仓库
   - 添加Repository Secrets:
     - `FTP_SERVER`: Namecheap FTP服务器地址
     - `FTP_USERNAME`: FTP用户名
     - `FTP_PASSWORD`: FTP密码

## 使用方法

### 方法一：GitHub Actions自动部署

1. 将代码推送到GitHub仓库main分支
2. GitHub Actions自动触发部署流程
3. 查看Actions标签页中的部署状态和日志

### 方法二：本地批处理脚本部署

1. 编辑`deploy.bat`文件，填入正确的FTP服务器信息
2. 双击运行该批处理脚本
3. 等待脚本自动完成构建和部署

## 维护与监控

1. 定期查看`docs/deployment_log.md`了解部署历史
2. 使用Namecheap控制面板中的监控工具监控网站状态
3. 每次更新后记得在`docs/changelog.md`中记录更新内容

## 优势

1. **简单易用**: 无需复杂的服务器配置，适合小型团队或个人开发
2. **成本低廉**: Namecheap共享主机服务价格合理
3. **自动化程度高**: 减少手动操作，降低错误风险
4. **版本可追溯**: 自动记录部署历史，便于追踪问题 