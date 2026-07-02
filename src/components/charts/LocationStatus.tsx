// 库位状态环形图

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useDashboardStore } from '@/store';
import { formatNumber } from '@/lib/utils';

const COLORS = ['#00d2ff', '#ffca28', '#ff3b30', '#94a3b8'];

export function LocationStatus() {
  const overview = useDashboardStore((state) => state.overview);
  const data = overview
    ? [
        { name: '空闲', value: overview.locationStatus.free },
        { name: '占用', value: overview.locationStatus.occupied },
        { name: '异常', value: overview.locationStatus.abnormal },
        { name: '锁定', value: overview.locationStatus.locked },
      ]
    : [];

  const total = overview?.locationStatus.total || 0;

  return (
    <div className="flex h-48 items-center">
      <div className="relative h-40 w-40">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={65}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-white">{formatNumber(total)}</span>
          <span className="text-[10px] text-white/50">总库位</span>
        </div>
      </div>
      <div className="ml-4 flex-1 space-y-2">
        {data.map((item, idx) => (
          <div key={item.name} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
              <span className="text-white/70">{item.name}</span>
            </div>
            <span className="font-medium text-white">{formatNumber(item.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
