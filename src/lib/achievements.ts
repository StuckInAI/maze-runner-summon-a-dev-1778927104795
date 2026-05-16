import type { Achievement } from '@/types';

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-escape', title: 'First Escape', description: 'Complete your first maze.', unlocked: false, icon: '🏁' },
  { id: 'speedrunner', title: 'Speedrunner', description: 'Escape in under 60 seconds.', unlocked: false, icon: '⚡' },
  { id: 'flawless', title: 'Flawless', description: 'Finish a maze without taking damage.', unlocked: false, icon: '💎' },
  { id: 'collector', title: 'Collector', description: 'Grab 10 loot items in a single run.', unlocked: false, icon: '🎁' },
  { id: 'nightmare', title: 'Into the Nightmare', description: 'Beat a Nightmare difficulty maze.', unlocked: false, icon: '🌑' },
  { id: 'cartographer', title: 'Cartographer', description: 'Reveal 100% of a maze map.', unlocked: false, icon: '🗺️' },
  { id: 'phantom', title: 'Phantom', description: 'Escape with a Phantom enemy nearby.', unlocked: false, icon: '👻' },
  { id: 'architect', title: 'Architect', description: 'Build a custom maze in the editor.', unlocked: false, icon: '🧱' },
];
