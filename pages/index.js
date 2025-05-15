import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>CCIE培训 - 成为网络专家的捷径</title>
        <meta name="description" content="专业的CCIE培训课程，助您快速成为网络专家" />
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
            <h1>专业CCIE认证培训</h1>
            <h2>助您快速成为网络工程专家</h2>
            <p>我们提供最专业的培训和最完善的学习资源，帮助您通过CCIE认证考试</p>
            <div className={styles.cta}>
              <Link href="/contact" className={styles.primaryButton}>
                立即联系
              </Link>
              <Link href="/courses" className={styles.secondaryButton}>
                了解课程
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.featureCard}>
            <h3>专业讲师团队</h3>
            <p>由CCIE认证工程师和资深讲师组成的专业团队</p>
          </div>
          <div className={styles.featureCard}>
            <h3>实战模拟环境</h3>
            <p>提供真实的网络环境模拟，让您在实践中掌握技能</p>
          </div>
          <div className={styles.featureCard}>
            <h3>全程学习指导</h3>
            <p>从基础到高级，我们提供全程学习指导和支持</p>
          </div>
        </section>

        <section className={styles.courses}>
          <h2>热门课程</h2>
          <div className={styles.courseGrid}>
            <div className={styles.courseCard}>
              <h3>CCIE企业基础设施</h3>
              <p>学习企业网络架构设计与实现</p>
              <Link href="/courses/enterprise">了解更多</Link>
            </div>
            <div className={styles.courseCard}>
              <h3>CCIE安全专家</h3>
              <p>掌握网络安全技术与防护策略</p>
              <Link href="/courses/security">了解更多</Link>
            </div>
            <div className={styles.courseCard}>
              <h3>CCIE服务提供商</h3>
              <p>专注于大型服务提供商网络技术</p>
              <Link href="/courses/service-provider">了解更多</Link>
            </div>
          </div>
        </section>

        <section className={styles.testimonials}>
          <h2>学员评价</h2>
          <div className={styles.testimonialGrid}>
            <div className={styles.testimonialCard}>
              <p>"通过这里的培训，我顺利通过了CCIE认证考试，现在在大型企业担任网络架构师。"</p>
              <div className={styles.testimonialAuthor}>- 张先生，网络架构师</div>
            </div>
            <div className={styles.testimonialCard}>
              <p>"课程内容非常实用，讲师经验丰富，让我对网络技术有了更深入的理解。"</p>
              <div className={styles.testimonialAuthor}>- 李女士，网络工程师</div>
            </div>
          </div>
        </section>

        <section className={styles.contact}>
          <h2>联系我们</h2>
          <p>想了解更多课程信息？立即联系我们获取详细资料！</p>
          <div className={styles.contactButtons}>
            <Link href="/contact" className={styles.primaryButton}>
              获取课程资料
            </Link>
            <a href="tel:+123456789" className={styles.secondaryButton}>
              电话咨询
            </a>
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