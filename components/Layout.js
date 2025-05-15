import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from '../styles/Layout.module.css';

export default function Layout({ children, title, description }) {
  const [showPopup, setShowPopup] = useState(false);
  
  useEffect(() => {
    // 显示弹窗的逻辑 - 5秒后显示
    const timer = setTimeout(() => {
      // 检查是否已经显示过弹窗
      const hasShownPopup = localStorage.getItem('popupShown');
      if (!hasShownPopup) {
        setShowPopup(true);
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    // 记录弹窗已显示
    localStorage.setItem('popupShown', 'true');
    // 24小时后重置
    setTimeout(() => {
      localStorage.removeItem('popupShown');
    }, 24 * 60 * 60 * 1000);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{title || 'CCIE培训中心 - 专业网络认证培训'}</title>
        <meta name="description" content={description || '专业的CCIE培训课程，助您快速成为网络专家'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">
            <h1>CCIE培训中心</h1>
          </Link>
        </div>
        <nav className={styles.nav}>
          <Link href="/">首页</Link>
          <Link href="/courses">课程</Link>
          <Link href="/network-simulator">网络模拟器</Link>
          <Link href="/discussion">技术讨论</Link>
          <Link href="/blog">博客</Link>
          <Link href="/resources">学习资源</Link>
          <Link href="/about">关于我们</Link>
          <Link href="/contact">联系方式</Link>
        </nav>
      </header>

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerColumn}>
            <h3>关于我们</h3>
            <p>专业的CCIE培训机构，致力于培养高级网络人才</p>
            <p>十年教学经验，上千名学员成功通过考试</p>
          </div>
          <div className={styles.footerColumn}>
            <h3>快速链接</h3>
            <Link href="/courses">课程介绍</Link>
            <Link href="/network-simulator">网络模拟器</Link>
            <Link href="/success-stories">成功案例</Link>
            <Link href="/free-resources">免费资源</Link>
            <Link href="/blog">技术博客</Link>
          </div>
          <div className={styles.footerColumn}>
            <h3>联系方式</h3>
            <p>电话：400-888-CCIE</p>
            <p>邮箱：contact@ccie-training.com</p>
            <p>地址：北京市海淀区中关村软件园</p>
          </div>
          <div className={styles.footerColumn}>
            <h3>关注我们</h3>
            <div className={styles.socialLinks}>
              <a href="#" target="_blank" rel="noopener noreferrer">微信公众号</a>
              <a href="#" target="_blank" rel="noopener noreferrer">微博</a>
              <a href="#" target="_blank" rel="noopener noreferrer">知乎</a>
              <a href="#" target="_blank" rel="noopener noreferrer">B站</a>
            </div>
          </div>
        </div>
        <div className={styles.newsletter}>
          <h3>订阅我们的技术周刊</h3>
          <form className={styles.subscribeForm}>
            <input type="email" placeholder="输入您的邮箱" required />
            <button type="submit">订阅</button>
          </form>
        </div>
        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} CCIE培训中心 版权所有 | <Link href="/privacy">隐私政策</Link> | <Link href="/terms">服务条款</Link>
        </div>
      </footer>

      {/* 引流弹窗 */}
      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button className={styles.closeBtn} onClick={handleClosePopup}>×</button>
            <h3>免费领取CCIE学习资料包</h3>
            <p>包含路由交换核心知识点、考试重点及真题解析</p>
            <form className={styles.popupForm}>
              <input type="text" placeholder="您的姓名" required />
              <input type="tel" placeholder="手机号码" required />
              <button type="submit">立即领取</button>
            </form>
            <p className={styles.popupFooter}>已有5000+学员获取</p>
          </div>
        </div>
      )}
    </div>
  );
} 