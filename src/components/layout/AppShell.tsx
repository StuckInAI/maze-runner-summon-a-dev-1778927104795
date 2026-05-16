import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Background from '@/components/fx/Background';
import styles from './AppShell.module.css';

export default function AppShell() {
  return (
    <div className={styles.shell}>
      <Background />
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} AI Maze Challenge</span>
        <span className={styles.dim}>v1.0.0 · Built with React + Vite</span>
      </footer>
    </div>
  );
}
