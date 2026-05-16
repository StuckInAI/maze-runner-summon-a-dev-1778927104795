import { Link } from 'react-router-dom';
import { Play, Trophy, Users, Wrench, Sparkles, Cpu, Shield, Wand2, Skull, Globe2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import styles from './Landing.module.css';

const FEATURES = [
  { icon: <Cpu size={20} />,    title: 'Procedural Engine',  desc: 'Four algorithms (Backtracking, Prim, Kruskal, Cellular) spawn infinite, never-repeating mazes.' },
  { icon: <Sparkles size={20} />,title: 'Five Themes',         desc: 'Cyberpunk, Temple, Space Station, Neon Grid, Horror — each with bespoke lighting and lore.' },
  { icon: <Shield size={20} />, title: 'Adaptive AI',         desc: 'Hunter, Wanderer, Guardian and Phantom personalities patrol — they learn your style.' },
  { icon: <Wand2 size={20} />,  title: 'AI Narrator',         desc: 'Procedural lore and contextual hints whisper as you explore.' },
  { icon: <Skull size={20} />,  title: '7 Game Modes',        desc: 'Survival, Escape Timer, Hardcore, Puzzle, Infinite, Daily and Ranked.' },
  { icon: <Globe2 size={20} />, title: 'Multiplayer Ready',   desc: 'Co-op, PvP race, spectator and ghost-runner replay support.' },
];

const MODES = [
  { name: 'Survival',   color: 'magenta' as const, hint: 'Stay alive as long as you can.' },
  { name: 'Escape',     color: 'cyan' as const,    hint: 'Beat the timer or be erased.' },
  { name: 'Hardcore',   color: 'red' as const,     hint: 'One life. No retries.' },
  { name: 'Puzzle',     color: 'violet' as const,  hint: 'Switches, gates, deduction.' },
  { name: 'Infinite',   color: 'lime' as const,    hint: 'The maze never ends.' },
  { name: 'Daily',      color: 'amber' as const,   hint: 'A new seed every 24h.' },
  { name: 'Ranked',     color: 'magenta' as const, hint: 'Climb the global ladder.' },
];

export default function Landing() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <Badge color="cyan">v1.0 · Live</Badge>
          <h1 className={styles.title}>
            Escape the <span className={styles.gradient}>AI Maze</span>.
            <br />Beat the algorithm.
          </h1>
          <p className={styles.lead}>
            A procedurally generated roguelike puzzle arena. Five themes, four maze algorithms,
            adaptive enemy AI and a global leaderboard. The grid is alive — and it remembers you.
          </p>
          <div className={styles.cta}>
            <Link to="/play"><Button size="lg" icon={<Play size={18} />}>Play now</Button></Link>
            <Link to="/lobby"><Button size="lg" variant="secondary" icon={<Users size={18} />}>Multiplayer Lobby</Button></Link>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}><b>4</b><span>Algorithms</span></div>
            <div className={styles.stat}><b>5</b><span>Themes</span></div>
            <div className={styles.stat}><b>7</b><span>Game modes</span></div>
            <div className={styles.stat}><b>∞</b><span>Mazes</span></div>
          </div>
        </div>

        <div className={styles.heroRight}>
          <Card glow className={styles.previewCard}>
            <div className={styles.preview}>
              <PreviewMaze />
            </div>
            <div className={styles.previewMeta}>
              <div>
                <div className={styles.metaLabel}>NOW PLAYING</div>
                <div className={styles.metaVal}>Neon Grid · Hardcore</div>
              </div>
              <Badge color="magenta">live seed #80324</Badge>
            </div>
          </Card>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <Badge color="violet">Features</Badge>
          <h2>Built for speedrunners and explorers</h2>
          <p>Every system is procedural. Every run is unique. Every leaderboard is contested.</p>
        </div>
        <div className={styles.featureGrid}>
          {FEATURES.map((f) => (
            <Card key={f.title} className={styles.feature}>
              <div className={styles.featIcon}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <Badge color="cyan">Game Modes</Badge>
          <h2>Seven ways to die. Or escape.</h2>
        </div>
        <div className={styles.modeGrid}>
          {MODES.map((m) => (
            <Card key={m.name} className={styles.mode}>
              <Badge color={m.color}>{m.name}</Badge>
              <p>{m.hint}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <Card className={styles.ctaCard} glow>
          <div>
            <h2>Ready to enter the labyrinth?</h2>
            <p>Drop in. Map it. Escape it. Earn your place on the global ladder.</p>
          </div>
          <div className={styles.ctaButtons}>
            <Link to="/play"><Button size="lg" icon={<Play size={18} />}>Start a run</Button></Link>
            <Link to="/leaderboard"><Button size="lg" variant="secondary" icon={<Trophy size={18} />}>Leaderboard</Button></Link>
            <Link to="/editor"><Button size="lg" variant="ghost" icon={<Wrench size={18} />}>Build a maze</Button></Link>
          </div>
        </Card>
      </section>
    </div>
  );
}

function PreviewMaze() {
  const cells = 15;
  const size = 18;
  const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let y = 0; y <= cells; y++) lines.push({ x1: 0, y1: y * size, x2: cells * size, y2: y * size });
  for (let x = 0; x <= cells; x++) lines.push({ x1: x * size, y1: 0, x2: x * size, y2: cells * size });
  return (
    <svg viewBox={`0 0 ${cells * size} ${cells * size}`} width="100%" height="100%">
      <defs>
        <radialGradient id="pgPlayer" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00f0ff" />
          <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x={0} y={0} width={cells * size} height={cells * size} fill="#06010f" />
      {lines.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke={i % 3 === 0 ? '#1a0f3d' : '#10052a'} strokeWidth={1} />
      ))}
      <circle cx={cells * size * 0.8} cy={cells * size * 0.8} r={size * 1.6} fill="url(#pgPlayer)" opacity={0.6} />
      <circle cx={cells * size * 0.8} cy={cells * size * 0.8} r={5} fill="#00f0ff" />
      <rect x={cells * size * 0.18 - 5} y={cells * size * 0.18 - 5} width={10} height={10} fill="#ff2bd6" opacity={0.85} />
    </svg>
  );
}
