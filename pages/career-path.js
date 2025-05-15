import Layout from '../components/Layout';
import LeadMagnet from '../components/LeadMagnet';
import CountdownTimer from '../components/CountdownTimer';
import SkillAssessment from '../components/SkillAssessment';
import styles from '../styles/CareerPath.module.css';
import Link from 'next/link';

export default function CareerPath() {
  // 职业路径数据
  const careerPaths = [
    {
      title: '网络工程师',
      description: '负责企业网络的日常运维和配置，确保网络稳定运行',
      salaryRange: '8千-1.5万/月',
      experienceRequired: '0-2年',
      skills: ['网络基础知识', 'CCNA水平技能', '基本故障排除能力'],
      certification: ['CCNA'],
      icon: '🔌'
    },
    {
      title: '高级网络工程师',
      description: '负责复杂网络环境的设计和实施，解决疑难网络问题',
      salaryRange: '1.5万-2.5万/月',
      experienceRequired: '3-5年',
      skills: ['路由交换深入理解', '网络安全基础', '多厂商设备经验'],
      certification: ['CCNP', 'CCIE笔试'],
      icon: '🖥️'
    },
    {
      title: '网络架构师',
      description: '设计大型网络架构，制定网络规划和技术标准',
      salaryRange: '2.5万-4万/月',
      experienceRequired: '5-8年',
      skills: ['网络架构设计', '技术选型能力', '网络集成经验'],
      certification: ['CCIE完整认证'],
      icon: '📐'
    },
    {
      title: '网络安全专家',
      description: '专注于企业网络安全架构设计和安全策略实施',
      salaryRange: '3万-5万/月',
      experienceRequired: '5-10年',
      skills: ['网络安全深度知识', '安全审计经验', '渗透测试技能'],
      certification: ['CCIE安全', 'CISSP'],
      icon: '🔒'
    },
    {
      title: '云网络专家',
      description: '专注于云环境下的网络设计和实施，包括混合云和多云环境',
      salaryRange: '3.5万-6万/月',
      experienceRequired: '7-10年',
      skills: ['公有云平台经验', 'SDN技术', '云原生网络知识'],
      certification: ['CCIE', '云平台认证'],
      icon: '☁️'
    },
    {
      title: '技术总监/CTO',
      description: '负责企业技术战略和团队管理，制定技术方向和决策',
      salaryRange: '5万-8万+/月',
      experienceRequired: '10年+',
      skills: ['技术管理', '战略规划', '团队领导力', '预算管理'],
      certification: ['CCIE', '管理类认证'],
      icon: '👑'
    }
  ];
  
  // 行业需求数据
  const industryStats = [
    {
      label: '人才缺口',
      value: '10万+',
      description: '中国网络工程师人才缺口'
    },
    {
      label: '薪资溢价',
      value: '40%~60%',
      description: 'CCIE认证带来的薪资溢价'
    },
    {
      label: '晋升速度',
      value: '2~3倍',
      description: '比普通工程师更快的晋升速度'
    },
    {
      label: '就业率',
      value: '99.8%',
      description: 'CCIE认证工程师就业率'
    }
  ];
  
  // 学员成功案例
  const successStories = [
    {
      name: '王建国',
      title: '网络架构师',
      company: '某互联网巨头',
      image: '/images/success-stories/wang.jpg',
      story: '从一名普通网络工程师到年薪50万+的网络架构师，CCIE认证是我职业生涯的转折点。',
      beforeSalary: '15K/月',
      afterSalary: '40K+/月',
      timeToSuccess: '18个月'
    },
    {
      name: '李梅',
      title: '技术总监',
      company: '某金融科技公司',
      image: '/images/success-stories/li.jpg',
      story: '作为女性工程师，CCIE认证帮助我打破职场天花板，现在带领一支15人的技术团队。',
      beforeSalary: '20K/月',
      afterSalary: '50K+/月',
      timeToSuccess: '24个月'
    },
    {
      name: '张伟',
      title: '网络安全专家',
      company: '某安全服务提供商',
      image: '/images/success-stories/zhang.jpg',
      story: '从运维工程师到网络安全专家，CCIE安全认证让我找到了真正的职业热情。',
      beforeSalary: '12K/月',
      afterSalary: '35K+/月',
      timeToSuccess: '20个月'
    }
  ];

  return (
    <Layout title="CCIE认证后的职业发展路径" description="了解获得CCIE认证后的职业发展机会、薪资前景和晋升路径。探索如何通过思科认证加速您的职业发展。">
      <div className={styles.careerHeader}>
        <div className={styles.careerHeaderContent}>
          <h1>CCIE认证后的职业发展路径</h1>
          <p>探索获得CCIE认证后的广阔职业前景和发展机会</p>
          <Link href="/courses">
            <button className={styles.headerCta}>查看CCIE培训课程</button>
          </Link>
        </div>
      </div>
      
      <div className={styles.careerContainer}>
        {/* 行业需求统计 */}
        <section className={styles.statsSection}>
          <div className={styles.statGrid}>
            {industryStats.map((stat, index) => (
              <div className={styles.statItem} key={index}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
                <div className={styles.statDescription}>{stat.description}</div>
              </div>
            ))}
          </div>
        </section>
        
        {/* 职业路径展示 */}
        <section className={styles.pathSection}>
          <h2 className={styles.sectionHeading}>网络工程师职业晋升路径</h2>
          <p className={styles.sectionDescription}>
            随着经验积累和技能提升，CCIE认证将为您打开更广阔的职业发展空间
          </p>
          
          <div className={styles.careerPathTimeline}>
            {careerPaths.map((path, index) => (
              <div className={styles.pathItem} key={index}>
                <div className={styles.pathIcon}>{path.icon}</div>
                <div className={styles.pathContent}>
                  <h3>{path.title}</h3>
                  <p>{path.description}</p>
                  <div className={styles.pathDetails}>
                    <div className={styles.pathDetail}>
                      <span className={styles.detailLabel}>薪资范围:</span>
                      <span className={styles.detailValue}>{path.salaryRange}</span>
                    </div>
                    <div className={styles.pathDetail}>
                      <span className={styles.detailLabel}>所需经验:</span>
                      <span className={styles.detailValue}>{path.experienceRequired}</span>
                    </div>
                    <div className={styles.pathDetail}>
                      <span className={styles.detailLabel}>所需技能:</span>
                      <div className={styles.skillTags}>
                        {path.skills.map((skill, i) => (
                          <span key={i} className={styles.skillTag}>{skill}</span>
                        ))}
                      </div>
                    </div>
                    <div className={styles.pathDetail}>
                      <span className={styles.detailLabel}>推荐认证:</span>
                      <div className={styles.certTags}>
                        {path.certification.map((cert, i) => (
                          <span key={i} className={styles.certTag}>{cert}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* 行业需求与前景 */}
        <section className={styles.industrySection}>
          <h2 className={styles.sectionHeading}>行业需求与前景</h2>
          <p className={styles.sectionDescription}>
            随着数字化转型的加速，网络专业人才的需求持续增长
          </p>
          
          <div className={styles.industryCards}>
            <div className={styles.industryCard}>
              <div className={styles.industryIcon}>📈</div>
              <h3>持续增长的人才需求</h3>
              <p>据IDC预测，未来5年中国网络专业人才需求年增长率将保持在15%以上，特别是拥有CCIE等高级认证的人才更为紧缺。</p>
            </div>
            <div className={styles.industryCard}>
              <div className={styles.industryIcon}>🌐</div>
              <h3>多行业广泛应用</h3>
              <p>从互联网到金融、从电信到制造业，各行各业对网络人才的需求不断增加。云计算、5G和物联网的发展进一步扩大了就业机会。</p>
            </div>
            <div className={styles.industryCard}>
              <div className={styles.industryIcon}>💰</div>
              <h3>显著的薪资优势</h3>
              <p>CCIE认证工程师的平均薪资比行业平均水平高出40%-60%，尤其在一线城市，年薪50万以上的岗位机会众多。</p>
            </div>
            <div className={styles.industryCard}>
              <div className={styles.industryIcon}>🚀</div>
              <h3>加速的职业发展</h3>
              <p>获得CCIE认证的工程师晋升速度通常是非认证工程师的2-3倍，担任技术专家或管理岗位的机会也更多。</p>
            </div>
          </div>
        </section>
        
        {/* 成功案例 */}
        <section className={styles.successSection}>
          <h2>学员成功案例</h2>
          <p className={styles.sectionDescription}>
            看看他们如何通过CCIE认证实现职业飞跃
          </p>
          
          <div className={styles.successGrid}>
            {successStories.map((story, index) => (
              <div className={styles.successCard} key={index}>
                <div className={styles.successHeader}>
                  <div className={styles.successImage}>
                    <img src={story.image} alt={story.name} />
                  </div>
                  <div className={styles.successInfo}>
                    <h3>{story.name}</h3>
                    <div className={styles.successTitle}>{story.title}</div>
                    <div className={styles.successCompany}>{story.company}</div>
                  </div>
                </div>
                <div className={styles.successStory}>
                  "{story.story}"
                </div>
                <div className={styles.successMetrics}>
                  <div className={styles.successMetric}>
                    <div className={styles.metricLabel}>获证前薪资</div>
                    <div className={styles.metricValue}>{story.beforeSalary}</div>
                  </div>
                  <div className={styles.successMetric}>
                    <div className={styles.metricLabel}>获证后薪资</div>
                    <div className={styles.metricValue}>{story.afterSalary}</div>
                  </div>
                  <div className={styles.successMetric}>
                    <div className={styles.metricLabel}>实现时间</div>
                    <div className={styles.metricValue}>{story.timeToSuccess}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* 技能评估 */}
        <section className={styles.assessmentSection}>
          <h2>了解您的职业发展路径</h2>
          <p className={styles.sectionDescription}>
            完成简短的技能评估，获取个性化的职业发展建议
          </p>
          
          <SkillAssessment 
            title="免费职业发展评估"
            description="根据您当前的技能水平和职业目标，获取个性化的CCIE学习和职业发展建议"
          />
        </section>
        
        {/* 引流组件 */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContainer}>
            <h2>加速您的职业发展</h2>
            <p>现在报名CCIE培训课程，早日获取行业顶级认证</p>
            
            <CountdownTimer
              endDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
              title="限时优惠：CCIE全程班立减3000元"
              description="优惠倒计时"
            />
            
            <div className={styles.ctaButtons}>
              <Link href="/courses">
                <button className={styles.primaryButton}>浏览培训课程</button>
              </Link>
              <Link href="/contact">
                <button className={styles.secondaryButton}>联系课程顾问</button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* 常见问题 */}
        <section className={styles.faqSection}>
          <h2>职业发展常见问题</h2>
          <div className={styles.faqList}>
            <div className={styles.faqItem}>
              <h3>获得CCIE认证后，我可以从事哪些工作？</h3>
              <p>获得CCIE认证后，您可以担任高级网络工程师、网络架构师、网络安全专家、云网络专家、技术顾问等职位。许多CCIE认证持有者也会选择成为独立顾问或创办自己的IT服务公司。</p>
            </div>
            <div className={styles.faqItem}>
              <h3>CCIE认证在不同行业的认可度如何？</h3>
              <p>CCIE认证在IT、电信、金融、互联网、制造业等几乎所有行业都有很高的认可度。特别是在金融、电信等对网络稳定性要求高的行业，CCIE认证工程师更是备受青睐。</p>
            </div>
            <div className={styles.faqItem}>
              <h3>获得CCIE认证后，大概需要多久才能看到明显的职业提升？</h3>
              <p>根据我们的统计，大多数学员在获得CCIE认证后3-6个月内会获得显著的职业提升，包括加薪、晋升或更好的工作机会。当然，这也取决于个人的主动性和当地的就业市场情况。</p>
            </div>
            <div className={styles.faqItem}>
              <h3>除了CCIE认证外，还需要哪些技能来提升职业发展？</h3>
              <p>除了技术技能外，软技能如沟通能力、问题解决能力、项目管理能力也非常重要。随着DevOps和自动化的发展，学习编程（如Python）和自动化工具也越来越必要。对于管理岗位，领导力和团队管理经验则更为关键。</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
} 