import '../styles/globals.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // 只在客户端且开发模式下初始化stagewise工具栏
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      import('@stagewise/toolbar').then(({ initToolbar }) => {
        import('@stagewise-plugins/react').then(({ ReactPlugin }) => {
          initToolbar({
            plugins: [ReactPlugin()],
          });
        });
      });
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp; 