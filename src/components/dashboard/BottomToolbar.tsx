// 底部工具栏

import { useState } from 'react';
import { Play, Pause, RotateCcw, Search, History, Layers } from 'lucide-react';
import { useDashboardStore } from '@/store';
import { GlassButton } from '@/components/ui/GlassButton';
import { api } from '@/lib/api';
import type { FloorMode } from '@/types';

const FLOORS: { key: FloorMode; label: string }[] = [
  { key: 'all', label: '整体' },
  { key: 1, label: '一层' },
  { key: 2, label: '二层' },
  { key: 3, label: '三层' },
  { key: 4, label: '四层' },
  { key: 5, label: '五层' },
];

export function BottomToolbar() {
  const {
    selectedFloor,
    setSelectedFloor,
    playing,
    togglePlaying,
    resetCamera,
    replayMode,
    setReplayMode,
    setSelectedBox,
    setCameraTarget,
  } = useDashboardStore();
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setSearching(true);
    try {
      const box = await api.getBox(query.trim());
      setSelectedBox(box);
      setCameraTarget({
        position: [box.position.x + 12, box.position.y + 8, box.position.z + 12],
        target: [box.position.x, box.position.y, box.position.z],
      });
      setSelectedFloor(box.position.floor as FloorMode);
    } catch {
      alert('未找到该料箱，请检查容器号');
    } finally {
      setSearching(false);
    }
  }

  return (
    <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 flex items-end justify-center pb-4">
      <div className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-white/10 bg-[#050d24]/80 px-4 py-3 shadow-2xl backdrop-blur-md">
        <GlassButton active={playing} onClick={togglePlaying} title={playing ? '暂停动画' : '播放动画'}>
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </GlassButton>

        <GlassButton active={replayMode} onClick={() => setReplayMode(!replayMode)} title="历史回放">
          <History className="h-4 w-4" />
        </GlassButton>

        <GlassButton onClick={resetCamera} title="视角复位">
          <RotateCcw className="h-4 w-4" />
        </GlassButton>

        <div className="mx-2 h-6 w-px bg-white/10" />

        <div className="flex items-center gap-1">
          <Layers className="mr-1 h-4 w-4 text-cyan-300" />
          {FLOORS.map((f) => (
            <GlassButton
              key={String(f.key)}
              active={selectedFloor === f.key}
              onClick={() => setSelectedFloor(f.key)}
              className="px-3"
            >
              {f.label}
            </GlassButton>
          ))}
        </div>

        <div className="mx-2 h-6 w-px bg-white/10" />

        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="输入容器号定位料箱"
              className="h-8 w-48 rounded-lg border border-white/10 bg-white/5 pl-8 pr-3 text-xs text-white placeholder:text-white/30 focus:border-cyan-500/50 focus:outline-none"
            />
          </div>
          <GlassButton type="submit" active={searching} className="px-3">
            定位
          </GlassButton>
        </form>
      </div>
    </div>
  );
}
