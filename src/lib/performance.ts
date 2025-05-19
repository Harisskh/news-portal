// Perbaikan untuk src/lib/performance.ts
// Implementasi initPerformanceMonitoring yang diimpor oleh usePagePerformance

import { PerformanceMetrics } from '../types/performance';

// Interface untuk PerformanceObserver entries
interface CustomPerformanceEntry {
  startTime: number;
  processingStart?: number;
  hadRecentInput?: boolean;
  // tambahkan properti lain yang dibutuhkan
}

// Interface untuk EntryList
interface EntryListType {
  getEntries: () => CustomPerformanceEntry[];
}

// PerformanceObserver interface
interface CustomPerformanceObserver {
  observe: (options: { type: string, buffered?: boolean }) => void;
  disconnect: () => void;
}

// Kelas untuk monitoring performa
class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    fcp: 0,
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0
  };
  
  private observers: CustomPerformanceObserver[] = [];
  private updateCallback: (metrics: PerformanceMetrics) => void;
  
  constructor(updateCallback: (metrics: PerformanceMetrics) => void) {
    this.updateCallback = updateCallback;
    this.measureTTFB();
    this.measureFCP();
    this.measureLCP();
    this.measureFID();
    this.measureCLS();
  }
  
  // Mengukur Time to First Byte
  private measureTTFB() {
    if (performance && 'getEntriesByType' in performance) {
      const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navEntry) {
        this.metrics.ttfb = navEntry.responseStart;
        this.updateCallback(this.metrics);
      }
    }
  }
  
  // Mengukur First Contentful Paint
  private measureFCP() {
    try {
      // @ts-ignore - Cek apakah PerformanceObserver tersedia di browser
      if (typeof PerformanceObserver !== 'undefined') {
        const fcpObserver = new PerformanceObserver((entryList: EntryListType) => {
          const entries = entryList.getEntries();
          if (entries.length > 0) {
            const firstEntry = entries[0];
            this.metrics.fcp = firstEntry.startTime;
            this.updateCallback(this.metrics);
            fcpObserver.disconnect();
          }
        }) as unknown as CustomPerformanceObserver;
        
        fcpObserver.observe({ type: 'paint', buffered: true });
        this.observers.push(fcpObserver);
      }
    } catch (error) {
      console.error('Error measuring FCP:', error);
    }
  }
  
  // Mengukur Largest Contentful Paint
  private measureLCP() {
    try {
      // @ts-ignore - Cek apakah PerformanceObserver tersedia di browser
      if (typeof PerformanceObserver !== 'undefined') {
        const lcpObserver = new PerformanceObserver((entryList: EntryListType) => {
          const entries = entryList.getEntries();
          if (entries.length > 0) {
            // Gunakan entry terakhir karena LCP dapat berubah saat halaman memuat
            const lastEntry = entries[entries.length - 1];
            this.metrics.lcp = lastEntry.startTime;
            this.updateCallback(this.metrics);
          }
        }) as unknown as CustomPerformanceObserver;
        
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
        this.observers.push(lcpObserver);
      }
    } catch (error) {
      console.error('Error measuring LCP:', error);
    }
  }
  
  // Mengukur First Input Delay
  private measureFID() {
    try {
      // @ts-ignore - Cek apakah PerformanceObserver tersedia di browser
      if (typeof PerformanceObserver !== 'undefined') {
        const fidObserver = new PerformanceObserver((entryList: EntryListType) => {
          const entries = entryList.getEntries();
          if (entries.length > 0) {
            const firstInput = entries[0] as CustomPerformanceEntry;
            
            // Type assertion dan optional chaining untuk menghindari error
            if (firstInput && firstInput.processingStart && firstInput.startTime) {
              this.metrics.fid = firstInput.processingStart - firstInput.startTime;
              this.updateCallback(this.metrics);
              fidObserver.disconnect();
            }
          }
        }) as unknown as CustomPerformanceObserver;
        
        fidObserver.observe({ type: 'first-input', buffered: true });
        this.observers.push(fidObserver);
      }
    } catch (error) {
      console.error('Error measuring FID:', error);
    }
  }
  
  // Mengukur Cumulative Layout Shift
  private measureCLS() {
    try {
      // @ts-ignore - Cek apakah PerformanceObserver tersedia di browser
      if (typeof PerformanceObserver !== 'undefined') {
        let clsValue = 0;
        let clsEntries: CustomPerformanceEntry[] = [];
        
        const clsObserver = new PerformanceObserver((entryList: EntryListType) => {
          const entries = entryList.getEntries() as CustomPerformanceEntry[];
          
          entries.forEach(entry => {
            // Hanya hitung layout shifts tanpa input pengguna
            if (!entry.hadRecentInput) {
              const firstSessionEntry = clsEntries.length === 0;
              const entryTime = entry.startTime;
              
              // Jika ini entry pertama atau dalam jendela sesi yang sama
              if (firstSessionEntry || (entryTime - clsEntries[clsEntries.length - 1].startTime < 1000)) {
                clsEntries.push(entry);
              } else {
                // Mulai sesi baru
                clsEntries = [entry];
              }
              
              // Kalkluasi CLS
              let sessionValue = 0;
              // @ts-ignore - Layout shift value
              clsEntries.forEach((sessionEntry) => { sessionValue += sessionEntry.value || 0; });
              
              if (sessionValue > clsValue) {
                clsValue = sessionValue;
                this.metrics.cls = clsValue;
                this.updateCallback(this.metrics);
              }
            }
          });
        }) as unknown as CustomPerformanceObserver;
        
        clsObserver.observe({ type: 'layout-shift', buffered: true });
        this.observers.push(clsObserver);
      }
    } catch (error) {
      console.error('Error measuring CLS:', error);
    }
  }
  
  // Membersihkan observers saat komponen unmount
  public disconnect() {
    this.observers.forEach(observer => observer.disconnect());
  }
}

// Fungsi yang digunakan oleh hook usePagePerformance
export const initPerformanceMonitoring = (updateCallback: (metrics: PerformanceMetrics) => void) => {
  // Hanya jalankan di browser
  if (typeof window !== 'undefined') {
    const monitor = new PerformanceMonitor(updateCallback);
    
    // Return cleanup function
    return () => monitor.disconnect();
  }
  
  // Return dummy cleanup di server
  return () => {};
};