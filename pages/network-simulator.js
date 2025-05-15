import Head from 'next/head';
import Layout from '../components/Layout';
import NetworkSimulator from '../components/NetworkSimulator';
import LeadMagnet from '../components/LeadMagnet';
import styles from '../styles/SimulatorPage.module.css';

export default function NetworkSimulatorPage() {
  return (
    <Layout>
      <Head>
        <title>CCIE网络拓扑模拟器 - 在线练习思科配置</title>
        <meta 
          name="description" 
          content="免费在线CCIE网络拓扑模拟器，帮助您练习思科网络配置与排错。构建网络拓扑，模拟路由器和交换机操作，提升实验技能。" 
        />
        <meta 
          name="keywords" 
          content="CCIE模拟器,网络拓扑,思科设备模拟,网络配置练习,在线实验平台,IOS命令练习"
        />
      </Head>
      
      <div className={styles.simulatorPage}>
        <div className={styles.pageHeader}>
          <h1>CCIE网络拓扑模拟器</h1>
          <p>免费在线体验网络设备配置，提升您的CCIE实验技能</p>
        </div>
        
        <div className={styles.mainContent}>
          <div className={styles.simulatorWrapper}>
            <NetworkSimulator />
          </div>
          
          <div className={styles.featureCards}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔄</div>
              <h3>真实设备模拟</h3>
              <p>模拟思科路由器、交换机操作，支持常用IOS命令</p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🛠️</div>
              <h3>拓扑构建工具</h3>
              <p>拖放式界面，轻松创建复杂网络拓扑结构</p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⚡</div>
              <h3>实时命令响应</h3>
              <p>输入命令获得即时反馈，模拟真实网络环境</p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📊</div>
              <h3>多设备支持</h3>
              <p>同时配置多台设备，练习网络互联与排错</p>
            </div>
          </div>
        </div>
        
        <div className={styles.upgradeSection}>
          <div className={styles.upgradeContent}>
            <h2>升级到CCIE实验室专业版</h2>
            <p>获得完整功能的网络模拟环境，加速您的CCIE认证之路</p>
            
            <div className={styles.comparisionTable}>
              <div className={styles.tableHeader}>
                <div className={styles.featureColumn}>功能对比</div>
                <div className={styles.freeColumn}>在线免费版</div>
                <div className={styles.proColumn}>专业实验版</div>
              </div>
              
              <div className={styles.tableRow}>
                <div className={styles.featureColumn}>设备数量限制</div>
                <div className={styles.freeColumn}>最多5个</div>
                <div className={styles.proColumn}>无限制</div>
              </div>
              
              <div className={styles.tableRow}>
                <div className={styles.featureColumn}>连接数量限制</div>
                <div className={styles.freeColumn}>最多8条</div>
                <div className={styles.proColumn}>无限制</div>
              </div>
              
              <div className={styles.tableRow}>
                <div className={styles.featureColumn}>命令支持</div>
                <div className={styles.freeColumn}>基础命令</div>
                <div className={styles.proColumn}>全部IOS命令</div>
              </div>
              
              <div className={styles.tableRow}>
                <div className={styles.featureColumn}>配置保存</div>
                <div className={styles.freeColumn}>
                  <span className={styles.noIcon}>✕</span>
                </div>
                <div className={styles.proColumn}>
                  <span className={styles.yesIcon}>✓</span>
                </div>
              </div>
              
              <div className={styles.tableRow}>
                <div className={styles.featureColumn}>实验场景</div>
                <div className={styles.freeColumn}>
                  <span className={styles.noIcon}>✕</span>
                </div>
                <div className={styles.proColumn}>
                  <span className={styles.yesIcon}>✓</span>
                  50+预设场景
                </div>
              </div>
              
              <div className={styles.tableRow}>
                <div className={styles.featureColumn}>实验指导</div>
                <div className={styles.freeColumn}>
                  <span className={styles.noIcon}>✕</span>
                </div>
                <div className={styles.proColumn}>
                  <span className={styles.yesIcon}>✓</span>
                  专家指导
                </div>
              </div>
              
              <div className={styles.tableRow}>
                <div className={styles.featureColumn}>故障排除</div>
                <div className={styles.freeColumn}>基础功能</div>
                <div className={styles.proColumn}>高级功能</div>
              </div>
            </div>
            
            <div className={styles.cta}>
              <a href="/courses/simulation-lab" className={styles.ctaButton}>
                了解专业版详情
              </a>
              <p className={styles.ctaNote}>
                专业版首月仅需¥399，提供7天无条件退款保证
              </p>
            </div>
          </div>
        </div>
        
        <div className={styles.testimonialsSection}>
          <h2>学员使用反馈</h2>
          <div className={styles.testimonials}>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p>"这个模拟器帮我解决了实验环境搭建的大问题，在家就能随时练习配置，极大提升了我的学习效率。"</p>
              </div>
              <div className={styles.testimonialAuthor}>
                <img src="/images/avatars/student1.jpg" alt="张工程师" />
                <div>
                  <h4>张工程师</h4>
                  <p>CCIE #45678</p>
                </div>
              </div>
            </div>
            
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p>"专业版的预设场景覆盖了考试中的绝大部分技术点，对我通过CCIE实验考试帮助很大。"</p>
              </div>
              <div className={styles.testimonialAuthor}>
                <img src="/images/avatars/student2.jpg" alt="李网工" />
                <div>
                  <h4>李网工</h4>
                  <p>某互联网公司网络主管</p>
                </div>
              </div>
            </div>
            
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p>"教学和实践结合得很好，每个实验都有详细的指导和讲解，让我对协议原理有了更深入的理解。"</p>
              </div>
              <div className={styles.testimonialAuthor}>
                <img src="/images/avatars/student3.jpg" alt="王学员" />
                <div>
                  <h4>王学员</h4>
                  <p>网络工程师</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.faqSection}>
          <h2>常见问题解答</h2>
          <div className={styles.faqList}>
            <div className={styles.faqItem}>
              <h3>这个模拟器能否完全替代物理设备练习？</h3>
              <p>虽然我们的模拟器尽可能还原了真实设备的功能，但对于CCIE考试准备，我们仍建议结合物理设备进行部分练习。模拟器非常适合日常练习和初步掌握配置技能。</p>
            </div>
            
            <div className={styles.faqItem}>
              <h3>专业版支持哪些类型的设备？</h3>
              <p>专业版支持思科路由器、交换机、防火墙等设备的模拟，涵盖CCIE考试中的主要设备类型。</p>
            </div>
            
            <div className={styles.faqItem}>
              <h3>如何获取专业版的50多个预设场景？</h3>
              <p>注册专业版账号后，您可以直接在实验平台中访问所有预设场景，包括配置指南和解决方案。</p>
            </div>
            
            <div className={styles.faqItem}>
              <h3>使用模拟器是否需要安装额外软件？</h3>
              <p>不需要。我们的模拟器是基于Web的工具，只需要一个现代浏览器即可使用。</p>
            </div>
          </div>
        </div>
        
        <div className={styles.leadMagnetSection}>
          <LeadMagnet 
            title="获取免费的CCIE实验技巧电子书" 
            description="包含20个实用技巧，帮助您更高效地准备CCIE实验考试"
            buttonText="立即下载"
            type="large"
          />
        </div>
      </div>
    </Layout>
  );
} 