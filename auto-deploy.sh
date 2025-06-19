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
echo "[INFO] 更新文档中的日期..."
current_date=$(date +"%Y年%m月%d日")

# 更新README.md中的日期
if [ -f "README.md" ]; then
    sed -i '' "s/最后更新.*：.*年.*月.*日/最后更新**：${current_date}/g" README.md
fi

# 更新其他文档中的日期
find . -name "*.md" -not -path "./.git/*" -exec sed -i '' "s/2024年/2025年/g" {} \;
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

# 生成部署报告
echo "[INFO] 生成部署报告..."
report_file="deployment-report-$(date +%Y%m%d-%H%M).txt"

cat > "$report_file" << EOF
CCIE Master 网站部署报告
========================
部署时间: $(date)
部署方式: Git Push
提交信息: $commit_message

文件统计:
$(find . -name "*.html" -not -path "./.git/*" | wc -l | tr -d ' ') 个 HTML 文件
$(find . -name "*.md" -not -path "./.git/*" | wc -l | tr -d ' ') 个 Markdown 文件
$(find . -name "*.sh" -not -path "./.git/*" | wc -l | tr -d ' ') 个 脚本文件

Git 状态:
$(git log --oneline -5)

部署状态: ✅ 成功
EOF

echo "[SUCCESS] 部署报告已生成: $report_file"

echo ""
echo "[SUCCESS] 🎉 部署完成！"
echo ""
echo "📋 后续步骤："
echo "1. 检查网站: ./start.sh"
echo "2. 验证功能: 测试所有页面链接"
echo "3. 远端更新: 在您的主机上执行 git pull 更新"
echo "" 