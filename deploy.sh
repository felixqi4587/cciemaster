#!/bin/bash

# CCIE培训网站 - 静态部署脚本

echo "🚀 CCIE培训网站 - 静态部署工具"
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
echo "1) 构建静态文件 (推荐)"
echo "2) FTP自动上传"
echo "3) 生成压缩包"
echo "4) 本地预览"
echo "5) 清理构建文件"

read -p "请输入选择 (1-5): " choice

case $choice in
    1)
        echo "🏗️ 构建静态站点..."
        npm run build
        
        if [ $? -eq 0 ]; then
            echo "✅ 静态站点构建完成！"
            echo "📁 文件位置: ./out/"
            echo "📋 上传步骤："
            echo "1. 登录Namecheap cPanel"
            echo "2. 进入文件管理器 → public_html"
            echo "3. 上传 out 目录中的所有文件"
            echo ""
            echo "💡 提示：上传文件，不要上传out文件夹本身"
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
        npm run build
        
        if [ $? -eq 0 ]; then
            echo "🗜️ 创建压缩包..."
            cd out
            if command -v zip &> /dev/null; then
                zip -r ../cciemaster-static.zip .
                echo "✅ 压缩包已创建: cciemaster-static.zip"
            elif command -v tar &> /dev/null; then
                tar -czf ../cciemaster-static.tar.gz .
                echo "✅ 压缩包已创建: cciemaster-static.tar.gz"
            else
                echo "⚠️ 未找到压缩工具，请手动压缩 out 目录"
            fi
            cd ..
        fi
        ;;
    4)
        echo "🌐 本地预览..."
        npm run preview
        ;;
    5)
        echo "🧹 清理构建文件..."
        npm run clean
        echo "✅ 清理完成"
        ;;
    *)
        echo "❌ 无效选择"
        exit 1
        ;;
esac

echo ""
echo "🎉 操作完成！" 