import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { fetchNews } from '../../lib/api';
import { NewsItem } from '../../types/news';
import styles from '../../styles/NewsDetail.module.css';

interface NewsDetailProps {
  news: NewsItem;
}

export default function NewsDetail({ news }: NewsDetailProps) {
  if (!news) {
    return (
      <div className={styles.container}>
        <h1>News not found</h1>
        <Link href="/" className={styles.backLink}>
          ← Back to home
        </Link>
      </div>
    );
  }

  const formattedDate = news.publishedAt 
    ? format(new Date(news.publishedAt), 'MMMM dd, yyyy • HH:mm')
    : 'Unknown date';

  return (
    <div className={styles.container}>
      <Head>
        <title>{news.title} | Haris News</title>
        <meta name="description" content={news.description || 'News article from Haris News'} />
      </Head>

      <main className={styles.main}>
        <Link href="/" className={styles.backLink}>
          ← Back to home
        </Link>

        <article className={styles.article}>
          <div className={styles.header}>
            <h1 className={styles.title}>{news.title}</h1>
            
            <div className={styles.meta}>
              <span className={styles.source}>{news.source.name}</span>
              <span className={styles.date}>{formattedDate}</span>
            </div>
          </div>

          {news.urlToImage && (
            <div className={styles.imageContainer}>
              <Image
                src={news.urlToImage}
                alt={news.title}
                width={800}
                height={450}
                className={styles.image}
              />
            </div>
          )}

          <div className={styles.content}>
            {news.description && (
              <p className={styles.description}>{news.description}</p>
            )}
            
            {news.content ? (
              <div className={styles.fullContent}>{news.content}</div>
            ) : (
              <div className={styles.readMore}>
                <p>Continue reading the full article on the original source:</p>
                <a 
                  href={news.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.sourceLink}
                >
                  Read on {news.source.name} →
                </a>
              </div>
            )}
          </div>
        </article>
      </main>
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
  
  const { id } = context.params as { id: string };
  
  // Fetch all news
  const allNews = await fetchNews();
  
  // Find the requested news item
  const news = allNews.find(item => item.id === id);
  
  if (!news) {
    return {
      notFound: true,
    };
  }
  
  return {
    props: {
      news,
    },
  };
};