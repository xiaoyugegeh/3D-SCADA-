// 左侧面板

import { Panel } from '@/components/ui/Panel';
import { RobotStatus } from '@/components/charts/RobotStatus';
import { LocationStatus } from '@/components/charts/LocationStatus';
import { PowerDistribution } from '@/components/charts/PowerDistribution';
import { TaskStats } from '@/components/charts/TaskStats';

export function LeftPanel() {
  return (
    <aside className="flex w-[22rem] min-w-[22rem] flex-col gap-4 overflow-y-auto p-4 pr-2">
      <Panel title="机器人状态" subtitle="ROBOT STATUS" accent="cyan">
        <RobotStatus />
      </Panel>

      <Panel title="库位状态" subtitle="LOCATION STATUS" accent="amber">
        <LocationStatus />
      </Panel>

      <Panel title="机器人电量分布" subtitle="ROBOT POWER DISTRIBUTION" accent="green">
        <PowerDistribution />
      </Panel>

      <Panel title="任务统计" subtitle="TASK STATISTICS" accent="cyan">
        <TaskStats />
      </Panel>
    </aside>
  );
}
