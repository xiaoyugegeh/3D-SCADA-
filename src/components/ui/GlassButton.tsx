// 玻璃态按钮

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface GlassButtonProps {
  children: ReactNode;
  className?: string;
  active?: boolean;
  variant?: 'default' | 'danger' | 'success' | 'warning';
  onClick?: () => void;
  title?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function GlassButton({ children, className, active = false, variant = 'default', onClick, title, type = 'button' }: GlassButtonProps) {
  const variants = {
    default: active
      ? 'bg-cyan-500/30 text-cyan-300 border-cyan-400/60 shadow-[0_0_16px_rgba(0,210,255,0.35)]'
      : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10 hover:text-white',
    danger: active
      ? 'bg-red-500/30 text-red-300 border-red-400/60 shadow-[0_0_16px_rgba(255,59,48,0.35)]'
      : 'bg-white/5 text-white/80 border-white/10 hover:bg-red-500/10 hover:text-red-200',
    success: active
      ? 'bg-emerald-500/30 text-emerald-300 border-emerald-400/60 shadow-[0_0_16px_rgba(0,230,118,0.35)]'
      : 'bg-white/5 text-white/80 border-white/10 hover:bg-emerald-500/10 hover:text-emerald-200',
    warning: active
      ? 'bg-amber-500/30 text-amber-300 border-amber-400/60 shadow-[0_0_16px_rgba(255,202,40,0.35)]'
      : 'bg-white/5 text-white/80 border-white/10 hover:bg-amber-500/10 hover:text-amber-200',
  };

  return (
    <button
      type={type}
      title={title}
      onClick={onClick}
      className={cn(
        'flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-all duration-200 backdrop-blur-sm',
        variants[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}
