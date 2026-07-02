// 机器人电量分布柱状图

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useDashboardStore } from '@/store';

const LABELS = ['0-20%', '20-40%', '40-60%', '60-80%', '80-100%'];
const COLORS = ['#ff3b30', '#ff7043', '#ffca28', '#00d2ff', '#00e676'];

export function PowerDistribution() {
  const overview = useDashboardStore((state) => state.overview);
  const data = (overview?.powerDistribution || []).map((value, index) => ({
    name: LABELS[index],
    value,
    color: COLORS[index],
  }));

  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: 'rgba(5,13,36,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
            itemStyle={{ color: '#fff', fontSize: 12 }}
            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
