// 状态徽章

import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusMap: Record<string, { label: string; className: string }> = {
  working: { label: '工作中', className: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
  charging: { label: '充电中', className: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  idle: { label: '空闲', className: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  offline: { label: '下线', className: 'bg-slate-500/20 text-slate-300 border-slate-500/30' },
  abnormal: { label: '异常', className: 'bg-red-500/20 text-red-300 border-red-500/30' },
  normal: { label: '正常', className: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  warning: { label: '警告', className: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  error: { label: '故障', className: 'bg-red-500/20 text-red-300 border-red-500/30' },
  pending: { label: '待执行', className: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  running: { label: '执行中', className: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
  completed: { label: '已完成', className: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  failed: { label: '失败', className: 'bg-red-500/20 text-red-300 border-red-500/30' },
  critical: { label: '严重', className: 'bg-red-500/20 text-red-300 border-red-500/30' },
  info: { label: '提示', className: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusMap[status] || { label: status, className: 'bg-white/10 text-white/70 border-white/10' };
  return (
    <span className={cn('inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-medium', config.className, className)}>
      {config.label}
    </span>
  );
}
