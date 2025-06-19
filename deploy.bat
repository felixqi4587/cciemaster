@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo 🚀 CCIE培训网站 - 静态部署工具
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
echo 1) 构建静态文件 (推荐)
echo 2) FTP自动上传
echo 3) 生成压缩包
echo 4) 本地预览
echo 5) 清理构建文件
echo.

set /p choice="请输入选择 (1-5): "

if "%choice%"=="1" goto static_build
if "%choice%"=="2" goto ftp_deploy
if "%choice%"=="3" goto zip_deploy
if "%choice%"=="4" goto local_preview
if "%choice%"=="5" goto clean_build
goto invalid_choice

:static_build
echo 🏗️ 构建静态站点...
call npm run build:windows
if errorlevel 1 (
    echo ❌ 构建失败
    pause
    exit /b 1
)

echo ✅ 静态站点构建完成！
echo 📁 文件位置: .\out\
echo 📋 上传步骤：
echo 1. 登录Namecheap cPanel
echo 2. 进入文件管理器 → public_html
echo 3. 上传 out 目录中的所有文件
echo.
echo 💡 提示：上传文件，不要上传out文件夹本身
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
call npm run build:windows
if errorlevel 1 (
    echo ❌ 构建失败
    pause
    exit /b 1
)

echo 🗜️ 创建压缩包...
cd out
where powershell >nul 2>nul
if not errorlevel 1 (
    powershell -command "Compress-Archive -Path * -DestinationPath ..\cciemaster-static.zip -Force"
    echo ✅ 压缩包已创建: cciemaster-static.zip
) else (
    echo ⚠️ 未找到PowerShell，请手动压缩 out 目录
)
cd ..
goto end

:local_preview
echo 🌐 本地预览...
call npm run preview
goto end

:clean_build
echo 🧹 清理构建文件...
call npm run clean:windows
echo ✅ 清理完成
goto end

:invalid_choice
echo ❌ 无效选择
pause
exit /b 1

:end
echo.
echo 🎉 操作完成！
echo.
pause 