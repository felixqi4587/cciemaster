import '../styles/globals.css';
import { StagewiseToolbar } from '@stagewise/toolbar-next';
import { ReactPlugin } from '@stagewise-plugins/react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <StagewiseToolbar 
        config={{
          plugins: [ReactPlugin()]
        }}
      />
    </>
  );
}

export default MyApp; 