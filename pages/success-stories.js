import Layout from '../components/Layout';
import LeadMagnet from '../components/LeadMagnet';
import styles from '../styles/SuccessStories.module.css';
import Link from 'next/link';

export default function SuccessStories() {
  // 学员案例数据
  const successStories = [
    {
      id: 'zhang-wei',
      name: '张伟',
      title: '网络架构师',
      company: '某大型互联网公司',
      image: '/images/success-stories/zhang-wei.jpg',
      story: '通过CCIE认证后，我从普通的网络工程师晋升为网络架构师，薪资提升了60%。CCIE培训中心的实战课程让我快速掌握了企业级网络设计与实现能力，对我的职业发展帮助巨大。',
      achievement: 'CCIE企业基础设施',
      studyTime: '6个月',
      salary: '薪资提升60%',
      position: '从网络工程师晋升为网络架构师'
    },
    {
      id: 'li-na',
      name: '李娜',
      title: '高级网络安全工程师',
      company: '某知名金融机构',
      image: '/images/success-stories/li-na.jpg',
      story: '作为金融行业的网络安全工程师，CCIE安全认证对我的职业发展至关重要。我在CCIE培训中心学习期间，不仅掌握了理论知识，更重要的是通过大量实验掌握了实际安全防护技能，现在负责整个公司的网络安全建设。',
      achievement: 'CCIE安全专家',
      studyTime: '8个月',
      salary: '年薪超过50万',
      position: '负责公司核心网络安全系统'
    },
    {
      id: 'wang-jian',
      name: '王健',
      title: '技术总监',
      company: '某云服务提供商',
      image: '/images/success-stories/wang-jian.jpg',
      story: 'CCIE服务提供商认证帮助我在云服务行业站稳脚跟。培训课程中学习的大规模网络设计和优化技术，让我能够为客户提供更专业的解决方案，最终获得了技术总监的职位。',
      achievement: 'CCIE服务提供商',
      studyTime: '7个月',
      salary: '薪资翻倍',
      position: '从解决方案工程师晋升为技术总监'
    },
    {
      id: 'chen-lei',
      name: '陈磊',
      title: '数据中心专家',
      company: '某大型IT服务企业',
      image: '/images/success-stories/chen-lei.jpg',
      story: '参加CCIE数据中心培训是我职业生涯中最正确的决定。通过系统学习，我掌握了最前沿的数据中心技术，现在作为公司核心技术团队成员，负责多个大型数据中心的建设和运维。',
      achievement: 'CCIE数据中心',
      studyTime: '9个月',
      salary: '年薪提升80%',
      position: '成为公司核心技术专家'
    },
    {
      id: 'zhao-min',
      name: '赵敏',
      title: '高级网络顾问',
      company: '某知名咨询公司',
      image: '/images/success-stories/zhao-min.jpg',
      story: '取得CCIE认证后，我从普通的技术支持转型为专业网络顾问。现在我为多家企业提供网络规划和优化服务，不仅工作更有成就感，收入也大幅提高。感谢CCIE培训中心的专业指导！',
      achievement: 'CCIE企业基础设施',
      studyTime: '6个月',
      salary: '咨询费率提高200%',
      position: '成为独立网络顾问'
    },
    {
      id: 'liu-yang',
      name: '刘洋',
      title: '创业者/技术合伙人',
      company: '某网络解决方案创业公司',
      image: '/images/success-stories/liu-yang.jpg',
      story: 'CCIE认证给了我足够的技术自信，让我决定创办自己的网络解决方案公司。培训中心教授的不仅是技术，还有解决实际问题的思路和方法，这对我的创业之路帮助巨大。',
      achievement: 'CCIE企业基础设施 + CCIE安全',
      studyTime: '12个月（双认证）',
      salary: '创立自己的公司',
      position: '从企业员工到创业者'
    }
  ];

  // 认证数据
  const certifications = [
    {
      name: 'CCIE企业基础设施',
      count: 527,
      passRate: '92%'
    },
    {
      name: 'CCIE安全',
      count: 312,
      passRate: '89%'
    },
    {
      name: 'CCIE服务提供商',
      count: 198,
      passRate: '86%'
    },
    {
      name: 'CCIE数据中心',
      count: 245,
      passRate: '90%'
    }
  ];

  // 雇主数据
  const employers = [
    '阿里巴巴', '腾讯', '百度', '华为', '中国电信', 
    '中国移动', '中国联通', '中国银行', '工商银行', '建设银行', 
    '京东', '字节跳动', '美团', '滴滴', '小米'
  ];

  return (
    <Layout
      title="CCIE培训成功案例 - 学员职业成长故事"
      description="阅读我们学员的CCIE认证成功故事，了解他们如何通过CCIE培训提升技能、加薪晋升、转型创业。"
    >
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>学员成功故事</h1>
          <p>看看他们如何通过CCIE认证改变职业生涯</p>
        </div>
      </div>

      <div className={styles.container}>
        {/* 数据统计 */}
        <section className={styles.statsSection}>
          <div className={styles.statsContainer}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>2000+</div>
              <div className={styles.statLabel}>认证学员</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>90%+</div>
              <div className={styles.statLabel}>通过率</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>60%+</div>
              <div className={styles.statLabel}>平均薪资增长</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>85%+</div>
              <div className={styles.statLabel}>晋升率</div>
            </div>
          </div>
        </section>

        {/* 学员故事 */}
        <section className={styles.storiesSection}>
          <h2 className={styles.sectionTitle}>他们的CCIE之旅</h2>
          <p className={styles.sectionDescription}>
            阅读我们学员的成功故事，了解他们如何通过CCIE认证实现职业目标
          </p>

          <div className={styles.storiesGrid}>
            {successStories.map((story) => (
              <div className={styles.storyCard} key={story.id}>
                <div className={styles.storyHeader}>
                  <div className={styles.storyImage}>
                    <img src={story.image || '/images/success-stories/default.jpg'} alt={story.name} />
                  </div>
                  <div className={styles.storyMeta}>
                    <h3>{story.name}</h3>
                    <p className={styles.storyTitle}>{story.title}</p>
                    <p className={styles.storyCompany}>{story.company}</p>
                  </div>
                </div>
                <div className={styles.storyBody}>
                  <p className={styles.storyText}>"{story.story}"</p>
                </div>
                <div className={styles.storyAchievements}>
                  <div className={styles.achievementItem}>
                    <span className={styles.achievementLabel}>认证:</span>
                    <span className={styles.achievementValue}>{story.achievement}</span>
                  </div>
                  <div className={styles.achievementItem}>
                    <span className={styles.achievementLabel}>学习时间:</span>
                    <span className={styles.achievementValue}>{story.studyTime}</span>
                  </div>
                  <div className={styles.achievementItem}>
                    <span className={styles.achievementLabel}>薪资提升:</span>
                    <span className={styles.achievementValue}>{story.salary}</span>
                  </div>
                  <div className={styles.achievementItem}>
                    <span className={styles.achievementLabel}>职位变化:</span>
                    <span className={styles.achievementValue}>{story.position}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 转化引导 */}
        <section className={styles.ctaSection}>
          <LeadMagnet
            title="想要和他们一样成功吗？"
            description="填写下方表单，获取CCIE学习路线图和免费课程体验"
            buttonText="立即申请"
            type="banner"
          />
        </section>

        {/* 认证统计 */}
        <section className={styles.certificationSection}>
          <h2 className={styles.sectionTitle}>我们的认证业绩</h2>
          <p className={styles.sectionDescription}>
            多年来，我们已帮助上千名学员成功获得CCIE认证
          </p>

          <div className={styles.certificationGrid}>
            {certifications.map((cert, index) => (
              <div className={styles.certificationCard} key={index}>
                <h3>{cert.name}</h3>
                <div className={styles.certificationStats}>
                  <div className={styles.certStat}>
                    <div className={styles.certStatValue}>{cert.count}+</div>
                    <div className={styles.certStatLabel}>认证学员</div>
                  </div>
                  <div className={styles.certStat}>
                    <div className={styles.certStatValue}>{cert.passRate}</div>
                    <div className={styles.certStatLabel}>通过率</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 雇主展示 */}
        <section className={styles.employersSection}>
          <h2 className={styles.sectionTitle}>我们的学员就职于</h2>
          <div className={styles.employersGrid}>
            {employers.map((employer, index) => (
              <div className={styles.employerItem} key={index}>
                {employer}
              </div>
            ))}
          </div>
        </section>

        {/* 底部号召 */}
        <section className={styles.bottomCTA}>
          <h2>开始您的CCIE认证之旅</h2>
          <p>加入我们的培训计划，让CCIE认证成为您职业发展的加速器</p>
          <div className={styles.ctaButtons}>
            <Link href="/courses" className={styles.primaryButton}>
              浏览培训课程
            </Link>
            <Link href="/contact" className={styles.secondaryButton}>
              联系课程顾问
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
} 