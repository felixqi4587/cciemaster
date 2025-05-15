import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Resources.module.css';

export default function Resources({ language }) {
  // 语言文本
  const text = {
    zh: {
      title: 'CCIE学习资源 - 免费学习资料和工具',
      description: '获取CCIE认证学习所需的各种学习资源，包括实验指南、考试技巧和学习工具',
      hero: {
        title: 'CCIE学习资源中心',
        subtitle: '加速您的CCIE认证之旅'
      },
      categories: {
        title: '资源分类',
        free: '免费资源',
        premium: '高级资源',
        tools: '学习工具',
        guides: '学习指南'
      },
      resources: [
        {
          id: 'study-guide',
          title: 'CCIE学习指南',
          type: '免费PDF',
          description: '涵盖CCIE认证考试所有主要知识点的学习指南，包括路由、交换、安全和无线网络技术。',
          cta: '立即下载'
        },
        {
          id: 'exam-tips',
          title: '考试技巧与策略',
          type: '免费电子书',
          description: '来自已通过CCIE考试工程师的宝贵经验和考试技巧，帮助您有效准备并通过考试。',
          cta: '立即下载'
        },
        {
          id: 'lab-workbook',
          title: '实验手册合集',
          type: '高级资源',
          description: '100+实验练习，覆盖CCIE考试所有实验场景，帮助您熟悉考试环境和要求。',
          cta: '了解更多'
        },
        {
          id: 'flashcards',
          title: 'CCIE知识点闪卡',
          type: '学习工具',
          description: '包含500+CCIE重要知识点的电子闪卡，是加强记忆和快速复习的利器。',
          cta: '立即使用'
        },
        {
          id: 'video-lessons',
          title: '视频课程样例',
          type: '免费视频',
          description: '精选CCIE核心技术的视频教程样例，体验我们的专业培训风格和教学方法。',
          cta: '观看视频'
        },
        {
          id: 'study-planner',
          title: '学习计划制定工具',
          type: '学习工具',
          description: '根据您的时间和目标，生成个性化的CCIE学习计划，确保高效备考。',
          cta: '开始使用'
        }
      ],
      newsletter: {
        title: '订阅更多学习资源',
        description: '每周接收CCIE学习技巧、资源更新和独家学习资料',
        placeholder: '输入您的邮箱',
        button: '订阅'
      },
      contact: {
        title: '需要更多帮助？',
        description: '我们的CCIE专家团队随时为您提供帮助',
        button: '联系我们'
      }
    },
    en: {
      title: 'CCIE Learning Resources - Free Study Materials and Tools',
      description: 'Access various learning resources needed for CCIE certification, including lab guides, exam tips, and study tools',
      hero: {
        title: 'CCIE Learning Resource Center',
        subtitle: 'Accelerate your CCIE certification journey'
      },
      categories: {
        title: 'Resource Categories',
        free: 'Free Resources',
        premium: 'Premium Resources',
        tools: 'Study Tools',
        guides: 'Study Guides'
      },
      resources: [
        {
          id: 'study-guide',
          title: 'CCIE Study Guide',
          type: 'Free PDF',
          description: 'A comprehensive study guide covering all major topics for the CCIE certification exam, including routing, switching, security, and wireless technologies.',
          cta: 'Download Now'
        },
        {
          id: 'exam-tips',
          title: 'Exam Tips & Strategies',
          type: 'Free eBook',
          description: 'Valuable experience and exam tips from engineers who have passed the CCIE exam, helping you prepare effectively and pass the exam.',
          cta: 'Download Now'
        },
        {
          id: 'lab-workbook',
          title: 'Lab Workbook Collection',
          type: 'Premium Resource',
          description: '100+ lab exercises covering all CCIE exam scenarios, helping you become familiar with the exam environment and requirements.',
          cta: 'Learn More'
        },
        {
          id: 'flashcards',
          title: 'CCIE Knowledge Flashcards',
          type: 'Study Tool',
          description: 'Digital flashcards containing 500+ important CCIE concepts, perfect for reinforcing memory and quick review.',
          cta: 'Use Now'
        },
        {
          id: 'video-lessons',
          title: 'Video Lessons Sample',
          type: 'Free Videos',
          description: 'Selected video tutorials on CCIE core technologies, experience our professional training style and teaching methods.',
          cta: 'Watch Videos'
        },
        {
          id: 'study-planner',
          title: 'Study Plan Generator',
          type: 'Study Tool',
          description: 'Generate a personalized CCIE study plan based on your time and goals, ensuring efficient exam preparation.',
          cta: 'Start Using'
        }
      ],
      newsletter: {
        title: 'Subscribe for More Resources',
        description: 'Receive weekly CCIE study tips, resource updates, and exclusive study materials',
        placeholder: 'Enter your email',
        button: 'Subscribe'
      },
      contact: {
        title: 'Need More Help?',
        description: 'Our team of CCIE experts is here to help you',
        button: 'Contact Us'
      }
    }
  };

  // 使用当前语言或默认为英文
  const t = text[language || 'en'];
  const resources = t.resources;

  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
      </Head>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>{t.hero.title}</h1>
          <p>{t.hero.subtitle}</p>
        </div>
      </section>

      <section className={styles.categories}>
        <h2>{t.categories.title}</h2>
        <div className={styles.categoryButtons}>
          <button className={styles.categoryButton}>{t.categories.free}</button>
          <button className={styles.categoryButton}>{t.categories.premium}</button>
          <button className={styles.categoryButton}>{t.categories.tools}</button>
          <button className={styles.categoryButton}>{t.categories.guides}</button>
        </div>
      </section>

      <section className={styles.resourceGrid}>
        {resources.map((resource) => (
          <div key={resource.id} className={styles.resourceCard}>
            <div className={styles.resourceType}>{resource.type}</div>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <Link href={`/resources/${resource.id}`} className={styles.resourceButton}>
              {resource.cta}
            </Link>
          </div>
        ))}
      </section>

      <section className={styles.newsletter}>
        <div className={styles.newsletterContent}>
          <h2>{t.newsletter.title}</h2>
          <p>{t.newsletter.description}</p>
          <form className={styles.subscribeForm}>
            <input type="email" placeholder={t.newsletter.placeholder} required />
            <button type="submit" className={styles.subscribeButton}>
              {t.newsletter.button}
            </button>
          </form>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className={styles.contactContent}>
          <h2>{t.contact.title}</h2>
          <p>{t.contact.description}</p>
          <Link href="/contact" className={styles.contactButton}>
            {t.contact.button}
          </Link>
        </div>
      </section>
    </>
  );
} 