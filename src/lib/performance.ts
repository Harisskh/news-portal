// File: src/lib/performance.ts
// Library untuk mengukur metrik kinerja web

import { PerformanceMetrics } from '../types/performance';

/**
 * Kelas untuk mengukur dan memantau kinerja web
 */
class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    ttfb: 0,
    fcp: 0,
    lcp: 0,
    fid: 0,
    cls: 0
  };
  
  private observers: PerformanceObserver[] = [];
  private updateCallback: (metrics: PerformanceMetrics) => void;
  
  /**
   * Inisialisasi pemantau kinerja
   * @param updateCallback Callback untuk memperbarui nilai metrik
   */
  constructor(updateCallback: (metrics: PerformanceMetrics) => void) {
    this.updateCallback = updateCallback;
    
    // Hanya jalankan di browser
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      this.measureTTFB();
      this.measureFCP();
      this.measureLCP();
      this.measureFID();
      this.measureCLS();
      
      // Update metrics setiap 5 detik
      const interval = setInterval(() => {
        this.updateCallback({...this.metrics});
      }, 5000);
      
      // Cleanup interval
      window.addEventListener('beforeunload', () => {
        clearInterval(interval);
      });
    }
  }
  
  /**
   * Mengukur Time to First Byte (TTFB)
   */
  private measureTTFB() {
    try {
      if ('performance' in window && 'getEntriesByType' in performance) {
        const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navEntry && 'responseStart' in navEntry) {
          this.metrics.ttfb = navEntry.responseStart;
          this.updateCallback({...this.metrics});
        }
      }
    } catch (error) {
      console.warn('Error measuring TTFB:', error);
    }
  }
  
  /**
   * Mengukur First Contentful Paint (FCP)
   */
  private measureFCP() {
    try {
      const fcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          // FCP hanya terjadi sekali
          const firstEntry = entries[0];
          this.metrics.fcp = firstEntry.startTime;
          this.updateCallback({...this.metrics});
          
          // Tidak perlu lagi mengamati FCP
          fcpObserver.disconnect();
        }
      });
      
      fcpObserver.observe({ type: 'paint', buffered: true });
      this.observers.push(fcpObserver);
    } catch (error) {
      console.warn('Error measuring FCP:', error);
    }
  }
  
  /**
   * Mengukur Largest Contentful Paint (LCP)
   */
  private measureLCP() {
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          // Gunakan entry terakhir karena LCP bisa berubah-ubah
          const lastEntry = entries[entries.length - 1];
          this.metrics.lcp = lastEntry.startTime;
          this.updateCallback({...this.metrics});
        }
      });
      
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      this.observers.push(lcpObserver);
    } catch (error) {
      console.warn('Error measuring LCP:', error);
    }
  }
  
  /**
   * Mengukur First Input Delay (FID)
   */
  private measureFID() {
    try {
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          const firstInput = entries[0] as any; // Using 'any' to avoid TypeScript issues
          
          if (firstInput && 'processingStart' in firstInput && 'startTime' in firstInput) {
            this.metrics.fid = firstInput.processingStart - firstInput.startTime;
            this.updateCallback({...this.metrics});
            
            // FID hanya terjadi sekali
            fidObserver.disconnect();
          }
        }
      });
      
      fidObserver.observe({ type: 'first-input', buffered: true });
      this.observers.push(fidObserver);
    } catch (error) {
      console.warn('Error measuring FID:', error);
    }
  }
  
  /**
   * Mengukur Cumulative Layout Shift (CLS)
   */
  private measureCLS() {
    try {
      let clsValue = 0;
      let clsEntries: Array<any> = [];
      let sessionValue = 0;
      let sessionEntries: Array<any> = [];
      
      const clsObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries() as any[];
        
        entries.forEach(entry => {
          // Hanya hitung layout shifts tanpa input pengguna
          if (!entry.hadRecentInput) {
            // Mulai sesi baru jika lebih dari 1 detik sejak layout shift terakhir atau tidak ada shift sebelumnya
            const firstSessionEntry = sessionEntries.length === 0;
            
            if (firstSessionEntry || entry.startTime - sessionEntries[sessionEntries.length - 1].startTime < 1000) {
              sessionEntries.push(entry);
              sessionValue += entry.value;
            } else {
              // Mulai sesi baru dan reset
              sessionEntries = [entry];
              sessionValue = entry.value;
            }
            
            // Update jika sesi ini memiliki nilai CLS yang lebih tinggi
            if (sessionValue > clsValue) {
              clsValue = sessionValue;
              clsEntries = sessionEntries;
              
              this.metrics.cls = clsValue;
              this.updateCallback({...this.metrics});
            }
          }
        });
      });
      
      clsObserver.observe({ type: 'layout-shift', buffered: true });
      this.observers.push(clsObserver);
    } catch (error) {
      console.warn('Error measuring CLS:', error);
    }
  }
  
  /**
   * Hentikan semua observer
   */
  public disconnect() {
    this.observers.forEach(observer => observer.disconnect());
  }
}

/**
 * Inisialisasi pemantauan kinerja
 * @param updateCallback Callback untuk memperbarui nilai metrik
 * @returns Fungsi untuk membersihkan pemantauan
 */
export const initPerformanceMonitoring = (
  updateCallback: (metrics: PerformanceMetrics) => void
): (() => void) => {
  // Hanya jalankan di browser
  if (typeof window !== 'undefined') {
    const monitor = new PerformanceMonitor(updateCallback);
    
    // Return fungsi pembersihan
    return () => monitor.disconnect();
  }
  
  // Dummy function untuk server-side rendering
  return () => {};
};