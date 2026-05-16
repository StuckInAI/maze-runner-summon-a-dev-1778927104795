import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ padding: 24, textAlign: 'center' }}>
      <h1 style={{ fontSize: 48, marginBottom: 12 }}>404</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 16 }}>
        Looks like you wandered off the maze.
      </p>
      <Link to="/" style={{ color: 'var(--neon-cyan)' }}>Return home</Link>
    </div>
  );
}
