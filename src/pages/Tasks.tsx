// 任务调度页

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Panel } from '@/components/ui/Panel';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { api } from '@/lib/api';
import type { TaskItem } from '@/types';

const TYPE_NAMES: Record<string, string> = {
  inbound: '入库',
  outbound: '出库',
  transfer: '移库',
  charge: '充电',
};

const PRIORITY_NAMES: Record<string, string> = {
  low: '低',
  normal: '中',
  high: '高',
  urgent: '紧急',
};

function PriorityBadge({ priority }: { priority: string }) {
  const colors: Record<string, string> = {
    low: 'bg-slate-500/20 text-slate-300',
    normal: 'bg-blue-500/20 text-blue-300',
    high: 'bg-amber-500/20 text-amber-300',
    urgent: 'bg-red-500/20 text-red-300',
  };
  return (
    <span className={`rounded px-2 py-0.5 text-[10px] font-medium ${colors[priority] || colors.normal}`}>
      {PRIORITY_NAMES[priority] || priority}
    </span>
  );
}

export default function Tasks() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  useEffect(() => {
    api.getTaskList().then(setTasks).catch(() => {});
  }, []);

  return (
    <div className="screen-bg min-h-screen p-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex items-center gap-4">
          <Link to="/" className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/70 hover:text-white">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">任务调度</h1>
            <p className="text-xs text-white/40">任务列表、优先级、路径预览与执行进度</p>
          </div>
        </header>

        <Panel title="任务统计" subtitle="TASK STATISTICS" className="mb-6">
          <div className="grid grid-cols-4 gap-4 text-center text-sm">
            <div>
              <div className="text-2xl font-bold text-blue-300">{tasks.filter((t) => t.status === 'pending').length}</div>
              <div className="text-white/50">待执行</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-cyan-300">{tasks.filter((t) => t.status === 'running').length}</div>
              <div className="text-white/50">执行中</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-300">{tasks.filter((t) => t.status === 'completed').length}</div>
              <div className="text-white/50">已完成</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-300">{tasks.filter((t) => t.status === 'failed').length}</div>
              <div className="text-white/50">失败</div>
            </div>
          </div>
        </Panel>

        <Panel title="任务列表" subtitle="TASK LIST">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-white/50">
                <tr>
                  <th className="py-3 pl-2">任务编号</th>
                  <th className="py-3">类型</th>
                  <th className="py-3">优先级</th>
                  <th className="py-3">状态</th>
                  <th className="py-3">AGV</th>
                  <th className="py-3">起点</th>
                  <th className="py-3">终点</th>
                  <th className="py-3">进度</th>
                  <th className="py-3">创建时间</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-white/5">
                    <td className="py-3 pl-2 font-mono text-white">{task.id}</td>
                    <td className="py-3 text-white/70">{TYPE_NAMES[task.type]}</td>
                    <td className="py-3"><PriorityBadge priority={task.priority} /></td>
                    <td className="py-3"><StatusBadge status={task.status} /></td>
                    <td className="py-3 text-white/70">{task.agvId || '-'}</td>
                    <td className="py-3 text-white/70">{task.source}</td>
                    <td className="py-3 text-white/70">{task.target}</td>
                    <td className="py-3">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-cyan-500"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                      <span className="mt-1 block text-[10px] text-white/40">{task.progress.toFixed(0)}%</span>
                    </td>
                    <td className="py-3 text-white/50">{new Date(task.createdAt).toLocaleString('zh-CN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </div>
  );
}
