import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

// Define types for our news articles
type NewsSource = 'bbc' | 'cnn' | 'reuters';

interface NewsArticle {
  id: string;
  source: NewsSource;
  title: string;
  description: string;
  publishedAt: string;
  url: string;
  urlToImage: string;
  content?: string;
}

interface HomeProps {
  articles: NewsArticle[];
}

export default function Home({ articles }: HomeProps) {
  const router = useRouter();
  const [filter, setFilter] = useState<NewsSource | 'all'>('all');
  
  // Filter articles based on selected source
  const filteredArticles = filter === 'all' 
    ? articles 
    : articles.filter(article => article.source === filter);

  // Format date to a standardized format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Haris News | Your Personalized News Feed</title>
        <meta name="description" content="Access your personalized news feed from top sources around the web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1>Haris News</h1>
        <p>Your personalized news feed from multiple sources</p>
        <div className={styles.userSection}>
          <button onClick={() => router.push('/profile')}>My Profile</button>
          <button onClick={() => router.push('/api/auth/logout')}>Sign Out</button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.filters}>
          <span>Filter by source: </span>
          <button 
            className={filter === 'all' ? styles.activeFilter : ''} 
            onClick={() => setFilter('all')}
          >
            All Sources
          </button>
          <button 
            className={filter === 'bbc' ? styles.activeFilter : ''} 
            onClick={() => setFilter('bbc')}
          >
            BBC
          </button>
          <button 
            className={filter === 'cnn' ? styles.activeFilter : ''} 
            onClick={() => setFilter('cnn')}
          >
            CNN
          </button>
          <button 
            className={filter === 'reuters' ? styles.activeFilter : ''} 
            onClick={() => setFilter('reuters')}
          >
            Reuters
          </button>
        </div>

        <div className={styles.newsGrid}>
          {filteredArticles.length > 0 ? filteredArticles.map((article) => (
            <Link 
              href={`/news/${article.id}`} 
              key={article.id}
              className={styles.newsCard}
            >
              <div className={styles.imageContainer}>
                <img 
                  src={article.urlToImage || '/placeholder-news.jpg'} 
                  alt={article.title}
                  className={styles.newsImage}
                />
                <span className={styles.sourceTag}>{article.source.toUpperCase()}</span>
              </div>
              <div className={styles.newsContent}>
                <h2>{article.title.length > 60 ? `${article.title.substring(0, 60)}...` : article.title}</h2>
                <p>{article.description.length > 120 ? `${article.description.substring(0, 120)}...` : article.description}</p>
                <div className={styles.newsFooter}>
                  <span>{formatDate(article.publishedAt)}</span>
                  <span className={styles.readMore}>Read more</span>
                </div>
              </div>
            </Link>
          )) : (
            <div className={styles.noResults}>No articles available from this source.</div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Haris News. All rights reserved.</p>
      </footer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Check if user is authenticated
  // This is just a placeholder - you'd implement actual auth check
  const isAuthenticated = true; // Replace with actual auth check
  
  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    // In a real app, you'd fetch from an actual API
    // Here's sample code to fetch from News API (you'll need an API key)
    const apiKey = process.env.NEWS_API_KEY;
    const bbcNews = await fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${apiKey}`);
    const cnnNews = await fetch(`https://newsapi.org/v2/top-headlines?sources=cnn&apiKey=${apiKey}`);
    const reutersNews = await fetch(`https://newsapi.org/v2/top-headlines?sources=reuters&apiKey=${apiKey}`);
    
    // For demo purposes, we'll use sample data
    const articles: NewsArticle[] = [
      {
        id: 'bbc-1',
        source: 'bbc',
        title: 'Global Climate Summit Reaches Historic Agreement',
        description: 'World leaders have agreed to a landmark deal to reduce carbon emissions by 50% by 2030.',
        publishedAt: '2025-05-15T08:45:00Z',
        url: 'https://www.bbc.com/news/world-europe-123456',
        urlToImage: 'https://via.placeholder.com/800x450?text=Climate+Summit',
      },
      {
        id: 'cnn-1',
        source: 'cnn',
        title: 'Tech Giants Launch Initiative to Combat Misinformation Online',
        description: 'Major technology companies announced a joint effort to limit the spread of false information on their platforms.',
        publishedAt: '2025-05-17T14:30:00Z',
        url: 'https://www.cnn.com/2025/05/17/tech/misinformation-initiative/index.html',
        urlToImage: 'https://via.placeholder.com/800x450?text=Tech+Initiative',
      },
      {
        id: 'reuters-1',
        source: 'reuters',
        title: 'Global Markets Rally as Inflation Rates Begin to Stabilize',
        description: 'Stock indices worldwide showed significant gains as new economic data suggests inflation may be coming under control.',
        publishedAt: '2025-05-18T09:15:00Z',
        url: 'https://www.reuters.com/markets/global-markets-inflation-2025-05-18/',
        urlToImage: 'https://via.placeholder.com/800x450?text=Markets+Rally',
      },
      {
        id: 'bbc-2',
        source: 'bbc',
        title: 'Breakthrough in Renewable Energy Storage Could Transform Power Grid',
        description: 'Scientists have developed a new battery technology that could make renewable energy more reliable and affordable.',
        publishedAt: '2025-05-16T11:20:00Z',
        url: 'https://www.bbc.com/news/science-environment-789012',
        urlToImage: 'https://via.placeholder.com/800x450?text=Energy+Storage',
      },
      {
        id: 'cnn-2',
        source: 'cnn',
        title: 'Major Transportation Investment Plan Announced',
        description: 'The government has unveiled a $500 billion plan to modernize transportation infrastructure across the country.',
        publishedAt: '2025-05-14T16:45:00Z',
        url: 'https://www.cnn.com/2025/05/14/politics/infrastructure-plan/index.html',
        urlToImage: 'https://via.placeholder.com/800x450?text=Infrastructure+Plan',
      },
      {
        id: 'reuters-2',
        source: 'reuters',
        title: 'Global Health Organization Reports Significant Drop in Infectious Disease Cases',
        description: 'A new report shows a 30% reduction in certain infectious diseases worldwide, attributed to improved vaccination campaigns.',
        publishedAt: '2025-05-13T13:10:00Z',
        url: 'https://www.reuters.com/health/global-disease-reduction-2025-05-13/',
        urlToImage: 'https://via.placeholder.com/800x450?text=Health+Report',
      },
      {
        id: 'bbc-3',
        source: 'bbc',
        title: 'Archaeological Discovery Reveals Ancient Trading Routes',
        description: 'Archaeologists have uncovered evidence of trade networks dating back 3,000 years, reshaping our understanding of ancient civilizations.',
        publishedAt: '2025-05-12T10:30:00Z',
        url: 'https://www.bbc.com/news/science-environment-345678',
        urlToImage: 'https://via.placeholder.com/800x450?text=Archaeological+Discovery',
      },
      {
        id: 'cnn-3',
        source: 'cnn',
        title: 'New Education Initiative Aims to Close Digital Divide',
        description: 'A coalition of tech companies and education experts has launched a program to provide technology access to underserved communities.',
        publishedAt: '2025-05-11T15:20:00Z',
        url: 'https://www.cnn.com/2025/05/11/education/digital-divide-initiative/index.html',
        urlToImage: 'https://via.placeholder.com/800x450?text=Education+Initiative',
      },
      {
        id: 'reuters-3',
        source: 'reuters',
        title: 'Space Tourism Expected to Grow Tenfold in Next Decade',
        description: 'Industry analysts predict a massive expansion of commercial space travel, with costs projected to decrease significantly.',
        publishedAt: '2025-05-10T12:45:00Z',
        url: 'https://www.reuters.com/science/space-tourism-forecast-2025-05-10/',
        urlToImage: 'https://via.placeholder.com/800x450?text=Space+Tourism',
      },
    ];

    return {
      props: {
        articles,
      },
    };
  } catch (error) {
    console.error('Error fetching news data:', error);
    
    return {
      props: {
        articles: [],
      },
    };
  }
};  