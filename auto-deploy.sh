#!/bin/bash

# CCIE Master 网站自动部署脚本
# 功能：更新日期、Git提交和推送

echo ""
echo "🚀 CCIE Master 网站自动部署脚本"
echo "=================================="
echo ""

# 检查系统要求
echo "[INFO] 检查系统要求..."
if ! command -v git &> /dev/null; then
    echo "[ERROR] Git 未安装，请先安装 Git"
    exit 1
fi

echo "[SUCCESS] 系统要求检查通过"

# 更新文档中的日期
echo "[INFO] 更新README.md中的日期..."
current_date=$(date +"%Y年%m月%d日")

# 更新README.md中的日期
if [ -f "README.md" ]; then
    sed -i '' "s/最后更新.*：.*年.*月.*日/最后更新**：${current_date}/g" README.md
fi

# 更新其他文件中的日期
find . -name "*.html" -not -path "./.git/*" -exec sed -i '' "s/2024年/2025年/g" {} \;

echo "[SUCCESS] 日期更新完成"

# Git 操作
echo "[INFO] 执行 Git 操作..."

# 检查是否有变更
if git diff --quiet && git diff --staged --quiet; then
    echo "[INFO] 没有检测到文件变更"
else
    echo "[INFO] 检测到以下变更："
    git status --porcelain
    
    # 添加所有变更
    git add .
    
    # 生成提交信息
    commit_message="🎨 网站更新 - $(date +"%Y-%m-%d %H:%M")"
    
    # 提交变更
    git commit -m "$commit_message"
    
    # 推送到远程仓库
    echo "[INFO] 推送到远程仓库..."
    git push origin main
    
    if [ $? -eq 0 ]; then
        echo "[SUCCESS] Git 操作完成"
    else
        echo "[ERROR] Git 推送失败"
        exit 1
    fi
fi

echo ""
echo "[SUCCESS] 🎉 部署完成！"
echo ""
echo "" 