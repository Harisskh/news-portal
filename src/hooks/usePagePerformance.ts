import { useEffect, useState } from 'react';
import { PerformanceMetrics, usePerformanceMonitoring } from '../lib/performance';

export function usePagePerformance() {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});
  const performanceMetrics = usePerformanceMonitoring();
  
  useEffect(() => {
    // Get initial metrics
    setMetrics(performanceMetrics);
    
    // Set up a timer to periodically update metrics as they come in
    const intervalId = setInterval(() => {
      setMetrics(usePerformanceMonitoring());
    }, 1000);
    
    // Clean up interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);
  
  return metrics;
}

export function formatMetric(value: number | undefined, unit: string = 'ms'): string {
  if (value === undefined) return 'Measuring...';
  return `${value.toFixed(2)} ${unit}`;
}