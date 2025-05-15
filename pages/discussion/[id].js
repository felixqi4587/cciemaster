import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';
import LeadMagnet from '../../components/LeadMagnet';
import styles from '../../styles/DiscussionDetail.module.css';

// 模拟讨论数据库
const discussionData = {
  '1': {
    id: 1,
    title: '如何解决BGP路由振荡问题？',
    content: `最近在实验中遇到BGP路由不稳定的情况，查看日志发现存在路由振荡。我已经配置了route dampening，但效果不明显。

具体环境：
- Cisco IOS XE 16.9.3
- 3个AS互联的BGP网络
- eBGP邻居之间有多条链路

日志中经常出现以下信息：
\`\`\`
%BGP-5-ADJCHANGE: neighbor 10.1.1.2 Down BGP Notification sent
%BGP-3-NOTIFICATION: sent to neighbor 10.1.1.2 4/0 (hold time expired) 0 bytes
\`\`\`

过一会儿又会自动建立起来，然后一段时间后又断开。

我已经检查了物理链路状态，链路本身没有问题。调整了keepalive和holdtime参数也没有明显改善。

有没有经验丰富的工程师可以给点建议？谢谢！`,
    author: '网络工程师小王',
    avatar: '/images/avatars/user1.jpg',
    category: 'question',
    tags: ['BGP', '路由', '故障排除'],
    createdAt: '2024-05-10 14:23',
    views: 125,
    likes: 18,
    replies: [
      {
        id: 101,
        author: '思科讲师李四',
        avatar: '/images/avatars/user4.jpg',
        content: '你好，根据你描述的情况，这可能是由于以下几个原因导致的：\n\n1. BGP定时器不匹配：检查两端的keepalive和holdtime是否一致\n2. 网络拥塞：检查链路使用率，可能是由于拥塞导致BGP keepalive消息延迟\n3. 路由策略冲突：检查是否有路由策略导致路由不断被撤销和宣告\n4. CPU使用率过高：检查路由器CPU使用情况\n\n建议你使用以下命令收集更多信息：\n```\nshow processes cpu history\nshow ip bgp neighbors 10.1.1.2\nshow ip bgp flap-statistics\n```\n\n收集信息后再分析，如果需要我可以进一步帮助。',
        createdAt: '2024-05-10 15:10',
        likes: 12,
        isAnswer: true
      },
      {
        id: 102,
        author: '架构师张三',
        avatar: '/images/avatars/user3.jpg',
        content: '补充一点，我之前也遇到过类似问题，最后发现是MTU不匹配导致的。BGP使用TCP，如果MTU配置不当，可能导致TCP分段，进而影响BGP keepalive消息的传输。\n\n建议检查两端接口的MTU设置，并考虑在BGP邻居间启用TCP路径MTU发现：\n\n```\nrouter bgp 65000\n neighbor 10.1.1.2 transport path-mtu-discovery\n```\n\n另外，可以考虑使用BFD（双向转发检测）来加速BGP会话的失效检测：\n\n```\nrouter bgp 65000\n neighbor 10.1.1.2 fall-over bfd\n```',
        createdAt: '2024-05-10 15:45',
        likes: 8,
        isAnswer: false
      },
      {
        id: 103,
        author: '网络工程师小王',
        avatar: '/images/avatars/user1.jpg',
        content: '感谢各位专家的建议！经过检查，发现确实是MTU问题。在一条链路上存在GRE隧道，导致有效载荷大小受限，而BGP更新消息较大时就会出现问题。\n\n设置了path-mtu-discovery后，问题解决了。再次感谢！',
        createdAt: '2024-05-11 09:20',
        likes: 5,
        isAnswer: false
      }
    ]
  },
  '2': {
    id: 2,
    title: '分享我的CCIE备考经验：3个月一次通过实验',
    content: `去年10月通过笔试，今年1月顺利通过实验考试。现将备考经验分享给大家，希望对正在备考的朋友有所帮助。

## 备考背景
- 工作经验：5年网络工程师经验
- 基础认证：持有CCNP证书2年
- 学习时间：每天平均4小时，周末8-10小时

## 备考计划
我将学习分为三个阶段：

### 第一阶段：理论强化（1个月）
- 系统学习思科官方文档
- 深入理解路由协议原理
- 每天记笔记和思维导图

### 第二阶段：实验练习（1.5个月）
- 搭建EVE-NG实验环境
- 按模块刷实验（每天至少完成1个）
- 记录实验过程和排错经验

### 第三阶段：模拟考试（0.5个月）
- 完整做至少5套模拟题
- 严格控制时间（8小时）
- 分析错误并加强薄弱环节

## 实用技巧分享
1. **构建知识体系**：将知识点连成网络，而不是孤立记忆
2. **专注实验操作**：理论与实践结合，光看不练很难掌握
3. **时间管理**：考试时间有限，提前规划解题顺序
4. **故障排除能力**：培养系统性排错思路和方法
5. **保持心态**：不要急躁，遇到问题先分析再操作

## 推荐资源
- 官方文档：思科官网技术文档库
- 实验工具：EVE-NG专业版
- 参考书：《CCIE Routing and Switching v5.1 Official Cert Guide》
- 实验手册：INE的CCIE RS Workbook

希望我的经验能帮助到正在备考的朋友们。如有问题，欢迎在评论区交流！`,
    author: 'CCIE#12345',
    avatar: '/images/avatars/user2.jpg',
    category: 'share',
    tags: ['备考经验', '实验考试', '学习方法'],
    createdAt: '2024-05-08 09:15',
    views: 320,
    likes: 45,
    replies: [
      {
        id: 201,
        author: '网络小白',
        avatar: '/images/avatars/user5.jpg',
        content: '感谢分享！请问一下，您觉得CCIE备考最大的挑战是什么？如何克服的？',
        createdAt: '2024-05-08 10:30',
        likes: 3,
        isAnswer: false
      },
      {
        id: 202,
        author: 'CCIE#12345',
        avatar: '/images/avatars/user2.jpg',
        content: '我认为最大的挑战是保持长期学习的动力和解决复杂问题的能力。\n\n关于动力，我的做法是设定小目标，每完成一个小目标就给自己一些奖励。同时加入学习小组，互相监督和鼓励。\n\n关于解决复杂问题，我的方法是：\n1. 分解问题：将大问题拆分成小问题逐个击破\n2. 系统思考：从底层协议到高层应用，建立完整的思路\n3. 大量练习：反复实践类似场景，形成解题思路\n\n另外，学会适当休息也很重要，连续学习效率会降低。',
        createdAt: '2024-05-08 11:15',
        likes: 15,
        isAnswer: true
      }
    ]
  }
};

// 相关讨论推荐
const relatedDiscussions = [
  {
    id: 3,
    title: '企业环境中MPLS VPN设计的最佳实践',
    author: '架构师张三',
    avatar: '/images/avatars/user3.jpg',
    replies: 5,
    views: 98,
    createdAt: '2024-05-06'
  },
  {
    id: 4,
    title: '最新版CCIE企业基础设施考试变化分析',
    author: '思科讲师李四',
    avatar: '/images/avatars/user4.jpg',
    replies: 12,
    views: 210,
    createdAt: '2024-05-05'
  },
  {
    id: 5,
    title: 'EVE-NG vs GNS3：哪个更适合CCIE备考？',
    author: '网络小白',
    avatar: '/images/avatars/user5.jpg',
    replies: 18,
    views: 156,
    createdAt: '2024-05-03'
  }
];

export default function DiscussionDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  
  // 如果页面仍在获取数据，显示加载状态
  if (router.isFallback || !id) {
    return (
      <Layout>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>正在加载讨论内容...</p>
        </div>
      </Layout>
    );
  }
  
  // 获取讨论数据
  const discussion = discussionData[id];
  
  // 如果没有找到讨论，显示404页面
  if (!discussion) {
    return (
      <Layout title="讨论未找到">
        <div className={styles.notFound}>
          <h1>讨论未找到</h1>
          <p>您查找的讨论帖子不存在或已被删除。</p>
          <Link href="/discussion">
            <button className={styles.backButton}>返回讨论列表</button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  const handleSubmitReply = (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    
    // 这里可以添加发送回复的逻辑
    alert('回复已提交');
    setReplyContent('');
    setShowReplyForm(false);
  };
  
  return (
    <Layout title={`${discussion.title} - CCIE技术讨论`} description={discussion.content.substring(0, 160)}>
      <div className={styles.discussionDetailContainer}>
        <div className={styles.discussionContent}>
          {/* 面包屑导航 */}
          <div className={styles.breadcrumbs}>
            <Link href="/">
              <span className={styles.breadcrumbLink}>首页</span>
            </Link>
            <span className={styles.breadcrumbSeparator}>&gt;</span>
            <Link href="/discussion">
              <span className={styles.breadcrumbLink}>技术讨论</span>
            </Link>
            <span className={styles.breadcrumbSeparator}>&gt;</span>
            <span className={styles.breadcrumbCurrent}>{discussion.title}</span>
          </div>
          
          {/* 讨论主题 */}
          <div className={styles.discussionMain}>
            <div className={styles.discussionHeader}>
              <h1 className={styles.discussionTitle}>{discussion.title}</h1>
              <div className={styles.discussionMeta}>
                <div className={styles.authorInfo}>
                  <div className={styles.avatar}>
                    <img src={discussion.avatar} alt={discussion.author} />
                  </div>
                  <div className={styles.authorName}>{discussion.author}</div>
                  <div className={styles.postTime}>{discussion.createdAt}</div>
                </div>
                <div className={styles.discussionStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statIcon}>👁️</span>
                    <span>{discussion.views} 查看</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statIcon}>💬</span>
                    <span>{discussion.replies.length} 回复</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statIcon}>👍</span>
                    <span>{discussion.likes} 赞</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.discussionBody}>
              <div className={styles.discussionText}>
                {discussion.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className={paragraph.startsWith('## ') ? styles.subheading : 
                                          paragraph.startsWith('### ') ? styles.subsubheading : 
                                          paragraph.startsWith('```') ? styles.codeBlock : 
                                          styles.paragraph}>
                    {paragraph.startsWith('## ') ? paragraph.substring(3) : 
                     paragraph.startsWith('### ') ? paragraph.substring(4) : 
                     paragraph.startsWith('- ') ? paragraph.split('\n').map((line, i) => (
                       <span key={i} className={styles.listItem}>{line}<br /></span>
                     )) : 
                     paragraph}
                  </p>
                ))}
              </div>
              
              <div className={styles.discussionTags}>
                {discussion.tags.map(tag => (
                  <span key={tag} className={styles.tag}>#{tag}</span>
                ))}
              </div>
              
              <div className={styles.discussionActions}>
                <button className={styles.likeButton}>
                  <span className={styles.actionIcon}>👍</span>
                  <span>点赞</span>
                </button>
                <button className={styles.shareButton}>
                  <span className={styles.actionIcon}>📤</span>
                  <span>分享</span>
                </button>
                <button className={styles.saveButton}>
                  <span className={styles.actionIcon}>🔖</span>
                  <span>收藏</span>
                </button>
                <button className={styles.reportButton}>
                  <span className={styles.actionIcon}>🚩</span>
                  <span>举报</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* 回复列表 */}
          <div className={styles.repliesSection}>
            <div className={styles.repliesHeader}>
              <h2>{discussion.replies.length} 个回复</h2>
              <div className={styles.repliesSort}>
                <span className={styles.sortLabel}>排序方式：</span>
                <select className={styles.sortSelect}>
                  <option value="newest">最新</option>
                  <option value="oldest">最早</option>
                  <option value="popular">最受欢迎</option>
                </select>
              </div>
            </div>
            
            <div className={styles.repliesList}>
              {discussion.replies.map(reply => (
                <div key={reply.id} className={`${styles.replyItem} ${reply.isAnswer ? styles.bestAnswer : ''}`}>
                  {reply.isAnswer && (
                    <div className={styles.bestAnswerLabel}>最佳回答</div>
                  )}
                  <div className={styles.replyHeader}>
                    <div className={styles.replyAuthor}>
                      <div className={styles.avatar}>
                        <img src={reply.avatar} alt={reply.author} />
                      </div>
                      <div className={styles.authorInfo}>
                        <div className={styles.authorName}>{reply.author}</div>
                        <div className={styles.replyTime}>{reply.createdAt}</div>
                      </div>
                    </div>
                    <div className={styles.replyLikes}>
                      <span className={styles.likeIcon}>👍</span>
                      <span>{reply.likes}</span>
                    </div>
                  </div>
                  
                  <div className={styles.replyContent}>
                    {reply.content.split('\n\n').map((paragraph, index) => (
                      <p key={index} className={paragraph.startsWith('```') ? styles.codeBlock : styles.paragraph}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  
                  <div className={styles.replyActions}>
                    <button className={styles.likeButton}>
                      <span className={styles.actionIcon}>👍</span>
                      <span>点赞</span>
                    </button>
                    <button className={styles.replyToButton}>
                      <span className={styles.actionIcon}>💬</span>
                      <span>回复</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 回复表单 */}
            <div className={styles.replyFormSection}>
              {!showReplyForm ? (
                <button 
                  className={styles.showReplyFormButton}
                  onClick={() => setShowReplyForm(true)}
                >
                  写下您的回复
                </button>
              ) : (
                <form className={styles.replyForm} onSubmit={handleSubmitReply}>
                  <h3>回复讨论</h3>
                  <textarea 
                    className={styles.replyTextarea}
                    placeholder="写下您的回复..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    rows={6}
                    required
                  ></textarea>
                  <div className={styles.formActions}>
                    <button 
                      type="button" 
                      className={styles.cancelButton}
                      onClick={() => setShowReplyForm(false)}
                    >
                      取消
                    </button>
                    <button type="submit" className={styles.submitButton}>
                      提交回复
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
        
        <div className={styles.sidebar}>
          {/* 讨论统计 */}
          <div className={styles.sidebarSection}>
            <h3>讨论统计</h3>
            <div className={styles.statsList}>
              <div className={styles.statsItem}>
                <div className={styles.statsLabel}>创建时间</div>
                <div className={styles.statsValue}>{discussion.createdAt}</div>
              </div>
              <div className={styles.statsItem}>
                <div className={styles.statsLabel}>查看次数</div>
                <div className={styles.statsValue}>{discussion.views}</div>
              </div>
              <div className={styles.statsItem}>
                <div className={styles.statsLabel}>回复数量</div>
                <div className={styles.statsValue}>{discussion.replies.length}</div>
              </div>
              <div className={styles.statsItem}>
                <div className={styles.statsLabel}>点赞数量</div>
                <div className={styles.statsValue}>{discussion.likes}</div>
              </div>
            </div>
          </div>
          
          {/* 引流组件 */}
          <div className={styles.sidebarSection}>
            <LeadMagnet
              title="提升您的CCIE备考效率"
              description="免费获取《CCIE考试常见问题与解决方案》电子书"
              buttonText="免费下载"
              type="sidebar"
            />
          </div>
          
          {/* 相关讨论 */}
          <div className={styles.sidebarSection}>
            <h3>相关讨论</h3>
            <div className={styles.relatedList}>
              {relatedDiscussions.map(related => (
                <div key={related.id} className={styles.relatedItem}>
                  <Link href={`/discussion/${related.id}`}>
                    <a className={styles.relatedLink}>
                      <div className={styles.relatedTitle}>{related.title}</div>
                      <div className={styles.relatedMeta}>
                        <div className={styles.relatedAuthor}>
                          <div className={styles.smallAvatar}>
                            <img src={related.avatar} alt={related.author} />
                          </div>
                          <span>{related.author}</span>
                        </div>
                        <div className={styles.relatedStats}>
                          <span>{related.replies} 回复</span>
                          <span>{related.views} 查看</span>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          
          {/* 课程推荐 */}
          <div className={styles.sidebarSection}>
            <div className={styles.coursePromo}>
              <h3>提升CCIE技能</h3>
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
    </Layout>
  );
} 