import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import NewsCard from '../components/NewsCard';
import SourceFilter from '../components/SourceFilter';
import styles from '../styles/Home.module.css';
import { NewsItem, NewsSource } from '../types/news';
import { fetchNews } from '../lib/api';

interface HomeProps {
  initialNews: NewsItem[];
  sources: NewsSource[];
}

export default function Home({ initialNews, sources }: HomeProps) {
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(false);
  
  // Filter news by source
  const handleSourceChange = async (source: string) => {
    setLoading(true);
    setSelectedSource(source);
    
    if (source === 'all') {
      setNews(initialNews);
    } else {
      const filteredNews = initialNews.filter(item => item.source.id === source);
      setNews(filteredNews);
    }
    
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Haris News - Your Personalized News Feed</title>
        <meta name="description" content="Access the latest news from multiple sources" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
        
        {loading ? (
          <div className={styles.loading}>Loading news...</div>
        ) : (
          <div className={styles.grid}>
            {news.length > 0 ? (
              news.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))
            ) : (
              <p className={styles.noNews}>No news available from this source.</p>
            )}
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <p>Powered by Naufal Haris Nurkhoirulloh</p>
      </footer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  
  // Redirect to login if not authenticated
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  
  // Fetch news from multiple sources
  const news = await fetchNews();
  
  // Extract unique sources from the news
  const sources = Array.from(
    new Set(news.map(item => JSON.stringify({ id: item.source.id, name: item.source.name })))
  ).map(item => JSON.parse(item));
  
  return {
    props: {
      initialNews: news,
      sources,
    },
  };
};