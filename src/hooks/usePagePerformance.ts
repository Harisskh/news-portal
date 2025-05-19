// File: src/hooks/usePagePerformance.ts
// React hook untuk menggunakan pemantauan kinerja

import { useState, useEffect, useCallback } from 'react';
import { PerformanceMetrics } from '../types/performance';
import { initPerformanceMonitoring } from '../lib/performance';

/**
 * Hook untuk memantau dan mendapatkan metrik kinerja halaman
 * @returns PerformanceMetrics - Object berisi metrik kinerja halaman
 */
export const usePagePerformance = (): PerformanceMetrics => {
  // Inisialisasi state dengan nilai default
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>({
    ttfb: 0,
    fcp: 0,
    lcp: 0,
    fid: 0,
    cls: 0
  });

  // Callback untuk memperbarui metrik
  // Gunakan useCallback agar fungsi tidak dibuat ulang setiap render
  const updateMetrics = useCallback((metrics: PerformanceMetrics) => {
    setPerformanceMetrics(prevMetrics => ({
      ...prevMetrics,
      ...metrics
    }));
  }, []);

  // Inisialisasi pemantauan kinerja saat komponen dimount
  useEffect(() => {
    // Hanya jalankan di browser dan bukan di mode production
    if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
      console.log('Initializing performance monitoring...');
      
      // Mulai pemantauan kinerja
      const cleanup = initPerformanceMonitoring(updateMetrics);
      
      // Bersihkan observer saat komponen unmount
      return cleanup;
    }
    
    // Fungsi pembersihan dummy untuk server-side rendering
    return () => {};
  }, [updateMetrics]);

  return performanceMetrics;
};