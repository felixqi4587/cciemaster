import { useState } from 'react';
import styles from '../styles/DemoLearningPlatform.module.css';

export default function DemoLearningPlatform() {
  const [activeTab, setActiveTab] = useState('courseContent');
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const openModal = () => {
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // 这里可以添加提交逻辑
    alert('已收到您的试用申请，我们会尽快与您联系！');
    setShowModal(false);
  };

  return (
    <div className={styles.demoContainer}>
      <div className={styles.demoHeader}>
        <h2>CCIE备考在线学习平台</h2>
        <p>体验我们的智能学习系统，助您更高效备战CCIE认证</p>
      </div>
      
      {/* 平台屏幕截图 */}
      <div className={styles.demoPreview}>
        <div className={styles.demoScreen}>
          <div className={styles.demoNav}>
            <div className={styles.demoLogo}>CCIE在线学院</div>
            <div className={styles.demoNavItems}>
              <div className={styles.demoNavItem}>课程</div>
              <div className={styles.demoNavItem}>实验室</div>
              <div className={styles.demoNavItem}>考试</div>
              <div className={styles.demoNavItem}>社区</div>
              <div className={styles.demoNavItem}>我的学习</div>
            </div>
            <div className={styles.demoUser}>
              <div className={styles.demoAvatar}></div>
            </div>
          </div>
          
          <div className={styles.demoContent}>
            <div className={styles.demoSidebar}>
              <div className={styles.demoProgress}>
                <div className={styles.demoProgressTitle}>课程进度</div>
                <div className={styles.demoProgressBar}>
                  <div className={styles.demoProgressFill} style={{ width: '42%' }}></div>
                </div>
                <div className={styles.demoProgressText}>42% 完成</div>
              </div>
              
              <div className={styles.demoModules}>
                <div className={styles.demoModuleTitle}>课程模块</div>
                <div className={styles.demoModuleList}>
                  <div className={`${styles.demoModule} ${styles.completed}`}>
                    <div className={styles.demoModuleIcon}>✓</div>
                    <div className={styles.demoModuleName}>CCIE基础知识</div>
                  </div>
                  <div className={`${styles.demoModule} ${styles.inProgress}`}>
                    <div className={styles.demoModuleIcon}>▶</div>
                    <div className={styles.demoModuleName}>路由协议详解</div>
                  </div>
                  <div className={styles.demoModule}>
                    <div className={styles.demoModuleIcon}>○</div>
                    <div className={styles.demoModuleName}>交换技术与实现</div>
                  </div>
                  <div className={styles.demoModule}>
                    <div className={styles.demoModuleIcon}>○</div>
                    <div className={styles.demoModuleName}>网络安全</div>
                  </div>
                  <div className={styles.demoModule}>
                    <div className={styles.demoModuleIcon}>○</div>
                    <div className={styles.demoModuleName}>自动化与编程</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.demoMainContent}>
              <div className={styles.demoTabs}>
                <div 
                  className={`${styles.demoTab} ${activeTab === 'courseContent' ? styles.active : ''}`}
                  onClick={() => handleTabChange('courseContent')}
                >
                  课程内容
                </div>
                <div 
                  className={`${styles.demoTab} ${activeTab === 'labExercise' ? styles.active : ''}`}
                  onClick={() => handleTabChange('labExercise')}
                >
                  实验练习
                </div>
                <div 
                  className={`${styles.demoTab} ${activeTab === 'quizzes' ? styles.active : ''}`}
                  onClick={() => handleTabChange('quizzes')}
                >
                  测验
                </div>
                <div 
                  className={`${styles.demoTab} ${activeTab === 'resources' ? styles.active : ''}`}
                  onClick={() => handleTabChange('resources')}
                >
                  资源
                </div>
              </div>
              
              <div className={styles.demoTabContent}>
                {activeTab === 'courseContent' && (
                  <div className={styles.demoCourseContent}>
                    <h3>BGP协议深度解析</h3>
                    <div className={styles.demoVideo}></div>
                    <div className={styles.demoVideoControls}>
                      <div className={styles.demoPlayButton}></div>
                      <div className={styles.demoProgressBar}>
                        <div className={styles.demoProgressFill} style={{ width: '65%' }}></div>
                      </div>
                      <div className={styles.demoVideoTime}>18:45 / 28:30</div>
                    </div>
                    <div className={styles.demoDescription}>
                      <h4>本节内容</h4>
                      <ul>
                        <li>BGP协议基础与特性</li>
                        <li>BGP邻居关系建立过程</li>
                        <li>路由传播与路由策略</li>
                        <li>BGP路径属性详解</li>
                        <li>常见BGP问题排查方法</li>
                      </ul>
                    </div>
                  </div>
                )}
                
                {activeTab === 'labExercise' && (
                  <div className={styles.demoLabContent}>
                    <h3>BGP配置实验</h3>
                    <div className={styles.demoLabImage}></div>
                    <div className={styles.demoLabControls}>
                      <button className={styles.demoLabButton}>开始实验</button>
                      <button className={styles.demoLabButton}>下载实验指南</button>
                    </div>
                    <div className={styles.demoDescription}>
                      <h4>实验目标</h4>
                      <p>在此实验中，您将配置BGP路由协议，实现多AS之间的路由互通，并应用路由策略控制路径选择。</p>
                      <h4>实验环境</h4>
                      <p>完全模拟的思科设备环境，支持所有标准BGP命令和配置。</p>
                    </div>
                  </div>
                )}
                
                {activeTab === 'quizzes' && (
                  <div className={styles.demoQuizContent}>
                    <h3>BGP知识测验</h3>
                    <div className={styles.demoQuiz}>
                      <div className={styles.demoQuestionNumber}>问题 3 / 10</div>
                      <div className={styles.demoQuestion}>
                        在BGP路由选择过程中，优先考虑的属性是：
                      </div>
                      <div className={styles.demoAnswers}>
                        <div className={styles.demoAnswer}>
                          <input type="radio" id="answer_a" name="question" />
                          <label htmlFor="answer_a">本地优先级 (Local Preference)</label>
                        </div>
                        <div className={styles.demoAnswer}>
                          <input type="radio" id="answer_b" name="question" />
                          <label htmlFor="answer_b">AS路径长度 (AS Path)</label>
                        </div>
                        <div className={styles.demoAnswer}>
                          <input type="radio" id="answer_c" name="question" />
                          <label htmlFor="answer_c">MED值 (Multi-Exit Discriminator)</label>
                        </div>
                        <div className={styles.demoAnswer}>
                          <input type="radio" id="answer_d" name="question" />
                          <label htmlFor="answer_d">权重 (Weight)</label>
                        </div>
                      </div>
                      <div className={styles.demoQuizButtons}>
                        <button className={styles.demoQuizButton}>上一题</button>
                        <button className={styles.demoQuizButton}>提交答案</button>
                        <button className={styles.demoQuizButton}>下一题</button>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'resources' && (
                  <div className={styles.demoResourcesContent}>
                    <h3>学习资源</h3>
                    <div className={styles.demoResourcesList}>
                      <div className={styles.demoResource}>
                        <div className={styles.demoResourceIcon}>📄</div>
                        <div className={styles.demoResourceInfo}>
                          <div className={styles.demoResourceTitle}>BGP配置指南</div>
                          <div className={styles.demoResourceType}>PDF文档</div>
                        </div>
                        <div className={styles.demoResourceDownload}>下载</div>
                      </div>
                      <div className={styles.demoResource}>
                        <div className={styles.demoResourceIcon}>📋</div>
                        <div className={styles.demoResourceInfo}>
                          <div className={styles.demoResourceTitle}>BGP命令速查表</div>
                          <div className={styles.demoResourceType}>PDF文档</div>
                        </div>
                        <div className={styles.demoResourceDownload}>下载</div>
                      </div>
                      <div className={styles.demoResource}>
                        <div className={styles.demoResourceIcon}>📊</div>
                        <div className={styles.demoResourceInfo}>
                          <div className={styles.demoResourceTitle}>BGP故障排除流程图</div>
                          <div className={styles.demoResourceType}>PNG图片</div>
                        </div>
                        <div className={styles.demoResourceDownload}>下载</div>
                      </div>
                      <div className={styles.demoResource}>
                        <div className={styles.demoResourceIcon}>📝</div>
                        <div className={styles.demoResourceInfo}>
                          <div className={styles.demoResourceTitle}>BGP练习题</div>
                          <div className={styles.demoResourceType}>在线练习</div>
                        </div>
                        <div className={styles.demoResourceDownload}>打开</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 功能介绍 */}
      <div className={styles.demoFeatures}>
        <div className={styles.demoFeatureItem}>
          <div className={styles.demoFeatureIcon}>📚</div>
          <h3>全面课程内容</h3>
          <p>涵盖CCIE认证所有考点，包含视频讲解、文档资料和图表说明</p>
        </div>
        <div className={styles.demoFeatureItem}>
          <div className={styles.demoFeatureIcon}>🔬</div>
          <h3>实验环境</h3>
          <p>云端模拟实验室，随时随地进行CCIE配置练习，无需搭建复杂环境</p>
        </div>
        <div className={styles.demoFeatureItem}>
          <div className={styles.demoFeatureIcon}>📝</div>
          <h3>智能测验系统</h3>
          <p>覆盖各知识点的测验，自动分析薄弱环节，定制化复习建议</p>
        </div>
        <div className={styles.demoFeatureItem}>
          <div className={styles.demoFeatureIcon}>👨‍👩‍👧‍👦</div>
          <h3>学习社区</h3>
          <p>与其他CCIE学员交流讨论，分享学习经验和解题思路</p>
        </div>
      </div>
      
      {/* 呼叫行动按钮 */}
      <div className={styles.demoCTA}>
        <button className={styles.demoActionButton} onClick={openModal}>
          申请7天免费试用
        </button>
        <p>无需信用卡，随时可取消，体验完整学习功能</p>
      </div>
      
      {/* 注册模态框 */}
      {showModal && (
        <div className={styles.demoModal}>
          <div className={styles.demoModalContent}>
            <div className={styles.demoModalClose} onClick={closeModal}>×</div>
            <h3>申请7天免费试用</h3>
            <p>填写以下信息，立即体验我们的CCIE在线学习平台</p>
            
            <form onSubmit={handleSubmit} className={styles.demoModalForm}>
              <div className={styles.demoModalFormGroup}>
                <label>您的姓名</label>
                <input type="text" required />
              </div>
              <div className={styles.demoModalFormGroup}>
                <label>手机号码</label>
                <input type="tel" required />
              </div>
              <div className={styles.demoModalFormGroup}>
                <label>邮箱地址</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className={styles.demoModalFormGroup}>
                <label>您感兴趣的CCIE方向</label>
                <select required>
                  <option value="">请选择...</option>
                  <option value="enterprise">CCIE企业基础设施</option>
                  <option value="security">CCIE安全</option>
                  <option value="service-provider">CCIE服务提供商</option>
                  <option value="datacenter">CCIE数据中心</option>
                </select>
              </div>
              <button type="submit" className={styles.demoModalSubmit}>
                开始免费试用
              </button>
            </form>
            <div className={styles.demoModalFooter}>
              <p>我们将严格保护您的个人信息，详情请阅读<a href="/privacy">隐私政策</a></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 