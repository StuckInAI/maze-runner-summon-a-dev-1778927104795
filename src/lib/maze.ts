import type { Cell, Maze, MazeAlgorithm, MazeTheme, Position } from '@/types';
import { createRng, randInt } from './rng';

function makeGrid(width: number, height: number): Cell[][] {
  const grid: Cell[][] = [];
  for (let y = 0; y < height; y++) {
    const row: Cell[] = [];
    for (let x = 0; x < width; x++) {
      row.push({
        x, y,
        walls: { n: true, e: true, s: true, w: true },
        visited: false,
        type: 'empty',
      });
    }
    grid.push(row);
  }
  return grid;
}

function neighbors(grid: Cell[][], c: Cell): Array<{ cell: Cell; dir: 'n' | 'e' | 's' | 'w' }> {
  const h = grid.length;
  const w = grid[0].length;
  const list: Array<{ cell: Cell; dir: 'n' | 'e' | 's' | 'w' }> = [];
  if (c.y > 0) list.push({ cell: grid[c.y - 1][c.x], dir: 'n' });
  if (c.x < w - 1) list.push({ cell: grid[c.y][c.x + 1], dir: 'e' });
  if (c.y < h - 1) list.push({ cell: grid[c.y + 1][c.x], dir: 's' });
  if (c.x > 0) list.push({ cell: grid[c.y][c.x - 1], dir: 'w' });
  return list;
}

function removeWall(a: Cell, b: Cell, dir: 'n' | 'e' | 's' | 'w') {
  if (dir === 'n') { a.walls.n = false; b.walls.s = false; }
  else if (dir === 'e') { a.walls.e = false; b.walls.w = false; }
  else if (dir === 's') { a.walls.s = false; b.walls.n = false; }
  else { a.walls.w = false; b.walls.e = false; }
}

// Recursive backtracking (iterative)
function recursiveBacktracking(grid: Cell[][], rng: () => number) {
  const stack: Cell[] = [];
  const start = grid[0][0];
  start.visited = true;
  stack.push(start);
  while (stack.length) {
    const cur = stack[stack.length - 1];
    const unvisited = neighbors(grid, cur).filter(n => !n.cell.visited);
    if (unvisited.length === 0) { stack.pop(); continue; }
    const next = unvisited[Math.floor(rng() * unvisited.length)];
    removeWall(cur, next.cell, next.dir);
    next.cell.visited = true;
    stack.push(next.cell);
  }
}

// Prim's algorithm
function primAlgorithm(grid: Cell[][], rng: () => number) {
  const start = grid[0][0];
  start.visited = true;
  const frontier: Array<{ a: Cell; b: Cell; dir: 'n' | 'e' | 's' | 'w' }> = [];
  for (const n of neighbors(grid, start)) frontier.push({ a: start, b: n.cell, dir: n.dir });
  while (frontier.length) {
    const idx = Math.floor(rng() * frontier.length);
    const edge = frontier.splice(idx, 1)[0];
    if (!edge.b.visited) {
      removeWall(edge.a, edge.b, edge.dir);
      edge.b.visited = true;
      for (const n of neighbors(grid, edge.b)) {
        if (!n.cell.visited) frontier.push({ a: edge.b, b: n.cell, dir: n.dir });
      }
    }
  }
}

// Kruskal's algorithm
function kruskalAlgorithm(grid: Cell[][], rng: () => number) {
  const h = grid.length; const w = grid[0].length;
  const parent = new Map<string, string>();
  const key = (c: Cell) => `${c.x},${c.y}`;
  const find = (k: string): string => {
    let cur = k;
    while (parent.get(cur) !== cur) cur = parent.get(cur)!;
    parent.set(k, cur);
    return cur;
  };
  const union = (a: string, b: string) => { parent.set(find(a), find(b)); };
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) parent.set(`${x},${y}`, `${x},${y}`);
  const edges: Array<{ a: Cell; b: Cell; dir: 'n' | 'e' | 's' | 'w' }> = [];
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if (x < w - 1) edges.push({ a: grid[y][x], b: grid[y][x + 1], dir: 'e' });
    if (y < h - 1) edges.push({ a: grid[y][x], b: grid[y + 1][x], dir: 's' });
  }
  for (let i = edges.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [edges[i], edges[j]] = [edges[j], edges[i]];
  }
  for (const e of edges) {
    if (find(key(e.a)) !== find(key(e.b))) {
      removeWall(e.a, e.b, e.dir);
      union(key(e.a), key(e.b));
    }
  }
}

// Cellular automata-flavored: backtracking + extra openings
function cellularAutomata(grid: Cell[][], rng: () => number) {
  recursiveBacktracking(grid, rng);
  const h = grid.length; const w = grid[0].length;
  const extra = Math.floor(w * h * 0.06);
  for (let i = 0; i < extra; i++) {
    const x = randInt(rng, 1, w - 2);
    const y = randInt(rng, 1, h - 2);
    const ns = neighbors(grid, grid[y][x]);
    const pick = ns[Math.floor(rng() * ns.length)];
    removeWall(grid[y][x], pick.cell, pick.dir);
  }
}

function sprinkleFeatures(grid: Cell[][], rng: () => number) {
  const h = grid.length; const w = grid[0].length;
  const total = w * h;
  const traps = Math.floor(total * 0.04);
  const loot = Math.floor(total * 0.03);
  const keys = Math.max(1, Math.floor(total * 0.01));
  const portals = 2;
  const tryPlace = (type: Cell['type']) => {
    for (let attempt = 0; attempt < 30; attempt++) {
      const x = randInt(rng, 1, w - 2);
      const y = randInt(rng, 1, h - 2);
      const c = grid[y][x];
      if (c.type === 'empty' && !(x === 0 && y === 0) && !(x === w - 1 && y === h - 1)) {
        c.type = type;
        return;
      }
    }
  };
  for (let i = 0; i < traps; i++) tryPlace('trap');
  for (let i = 0; i < loot; i++) tryPlace('loot');
  for (let i = 0; i < keys; i++) tryPlace('key');
  for (let i = 0; i < portals; i++) tryPlace('portal');
  // a secret room marker
  tryPlace('secret');
}

export function generateMaze(
  width: number,
  height: number,
  algorithm: MazeAlgorithm,
  theme: MazeTheme,
  seed: number,
): Maze {
  const grid = makeGrid(width, height);
  const rng = createRng(seed);
  if (algorithm === 'backtracking') recursiveBacktracking(grid, rng);
  else if (algorithm === 'prim') primAlgorithm(grid, rng);
  else if (algorithm === 'kruskal') kruskalAlgorithm(grid, rng);
  else cellularAutomata(grid, rng);

  const start: Position = { x: 0, y: 0 };
  const exit: Position = { x: width - 1, y: height - 1 };
  grid[start.y][start.x].type = 'start';
  grid[exit.y][exit.x].type = 'exit';

  sprinkleFeatures(grid, rng);

  return { width, height, cells: grid, start, exit, algorithm, theme, seed };
}

export function canMove(maze: Maze, from: Position, dir: 'n' | 'e' | 's' | 'w'): boolean {
  const cell = maze.cells[from.y]?.[from.x];
  if (!cell) return false;
  return !cell.walls[dir];
}

export function move(from: Position, dir: 'n' | 'e' | 's' | 'w'): Position {
  if (dir === 'n') return { x: from.x, y: from.y - 1 };
  if (dir === 'e') return { x: from.x + 1, y: from.y };
  if (dir === 's') return { x: from.x, y: from.y + 1 };
  return { x: from.x - 1, y: from.y };
}
