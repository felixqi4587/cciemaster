import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Courses.module.css';

export default function Courses() {
  const courses = [
    {
      id: 'enterprise',
      title: 'CCIE企业基础设施',
      description: '学习企业网络架构设计与实现，包括高级路由、交换、无线网络和安全技术。',
      level: '高级',
      duration: '6个月',
      features: [
        '路由协议深度解析（OSPF, EIGRP, BGP）',
        '企业网络设计与实现',
        '高级交换技术（VLAN, STP, VTP）',
        '网络安全最佳实践',
        '故障排除和优化',
        '实验室实战训练'
      ]
    },
    {
      id: 'security',
      title: 'CCIE安全专家',
      description: '掌握网络安全技术与防护策略，成为网络安全专家。',
      level: '高级',
      duration: '6个月',
      features: [
        '安全架构设计',
        '身份管理和访问控制',
        'VPN技术与实现',
        '威胁防御系统配置',
        '安全策略设计与实施',
        '安全审计与合规'
      ]
    },
    {
      id: 'service-provider',
      title: 'CCIE服务提供商',
      description: '专注于大型服务提供商网络技术，包括高级MPLS和QoS实现。',
      level: '高级',
      duration: '6个月',
      features: [
        'MPLS技术深度解析',
        'BGP高级特性与优化',
        '服务提供商网络架构',
        'QoS策略设计与实现',
        'IPv6部署与过渡',
        '大规模网络故障排除'
      ]
    },
    {
      id: 'datacenter',
      title: 'CCIE数据中心',
      description: '学习数据中心技术，包括虚拟化、存储网络和云基础设施。',
      level: '高级',
      duration: '6个月',
      features: [
        '数据中心架构设计',
        '存储网络技术（SAN, NAS）',
        '虚拟化与云平台',
        'ACI与SDN技术',
        '高可用性设计',
        '灾备解决方案'
      ]
    }
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>CCIE培训课程 - 专业网络认证培训</title>
        <meta name="description" content="浏览我们的CCIE培训课程，包括企业基础设施、安全、服务提供商和数据中心等专业方向" />
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
            <h1>我们的CCIE培训课程</h1>
            <p>选择适合您的专业方向，开启CCIE认证之旅</p>
          </div>
        </section>

        <section className={styles.courseList}>
          {courses.map((course) => (
            <div key={course.id} className={styles.courseCard}>
              <div className={styles.courseHeader}>
                <h2>{course.title}</h2>
                <div className={styles.courseInfo}>
                  <span>难度: {course.level}</span>
                  <span>时长: {course.duration}</span>
                </div>
              </div>
              <p className={styles.courseDescription}>{course.description}</p>
              <div className={styles.courseFeatures}>
                <h3>课程内容</h3>
                <ul>
                  {course.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.courseActions}>
                <Link href={`/courses/${course.id}`} className={styles.primaryButton}>
                  课程详情
                </Link>
                <Link href="/contact" className={styles.secondaryButton}>
                  咨询报名
                </Link>
              </div>
            </div>
          ))}
        </section>

        <section className={styles.cta}>
          <h2>无法决定哪个课程适合您？</h2>
          <p>联系我们的课程顾问，获取个性化学习方案</p>
          <Link href="/contact" className={styles.primaryButton}>
            获取课程建议
          </Link>
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