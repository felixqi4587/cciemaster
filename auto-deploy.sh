#!/bin/bash

# CCIE Master 网站自动部署脚本
# 作者: CCIE培训团队
# 日期: 2025年6月19日

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查必要的工具
check_requirements() {
    log_info "检查系统要求..."
    
    if ! command -v git &> /dev/null; then
        log_error "Git 未安装，请先安装 Git"
        exit 1
    fi
    
    log_success "系统要求检查通过"
}

# 更新日期
update_dates() {
    log_info "更新文档中的日期..."
    
    local today=$(date '+%Y年%m月%d日')
    local today_en=$(date '+%Y-%m-%d')
    
    # 更新 CHANGELOG.md
    if [ -f "CHANGELOG.md" ]; then
        # 添加新的更新记录
        local temp_file=$(mktemp)
        echo "# 📋 更新日志" > "$temp_file"
        echo "" >> "$temp_file"
        echo "## [2.1.0] - $today_en" >> "$temp_file"
        echo "" >> "$temp_file"
        echo "### 🎨 设计更新" >> "$temp_file"
        echo "- **苹果风格设计**：采用苹果公司的设计语言" >> "$temp_file"
        echo "- **简化导航**：移除About Us页面，合并冗余内容" >> "$temp_file"
        echo "- **优化首页**：确保用户立即了解这是CCIE培训网站" >> "$temp_file"
        echo "- **响应式优化**：改进移动端体验" >> "$temp_file"
        echo "" >> "$temp_file"
        echo "### 🛠️ 技术改进" >> "$temp_file"
        echo "- **自动部署**：创建自动上传和更新脚本" >> "$temp_file"
        echo "- **代码优化**：清理冗余CSS和JavaScript" >> "$temp_file"
        echo "- **性能提升**：优化加载速度和用户体验" >> "$temp_file"
        echo "" >> "$temp_file"
        echo "---" >> "$temp_file"
        echo "" >> "$temp_file"
        
        # 保留原有内容（跳过第一行标题）
        tail -n +2 "CHANGELOG.md" >> "$temp_file"
        mv "$temp_file" "CHANGELOG.md"
    fi
    
    # 更新 README.md 中的最后更新时间
    if [ -f "README.md" ]; then
        sed -i '' "s/最后更新.*$/最后更新**：$today/" README.md
        sed -i '' "s/**版本.*$/**版本**：静态部署版 v2.1/" README.md
    fi
    
    # 更新 PROJECT_STATUS.md
    if [ -f "PROJECT_STATUS.md" ]; then
        sed -i '' "s/更新日期.*$/更新日期：** $today/" PROJECT_STATUS.md
        sed -i '' "s/最后优化.*$/最后优化：** $today/" PROJECT_STATUS.md
    fi
    
    log_success "日期更新完成"
}

# Git 操作
git_operations() {
    log_info "执行 Git 操作..."
    
    # 检查是否有变更
    if [ -z "$(git status --porcelain)" ]; then
        log_warning "没有检测到文件变更"
        return 0
    fi
    
    # 显示变更
    log_info "检测到以下变更："
    git status --short
    
    # 添加所有变更
    git add .
    
    # 提交变更
    local commit_message="🎨 苹果风格设计更新 - $(date '+%Y-%m-%d %H:%M')"
    git commit -m "$commit_message"
    
    # 推送到远程
    log_info "推送到远程仓库..."
    git push origin main
    
    log_success "Git 操作完成"
}

# FTP上传（可选）
ftp_upload() {
    log_info "检查 FTP 配置..."
    
    # 检查是否存在FTP配置文件
    if [ ! -f "ftp-config.conf" ]; then
        log_warning "未找到 FTP 配置文件，跳过自动上传"
        log_info "如需自动上传，请创建 ftp-config.conf 文件："
        echo "FTP_HOST=your-host.com"
        echo "FTP_USER=your-username"
        echo "FTP_PASS=your-password"
        echo "FTP_DIR=/public_html"
        return 0
    fi
    
    # 读取FTP配置
    source ftp-config.conf
    
    if [ -z "$FTP_HOST" ] || [ -z "$FTP_USER" ] || [ -z "$FTP_PASS" ]; then
        log_warning "FTP 配置不完整，跳过上传"
        return 0
    fi
    
    log_info "开始 FTP 上传..."
    
    # 使用lftp进行上传
    if command -v lftp &> /dev/null; then
        lftp -c "
        set ftp:ssl-allow no;
        open -u $FTP_USER,$FTP_PASS $FTP_HOST;
        lcd $(pwd);
        cd $FTP_DIR;
        mirror --reverse --delete --verbose --exclude-glob .git* --exclude-glob *.conf --exclude-glob *.sh;
        quit
        "
        log_success "FTP 上传完成"
    else
        log_warning "lftp 未安装，无法执行 FTP 上传"
        log_info "请安装 lftp: brew install lftp (macOS) 或 apt-get install lftp (Linux)"
    fi
}

# 生成部署报告
generate_report() {
    log_info "生成部署报告..."
    
    local report_file="deployment-report-$(date '+%Y%m%d-%H%M').txt"
    
    cat > "$report_file" << EOF
# CCIE Master 网站部署报告

**部署时间**: $(date '+%Y年%m月%d日 %H:%M:%S')
**操作人员**: $(whoami)
**Git分支**: $(git branch --show-current)
**最新提交**: $(git log -1 --pretty=format:"%h - %s (%an, %ar)")

## 文件统计
- 总文件数: $(find . -type f -not -path "./.git/*" | wc -l | tr -d ' ')
- HTML页面: $(find . -name "*.html" | wc -l | tr -d ' ')
- 项目大小: $(du -sh . | cut -f1)

## 部署状态
✅ 日期更新完成
✅ Git提交完成
✅ 代码推送完成
$([ -f "ftp-config.conf" ] && echo "✅ FTP上传完成" || echo "⚠️  FTP上传跳过（无配置）")

## 访问信息
- 本地预览: ./start.sh 或 python3 serve.py
- 生产环境: 根据您的域名配置

---
报告生成时间: $(date)
EOF
    
    log_success "部署报告已生成: $report_file"
}

# 主函数
main() {
    echo ""
    echo "🚀 CCIE Master 网站自动部署脚本"
    echo "=================================="
    echo ""
    
    check_requirements
    update_dates
    git_operations
    ftp_upload
    generate_report
    
    echo ""
    log_success "🎉 部署完成！"
    echo ""
    echo "📋 后续步骤："
    echo "1. 检查网站: ./start.sh"
    echo "2. 验证功能: 测试所有页面链接"
    echo "3. 性能测试: 检查加载速度"
    echo ""
}

# 脚本入口
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi 