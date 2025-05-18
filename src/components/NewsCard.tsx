import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { NewsItem } from '../types/news';
import styles from '../styles/NewsCard.module.css';

interface NewsCardProps {
  news: NewsItem;
}

export default function NewsCard({ news }: NewsCardProps) {
  // Format the publication date
  const formattedDate = news.publishedAt 
    ? formatDistanceToNow(new Date(news.publishedAt), { addSuffix: true })
    : 'Unknown date';
  
  // Format the title (limit to a certain length)
  const formattedTitle = news.title.length > 80 
    ? `${news.title.substring(0, 80)}...` 
    : news.title;

  return (
    <Link href={`/news/${news.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        {news.urlToImage ? (
          <Image
            src={news.urlToImage}
            alt={news.title}
            width={400}
            height={225}
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder}>No image available</div>
        )}
        <div className={styles.source}>{news.source.name}</div>
      </div>
      
      <div className={styles.content}>
        <h2 className={styles.title}>{formattedTitle}</h2>
        
        <p className={styles.description}>
          {news.description && news.description.length > 120
            ? `${news.description.substring(0, 120)}...`
            : news.description || 'No description available'}
        </p>
        
        <div className={styles.meta}>
          <span className={styles.date}>{formattedDate}</span>
          <span className={styles.readMore}>Read more</span>
        </div>
      </div>
    </Link>
  );
}