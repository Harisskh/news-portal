/**
 * Home Page with Navbar and Logout Button
 * pages/index.tsx
 */
 import { useState, useEffect } from 'react';
 import Head from 'next/head';
 import { useSession, signIn } from 'next-auth/react';
 import Navbar from '../components/Navbar'; // Import Navbar component
 import NewsCard from '../components/NewsCard';
 import SourceFilter from '../components/SourceFilter';
 import styles from '../styles/Home.module.css';
 import { NewsItem, NewsSource } from '../types/news';
 import { fetchNews } from '../lib/api';
 
 export default function Home() {
   const { data: session, status } = useSession();
   const [news, setNews] = useState<NewsItem[]>([]);
   const [sources, setSources] = useState<NewsSource[]>([]);
   const [selectedSource, setSelectedSource] = useState<string>('all');
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);
 
   // Ambil data berita
   useEffect(() => {
     const getNews = async () => {
       if (status === 'loading') return;
       
       // Redirect ke halaman login jika tidak ada session
       if (status === 'unauthenticated') {
         signIn();
         return;
       }
       
       try {
         setLoading(true);
         setError(null);
         
         const newsData = await fetchNews();
         console.log(`Fetched ${newsData.length} news items`); // Debugging
         
         setNews(newsData);
         
         // Extract unique sources
         const sourcesMap = new Map<string, NewsSource>();
         newsData.forEach(item => {
           if (item.source && item.source.id && !sourcesMap.has(item.source.id)) {
             sourcesMap.set(item.source.id, item.source);
           }
         });
         
         setSources(Array.from(sourcesMap.values()));
       } catch (err) {
         console.error('Error fetching news:', err);
         setError('Failed to load news. Please try again later.');
       } finally {
         setLoading(false);
       }
     };
     
     getNews();
   }, [status]);
 
   // Filter berita berdasarkan sumber
   const handleSourceChange = (source: string) => {
     setSelectedSource(source);
   };
 
   // Berita yang difilter
   const filteredNews = selectedSource === 'all' 
     ? news 
     : news.filter(item => item.source && item.source.id === selectedSource);
 
   // Tampilkan loading page jika sedang loading
   if (status === 'loading' || loading) {
     return (
       <div className={styles.pageContainer}>
         <Navbar /> {/* Add Navbar */}
         <div className={styles.container}>
           <div className={styles.loadingContainer}>
             <div className={styles.loadingSpinner}></div>
             <p>Loading news...</p>
           </div>
         </div>
       </div>
     );
   }
 
   // Tampilkan error page jika terjadi error
   if (error) {
     return (
       <div className={styles.pageContainer}>
         <Navbar /> {/* Add Navbar */}
         <div className={styles.container}>
           <div className={styles.errorContainer}>
             <h2>Error</h2>
             <p>{error}</p>
             <button onClick={() => window.location.reload()} className={styles.retryButton}>
               Try Again
             </button>
           </div>
         </div>
       </div>
     );
   }
 
   return (
     <div className={styles.pageContainer}>
       <Head>
         <title>Haris News - Your Personalized News Feed</title>
         <meta name="description" content="Access the latest news from multiple sources" />
         <link rel="icon" href="/favicon.ico" />
       </Head>
 
       <Navbar /> {/* Add Navbar */}
 
       <div className={styles.container}>
         <main className={styles.main}>
           <h1 className={styles.title}>
             Welcome to <span className={styles.highlight}>Haris News</span>
           </h1>
           
           <p className={styles.description}>
             Your personalized news feed from trusted sources
           </p>
           
           <SourceFilter 
             sources={sources} 
             selectedSource={selectedSource} 
             onSourceChange={handleSourceChange} 
           />
           
           <div className={styles.grid}>
             {filteredNews.length > 0 ? (
               filteredNews.map((item) => (
                 <NewsCard key={item.id} news={item} />
               ))
             ) : (
               <p className={styles.noNews}>No news available from this source.</p>
             )}
           </div>
         </main>
 
         <footer className={styles.footer}>
           <p>Powered by Naufal Haris Nurkhoirulloh</p>
         </footer>
       </div>
     </div>
   );
 }