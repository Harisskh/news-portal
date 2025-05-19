// File: src/pages/performance.tsx
// Halaman untuk pengukuran dan analisis kinerja website

import { useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useSession, signIn } from 'next-auth/react';
import Navbar from '../components/Navbar';
import PerformanceMetrics from '../components/PerformanceMetrics';
import PerformanceAnalyzer from '../components/PerformanceAnalyzer';
import { usePagePerformance } from '../hooks/usePagePerformance';
import styles from '../styles/Performance.module.css';

const PerformancePage: NextPage = () => {
  const { data: session, status } = useSession();
  const performanceMetrics = usePagePerformance();

  // Cek autentikasi
  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn();
    }
  }, [status]);

  // Tampilkan loading state
  if (status === 'loading') {
    return (
      <div className={styles.container}>
        <Head>
          <title>Performance Analysis | Haris News</title>
          <meta name="robots" content="noindex" />
        </Head>
        <Navbar />
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Tampilkan konten halaman
  return (
    <div className={styles.container}>
      <Head>
        <title>Performance Analysis | Haris News</title>
        <meta name="description" content="Analyze the performance metrics of Haris News website" />
      </Head>

      <Navbar />

      <main className={styles.main}>
        <h1 className={styles.title}>Website Performance Analysis</h1>
        
        <p className={styles.description}>
          This page shows real-time performance metrics for Haris News website based on
          Google Web Vitals and other industry standards.
        </p>
        
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Core Web Vitals</h2>
          <p className={styles.sectionDescription}>
            Core Web Vitals are a set of metrics that measure real-world user experience
            for loading performance, interactivity, and visual stability.
          </p>
          
          {/* Display performance metrics with detailed explanations */}
          <PerformanceMetrics metrics={performanceMetrics} showDetails={true} />
        </div>
        
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Performance Analysis</h2>
          <p className={styles.sectionDescription}>
            Based on the collected metrics, here's an analysis of your website's performance
            with recommendations for improvement.
          </p>
          
          {/* Display performance analyzer with recommendations */}
          <PerformanceAnalyzer metrics={performanceMetrics} />
        </div>
        
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Improvement Techniques</h2>
          
          <div className={styles.optimizationTips}>
            <div className={styles.tip}>
              <h3>Image Optimization</h3>
              <p>
                Use Next.js Image component to automatically optimize images. This component
                provides image resizing, optimization, and serving in modern formats.
              </p>
              <pre className={styles.codeExample}>
                {`<Image\n  src="/path/to/image.jpg"\n  alt="Description"\n  width={800}\n  height={600}\n  priority={true}\n/>`}
              </pre>
            </div>
            
            <div className={styles.tip}>
              <h3>Code Splitting</h3>
              <p>
                Next.js automatically splits your JavaScript bundles to load only the code
                needed for the current page, reducing initial load time.
              </p>
            </div>
            
            <div className={styles.tip}>
              <h3>Lazy Loading</h3>
              <p>
                Use dynamic imports to lazily load components that are not needed for initial render.
              </p>
              <pre className={styles.codeExample}>
                {`const DynamicComponent = dynamic(() => import('../components/Heavy'))`}
              </pre>
            </div>
            
            <div className={styles.tip}>
              <h3>Preloading Key Resources</h3>
              <p>
                Use Link preload for critical resources and next/link for client-side navigation.
              </p>
              <pre className={styles.codeExample}>
                {`<Link href="/news" prefetch={true}>\n  <a>News</a>\n</Link>`}
              </pre>
            </div>
            
            <div className={styles.tip}>
              <h3>Server-Side Rendering (SSR)</h3>
              <p>
                Use getServerSideProps for dynamic content that needs to be rendered on each request.
              </p>
            </div>
            
            <div className={styles.tip}>
              <h3>Static Generation</h3>
              <p>
                Use getStaticProps and getStaticPaths for content that can be pre-rendered at build time.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PerformancePage;