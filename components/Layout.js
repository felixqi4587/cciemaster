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
  
  useEffect(() => {
    if (currentLanguage) {
      setLanguage(currentLanguage);
    } else if (typeof window !== 'undefined') {
      // 如果没有传入当前语言，检查localStorage
      // 优先使用英文作为默认语言
      setLanguage('en');
    }
  }, [currentLanguage]);

  const handleLanguageToggle = () => {
    const newLanguage = language === 'zh' ? 'en' : 'zh';
    setLanguage(newLanguage);
    
    // 保存语言偏好到localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLanguage', newLanguage);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    // 记录弹窗已显示
    localStorage.setItem('popupShown', 'true');
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    // 订阅逻辑
    closePopup();
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 菜单文本
  const menuText = {
    zh: {
      home: '首页',
      courses: '课程',
      about: '关于我们',
      contact: '联系我们',
      toggleLanguage: 'English',
      footerAbout: '关于我们',
      footerAboutDesc: '我们是专业的CCIE培训机构，拥有多年教学经验和行业实践',
      footerCourses: '课程目录',
      footerCoursesEnterprise: 'CCIE企业架构',
      footerCoursesSecurity: 'CCIE安全',
      footerCoursesServiceProvider: 'CCIE服务提供商',
      footerCoursesDatacenter: 'CCIE数据中心',
      footerContact: '联系我们',
      footerPhone: '电话: 400-123-4567',
      footerEmail: '邮箱: contact@cciemaster.com',
      footerAddress: '地址: 北京市海淀区',
      footerNewsletter: '订阅我们',
      footerNewsletterDesc: '获取最新课程信息和行业动态',
      footerButtonSubscribe: '订阅',
      footerNewsletterPlaceholder: '您的邮箱地址',
      footerCopyright: '版权所有',
      popupTitle: '获取免费学习资料',
      popupDesc: '订阅我们的邮件，获取CCIE备考指南和学习技巧',
      popupPlaceholder: '您的邮箱地址',
      popupButton: '立即获取',
      popupFooter: '我们不会发送垃圾邮件，您可以随时取消订阅'
    },
    en: {
      home: 'Home',
      courses: 'Courses',
      about: 'About Us',
      contact: 'Contact Us',
      toggleLanguage: '中文',
      footerAbout: 'About Us',
      footerAboutDesc: 'We are a professional CCIE training institution with years of teaching experience and industry practice',
      footerCourses: 'Course Catalog',
      footerCoursesEnterprise: 'CCIE Enterprise',
      footerCoursesSecurity: 'CCIE Security',
      footerCoursesServiceProvider: 'CCIE Service Provider',
      footerCoursesDatacenter: 'CCIE Data Center',
      footerContact: 'Contact Us',
      footerPhone: 'Phone: 400-123-4567',
      footerEmail: 'Email: contact@cciemaster.com',
      footerAddress: 'Address: Haidian District, Beijing',
      footerNewsletter: 'Subscribe',
      footerNewsletterDesc: 'Get the latest course information and industry updates',
      footerButtonSubscribe: 'Subscribe',
      footerNewsletterPlaceholder: 'Your email address',
      footerCopyright: 'All Rights Reserved',
      popupTitle: 'Get Free Study Materials',
      popupDesc: 'Subscribe to our newsletter for CCIE exam guides and study tips',
      popupPlaceholder: 'Your email address',
      popupButton: 'Get It Now',
      popupFooter: 'We never send spam, and you can unsubscribe at any time'
    }
  };

  const t = menuText[language];

  return (
    <div className={styles.container}>
      <Head>
        <title>{title || (language === 'zh' ? 'CCIE培训 - 专业认证培训中心' : 'CCIE Training - Professional Certification Center')}</title>
        <meta
          name="description"
          content={description || (language === 'zh' ? '提供专业的CCIE认证培训，帮助您快速通过考试' : 'Professional CCIE certification training to help you pass your exam quickly')}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>
            <Link href="/">
              <h1>CCIE Master</h1>
            </Link>
          </div>

          <button
            className={styles.mobileMenuButton}
            onClick={handleMenuToggle}
            aria-label="Toggle menu"
          >
            <span style={{ transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
            <span style={{ opacity: isMenuOpen ? 0 : 1 }}></span>
            <span style={{ transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></span>
          </button>

          <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
            <Link href="/" className={styles.navLink}>
              {t.home}
            </Link>
            <Link href="/courses" className={styles.navLink}>
              {t.courses}
            </Link>
            <Link href="/about" className={styles.navLink}>
              {t.about}
            </Link>
            <Link href="/contact" className={styles.navLink}>
              {t.contact}
            </Link>
            <button
              onClick={handleLanguageToggle}
              className={styles.languageToggle}
            >
              {t.toggleLanguage}
            </button>
          </nav>
        </div>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerContent}>
            <div className={styles.footerColumn}>
              <h3>{t.footerAbout}</h3>
              <p>{t.footerAboutDesc}</p>
            </div>

            <div className={styles.footerColumn}>
              <h3>{t.footerCourses}</h3>
              <div className={styles.footerLinks}>
                <Link href="/courses/enterprise">{t.footerCoursesEnterprise}</Link>
                <Link href="/courses/security">{t.footerCoursesSecurity}</Link>
                <Link href="/courses/service-provider">{t.footerCoursesServiceProvider}</Link>
                <Link href="/courses/datacenter">{t.footerCoursesDatacenter}</Link>
              </div>
            </div>

            <div className={styles.footerColumn}>
              <h3>{t.footerContact}</h3>
              <p>{t.footerPhone}</p>
              <p>{t.footerEmail}</p>
              <p>{t.footerAddress}</p>
              <div className={styles.socialLinks}>
                <a href="#" aria-label="WeChat">WeChat</a>
                <a href="#" aria-label="LinkedIn">LinkedIn</a>
                <a href="#" aria-label="Twitter">Twitter</a>
              </div>
            </div>

            <div className={styles.footerColumn}>
              <div className={styles.newsletter}>
                <h3>{t.footerNewsletter}</h3>
                <p>{t.footerNewsletterDesc}</p>
                <form className={styles.subscribeForm}>
                  <input type="email" placeholder={t.footerNewsletterPlaceholder} required />
                  <button type="submit">{t.footerButtonSubscribe}</button>
                </form>
              </div>
            </div>
          </div>

          <div className={styles.copyright}>
            &copy; {new Date().getFullYear()} CCIE Master. {t.footerCopyright}
          </div>
        </div>
      </footer>

      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button className={styles.closeBtn} onClick={closePopup} aria-label="Close popup">
              &times;
            </button>
            <h3>{t.popupTitle}</h3>
            <p>{t.popupDesc}</p>
            <form className={styles.popupForm} onSubmit={handleSubscribe}>
              <input type="email" placeholder={t.popupPlaceholder} required />
              <button type="submit">{t.popupButton}</button>
            </form>
            <p className={styles.popupFooter}>{t.popupFooter}</p>
          </div>
        </div>
      )}
    </div>
  );
}