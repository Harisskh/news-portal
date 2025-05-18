import React from 'react';
import { usePagePerformance, formatMetric } from '../hooks/usePagePerformance';
import styles from '../styles/PerformanceMetrics.module.css';

export default function PerformanceMetrics() {
  const metrics = usePagePerformance();
  
  return (
    <div className={styles.metricsContainer}>
      <h3 className={styles.metricsTitle}>Performance Metrics</h3>
      <div className={styles.metricsList}>
        <div className={styles.metricItem}>
          <span className={styles.metricName}>TTFB:</span>
          <span className={styles.metricValue}>{formatMetric(metrics.ttfb)}</span>
          <span className={styles.metricDescription}>Time to First Byte</span>
        </div>
        <div className={styles.metricItem}>
          <span className={styles.metricName}>FCP:</span>
          <span className={styles.metricValue}>{formatMetric(metrics.fcp)}</span>
          <span className={styles.metricDescription}>First Contentful Paint</span>
        </div>
        <div className={styles.metricItem}>
          <span className={styles.metricName}>LCP:</span>
          <span className={styles.metricValue}>{formatMetric(metrics.lcp)}</span>
          <span className={styles.metricDescription}>Largest Contentful Paint</span>
        </div>
        <div className={styles.metricItem}>
          <span className={styles.metricName}>FID:</span>
          <span className={styles.metricValue}>{formatMetric(metrics.fid)}</span>
          <span className={styles.metricDescription}>First Input Delay</span>
        </div>
        <div className={styles.metricItem}>
          <span className={styles.metricName}>CLS:</span>
          <span className={styles.metricValue}>{formatMetric(metrics.cls, '')}</span>
          <span className={styles.metricDescription}>Cumulative Layout Shift</span>
        </div>
      </div>
    </div>
  );
}