/**
 * Komponen NewsCard untuk menampilkan preview berita
 * components/NewsCard.tsx
 */
 import React from 'react';
 import Link from 'next/link';
 import { formatDistanceToNow } from 'date-fns';
 import { NewsItem } from '../types/news';
 import styles from '../styles/NewsCard.module.css';
 
 interface NewsCardProps {
   news: NewsItem;
 }
 
 export default function NewsCard({ news }: NewsCardProps) {
   // Pastikan news memiliki ID
   if (!news || !news.id) {
     console.error('News item missing ID:', news);
     return null;
   }
 
   // Format tanggal publikasi 
   const formattedDate = news.publishedAt 
     ? formatDistanceToNow(new Date(news.publishedAt), { addSuffix: true })
     : 'Unknown date';
   
   // Format judul (batasi panjang)
   const formattedTitle = news.title && news.title.length > 80 
     ? `${news.title.substring(0, 80)}...` 
     : news.title || 'Untitled';
 
   // Format deskripsi (batasi panjang)
   const formattedDescription = news.description && news.description.length > 120
     ? `${news.description.substring(0, 120)}...`
     : news.description || 'No description available';
 
   return (
     <div className={styles.card}>
       <Link href={`/news/${news.id}`} legacyBehavior>
         <a className={styles.cardLink}>
           <div className={styles.imageContainer}>
             {news.urlToImage ? (
               <img
                 src={news.urlToImage}
                 alt={news.title || 'News image'}
                 className={styles.image}
               />
             ) : (
               <div className={styles.placeholder}>No image available</div>
             )}
             <div className={styles.source}>{news.source?.name || 'Unknown source'}</div>
           </div>
           
           <div className={styles.content}>
             <h2 className={styles.title}>{formattedTitle}</h2>
             
             <p className={styles.description}>
               {formattedDescription}
             </p>
             
             <div className={styles.meta}>
               <span className={styles.date}>{formattedDate}</span>
               <span className={styles.readMore}>Read more</span>
             </div>
           </div>
         </a>
       </Link>
     </div>
   );
 }