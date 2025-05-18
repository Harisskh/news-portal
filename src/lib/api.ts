/**
 * API service untuk mengambil data berita
 * lib/api.ts
 */
 import { NewsItem } from '../types/news';

 // Simpan berita dalam variabel global (ini akan hilang saat refresh browser)
 let globalNewsItems: NewsItem[] = [];
 
 /**
  * Membuat berita dummy dengan ID yang persisten (tidak berubah)
  * Ini akan digunakan jika tidak bisa mengambil data dari API
  */
 const getDummyNews = (): NewsItem[] => {
   return [
     {
       id: '1', // ID Persisten!
       title: 'NASA Perseverance Rover Makes New Discovery on Mars',
       description: 'The NASA Perseverance rover has discovered new evidence suggesting ancient microbial life might have existed on the red planet billions of years ago.',
       content: 'NASA scientists announced today that the Perseverance rover, which has been exploring Mars since February 2021, has discovered organic compounds in Jezero Crater that could indicate ancient microbial life once thrived there. The rover\'s sophisticated instruments detected complex carbon molecules preserved in rock samples that were likely deposited by an ancient river delta billions of years ago.\n\n"These findings are extremely promising," said Dr. Sarah Mitchell, lead scientist on the mission. "While we can\'t say definitively that we\'ve found evidence of ancient life, these organic signatures are exactly what we\'d expect to see if microbial life once existed on Mars."\n\nThe samples will be returned to Earth by a future mission for more detailed analysis.',
       url: 'https://example.com/nasa-mars-discovery',
       urlToImage: 'https://picsum.photos/id/1/800/450',
       publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
       source: {
         id: 'bbc-news',
         name: 'BBC News'
       }
     },
     {
       id: '2', // ID Persisten!
       title: 'Global Renewable Energy Capacity Surpasses Fossil Fuels for First Time',
       description: 'A new report shows that global renewable energy capacity has surpassed fossil fuels for the first time, marking a significant milestone in the fight against climate change.',
       content: 'According to a comprehensive report released by the International Energy Agency (IEA), global renewable energy capacity has exceeded that of fossil fuels for the first time in history. Solar and wind power installations have accelerated dramatically over the past five years, driven by falling costs and supportive government policies.\n\n"This represents a pivotal moment in the global energy transition," said IEA Executive Director Fatih Birol. "The rapid growth of renewables is reshaping the global energy landscape faster than many anticipated."\n\nThe report indicates that renewable energy sources now account for 52% of global electricity generation capacity, with solar power experiencing the most substantial growth. China, the United States, and the European Union lead in renewable energy installations.',
       url: 'https://example.com/renewable-energy-milestone',
       urlToImage: 'https://picsum.photos/id/2/800/450',
       publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
       source: {
         id: 'cnn',
         name: 'CNN'
       }
     },
     {
       id: '3', // ID Persisten!
       title: 'New Breakthrough in Quantum Computing Promises Faster Problem-Solving',
       description: 'Scientists have achieved a quantum computing breakthrough that could dramatically accelerate complex calculations and enable new applications in medicine, materials science, and artificial intelligence.',
       content: 'Researchers at MIT\'s Quantum Computing Laboratory have demonstrated a new quantum computing architecture that maintains quantum coherence for significantly longer periods than previously possible. This breakthrough, published today in the journal Science, could dramatically accelerate the development of practical quantum computers capable of solving complex problems beyond the reach of classical computers.\n\n"We\'ve essentially found a way to reduce quantum decoherence by two orders of magnitude," explained Dr. Robert Zhang, lead author of the study. "This means quantum computers based on our architecture could perform thousands more operations before errors accumulate."\n\nThe innovation involves a novel approach to error correction and a hybrid superconducting-photonic qubit design that shields quantum states from environmental interference. Industry experts suggest this breakthrough could accelerate quantum applications in drug discovery, materials science, and artificial intelligence.',
       url: 'https://example.com/quantum-computing-breakthrough',
       urlToImage: 'https://picsum.photos/id/3/800/450',
       publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
       source: {
         id: 'the-verge',
         name: 'The Verge'
       }
     },
     {
       id: '4', // ID Persisten!
       title: 'Tech Giants Announce Major Investment in Artificial Intelligence Safety Research',
       description: 'Leading technology companies have committed $1 billion to a new consortium focused on ensuring the safe development of advanced artificial intelligence systems.',
       content: 'A coalition of major technology companies including Google, Microsoft, Amazon, and OpenAI announced today a joint commitment of $1 billion to establish the Global AI Safety Institute, an independent research organization dedicated to addressing potential risks from advanced artificial intelligence systems.\n\nThe institute will focus on technical research to ensure AI systems remain safe, secure, and aligned with human values as they become increasingly powerful. It will also develop standards and benchmarks for evaluating AI safety and publish open research to benefit the broader scientific community.\n\n"As AI capabilities advance rapidly, we need to ensure these systems are developed responsibly," said Jennifer Moore, newly appointed director of the institute. "This initiative represents an unprecedented collaboration among competitors who recognize that AI safety is a pre-competitive issue that requires collective action."\n\nThe consortium plans to collaborate with academic institutions, governments, and civil society organizations to develop governance frameworks for advanced AI systems.',
       url: 'https://example.com/ai-safety-investment',
       urlToImage: 'https://picsum.photos/id/4/800/450',
       publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
       source: {
         id: 'techcrunch',
         name: 'TechCrunch'
       }
     },
     {
       id: '5', // ID Persisten!
       title: 'New Study Reveals Benefits of Four-Day Work Week on Productivity and Well-being',
       description: 'The largest trial of a four-day work week to date shows significant improvements in employee well-being and productivity, with 92% of participating companies planning to continue the practice.',
       content: 'Results from the world\'s largest four-day work week trial have been published, showing overwhelmingly positive outcomes for both employees and businesses. The six-month study involved 33 companies and over 900 employees across various industries.\n\nResearchers found that employee well-being improved dramatically, with stress levels decreasing by 38% and burnout cases dropping by 71%. Perhaps most surprisingly, business productivity remained stable or improved in 94% of the participating companies despite the reduced working hours.\n\n"These results challenge the notion that working longer hours necessarily leads to greater productivity," said Professor Helen Richardson, who led the research team. "We found that employees were more focused, more energized, and more creative when given an additional day off each week."\n\nOf the companies that participated in the trial, 92% have decided to continue with the four-day work week permanently, with many citing improved talent retention and recruitment advantages.',
       url: 'https://example.com/four-day-work-week-benefits',
       urlToImage: 'https://picsum.photos/id/5/800/450',
       publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
       source: {
         id: 'business-insider',
         name: 'Business Insider'
       }
     },
     {
       id: '6', // ID Persisten!
       title: 'Global Markets Respond to Central Bank Interest Rate Decision',
       description: 'Financial markets worldwide showed mixed reactions as the Federal Reserve announced it would hold interest rates steady while signaling potential cuts later in the year.',
       content: 'Global financial markets responded with cautious optimism today after the Federal Reserve announced it would maintain current interest rates while signaling potential cuts later this year. The decision comes amid growing evidence that inflation is cooling while employment remains robust.\n\n"We believe the current monetary policy stance is appropriate given the economic data," said Federal Reserve Chair in the post-meeting press conference. "However, we remain data-dependent and are prepared to adjust our approach if economic conditions warrant."\n\nStock markets in the United States initially rallied on the news before settling into more modest gains. European and Asian markets showed mixed reactions, with technology stocks generally outperforming other sectors. The dollar weakened slightly against major currencies, while Treasury yields declined.\n\nEconomists suggest that the Fed\'s more dovish tone indicates growing confidence that inflation is returning to target levels without significant damage to the labor market, potentially setting the stage for a "soft landing" scenario that avoids recession.',
       url: 'https://example.com/markets-central-bank-decision',
       urlToImage: 'https://picsum.photos/id/6/800/450',
       publishedAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(), // 16 hours ago
       source: {
         id: 'cnn',
         name: 'CNN'
       }
     }
   ];
 };
 
 /**
  * Mengambil semua berita
  */
 export const fetchNews = async (): Promise<NewsItem[]> => {
   try {
     // Jika sudah ada data global, gunakan itu
     if (globalNewsItems.length > 0) {
       return globalNewsItems;
     }
 
     // Coba ambil dari API jika tidak ada di global
     const response = await fetch('/api/news');
     
     if (!response.ok) {
       throw new Error(`API error: ${response.statusText}`);
     }
     
     // Jika berhasil, simpan di global untuk digunakan nanti
     const news: NewsItem[] = await response.json();
     globalNewsItems = news;
     return news;
   } catch (error) {
     console.error('Error fetching news:', error);
     
     // Jika gagal, gunakan dummy data dan simpan di global
     const dummyNews = getDummyNews();
     globalNewsItems = dummyNews;
     return dummyNews;
   }
 };
 
 /**
  * Mengambil berita berdasarkan ID
  */
 export const fetchNewsById = async (id: string): Promise<NewsItem | null> => {
   console.log(`Fetching news with ID: ${id}`); // Debugging
   
   try {
     // Jika sudah ada data global, cari di sana terlebih dahulu
     if (globalNewsItems.length > 0) {
       console.log('Looking for news in global cache...'); // Debugging
       const cachedNews = globalNewsItems.find(item => item.id === id);
       
       if (cachedNews) {
         console.log('Found news in global cache!'); // Debugging
         return cachedNews;
       }
       console.log('News not found in global cache'); // Debugging
     }
     
     // Jika tidak ada di cache, ambil semua berita dan cari
     console.log('Fetching all news to find ID...'); // Debugging
     const allNews = await fetchNews();
     
     // Cari berita dengan ID yang sesuai
     const news = allNews.find(item => item.id === id);
     console.log('News found?', news ? 'Yes' : 'No'); // Debugging
     
     // Jika tidak ditemukan di semua berita, gunakan dummy berita langsung
     if (!news) {
       console.log('News not found in API, checking dummy data...'); // Debugging
       // Coba cari di dummy data sebagai fallback
       const dummyNews = getDummyNews();
       const dummyNewsItem = dummyNews.find(item => item.id === id);
       
       if (dummyNewsItem) {
         console.log('Found news in dummy data!'); // Debugging
         return dummyNewsItem;
       }
     }
     
     return news || null;
   } catch (error) {
     console.error('Error fetching news by ID:', error);
     
     // Coba cari di dummy data sebagai fallback
     const dummyNews = getDummyNews();
     return dummyNews.find(item => item.id === id) || null;
   }
 };