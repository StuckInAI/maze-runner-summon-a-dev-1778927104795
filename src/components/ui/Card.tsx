import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Card.module.css';

type CardProps = {
  children: ReactNode;
  className?: string;
  glow?: boolean;
};

export default function Card({ children, className, glow }: CardProps) {
  return <div className={clsx(styles.card, glow && styles.glow, className)}>{children}</div>;
}
