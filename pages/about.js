import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/About.module.css';

export default function About({ language }) {
  // 语言文本
  const text = {
    zh: {
      title: '关于我们 - CCIE培训中心',
      description: '了解CCIE培训中心的专业团队和培训理念',
      hero: {
        title: '关于我们',
        subtitle: '专业的CCIE认证培训机构，助您成为网络技术专家'
      },
      story: {
        title: '我们的故事',
        paragraph1: 'CCIE培训中心成立于2010年，是国内专业的思科认证培训机构。我们由一群热爱网络技术、拥有丰富实战经验的CCIE工程师创立，致力于为学员提供高质量的CCIE认证培训服务。',
        paragraph2: '多年来，我们已经帮助数千名学员成功通过CCIE认证考试，他们现在活跃在各大企业、运营商和互联网公司，担任网络架构师、安全专家等重要岗位。',
        paragraph3: '我们相信，真正的技术培训不仅是传授知识，更重要的是培养解决实际问题的能力。因此，我们的课程设计注重理论与实践相结合，通过大量的实验和案例分析，帮助学员掌握真正的技术能力。'
      },
      advantages: {
        title: '我们的优势',
        items: [
          {
            icon: '专',
            title: '专业讲师团队',
            description: '所有讲师均为CCIE认证工程师，拥有丰富的实战经验和教学经验'
          },
          {
            icon: '实',
            title: '实战化教学',
            description: '课程内容基于真实网络环境设计，注重实用技能培养'
          },
          {
            icon: '新',
            title: '前沿技术',
            description: '课程内容及时更新，紧跟思科最新技术发展方向'
          },
          {
            icon: '全',
            title: '全程服务',
            description: '从基础知识到认证考试，提供全方位的学习支持和指导'
          }
        ]
      },
      team: {
        title: '我们的团队',
        members: [
          {
            name: '张教授',
            title: '首席讲师',
            description: 'CCIE双认证工程师，拥有超过15年网络设计和实施经验，曾服务于多家大型企业和ISP。',
            expertise: ['路由交换', '网络设计', '故障排除']
          },
          {
            name: '李工程师',
            title: '技术总监',
            description: 'CCIE安全专家，曾负责多个大型企业的网络安全架构，拥有丰富的实战经验。',
            expertise: ['网络安全', 'VPN技术', '安全审计']
          },
          {
            name: '王讲师',
            title: '高级讲师',
            description: 'CCIE数据中心认证，在云计算和数据中心领域有深厚的技术积累。',
            expertise: ['数据中心', '虚拟化', '云技术']
          }
        ],
        expertiseLabel: '专长'
      },
      values: {
        title: '我们的理念',
        items: [
          {
            title: '专注',
            description: '专注于CCIE认证培训，提供最专业的培训服务'
          },
          {
            title: '实用',
            description: '注重实用技能培养，培训内容贴近工作实际需求'
          },
          {
            title: '创新',
            description: '不断创新教学方法，提高培训效果和学习体验'
          },
          {
            title: '成长',
            description: '帮助每位学员实现技术能力和职业发展的双重成长'
          }
        ]
      },
      cta: {
        title: '加入我们的培训',
        subtitle: '无论您是网络工程师还是IT爱好者，我们都能帮助您实现CCIE认证目标',
        coursesButton: '浏览课程',
        contactButton: '联系我们'
      }
    },
    en: {
      title: 'About Us - CCIE Training Center',
      description: 'Learn about our professional team and training philosophy at CCIE Training Center',
      hero: {
        title: 'About Us',
        subtitle: 'Professional CCIE certification training to help you become a network expert'
      },
      story: {
        title: 'Our Story',
        paragraph1: 'Founded in 2010, CCIE Training Center is a professional Cisco certification training institution. We were established by a group of CCIE engineers who are passionate about network technology and have rich practical experience, dedicated to providing high-quality CCIE certification training services.',
        paragraph2: 'Over the years, we have helped thousands of students successfully pass the CCIE certification exam. They now work in major enterprises, carriers, and internet companies as network architects, security experts, and other important positions.',
        paragraph3: 'We believe that true technical training is not just about imparting knowledge, but more importantly, cultivating the ability to solve practical problems. Therefore, our course design focuses on combining theory with practice, helping students master real technical abilities through extensive experiments and case analysis.'
      },
      advantages: {
        title: 'Our Advantages',
        items: [
          {
            icon: 'P',
            title: 'Professional Instructors',
            description: 'All instructors are CCIE certified engineers with rich practical and teaching experience'
          },
          {
            icon: 'R',
            title: 'Real-world Training',
            description: 'Course content designed based on real network environments, focusing on practical skills'
          },
          {
            icon: 'I',
            title: 'Innovative Technology',
            description: 'Course content is updated in a timely manner, keeping pace with Cisco\'s latest technology directions'
          },
          {
            icon: 'C',
            title: 'Complete Service',
            description: 'Providing comprehensive learning support and guidance from basic knowledge to certification exams'
          }
        ]
      },
      team: {
        title: 'Our Team',
        members: [
          {
            name: 'Prof. Zhang',
            title: 'Chief Instructor',
            description: 'CCIE dual certified engineer with over 15 years of network design and implementation experience, having served multiple large enterprises and ISPs.',
            expertise: ['Routing & Switching', 'Network Design', 'Troubleshooting']
          },
          {
            name: 'Engineer Li',
            title: 'Technical Director',
            description: 'CCIE Security expert who has been responsible for the network security architecture of multiple large enterprises with rich practical experience.',
            expertise: ['Network Security', 'VPN Technology', 'Security Audit']
          },
          {
            name: 'Instructor Wang',
            title: 'Senior Instructor',
            description: 'CCIE Data Center certified with deep technical expertise in cloud computing and data center domains.',
            expertise: ['Data Center', 'Virtualization', 'Cloud Technology']
          }
        ],
        expertiseLabel: 'Expertise'
      },
      values: {
        title: 'Our Philosophy',
        items: [
          {
            title: 'Focus',
            description: 'Focus on CCIE certification training to provide the most professional training services'
          },
          {
            title: 'Practicality',
            description: 'Emphasize practical skill development with training content closely aligned with actual work requirements'
          },
          {
            title: 'Innovation',
            description: 'Continuously innovate teaching methods to improve training effectiveness and learning experience'
          },
          {
            title: 'Growth',
            description: 'Help each student achieve both technical capability and career development growth'
          }
        ]
      },
      cta: {
        title: 'Join Our Training',
        subtitle: 'Whether you are a network engineer or an IT enthusiast, we can help you achieve your CCIE certification goals',
        coursesButton: 'Browse Courses',
        contactButton: 'Contact Us'
      }
    }
  };

  // 使用当前语言或默认为英文
  const t = text[language || 'en'];

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

      <section className={styles.story}>
        <div className={styles.storyContent}>
          <h2>{t.story.title}</h2>
          <p>{t.story.paragraph1}</p>
          <p>{t.story.paragraph2}</p>
          <p>{t.story.paragraph3}</p>
        </div>
      </section>

      <section className={styles.advantage}>
        <h2>{t.advantages.title}</h2>
        <div className={styles.advantageGrid}>
          {t.advantages.items.map((item, index) => (
            <div key={index} className={styles.advantageCard}>
              <div className={styles.advantageIcon}>
                <span>{item.icon}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.team}>
        <h2>{t.team.title}</h2>
        <div className={styles.teamGrid}>
          {t.team.members.map((member, index) => (
            <div key={index} className={styles.teamCard}>
              <div className={styles.teamAvatar}>
                <div className={styles.avatarPlaceholder}>{member.name.charAt(0)}</div>
              </div>
              <div className={styles.teamInfo}>
                <h3>{member.name}</h3>
                <div className={styles.teamTitle}>{member.title}</div>
                <p>{member.description}</p>
                <div className={styles.expertise}>
                  <span>{t.team.expertiseLabel}：</span>
                  {member.expertise.map((skill, i) => (
                    <span key={i} className={styles.skill}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.values}>
        <h2>{t.values.title}</h2>
        <div className={styles.valuesContent}>
          {t.values.items.map((value, index) => (
            <div key={index} className={styles.valueCard}>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <h2>{t.cta.title}</h2>
        <p>{t.cta.subtitle}</p>
        <div className={styles.ctaButtons}>
          <Link href="/courses" className={styles.primaryButton}>
            {t.cta.coursesButton}
          </Link>
          <Link href="/contact" className={styles.secondaryButton}>
            {t.cta.contactButton}
          </Link>
        </div>
      </section>
    </>
  );
} 