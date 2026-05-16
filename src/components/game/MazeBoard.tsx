import type { GameState, Maze } from '@/types';
import { THEMES } from '@/lib/themes';
import styles from './MazeBoard.module.css';

type MazeBoardProps = {
  maze: Maze;
  state: GameState;
  fogEnabled: boolean;
};

export default function MazeBoard({ maze, state, fogEnabled }: MazeBoardProps) {
  const theme = THEMES[maze.theme];
  const CELL = 28;
  const W = maze.width * CELL;
  const H = maze.height * CELL;

  return (
    <div
      className={styles.boardWrap}
      style={{ background: theme.background }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        className={styles.svg}
      >
        <defs>
          <radialGradient id="playerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={theme.player} stopOpacity="1" />
            <stop offset="100%" stopColor={theme.player} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="exitGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={theme.glow} stopOpacity="1" />
            <stop offset="100%" stopColor={theme.glow} stopOpacity="0" />
          </radialGradient>
          <filter id="neonBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>

        {/* floor */}
        <rect x={0} y={0} width={W} height={H} fill={theme.floor} />

        {/* cells */}
        {maze.cells.flat().map((cell) => {
          const cx = cell.x * CELL;
          const cy = cell.y * CELL;
          const visible = !fogEnabled || state.visible[cell.y]?.[cell.x];
          return (
            <g key={`${cell.x}-${cell.y}`} opacity={visible ? 1 : 0.08}>
              {/* features */}
              {cell.type === 'exit' && (
                <circle cx={cx + CELL / 2} cy={cy + CELL / 2} r={CELL * 0.55} fill="url(#exitGlow)" />
              )}
              {cell.type === 'trap' && visible && (
                <rect x={cx + 6} y={cy + 6} width={CELL - 12} height={CELL - 12} fill="none"
                  stroke={'#ff3b6b'} strokeWidth={1.2} opacity={0.85} />
              )}
              {cell.type === 'loot' && visible && (
                <circle cx={cx + CELL / 2} cy={cy + CELL / 2} r={4} fill={'#ffb547'} />
              )}
              {cell.type === 'key' && visible && (
                <circle cx={cx + CELL / 2} cy={cy + CELL / 2} r={3.5} fill={'#c8ff2b'} />
              )}
              {cell.type === 'portal' && visible && (
                <circle cx={cx + CELL / 2} cy={cy + CELL / 2} r={5} fill="none"
                  stroke={'#00f0ff'} strokeWidth={1.2} opacity={0.9} />
              )}
              {cell.type === 'secret' && visible && (
                <circle cx={cx + CELL / 2} cy={cy + CELL / 2} r={3} fill={'#8a5cff'} opacity={0.8} />
              )}

              {/* walls */}
              {cell.walls.n && (
                <line x1={cx} y1={cy} x2={cx + CELL} y2={cy}
                  stroke={theme.wall} strokeWidth={2} />
              )}
              {cell.walls.w && (
                <line x1={cx} y1={cy} x2={cx} y2={cy + CELL}
                  stroke={theme.wall} strokeWidth={2} />
              )}
              {cell.y === maze.height - 1 && cell.walls.s && (
                <line x1={cx} y1={cy + CELL} x2={cx + CELL} y2={cy + CELL}
                  stroke={theme.wall} strokeWidth={2} />
              )}
              {cell.x === maze.width - 1 && cell.walls.e && (
                <line x1={cx + CELL} y1={cy} x2={cx + CELL} y2={cy + CELL}
                  stroke={theme.wall} strokeWidth={2} />
              )}
            </g>
          );
        })}

        {/* enemies */}
        {state.enemies.map((e) => {
          const cx = e.position.x * CELL + CELL / 2;
          const cy = e.position.y * CELL + CELL / 2;
          const visible = !fogEnabled || state.visible[e.position.y]?.[e.position.x];
          if (!visible) return null;
          return (
            <g key={e.id}>
              <circle cx={cx} cy={cy} r={CELL * 0.32} fill="none"
                stroke={e.alert ? '#ff3b6b' : '#ff2bd6'}
                strokeWidth={1.5} opacity={0.85} />
              <circle cx={cx} cy={cy} r={3} fill={e.alert ? '#ff3b6b' : '#ff2bd6'} />
            </g>
          );
        })}

        {/* player */}
        <g>
          <circle
            cx={state.player.x * CELL + CELL / 2}
            cy={state.player.y * CELL + CELL / 2}
            r={CELL * 0.8}
            fill="url(#playerGlow)"
            opacity={0.55}
            filter="url(#neonBlur)"
          />
          <circle
            cx={state.player.x * CELL + CELL / 2}
            cy={state.player.y * CELL + CELL / 2}
            r={CELL * 0.28}
            fill={theme.player}
          />
        </g>
      </svg>

      <div className={styles.scanline} />
    </div>
  );
}
