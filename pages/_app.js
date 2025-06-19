import '../styles/globals.css';
import Layout from '../components/Layout';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const [language, setLanguage] = useState('en'); // 默认使用英文
  const [isClient, setIsClient] = useState(false);
  
  // 初始加载时检查本地存储中的语言设置
  useEffect(() => {
    setIsClient(true);
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);
  
  // 处理语言变更
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    if (isClient) {
      localStorage.setItem('preferredLanguage', newLanguage);
    }
  };

  return (
    <Layout currentLanguage={language} onLanguageChange={handleLanguageChange}>
      <Component {...pageProps} language={language} />
    </Layout>
  );
}

export default MyApp; 