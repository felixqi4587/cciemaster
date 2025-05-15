import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Courses.module.css';

export default function Courses({ language }) {
  // 语言文本
  const text = {
    zh: {
      title: 'CCIE培训课程 - 专业网络认证培训',
      description: '浏览我们的CCIE培训课程，包括企业基础设施、安全、服务提供商和数据中心等专业方向',
      hero: {
        title: '我们的CCIE培训课程',
        subtitle: '选择适合您的专业方向，开启CCIE认证之旅'
      },
      courses: [
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
      ],
      courseInfo: {
        difficulty: '难度',
        duration: '时长',
        content: '课程内容',
        details: '课程详情',
        enroll: '咨询报名'
      },
      cta: {
        title: '无法决定哪个课程适合您？',
        subtitle: '联系我们的课程顾问，获取个性化学习方案',
        button: '获取课程建议'
      }
    },
    en: {
      title: 'CCIE Training Courses - Professional Network Certification',
      description: 'Explore our CCIE training courses, including Enterprise Infrastructure, Security, Service Provider, and Data Center specializations',
      hero: {
        title: 'Our CCIE Training Courses',
        subtitle: 'Choose your specialization path to CCIE certification'
      },
      courses: [
        {
          id: 'enterprise',
          title: 'CCIE Enterprise Infrastructure',
          description: 'Learn enterprise network architecture design and implementation, including advanced routing, switching, wireless, and security technologies.',
          level: 'Advanced',
          duration: '6 months',
          features: [
            'In-depth routing protocols (OSPF, EIGRP, BGP)',
            'Enterprise network design & implementation',
            'Advanced switching technologies (VLAN, STP, VTP)',
            'Network security best practices',
            'Troubleshooting and optimization',
            'Hands-on lab training'
          ]
        },
        {
          id: 'security',
          title: 'CCIE Security',
          description: 'Master network security technologies and protection strategies to become a network security expert.',
          level: 'Advanced',
          duration: '6 months',
          features: [
            'Security architecture design',
            'Identity management and access control',
            'VPN technologies and implementation',
            'Threat defense system configuration',
            'Security policy design and implementation',
            'Security auditing and compliance'
          ]
        },
        {
          id: 'service-provider',
          title: 'CCIE Service Provider',
          description: 'Focus on large service provider network technologies, including advanced MPLS and QoS implementation.',
          level: 'Advanced',
          duration: '6 months',
          features: [
            'In-depth MPLS technologies',
            'Advanced BGP features and optimization',
            'Service provider network architecture',
            'QoS policy design and implementation',
            'IPv6 deployment and transition',
            'Large-scale network troubleshooting'
          ]
        },
        {
          id: 'datacenter',
          title: 'CCIE Data Center',
          description: 'Learn data center technologies, including virtualization, storage networking, and cloud infrastructure.',
          level: 'Advanced',
          duration: '6 months',
          features: [
            'Data center architecture design',
            'Storage networking technologies (SAN, NAS)',
            'Virtualization and cloud platforms',
            'ACI and SDN technologies',
            'High availability design',
            'Disaster recovery solutions'
          ]
        }
      ],
      courseInfo: {
        difficulty: 'Difficulty',
        duration: 'Duration',
        content: 'Course Content',
        details: 'Course Details',
        enroll: 'Enroll Now'
      },
      cta: {
        title: 'Not sure which course is right for you?',
        subtitle: 'Contact our advisors for personalized learning recommendations',
        button: 'Get Course Advice'
      }
    }
  };

  // 使用当前语言或默认为英文
  const t = text[language || 'en'];
  const courses = t.courses;

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

      <section className={styles.courseList}>
        {courses.map((course) => (
          <div key={course.id} className={styles.courseCard}>
            <div className={styles.courseHeader}>
              <h2>{course.title}</h2>
              <div className={styles.courseInfo}>
                <span>{t.courseInfo.difficulty}: {course.level}</span>
                <span>{t.courseInfo.duration}: {course.duration}</span>
              </div>
            </div>
            <p className={styles.courseDescription}>{course.description}</p>
            <div className={styles.courseFeatures}>
              <h3>{t.courseInfo.content}</h3>
              <ul>
                {course.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className={styles.courseActions}>
              <Link href={`/courses/${course.id}`} className={styles.primaryButton}>
                {t.courseInfo.details}
              </Link>
              <Link href="/contact" className={styles.secondaryButton}>
                {t.courseInfo.enroll}
              </Link>
            </div>
          </div>
        ))}
      </section>

      <section className={styles.cta}>
        <h2>{t.cta.title}</h2>
        <p>{t.cta.subtitle}</p>
        <Link href="/contact" className={styles.primaryButton}>
          {t.cta.button}
        </Link>
      </section>
    </>
  );
} 