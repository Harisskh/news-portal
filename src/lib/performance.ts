// Performance metrics monitoring utility

export interface PerformanceMetrics {
  // Time to First Byte (TTFB)
  ttfb: number;
  // First Contentful Paint (FCP)
  fcp: number;
  // Largest Contentful Paint (LCP)
  lcp: number;
  // First Input Delay (FID)
  fid: number;
  // Cumulative Layout Shift (CLS)
  cls: number;
}

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: any[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.setupObservers();
    }
  }

  private setupObservers() {
    // Measure Time to First Byte (TTFB)
    this.measureTTFB();

    // Measure First Contentful Paint (FCP)
    this.measureFCP();

    // Measure Largest Contentful Paint (LCP)
    this.measureLCP();

    // Measure First Input Delay (FID)
    this.measureFID();

    // Measure Cumulative Layout Shift (CLS)
    this.measureCLS();
  }

  private measureTTFB() {
    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navEntry) {
      this.metrics.ttfb = navEntry.responseStart;
    }
  }

  private measureFCP() {
    const paintObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          this.metrics.fcp = entry.startTime;
          paintObserver.disconnect();
        }
      }
    });

    paintObserver.observe({ type: 'paint', buffered: true });
    this.observers.push(paintObserver);
  }

  private measureLCP() {
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        this.metrics.lcp = lastEntry.startTime;
      }
    });

    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    this.observers.push(lcpObserver);

    // Stop observing LCP after the page is fully loaded
    window.addEventListener('load', () => {
      // Give some extra time for the browser to report the last LCP
      setTimeout(() => lcpObserver.disconnect(), 5000);
    });
  }

  private measureFID() {
    const fidObserver = new PerformanceObserver((entryList) => {
      const firstInput = entryList.getEntries()[0];
      if (firstInput) {
        this.metrics.fid = firstInput.processingStart - firstInput.startTime;
        fidObserver.disconnect();
      }
    });

    fidObserver.observe({ type: 'first-input', buffered: true });
    this.observers.push(fidObserver);
  }

  private measureCLS() {
    let clsValue = 0;
    let clsEntries: PerformanceEntry[] = [];

    const clsObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      
      entries.forEach((entry) => {
        // Only count layout shifts without recent user input
        if (!(entry as any).hadRecentInput) {
          const firstSessionEntry = clsEntries.length === 0;
          const entryTime = entry.startTime;
          
          // If it's the first entry or within the same session window
          if (firstSessionEntry || entryTime - clsEntries[clsEntries.length - 1].startTime < 1000) {
            clsEntries.push(entry);
          } else {
            // Start a new session
            clsEntries = [entry];
          }
          
          // Calculate the CLS value for this session
          let sessionValue = 0;
          clsEntries.forEach((sessionEntry) => {
            sessionValue += (sessionEntry as any).value;
          });
          
          if (sessionValue > clsValue) {
            clsValue = sessionValue;
            this.metrics.cls = clsValue;
          }
        }
      });
    });

    clsObserver.observe({ type: 'layout-shift', buffered: true });
    this.observers.push(clsObserver);

    // Stop observing CLS after the page is fully loaded and the user has not interacted
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        clsObserver.takeRecords();
        clsObserver.disconnect();
      }
    });
  }

  public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  public logMetricsToConsole(): void {
    console.log('Performance Metrics:', this.getMetrics());
  }

  public sendMetricsToAnalytics(): void {
    // Example implementation - would be replaced with actual analytics service
    const metrics = this.getMetrics();
    
    // Send metrics to your analytics service
    if (typeof window !== 'undefined') {
      // Here you would send to your analytics service
      console.log('Sending metrics to analytics:', metrics);
      
      // Example: sending to a hypothetical endpoint
      // fetch('/api/analytics/performance', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(metrics)
      // });
    }
  }

  public cleanup(): void {
    this.observers.forEach(observer => {
      if (observer && typeof observer.disconnect === 'function') {
        observer.disconnect();
      }
    });
    this.observers = [];
  }
}

// Create a singleton instance
let performanceMonitor: PerformanceMonitor | null = null;

export function getPerformanceMonitor(): PerformanceMonitor {
  if (typeof window !== 'undefined' && !performanceMonitor) {
    performanceMonitor = new PerformanceMonitor();
  }
  return performanceMonitor as PerformanceMonitor;
}

// Export a hook to use the performance monitor
export function usePerformanceMonitoring(): Partial<PerformanceMetrics> {
  if (typeof window === 'undefined') {
    return {};
  }
  
  const monitor = getPerformanceMonitor();
  // Log metrics after the component is mounted
  setTimeout(() => {
    monitor.logMetricsToConsole();
    monitor.sendMetricsToAnalytics();
  }, 5000);
  
  return monitor.getMetrics();
}