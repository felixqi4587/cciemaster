import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

export default function Home({ language }) {
  // 语言文本
  const text = {
    zh: {
      title: 'CCIE培训 - 高效直达认证的捷径',
      metaDescription: '专业的CCIE培训课程，提供完整实验环境和考试资料，助您快速通过CCIE认证',
      heroTitle: 'CCIE认证速成专家',
      heroSubtitle: '3个月通过CCIE，从入门到认证一站式解决',
      heroDescription: '我们提供独家实验环境与专业培训，让您以最短时间、最高效率通过CCIE认证考试',
      ctaContact: '立即咨询',
      ctaCourses: '了解课程',
      
      guaranteeTitle: '3个月通过保障',
      guaranteeDesc: '完整课程体系+实战操作+专家指导，确保您在3个月内高效通过CCIE认证，否则免费重学',
      guaranteeButton: '了解保障详情',
      
      coreAdvantageTitle: '我们的优势',
      coreAdvantage1Title: '考前实验环境模拟',
      coreAdvantage1Desc: '提供与CCIE实际考试99%相似的实验环境，让您提前熟悉考试场景，做到胸有成竹',
      coreAdvantage2Title: '笔试专项辅导',
      coreAdvantage2Desc: '独家整理CCIE笔试考点资料和练习题，针对性强化训练，确保一次通过笔试',
      coreAdvantage3Title: '实验专家指导',
      coreAdvantage3Desc: '资深CCIE工程师全程指导实验操作，掌握核心技术要点和专业解题思路',
      
      coursesTitle: '热门认证课程',
      courseTitle1: 'CCIE企业基础设施',
      courseDesc1: '3个月通过企业网络认证的专业培训',
      courseTitle2: 'CCIE安全专家',
      courseDesc2: '快速掌握网络安全技术与防护策略',
      courseTitle3: 'CCIE服务提供商',
      courseDesc3: '专注大型服务提供商网络技术加速认证',
      courseMore: '了解更多',
      
      contactTitle: '快速通过CCIE认证',
      contactDesc: '立即联系我们，获取独家学习资料和专业指导！',
      contactButton1: '获取课程资料',
      contactButton2: '电话咨询'
    },
    en: {
      title: 'CCIE Training - Fast Track to Certification',
      metaDescription: 'Professional CCIE training courses providing complete lab environment and exam materials to help you pass CCIE certification quickly',
      heroTitle: 'CCIE Certification Experts',
      heroSubtitle: 'Pass CCIE in 3 Months - Complete Solution from Beginner to Certified',
      heroDescription: 'We provide exclusive lab environments and professional training to help you pass CCIE certification in the shortest time with maximum efficiency',
      ctaContact: 'Contact Now',
      ctaCourses: 'View Courses',
      
      guaranteeTitle: '3-Month Pass Guarantee',
      guaranteeDesc: 'Complete curriculum + hands-on practice + expert guidance ensures you pass CCIE certification within 3 months, or retake for free',
      guaranteeButton: 'Learn More About Our Guarantee',
      
      coreAdvantageTitle: 'Our Advantages',
      coreAdvantage1Title: 'Pre-Exam Lab Environment',
      coreAdvantage1Desc: 'Access lab environments 99% similar to actual CCIE exams, familiarizing yourself with the exam scenario before test day',
      coreAdvantage2Title: 'Written Exam Preparation',
      coreAdvantage2Desc: 'Exclusive CCIE written exam materials and practice questions, ensuring you pass the written exam on your first attempt',
      coreAdvantage3Title: 'Lab Expert Guidance',
      coreAdvantage3Desc: 'Full guidance from experienced CCIE engineers, mastering core technical points and professional problem-solving approaches',
      
      coursesTitle: 'Certification Courses',
      courseTitle1: 'CCIE Enterprise Infrastructure',
      courseDesc1: 'Professional training to pass enterprise certification in 3 months',
      courseTitle2: 'CCIE Security',
      courseDesc2: 'Quickly master network security technologies and protection strategies',
      courseTitle3: 'CCIE Service Provider',
      courseDesc3: 'Accelerated certification for service provider network technologies',
      courseMore: 'Learn More',
      
      contactTitle: 'Fast Track to CCIE Certification',
      contactDesc: 'Contact us now for exclusive study materials and professional guidance!',
      contactButton1: 'Get Course Materials',
      contactButton2: 'Call Us'
    }
  };
  
  // 当前语言的文本
  const t = text[language || 'en'];

  return (
    <div className={styles.container}>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.metaDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* 1. 英雄区域 */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>{t.heroTitle}</h1>
            <h2>{t.heroSubtitle}</h2>
            <p>{t.heroDescription}</p>
            <div className={styles.cta}>
              <Link href="/contact" className={styles.primaryButton}>
                {t.ctaContact}
              </Link>
              <Link href="/courses" className={styles.secondaryButton}>
                {t.ctaCourses}
              </Link>
            </div>
          </div>
        </section>
        
        {/* 2. 3个月保障横幅 - 最醒目的位置 */}
        <section className={styles.guaranteeBanner}>
          <div className={styles.guaranteeContent}>
            <h2>{t.guaranteeTitle}</h2>
            <p>{t.guaranteeDesc}</p>
            <Link href="/guarantee">
              <button className={styles.guaranteeButton}>{t.guaranteeButton}</button>
            </Link>
          </div>
        </section>
        
        {/* 3. 核心优势区域 */}
        <section className={styles.coreAdvantages}>
          <h2>{t.coreAdvantageTitle}</h2>
          <div className={styles.advantageGrid}>
            <div className={styles.advantageCard}>
              <div className={styles.advantageIcon}>
                <img src="/images/icons/lab-environment.png" alt="Lab Environment" />
              </div>
              <h3>{t.coreAdvantage1Title}</h3>
              <p>{t.coreAdvantage1Desc}</p>
            </div>
            <div className={styles.advantageCard}>
              <div className={styles.advantageIcon}>
                <img src="/images/icons/exam-materials.png" alt="Exam Materials" />
              </div>
              <h3>{t.coreAdvantage2Title}</h3>
              <p>{t.coreAdvantage2Desc}</p>
            </div>
            <div className={styles.advantageCard}>
              <div className={styles.advantageIcon}>
                <img src="/images/icons/expert-guidance.png" alt="Expert Guidance" />
              </div>
              <h3>{t.coreAdvantage3Title}</h3>
              <p>{t.coreAdvantage3Desc}</p>
            </div>
          </div>
        </section>

        {/* 4. 简化版课程区域 */}
        <section className={styles.courses}>
          <h2>{t.coursesTitle}</h2>
          <div className={styles.courseGrid}>
            <div className={styles.courseCard}>
              <h3>{t.courseTitle1}</h3>
              <p>{t.courseDesc1}</p>
              <Link href="/courses/enterprise">{t.courseMore}</Link>
            </div>
            <div className={styles.courseCard}>
              <h3>{t.courseTitle2}</h3>
              <p>{t.courseDesc2}</p>
              <Link href="/courses/security">{t.courseMore}</Link>
            </div>
            <div className={styles.courseCard}>
              <h3>{t.courseTitle3}</h3>
              <p>{t.courseDesc3}</p>
              <Link href="/courses/service-provider">{t.courseMore}</Link>
            </div>
          </div>
        </section>

        {/* 5. 简化版联系部分 */}
        <section className={styles.contact}>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactDesc}</p>
          <div className={styles.contactButtons}>
            <Link href="/contact" className={styles.primaryButton}>
              {t.contactButton1}
            </Link>
            <a href="tel:+123456789" className={styles.secondaryButton}>
              {t.contactButton2}
            </a>
          </div>
        </section>
      </main>
    </div>
  );
} 