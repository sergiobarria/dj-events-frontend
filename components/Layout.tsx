import Head from 'next/head';

import Header from './Header';
import Footer from './Footer';
import styles from '@/styles/Layout.module.css';

interface LayoutProps {
  title?: string;
  keywords?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({
  title,
  keywords,
  description,
  children,
}) => {
  return (
    <div className={styles.mainContainer}>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>
      <Header />
      <main className={styles.container}>{children}</main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: 'DJ Events | Find the hottest parties',
  description: 'Find the latest DJ and other musical events',
  keywords: 'music, dj, edm, events',
};

export default Layout;
