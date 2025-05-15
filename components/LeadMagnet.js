import { useState } from 'react';
import styles from '../styles/LeadMagnet.module.css';

export default function LeadMagnet({ title, description, buttonText, imageUrl, type = 'box' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interests: []
  });
  
  const [showThankYou, setShowThankYou] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        interests: checked 
          ? [...prev.interests, value]
          : prev.interests.filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = '请输入您的姓名';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = '请输入您的手机号码';
    } else if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      errors.phone = '请输入有效的手机号码';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = '请输入有效的邮箱地址';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // 在这里处理表单提交，例如发送到后端API
      console.log('表单数据：', formData);
      
      // 显示感谢信息
      setShowThankYou(true);
      
      // 重置表单
      setFormData({
        name: '',
        phone: '',
        email: '',
        interests: []
      });
      
      // 添加数据统计代码
      if (typeof window !== 'undefined') {
        // 可以在这里添加百度统计、CNZZ等统计代码
        // window._hmt && window._hmt.push(['_trackEvent', '表单', '提交', '资料下载']);
      }
      
      // 5秒后隐藏感谢信息
      setTimeout(() => {
        setShowThankYou(false);
      }, 5000);
    }
  };

  // 课程兴趣选项
  const interestOptions = [
    { id: 'enterprise', label: 'CCIE企业基础设施' },
    { id: 'security', label: 'CCIE安全' },
    { id: 'service-provider', label: 'CCIE服务提供商' },
    { id: 'datacenter', label: 'CCIE数据中心' }
  ];

  return (
    <div className={type === 'banner' ? styles.banner : styles.box}>
      {type === 'banner' && (
        <div className={styles.bannerContent}>
          <div className={styles.textContent}>
            <h2>{title || '免费获取CCIE学习资料包'}</h2>
            <p>{description || '包含CCIE考试重点、常见问题解析、实验拓扑图等'}</p>
          </div>
          
          {!showThankYou ? (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="name"
                  placeholder="您的姓名"
                  value={formData.name}
                  onChange={handleChange}
                />
                {formErrors.name && <div className={styles.error}>{formErrors.name}</div>}
              </div>
              
              <div className={styles.formGroup}>
                <input
                  type="tel"
                  name="phone"
                  placeholder="手机号码"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {formErrors.phone && <div className={styles.error}>{formErrors.phone}</div>}
              </div>
              
              <button type="submit" className={styles.button}>
                {buttonText || '立即领取'}
              </button>
            </form>
          ) : (
            <div className={styles.thankYou}>
              <h3>感谢您的提交！</h3>
              <p>资料已发送至您的手机，请注意查收短信。</p>
            </div>
          )}
        </div>
      )}
      
      {type === 'box' && (
        <div className={styles.boxContent}>
          {imageUrl && <img src={imageUrl} alt="CCIE学习资料" className={styles.image} />}
          
          <div className={styles.textContent}>
            <h2>{title || '免费获取CCIE学习资料包'}</h2>
            <p>{description || '包含CCIE考试重点、常见问题解析、实验拓扑图等'}</p>
            
            {!showThankYou ? (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label>您的姓名</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {formErrors.name && <div className={styles.error}>{formErrors.name}</div>}
                </div>
                
                <div className={styles.formGroup}>
                  <label>手机号码</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {formErrors.phone && <div className={styles.error}>{formErrors.phone}</div>}
                </div>
                
                <div className={styles.formGroup}>
                  <label>邮箱地址（选填）</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {formErrors.email && <div className={styles.error}>{formErrors.email}</div>}
                </div>
                
                <div className={styles.formGroup}>
                  <label>您感兴趣的方向（可多选）</label>
                  <div className={styles.checkboxGroup}>
                    {interestOptions.map(option => (
                      <div key={option.id} className={styles.checkbox}>
                        <input
                          type="checkbox"
                          id={option.id}
                          name="interests"
                          value={option.id}
                          checked={formData.interests.includes(option.id)}
                          onChange={handleChange}
                        />
                        <label htmlFor={option.id}>{option.label}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button type="submit" className={styles.button}>
                  {buttonText || '立即领取'}
                </button>
                
                <p className={styles.privacy}>
                  提交即表示您同意我们的<a href="/privacy">隐私政策</a>，
                  我们将严格保护您的个人信息
                </p>
              </form>
            ) : (
              <div className={styles.thankYou}>
                <h3>感谢您的提交！</h3>
                <p>资料已发送至您的手机，请注意查收短信。</p>
                <p>如未收到，请检查您的邮箱或联系我们的客服。</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* 用户数量显示，增加紧迫感 */}
      <div className={styles.counter}>
        <span className={styles.dot}></span>
        最近24小时内已有 <strong>153</strong> 人领取
      </div>
    </div>
  );
} 