import Layout from '../components/Layout';
import LeadMagnet from '../components/LeadMagnet';
import CountdownTimer from '../components/CountdownTimer';
import styles from '../styles/Resources.module.css';
import Link from 'next/link';

export default function Resources() {
  // 免费资源数据
  const freeResources = [
    {
      id: 'ccie-study-guide',
      title: 'CCIE学习指南2024版',
      description: '全面的CCIE学习路线图和备考攻略，包含知识点整理和学习方法。',
      image: '/images/resources/study-guide.jpg',
      type: 'pdf',
      size: '2.5MB',
      downloadCount: 3547
    },
    {
      id: 'network-commands-cheatsheet',
      title: '思科网络命令速查手册',
      description: '常用思科IOS命令集合，覆盖配置、排错和监控等方面，方便实验和工作查阅。',
      image: '/images/resources/commands-cheatsheet.jpg',
      type: 'pdf',
      size: '1.8MB',
      downloadCount: 4892
    },
    {
      id: 'bgp-configuration-guide',
      title: 'BGP配置完全指南',
      description: '详细介绍BGP协议的配置方法和最佳实践，包含常见场景的配置示例。',
      image: '/images/resources/bgp-guide.jpg',
      type: 'pdf',
      size: '3.2MB',
      downloadCount: 2789
    },
    {
      id: 'network-diagram-templates',
      title: '网络拓扑图模板集合',
      description: '提供多种常用网络拓扑图的Visio模板，帮助您快速绘制专业网络图。',
      image: '/images/resources/diagram-templates.jpg',
      type: 'zip',
      size: '5.7MB',
      downloadCount: 1856
    },
    {
      id: 'ccie-lab-scenarios',
      title: 'CCIE实验场景示例',
      description: '模拟CCIE考试实验环境的配置场景，帮助您熟悉考试形式和要求。',
      image: '/images/resources/lab-scenarios.jpg',
      type: 'pdf',
      size: '4.3MB',
      downloadCount: 3214
    },
    {
      id: 'network-troubleshooting-flowchart',
      title: '网络故障排查流程图',
      description: '系统化的网络故障排查方法和步骤，提高故障定位和解决效率。',
      image: '/images/resources/troubleshooting-flowchart.jpg',
      type: 'pdf',
      size: '1.5MB',
      downloadCount: 2975
    }
  ];

  // 高级资源数据（需要注册才能获取）
  const premiumResources = [
    {
      id: 'ccie-enterprise-mock-lab',
      title: 'CCIE企业基础设施模拟实验',
      description: '完整的CCIE企业基础设施模拟实验，包含详细的解题思路和参考答案。',
      image: '/images/resources/enterprise-lab.jpg'
    },
    {
      id: 'advanced-ospf-scenarios',
      title: 'OSPF高级配置场景',
      description: '探讨OSPF在复杂网络环境中的高级配置技巧和优化方法。',
      image: '/images/resources/ospf-advanced.jpg'
    },
    {
      id: 'mpls-vpn-implementation',
      title: 'MPLS VPN实施指南',
      description: '详细讲解MPLS VPN的配置、验证和故障排除方法。',
      image: '/images/resources/mpls-vpn.jpg'
    }
  ];

  // 视频资源数据
  const videoResources = [
    {
      id: 'routing-fundamentals',
      title: '路由基础知识讲解',
      description: '深入浅出讲解路由协议基础知识，适合CCIE初学者。',
      duration: '45分钟',
      image: '/images/resources/routing-video.jpg'
    },
    {
      id: 'switching-deep-dive',
      title: '交换技术深度剖析',
      description: '详细分析交换技术原理和常见配置场景。',
      duration: '38分钟',
      image: '/images/resources/switching-video.jpg'
    }
  ];

  return (
    <Layout
      title="CCIE学习资源 - 免费网络技术资料下载"
      description="免费下载CCIE学习资料、思科命令速查手册、网络拓扑图模板等实用资源，助力您的网络技术学习和认证考试。"
    >
      <div className={styles.resourcesHeader}>
        <div className={styles.resourcesHeaderContent}>
          <h1>免费CCIE学习资源</h1>
          <p>我们精心整理的网络技术学习资料，助您成为网络专家</p>
        </div>
      </div>

      {/* 倒计时促销组件 */}
      <div className={styles.container}>
        <div className={styles.countdownSection}>
          <CountdownTimer
            title="限时优惠：所有培训课程8折"
            description="现在注册任意CCIE培训课程，即可享受8折优惠"
            endDate={new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)} // 5天后
          />
        </div>

        {/* 免费资源列表 */}
        <h2 className={styles.sectionTitle}>免费资源下载</h2>
        <p className={styles.sectionDescription}>
          这些资源完全免费，只需填写您的基本信息即可立即下载
        </p>

        <div className={styles.resourcesGrid}>
          {freeResources.map((resource) => (
            <div className={styles.resourceCard} key={resource.id}>
              <div className={styles.resourceImageContainer}>
                <img
                  src={resource.image || '/images/resources/default.jpg'}
                  alt={resource.title}
                  className={styles.resourceImage}
                />
                <div className={styles.resourceType}>{resource.type}</div>
              </div>
              <div className={styles.resourceContent}>
                <h3>{resource.title}</h3>
                <p className={styles.resourceDescription}>{resource.description}</p>
                <div className={styles.resourceMeta}>
                  <span>文件大小: {resource.size}</span>
                  <span>{resource.downloadCount}+ 次下载</span>
                </div>
                <Link href={`/resources/${resource.id}`} className={styles.downloadButton}>
                  免费下载
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 邮件订阅 */}
        <div className={styles.emailSubscribe}>
          <div className={styles.emailContent}>
            <h2>订阅获取最新资源</h2>
            <p>我们会定期发布新的学习资源，订阅后第一时间获得通知</p>
            <form className={styles.subscribeForm}>
              <input type="email" placeholder="输入您的邮箱地址" required />
              <button type="submit">订阅</button>
            </form>
          </div>
        </div>

        {/* 高级资源（需注册） */}
        <h2 className={styles.sectionTitle}>高级学习资源</h2>
        <p className={styles.sectionDescription}>
          这些高级资源需要注册会员才能下载，包含更深入的技术内容和实验指导
        </p>

        <div className={styles.premiumResourcesGrid}>
          {premiumResources.map((resource) => (
            <div className={styles.premiumCard} key={resource.id}>
              <div className={styles.premiumImageContainer}>
                <img
                  src={resource.image || '/images/resources/premium-default.jpg'}
                  alt={resource.title}
                  className={styles.premiumImage}
                />
                <div className={styles.premiumTag}>高级资源</div>
              </div>
              <div className={styles.premiumContent}>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <LeadMagnet
                  title={`获取"${resource.title}"`}
                  description="填写信息，立即获取此高级资源"
                  buttonText="立即获取"
                  type="banner"
                />
              </div>
            </div>
          ))}
        </div>

        {/* 免费教学视频 */}
        <h2 className={styles.sectionTitle}>免费教学视频</h2>
        <p className={styles.sectionDescription}>
          由我们的CCIE讲师录制的精品教学视频，带您深入理解网络技术
        </p>

        <div className={styles.videoGrid}>
          {videoResources.map((video) => (
            <div className={styles.videoCard} key={video.id}>
              <div className={styles.videoThumbnail}>
                <img
                  src={video.image || '/images/resources/video-default.jpg'}
                  alt={video.title}
                />
                <div className={styles.playButton}>
                  <span>▶</span>
                </div>
                <div className={styles.videoDuration}>{video.duration}</div>
              </div>
              <div className={styles.videoContent}>
                <h3>{video.title}</h3>
                <p>{video.description}</p>
                <Link href={`/resources/videos/${video.id}`} className={styles.watchButton}>
                  观看视频
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 底部全宽CTA */}
        <div className={styles.bottomCTA}>
          <h2>还没找到您需要的资源？</h2>
          <p>联系我们的课程顾问，获取更多专业学习资料和定制化学习方案</p>
          <div className={styles.ctaButtons}>
            <Link href="/contact" className={styles.primaryButton}>
              联系课程顾问
            </Link>
            <Link href="/courses" className={styles.secondaryButton}>
              浏览培训课程
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
} 