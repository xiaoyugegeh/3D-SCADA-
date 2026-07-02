// 右侧面板

import { Battery, CheckCircle, AlertTriangle, Bot, Lightbulb } from 'lucide-react';
import { Panel } from '@/components/ui/Panel';
import { ChargingStatus } from '@/components/charts/ChargingStatus';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useDashboardStore } from '@/store';
import { formatTime } from '@/lib/utils';
import type { AgvItem, AlarmItem } from '@/types';

function RobotDetails() {
  const agvList = useDashboardStore((state) => state.agvList);

  return (
    <div className="max-h-56 overflow-auto">
      <table className="w-full text-left text-xs">
        <thead className="sticky top-0 bg-[#050d24]/80 text-white/60">
          <tr>
            <th className="py-2 pl-2">编号</th>
            <th className="py-2">状态</th>
            <th className="py-2 text-right">电量</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {agvList.slice(0, 15).map((agv: AgvItem) => (
            <tr key={agv.id} className="hover:bg-white/5">
              <td className="py-2 pl-2 text-white">{agv.name}</td>
              <td className="py-2">
                <StatusBadge status={agv.status} />
              </td>
              <td className="py-2 text-right">
                <span className={agv.battery < 20 ? 'text-red-300' : 'text-emerald-300'}>
                  {agv.battery}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AlarmStream() {
  const alarms = useDashboardStore((state) => state.alarms);
  const acknowledgeAlarm = useDashboardStore((state) => state.acknowledgeAlarm);

  return (
    <div className="max-h-56 space-y-2 overflow-auto pr-1">
      {alarms.slice(0, 20).map((alarm: AlarmItem) => (
        <div
          key={alarm.id}
          className={`flex items-start gap-2 rounded-lg border p-2 ${
            alarm.acknowledged ? 'border-white/5 bg-white/5 opacity-60' : 'border-red-500/20 bg-red-500/10'
          }`}
        >
          {alarm.level === 'critical' ? (
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
          ) : (
            <Bot className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <StatusBadge status={alarm.level} />
              <span className="text-[10px] text-white/40">{formatTime(alarm.timestamp)}</span>
            </div>
            <p className="mt-1 truncate text-xs text-white/80">{alarm.message}</p>
          </div>
          {!alarm.acknowledged && (
            <button
              onClick={() => acknowledgeAlarm(alarm.id)}
              className="shrink-0 rounded p-1 hover:bg-white/10"
              title="确认告警"
            >
              <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

function AISuggestions() {
  const agvList = useDashboardStore((state) => state.agvList);
  const lowBattery = agvList.filter((a: AgvItem) => a.battery < 30).length;

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-2 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-3">
        <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
        <p className="text-xs leading-relaxed text-white/80">
          当前有 {lowBattery} 台机器人电量低于 30%，建议优先调度至充电桩，避免任务执行中断。
        </p>
      </div>
      <div className="flex items-start gap-2 rounded-lg bg-gradient-to-r from-emerald-500/10 to-green-500/10 p-3">
        <Battery className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
        <p className="text-xs leading-relaxed text-white/80">
          库位利用率 78.6%，处于健康区间。预测未来 2 小时入库高峰，建议提前释放一层缓存区。
        </p>
      </div>
      <div className="flex items-start gap-2 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-3">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
        <p className="text-xs leading-relaxed text-white/80">
          PLC 主控-3F 温度有上升趋势，建议检查散热风扇并关注后续告警。
        </p>
      </div>
    </div>
  );
}

export function RightPanel() {
  return (
    <aside className="flex w-[22rem] min-w-[22rem] flex-col gap-4 overflow-y-auto p-4 pl-2">
      <Panel title="充电桩状态" subtitle="CHARGING STATION STATUS" accent="green">
        <ChargingStatus />
      </Panel>

      <Panel title="机器人详情" subtitle="ROBOT DETAILS" accent="cyan">
        <RobotDetails />
      </Panel>

      <Panel title="实时告警流" subtitle="REAL-TIME ALARMS" accent="red">
        <AlarmStream />
      </Panel>

      <Panel title="AI 维护建议" subtitle="AI MAINTENANCE ADVICE" accent="amber">
        <AISuggestions />
      </Panel>
    </aside>
  );
}
