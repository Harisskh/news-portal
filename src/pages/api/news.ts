// Perbaikan untuk src/pages/api/news.ts
// Definisikan interface untuk artikel dari News API

import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { NewsItem } from '../../types/news';

// Interface untuk artikel dari News API
interface NewsApiArticle {
  title?: string;
  description?: string;
  content?: string;
  url?: string;
  urlToImage?: string;
  publishedAt?: string;
  source?: {
    id?: string;
    name?: string;
  };
}

// API key harus diatur di environment variable
const NEWS_API_KEY = process.env.NEWS_API_KEY || 'YOUR_API_KEY_HERE';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Periksa metode request
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Ambil berita dari berbagai sumber
    const sources = ['bbc-news', 'cnn', 'the-verge', 'techcrunch', 'business-insider'];
    const sourceString = sources.join(',');
    
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?sources=${sourceString}&apiKey=${NEWS_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`News API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error(data.message || 'Failed to fetch news');
    }
    
    // Transform data ke format yang kita butuhkan dengan konten lengkap
    const news: NewsItem[] = data.articles.map((article: NewsApiArticle) => ({
      id: uuidv4(),
      title: article.title || 'Untitled',
      description: article.description || null,
      // Menghilangkan teks +X chars di akhir konten
      content: article.content ? article.content.replace(/\+\d+ chars$/, '') : null,
      url: article.url || '#',
      urlToImage: article.urlToImage || null,
      publishedAt: article.publishedAt || null,
      source: {
        id: article.source?.id || 'unknown',
        name: article.source?.name || 'Unknown Source'
      }
    }));
    
    return res.status(200).json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch news',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}