import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Badge.module.css';

type BadgeProps = {
  children: ReactNode;
  color?: 'cyan' | 'magenta' | 'violet' | 'lime' | 'amber' | 'red';
};

export default function Badge({ children, color = 'cyan' }: BadgeProps) {
  return <span className={clsx(styles.badge, styles[color])}>{children}</span>;
}
