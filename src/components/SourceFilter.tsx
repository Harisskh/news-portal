import { NewsSource } from '../types/news';
import styles from '../styles/SourceFilter.module.css';

interface SourceFilterProps {
  sources: NewsSource[];
  selectedSource: string;
  onSourceChange: (source: string) => void;
}

export default function SourceFilter({ 
  sources, 
  selectedSource, 
  onSourceChange 
}: SourceFilterProps) {
  return (
    <div className={styles.filterContainer}>
      <h3 className={styles.filterTitle}>News Sources</h3>
      
      <div className={styles.sourceList}>
        <button
          className={`${styles.sourceButton} ${selectedSource === 'all' ? styles.active : ''}`}
          onClick={() => onSourceChange('all')}
        >
          All Sources
        </button>
        
        {sources.map((source) => (
          <button
            key={source.id}
            className={`${styles.sourceButton} ${selectedSource === source.id ? styles.active : ''}`}
            onClick={() => onSourceChange(source.id)}
          >
            {source.name}
          </button>
        ))}
      </div>
    </div>
  );
}