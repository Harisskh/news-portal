// File: src/components/PerformanceMetrics.tsx
// Komponen untuk menampilkan metrik kinerja

import React from 'react';
import { PerformanceMetrics as Metrics } from '../types/performance';
import styles from '../styles/PerformanceMetrics.module.css';

interface PerformanceMetricsProps {
  metrics: Metrics;
  showDetails?: boolean;
}

/**
 * Fungsi untuk menentukan kategori kinerja (baik, sedang, buruk)
 * Berdasarkan standar Google Web Vitals
 */
const getMetricCategory = (
  metricName: keyof Metrics, 
  value: number
): 'good' | 'needs-improvement' | 'poor' => {
  switch (metricName) {
    case 'lcp':
      return value <= 2500 
        ? 'good' 
        : value <= 4000 
          ? 'needs-improvement' 
          : 'poor';
    case 'fid':
      return value <= 100 
        ? 'good' 
        : value <= 300 
          ? 'needs-improvement' 
          : 'poor';
    case 'cls':
      return value <= 0.1 
        ? 'good' 
        : value <= 0.25 
          ? 'needs-improvement' 
          : 'poor';
    case 'ttfb':
      return value <= 200 
        ? 'good' 
        : value <= 500 
          ? 'needs-improvement' 
          : 'poor';
    case 'fcp':
      return value <= 1800 
        ? 'good' 
        : value <= 3000 
          ? 'needs-improvement' 
          : 'poor';
    default:
      return 'needs-improvement';
  }
};

/**
 * Fungsi untuk format metrik yang lebih mudah dibaca
 */
const formatMetricValue = (metricName: keyof Metrics, value: number): string => {
  if (metricName === 'cls') {
    return value.toFixed(3);
  }
  
  return `${value.toFixed(0)} ms`;
};

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ 
  metrics, 
  showDetails = false 
}) => {
  // Label untuk metrik
  const metricLabels: Record<keyof Metrics, string> = {
    ttfb: 'Time to First Byte',
    fcp: 'First Contentful Paint',
    lcp: 'Largest Contentful Paint',
    fid: 'First Input Delay',
    cls: 'Cumulative Layout Shift'
  };
  
  // Deskripsi untuk metrik
  const metricDescriptions: Record<keyof Metrics, string> = {
    ttfb: 'Waktu yang dibutuhkan untuk mendapatkan byte pertama dari server',
    fcp: 'Waktu yang dibutuhkan hingga konten pertama (teks, gambar, dsb) ditampilkan',
    lcp: 'Waktu yang dibutuhkan hingga konten terbesar ditampilkan',
    fid: 'Waktu delay untuk merespons interaksi pengguna pertama',
    cls: 'Mengukur pergeseran layout visual selama halaman dimuat'
  };
  
  // Menampilkan semua metrik
  const metricKeys = Object.keys(metrics) as Array<keyof Metrics>;
  
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Performance Metrics</h3>
      
      <div className={styles.metricsGrid}>
        {metricKeys.map(key => {
          const value = metrics[key];
          const category = getMetricCategory(key, value);
          
          return (
            <div 
              key={key} 
              className={`${styles.metricCard} ${styles[category]}`}
              title={metricDescriptions[key]}
            >
              <div className={styles.metricHeader}>
                <span className={styles.metricName}>{metricLabels[key]}</span>
                <span className={styles.metricValue}>
                  {formatMetricValue(key, value)}
                </span>
              </div>
              
              {showDetails && (
                <div className={styles.metricDescription}>
                  <p>{metricDescriptions[key]}</p>
                  <div className={styles.categoryIndicator}>
                    <div className={`${styles.indicator} ${styles[category]}`}></div>
                    <span>
                      {category === 'good' ? 'Baik' : 
                       category === 'needs-improvement' ? 'Perlu Peningkatan' : 
                       'Buruk'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PerformanceMetrics;