#!/bin/bash

echo "🚀 CCIE培训网站本地预览"
echo "======================="

# 检查Python
if command -v python3 &> /dev/null; then
    echo "✅ 使用Python3启动本地服务器..."
    python3 serve.py
elif command -v python &> /dev/null; then
    echo "✅ 使用Python启动本地服务器..."
    python serve.py
else
    echo "❌ 未找到Python，使用其他方法..."
    echo ""
    echo "🌐 替代方案："
    echo "1. 直接打开 index.html 文件"
    echo "2. 使用其他HTTP服务器："
    echo "   - PHP: php -S localhost:8000"
    echo "   - Node.js: npx serve ."
    echo "   - Ruby: ruby -run -ehttpd . -p8000"
    echo ""
    
    # 尝试直接打开文件
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "🍎 正在用Safari打开..."
        open index.html
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        echo "🐧 正在用默认浏览器打开..."
        xdg-open index.html
    else
        echo "💻 请手动打开 index.html 文件"
    fi
fi 