import type { MazeTheme } from '@/types';

export type ThemeStyle = {
  name: string;
  description: string;
  wall: string;
  floor: string;
  glow: string;
  player: string;
  accent: string;
  background: string;
};

export const THEMES: Record<MazeTheme, ThemeStyle> = {
  cyberpunk: {
    name: 'Cyberpunk',
    description: 'Neon-drenched alleys above a sleepless megacity.',
    wall: '#1a0f3d',
    floor: '#0a0420',
    glow: '#ff2bd6',
    player: '#00f0ff',
    accent: '#8a5cff',
    background: 'radial-gradient(circle at 30% 20%, rgba(255,43,214,0.18), transparent 60%), radial-gradient(circle at 80% 90%, rgba(0,240,255,0.18), transparent 60%)',
  },
  temple: {
    name: 'Ancient Temple',
    description: 'Crumbling stone corridors guarding forgotten gods.',
    wall: '#3a2812',
    floor: '#1a1108',
    glow: '#ffb547',
    player: '#ffd98a',
    accent: '#c08540',
    background: 'radial-gradient(circle at 50% 40%, rgba(255,181,71,0.18), transparent 60%)',
  },
  space: {
    name: 'Space Station',
    description: 'A derelict orbital ring with broken life-support.',
    wall: '#0e1a2e',
    floor: '#050a16',
    glow: '#00f0ff',
    player: '#c8ff2b',
    accent: '#3b6fff',
    background: 'radial-gradient(circle at 50% 0%, rgba(0,240,255,0.2), transparent 60%)',
  },
  neon: {
    name: 'Neon Grid',
    description: 'Pure geometric circuitry. The grid is alive.',
    wall: '#10052a',
    floor: '#06010f',
    glow: '#c8ff2b',
    player: '#ff2bd6',
    accent: '#00f0ff',
    background: 'linear-gradient(180deg, #06010f 0%, #10052a 100%)',
  },
  horror: {
    name: 'Horror Labyrinth',
    description: 'Something is breathing in the dark.',
    wall: '#1a0606',
    floor: '#070202',
    glow: '#ff3b6b',
    player: '#ffd98a',
    accent: '#7a1a1a',
    background: 'radial-gradient(circle at 50% 50%, rgba(255,59,107,0.18), transparent 70%)',
  },
};
