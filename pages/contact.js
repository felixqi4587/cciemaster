import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 这里可以添加表单提交逻辑，例如发送到后端API
    console.log('表单数据:', formData);
    // 模拟表单提交成功
    setSubmitted(true);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>联系我们 - CCIE培训中心</title>
        <meta name="description" content="联系CCIE培训中心，获取课程咨询和专业建议" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.logo}>
          <h1>CCIE培训中心</h1>
        </div>
        <nav className={styles.nav}>
          <Link href="/">首页</Link>
          <Link href="/courses">课程</Link>
          <Link href="/about">关于我们</Link>
          <Link href="/contact">联系方式</Link>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>联系我们</h1>
            <p>填写表单获取更多信息，我们的顾问将尽快与您联系</p>
          </div>
        </section>

        <section className={styles.contactSection}>
          <div className={styles.contactInfo}>
            <div className={styles.infoCard}>
              <h3>联系方式</h3>
              <p><strong>电话：</strong>123-456-7890</p>
              <p><strong>邮箱：</strong>info@ccie-training.com</p>
              <p><strong>工作时间：</strong>周一至周五 9:00-18:00</p>
            </div>
            
            <div className={styles.infoCard}>
              <h3>培训地址</h3>
              <p>北京市海淀区中关村科技园区</p>
              <p>上海市浦东新区张江高科技园区</p>
              <p>深圳市南山区科技园</p>
            </div>
            
            <div className={styles.infoCard}>
              <h3>关注我们</h3>
              <div className={styles.socialLinks}>
                <div className={styles.socialItem}>
                  <span>微信公众号</span>
                  <span>CCIE培训中心</span>
                </div>
                <div className={styles.socialItem}>
                  <span>QQ群</span>
                  <span>123456789</span>
                </div>
                <div className={styles.socialItem}>
                  <span>微博</span>
                  <span>@CCIE培训官方</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.contactForm}>
            {!submitted ? (
              <>
                <h2>咨询表单</h2>
                <form onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">姓名 *</label>
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
                      <label htmlFor="email">邮箱 *</label>
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
                      <label htmlFor="phone">电话 *</label>
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
                    <label htmlFor="course">感兴趣的课程</label>
                    <select
                      id="course"
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                    >
                      <option value="">-- 请选择 --</option>
                      <option value="enterprise">CCIE企业基础设施</option>
                      <option value="security">CCIE安全专家</option>
                      <option value="service-provider">CCIE服务提供商</option>
                      <option value="datacenter">CCIE数据中心</option>
                    </select>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="message">留言</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <button type="submit" className={styles.submitButton}>提交咨询</button>
                  </div>
                </form>
              </>
            ) : (
              <div className={styles.successMessage}>
                <h2>提交成功！</h2>
                <p>感谢您的咨询，我们的培训顾问将在1个工作日内与您联系。</p>
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
                  再次提交
                </button>
              </div>
            )}
          </div>
        </section>

        <section className={styles.mapSection}>
          <h2>我们的位置</h2>
          <div className={styles.mapPlaceholder}>
            <p>地图将在这里显示</p>
            <p>您可以集成百度地图、高德地图等API</p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerColumn}>
            <h3>关于我们</h3>
            <p>专业的CCIE培训机构，致力于培养高级网络人才</p>
          </div>
          <div className={styles.footerColumn}>
            <h3>联系方式</h3>
            <p>电话：123-456-7890</p>
            <p>邮箱：info@ccie-training.com</p>
          </div>
          <div className={styles.footerColumn}>
            <h3>关注我们</h3>
            <div className={styles.socialLinks}>
              <a href="#" target="_blank" rel="noopener noreferrer">微信</a>
              <a href="#" target="_blank" rel="noopener noreferrer">微博</a>
              <a href="#" target="_blank" rel="noopener noreferrer">QQ</a>
            </div>
          </div>
        </div>
        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} CCIE培训中心 版权所有
        </div>
      </footer>
    </div>
  );
} 