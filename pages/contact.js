import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Contact.module.css';

export default function Contact({ language }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  
  // 语言文本
  const text = {
    zh: {
      title: 'CCIE培训 - 联系我们',
      description: '联系CCIE培训中心，获取专业网络认证培训咨询和支持',
      hero: {
        title: '联系我们',
        subtitle: '我们随时准备帮助您开启CCIE认证之旅'
      },
      form: {
        title: '发送消息',
        name: '姓名',
        namePlaceholder: '请输入您的姓名',
        email: '邮箱',
        emailPlaceholder: '请输入您的邮箱',
        phone: '电话',
        phonePlaceholder: '请输入您的电话号码',
        subject: '主题',
        subjectPlaceholder: '请选择咨询主题',
        subjectOptions: [
          '课程咨询',
          '技术问题',
          '价格咨询',
          '合作洽谈',
          '其他'
        ],
        message: '消息内容',
        messagePlaceholder: '请详细描述您的需求或问题',
        submit: '发送消息',
        submitting: '正在提交...',
        success: {
          title: '消息已发送！',
          message: '感谢您的留言，我们将在24小时内回复您。',
          button: '再次留言'
        },
        error: {
          title: '提交失败',
          message: '很抱歉，提交过程中出现错误，请稍后再试。',
          button: '重试'
        },
        validation: {
          required: '此项为必填项',
          invalidEmail: '请输入有效的邮箱地址',
          invalidPhone: '请输入有效的电话号码'
        }
      },
      contactInfo: {
        title: '联系方式',
        address: {
          label: '地址',
          value: '北京市海淀区中关村软件园1号楼'
        },
        phone: {
          label: '电话',
          value: '400-888-CCIE'
        },
        email: {
          label: '邮箱',
          value: 'contact@ccie-training.com'
        },
        hours: {
          label: '工作时间',
          value: '周一至周五 9:00 - 18:00'
        }
      },
      social: {
        title: '关注我们',
        wechat: '微信公众号',
        weibo: '微博',
        zhihu: '知乎',
        qq: 'QQ群：123456789'
      },
      map: {
        title: '我们的位置',
        placeholder: '地图加载中...'
      }
    },
    en: {
      title: 'CCIE Training - Contact Us',
      description: 'Contact CCIE Training Center for professional network certification training consultation and support',
      hero: {
        title: 'Contact Us',
        subtitle: 'We are ready to help you start your CCIE certification journey'
      },
      form: {
        title: 'Send Message',
        name: 'Name',
        namePlaceholder: 'Enter your name',
        email: 'Email',
        emailPlaceholder: 'Enter your email',
        phone: 'Phone',
        phonePlaceholder: 'Enter your phone number',
        subject: 'Subject',
        subjectPlaceholder: 'Select a subject',
        subjectOptions: [
          'Course Inquiry',
          'Technical Question',
          'Pricing Information',
          'Partnership',
          'Other'
        ],
        message: 'Message',
        messagePlaceholder: 'Describe your needs or questions in detail',
        submit: 'Send Message',
        submitting: 'Submitting...',
        success: {
          title: 'Message Sent!',
          message: 'Thank you for your message. We will get back to you within 24 hours.',
          button: 'Send Another Message'
        },
        error: {
          title: 'Submission Failed',
          message: 'Sorry, there was an error submitting your message. Please try again later.',
          button: 'Try Again'
        },
        validation: {
          required: 'This field is required',
          invalidEmail: 'Please enter a valid email address',
          invalidPhone: 'Please enter a valid phone number'
        }
      },
      contactInfo: {
        title: 'Contact Information',
        address: {
          label: 'Address',
          value: 'Zhongguancun Software Park, Building 1, Haidian District, Beijing'
        },
        phone: {
          label: 'Phone',
          value: '400-888-CCIE'
        },
        email: {
          label: 'Email',
          value: 'contact@ccie-training.com'
        },
        hours: {
          label: 'Business Hours',
          value: 'Monday to Friday, 9:00 AM - 6:00 PM'
        }
      },
      social: {
        title: 'Follow Us',
        wechat: 'WeChat Official Account',
        weibo: 'Weibo',
        zhihu: 'Zhihu',
        qq: 'QQ Group: 123456789'
      },
      map: {
        title: 'Our Location',
        placeholder: 'Map loading...'
      }
    }
  };
  
  // 使用当前语言或默认为英文
  const t = text[language || 'en'];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // 清除错误提示
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 表单验证
    const newErrors = {};
    if (!formData.name) newErrors.name = t.form.validation.required;
    if (!formData.email) {
      newErrors.email = t.form.validation.required;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.form.validation.invalidEmail;
    }
    if (!formData.phone) {
      newErrors.phone = t.form.validation.required;
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = t.form.validation.invalidPhone;
    }
    if (!formData.subject) newErrors.subject = t.form.validation.required;
    if (!formData.message) newErrors.message = t.form.validation.required;
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // 提交表单到API
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || '提交表单时出错');
      }
      
      // 同时将数据保存到submissions API
      await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      // 本地存储也保留，作为备份
      if (typeof window !== 'undefined') {
        const savedData = JSON.parse(localStorage.getItem('contactFormSubmissions') || '[]');
        savedData.push({
          ...formData,
          submitTime: new Date().toISOString()
        });
        localStorage.setItem('contactFormSubmissions', JSON.stringify(savedData));
      }
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('提交表单时出错:', error);
      setSubmitError(error.message || t.form.error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    setIsSubmitted(false);
    setSubmitError(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };
  
  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
      </Head>
      
      <div className={styles.contactWrapper}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>{t.hero.title}</h1>
            <p>{t.hero.subtitle}</p>
          </div>
        </section>
        
        <section className={styles.contactSection}>
          <div className={styles.contactInfo}>
            <div className={styles.infoCard}>
              <h3>{t.contactInfo.title}</h3>
              <p><strong>{t.contactInfo.address.label}:</strong> {t.contactInfo.address.value}</p>
              <p><strong>{t.contactInfo.phone.label}:</strong> {t.contactInfo.phone.value}</p>
              <p><strong>{t.contactInfo.email.label}:</strong> {t.contactInfo.email.value}</p>
              <p><strong>{t.contactInfo.hours.label}:</strong> {t.contactInfo.hours.value}</p>
            </div>
            
            <div className={styles.infoCard}>
              <h3>{t.social.title}</h3>
              <div className={styles.socialLinks}>
                <div className={styles.socialItem}>
                  <span>WeChat</span>
                  <span>{t.social.wechat}</span>
                </div>
                <div className={styles.socialItem}>
                  <span>Weibo</span>
                  <span>{t.social.weibo}</span>
                </div>
                <div className={styles.socialItem}>
                  <span>Zhihu</span>
                  <span>{t.social.zhihu}</span>
                </div>
                <div className={styles.socialItem}>
                  <span>QQ</span>
                  <span>{t.social.qq}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.contactForm}>
            {!isSubmitted ? (
              <>
                <h2>{t.form.title}</h2>
                {submitError && (
                  <div className={styles.errorAlert}>
                    <p>{submitError}</p>
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name">{t.form.name}</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t.form.namePlaceholder}
                      />
                      {errors.name && <div className={styles.errorMessage}>{errors.name}</div>}
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="email">{t.form.email}</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t.form.emailPlaceholder}
                      />
                      {errors.email && <div className={styles.errorMessage}>{errors.email}</div>}
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="phone">{t.form.phone}</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t.form.phonePlaceholder}
                      />
                      {errors.phone && <div className={styles.errorMessage}>{errors.phone}</div>}
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="subject">{t.form.subject}</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                      >
                        <option value="">{t.form.subjectPlaceholder}</option>
                        {t.form.subjectOptions.map((option, index) => (
                          <option key={index} value={option}>{option}</option>
                        ))}
                      </select>
                      {errors.subject && <div className={styles.errorMessage}>{errors.subject}</div>}
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="message">{t.form.message}</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t.form.messagePlaceholder}
                      rows="6"
                    ></textarea>
                    {errors.message && <div className={styles.errorMessage}>{errors.message}</div>}
                  </div>
                  
                  <button 
                    type="submit" 
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t.form.submitting : t.form.submit}
                  </button>
                </form>
              </>
            ) : (
              <div className={styles.successMessage}>
                <h2>{t.form.success.title}</h2>
                <p>{t.form.success.message}</p>
                <button onClick={resetForm} className={styles.resetButton}>
                  {t.form.success.button}
                </button>
              </div>
            )}
          </div>
        </section>
        
        <section className={styles.mapSection}>
          <h2>{t.map.title}</h2>
          <div className={styles.mapPlaceholder}>
            <p>{t.map.placeholder}</p>
            <p>{t.contactInfo.address.value}</p>
          </div>
        </section>
      </div>
    </>
  );
} 