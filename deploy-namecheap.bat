@echo off
echo ========================================
echo    CCIE培训网站 - Namecheap Node.js部署
echo ========================================
echo.

:: 设置颜色
color 0A

:: 检查Node.js环境
echo [1/6] 检查Node.js环境...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: 未找到Node.js，请先安装Node.js 16.0.0或更高版本
    pause
    exit /b 1
)

echo Node.js版本:
node --version
echo.

:: 安装依赖
echo [2/6] 安装项目依赖...
npm install
if errorlevel 1 (
    echo ERROR: 依赖安装失败
    pause
    exit /b 1
)
echo 依赖安装完成
echo.

:: 构建项目
echo [3/6] 构建生产版本...
npm run build
if errorlevel 1 (
    echo ERROR: 项目构建失败
    pause
    exit /b 1
)
echo 项目构建完成
echo.

:: 测试生产模式
echo [4/6] 测试生产模式（按Ctrl+C停止）...
echo 启动测试服务器，请在浏览器中访问 http://localhost:3000
echo 确认一切正常后，按 Ctrl+C 停止服务器并继续部署...
npm run production

:: 清理开发依赖（可选）
echo.
echo [5/6] 是否清理开发依赖以减小上传文件大小？ (y/n)
set /p cleanup="输入选择: "
if /i "%cleanup%"=="y" (
    echo 清理开发依赖...
    npm prune --production
    echo 开发依赖已清理
) else (
    echo 保留所有依赖
)
echo.

:: 准备部署文件
echo [6/6] 准备部署文件...
echo.
echo 需要上传到Namecheap的文件：
echo - package.json
echo - server.js  
echo - next.config.js
echo - .next/ 目录（构建生成）
echo - pages/ 目录
echo - public/ 目录
echo - styles/ 目录
echo - components/ 目录
echo - src/ 目录（如果存在）
echo.

echo ========================================
echo 部署准备完成！
echo ========================================
echo.
echo 接下来的步骤：
echo 1. 登录Namecheap cPanel
echo 2. 进入Node.js应用管理
echo 3. 创建新的Node.js应用
echo 4. 上传上述文件到应用目录
echo 5. 在应用管理中运行: npm install
echo 6. 启动应用
echo.
echo 详细部署说明请参考: docs/namecheap_nodejs_deployment.md
echo.

pause 