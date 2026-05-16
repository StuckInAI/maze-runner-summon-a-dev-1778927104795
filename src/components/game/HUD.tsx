import { Heart, Zap, Star, Key, Footprints, Timer } from 'lucide-react';
import type { GameState } from '@/types';
import { formatTime } from '@/lib/format';
import styles from './HUD.module.css';

type HUDProps = { state: GameState };

export default function HUD({ state }: HUDProps) {
  return (
    <div className={styles.hud}>
      <Stat icon={<Heart size={14} />} label="Health" value={`${state.health}%`} color="red"
            barPct={state.health} />
      <Stat icon={<Zap size={14} />} label="Stamina" value={`${Math.round(state.stamina)}%`} color="cyan"
            barPct={state.stamina} />
      <Stat icon={<Star size={14} />} label="Score" value={state.score.toLocaleString()} color="amber" />
      <Stat icon={<Key size={14} />} label="Keys" value={String(state.keys)} color="lime" />
      <Stat icon={<Footprints size={14} />} label="Steps" value={String(state.steps)} color="violet" />
      <Stat icon={<Timer size={14} />} label="Time" value={formatTime(state.elapsedMs)} color="magenta" />
    </div>
  );
}

type StatProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: 'red' | 'cyan' | 'amber' | 'lime' | 'violet' | 'magenta';
  barPct?: number;
};

function Stat({ icon, label, value, color, barPct }: StatProps) {
  return (
    <div className={`${styles.stat} ${styles[color]}`}>
      <div className={styles.row}>
        <span className={styles.icon}>{icon}</span>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
      </div>
      {typeof barPct === 'number' && (
        <div className={styles.bar}>
          <div className={styles.fill} style={{ width: `${Math.max(0, Math.min(100, barPct))}%` }} />
        </div>
      )}
    </div>
  );
}
