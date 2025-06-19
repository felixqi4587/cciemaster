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
        'Enterprise Infrastructure': 3999,  // CCIE企业基础设施
        'Security': 4299,                   // CCIE安全
        'Data Center': 4199,                // CCIE数据中心
        'CCDE Design Expert': 5999,         // CCDE设计专家
        'Collaboration': 3899,              // CCIE协作（如果需要）
        'Service Provider': 4099,           // CCIE服务提供商（如果需要）
        'Enterprise Wireless': 3799,        // CCIE企业无线（如果需要）
        'DevNet Expert': 4499               // DevNet专家（如果需要）
    },
    
    // ========================================
    // 12个月促销主题配置
    // ========================================
    promotions: {
        
        // 一月 - 新年决心月
        1: {
            theme: "New Year Resolution",
            title: "New Year, New Career Special",
            emoji: "🎊",
            discount: 25,                    // 25% 折扣
            description: "Start 2025 with your CCIE certification goal",
            urgencyText: "New Year enrollment ends soon",
            holidayContext: "新年决心，职业提升的最佳时机"
        },
        
        // 二月 - 情人节/总统日
        2: {
            theme: "Valentine's & Presidents Day",
            title: "Love Your Career Special",
            emoji: "💝",
            discount: 20,                    // 20% 折扣
            description: "Fall in love with your IT career this February",
            urgencyText: "Valentine's special pricing ends soon",
            holidayContext: "情人节表达对职业的热爱"
        },
        
        // 三月 - 春分/女性历史月
        3: {
            theme: "Spring Forward",
            title: "Spring Career Launch",
            emoji: "🌸",
            discount: 22,                    // 22% 折扣
            description: "Spring into your CCIE certification journey",
            urgencyText: "Spring enrollment deadline approaching",
            holidayContext: "春天来临，职业生涯新开始"
        },
        
        // 四月 - 复活节/地球日
        4: {
            theme: "Easter & Earth Day",
            title: "Fresh Start Special",
            emoji: "🐣",
            discount: 18,                    // 18% 折扣
            description: "Celebrate new beginnings with CCIE training",
            urgencyText: "Spring special pricing ends this month",
            holidayContext: "复活节新生，职业技能重生"
        },
        
        // 五月 - 母亲节/阵亡将士纪念日
        5: {
            theme: "Mother's Day & Memorial Day",
            title: "Honor & Achievement Special",
            emoji: "🌺",
            discount: 23,                    // 23% 折扣
            description: "Honor your career goals this Memorial Day",
            urgencyText: "Memorial Day weekend special ends soon",
            holidayContext: "向职业目标致敬的特殊月份"
        },
        
        // 六月 - 父亲节/毕业季
        6: {
            theme: "Father's Day & Graduation",
            title: "Father's Day Career Gift",
            emoji: "👔",
            discount: 21,                    // 21% 折扣
            description: "The best gift for dads: career advancement",
            urgencyText: "Father's Day special pricing ends soon",
            holidayContext: "父亲节，给爸爸最好的职业礼物"
        },
        
        // 七月 - 独立日（美国国庆）
        7: {
            theme: "Independence Day",
            title: "Independence Day Freedom Special",
            emoji: "🇺🇸",
            discount: 30,                    // 30% 折扣 - 最高折扣之一
            description: "Declare independence from career limitations",
            urgencyText: "July 4th special ends soon",
            holidayContext: "独立日，摆脱职业限制获得自由"
        },
        
        // 八月 - 返校季
        8: {
            theme: "Back to School",
            title: "Back to School Special",
            emoji: "🎒",
            discount: 27,                    // 27% 折扣
            description: "Back to learning, forward to success",
            urgencyText: "Back-to-school pricing ends this month",
            holidayContext: "返校季，重新学习迈向成功"
        },
        
        // 九月 - 劳动节
        9: {
            theme: "Labor Day",
            title: "Labor Day Career Investment",
            emoji: "⚡",
            discount: 24,                    // 24% 折扣
            description: "Invest in your career this Labor Day",
            urgencyText: "Labor Day special pricing ends soon",
            holidayContext: "劳动节，为职业发展投资"
        },
        
        // 十月 - 万圣节/网络安全意识月
        10: {
            theme: "Cybersecurity Awareness Month",
            title: "Cybersecurity Month Special",
            emoji: "🔒",
            discount: 26,                    // 26% 折扣
            description: "October is National Cybersecurity Awareness Month",
            urgencyText: "Cybersecurity month special ends soon",
            holidayContext: "网络安全意识月，提升安全技能"
        },
        
        // 十一月 - 感恩节/黑色星期五
        11: {
            theme: "Thanksgiving & Black Friday",
            title: "Black Friday Mega Deal",
            emoji: "🦃",
            discount: 35,                    // 35% 折扣 - 全年最高折扣
            description: "Be thankful for this exclusive Black Friday offer",
            urgencyText: "Black Friday special ends soon",
            holidayContext: "黑色星期五，全年最大优惠"
        },
        
        // 十二月 - 圣诞节/新年准备
        12: {
            theme: "Holiday Season",
            title: "Holiday Career Gift Special",
            emoji: "🎄",
            discount: 28,                    // 28% 折扣
            description: "Give yourself the gift of career advancement",
            urgencyText: "Holiday special ends before New Year",
            holidayContext: "节日季，给自己最好的职业礼物"
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
        enableAnimations: true
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

*/ 