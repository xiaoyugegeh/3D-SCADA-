// 玻璃拟态面板

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface PanelProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  accent?: 'cyan' | 'green' | 'red' | 'amber';
  noPadding?: boolean;
}

export function Panel({ children, className, title, subtitle, accent = 'cyan', noPadding = false }: PanelProps) {
  const accentColors = {
    cyan: 'from-cyan-500/80 to-blue-500/40',
    green: 'from-emerald-500/80 to-green-500/40',
    red: 'from-red-500/80 to-rose-500/40',
    amber: 'from-amber-500/80 to-orange-500/40',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-white/10 bg-panel/60 backdrop-blur-md shadow-lg',
        'before:absolute before:left-0 before:right-0 before:top-0 before:h-[2px] before:bg-gradient-to-r',
        accentColors[accent],
        className,
      )}
    >
      {(title || subtitle) && (
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
          <div>
            {title && <h3 className="text-sm font-bold tracking-wider text-white">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-[10px] uppercase tracking-widest text-white/50">{subtitle}</p>}
          </div>
        </div>
      )}
      <div className={cn(!noPadding && 'p-4')}>{children}</div>
    </div>
  );
}
