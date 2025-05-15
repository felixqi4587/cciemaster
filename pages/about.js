import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/About.module.css';

export default function About() {
  const teams = [
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
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>关于我们 - CCIE培训中心</title>
        <meta name="description" content="了解CCIE培训中心的专业团队和培训理念" />
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
            <h1>关于我们</h1>
            <p>专业的CCIE认证培训机构，助您成为网络技术专家</p>
          </div>
        </section>

        <section className={styles.story}>
          <div className={styles.storyContent}>
            <h2>我们的故事</h2>
            <p>CCIE培训中心成立于2010年，是国内专业的思科认证培训机构。我们由一群热爱网络技术、拥有丰富实战经验的CCIE工程师创立，致力于为学员提供高质量的CCIE认证培训服务。</p>
            <p>多年来，我们已经帮助数千名学员成功通过CCIE认证考试，他们现在活跃在各大企业、运营商和互联网公司，担任网络架构师、安全专家等重要岗位。</p>
            <p>我们相信，真正的技术培训不仅是传授知识，更重要的是培养解决实际问题的能力。因此，我们的课程设计注重理论与实践相结合，通过大量的实验和案例分析，帮助学员掌握真正的技术能力。</p>
          </div>
        </section>

        <section className={styles.advantage}>
          <h2>我们的优势</h2>
          <div className={styles.advantageGrid}>
            <div className={styles.advantageCard}>
              <div className={styles.advantageIcon}>
                <span>专</span>
              </div>
              <h3>专业讲师团队</h3>
              <p>所有讲师均为CCIE认证工程师，拥有丰富的实战经验和教学经验</p>
            </div>
            <div className={styles.advantageCard}>
              <div className={styles.advantageIcon}>
                <span>实</span>
              </div>
              <h3>实战化教学</h3>
              <p>课程内容基于真实网络环境设计，注重实用技能培养</p>
            </div>
            <div className={styles.advantageCard}>
              <div className={styles.advantageIcon}>
                <span>新</span>
              </div>
              <h3>前沿技术</h3>
              <p>课程内容及时更新，紧跟思科最新技术发展方向</p>
            </div>
            <div className={styles.advantageCard}>
              <div className={styles.advantageIcon}>
                <span>全</span>
              </div>
              <h3>全程服务</h3>
              <p>从基础知识到认证考试，提供全方位的学习支持和指导</p>
            </div>
          </div>
        </section>

        <section className={styles.team}>
          <h2>我们的团队</h2>
          <div className={styles.teamGrid}>
            {teams.map((member, index) => (
              <div key={index} className={styles.teamCard}>
                <div className={styles.teamAvatar}>
                  {/* 这里可以放头像图片 */}
                  <div className={styles.avatarPlaceholder}>{member.name.charAt(0)}</div>
                </div>
                <div className={styles.teamInfo}>
                  <h3>{member.name}</h3>
                  <div className={styles.teamTitle}>{member.title}</div>
                  <p>{member.description}</p>
                  <div className={styles.expertise}>
                    <span>专长：</span>
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
          <h2>我们的理念</h2>
          <div className={styles.valuesContent}>
            <div className={styles.valueCard}>
              <h3>专注</h3>
              <p>专注于CCIE认证培训，提供最专业的培训服务</p>
            </div>
            <div className={styles.valueCard}>
              <h3>实用</h3>
              <p>注重实用技能培养，培训内容贴近工作实际需求</p>
            </div>
            <div className={styles.valueCard}>
              <h3>创新</h3>
              <p>不断创新教学方法，提高培训效果和学习体验</p>
            </div>
            <div className={styles.valueCard}>
              <h3>成长</h3>
              <p>帮助每位学员实现技术能力和职业发展的双重成长</p>
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <h2>加入我们的培训</h2>
          <p>无论您是网络工程师还是IT爱好者，我们都能帮助您实现CCIE认证目标</p>
          <div className={styles.ctaButtons}>
            <Link href="/courses" className={styles.primaryButton}>
              浏览课程
            </Link>
            <Link href="/contact" className={styles.secondaryButton}>
              联系我们
            </Link>
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