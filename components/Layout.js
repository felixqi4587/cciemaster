import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from '../styles/Layout.module.css';

export default function Layout({ children, title, description, currentLanguage, onLanguageChange }) {
  const [showPopup, setShowPopup] = useState(false);
  const [language, setLanguage] = useState(currentLanguage || 'en'); // 默认英文
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    // 显示弹窗的逻辑 - 5秒后显示
    const timer = setTimeout(() => {
      // 检查是否已经显示过弹窗
      if (typeof window !== 'undefined') {
        const hasShownPopup = localStorage.getItem('popupShown');
        if (!hasShownPopup) {
          setShowPopup(true);
        }
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (onLanguageChange) {
      onLanguageChange(language);
    }
  }, [language, onLanguageChange]);

  const handleClosePopup = () => {
    setShowPopup(false);
    // 记录弹窗已显示
    if (typeof window !== 'undefined') {
      localStorage.setItem('popupShown', 'true');
      // 24小时后重置
      setTimeout(() => {
        localStorage.removeItem('popupShown');
      }, 24 * 60 * 60 * 1000);
    }
  };
  
  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // 语言文本
  const text = {
    zh: {
      title: 'CCIE培训中心 - 专业网络认证培训',
      description: '专业的CCIE培训课程，助您快速成为网络专家',
      home: '首页',
      courses: '课程',
      resources: '学习资源',
      about: '关于我们',
      contact: '联系方式',
      aboutUs: '关于我们',
      aboutUsDesc: '专业的CCIE培训机构，致力于培养高级网络人才',
      experience: '十年教学经验，上千名学员成功通过考试',
      quickLinks: '快速链接',
      coursesIntro: '课程介绍',
      successStories: '成功案例',
      freeResources: '免费资源',
      contactUs: '联系方式',
      phone: '电话：400-888-CCIE',
      email: '邮箱：contact@ccie-training.com',
      address: '地址：北京市海淀区中关村软件园',
      followUs: '关注我们',
      wechat: '微信公众号',
      weibo: '微博',
      zhihu: '知乎',
      bilibili: 'B站',
      newsletter: '订阅我们的技术周刊',
      emailPlaceholder: '输入您的邮箱',
      subscribe: '订阅',
      copyright: '版权所有',
      privacy: '隐私政策',
      terms: '服务条款',
      freeResourcesTitle: '免费领取CCIE学习资料包',
      freeResourcesDesc: '包含路由交换核心知识点、考试重点及真题解析',
      namePlaceholder: '您的姓名',
      phonePlaceholder: '手机号码',
      getResources: '立即领取',
      alreadyReceived: '已有5000+学员获取',
      languageToggle: 'English',
      mobileMenuToggle: '菜单'
    },
    en: {
      title: 'CCIE Training Center - Professional Network Certification Training',
      description: 'Professional CCIE training courses to help you become a network expert quickly',
      home: 'Home',
      courses: 'Courses',
      resources: 'Resources',
      about: 'About Us',
      contact: 'Contact',
      aboutUs: 'About Us',
      aboutUsDesc: 'Professional CCIE training institution dedicated to developing advanced network talent',
      experience: '10 years of teaching experience, thousands of students successfully certified',
      quickLinks: 'Quick Links',
      coursesIntro: 'Course Information',
      successStories: 'Success Stories',
      freeResources: 'Free Resources',
      contactUs: 'Contact Us',
      phone: 'Phone: 400-888-CCIE',
      email: 'Email: contact@ccie-training.com',
      address: 'Address: Zhongguancun Software Park, Haidian District, Beijing',
      followUs: 'Follow Us',
      wechat: 'WeChat',
      weibo: 'Weibo',
      zhihu: 'Zhihu',
      bilibili: 'Bilibili',
      newsletter: 'Subscribe to our weekly tech newsletter',
      emailPlaceholder: 'Enter your email',
      subscribe: 'Subscribe',
      copyright: 'All Rights Reserved',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      freeResourcesTitle: 'Get Free CCIE Study Materials',
      freeResourcesDesc: 'Includes core routing & switching knowledge points, exam focus and solutions',
      namePlaceholder: 'Your Name',
      phonePlaceholder: 'Phone Number',
      getResources: 'Get Now',
      alreadyReceived: 'Already received by over 5000 students',
      languageToggle: '中文',
      mobileMenuToggle: 'Menu'
    }
  };
  
  const t = text[language];

  return (
    <div className={styles.container}>
      <Head>
        <title>{title || t.title}</title>
        <meta name="description" content={description || t.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>
            <Link href="/">
              <h1>CCIE Training</h1>
            </Link>
          </div>
          
          <button 
            className={styles.mobileMenuButton} 
            onClick={toggleMenu}
            aria-label={t.mobileMenuToggle}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
            <Link href="/" className={styles.navLink}>{t.home}</Link>
            <Link href="/courses" className={styles.navLink}>{t.courses}</Link>
            <Link href="/resources" className={styles.navLink}>{t.resources}</Link>
            <Link href="/about" className={styles.navLink}>{t.about}</Link>
            <Link href="/contact" className={styles.navLink}>{t.contact}</Link>
            <button 
              className={styles.languageToggle} 
              onClick={toggleLanguage}
              aria-label={t.languageToggle}
            >
              {t.languageToggle}
            </button>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerContent}>
            <div className={styles.footerColumn}>
              <h3>{t.aboutUs}</h3>
              <p>{t.aboutUsDesc}</p>
              <p>{t.experience}</p>
            </div>
            <div className={styles.footerColumn}>
              <h3>{t.quickLinks}</h3>
              <div className={styles.footerLinks}>
                <Link href="/courses">{t.coursesIntro}</Link>
                <Link href="/success-stories">{t.successStories}</Link>
                <Link href="/resources">{t.freeResources}</Link>
              </div>
            </div>
            <div className={styles.footerColumn}>
              <h3>{t.contactUs}</h3>
              <p>{t.phone}</p>
              <p>{t.email}</p>
              <p>{t.address}</p>
            </div>
            <div className={styles.footerColumn}>
              <h3>{t.followUs}</h3>
              <div className={styles.socialLinks}>
                <a href="#" target="_blank" rel="noopener noreferrer">{t.wechat}</a>
                <a href="#" target="_blank" rel="noopener noreferrer">{t.weibo}</a>
                <a href="#" target="_blank" rel="noopener noreferrer">{t.zhihu}</a>
                <a href="#" target="_blank" rel="noopener noreferrer">{t.bilibili}</a>
              </div>
            </div>
          </div>
          <div className={styles.newsletter}>
            <h3>{t.newsletter}</h3>
            <form className={styles.subscribeForm}>
              <input type="email" placeholder={t.emailPlaceholder} required />
              <button type="submit">{t.subscribe}</button>
            </form>
          </div>
          <div className={styles.copyright}>
            &copy; {new Date().getFullYear()} CCIE Training Center {t.copyright} | <Link href="/privacy">{t.privacy}</Link> | <Link href="/terms">{t.terms}</Link>
          </div>
        </div>
      </footer>

      {/* 引流弹窗 */}
      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button className={styles.closeBtn} onClick={handleClosePopup}>×</button>
            <h3>{t.freeResourcesTitle}</h3>
            <p>{t.freeResourcesDesc}</p>
            <form className={styles.popupForm}>
              <input type="text" placeholder={t.namePlaceholder} required />
              <input type="tel" placeholder={t.phonePlaceholder} required />
              <button type="submit">{t.getResources}</button>
            </form>
            <p className={styles.popupFooter}>{t.alreadyReceived}</p>
          </div>
        </div>
      )}
    </div>
  );
} 