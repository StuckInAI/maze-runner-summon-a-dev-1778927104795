import { useEffect, useState } from 'react';

export function useGameTimer(running: boolean, startTime: number): number {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (!running) return;
    let raf = 0;
    const tick = () => {
      setElapsed(performance.now() - startTime);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, startTime]);
  return elapsed;
}
