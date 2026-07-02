// SCADA 设备监控页

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cpu, Thermometer, Activity, MapPin } from 'lucide-react';
import { Panel } from '@/components/ui/Panel';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { GlassButton } from '@/components/ui/GlassButton';
import { api } from '@/lib/api';
import { useDashboardStore } from '@/store';
import type { DeviceItem, FloorMode } from '@/types';

const TYPE_NAMES: Record<string, string> = {
  plc: 'PLC',
  stacker: '堆垛机',
  conveyor: '输送线',
  lift: '提升机',
  charging: '充电桩',
  camera: '摄像头',
  robot: '机械臂',
};

function DeviceCard({ device }: { device: DeviceItem }) {
  const setCameraTarget = useDashboardStore((state) => state.setCameraTarget);
  const setSelectedFloor = useDashboardStore((state) => state.setSelectedFloor);

  function locate() {
    setSelectedFloor(device.floor as FloorMode);
    setCameraTarget({
      position: [device.position.x + 10, device.position.y + 8, device.position.z + 10],
      target: [device.position.x, device.position.y, device.position.z],
    });
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-cyan-500/30 hover:bg-white/10">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-300">
            <Cpu className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">{device.name}</h3>
            <p className="text-[10px] text-white/40">{TYPE_NAMES[device.type] || device.type}</p>
          </div>
        </div>
        <StatusBadge status={device.status} />
      </div>
      <div className="mb-3 grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-white/60">
          <Thermometer className="h-3.5 w-3.5" />
          <span>{device.temperature?.toFixed(1) ?? '--'}°C</span>
        </div>
        <div className="flex items-center gap-1.5 text-white/60">
          <Activity className="h-3.5 w-3.5" />
          <span>运行 {Math.floor(device.runtime / 3600)}h</span>
        </div>
        <div className="col-span-2 flex items-center gap-1.5 text-white/60">
          <MapPin className="h-3.5 w-3.5" />
          <span>{device.position.floor}F · ({device.position.x.toFixed(1)}, {device.position.z.toFixed(1)})</span>
        </div>
      </div>
      <GlassButton onClick={locate} className="w-full">
        <MapPin className="h-3.5 w-3.5" />
        3D 定位
      </GlassButton>
    </div>
  );
}

export default function Devices() {
  const [devices, setDevices] = useState<DeviceItem[]>([]);

  useEffect(() => {
    api.getDeviceList().then(setDevices).catch(() => {});
  }, []);

  return (
    <div className="screen-bg min-h-screen p-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/70 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white">SCADA 设备监控</h1>
              <p className="text-xs text-white/40">实时设备状态、温度、运行时长</p>
            </div>
          </div>
        </header>

        <Panel title="设备状态总览" subtitle="DEVICE OVERVIEW" className="mb-6">
          <div className="grid grid-cols-4 gap-4 text-center text-sm">
            <div>
              <div className="text-2xl font-bold text-emerald-300">{devices.filter((d) => d.status === 'normal').length}</div>
              <div className="text-white/50">正常</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-300">{devices.filter((d) => d.status === 'warning').length}</div>
              <div className="text-white/50">警告</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-300">{devices.filter((d) => d.status === 'error').length}</div>
              <div className="text-white/50">故障</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-300">{devices.filter((d) => d.status === 'offline').length}</div>
              <div className="text-white/50">离线</div>
            </div>
          </div>
        </Panel>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {devices.map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </div>
      </div>
    </div>
  );
}
