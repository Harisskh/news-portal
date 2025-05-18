import { NewsItem } from '../types/news';
import { v4 as uuidv4 } from 'uuid';

// API endpoints for different news sources
const NEWS_APIS = {
  newsapi: 'https://newsapi.org/v2/top-headlines?country=id&apiKey=6a60b9411be241a3bf18746df545fd41',
  guardian: 'https://content.guardianapis.com/search?api-key=a63f15db-4e27-49a4-abac-d9c4c7f17725',
  nytimes: 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=LlXbFVxUqqzQs7nuY2f2Upbyutu9oZ5C'
};

// Function to standardize news data from different sources
const standardizeNewsData = (data: any, source: string): NewsItem[] => {
  switch (source) {
    case 'newsapi':
      return data.articles.map((article: any) => ({
        id: uuidv4(),
        title: article.title,
        description: article.description,
        content: article.content,
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
        source: {
          id: 'newsapi',
          name: article.source.name || 'News API'
        }
      }));
    
    case 'guardian':
      return data.response.results.map((article: any) => ({
        id: uuidv4(),
        title: article.webTitle,
        description: article.fields?.trailText,
        content: '',
        url: article.webUrl,
        urlToImage: article.fields?.thumbnail,
        publishedAt: article.webPublicationDate,
        source: {
          id: 'guardian',
          name: 'The Guardian'
        }
      }));
    
    case 'nytimes':
      return data.results.map((article: any) => ({
        id: uuidv4(),
        title: article.title,
        description: article.abstract,
        content: '',
        url: article.url,
        urlToImage: article.multimedia?.[0]?.url,
        publishedAt: article.published_date,
        source: {
          id: 'nytimes',
          name: 'The New York Times'
        }
      }));
    
    default:
      return [];
  }
};

// For development/demo purposes, let's create mock data
const createMockNews = (): NewsItem[] => {
  const sources = [
    { id: 'bbc-news', name: 'BBC News' },
    { id: 'cnn', name: 'CNN' },
    { id: 'the-verge', name: 'The Verge' }
  ];
  
  const mockNews: NewsItem[] = [];
  
  // Create 5 news items for each source
  sources.forEach(source => {
    for (let i = 1; i <= 5; i++) {
      mockNews.push({
        id: uuidv4(),
        title: `${source.name} Headline ${i}: Lorem ipsum dolor sit amet, consectetur adipiscing elit`,
        description: `This is a sample news description from ${source.name}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam.`,
        content: `Full content of the news article from ${source.name}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nisl eros tincidunt nunc, eget aliquam nisl nisl eget nisl.`,
        url: `https://example.com/news/${source.id}/${i}`,
        urlToImage: `https://picsum.photos/id/${(i + sources.indexOf(source) * 5)}/800/450`,
        publishedAt: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
        source: {
          id: source.id,
          name: source.name
        }
      });
    }
  });
  
  return mockNews;
};

// Main function to fetch news from all sources
export const fetchNews = async (): Promise<NewsItem[]> => {
  // For now, use mock data
  // In production, you would use the API calls below
  return createMockNews();
  
  /* 
  // This is how you would fetch from real APIs
  try {
    // Fetch from multiple sources in parallel
    const [newsapiResponse, guardianResponse, nytimesResponse] = await Promise.all([
      fetch(NEWS_APIS.newsapi).then(res => res.json()),
      fetch(NEWS_APIS.guardian).then(res => res.json()),
      fetch(NEWS_APIS.nytimes).then(res => res.json())
    ]);
    
    // Standardize and combine the results
    const newsapiNews = standardizeNewsData(newsapiResponse, 'newsapi');
    const guardianNews = standardizeNewsData(guardianResponse, 'guardian');
    const nytimesNews = standardizeNewsData(nytimesResponse, 'nytimes');
    
    return [...newsapiNews, ...guardianNews, ...nytimesNews];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
  */
};