// API端点用于获取已保存的表单提交数据
// 注意：这是一个简单实现，实际项目中应使用数据库并添加适当的身份验证

// 在服务器内存中存储提交数据（仅用于演示，生产环境应使用数据库）
let submissions = [];

export default function handler(req, res) {
  // 处理GET请求 - 获取所有提交
  if (req.method === 'GET') {
    return res.status(200).json({ 
      success: true, 
      data: submissions 
    });
  }
  
  // 处理POST请求 - 添加新提交
  if (req.method === 'POST') {
    try {
      const submission = req.body;
      
      // 添加时间戳和ID
      submission.id = Date.now().toString();
      submission.timestamp = new Date().toISOString();
      
      // 添加到存储中
      submissions.push(submission);
      
      return res.status(201).json({ 
        success: true, 
        message: '提交已保存', 
        data: submission 
      });
    } catch (error) {
      console.error('保存提交数据时出错:', error);
      return res.status(500).json({ 
        success: false, 
        message: '服务器处理请求时发生错误' 
      });
    }
  }
  
  // 处理DELETE请求 - 清除所有提交（仅用于测试）
  if (req.method === 'DELETE') {
    submissions = [];
    return res.status(200).json({ 
      success: true, 
      message: '所有提交数据已清除' 
    });
  }
  
  // 不支持的HTTP方法
  return res.status(405).json({ 
    success: false, 
    message: `不支持${req.method}方法` 
  });
} 