#!/bin/bash

# CCIE培训网站 - Namecheap部署脚本
# 支持多种部署方式

echo "🚀 CCIE培训网站 - Namecheap部署工具"
echo "================================"

# 检查Node.js环境
if ! command -v node &> /dev/null; then
    echo "❌ 请先安装Node.js"
    exit 1
fi

# 检查npm
if ! command -v npm &> /dev/null; then
    echo "❌ 请先安装npm"
    exit 1
fi

# 安装依赖
echo "📦 安装依赖..."
npm install

# 选择部署方式
echo ""
echo "请选择部署方式："
echo "1) 静态站点部署 (推荐，最稳定)"
echo "2) FTP自动上传"
echo "3) 生成压缩包手动上传"
echo "4) 本地预览"

read -p "请输入选择 (1-4): " choice

case $choice in
    1)
        echo "🏗️ 构建静态站点..."
        if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
            npm run build:static
        else
            npm run build:static-unix
        fi
        
        if [ $? -eq 0 ]; then
            echo "✅ 静态站点构建完成！"
            echo "📁 文件位置: ./out/"
            echo "📋 请手动上传 'out' 目录中的所有文件到Namecheap的 public_html 目录"
            echo ""
            echo "💡 上传步骤："
            echo "1. 登录Namecheap cPanel"
            echo "2. 进入文件管理器"
            echo "3. 进入 public_html 目录"
            echo "4. 上传 out 目录中的所有文件"
        else
            echo "❌ 构建失败"
            exit 1
        fi
        ;;
    2)
        echo "📡 FTP自动上传..."
        npm run deploy:namecheap
        ;;
    3)
        echo "📦 生成部署压缩包..."
        if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
            npm run build:static
        else
            npm run build:static-unix
        fi
        
        if [ $? -eq 0 ]; then
            echo "🗜️ 创建压缩包..."
            cd out
            if command -v zip &> /dev/null; then
                zip -r ../cciemaster-deploy.zip .
                echo "✅ 压缩包已创建: cciemaster-deploy.zip"
            elif command -v tar &> /dev/null; then
                tar -czf ../cciemaster-deploy.tar.gz .
                echo "✅ 压缩包已创建: cciemaster-deploy.tar.gz"
            else
                echo "⚠️ 未找到压缩工具，请手动压缩 out 目录"
            fi
            cd ..
            echo "📋 请上传压缩包到Namecheap并解压到 public_html 目录"
        fi
        ;;
    4)
        echo "🌐 启动本地预览..."
        if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
            npm run build:static
        else
            npm run build:static-unix
        fi
        
        if [ $? -eq 0 ]; then
            echo "✅ 静态站点已构建"
            echo "🌐 使用浏览器打开 out/index.html 预览"
            
            # 尝试自动打开浏览器
            if [[ "$OSTYPE" == "darwin"* ]]; then
                open out/index.html
            elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
                xdg-open out/index.html
            elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
                start out/index.html
            fi
        fi
        ;;
    *)
        echo "❌ 无效选择"
        exit 1
        ;;
esac

echo ""
echo "🎉 部署完成！"
echo "🌐 网站地址: https://yourdomain.com" 