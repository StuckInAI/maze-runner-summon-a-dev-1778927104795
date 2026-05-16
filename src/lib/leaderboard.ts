import type { LeaderboardEntry } from '@/types';

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, player: 'NeonGhost',   score: 28450, timeMs: 41230, mode: 'ranked',   theme: 'cyberpunk' },
  { rank: 2, player: 'VoidWalker',  score: 26120, timeMs: 47880, mode: 'escape',   theme: 'space' },
  { rank: 3, player: 'GlitchQueen', score: 24990, timeMs: 52110, mode: 'hardcore', theme: 'neon' },
  { rank: 4, player: 'PixelMonk',   score: 22340, timeMs: 58940, mode: 'puzzle',   theme: 'temple' },
  { rank: 5, player: 'NullPointer', score: 21010, timeMs: 60150, mode: 'survival', theme: 'horror' },
  { rank: 6, player: 'Synthwave',   score: 19840, timeMs: 63200, mode: 'infinite', theme: 'cyberpunk' },
  { rank: 7, player: 'HexRunner',   score: 18550, timeMs: 66400, mode: 'daily',    theme: 'neon' },
  { rank: 8, player: 'AsciiKnight', score: 17200, timeMs: 71010, mode: 'ranked',   theme: 'space' },
  { rank: 9, player: 'BinaryBard',  score: 15820, timeMs: 74330, mode: 'escape',   theme: 'temple' },
  { rank: 10, player: 'KernelPanic',score: 14110, timeMs: 78900, mode: 'hardcore', theme: 'horror' },
];
