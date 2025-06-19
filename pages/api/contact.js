// API端点用于处理联系表单提交

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '仅支持POST请求' });
  }

  try {
    // 从请求体中获取表单数据
    const { name, email, phone, subject, message } = req.body;
    
    // 验证必要字段
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ message: '所有字段都是必填的' });
    }
    
    // 验证邮箱格式
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: '请提供有效的邮箱地址' });
    }
    
    // 验证电话号码（简单验证，至少10位数字）
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      return res.status(400).json({ message: '请提供有效的电话号码' });
    }
    
    // 在实际项目中，这里可以：
    // 1. 将数据保存到数据库
    // 2. 发送邮件通知
    // 3. 集成CRM系统
    
    // 创建一个包含表单数据的对象，以便记录
    const formSubmission = {
      name,
      email,
      phone,
      subject,
      message,
      timestamp: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress
    };
    
    // 将数据保存到服务器（这里仅作演示，实际项目需要实现真正的存储机制）
    console.log('收到表单提交:', formSubmission);
    
    // 返回成功响应
    res.status(200).json({ 
      success: true, 
      message: '表单提交成功',
      data: formSubmission 
    });
    
  } catch (error) {
    console.error('处理表单提交时出错:', error);
    res.status(500).json({ 
      success: false, 
      message: '服务器处理请求时发生错误' 
    });
  }
} 