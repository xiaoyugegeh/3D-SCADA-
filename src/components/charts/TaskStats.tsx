// 任务统计

import { useDashboardStore } from '@/store';
import { formatNumber } from '@/lib/utils';

export function TaskStats() {
  const overview = useDashboardStore((state) => state.overview);
  const stats = overview?.taskStats || { pending: 0, running: 0, completed: 0, failed: 0 };

  return (
    <div className="grid grid-cols-4 gap-2">
      <div className="rounded-lg bg-blue-500/10 p-3 text-center">
        <div className="text-lg font-bold text-blue-300">{formatNumber(stats.pending)}</div>
        <div className="text-[10px] text-white/50">待执行</div>
      </div>
      <div className="rounded-lg bg-cyan-500/10 p-3 text-center">
        <div className="text-lg font-bold text-cyan-300">{formatNumber(stats.running)}</div>
        <div className="text-[10px] text-white/50">执行中</div>
      </div>
      <div className="rounded-lg bg-emerald-500/10 p-3 text-center">
        <div className="text-lg font-bold text-emerald-300">{formatNumber(stats.completed)}</div>
        <div className="text-[10px] text-white/50">已完成</div>
      </div>
      <div className="rounded-lg bg-red-500/10 p-3 text-center">
        <div className="text-lg font-bold text-red-300">{formatNumber(stats.failed)}</div>
        <div className="text-[10px] text-white/50">失败</div>
      </div>
    </div>
  );
}
