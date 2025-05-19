// File: src/components/PerformanceAnalyzer.tsx
// Komponen untuk menganalisis dan memberi rekomendasi kinerja

import React from 'react';
import { PerformanceMetrics } from '../types/performance';
import styles from '../styles/PerformanceAnalyzer.module.css';

interface PerformanceAnalyzerProps {
  metrics: PerformanceMetrics;
}

interface Recommendation {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

const PerformanceAnalyzer: React.FC<PerformanceAnalyzerProps> = ({ metrics }) => {
  // Fungsi untuk menganalisis metrik dan memberikan rekomendasi
  const analyzePerformance = (metrics: PerformanceMetrics): Recommendation[] => {
    const recommendations: Recommendation[] = [];
    
    // Analisis TTFB
    if (metrics.ttfb > 500) {
      recommendations.push({
        title: 'Tingkatkan Time to First Byte',
        description: metrics.ttfb > 800 
          ? 'TTFB sangat lambat. Pertimbangkan untuk menggunakan CDN, mengoptimalkan server, atau implementasikan caching di server.'
          : 'TTFB dapat ditingkatkan. Evaluasi respons server dan pertimbangkan penerapan caching.',
        priority: metrics.ttfb > 800 ? 'high' : 'medium'
      });
    }
    
    // Analisis FCP
    if (metrics.fcp > 3000) {
      recommendations.push({
        title: 'Percepat First Contentful Paint',
        description: 'Konten pertama membutuhkan waktu terlalu lama untuk ditampilkan. Optimalkan CSS kritis, preload aset penting, dan pertimbangkan lazy loading untuk resource yang tidak kritis.',
        priority: 'high'
      });
    } else if (metrics.fcp > 1800) {
      recommendations.push({
        title: 'Tingkatkan First Contentful Paint',
        description: 'FCP dapat ditingkatkan. Pertimbangkan untuk mengoptimalkan CSS dan JavaScript kritis.',
        priority: 'medium'
      });
    }
    
    // Analisis LCP
    if (metrics.lcp > 4000) {
      recommendations.push({
        title: 'Optimalkan Largest Contentful Paint',
        description: 'Konten utama membutuhkan waktu terlalu lama untuk ditampilkan. Identifikasi dan optimalkan elemen terbesar, preload gambar penting, dan implementasikan strategi loading yang efisien.',
        priority: 'high'
      });
    } else if (metrics.lcp > 2500) {
      recommendations.push({
        title: 'Tingkatkan Largest Contentful Paint',
        description: 'LCP dapat ditingkatkan. Optimalkan gambar dan pertimbangkan teknik rendering yang lebih efisien.',
        priority: 'medium'
      });
    }
    
    // Analisis FID
    if (metrics.fid > 300) {
      recommendations.push({
        title: 'Kurangi First Input Delay',
        description: 'Responsivitas terhadap input pengguna sangat lambat. Pecah tugas JavaScript yang berat, optimalkan thread utama, dan implementasikan Web Workers untuk komputasi intensif.',
        priority: 'high'
      });
    } else if (metrics.fid > 100) {
      recommendations.push({
        title: 'Tingkatkan First Input Delay',
        description: 'FID dapat ditingkatkan. Optimalkan eksekusi JavaScript dan pertimbangkan untuk menunda script yang tidak kritis.',
        priority: 'medium'
      });
    }
    
    // Analisis CLS
    if (metrics.cls > 0.25) {
      recommendations.push({
        title: 'Perbaiki Cumulative Layout Shift',
        description: 'Layout bergeser terlalu banyak saat halaman dimuat. Selalu tentukan dimensi untuk gambar dan video, hindari sisipan konten dinamis, dan gunakan teknik placeholder.',
        priority: 'high'
      });
    } else if (metrics.cls > 0.1) {
      recommendations.push({
        title: 'Kurangi Pergeseran Layout',
        description: 'CLS dapat ditingkatkan. Pastikan elemen visual memiliki dimensi yang ditentukan sebelumnya, terutama untuk gambar dan iklan.',
        priority: 'medium'
      });
    }
    
    // Tambahkan rekomendasi umum jika metrik secara keseluruhan sudah baik
    if (recommendations.length === 0) {
      recommendations.push({
        title: 'Kinerja Sudah Baik',
        description: 'Semua metrik kinerja dalam kategori baik. Pertimbangkan untuk mengimplementasikan strategi caching tambahan dan audit kinerja secara berkala untuk mempertahankan hasil ini.',
        priority: 'low'
      });
    }
    
    return recommendations;
  };
  
  const recommendations = analyzePerformance(metrics);
  
  // Hitung skor kinerja (0-100)
  const calculatePerformanceScore = (metrics: PerformanceMetrics): number => {
    // Bobot untuk setiap metrik (total 100)
    const weights = {
      lcp: 25, // Largest Contentful Paint
      fid: 25, // First Input Delay
      cls: 25, // Cumulative Layout Shift
      ttfb: 15, // Time to First Byte
      fcp: 10  // First Contentful Paint
    };
    
    // Skor untuk setiap metrik (0-100)
    const scores = {
      ttfb: metrics.ttfb <= 200 ? 100 : 
            metrics.ttfb <= 500 ? 100 - ((metrics.ttfb - 200) / 300) * 50 :
            50 - Math.min(50, ((metrics.ttfb - 500) / 500) * 50),
            
      fcp: metrics.fcp <= 1800 ? 100 :
           metrics.fcp <= 3000 ? 100 - ((metrics.fcp - 1800) / 1200) * 50 :
           50 - Math.min(50, ((metrics.fcp - 3000) / 3000) * 50),
           
      lcp: metrics.lcp <= 2500 ? 100 :
           metrics.lcp <= 4000 ? 100 - ((metrics.lcp - 2500) / 1500) * 50 :
           50 - Math.min(50, ((metrics.lcp - 4000) / 4000) * 50),
           
      fid: metrics.fid <= 100 ? 100 :
           metrics.fid <= 300 ? 100 - ((metrics.fid - 100) / 200) * 50 :
           50 - Math.min(50, ((metrics.fid - 300) / 300) * 50),
           
      cls: metrics.cls <= 0.1 ? 100 :
           metrics.cls <= 0.25 ? 100 - ((metrics.cls - 0.1) / 0.15) * 50 :
           50 - Math.min(50, ((metrics.cls - 0.25) / 0.25) * 50)
    };
    
    // Hitung skor tertimbang
    let totalScore = 0;
    let totalWeight = 0;
    
    for (const key of Object.keys(scores) as Array<keyof typeof scores>) {
      totalScore += scores[key] * weights[key];
      totalWeight += weights[key];
    }
    
    return Math.round(totalScore / totalWeight);
  };
  
  const performanceScore = calculatePerformanceScore(metrics);
  
  // Tentukan kategori skor
  let scoreCategory: 'excellent' | 'good' | 'average' | 'poor';
  if (performanceScore >= 90) {
    scoreCategory = 'excellent';
  } else if (performanceScore >= 70) {
    scoreCategory = 'good';
  } else if (performanceScore >= 50) {
    scoreCategory = 'average';
  } else {
    scoreCategory = 'poor';
  }
  
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Performance Analysis</h3>
      
      <div className={styles.scoreSection}>
        <div className={`${styles.scoreCircle} ${styles[scoreCategory]}`}>
          <span>{performanceScore}</span>
        </div>
        <div className={styles.scoreDetails}>
          <h4>Overall Performance Score</h4>
          <p>
            {scoreCategory === 'excellent' ? 'Excellent' : 
             scoreCategory === 'good' ? 'Good' : 
             scoreCategory === 'average' ? 'Needs Improvement' :
             'Poor'}
          </p>
          <p className={styles.scoreDescription}>
            {scoreCategory === 'excellent' ? 'Your website performance is excellent! Users should have a great experience.' : 
             scoreCategory === 'good' ? 'Your website performs well, but there\'s still room for improvement.' : 
             scoreCategory === 'average' ? 'Your website performance needs improvement to provide a better user experience.' :
             'Your website performance is poor and may be frustrating users. Immediate action is recommended.'}
          </p>
        </div>
      </div>
      
      <div className={styles.recommendationsSection}>
        <h4>Recommendations</h4>
        {recommendations.length > 0 ? (
          <ul className={styles.recommendationsList}>
            {recommendations.map((rec, index) => (
              <li 
                key={index} 
                className={`${styles.recommendationItem} ${styles[rec.priority]}`}
              >
                <h5>{rec.title}</h5>
                <p>{rec.description}</p>
                {rec.priority === 'high' && (
                  <span className={styles.priorityTag}>High Priority</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No recommendations at this time. Your website is performing well!</p>
        )}
      </div>
    </div>
  );
};

export default PerformanceAnalyzer;