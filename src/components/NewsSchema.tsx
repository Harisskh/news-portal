// Component: src/components/NewsSchema.tsx
// JSON-LD Schema untuk halaman berita

import React from 'react';
import Head from 'next/head';
import { NewsItem } from '../types/news';

interface NewsSchemaProps {
  news: NewsItem;
  baseUrl: string;
}

const NewsSchema: React.FC<NewsSchemaProps> = ({ news, baseUrl }) => {
  // Pastikan URL valid
  const articleUrl = `${baseUrl}/news/${news.id}`;
  const publisherLogo = `${baseUrl}/icons/icon-512x512.png`;
  const defaultImage = `${baseUrl}/images/default-news.jpg`;
  
  // Format tanggal sesuai ISO 8601
  const formattedDate = news.publishedAt 
    ? new Date(news.publishedAt).toISOString()
    : new Date().toISOString();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    'headline': news.title,
    'description': news.description || '',
    'image': news.urlToImage || defaultImage,
    'datePublished': formattedDate,
    'dateModified': formattedDate,
    'url': articleUrl,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': articleUrl
    },
    'author': {
      '@type': 'Organization',
      'name': news.source?.name || 'Haris News'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Haris News',
      'logo': {
        '@type': 'ImageObject',
        'url': publisherLogo,
        'width': 512,
        'height': 512
      }
    }
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
};

export default NewsSchema;