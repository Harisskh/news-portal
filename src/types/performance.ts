// File: src/types/performance.ts
// Tipe untuk metrik performa

export interface PerformanceMetrics {
  // Time to First Byte (waktu dari permintaan hingga byte pertama diterima)
  ttfb: number;
  
  // First Contentful Paint (waktu hingga konten pertama ditampilkan)
  fcp: number;
  
  // Largest Contentful Paint (waktu hingga elemen konten terbesar ditampilkan)
  lcp: number;
  
  // First Input Delay (delay respons terhadap interaksi pengguna pertama)
  fid: number;
  
  // Cumulative Layout Shift (pergeseran layout selama halaman dimuat)
  cls: number;
}