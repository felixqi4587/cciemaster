# Namecheap Node.js 503错误故障排除指南

## 🚨 Error 503 Service Unavailable 解决方案

### 🔍 **诊断步骤**

#### **第1步：检查应用日志**
1. 登录Namecheap cPanel
2. 进入"Node.js应用管理"
3. 选择您的应用
4. 点击"日志"查看详细错误信息

#### **第2步：验证文件上传**
确保以下关键文件已正确上传：
```
必需文件清单：
✅ package.json
✅ server.js 或 app.js
✅ next.config.js
✅ .next/ 目录（构建后生成）
✅ pages/ 目录
✅ public/ 目录
✅ styles/ 目录
✅ components/ 目录
```

### 🛠️ **常见问题解决方案**

#### **问题1：依赖安装失败**
```bash
错误：npm install failed
```
**解决方案：**
1. 在Node.js应用管理中点击"包管理"
2. 点击"运行脚本"
3. 运行：`npm install --production`
4. 等待安装完成后重启应用

#### **问题2：.next目录缺失**
```bash
错误：Cannot find module '.next'
```
**解决方案：**
1. 确保已运行本地构建：`npm run build`
2. 上传整个`.next`目录到服务器
3. 或在服务器上运行：`npm run build`

#### **问题3：端口冲突**
```bash
错误：EADDRINUSE - Port already in use
```
**解决方案：**
1. 检查环境变量PORT设置
2. 确保未运行多个相同应用实例
3. 重启Node.js应用

#### **问题4：内存不足**
```bash
错误：JavaScript heap out of memory
```
**解决方案：**
1. 优化Next.js配置
2. 清理开发依赖：`npm prune --production`
3. 考虑升级托管方案

### 🔧 **调试模式启动**

#### **使用调试启动文件**
我们提供了`app.js`调试文件，包含详细的启动信息：

1. **修改启动文件**为`app.js`
2. **重启应用**
3. **查看日志**了解具体启动过程

#### **预期的正常日志输出：**
```
=== CCIE培训网站启动调试 ===
Node.js版本: v16.20.0
当前目录: /home/username/public_html
环境变量PORT: 3000
环境变量NODE_ENV: production
✅ Next.js模块加载成功
启动模式: 生产
监听地址: 0.0.0.0:3000
正在准备Next.js应用...
✅ Next.js应用准备完成
✅ 服务器启动成功！
🌐 访问地址: http://0.0.0.0:3000
=== 启动完成 ===
```

### ⚙️ **配置检查清单**

#### **Node.js应用配置**
```
应用名称: cciemaster
Node.js版本: 16.0.0+ ✅
应用模式: 生产模式 ✅
启动文件: app.js 或 server.js ✅
应用根目录: /public_html/[项目目录] ✅
```

#### **环境变量设置**
```bash
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
```

#### **package.json检查**
```json
{
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "build": "next build"
  },
  "engines": {
    "node": ">=16.0.0"
  }
}
```

### 🚀 **逐步重新部署**

如果问题持续，请按以下步骤重新部署：

#### **第1步：清理当前部署**
1. 停止Node.js应用
2. 删除应用目录中的文件
3. 重新创建Node.js应用

#### **第2步：重新上传文件**
```bash
# 本地准备
npm install
npm run build

# 上传文件列表（按顺序）
1. package.json
2. app.js
3. next.config.js
4. .next/ 目录
5. pages/ 目录
6. public/ 目录
7. styles/ 目录
8. components/ 目录
```

#### **第3步：服务器端配置**
1. 在应用管理中点击"包管理"
2. 运行：`npm install --production`
3. 设置启动文件为：`app.js`
4. 启动应用

#### **第4步：验证启动**
1. 检查日志是否显示启动成功
2. 访问网站URL
3. 测试主要页面功能

### 🆘 **紧急回退方案**

如果Node.js部署持续失败，可以临时使用静态部署：

#### **快速静态部署**
```bash
# 本地生成静态文件
npm run export

# 上传out目录内容到public_html
上传 out/* 到 /public_html/
```

这样可以确保网站立即可用，然后再解决Node.js问题。

### 📞 **获取支持**

#### **收集问题信息**
在联系支持前，请收集：
1. 完整的错误日志
2. Node.js版本信息
3. 应用配置截图
4. 文件上传清单

#### **联系渠道**
1. **Namecheap技术支持**：通过工单系统
2. **项目仓库**：https://github.com/felixqi4587/cciemaster/issues
3. **文档参考**：本项目docs目录

### 💡 **预防措施**

#### **本地测试**
每次部署前务必本地测试：
```bash
npm install
npm run build
npm run production  # 测试生产模式
```

#### **分阶段部署**
1. 先测试基础Node.js功能
2. 再添加Next.js功能
3. 最后优化性能配置

#### **监控设置**
- 启用应用自动重启
- 设置内存和CPU监控
- 定期检查应用状态

---

*更新时间：2024年12月19日*
*适用于：Namecheap Node.js托管服务故障排除* 