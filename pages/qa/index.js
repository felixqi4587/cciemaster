import { useState } from 'react';
import Layout from '../../components/Layout';
import LeadMagnet from '../../components/LeadMagnet';
import styles from '../../styles/QA.module.css';
import Link from 'next/link';

export default function QAPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // 问题分类
  const categories = [
    { id: 'all', name: '全部问题' },
    { id: 'exam', name: '考试相关' },
    { id: 'routing', name: '路由技术' },
    { id: 'switching', name: '交换技术' },
    { id: 'security', name: '网络安全' },
    { id: 'automation', name: '自动化' },
    { id: 'fee', name: '费用问题' }
  ];
  
  // 问答数据
  const qaData = [
    {
      id: 'ccie-pass-rate',
      question: 'CCIE认证的通过率是多少？',
      answer: 'CCIE认证是IT行业最具挑战性的认证之一，全球范围内的平均通过率约为26%。但在专业培训机构的辅导下，通过率可以提高到70%-80%。我们培训中心的学员一次性通过率达到85%以上，大部分学员在1-2次尝试内通过考试。',
      category: 'exam',
      tags: ['通过率', '考试难度']
    },
    {
      id: 'ccie-preparation-time',
      question: 'CCIE认证需要准备多长时间？',
      answer: '准备CCIE认证所需的时间因个人经验和知识基础而异。通常情况下，拥有3-5年网络工作经验的工程师，需要6-12个月的时间来准备。如果是全职学习，可能需要3-6个月；如果是利用业余时间学习，则可能需要8-15个月。我们的培训课程通常为期4-6个月，包括理论学习和大量的实验操作。',
      category: 'exam',
      tags: ['准备时间', '学习计划']
    },
    {
      id: 'ccie-vs-ccnp',
      question: 'CCIE和CCNP有什么区别？',
      answer: 'CCNP（思科认证网络专家）和CCIE（思科认证互联网专家）是思科认证体系中的两个不同级别。CCNP是专业级认证，而CCIE是专家级认证，是思科认证体系中的最高级别。两者的主要区别在于：<br/><br/>1. 难度级别：CCIE远比CCNP更难，要求更深入的知识和实践能力<br/>2. 考试形式：CCNP只有笔试，而CCIE包含笔试和8小时的实验室考试<br/>3. 技术深度：CCIE要求对网络技术有更全面和深入的理解<br/>4. 市场认可度：CCIE在业内的认可度更高，拥有CCIE认证的工程师通常能获得更高的薪资和更好的职业发展机会',
      category: 'exam',
      tags: ['认证对比', 'CCNP']
    },
    {
      id: 'bgp-vs-ospf',
      question: '什么情况下应该选择BGP而不是OSPF？',
      answer: 'BGP（边界网关协议）和OSPF（开放最短路径优先）是两种不同用途的路由协议。选择BGP而非OSPF的典型场景包括：<br/><br/>1. 连接不同的自治系统(AS)：BGP专为AS间路由设计，而OSPF主要用于AS内部<br/>2. 需要策略路由：BGP提供丰富的路径属性和策略控制机制<br/>3. 大规模网络：当路由表条目非常多时，BGP比OSPF更具扩展性<br/>4. 多宿主连接：当网络需要连接多个ISP时，BGP是首选<br/>5. 需要流量工程：BGP的路径属性允许更精细的流量控制<br/><br/>总的来说，OSPF适用于企业内部网络，而BGP更适合服务提供商环境和企业边界路由。',
      category: 'routing',
      tags: ['BGP', 'OSPF', '路由协议选择']
    },
    {
      id: 'spanning-tree-types',
      question: '各种生成树协议(STP、RSTP、MSTP)有什么区别？',
      answer: '生成树协议(STP)的不同版本主要在收敛速度和VLAN支持方面有区别：<br/><br/>1. STP(IEEE 802.1D)：原始版本，收敛时间慢(30-50秒)，所有VLAN使用同一棵生成树<br/>2. RSTP(IEEE 802.1w)：快速生成树，通过引入新的端口角色和状态转换机制，将收敛时间缩短到1-5秒，但仍为所有VLAN使用同一棵树<br/>3. MSTP(IEEE 802.1s)：多生成树，允许为多个VLAN组配置独立的生成树实例，提高了带宽利用率和负载均衡能力<br/>4. PVST+/RPVST+：思科专有协议，为每个VLAN创建单独的生成树实例',
      category: 'switching',
      tags: ['生成树', 'STP', 'RSTP', 'MSTP']
    },
    {
      id: 'network-automation-tools',
      question: '有哪些常用的网络自动化工具？',
      answer: '网络自动化工具帮助工程师简化配置和管理任务。常用工具包括：<br/><br/>1. Ansible：使用YAML定义的剧本进行配置管理，无需在被管理设备上安装代理<br/>2. Python库：如Netmiko、NAPALM和Nornir，提供与网络设备交互的编程接口<br/>3. Terraform：基础设施即代码(IaC)工具，适用于云环境和网络设备配置<br/>4. Cisco NSO：网络服务编排平台，提供多厂商支持<br/>5. Puppet和Chef：配置管理工具，需要在被管理设备上安装代理<br/>6. Genie/pyATS：思科开发的网络测试自动化框架<br/><br/>选择合适的工具取决于您的网络环境、技能水平和自动化目标。',
      category: 'automation',
      tags: ['自动化', 'Ansible', 'Python']
    },
    {
      id: 'ccie-cost',
      question: 'CCIE认证的总体费用是多少？',
      answer: 'CCIE认证的总体费用由多个部分组成：<br/><br/>1. 考试费用：笔试约400美元，实验室考试约1600美元<br/>2. 培训费用：根据培训机构和课程类型不同，从1万到3万元人民币不等<br/>3. 实验设备费用：如果自建实验环境，可能需要5000-20000元投资<br/>4. 学习资料费用：书籍、在线课程等，约1000-3000元<br/>5. 差旅费用：如需前往异地考试，还需考虑交通和住宿费用<br/><br/>我们的培训中心提供全套的CCIE备考解决方案，包括理论课程、实验指导、模拟考试等，帮助学员节省不必要的支出并提高通过率。',
      category: 'fee',
      tags: ['费用', '考试成本']
    }
  ];
  
  // 热门标签
  const popularTags = [
    '考试技巧', '通过率', 'BGP', 'OSPF', '路由协议', '生成树', '自动化', '费用'
  ];
  
  // 过滤问题
  const filteredQuestions = qaData.filter(item => {
    // 类别过滤
    const categoryMatch = activeCategory === 'all' || item.category === activeCategory;
    
    // 搜索过滤
    const searchMatch = searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
    return categoryMatch && searchMatch;
  });

  return (
    <Layout title="CCIE考试问答 - 专业解答您的CCIE认证疑问" description="查看关于CCIE认证的常见问题解答，包括考试内容、备考策略、技术难点和费用等信息。">
      <div className={styles.qaHeader}>
        <div className={styles.qaHeaderContent}>
          <h1>CCIE问答中心</h1>
          <p>专业解答您关于CCIE认证的所有疑问</p>
          
          <div className={styles.searchBar}>
            <input 
              type="text" 
              placeholder="搜索您的问题..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button>搜索</button>
          </div>
        </div>
      </div>

      <div className={styles.qaContainer}>
        <div className={styles.qaContent}>
          {/* 分类过滤器 */}
          <div className={styles.categoryFilter}>
            <ul>
              {categories.map(category => (
                <li 
                  key={category.id}
                  className={activeCategory === category.id ? styles.active : ''}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
          
          {/* 问答列表 */}
          <div className={styles.qaList}>
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map(qa => (
                <div key={qa.id} className={styles.qaItem}>
                  <div className={styles.qaQuestion}>
                    <h3>{qa.question}</h3>
                  </div>
                  <div 
                    className={styles.qaAnswer}
                    dangerouslySetInnerHTML={{ __html: qa.answer }}
                  />
                  {qa.tags && (
                    <div className={styles.qaTags}>
                      {qa.tags.map(tag => (
                        <span 
                          key={tag} 
                          className={styles.qaTag}
                          onClick={() => setSearchQuery(tag)}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className={styles.noResults}>
                <p>没有找到匹配的问题。请尝试其他搜索词或浏览全部问题。</p>
              </div>
            )}
          </div>
          
          {/* 引流组件 */}
          <div className={styles.leadMagnetSection}>
            <h2>还没找到您想要的答案？</h2>
            <p>我们的CCIE专家可以为您提供专业解答</p>
            <LeadMagnet 
              title="免费CCIE学习资料包" 
              description="填写信息获取CCIE学习指南、考点汇总和实验拓扑图"
              buttonText="立即获取"
              type="banner"
            />
          </div>
        </div>
        
        <aside className={styles.qaSidebar}>
          {/* 提问表单 */}
          <div className={styles.askQuestion}>
            <h3>提交您的问题</h3>
            <p>没找到想要的答案？向我们的CCIE专家提问</p>
            <form className={styles.questionForm}>
              <div className={styles.formGroup}>
                <label>您的问题</label>
                <textarea rows={4} placeholder="请详细描述您的问题..."></textarea>
              </div>
              <div className={styles.formGroup}>
                <label>您的姓名</label>
                <input type="text" placeholder="请输入姓名" />
              </div>
              <div className={styles.formGroup}>
                <label>联系方式</label>
                <input type="text" placeholder="手机号码或邮箱" />
              </div>
              <button type="submit" className={styles.submitButton}>提交问题</button>
            </form>
          </div>
          
          {/* 热门标签 */}
          <div className={styles.popularTags}>
            <h3>热门话题</h3>
            <div className={styles.tagCloud}>
              {popularTags.map(tag => (
                <span 
                  key={tag} 
                  className={styles.tagItem}
                  onClick={() => setSearchQuery(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* 推荐课程 */}
          <div className={styles.recommendedCourse}>
            <h3>推荐课程</h3>
            <div className={styles.courseCard}>
              <div className={styles.courseImage}>
                <img src="/images/courses/ccie-complete.jpg" alt="CCIE全程班" />
              </div>
              <div className={styles.courseContent}>
                <h4>CCIE企业全程班</h4>
                <div className={styles.courseRating}>
                  <span className={styles.stars}>★★★★★</span>
                  <span>4.9 (125人评价)</span>
                </div>
                <div className={styles.coursePrice}>
                  <span className={styles.originalPrice}>¥19,800</span>
                  <span className={styles.discountPrice}>¥16,800</span>
                </div>
                <Link href="/courses/ccie-enterprise">
                  <button className={styles.viewCourseButton}>查看详情</button>
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </Layout>
  );
} 