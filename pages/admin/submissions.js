import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../../styles/Admin.module.css';

export default function SubmissionsPage() {
  const [apiSubmissions, setApiSubmissions] = useState([]);
  const [localSubmissions, setLocalSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('api');
  
  // 从API获取提交数据
  useEffect(() => {
    const fetchApiSubmissions = async () => {
      try {
        const response = await fetch('/api/submissions');
        if (!response.ok) {
          throw new Error('无法获取API提交数据');
        }
        const data = await response.json();
        setApiSubmissions(data.data || []);
      } catch (err) {
        console.error('获取API提交数据时出错:', err);
        setError('无法加载API提交数据，请稍后再试');
      }
    };
    
    // 从localStorage获取提交数据
    const getLocalSubmissions = () => {
      if (typeof window !== 'undefined') {
        try {
          const localData = JSON.parse(localStorage.getItem('contactFormSubmissions') || '[]');
          setLocalSubmissions(localData);
        } catch (err) {
          console.error('解析本地存储数据时出错:', err);
          setError('无法加载本地提交数据');
        }
      }
    };
    
    const loadData = async () => {
      setIsLoading(true);
      await fetchApiSubmissions();
      getLocalSubmissions();
      setIsLoading(false);
    };
    
    loadData();
  }, []);
  
  // 刷新数据
  const refreshData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/submissions');
      if (!response.ok) {
        throw new Error('无法获取API提交数据');
      }
      const data = await response.json();
      setApiSubmissions(data.data || []);
      
      if (typeof window !== 'undefined') {
        const localData = JSON.parse(localStorage.getItem('contactFormSubmissions') || '[]');
        setLocalSubmissions(localData);
      }
    } catch (err) {
      console.error('刷新数据时出错:', err);
      setError('刷新数据时出错，请稍后再试');
    }
    
    setIsLoading(false);
  };
  
  // 清除数据
  const clearData = async (source) => {
    if (!confirm(`确定要清除${source === 'api' ? 'API' : '本地'}提交数据吗？此操作不可撤销。`)) {
      return;
    }
    
    setIsLoading(true);
    
    if (source === 'api') {
      try {
        const response = await fetch('/api/submissions', {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error('清除API数据失败');
        }
        setApiSubmissions([]);
      } catch (err) {
        console.error('清除API数据时出错:', err);
        setError('清除API数据时出错');
      }
    } else if (source === 'local') {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('contactFormSubmissions');
        setLocalSubmissions([]);
      }
    }
    
    setIsLoading(false);
  };
  
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch (err) {
      return dateString || '未知';
    }
  };
  
  // 渲染表单数据
  const renderSubmissions = (submissions) => {
    if (submissions.length === 0) {
      return <p className={styles.noData}>暂无提交数据</p>;
    }
    
    return (
      <div className={styles.submissionsTable}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>姓名</th>
              <th>邮箱</th>
              <th>电话</th>
              <th>主题</th>
              <th>消息</th>
              <th>提交时间</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, index) => (
              <tr key={submission.id || submission.submitTime || index}>
                <td>{submission.id || index + 1}</td>
                <td>{submission.name}</td>
                <td>{submission.email}</td>
                <td>{submission.phone}</td>
                <td>{submission.subject}</td>
                <td className={styles.messageCell}>
                  <div className={styles.messageContent}>{submission.message}</div>
                </td>
                <td>{formatDate(submission.timestamp || submission.submitTime)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  return (
    <>
      <Head>
        <title>表单提交管理 - CCIE培训</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <div className={styles.adminContainer}>
        <div className={styles.adminHeader}>
          <h1>表单提交管理</h1>
          <div className={styles.adminActions}>
            <button 
              onClick={refreshData} 
              className={styles.actionButton}
              disabled={isLoading}
            >
              刷新数据
            </button>
            <button 
              onClick={() => clearData(activeTab)} 
              className={`${styles.actionButton} ${styles.dangerButton}`}
              disabled={isLoading}
            >
              清除{activeTab === 'api' ? 'API' : '本地'}数据
            </button>
          </div>
        </div>
        
        {error && (
          <div className={styles.errorAlert}>
            <p>{error}</p>
          </div>
        )}
        
        <div className={styles.tabContainer}>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tabButton} ${activeTab === 'api' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('api')}
            >
              API 提交数据 ({apiSubmissions.length})
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'local' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('local')}
            >
              本地存储数据 ({localSubmissions.length})
            </button>
          </div>
          
          <div className={styles.tabContent}>
            {isLoading ? (
              <div className={styles.loading}>加载中...</div>
            ) : (
              <>
                {activeTab === 'api' && renderSubmissions(apiSubmissions)}
                {activeTab === 'local' && renderSubmissions(localSubmissions)}
              </>
            )}
          </div>
        </div>
        
        <div className={styles.adminFooter}>
          <p>注意：API数据在服务器重启后将会丢失，仅用于演示。实际应用中应使用数据库存储。</p>
          <p>本地存储数据仅在当前浏览器中可见，不同设备无法共享查看。</p>
        </div>
      </div>
    </>
  );
} 