@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo 🚀 CCIE培训网站 - Namecheap部署工具
echo ================================

rem 检查Node.js环境
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ 请先安装Node.js
    pause
    exit /b 1
)

rem 检查npm
where npm >nul 2>nul
if errorlevel 1 (
    echo ❌ 请先安装npm
    pause
    exit /b 1
)

rem 安装依赖
echo 📦 安装依赖...
call npm install
if errorlevel 1 (
    echo ❌ 依赖安装失败
    pause
    exit /b 1
)

rem 选择部署方式
echo.
echo 请选择部署方式：
echo 1) 静态站点部署 (推荐，最稳定)
echo 2) FTP自动上传
echo 3) 生成压缩包手动上传
echo 4) 本地预览
echo.

set /p choice="请输入选择 (1-4): "

if "%choice%"=="1" goto static_deploy
if "%choice%"=="2" goto ftp_deploy
if "%choice%"=="3" goto zip_deploy
if "%choice%"=="4" goto local_preview
goto invalid_choice

:static_deploy
echo 🏗️ 构建静态站点...
call npm run build:static
if errorlevel 1 (
    echo ❌ 构建失败
    pause
    exit /b 1
)

echo ✅ 静态站点构建完成！
echo 📁 文件位置: .\out\
echo 📋 请手动上传 'out' 目录中的所有文件到Namecheap的 public_html 目录
echo.
echo 💡 上传步骤：
echo 1. 登录Namecheap cPanel
echo 2. 进入文件管理器
echo 3. 进入 public_html 目录
echo 4. 上传 out 目录中的所有文件
echo 5. 等待上传完成
echo.
echo 📂 正在打开输出目录...
start "" "out"
goto end

:ftp_deploy
echo 📡 FTP自动上传...
call npm run deploy:namecheap
goto end

:zip_deploy
echo 📦 生成部署压缩包...
call npm run build:static
if errorlevel 1 (
    echo ❌ 构建失败
    pause
    exit /b 1
)

echo 🗜️ 创建压缩包...
cd out
where powershell >nul 2>nul
if not errorlevel 1 (
    powershell -command "Compress-Archive -Path * -DestinationPath ..\cciemaster-deploy.zip -Force"
    echo ✅ 压缩包已创建: cciemaster-deploy.zip
) else (
    echo ⚠️ 未找到PowerShell，请手动压缩 out 目录
)
cd ..
echo 📋 请上传压缩包到Namecheap并解压到 public_html 目录
goto end

:local_preview
echo 🌐 启动本地预览...
call npm run build:static
if errorlevel 1 (
    echo ❌ 构建失败
    pause
    exit /b 1
)

echo ✅ 静态站点已构建
echo 🌐 正在打开预览...
start "" "out\index.html"
goto end

:invalid_choice
echo ❌ 无效选择
pause
exit /b 1

:end
echo.
echo 🎉 部署完成！
echo 🌐 网站地址: https://yourdomain.com
echo.
echo 📚 部署说明文档: docs/namecheap_deployment.md
pause 