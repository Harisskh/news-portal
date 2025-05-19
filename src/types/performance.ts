// File: src/types/performance.ts
// Interface untuk metrik performa web

export interface PerformanceMetrics {
  // First Contentful Paint dalam milidetik
  fcp: number;
  
  // Largest Contentful Paint dalam milidetik
  lcp: number;
  
  // First Input Delay dalam milidetik
  fid: number;
  
  // Cumulative Layout Shift (tidak memiliki unit)
  cls: number;
  
  // Time To First Byte dalam milidetik
  ttfb: number;
}