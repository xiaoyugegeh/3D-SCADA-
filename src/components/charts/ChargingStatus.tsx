// 充电桩状态环形图

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useDashboardStore } from '@/store';
import { formatNumber } from '@/lib/utils';

const COLORS = ['#00e676', '#ffca28'];

export function ChargingStatus() {
  const overview = useDashboardStore((state) => state.overview);
  const status = overview?.chargingStatus || { total: 2, free: 2, occupied: 0 };
  const data = [
    { name: '空闲', value: status.free },
    { name: '占用', value: status.occupied },
  ];

  return (
    <div className="flex h-40 items-center">
      <div className="relative h-32 w-32">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={38}
              outerRadius={55}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-white">{formatNumber(status.total)}</span>
          <span className="text-[10px] text-white/50">总数</span>
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
