import type { GameState, Maze } from '@/types';
import { THEMES } from '@/lib/themes';
import styles from './Minimap.module.css';

type MinimapProps = {
  maze: Maze;
  state: GameState;
};

export default function Minimap({ maze, state }: MinimapProps) {
  const theme = THEMES[maze.theme];
  const SIZE = 4;
  const W = maze.width * SIZE;
  const H = maze.height * SIZE;
  let revealed = 0;
  for (let y = 0; y < maze.height; y++)
    for (let x = 0; x < maze.width; x++)
      if (state.visible[y]?.[x]) revealed++;
  const pct = Math.round((revealed / (maze.width * maze.height)) * 100);
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span>Minimap</span>
        <span className={styles.pct}>{pct}% mapped</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="auto" className={styles.svg}>
        <rect x={0} y={0} width={W} height={H} fill={theme.floor} />
        {maze.cells.flat().map((c) => {
          if (!state.visible[c.y]?.[c.x]) return null;
          let fill = theme.wall;
          if (c.type === 'exit') fill = theme.glow;
          else if (c.type === 'start') fill = theme.player;
          else if (c.type === 'trap') fill = '#ff3b6b';
          else if (c.type === 'loot') fill = '#ffb547';
          else if (c.type === 'key') fill = '#c8ff2b';
          else if (c.type === 'portal') fill = '#00f0ff';
          else if (c.type === 'secret') fill = '#8a5cff';
          else fill = 'rgba(255,255,255,0.18)';
          return <rect key={`${c.x}-${c.y}`} x={c.x * SIZE} y={c.y * SIZE} width={SIZE} height={SIZE} fill={fill} />;
        })}
        <rect
          x={state.player.x * SIZE}
          y={state.player.y * SIZE}
          width={SIZE}
          height={SIZE}
          fill={theme.player}
        />
      </svg>
    </div>
  );
}
