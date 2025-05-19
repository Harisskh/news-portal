// File: src/pages/news/[id].tsx
// Mengganti semua Next.js Image dengan tag img HTML biasa

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { format } from 'date-fns';
import { useSession, signIn } from 'next-auth/react';
import Navbar from '../../components/Navbar';
import { fetchNewsById } from '../../lib/api';
import { NewsItem } from '../../types/news';
import styles from '../../styles/NewsDetail.module.css';

export default function NewsDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Cek autentikasi
  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn();
    }
  }, [status]);

  // Fungsi untuk memuat data berita
  const loadNewsData = async (newsId: string) => {
    try {
      setLoading(true);
      setError(null);

      const newsData = await fetchNewsById(newsId);
      
      if (newsData) {
        setNews(newsData);
      } else {
        setError('News not found');
      }
    } catch (err) {
      console.error('Error loading news:', err);
      setError('Failed to load news details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Effect untuk memuat data ketika ID tersedia
  useEffect(() => {
    // Pastikan id tersedia (router.query mungkin tidak langsung tersedia karena SSR)
    if (!id) {
      return;
    }

    const newsId = Array.isArray(id) ? id[0] : id;
    
    // Muat data berita
    loadNewsData(newsId);
  }, [id]);

  // Tampilkan loading state
  if (status === 'loading' || loading) {
    return (
      <div className={styles.pageContainer}>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.loading}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading news details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Tampilkan error state
  if (error || !news) {
    return (
      <div className={styles.pageContainer}>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.error}>
            <h2>Unable to load news</h2>
            <p>{error || 'News not found'}</p>
            <Link href="/" className={styles.backLink}>
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Format tanggal
  const formattedDate = news.publishedAt 
    ? format(new Date(news.publishedAt), 'MMMM dd, yyyy • HH:mm')
    : 'Unknown date';

  // Meta description untuk SEO
  const metaDescription = news.description || 
    `Read the latest news article from ${news.source?.name || 'Haris News'} about ${news.title}`;

  return (
    <div className={styles.pageContainer}>
      <Head>
        <title>{news.title || 'News Details'} | Haris News</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={`${news.title} | Haris News`} />
        <meta property="og:description" content={metaDescription} />
        {news.urlToImage && <meta property="og:image" content={news.urlToImage} />}
      </Head>

      <Navbar />

      <div className={styles.container}>
        <main className={styles.main}>
          <Link href="/" className={styles.backLink} aria-label="Back to home page">
            ← Back to home
          </Link>

          <article className={styles.article}>
            <div className={styles.header}>
              <div className={styles.sourceTag}>{news.source?.name || 'Unknown source'}</div>
              <h1 className={styles.title}>{news.title}</h1>
              <div className={styles.meta}>
                <time className={styles.date} dateTime={news.publishedAt || ''}>
                  {formattedDate}
                </time>
              </div>
            </div>

            {news.urlToImage && (
              <div className={styles.imageContainer}>
                <img
                  src={news.urlToImage}
                  alt={news.title || 'News image'}
                  className={styles.image}
                />
              </div>
            )}

            <div className={styles.content}>
              {news.description && (
                <div className={styles.description}>
                  {news.description}
                </div>
              )}
              
              {news.content ? (
                <div className={styles.fullContent}>
                  {news.content.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              ) : (
                <div className={styles.readMore}>
                  <p>Continue reading the full article on the original source:</p>
                  <a 
                    href={news.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.sourceLink}
                    aria-label={`Read full article on ${news.source?.name || 'source website'}`}
                  >
                    Read on {news.source?.name || 'source website'} →
                  </a>
                </div>
              )}
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}