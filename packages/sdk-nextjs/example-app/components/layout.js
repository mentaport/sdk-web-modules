import Head from 'next/head';
import Image from 'next/image';

import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';


export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Example of Mentaport Next.js SDK modules"
        />
        
        <meta name="og:title" content="Mentaport Example" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
    
      <header className={styles.header}>
        <>
          <Image
            priority
            src="/images/profile.jpg"
            className={utilStyles.borderCircle}
            height={144}
            width={144}
            alt={'name'}
          />
          <h1 className={utilStyles.headingXl}>Mentaport Example</h1>
          <h3 className={utilStyles.headingLg}>NextJS provider integration</h3>
        </>
       
      </header>
      <main>{children}</main>
     
    </div>
  );
}
