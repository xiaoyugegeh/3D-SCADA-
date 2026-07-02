// 报表中心

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Download, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { Panel } from '@/components/ui/Panel';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';

const THROUGHPUT = [
  { hour: '00:00', inbound: 12, outbound: 8 },
  { hour: '04:00', inbound: 5, outbound: 4 },
  { hour: '08:00', inbound: 28, outbound: 22 },
  { hour: '12:00', inbound: 35, outbound: 30 },
  { hour: '16:00', inbound: 42, outbound: 38 },
  { hour: '20:00', inbound: 25, outbound: 20 },
];

const UTILIZATION = [
  { day: '周一', agv: 78, location: 76 },
  { day: '周二', agv: 82, location: 79 },
  { day: '周三', agv: 75, location: 80 },
  { day: '周四', agv: 88, location: 82 },
  { day: '周五', agv: 85, location: 84 },
  { day: '周六', agv: 70, location: 78 },
  { day: '周日', agv: 65, location: 75 },
];

const REPORTS = [
  {
    id: 1,
    title: '运营日报',
    date: '2026-07-01',
    type: 'daily',
    summary: '入库 156 单，出库 142 单，任务完成率 98.7%，异常告警 3 条',
  },
  {
    id: 2,
    title: '运营周报',
    date: '2026-06-24 ~ 2026-07-01',
    type: 'weekly',
    summary: '周吞吐量 1,892 单，AGV 平均利用率 80.2%，故障停机 12 分钟',
  },
];

export default function Reports() {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly'>('daily');

  return (
    <div className="screen-bg min-h-screen p-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex items-center gap-4">
          <Link to="/" className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/70 hover:text-white">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">报表中心</h1>
            <p className="text-xs text-white/40">AI 自动生成日报/周报，支持导出</p>
          </div>
        </header>

        <div className="mb-6 flex gap-2">
          {(['daily', 'weekly'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg border px-4 py-2 text-xs font-medium transition-colors ${
                activeTab === tab
                  ? 'border-cyan-500/50 bg-cyan-500/20 text-cyan-300'
                  : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              {tab === 'daily' ? '日报' : '周报'}
            </button>
          ))}
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Panel title="出入库吞吐量" subtitle="THROUGHPUT">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={THROUGHPUT}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="hour" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(5,13,36,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
                  <Bar dataKey="inbound" name="入库" fill="#00d2ff" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="outbound" name="出库" fill="#00e676" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel title="设备利用率趋势" subtitle="UTILIZATION TREND">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={UTILIZATION}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(5,13,36,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
                  <Line type="monotone" dataKey="agv" name="AGV 利用率" stroke="#00d2ff" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="location" name="库位利用率" stroke="#ffca28" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>

        <Panel title="AI 生成报告" subtitle="AI GENERATED REPORTS">
          <div className="space-y-4">
            {REPORTS.filter((r) => r.type === activeTab).map((report) => (
              <div
                key={report.id}
                className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{report.title}</h3>
                    <p className="mt-1 text-xs text-white/40">{report.date}</p>
                    <p className="mt-2 text-xs leading-relaxed text-white/70">{report.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      <span className="flex items-center gap-1 text-[10px] text-emerald-300">
                        <CheckCircle className="h-3 w-3" /> 任务完成率 98.7%
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-cyan-300">
                        <TrendingUp className="h-3 w-3" /> 环比 +5.2%
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-amber-300">
                        <AlertCircle className="h-3 w-3" /> 异常 3 条
                      </span>
                    </div>
                  </div>
                </div>
                <button className="flex shrink-0 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 hover:bg-cyan-500/10 hover:text-cyan-300">
                  <Download className="h-3.5 w-3.5" />
                  导出 PDF
                </button>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
