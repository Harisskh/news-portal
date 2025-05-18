// pages/api/news.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { NewsItem } from '../../types/news';

// API key harus diatur di environment variable
const NEWS_API_KEY = process.env.NEWS_API_KEY || '6a60b9411be241a3bf18746df545fd41';

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
    
    // Tambahkan parameter untuk mendapatkan konten berita lengkap jika tersedia
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
    const news: NewsItem[] = data.articles.map((article: any) => {
      // Proses konten berita untuk menghilangkan teks pemotongan jika ada
      let content = article.content || null;
      if (content) {
        // Menghilangkan teks +X chars di akhir konten
        content = content.replace(/\+\d+ chars$/, '');
      }

      // Proses deskripsi untuk menghilangkan teks pemotongan jika ada
      let description = article.description || null;
      if (description) {
        // Menghilangkan teks +X chars di akhir deskripsi
        description = description.replace(/\+\d+ chars$/, '');
      }

      return {
        id: uuidv4(), // Generate unique ID
        title: article.title || 'Untitled',
        description: description,
        content: content,
        url: article.url || '#',
        urlToImage: article.urlToImage || null,
        publishedAt: article.publishedAt || null,
        source: {
          id: article.source?.id || 'unknown',
          name: article.source?.name || 'Unknown Source'
        }
      };
    });
    
    return res.status(200).json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch news',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}