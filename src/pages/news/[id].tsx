import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/NewsDetail.module.css';

// Define types for our news articles
interface NewsArticle {
  id: string;
  source: string;
  title: string;
  description: string;
  publishedAt: string;
  url: string;
  urlToImage: string;
  content?: string;
}

interface NewsDetailProps {
  article: NewsArticle;
  relatedArticles: NewsArticle[];
}

export default function NewsDetail({ article, relatedArticles }: NewsDetailProps) {
  const router = useRouter();
  
  // If the page is still generating via SSR, show loading
  if (router.isFallback) {
    return <div className={styles.loading}>Loading...</div>;
  }

  // Format date to a standardized format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{article.title} | Haris News</title>
        <meta name="description" content={article.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/home">
            <span className={styles.logo}>Haris News</span>
          </Link>
          <div className={styles.userSection}>
            <button onClick={() => router.push('/profile')}>My Profile</button>
            <button onClick={() => router.push('/api/auth/logout')}>Sign Out</button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.newsDetail}>
          <div className={styles.articleMeta}>
            <span className={styles.source}>{article.source.toUpperCase()}</span>
            <span className={styles.publishDate}>{formatDate(article.publishedAt)}</span>
          </div>
          
          <h1 className={styles.title}>{article.title}</h1>
          
          <div className={styles.imageContainer}>
            <img 
              src={article.urlToImage || '/placeholder-news.jpg'} 
              alt={article.title}
              className={styles.newsImage}
            />
          </div>
          
          <div className={styles.articleContent}>
            <p className={styles.description}>{article.description}</p>
            
            {article.content ? (
              <div className={styles.content}>
                {article.content.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <div className={styles.content}>
                <p>
                  This is a placeholder for the full article content. In a real application, 
                  this would contain the complete text of the news article or a summary from the API.
                </p>
                <p>
                  For full details, you can visit the original article at: 
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>
                    {article.url}
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.relatedNews}>
          <h2>Related News</h2>
          <div className={styles.relatedGrid}>
            {relatedArticles.map((relatedArticle) => (
              <Link 
                href={`/news/${relatedArticle.id}`} 
                key={relatedArticle.id}
                className={styles.relatedCard}
              >
                <div className={styles.relatedImageContainer}>
                  <img 
                    src={relatedArticle.urlToImage || '/placeholder-news.jpg'} 
                    alt={relatedArticle.title}
                    className={styles.relatedImage}
                  />
                </div>
                <div className={styles.relatedContent}>
                  <h3>{relatedArticle.title.length > 60 ? `${relatedArticle.title.substring(0, 60)}...` : relatedArticle.title}</h3>
                  <div className={styles.relatedMeta}>
                    <span>{relatedArticle.source.toUpperCase()}</span>
                    <span>{formatDate(relatedArticle.publishedAt)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Haris News. All rights reserved.</p>
      </footer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  
  // Check if user is authenticated
  const isAuthenticated = true; // Replace with actual auth check
  
  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    // In a real app, you'd fetch the specific article from your API
    // For demo purposes, we'll use sample data
    
    // This is our sample article database
    const allArticles = [
      {
        id: 'bbc-1',
        source: 'bbc',
        title: 'Global Climate Summit Reaches Historic Agreement',
        description: 'World leaders have agreed to a landmark deal to reduce carbon emissions by 50% by 2030.',
        publishedAt: '2025-05-15T08:45:00Z',
        url: 'https://www.bbc.com/news/world-europe-123456',
        urlToImage: 'https://via.placeholder.com/800x450?text=Climate+Summit',
        content: 'The Global Climate Summit has concluded with what many experts are calling the most significant international agreement on climate change since the Paris Accord.\n\nOver 190 countries have committed to reducing carbon emissions by 50% compared to 2020 levels by the year 2030, with a further target of achieving carbon neutrality by 2050.\n\nThe agreement includes provisions for financial support to developing nations, with a fund of $100 billion annually to help transition to renewable energy sources.\n\n"This represents a turning point in our collective efforts to address the climate crisis," said the UN Secretary-General. "For the first time, we have concrete commitments and accountability measures that give us a realistic path forward."',
      },
      {
        id: 'cnn-1',
        source: 'cnn',
        title: 'Tech Giants Launch Initiative to Combat Misinformation Online',
        description: 'Major technology companies announced a joint effort to limit the spread of false information on their platforms.',
        publishedAt: '2025-05-17T14:30:00Z',
        url: 'https://www.cnn.com/2025/05/17/tech/misinformation-initiative/index.html',
        urlToImage: 'https://via.placeholder.com/800x450?text=Tech+Initiative',
        content: 'Five of the world\'s largest technology companies have announced a joint initiative aimed at combating the spread of misinformation online.\n\nThe coalition will develop shared standards for identifying misleading content and coordinate efforts to limit its distribution across platforms.\n\n"Misinformation represents one of the greatest challenges to healthy public discourse," said the initiative\'s newly appointed director. "By working together, we can develop more effective approaches than any single company could achieve alone."\n\nThe program will include a shared database of identified misinformation, collaborative research on detection technologies, and coordinated policies for handling content that has been verified as false by independent fact-checkers.',
      },
      {
        id: 'reuters-1',
        source: 'reuters',
        title: 'Global Markets Rally as Inflation Rates Begin to Stabilize',
        description: 'Stock indices worldwide showed significant gains as new economic data suggests inflation may be coming under control.',
        publishedAt: '2025-05-18T09:15:00Z',
        url: 'https://www.reuters.com/markets/global-markets-inflation-2025-05-18/',
        urlToImage: 'https://via.placeholder.com/800x450?text=Markets+Rally',
        content: 'Global financial markets experienced a strong rally today as newly released economic data indicated that inflation rates are beginning to stabilize across major economies.\n\nThe S&P 500 rose 2.3%, while the FTSE 100 and Nikkei 225 saw gains of 1.8% and 2.7% respectively. The positive market reaction follows reports showing inflation growth slowing for the third consecutive month in several key markets.\n\n"We\'re seeing the first real evidence that central banks\' monetary policies are having the desired effect," said a senior economist at a major investment bank. "If this trend continues, we could see a shift toward more accommodative policies by the end of the year."\n\nBond yields also fell on the news, with the 10-year Treasury yield dropping 15 basis points to its lowest level in three months.',
      },
      {
        id: 'bbc-2',
        source: 'bbc',
        title: 'Breakthrough in Renewable Energy Storage Could Transform Power Grid',
        description: 'Scientists have developed a new battery technology that could make renewable energy more reliable and affordable.',
        publishedAt: '2025-05-16T11:20:00Z',
        url: 'https://www.bbc.com/news/science-environment-789012',
        urlToImage: 'https://via.placeholder.com/800x450?text=Energy+Storage',
        content: 'A team of researchers has announced a significant breakthrough in energy storage technology that could accelerate the transition to renewable energy sources.\n\nThe new battery design uses abundant materials and a novel electrode structure to achieve energy densities nearly triple that of current lithium-ion batteries at potentially half the cost.\n\n"The primary challenge with renewable energy has always been intermittency," explained the lead researcher. "With this technology, we can store energy when the sun is shining or the wind is blowing, and release it when it\'s needed, at a price point that makes economic sense."\n\nInitial tests show the batteries maintaining 80% capacity after 10,000 charge cycles, significantly outperforming existing solutions. Commercialization efforts are already underway, with grid-scale storage systems potentially available within three years.',
      },
      {
        id: 'cnn-2',
        source: 'cnn',
        title: 'Major Transportation Investment Plan Announced',
        description: 'The government has unveiled a $500 billion plan to modernize transportation infrastructure across the country.',
        publishedAt: '2025-05-14T16:45:00Z',
        url: 'https://www.cnn.com/2025/05/14/politics/infrastructure-plan/index.html',
        urlToImage: 'https://via.placeholder.com/800x450?text=Infrastructure+Plan',
        content: 'The administration has announced an ambitious $500 billion transportation infrastructure package aimed at modernizing the nation\'s roads, bridges, railways, and public transit systems.\n\nThe plan, which will be implemented over eight years, includes $220 billion for road and bridge repairs, $85 billion for public transit, $80 billion for railway improvements, and $115 billion for electric vehicle infrastructure and other sustainable transportation initiatives.\n\n"This represents the largest investment in American infrastructure in more than half a century," said the Transportation Secretary at today\'s announcement. "It will create millions of jobs while preparing our transportation networks for the challenges of the 21st century."\n\nThe plan will be funded through a combination of corporate tax reforms, user fees, and new bond issuances. Congressional leaders have indicated they will begin debating the proposal next month.',
      },
      {
        id: 'reuters-2',
        source: 'reuters',
        title: 'Global Health Organization Reports Significant Drop in Infectious Disease Cases',
        description: 'A new report shows a 30% reduction in certain infectious diseases worldwide, attributed to improved vaccination campaigns.',
        publishedAt: '2025-05-13T13:10:00Z',
        url: 'https://www.reuters.com/health/global-disease-reduction-2025-05-13/',
        urlToImage: 'https://via.placeholder.com/800x450?text=Health+Report',
        content: 'The World Health Organization has released a comprehensive report showing a 30% global reduction in cases of several major infectious diseases over the past five years.\n\nThe most dramatic improvements were seen in regions where targeted vaccination campaigns and public health initiatives have been implemented consistently since 2020.\n\n"This represents one of the most significant public health achievements of the decade," said the WHO Director-General. "It demonstrates what can be accomplished when scientific expertise is combined with adequate resources and international cooperation."\n\nParticularly notable was the near-elimination of several childhood diseases in regions that previously had limited vaccine access. The report also highlights improvements in disease surveillance systems that have enabled faster responses to potential outbreaks.',
      },
      {
        id: 'bbc-3',
        source: 'bbc',
        title: 'Archaeological Discovery Reveals Ancient Trading Routes',
        description: 'Archaeologists have uncovered evidence of trade networks dating back 3,000 years, reshaping our understanding of ancient civilizations.',
        publishedAt: '2025-05-12T10:30:00Z',
        url: 'https://www.bbc.com/news/science-environment-345678',
        urlToImage: 'https://via.placeholder.com/800x450?text=Archaeological+Discovery',
        content: 'A major archaeological discovery in the Mediterranean region has uncovered evidence of extensive trading networks dating back approximately 3,000 years, potentially rewriting our understanding of ancient economic systems.\n\nThe excavation revealed a previously unknown port city with artifacts originating from at least twelve distinct cultures across three continents, suggesting much more sophisticated commerce than previously believed existed during this period.\n\n"What makes this site extraordinary is not just its size, but the diversity of goods being exchanged," explained the expedition leader. "We\'re finding ceramics from North Africa alongside textiles from the Far East and metals from Central Europe, all in carefully organized warehouse structures."\n\nOf particular interest is evidence suggesting standardized weights and measures were used across these different cultures, indicating a level of economic coordination that scholars had assumed developed much later in history.',
      },
      {
        id: 'cnn-3',
        source: 'cnn',
        title: 'New Education Initiative Aims to Close Digital Divide',
        description: 'A coalition of tech companies and education experts has launched a program to provide technology access to underserved communities.',
        publishedAt: '2025-05-11T15:20:00Z',
        url: 'https://www.cnn.com/2025/05/11/education/digital-divide-initiative/index.html',
        urlToImage: 'https://via.placeholder.com/800x450?text=Education+Initiative',
        content: 'A new education initiative bringing together major technology companies and education experts aims to address the persistent digital divide affecting students in underserved communities.\n\nThe program, called "Connected Learning for All," will provide high-speed internet access, computing devices, and technical support to an estimated 5 million students over the next three years.\n\n"Despite the increasing importance of digital literacy, millions of students still lack reliable access to the technology they need for modern education," said the coalition\'s spokesperson. "This isn\'t just about devices—it\'s about ensuring every student has the opportunity to develop the skills they\'ll need in tomorrow\'s economy."\n\nBeyond hardware and connectivity, the initiative includes a curriculum development component focused on digital literacy and computing concepts, with teacher training programs scheduled to begin this summer.',
      },
      {
        id: 'reuters-3',
        source: 'reuters',
        title: 'Space Tourism Expected to Grow Tenfold in Next Decade',
        description: 'Industry analysts predict a massive expansion of commercial space travel, with costs projected to decrease significantly.',
        publishedAt: '2025-05-10T12:45:00Z',
        url: 'https://www.reuters.com/science/space-tourism-forecast-2025-05-10/',
        urlToImage: 'https://via.placeholder.com/800x450?text=Space+Tourism',
        content: 'A comprehensive market analysis released today predicts that the space tourism industry will grow by more than ten times its current size over the next decade, with annual revenues potentially reaching $20 billion by 2035.\n\nThe report cites rapidly decreasing launch costs, new vehicle designs, and increasing competition among private space companies as key factors driving this expansion.\n\n"We\'re at an inflection point similar to what commercial aviation experienced in the 1950s," explained an aerospace industry analyst. "As operations scale up and technology matures, we\'re seeing dramatic reductions in per-passenger costs that will make space tourism accessible to a much broader market."\n\nThe analysis projects that by 2030, a suborbital space experience could cost approximately $50,000, down from current prices of $250,000 or more, with further reductions expected as operations continue to scale.',
      },
    ];

    // Find the requested article
    const article = allArticles.find(a => a.id === id);

    if (!article) {
      return {
        notFound: true,
      };
    }

    // Get related articles (same source, excluding current article)
    const relatedArticles = allArticles
      .filter(a => a.source === article.source && a.id !== article.id)
      .slice(0, 3);

    return {
      props: {
        article,
        relatedArticles,
      },
    };
  } catch (error) {
    console.error('Error fetching article data:', error);
    
    return {
      notFound: true,
    };
  }
};