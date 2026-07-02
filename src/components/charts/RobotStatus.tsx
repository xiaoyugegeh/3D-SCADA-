// 机器人状态仪表盘

import { useDashboardStore } from '@/store';
import { formatNumber } from '@/lib/utils';
import type { AgvItem } from '@/types';

interface RingCardProps {
  label: string;
  value: number;
  total: number;
  color: string;
  icon: React.ReactNode;
}

function RingCard({ label, value, total, color, icon }: RingCardProps) {
  const pct = total > 0 ? (value / total) * 100 : 0;
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const dash = (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center rounded-lg bg-white/5 p-3 transition-colors hover:bg-white/10">
      <div className="relative h-20 w-20">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="5" fill="transparent" className="text-white/10" />
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke={color}
            strokeWidth="5"
            fill="transparent"
            strokeDasharray={`${dash} ${circumference}`}
            strokeLinecap="round"
            className="drop-shadow-[0_0_6px_currentColor]"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-lg" style={{ color }}>
          {icon}
        </div>
      </div>
      <div className="mt-2 text-center">
        <div className="text-xl font-bold leading-none text-white">{formatNumber(value)}</div>
        <div className="mt-1 text-[10px] text-white/60">{label}</div>
      </div>
    </div>
  );
}

export function RobotStatus() {
  const overview = useDashboardStore((state) => state.overview);
  const agvList = useDashboardStore((state) => state.agvList);
  const total = overview?.robotStatus.total || agvList.length || 15;
  const status = overview?.robotStatus || {
    total,
    working: agvList.filter((a: AgvItem) => a.status === 'working').length,
    charging: agvList.filter((a: AgvItem) => a.status === 'charging').length,
    idle: agvList.filter((a: AgvItem) => a.status === 'idle').length,
    offline: agvList.filter((a: AgvItem) => a.status === 'offline').length,
    abnormal: agvList.filter((a: AgvItem) => a.status === 'abnormal').length,
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      <RingCard label="总数" value={status.total} total={total} color="#facc15" icon={<span>ALL</span>} />
      <RingCard label="工作中" value={status.working} total={total} color="#00d2ff" icon={<span>RUN</span>} />
      <RingCard label="充电中" value={status.charging} total={total} color="#00e676" icon={<span>CHG</span>} />
      <RingCard label="空闲" value={status.idle} total={total} color="#60a5fa" icon={<span>IDL</span>} />
      <RingCard label="下线" value={status.offline} total={total} color="#94a3b8" icon={<span>OFF</span>} />
      <RingCard label="异常" value={status.abnormal} total={total} color="#ff3b30" icon={<span>ERR</span>} />
    </div>
  );
}
