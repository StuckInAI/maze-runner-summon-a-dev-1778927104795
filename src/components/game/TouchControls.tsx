import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import styles from './TouchControls.module.css';

type TouchControlsProps = {
  onMove: (dir: 'n' | 'e' | 's' | 'w') => void;
};

export default function TouchControls({ onMove }: TouchControlsProps) {
  return (
    <div className={styles.pad}>
      <button className={`${styles.btn} ${styles.up}`} onClick={() => onMove('n')} aria-label="Up">
        <ArrowUp size={18} />
      </button>
      <button className={`${styles.btn} ${styles.left}`} onClick={() => onMove('w')} aria-label="Left">
        <ArrowLeft size={18} />
      </button>
      <button className={`${styles.btn} ${styles.right}`} onClick={() => onMove('e')} aria-label="Right">
        <ArrowRight size={18} />
      </button>
      <button className={`${styles.btn} ${styles.down}`} onClick={() => onMove('s')} aria-label="Down">
        <ArrowDown size={18} />
      </button>
      <div className={styles.center} />
    </div>
  );
}
