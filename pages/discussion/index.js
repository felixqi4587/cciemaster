import Layout from '../../components/Layout';
import TechDiscussion from '../../components/TechDiscussion';
import Head from 'next/head';

export default function DiscussionPage() {
  return (
    <Layout>
      <Head>
        <title>CCIE技术讨论社区 - 交流分享网络技术心得</title>
        <meta 
          name="description" 
          content="加入CCIE技术讨论社区，与其他网络工程师和思科认证专家交流学习经验、分享技术心得，解决CCIE备考和职场中的技术难题。" 
        />
        <meta 
          name="keywords" 
          content="CCIE社区,网络技术讨论,思科认证,网络工程师,技术交流,CCIE备考"
        />
      </Head>
      
      <TechDiscussion />
    </Layout>
  );
} 