import Layout from '../components/Layout';
import LeadMagnet from '../components/LeadMagnet';
import styles from '../styles/Blog.module.css';
import Link from 'next/link';

export default function Blog() {
  // 模拟的博客文章数据
  const blogPosts = [
    {
      id: 'ccie-enterprise-exam-tips',
      title: 'CCIE企业基础设施考试备考技巧',
      excerpt: '分享CCIE企业基础设施认证考试的备考经验和技巧，帮助您更高效地准备考试。',
      date: '2024-05-12',
      author: '张工程师',
      category: '考试技巧',
      readTime: '8分钟',
      image: '/images/blog/ccie-enterprise-exam.jpg'
    },
    {
      id: 'sdwan-implementation-guide',
      title: 'SD-WAN部署实践指南',
      excerpt: '详细介绍企业SD-WAN解决方案的部署流程、最佳实践和常见问题解决方案。',
      date: '2024-05-05',
      author: '李工程师',
      category: '技术实践',
      readTime: '15分钟',
      image: '/images/blog/sdwan-implementation.jpg'
    },
    {
      id: 'network-security-best-practices',
      title: '企业网络安全最佳实践',
      excerpt: '探讨当前企业网络面临的安全挑战，分享网络安全最佳实践和防护策略。',
      date: '2024-04-28',
      author: '王安全',
      category: '网络安全',
      readTime: '12分钟',
      image: '/images/blog/network-security.jpg'
    },
    {
      id: 'cisco-aci-vs-traditional-networking',
      title: 'Cisco ACI与传统网络对比分析',
      excerpt: '深入分析Cisco ACI和传统网络架构的区别，帮助您选择适合企业的网络解决方案。',
      date: '2024-04-20',
      author: '刘架构师',
      category: '网络架构',
      readTime: '10分钟',
      image: '/images/blog/cisco-aci.jpg'
    },
    {
      id: 'ipv6-migration-strategies',
      title: 'IPv6迁移策略与实施方案',
      excerpt: '讨论企业从IPv4向IPv6迁移的策略、步骤和注意事项，助力网络升级。',
      date: '2024-04-15',
      author: '赵工程师',
      category: '网络规划',
      readTime: '11分钟',
      image: '/images/blog/ipv6-migration.jpg'
    },
    {
      id: 'network-automation-with-ansible',
      title: '使用Ansible实现网络自动化',
      excerpt: '介绍如何使用Ansible自动化网络配置和管理，提高网络运维效率。',
      date: '2024-04-08',
      author: '陈自动化',
      category: '网络自动化',
      readTime: '13分钟',
      image: '/images/blog/network-automation.jpg'
    }
  ];

  // 博客分类
  const categories = [
    { id: 'exam-tips', name: '考试技巧' },
    { id: 'technical-practice', name: '技术实践' },
    { id: 'network-security', name: '网络安全' },
    { id: 'network-architecture', name: '网络架构' },
    { id: 'network-planning', name: '网络规划' },
    { id: 'network-automation', name: '网络自动化' }
  ];

  // 热门文章
  const popularPosts = [
    {
      id: 'ccie-enterprise-exam-tips',
      title: 'CCIE企业基础设施考试备考技巧'
    },
    {
      id: 'network-security-best-practices',
      title: '企业网络安全最佳实践'
    },
    {
      id: 'network-automation-with-ansible',
      title: '使用Ansible实现网络自动化'
    }
  ];

  return (
    <Layout title="CCIE培训博客 - 网络技术分享与学习" description="阅读最新的CCIE认证考试技巧、网络技术分享和行业趋势分析，提升您的网络专业知识。">
      <div className={styles.blogHeader}>
        <div className={styles.blogHeaderContent}>
          <h1>CCIE技术博客</h1>
          <p>分享最新网络技术、认证考试技巧和行业趋势</p>
        </div>
      </div>

      <div className={styles.blogContainer}>
        <div className={styles.blogContent}>
          {/* 博客文章列表 */}
          <div className={styles.blogGrid}>
            {blogPosts.map(post => (
              <article key={post.id} className={styles.blogCard}>
                <div className={styles.blogImageContainer}>
                  <Link href={`/blog/${post.id}`}>
                    <div className={styles.blogImage} style={{ backgroundImage: `url(${post.image || '/images/blog/default.jpg'})` }}></div>
                  </Link>
                  <div className={styles.blogCategory}>{post.category}</div>
                </div>
                <div className={styles.blogCardContent}>
                  <Link href={`/blog/${post.id}`}>
                    <h2>{post.title}</h2>
                  </Link>
                  <p className={styles.blogMeta}>
                    <span>{post.date}</span> • <span>{post.readTime}阅读</span>
                  </p>
                  <p className={styles.blogExcerpt}>{post.excerpt}</p>
                  <Link href={`/blog/${post.id}`} className={styles.readMore}>
                    阅读全文 →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* 引流组件：邮件订阅 */}
          <div className={styles.subscribeSection}>
            <h2>订阅我们的技术周刊</h2>
            <p>每周获取最新的网络技术文章、行业资讯和CCIE考试技巧</p>
            <form className={styles.subscribeForm}>
              <input type="email" placeholder="输入您的邮箱地址" required />
              <button type="submit">订阅</button>
            </form>
          </div>
        </div>

        {/* 侧边栏 */}
        <aside className={styles.blogSidebar}>
          {/* 引流资料下载 */}
          <div className={styles.sidebarSection}>
            <LeadMagnet 
              title="免费领取CCIE学习路线图" 
              description="包含完整的学习计划、核心知识点和推荐资源"
              buttonText="免费下载"
              type="box"
            />
          </div>

          {/* 博客分类 */}
          <div className={styles.sidebarSection}>
            <h3>文章分类</h3>
            <ul className={styles.categoryList}>
              {categories.map(category => (
                <li key={category.id}>
                  <Link href={`/blog/category/${category.id}`}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 热门文章 */}
          <div className={styles.sidebarSection}>
            <h3>热门文章</h3>
            <ul className={styles.popularPosts}>
              {popularPosts.map(post => (
                <li key={post.id}>
                  <Link href={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 关于我们 */}
          <div className={styles.sidebarSection}>
            <h3>关于我们</h3>
            <p>CCIE培训中心是专业的思科认证培训机构，致力于培养高级网络工程师和架构师。</p>
            <Link href="/about" className={styles.aboutLink}>
              了解更多
            </Link>
          </div>
        </aside>
      </div>
    </Layout>
  );
} 