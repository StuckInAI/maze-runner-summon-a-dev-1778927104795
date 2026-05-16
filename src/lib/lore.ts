import type { MazeTheme } from '@/types';

const LORE: Record<MazeTheme, string[]> = {
  cyberpunk: [
    'The Grid hums beneath the city. They say its corridors rearrange themselves at night.',
    'A rogue AI has carved an impossible labyrinth from forgotten subway tunnels.',
    'The neon never dies here — only the runners do.',
  ],
  temple: [
    'Long before the first king, the priests sealed something inside these walls.',
    'Glyphs on the stone shift when you blink. Do not blink.',
    'The torchlight will fail. The maze knows your name.',
  ],
  space: [
    'Sector-7 went silent forty cycles ago. The doors still open for those who knock.',
    'Gravity flickers. The station dreams of being a labyrinth.',
    'You are not the first soul to wake up in this airlock.',
  ],
  neon: [
    'The Grid is a thought, and you are its memory.',
    'Every corridor is a circuit. Every step closes a gate somewhere else.',
    'The architecture is the algorithm. The algorithm is you.',
  ],
  horror: [
    'It is not a maze. It is a stomach.',
    'The walls weep when no one is watching.',
    'You hear footsteps. They match yours, then they do not.',
  ],
};

export function getLore(theme: MazeTheme, seed: number): string {
  const lines = LORE[theme];
  return lines[seed % lines.length];
}

const HINTS = [
  'Hug a wall. The maze rewards patience.',
  'Listen to the silence — traps tick before they bite.',
  'Portals are never one-way. Find the second mouth.',
  'Loot rooms always have two exits. Find both before you grab.',
  'When in doubt, retrace. The maze remembers what you forgot.',
];

export function getHint(seed: number): string {
  return HINTS[seed % HINTS.length];
}
