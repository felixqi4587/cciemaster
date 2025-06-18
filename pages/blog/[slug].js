import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import LeadMagnet from '../../components/LeadMagnet';
import styles from '../../styles/BlogPost.module.css';

// 模拟的博客文章数据
const blogPosts = {
  'ccie-enterprise-exam-tips': {
    title: 'CCIE企业基础设施考试备考技巧与经验分享',
    excerpt: '分享CCIE企业基础设施认证考试的备考经验和技巧，帮助您更高效地准备考试。',
    content: `
      <h2>CCIE企业基础设施备考全攻略</h2>
      
      <p>CCIE（思科认证互联网专家）是网络行业最具权威性的认证之一，其中企业基础设施方向是最受欢迎的专业方向。本文将分享我多年培训CCIE学员的经验，为准备参加CCIE企业基础设施考试的工程师提供全面的备考攻略。</p>
      
      <h3>CCIE企业基础设施考试概述</h3>
      
      <p>CCIE企业基础设施认证考试分为两部分：笔试和实验室考试。笔试主要测试考生的理论知识，实验室考试则重点考察实际操作能力。要获得CCIE认证，必须先通过笔试，然后在三年内通过实验室考试。</p>
      
      <h3>笔试备考策略</h3>
      
      <h4>1. 制定合理的学习计划</h4>
      
      <p>CCIE笔试涵盖的知识点非常广泛，包括网络基础、交换、路由、广域网、网络安全、自动化等多个方面。建议考生根据自己的基础和时间，制定详细的学习计划，合理分配每个知识模块的学习时间。</p>
      
      <p>一般来说，具有3-5年网络工作经验的工程师，需要3-4个月的全职学习时间来准备CCIE笔试。如果是利用业余时间学习，则可能需要6-8个月。</p>
      
      <h4>2. 掌握核心知识点</h4>
      
      <p>以下是CCIE企业基础设施笔试的核心知识点：</p>
      
      <ul>
        <li>第二层技术：STP、RSTP、MSTP、VLAN、VTP、以太网交换等</li>
        <li>第三层技术：静态路由、OSPF、EIGRP、BGP、IPv6等</li>
        <li>广域网技术：MPLS、DMVPN、PPP、GRE等</li>
        <li>基础设施服务：QoS、组播、DHCP、DNS等</li>
        <li>基础设施安全：ACL、AAA、设备安全等</li>
        <li>网络编程与自动化：Python、REST API、NETCONF/YANG等</li>
      </ul>
      
      <h4>3. 推荐学习资源</h4>
      
      <p>备考CCIE笔试，以下学习资源值得推荐：</p>
      
      <ul>
        <li>官方认证指南：《CCIE and CCNP Enterprise Core Official Cert Guide》</li>
        <li>在线课程：思科学习网络、INE的课程等</li>
        <li>实验模拟器：GNS3、EVE-NG、CML等</li>
        <li>练习题和模拟考试：Boson ExSim、思科学习网络的练习等</li>
      </ul>
      
      <h3>实验室考试备考策略</h3>
      
      <h4>1. 掌握实验拓扑和任务类型</h4>
      
      <p>CCIE企业基础设施实验室考试通常包含以下类型的任务：</p>
      
      <ul>
        <li>故障排除：识别并修复网络中的故障</li>
        <li>配置：根据要求配置网络设备和服务</li>
        <li>诊断：分析网络行为并提供解决方案</li>
      </ul>
      
      <p>考试时间为8小时，考生需要在规定时间内完成所有任务。</p>
      
      <h4>2. 大量实践和模拟</h4>
      
      <p>实验室考试最重要的准备方法就是大量的实践。建议考生：</p>
      
      <ul>
        <li>搭建自己的实验环境，模拟各种网络场景</li>
        <li>练习常见配置任务，提高配置速度和准确性</li>
        <li>模拟故障排除场景，提高问题诊断能力</li>
        <li>参加模拟考试，熟悉考试流程和时间管理</li>
      </ul>
      
      <h4>3. 时间管理和考试技巧</h4>
      
      <p>实验室考试中，时间管理至关重要。以下是一些有用的考试技巧：</p>
      
      <ul>
        <li>先通读所有任务，了解整体要求</li>
        <li>先完成简单和熟悉的任务，再处理复杂任务</li>
        <li>遇到困难任务时，不要过度纠结，先标记后继续</li>
        <li>注意保存配置，避免意外丢失</li>
        <li>留出时间检查和修正错误</li>
      </ul>
      
      <h3>常见备考误区</h3>
      
      <p>在备考CCIE过程中，许多考生会陷入以下误区：</p>
      
      <ol>
        <li><strong>只看不练</strong>：阅读材料固然重要，但不进行实践操作，很难真正掌握知识</li>
        <li><strong>只练不思</strong>：盲目做题和实验，不进行总结和反思，难以提高</li>
        <li><strong>过度依赖答案</strong>：遇到问题立即查看答案，没有独立思考的过程</li>
        <li><strong>忽视基础知识</strong>：急于学习高级技术，忽视基础知识的巩固</li>
        <li><strong>临时抱佛脚</strong>：考前突击学习，效果往往不佳</li>
      </ol>
      
      <h3>心态调整与压力管理</h3>
      
      <p>CCIE备考是一个漫长而艰苦的过程，良好的心态至关重要：</p>
      
      <ul>
        <li>设定合理的期望，不要给自己过大压力</li>
        <li>制定可行的学习计划，循序渐进</li>
        <li>保持适当的休息和运动，避免过度疲劳</li>
        <li>加入学习小组或社区，互相鼓励和学习</li>
        <li>将学习分解为小目标，每完成一个小目标就给自己一些奖励</li>
      </ul>
      
      <h3>结语</h3>
      
      <p>CCIE认证之路虽然艰辛，但只要方法得当、坚持不懈，成功是可以预见的。希望本文提供的备考经验和技巧能对您的CCIE之旅有所帮助。如果您需要更专业的CCIE培训辅导，欢迎联系我们的CCIE培训中心，我们将为您提供全方位的学习支持。</p>
    `,
    date: '2024-05-12',
    author: '张工程师',
    authorTitle: 'CCIE培训中心首席讲师',
    authorBio: '10年网络培训经验，已帮助500+学员成功获取CCIE认证',
    category: '考试技巧',
    tags: ['CCIE', '企业基础设施', '备考攻略', '考试技巧', '网络认证'],
    readTime: '8分钟',
    image: '/images/blog/ccie-enterprise-exam.jpg',
    relatedPosts: [
      'sdwan-implementation-guide',
      'network-automation-with-ansible',
      'ipv6-migration-strategies'
    ]
  },
  'sdwan-implementation-guide': {
    title: 'SD-WAN部署实践指南：企业网络转型的关键技术',
    excerpt: '详细介绍企业SD-WAN解决方案的部署流程、最佳实践和常见问题解决方案。',
    content: `<p>这是SD-WAN部署实践指南的内容...</p>`,
    date: '2024-05-05',
    author: '李工程师',
    authorTitle: 'CCIE安全专家',
    authorBio: '专注于企业网络安全架构设计和实施，CCIE安全#12345',
    category: '技术实践',
    tags: ['SD-WAN', '广域网', '网络转型', '企业网络'],
    readTime: '15分钟',
    image: '/images/blog/sdwan-implementation.jpg',
    relatedPosts: [
      'ccie-enterprise-exam-tips',
      'network-security-best-practices',
      'cisco-aci-vs-traditional-networking'
    ]
  },
  'network-automation-with-ansible': {
    title: '使用Ansible实现网络自动化：从入门到精通',
    excerpt: '介绍如何使用Ansible自动化网络配置和管理，提高网络运维效率。',
    content: `<p>这是Ansible网络自动化的内容...</p>`,
    date: '2024-04-08',
    author: '陈自动化',
    authorTitle: '网络自动化专家',
    authorBio: '8年网络自动化经验，专注于网络自动化工具开发和实施',
    category: '网络自动化',
    tags: ['Ansible', '网络自动化', 'DevOps', '自动化工具'],
    readTime: '13分钟',
    image: '/images/blog/network-automation.jpg',
    relatedPosts: [
      'ccie-enterprise-exam-tips',
      'cisco-aci-vs-traditional-networking',
      'ipv6-migration-strategies'
    ]
  },
  'ipv6-migration-strategies': {
    title: 'IPv6迁移策略与实施方案',
    excerpt: '讨论企业从IPv4向IPv6迁移的策略、步骤和注意事项，助力网络升级。',
    content: `<p>这是IPv6迁移策略的内容...</p>`,
    date: '2024-04-15',
    author: '赵工程师',
    authorTitle: 'CCIE服务提供商专家',
    authorBio: '专注于大型网络设计和优化，拥有丰富的ISP网络经验',
    category: '网络规划',
    tags: ['IPv6', '网络迁移', 'IP寻址', '网络设计'],
    readTime: '11分钟',
    image: '/images/blog/ipv6-migration.jpg',
    relatedPosts: [
      'sdwan-implementation-guide',
      'network-security-best-practices',
      'cisco-aci-vs-traditional-networking'
    ]
  }
};

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  
  // 如果页面正在获取数据，显示加载状态
  if (router.isFallback) {
    return <div>加载中...</div>;
  }
  
  // 如果没有找到对应的文章，显示404页面
  if (!slug || !blogPosts[slug]) {
    return (
      <Layout title="文章未找到">
        <div className={styles.notFound}>
          <h1>404 - 文章未找到</h1>
          <p>您查找的文章不存在或已被删除。</p>
          <Link href="/blog">
            <button className={styles.backButton}>返回博客列表</button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  const post = blogPosts[slug];
  
  // 获取相关文章
  const relatedArticles = post.relatedPosts
    ? post.relatedPosts.map(relatedSlug => blogPosts[relatedSlug]).filter(Boolean)
    : [];
  
  return (
    <Layout>
      <Head>
        <title>{post.title} - CCIE培训中心博客</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />
        {post.tags && post.tags.length > 0 && (
          <meta name="keywords" content={post.tags.join(', ')} />
        )}
      </Head>
      
      <div className={styles.blogPostContainer}>
        <div className={styles.blogPostContent}>
          {/* 文章头部 */}
          <div className={styles.postHeader}>
            <div className={styles.category}>{post.category}</div>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <span className={styles.metaIcon}>📅</span>
                <span>{post.date}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaIcon}>⏱️</span>
                <span>{post.readTime}阅读</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaIcon}>👤</span>
                <span>{post.author}</span>
              </div>
            </div>
          </div>
          
          {/* 文章特色图片 */}
          <div className={styles.featuredImage}>
            <img src={post.image} alt={post.title} />
          </div>
          
          {/* 文章正文 */}
          <div 
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          {/* 文章标签 */}
          {post.tags && post.tags.length > 0 && (
            <div className={styles.tags}>
              {post.tags.map(tag => (
                <Link href={`/blog/tag/${tag}`} key={tag}>
                  <span className={styles.tag}>#{tag}</span>
                </Link>
              ))}
            </div>
          )}
          
          {/* 作者信息 */}
          <div className={styles.authorBox}>
            <div className={styles.authorImage}>
              <img src={`/images/authors/${post.author.split(' ')[0].toLowerCase()}.jpg`} alt={post.author} />
            </div>
            <div className={styles.authorInfo}>
              <h3>{post.author}</h3>
              <div className={styles.authorTitle}>{post.authorTitle}</div>
              <p>{post.authorBio}</p>
            </div>
          </div>
          
          {/* 引流组件 */}
          <div className={styles.leadMagnetSection}>
            <LeadMagnet 
              title="免费获取完整版CCIE备考秘籍" 
              description="包含更多详细的备考策略、实验指南和真题解析"
              buttonText="立即下载"
              type="banner"
            />
          </div>
          
          {/* 分享按钮 */}
          <div className={styles.shareSection}>
            <h3>分享这篇文章</h3>
            <div className={styles.shareButtons}>
              <button className={`${styles.shareButton} ${styles.wechat}`}>
                微信
              </button>
              <button className={`${styles.shareButton} ${styles.weibo}`}>
                微博
              </button>
              <button className={`${styles.shareButton} ${styles.linkedin}`}>
                领英
              </button>
              <button className={`${styles.shareButton} ${styles.copyLink}`}>
                复制链接
              </button>
            </div>
          </div>
          
          {/* 相关文章 */}
          {relatedArticles.length > 0 && (
            <div className={styles.relatedPosts}>
              <h2>相关文章</h2>
              <div className={styles.relatedGrid}>
                {relatedArticles.map((related, index) => {
                  if (!related || !related.image || !related.title) return null;
                  const originalSlug = post.relatedPosts[post.relatedPosts.findIndex(slug => blogPosts[slug] === related)];
                  return (
                    <div className={styles.relatedCard} key={related.title}>
                      <Link href={`/blog/${originalSlug}`}>
                        <div className={styles.relatedImageContainer}>
                          <img src={related.image} alt={related.title} />
                        </div>
                        <div className={styles.relatedContent}>
                          <h3>{related.title}</h3>
                          <div className={styles.relatedMeta}>
                            <span>{related.date}</span>
                            <span>{related.readTime}阅读</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* 评论区 */}
          <div className={styles.commentsSection}>
            <h2>留言评论</h2>
            <div className={styles.commentForm}>
              <textarea placeholder="分享您的想法或问题..." rows={4}></textarea>
              <button className={styles.commentButton}>提交评论</button>
            </div>
          </div>
        </div>
        
        {/* 侧边栏 */}
        <aside className={styles.blogSidebar}>
          {/* 目录 */}
          <div className={styles.sidebarSection}>
            <h3>文章目录</h3>
            <ul className={styles.tableOfContents}>
              <li><a href="#section-1">CCIE企业基础设施考试概述</a></li>
              <li><a href="#section-2">笔试备考策略</a>
                <ul>
                  <li><a href="#section-2-1">制定合理的学习计划</a></li>
                  <li><a href="#section-2-2">掌握核心知识点</a></li>
                  <li><a href="#section-2-3">推荐学习资源</a></li>
                </ul>
              </li>
              <li><a href="#section-3">实验室考试备考策略</a></li>
              <li><a href="#section-4">常见备考误区</a></li>
              <li><a href="#section-5">心态调整与压力管理</a></li>
            </ul>
          </div>
          
          {/* 推荐课程 */}
          <div className={styles.sidebarSection}>
            <h3>推荐课程</h3>
            <div className={styles.courseCard}>
              <div className={styles.courseImage}>
                <img src="/images/courses/ccie-enterprise.jpg" alt="CCIE企业班" />
              </div>
              <div className={styles.courseContent}>
                <h4>CCIE企业基础设施全程班</h4>
                <div className={styles.coursePrice}>
                  <span className={styles.originalPrice}>¥19,800</span>
                  <span className={styles.discountPrice}>¥16,800</span>
                </div>
                <Link href="/courses/ccie-enterprise">
                  <button className={styles.courseButton}>查看详情</button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* 热门文章 */}
          <div className={styles.sidebarSection}>
            <h3>热门文章</h3>
            <ul className={styles.popularPosts}>
              <li>
                <Link href="/blog/ccie-enterprise-exam-tips">
                  CCIE企业基础设施考试备考技巧
                </Link>
              </li>
              <li>
                <Link href="/blog/network-security-best-practices">
                  企业网络安全最佳实践
                </Link>
              </li>
              <li>
                <Link href="/blog/network-automation-with-ansible">
                  使用Ansible实现网络自动化
                </Link>
              </li>
              <li>
                <Link href="/blog/cisco-aci-vs-traditional-networking">
                  Cisco ACI与传统网络对比分析
                </Link>
              </li>
              <li>
                <Link href="/blog/ipv6-migration-strategies">
                  IPv6迁移策略与实施方案
                </Link>
              </li>
            </ul>
          </div>
          
          {/* 订阅表单 */}
          <div className={styles.sidebarSection}>
            <div className={styles.subscribeBox}>
              <h3>订阅技术周刊</h3>
              <p>获取最新网络技术趋势和CCIE考试技巧</p>
              <form className={styles.subscribeForm}>
                <input type="email" placeholder="您的邮箱地址" required />
                <button type="submit">订阅</button>
              </form>
            </div>
          </div>
        </aside>
      </div>
    </Layout>
  );
}

// 预渲染可能的路径
export async function getStaticPaths() {
  const paths = Object.keys(blogPosts).map(slug => ({
    params: { slug }
  }));
  
  return {
    paths,
    fallback: false
  };
}

// 静态生成
export async function getStaticProps({ params }) {
  const { slug } = params;
  
  // 检查是否存在该文章
  if (!blogPosts[slug]) {
    return {
      notFound: true
    };
  }
  
  return {
    props: {}
  };
} 