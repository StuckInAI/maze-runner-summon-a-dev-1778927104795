import type { Maze, Position } from '@/types';
import { canMove } from './maze';

type Node = { pos: Position; g: number; h: number; f: number; parent: Node | null };

function key(p: Position) { return `${p.x},${p.y}`; }
function heuristic(a: Position, b: Position) { return Math.abs(a.x - b.x) + Math.abs(a.y - b.y); }

export function findPath(maze: Maze, start: Position, goal: Position): Position[] {
  const open: Node[] = [];
  const openMap = new Map<string, Node>();
  const closed = new Set<string>();
  const startNode: Node = { pos: start, g: 0, h: heuristic(start, goal), f: 0, parent: null };
  startNode.f = startNode.g + startNode.h;
  open.push(startNode);
  openMap.set(key(start), startNode);

  while (open.length) {
    open.sort((a, b) => a.f - b.f);
    const cur = open.shift()!;
    openMap.delete(key(cur.pos));
    if (cur.pos.x === goal.x && cur.pos.y === goal.y) {
      const path: Position[] = [];
      let n: Node | null = cur;
      while (n) { path.unshift(n.pos); n = n.parent; }
      return path;
    }
    closed.add(key(cur.pos));
    const dirs: Array<'n' | 'e' | 's' | 'w'> = ['n', 'e', 's', 'w'];
    for (const d of dirs) {
      if (!canMove(maze, cur.pos, d)) continue;
      const np: Position =
        d === 'n' ? { x: cur.pos.x, y: cur.pos.y - 1 } :
        d === 'e' ? { x: cur.pos.x + 1, y: cur.pos.y } :
        d === 's' ? { x: cur.pos.x, y: cur.pos.y + 1 } :
        { x: cur.pos.x - 1, y: cur.pos.y };
      if (np.x < 0 || np.y < 0 || np.x >= maze.width || np.y >= maze.height) continue;
      const k = key(np);
      if (closed.has(k)) continue;
      const g = cur.g + 1;
      const existing = openMap.get(k);
      if (!existing || g < existing.g) {
        const node: Node = { pos: np, g, h: heuristic(np, goal), f: 0, parent: cur };
        node.f = node.g + node.h;
        if (existing) {
          const idx = open.indexOf(existing);
          if (idx >= 0) open.splice(idx, 1);
        }
        open.push(node);
        openMap.set(k, node);
      }
    }
  }
  return [];
}
