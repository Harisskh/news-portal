import React, { useEffect, useState } from "react";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

const NewsList: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY; // Pastikan variabel ini ada
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=id&apiKey= ${apiKey}`
      );
      const data = await response.json();
      if (data.articles) {
        setArticles(data.articles);
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-white rounded shadow p-4 hover:shadow-lg transition duration-300"
            >
              <img
                src={article.urlToImage || "/placeholder.jpg"}
                alt={article.title}
                className="w-full h-48 object-cover mb-2 rounded"
              />
              <h2 className="text-xl font-bold mb-2">{article.title}</h2>
              <p className="text-gray-600 mb-2">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                Baca Selengkapnya
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">Memuat berita...</p>
      )}
    </div>
  );
};

export default NewsList;