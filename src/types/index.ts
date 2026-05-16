export type Cell = {
  x: number;
  y: number;
  walls: { n: boolean; e: boolean; s: boolean; w: boolean };
  visited: boolean;
  type: CellType;
};

export type CellType =
  | 'empty'
  | 'start'
  | 'exit'
  | 'trap'
  | 'loot'
  | 'portal'
  | 'key'
  | 'gate'
  | 'secret';

export type MazeAlgorithm = 'backtracking' | 'prim' | 'kruskal' | 'cellular';
export type MazeTheme = 'cyberpunk' | 'temple' | 'space' | 'neon' | 'horror';
export type Difficulty = 'easy' | 'normal' | 'hard' | 'nightmare';
export type GameMode =
  | 'survival'
  | 'escape'
  | 'hardcore'
  | 'puzzle'
  | 'infinite'
  | 'daily'
  | 'ranked';

export type Position = { x: number; y: number };

export type Enemy = {
  id: string;
  position: Position;
  personality: 'hunter' | 'wanderer' | 'guardian' | 'phantom';
  alert: boolean;
};

export type Maze = {
  width: number;
  height: number;
  cells: Cell[][];
  start: Position;
  exit: Position;
  algorithm: MazeAlgorithm;
  theme: MazeTheme;
  seed: number;
};

export type GameState = {
  status: 'idle' | 'playing' | 'won' | 'lost' | 'paused';
  player: Position;
  health: number;
  stamina: number;
  score: number;
  keys: number;
  steps: number;
  startTime: number;
  elapsedMs: number;
  enemies: Enemy[];
  visible: boolean[][];
  collected: string[];
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: string;
};

export type LeaderboardEntry = {
  rank: number;
  player: string;
  score: number;
  timeMs: number;
  mode: GameMode;
  theme: MazeTheme;
};
