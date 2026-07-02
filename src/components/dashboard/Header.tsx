// 顶部状态栏

import { Moon, Sun, Zap, Monitor, Bell, Volume2, VolumeX } from 'lucide-react';
import { useDashboardStore } from '@/store';
import { useRealtimeClock } from '@/hooks/useRealtimeClock';
import { GlassButton } from '@/components/ui/GlassButton';
import type { ThemeMode } from '@/types';

export function Header() {
  const clock = useRealtimeClock();
  const { theme, setTheme, soundEnabled, toggleSound, alarms, hudVisible, toggleHud } = useDashboardStore();
  const unacked = alarms.filter((a) => !a.acknowledged).length;
  const recentAlarms = alarms.slice(0, 5);

  const themeButtons: { mode: ThemeMode; icon: React.ReactNode; label: string }[] = [
    { mode: 'dark', icon: <Moon className="h-4 w-4" />, label: '深色' },
    { mode: 'light', icon: <Sun className="h-4 w-4" />, label: '浅色' },
    { mode: 'cyberpunk', icon: <Zap className="h-4 w-4" />, label: '赛博' },
  ];

  return (
    <header className="relative z-20 flex h-16 items-center justify-between px-6">
      {/* 日期星期 */}
      <div className="flex w-64 flex-col">
        <span className="text-sm font-medium text-cyan-300">{clock.date}</span>
        <span className="text-xs text-white/50">{clock.weekday}</span>
      </div>

      {/* 系统标题 */}
      <div className="flex flex-1 flex-col items-center">
        <h1 className="title-glow text-center text-2xl font-black tracking-[0.15em] text-white">
          智慧立库 3D SCADA 数字孪生平台
        </h1>
        <div className="mt-1 h-5 w-full max-w-2xl overflow-hidden">
          <div className="marquee flex items-center gap-8 text-xs text-red-300">
            {recentAlarms.length > 0 ? (
              recentAlarms.map((alarm) => (
                <span key={alarm.id} className="flex items-center gap-1 whitespace-nowrap">
                  <Bell className="h-3 w-3" />
                  [{alarm.level === 'critical' ? '严重' : alarm.level === 'warning' ? '警告' : '提示'}] {alarm.message}
                </span>
              ))
            ) : (
              <span className="whitespace-nowrap text-emerald-300">系统运行正常，暂无未确认告警</span>
            )}
          </div>
        </div>
      </div>

      {/* 右侧控制 */}
      <div className="flex w-80 items-center justify-end gap-2">
        <div className="mr-3 text-right">
          <div className="text-2xl font-bold tabular-nums text-white">{clock.time}</div>
          {unacked > 0 && (
            <div className="text-xs text-red-300">{unacked} 条未确认告警</div>
          )}
        </div>

        <GlassButton active={soundEnabled} onClick={toggleSound} title="告警声音">
          {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </GlassButton>

        <GlassButton active={!hudVisible} onClick={toggleHud} title="HUD 显隐">
          <Monitor className="h-4 w-4" />
        </GlassButton>

        {themeButtons.map((btn) => (
          <GlassButton
            key={btn.mode}
            active={theme === btn.mode}
            onClick={() => setTheme(btn.mode)}
            title={btn.label}
          >
            {btn.icon}
          </GlassButton>
        ))}
      </div>
    </header>
  );
}
