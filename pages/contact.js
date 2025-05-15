import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Contact.module.css';

export default function Contact({ language }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 语言文本
  const text = {
    zh: {
      pageTitle: '联系我们 - CCIE培训中心',
      pageDescription: '联系CCIE培训中心，获取课程咨询和专业建议',
      heroTitle: '联系我们',
      heroDesc: '填写表单获取更多信息，我们的顾问将尽快与您联系',
      contactInfo: '联系方式',
      phone: '电话：',
      phoneNumber: '123-456-7890',
      email: '邮箱：',
      emailAddress: 'info@ccie-training.com',
      workHours: '工作时间：',
      workHoursDetail: '周一至周五 9:00-18:00',
      trainingLocations: '培训地址',
      location1: '北京市海淀区中关村科技园区',
      location2: '上海市浦东新区张江高科技园区',
      location3: '深圳市南山区科技园',
      followUs: '关注我们',
      wechat: '微信公众号',
      wechatAccount: 'CCIE培训中心',
      qqGroup: 'QQ群',
      qqGroupNumber: '123456789',
      weibo: '微博',
      weiboAccount: '@CCIE培训官方',
      formTitle: '咨询表单',
      nameLabel: '姓名 *',
      emailLabel: '邮箱 *',
      phoneLabel: '电话 *',
      courseLabel: '感兴趣的课程',
      courseSelect: '-- 请选择 --',
      courseEnterprise: 'CCIE企业基础设施',
      courseSecurity: 'CCIE安全专家',
      courseServiceProvider: 'CCIE服务提供商',
      courseDatacenter: 'CCIE数据中心',
      messageLabel: '留言',
      submitButton: '提交咨询',
      successTitle: '提交成功！',
      successMessage: '感谢您的咨询，我们的培训顾问将在1个工作日内与您联系。',
      submitAgain: '再次提交',
      errorMessage: '提交失败，请稍后再试',
      ourLocation: '我们的位置',
      mapNote1: '地图将在这里显示',
      mapNote2: '您可以集成百度地图、高德地图等API'
    },
    en: {
      pageTitle: 'Contact Us - CCIE Training Center',
      pageDescription: 'Contact CCIE Training Center for course information and professional advice',
      heroTitle: 'Contact Us',
      heroDesc: 'Fill out the form for more information, our advisors will contact you shortly',
      contactInfo: 'Contact Information',
      phone: 'Phone: ',
      phoneNumber: '123-456-7890',
      email: 'Email: ',
      emailAddress: 'info@ccie-training.com',
      workHours: 'Working Hours: ',
      workHoursDetail: 'Monday to Friday 9:00-18:00',
      trainingLocations: 'Training Locations',
      location1: 'Zhongguancun Technology Park, Haidian District, Beijing',
      location2: 'Zhangjiang High-Tech Park, Pudong New Area, Shanghai',
      location3: 'Science and Technology Park, Nanshan District, Shenzhen',
      followUs: 'Follow Us',
      wechat: 'WeChat',
      wechatAccount: 'CCIE Training Center',
      qqGroup: 'QQ Group',
      qqGroupNumber: '123456789',
      weibo: 'Weibo',
      weiboAccount: '@CCIE_Training_Official',
      formTitle: 'Inquiry Form',
      nameLabel: 'Name *',
      emailLabel: 'Email *',
      phoneLabel: 'Phone *',
      courseLabel: 'Course of Interest',
      courseSelect: '-- Please Select --',
      courseEnterprise: 'CCIE Enterprise Infrastructure',
      courseSecurity: 'CCIE Security',
      courseServiceProvider: 'CCIE Service Provider',
      courseDatacenter: 'CCIE Data Center',
      messageLabel: 'Message',
      submitButton: 'Submit Inquiry',
      successTitle: 'Submission Successful!',
      successMessage: 'Thank you for your inquiry. Our training advisor will contact you within 1 business day.',
      submitAgain: 'Submit Again',
      errorMessage: 'Submission failed, please try again later',
      ourLocation: 'Our Locations',
      mapNote1: 'Map will be displayed here',
      mapNote2: 'You can integrate with Google Maps, Baidu Maps, etc.'
    }
  };

  const t = text[language || 'en'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // 将表单数据存储到localStorage中，这样网站管理员可以查看
      const savedInquiries = JSON.parse(localStorage.getItem('contactInquiries') || '[]');
      const newInquiry = {
        ...formData,
        id: Date.now(),
        date: new Date().toISOString()
      };
      savedInquiries.push(newInquiry);
      localStorage.setItem('contactInquiries', JSON.stringify(savedInquiries));
      
      console.log('表单数据:', formData);
      console.log('已保存的查询:', savedInquiries);
      
      // 设置提交成功状态
      setSubmitted(true);
    } catch (err) {
      console.error('提交表单时出错:', err);
      setError(t.errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.contactWrapper}>
      <Head>
        <title>{t.pageTitle}</title>
        <meta name="description" content={t.pageDescription} />
      </Head>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroDesc}</p>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className={styles.contactInfo}>
          <div className={styles.infoCard}>
            <h3>{t.contactInfo}</h3>
            <p><strong>{t.phone}</strong>{t.phoneNumber}</p>
            <p><strong>{t.email}</strong>{t.emailAddress}</p>
            <p><strong>{t.workHours}</strong>{t.workHoursDetail}</p>
          </div>
          
          <div className={styles.infoCard}>
            <h3>{t.trainingLocations}</h3>
            <p>{t.location1}</p>
            <p>{t.location2}</p>
            <p>{t.location3}</p>
          </div>
          
          <div className={styles.infoCard}>
            <h3>{t.followUs}</h3>
            <div className={styles.socialLinks}>
              <div className={styles.socialItem}>
                <span>{t.wechat}</span>
                <span>{t.wechatAccount}</span>
              </div>
              <div className={styles.socialItem}>
                <span>{t.qqGroup}</span>
                <span>{t.qqGroupNumber}</span>
              </div>
              <div className={styles.socialItem}>
                <span>{t.weibo}</span>
                <span>{t.weiboAccount}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.contactForm}>
          {!submitted ? (
            <>
              <h2>{t.formTitle}</h2>
              {error && <div className={styles.errorMessage}>{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">{t.nameLabel}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">{t.emailLabel}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="phone">{t.phoneLabel}</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="course">{t.courseLabel}</label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                  >
                    <option value="">{t.courseSelect}</option>
                    <option value="enterprise">{t.courseEnterprise}</option>
                    <option value="security">{t.courseSecurity}</option>
                    <option value="service-provider">{t.courseServiceProvider}</option>
                    <option value="datacenter">{t.courseDatacenter}</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="message">{t.messageLabel}</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                
                <div className={styles.formGroup}>
                  <button 
                    type="submit" 
                    className={styles.submitButton}
                    disabled={loading}
                  >
                    {loading ? '...' : t.submitButton}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className={styles.successMessage}>
              <h2>{t.successTitle}</h2>
              <p>{t.successMessage}</p>
              <button 
                className={styles.resetButton}
                onClick={() => {
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    course: '',
                    message: ''
                  });
                  setSubmitted(false);
                }}
              >
                {t.submitAgain}
              </button>
            </div>
          )}
        </div>
      </section>

      <section className={styles.mapSection}>
        <h2>{t.ourLocation}</h2>
        <div className={styles.mapPlaceholder}>
          <p>{t.mapNote1}</p>
          <p>{t.mapNote2}</p>
        </div>
      </section>
    </div>
  );
} 