// 数字孪生大屏

import { useEffect } from 'react';
import { Header } from '@/components/dashboard/Header';
import { LeftPanel } from '@/components/dashboard/LeftPanel';
import { RightPanel } from '@/components/dashboard/RightPanel';
import { SceneContainer } from '@/components/dashboard/SceneContainer';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useDashboardStore } from '@/store';
import { api } from '@/lib/api';

export default function Dashboard() {
  const theme = useDashboardStore((state) => state.theme);
  const hudVisible = useDashboardStore((state) => state.hudVisible);
  const setOverview = useDashboardStore((state) => state.setOverview);

  useWebSocket();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // 本地开发时通过 REST API 定期刷新概览；Vercel 等静态部署下 API 可能不可用，
  // 此时前端模拟器会自行维护概览数据。
  useEffect(() => {
    const id = setInterval(() => {
      api.getOverview().then(setOverview).catch(() => {});
    }, 5000);
    return () => clearInterval(id);
  }, [setOverview]);

  return (
    <div className="screen-bg flex h-screen w-screen flex-col overflow-hidden pl-[4.5rem]">
      <Header />
      <main className="relative flex flex-1 overflow-hidden">
        {hudVisible && <LeftPanel />}
        <SceneContainer />
        {hudVisible && <RightPanel />}
      </main>
    </div>
  );
}
