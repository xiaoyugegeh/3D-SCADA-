// 中央 3D 场景容器

import { Warehouse3D } from './Warehouse3D';
import { BottomToolbar } from './BottomToolbar';
import { useDashboardStore } from '@/store';
import { X, Package, MapPin, Calendar } from 'lucide-react';

function BoxTooltip() {
  const selectedBox = useDashboardStore((state) => state.selectedBox);
  const setSelectedBox = useDashboardStore((state) => state.setSelectedBox);

  if (!selectedBox) return null;

  return (
    <div className="pointer-events-auto absolute right-6 top-20 z-20 w-72 rounded-xl border border-emerald-500/30 bg-[#050d24]/90 p-4 shadow-[0_0_30px_rgba(0,230,118,0.2)] backdrop-blur-md">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="flex items-center gap-2 text-sm font-bold text-emerald-300">
          <Package className="h-4 w-4" />
          物料信息
        </h4>
        <button onClick={() => setSelectedBox(null)} className="rounded p-1 hover:bg-white/10">
          <X className="h-4 w-4 text-white/60" />
        </button>
      </div>
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-white/50">容器号</span>
          <span className="font-mono text-white">{selectedBox.containerCode}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/50">物料编码</span>
          <span className="text-white">{selectedBox.materialCode}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/50">物料名称</span>
          <span className="text-white">{selectedBox.materialName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/50">批次号</span>
          <span className="text-white">{selectedBox.batchNo}</span>
        </div>
        <div className="flex items-center gap-1 text-emerald-300">
          <MapPin className="h-3 w-3" />
          <span>{selectedBox.locationCode} · {selectedBox.position.floor}F</span>
        </div>
        <div className="flex items-center gap-1 text-white/50">
          <Calendar className="h-3 w-3" />
          <span>入库时间 {new Date(selectedBox.inboundTime).toLocaleString('zh-CN')}</span>
        </div>
      </div>
    </div>
  );
}

export function SceneContainer() {
  return (
    <section className="relative flex-1 overflow-hidden rounded-xl border border-white/10 bg-black/20">
      <Warehouse3D />
      <BoxTooltip />
      <BottomToolbar />
    </section>
  );
}
