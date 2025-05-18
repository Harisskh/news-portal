import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// Define response type for NewsAPI
interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: Array<{
    source: {
      id: string | null;
      name: string;
    };
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
  }>;
}

// This is a proxy API route to securely fetch news data
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  // Get the source from query parameters
  const { source } = req.query;
  
  // Validate the source
  if (!source || Array.isArray(source)) {
    return res.status(400).json({ error: 'Invalid source parameter' });
  }
  
  // Map our source names to News API sources
  const sourceMapping: Record<string, string> = {
    'bbc': 'bbc-news',
    'cnn': 'cnn',
    'reuters': 'reuters',
  };
  
  // Get the mapped source
  const apiSource = sourceMapping[source];
  
  if (!apiSource) {
    return res.status(400).json({ error: 'Unsupported news source' });
  }
  
  try {
    // Get API key from environment variables
    const apiKey = process.env.NEWS_API_KEY;
    
    if (!apiKey) {
      console.error('NEWS_API_KEY environment variable is not set');
      return res.status(500).json({ error: 'API configuration error' });
    }
    
    // Fetch news from News API
    const response = await axios.get<NewsAPIResponse>('https://newsapi.org/v2/top-headlines', {
      params: {
        sources: apiSource,
        apiKey: apiKey,
      },
    });
    
    // Transform the API response to our expected format
    const articles = response.data.articles.map((article, index) => ({
      id: `${source}-${index}`,
      source: source,
      title: article.title || 'No title available',
      description: article.description || 'No description available',
      publishedAt: article.publishedAt,
      url: article.url,
      urlToImage: article.urlToImage || 'https://via.placeholder.com/800x450?text=No+Image',
      content: article.content,
    }));
    
    return res.status(200).json({ articles });
  } catch (error) {
    console.error('Error fetching news data:', error);
    return res.status(500).json({ error: 'Failed to fetch news data' });
  }
}