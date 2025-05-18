export interface NewsSource {
  id: string;
  name: string;
}

export interface NewsItem {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string | null;
  source: NewsSource;
}