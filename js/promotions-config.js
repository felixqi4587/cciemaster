/**
 * CCIE Master 月度促销配置文件
 * 
 * 此文件包含所有促销活动的配置，方便统一管理和修改
 * 
 * 使用说明：
 * 1. 修改 basePrices 来调整课程基础价格
 * 2. 修改 promotions 中的 discount 来调整折扣百分比
 * 3. 每个月的主题和文案都可以在这里修改
 * 4. 支持emoji表情和自定义描述
 */

// 全局促销配置对象
window.CCIE_PROMOTIONS_CONFIG = {
    
    // ========================================
    // 课程基础价格配置（美元）
    // ========================================
    basePrices: {
        'Enterprise Infrastructure': 3999,  // CCIE EI
        'Security': 4299,                   // CCIE Lab 安全
        'Service Provider': 4499,           // CCIE SP
        'DevNet Expert': 4799               // DevNet专家
    },
    
    // ========================================
    // 12个月促销主题配置
    // ========================================
    promotions: {
        
        // 一月 - 新年决心月
        1: {
            theme: "New Year",
            title: "New Year, New Career Special",
            emoji: "🎊",
            discount: 0.35,                    // 35% 折扣
            discountAmount: "$1,400",        // 具体折扣金额（基于平均价格）
            holidayName: "New Year & Fresh Start",
            holidayPeriod: "New Year Month & Career Fresh Start",
            holidayContext: "New Year, new career goals - start your CCIE journey",
            discountDisplay: "New Year Special: Save 35% (approx. $1,400)"
        },
        
        // 二月 - 情人节/总统日
        2: {
            theme: "Valentine's Day",
            title: "Love Your Career Special",
            emoji: "💝",
            discount: 0.33,                    // 33% 折扣
            discountAmount: "$1,320",          // 具体折扣金额
            holidayName: "Valentine's Day & Love Learning",
            holidayPeriod: "Valentine's Day & February Learning Month",
            holidayContext: "Valentine's Day - fall in love with technology",
            discountDisplay: "Valentine's Special: Save 33% (approx. $1,320)"
        },
        
        // 三月 - 春分/女性历史月
        3: {
            theme: "Spring Break",
            title: "Spring Career Launch",
            emoji: "🌸",
            discount: 0.37,                    // 37% 折扣
            discountAmount: "$1,480",          // 具体折扣金额
            holidayName: "Spring Break & Career Bloom",
            holidayPeriod: "Spring Break & Career Growth Season",
            holidayContext: "Spring Break - let your career bloom",
            discountDisplay: "Spring Special: Save 37% (approx. $1,480)"
        },
        
        // 四月 - 复活节/地球日
        4: {
            theme: "Easter",
            title: "Fresh Start Special",
            emoji: "🐰",
            discount: 0.35,                    // 35% 折扣
            discountAmount: "$1,400",          // 具体折扣金额
            holidayName: "Easter & New Beginnings",
            holidayPeriod: "Easter Season & New Career Beginnings",
            holidayContext: "Easter - time for new beginnings in your career",
            discountDisplay: "Easter Special: Save 35% (approx. $1,400)"
        },
        
        // 五月 - 母亲节/阵亡将士纪念日
        5: {
            theme: "Mother's Day",
            title: "Honor & Achievement Special",
            emoji: "🌹",
            discount: 0.34,                    // 34% 折扣
            discountAmount: "$1,360",          // 具体折扣金额
            holidayName: "Mother's Day & Career Growth",
            holidayPeriod: "Mother's Day & May Career Month",
            holidayContext: "Mother's Day - invest in your professional growth",
            discountDisplay: "Mother's Day Special: Save 34% (approx. $1,360)"
        },
        
        // 六月 - 父亲节/毕业季
        6: {
            theme: "Father's Day",
            title: "Father's Day Career Gift",
            emoji: "👔",
            discount: 0.36,                    // 36% 折扣
            discountAmount: "$1,440",          // 具体折扣金额
            holidayName: "Father's Day & Graduation",
            holidayPeriod: "Father's Day & June Graduation Season",
            holidayContext: "Father's Day - the best career gift for dad",
            discountDisplay: "Father's Day Special: Save 36% (approx. $1,440)"
        },
        
        // 七月 - 独立日（美国国庆）
        7: {
            theme: "Independence Day",
            title: "Independence Day Freedom Special",
            emoji: "🇺🇸",
            discount: 0.39,                    // 39% 折扣 - 最高折扣之一
            discountAmount: "$1,560",        // 具体折扣金额
            holidayName: "Independence Day & Summer Learning",
            holidayPeriod: "Independence Day & Summer Intensive",
            holidayContext: "Independence Day - achieve career independence",
            discountDisplay: "July 4th Special: Save 39% (approx. $1,560)"
        },
        
        // 八月 - 返校季
        8: {
            theme: "Back to School",
            title: "Back to School Special",
            emoji: "🎒",
            discount: 0.38,                    // 38% 折扣
            discountAmount: "$1,520",        // 具体折扣金额
            holidayName: "Back to School & Professional Development",
            holidayPeriod: "Back to School & August Learning Month",
            holidayContext: "Back to School - advance your professional education",
            discountDisplay: "Back to School Special: Save 38% (approx. $1,520)"
        },
        
        // 九月 - 劳动节
        9: {
            theme: "Labor Day",
            title: "Labor Day Career Investment",
            emoji: "👷",
            discount: 0.35,                    // 35% 折扣
            discountAmount: "$1,400",          // 具体折扣金额
            holidayName: "Labor Day & Career Advancement",
            holidayPeriod: "Labor Day & September Career Month",
            holidayContext: "Labor Day - elevate your professional skills",
            discountDisplay: "Labor Day Special: Save 35% (approx. $1,400)"
        },
        
        // 十月 - 万圣节/网络安全意识月
        10: {
            theme: "Halloween",
            title: "Cybersecurity Month Special",
            emoji: "🎃",
            discount: 0.41,                    // 41% 折扣
            discountAmount: "$1,640",        // 具体折扣金额
            holidayName: "Halloween & Spooky Good Deals",
            holidayPeriod: "Halloween Season & October Specials",
            holidayContext: "Halloween - scary good career opportunities",
            discountDisplay: "Halloween Special: Save 41% (approx. $1,640)"
        },
        
        // 十一月 - 感恩节/黑色星期五
        11: {
            theme: "Thanksgiving",
            title: "Black Friday Mega Deal",
            emoji: "🦃",
            discount: 0.45,                    // 45% 折扣 - 全年最高折扣
            discountAmount: "$1,800",        // 具体折扣金额
            holidayName: "Thanksgiving & Black Friday",
            holidayPeriod: "Thanksgiving & Black Friday Mega Sale",
            holidayContext: "Thanksgiving & Black Friday - biggest savings of the year",
            discountDisplay: "Black Friday Special: Save 45% (approx. $1,800)"
        },
        
        // 十二月 - 圣诞节/新年准备
        12: {
            theme: "Christmas",
            title: "Holiday Career Gift Special",
            emoji: "🎄",
            discount: 0.40,                    // 40% 折扣
            discountAmount: "$1,600",        // 具体折扣金额
            holidayName: "Christmas & Year-End Special",
            holidayPeriod: "Christmas Season & Year-End Celebration",
            holidayContext: "Christmas - give yourself the gift of career advancement",
            discountDisplay: "Christmas Special: Save 40% (approx. $1,600)"
        }
    },
    
    // ========================================
    // 特殊促销配置（可选）
    // ========================================
    specialPromotions: {
        // 可以添加特殊日期的促销，如公司周年庆等
        // format: 'YYYY-MM-DD': { ... }
    },
    
    // ========================================
    // 全局设置
    // ========================================
    settings: {
        // 是否启用促销系统
        enabled: true,
        
        // 默认折扣（如果当月没有配置）
        defaultDiscount: 15,
        
        // 促销倒计时显示天数阈值
        countdownThreshold: 7,
        
        // 价格更新间隔（毫秒）
        updateInterval: 60000,
        
        // 是否显示原价
        showOriginalPrice: true,
        
        // 是否启用动画效果
        enableAnimations: true,
        
        // 是否显示节日信息
        showHolidayInfo: true,
        
        // 是否显示具体折扣金额
        showDiscountAmount: true
    }
};

// ========================================
// 快速修改指南
// ========================================
/*

1. 修改所有课程价格：
   编辑 basePrices 对象中的价格

2. 修改某个月的折扣：
   编辑 promotions[月份].discount 的值

3. 修改促销文案：
   编辑 promotions[月份].title 和 description

4. 添加新课程：
   在 basePrices 中添加新的课程名称和价格

5. 临时禁用促销：
   设置 settings.enabled = false

6. 修改默认折扣：
   修改 settings.defaultDiscount 的值

7. 显示/隐藏节日信息：
   修改 settings.showHolidayInfo 的值

8. 显示/隐藏具体折扣金额：
   修改 settings.showDiscountAmount 的值

*/ 