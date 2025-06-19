# 联系表单实现指南

## 🎯 目标
让网站的"Send Us a Message"表单能够真正发送邮件到你的邮箱 `cciemasternode@gmail.com`

## 🚀 方案1: Formspree (推荐 - 最简单)

### 特点
- ✅ 免费版支持每月50次提交
- ✅ 无需后端代码
- ✅ 自动发送到邮箱
- ✅ 防垃圾邮件保护
- ✅ 5分钟内完成设置

### 设置步骤

#### 1. 注册Formspree账户
1. 访问 [https://formspree.io](https://formspree.io)
2. 点击"Get Started"
3. 使用你的邮箱 `cciemasternode@gmail.com` 注册

#### 2. 创建表单
1. 登录后点击"New Form"
2. 输入表单名称：`CCIE Master Contact Form`
3. 设置接收邮箱：`cciemasternode@gmail.com`
4. 复制生成的Form ID (格式如: `xpzgkqnw`)

#### 3. 更新网站代码
在 `contact/index.html` 中找到这一行：
```html
<form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

将 `YOUR_FORM_ID` 替换为你的实际Form ID：
```html
<form id="contactForm" action="https://formspree.io/f/xpzgkqnw" method="POST">
```

#### 4. 测试表单
1. 部署网站更新
2. 访问联系页面
3. 填写并提交表单
4. 检查邮箱是否收到邮件

### 邮件内容示例
你将收到类似这样的邮件：
```
Subject: New Contact Form Submission - CCIE Master

From: John Doe <john@example.com>
Phone: +1-555-0123
Experience: Intermediate (2-5 years)
Course Interest: CCIE Security
Timeline: Within 1 month
Newsletter: yes

Message:
I'm interested in your CCIE Security training. Can you provide more information about the course structure and lab access?
```

---

## 🔧 方案2: EmailJS (客户端发送)

### 特点
- ✅ 完全在客户端运行
- ✅ 免费版支持每月200封邮件
- ✅ 支持多种邮件服务
- ✅ 更多自定义选项

### 设置步骤

#### 1. 注册EmailJS
1. 访问 [https://www.emailjs.com](https://www.emailjs.com)
2. 注册账户

#### 2. 配置邮件服务
1. 在Dashboard中点击"Add New Service"
2. 选择Gmail
3. 连接你的Gmail账户 `cciemasternode@gmail.com`

#### 3. 创建邮件模板
1. 点击"Email Templates" → "Create New Template"
2. 设置模板内容：
```
Subject: New Contact - {{firstName}} {{lastName}}

Name: {{firstName}} {{lastName}}
Email: {{email}}
Phone: {{phone}}
Experience: {{experience}}
Course Interest: {{courseInterest}}
Timeline: {{timeline}}

Message:
{{message}}

Newsletter Subscription: {{newsletter}}
```

#### 4. 更新HTML代码
将表单action改为JavaScript处理：
```html
<form id="contactForm" onsubmit="sendEmail(event)">
```

#### 5. 添加EmailJS代码
在页面中添加EmailJS库和发送函数：
```html
<script src="https://cdn.emailjs.com/dist/email.min.js"></script>
<script>
emailjs.init("YOUR_USER_ID");

function sendEmail(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
        .then(() => {
            showSuccessMessage();
            form.reset();
        })
        .catch((error) => {
            alert('Failed to send message. Please try again.');
            console.error('Error:', error);
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
}
</script>
```

---

## 📧 方案3: 后端PHP脚本

### 特点
- ✅ 完全控制邮件发送
- ✅ 可以保存到数据库
- ✅ 自定义邮件格式
- ❌ 需要支持PHP的主机

### 实现代码

#### 1. 创建 `send_email.php`
```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// 获取表单数据
$firstName = $_POST['firstName'] ?? '';
$lastName = $_POST['lastName'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$experience = $_POST['experience'] ?? '';
$courseInterest = $_POST['courseInterest'] ?? '';
$timeline = $_POST['timeline'] ?? '';
$message = $_POST['message'] ?? '';
$newsletter = $_POST['newsletter'] ?? 'no';

// 验证必填字段
if (empty($firstName) || empty($lastName) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

// 邮件配置
$to = 'cciemasternode@gmail.com';
$subject = 'New Contact Form Submission - CCIE Master';

// 邮件内容
$emailBody = "
New contact form submission from CCIE Master website:

Name: $firstName $lastName
Email: $email
Phone: $phone
Experience Level: $experience
Course Interest: $courseInterest
Timeline: $timeline
Newsletter: $newsletter

Message:
$message

---
Submitted at: " . date('Y-m-d H:i:s') . "
IP Address: " . $_SERVER['REMOTE_ADDR'] . "
";

// 邮件头
$headers = "From: noreply@cciemaster.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// 发送邮件
if (mail($to, $subject, $emailBody, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email']);
}
?>
```

#### 2. 更新表单JavaScript
```javascript
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    fetch('/send_email.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showSuccessMessage();
            this.reset();
        } else {
            alert('Failed to send message: ' + data.error);
        }
    })
    .catch(error => {
        alert('Network error. Please try again.');
        console.error('Error:', error);
    })
    .finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
});
```

---

## 🔔 方案4: Webhook + 通知服务

### 使用Zapier自动化
1. 设置Formspree接收表单
2. 创建Zapier Webhook
3. 连接到多种通知方式：
   - 发送邮件到Gmail
   - 发送消息到Slack
   - 发送SMS到手机
   - 保存到Google Sheets

### 使用IFTTT
1. 创建Webhook触发器
2. 连接到邮件/SMS/推送通知

---

## 📊 推荐方案对比

| 方案 | 设置难度 | 费用 | 可靠性 | 自定义程度 |
|------|----------|------|--------|------------|
| Formspree | ⭐ | 免费/付费 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| EmailJS | ⭐⭐ | 免费/付费 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| PHP后端 | ⭐⭐⭐ | 主机费用 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Webhook | ⭐⭐⭐⭐ | 付费 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

## 🎯 最终推荐

**对于你的情况，我强烈推荐使用Formspree方案**：

1. **最简单**: 5分钟内完成设置
2. **最可靠**: 专业的邮件发送服务
3. **免费开始**: 每月50次提交足够起步
4. **自动回复**: 可以设置自动回复邮件给客户
5. **防垃圾邮件**: 内置过滤机制

## 🚀 立即开始

1. 现在就去 [https://formspree.io](https://formspree.io) 注册
2. 创建表单获取Form ID
3. 替换代码中的 `YOUR_FORM_ID`
4. 部署并测试

你的客户将能够真正联系到你，你也会及时收到邮件通知！ 