import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/TechDiscussion.module.css';

export default function TechDiscussion() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(null);
  
  // 讨论分类
  const categories = [
    { id: 'all', name: '全部讨论' },
    { id: 'question', name: '技术问答' },
    { id: 'share', name: '经验分享' },
    { id: 'exam', name: '考试心得' },
    { id: 'lab', name: '实验探讨' },
    { id: 'career', name: '职业发展' }
  ];
  
  // 模拟讨论数据
  const discussions = [
    {
      id: 1,
      title: '如何解决BGP路由振荡问题？',
      content: '最近在实验中遇到BGP路由不稳定的情况，查看日志发现存在路由振荡。我已经配置了route dampening，但效果不明显，有没有其他解决方案？',
      author: '网络工程师小王',
      avatar: '/images/avatars/user1.jpg',
      category: 'question',
      tags: ['BGP', '路由', '故障排除'],
      createdAt: '2024-05-10',
      views: 125,
      replies: 8,
      isHot: true
    },
    {
      id: 2,
      title: '分享我的CCIE备考经验：3个月一次通过实验',
      content: '去年10月通过笔试，今年1月顺利通过实验考试。现将备考经验分享给大家，希望对正在备考的朋友有所帮助...',
      author: 'CCIE#12345',
      avatar: '/images/avatars/user2.jpg',
      category: 'share',
      tags: ['备考经验', '实验考试', '学习方法'],
      createdAt: '2024-05-08',
      views: 320,
      replies: 15,
      isHot: true
    },
    {
      id: 3,
      title: '企业环境中MPLS VPN设计的最佳实践',
      content: '我正在为一个多分支企业设计MPLS VPN解决方案，想讨论一下在选择路由协议和地址分配方面的最佳实践...',
      author: '架构师张三',
      avatar: '/images/avatars/user3.jpg',
      category: 'share',
      tags: ['MPLS', 'VPN', '网络设计'],
      createdAt: '2024-05-06',
      views: 98,
      replies: 5,
      isHot: false
    },
    {
      id: 4,
      title: '最新版CCIE企业基础设施考试变化分析',
      content: '上个月参加了最新版本的CCIE企业考试，发现有几个明显的变化，特别是在自动化和编程部分...',
      author: '思科讲师李四',
      avatar: '/images/avatars/user4.jpg',
      category: 'exam',
      tags: ['考试变化', '新版考试', '自动化'],
      createdAt: '2024-05-05',
      views: 210,
      replies: 12,
      isHot: true
    },
    {
      id: 5,
      title: 'EVE-NG vs GNS3：哪个更适合CCIE备考？',
      content: '准备开始CCIE实验练习，纠结是选择EVE-NG还是GNS3作为模拟平台。两者各有什么优缺点？资源占用如何？',
      author: '网络小白',
      avatar: '/images/avatars/user5.jpg',
      category: 'lab',
      tags: ['模拟器', 'EVE-NG', 'GNS3'],
      createdAt: '2024-05-03',
      views: 156,
      replies: 18,
      isHot: false
    },
    {
      id: 6,
      title: '从CCNP到CCIE：我的三年转型之路',
      content: '三年前我还是一名普通的CCNP工程师，现在已经是公司的网络架构师。分享我的学习和职业发展经验...',
      author: '进阶者',
      avatar: '/images/avatars/user6.jpg',
      category: 'career',
      tags: ['职业发展', '晋升', '学习路径'],
      createdAt: '2024-05-01',
      views: 189,
      replies: 7,
      isHot: false
    }
  ];
  
  // 热门话题
  const hotTopics = [
    { id: 1, name: 'MPLS技术', count: 42 },
    { id: 2, name: 'SD-WAN部署', count: 38 },
    { id: 3, name: 'BGP路由优化', count: 35 },
    { id: 4, name: '网络自动化', count: 31 },
    { id: 5, name: '安全配置', count: 28 },
    { id: 6, name: 'IPv6迁移', count: 24 }
  ];
  
  // 推荐专家
  const experts = [
    { id: 1, name: '张工程师', title: 'CCIE讲师', avatar: '/images/avatars/expert1.jpg', topics: ['路由交换', 'MPLS'] },
    { id: 2, name: '李架构师', title: '网络架构专家', avatar: '/images/avatars/expert2.jpg', topics: ['网络设计', '数据中心'] },
    { id: 3, name: '王老师', title: 'CCIE安全专家', avatar: '/images/avatars/expert3.jpg', topics: ['网络安全', 'VPN'] }
  ];
  
  // 过滤讨论
  const filteredDiscussions = discussions.filter(item => {
    // 类别过滤
    const categoryMatch = activeCategory === 'all' || item.category === activeCategory;
    
    // 搜索过滤
    const searchMatch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
    return categoryMatch && searchMatch;
  });
  
  const toggleReplyForm = (discussionId) => {
    if (showReplyForm === discussionId) {
      setShowReplyForm(null);
    } else {
      setShowReplyForm(discussionId);
    }
  };

  return (
    <div className={styles.discussionContainer}>
      <div className={styles.discussionHeader}>
        <div className={styles.discussionHeaderContent}>
          <h2>CCIE技术讨论社区</h2>
          <p>分享知识，解答疑惑，与其他CCIE学习者和专家交流</p>
          
          <div className={styles.searchBar}>
            <input 
              type="text" 
              placeholder="搜索讨论话题..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button>搜索</button>
          </div>
        </div>
      </div>
      
      <div className={styles.discussionContent}>
        <div className={styles.mainContent}>
          {/* 顶部操作栏 */}
          <div className={styles.actionBar}>
            <div className={styles.categoryTabs}>
              {categories.map(category => (
                <button 
                  key={category.id}
                  className={activeCategory === category.id ? styles.activeTab : ''}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <button className={styles.newPostButton}>
              发布讨论
              <span className={styles.plusIcon}>+</span>
            </button>
          </div>
          
          {/* 讨论列表 */}
          <div className={styles.discussionList}>
            {filteredDiscussions.length > 0 ? (
              filteredDiscussions.map(discussion => (
                <div className={styles.discussionCard} key={discussion.id}>
                  <div className={styles.discussionMeta}>
                    <div className={styles.userInfo}>
                      <div className={styles.avatar}>
                        <img src={discussion.avatar} alt={discussion.author} />
                      </div>
                      <div className={styles.authorInfo}>
                        <div className={styles.authorName}>{discussion.author}</div>
                        <div className={styles.postDate}>{discussion.createdAt}</div>
                      </div>
                    </div>
                    <div className={styles.postStats}>
                      <div className={styles.statItem}>
                        <span className={styles.statIcon}>👁️</span>
                        <span>{discussion.views}</span>
                      </div>
                      <div className={styles.statItem}>
                        <span className={styles.statIcon}>💬</span>
                        <span>{discussion.replies}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.discussionBody}>
                    <h3 className={styles.discussionTitle}>
                      {discussion.isHot && <span className={styles.hotLabel}>热门</span>}
                      <Link href={`/discussion/${discussion.id}`}>
                        {discussion.title}
                      </Link>
                    </h3>
                    <p className={styles.discussionExcerpt}>
                      {discussion.content.length > 150 
                        ? `${discussion.content.substring(0, 150)}...` 
                        : discussion.content
                      }
                    </p>
                    <div className={styles.discussionTags}>
                      {discussion.tags.map(tag => (
                        <span key={tag} className={styles.tag}>#{tag}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className={styles.discussionActions}>
                    <button 
                      className={styles.replyButton}
                      onClick={() => toggleReplyForm(discussion.id)}
                    >
                      回复
                    </button>
                    <button className={styles.shareButton}>分享</button>
                    <button className={styles.saveButton}>收藏</button>
                  </div>
                  
                  {showReplyForm === discussion.id && (
                    <div className={styles.replyFormContainer}>
                      <textarea 
                        placeholder="写下您的回复..." 
                        className={styles.replyTextarea}
                        rows={4}
                      ></textarea>
                      <div className={styles.replyFormActions}>
                        <button className={styles.cancelButton} onClick={() => setShowReplyForm(null)}>取消</button>
                        <button className={styles.submitButton}>提交回复</button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className={styles.noResults}>
                <p>没有找到匹配的讨论。请尝试其他搜索词或查看全部讨论。</p>
              </div>
            )}
          </div>
          
          {/* 分页 */}
          <div className={styles.pagination}>
            <button className={styles.pageButton} disabled>上一页</button>
            <span className={styles.pageIndicator}>1</span>
            <button className={styles.pageButton}>2</button>
            <button className={styles.pageButton}>3</button>
            <span className={styles.pageEllipsis}>...</span>
            <button className={styles.pageButton}>8</button>
            <button className={styles.pageButton}>下一页</button>
          </div>
        </div>
        
        <div className={styles.sidebar}>
          {/* 发布新讨论 */}
          <div className={styles.sidebarSection}>
            <div className={styles.createDiscussion}>
              <h3>分享您的问题或经验</h3>
              <p>与CCIE社区的成员交流，获取专业解答</p>
              <button className={styles.createButton}>发布新讨论</button>
            </div>
          </div>
          
          {/* 热门话题 */}
          <div className={styles.sidebarSection}>
            <h3>热门话题</h3>
            <div className={styles.topicList}>
              {hotTopics.map(topic => (
                <div className={styles.topicItem} key={topic.id}>
                  <span className={styles.topicName}>{topic.name}</span>
                  <span className={styles.topicCount}>{topic.count}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* 推荐专家 */}
          <div className={styles.sidebarSection}>
            <h3>推荐专家</h3>
            <div className={styles.expertList}>
              {experts.map(expert => (
                <div className={styles.expertCard} key={expert.id}>
                  <div className={styles.expertAvatar}>
                    <img src={expert.avatar} alt={expert.name} />
                  </div>
                  <div className={styles.expertInfo}>
                    <div className={styles.expertName}>{expert.name}</div>
                    <div className={styles.expertTitle}>{expert.title}</div>
                    <div className={styles.expertTopics}>
                      {expert.topics.map((topic, index) => (
                        <span key={index} className={styles.expertTopic}>{topic}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.becomeExpert}>
              <h4>成为社区专家</h4>
              <p>分享您的专业知识，提升个人影响力</p>
              <Link href="/become-expert">
                <button className={styles.expertButton}>申请成为专家</button>
              </Link>
            </div>
          </div>
          
          {/* CCIE课程推荐 */}
          <div className={styles.sidebarSection}>
            <div className={styles.coursePromo}>
              <h3>提升技能，加速通过CCIE</h3>
              <div className={styles.courseImage}>
                <img src="/images/courses/ccie-lab-preview.jpg" alt="CCIE实验班" />
              </div>
              <h4>CCIE实验专项突破班</h4>
              <div className={styles.courseFeatures}>
                <div className={styles.courseFeature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>3个月通过实验考试</span>
                </div>
                <div className={styles.courseFeature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>100+实验拓扑练习</span>
                </div>
                <div className={styles.courseFeature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>专家1对1指导</span>
                </div>
              </div>
              <Link href="/courses/ccie-lab">
                <button className={styles.courseButton}>了解详情</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 