import { NavLink, useLocation } from 'react-router-dom';
import { Gamepad2, Trophy, Users, Wrench, UserCircle2, Sparkles } from 'lucide-react';
import clsx from 'clsx';
import styles from './Navbar.module.css';

const LINKS = [
  { to: '/play',        label: 'Play',        icon: Gamepad2 },
  { to: '/lobby',       label: 'Lobby',       icon: Users },
  { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { to: '/editor',      label: 'Editor',      icon: Wrench },
  { to: '/profile',     label: 'Profile',     icon: UserCircle2 },
];

export default function Navbar() {
  const loc = useLocation();
  return (
    <header className={styles.bar}>
      <NavLink to="/" className={styles.brand}>
        <span className={styles.logo}><Sparkles size={18} /></span>
        <span className={styles.brandText}>
          AI <span className={styles.accent}>Maze</span> Challenge
        </span>
      </NavLink>
      <nav className={styles.nav}>
        {LINKS.map(({ to, label, icon: Icon }) => {
          const active = loc.pathname === to;
          return (
            <NavLink key={to} to={to} className={clsx(styles.link, active && styles.active)}>
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
          );
        })}
      </nav>
    </header>
  );
}
