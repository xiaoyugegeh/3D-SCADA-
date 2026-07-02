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

  // 本地开发时通过 REST API 定期刷新概览；若 API 不可用（如 Vercel 静态部署），
  // 则停止轮询，由前端模拟器自行维护概览数据。
  useEffect(() => {
    let id: ReturnType<typeof setInterval> | null = null;
    api
      .getOverview()
      .then(setOverview)
      .then(() => {
        id = setInterval(() => {
          api.getOverview().then(setOverview).catch(() => {});
        }, 5000);
      })
      .catch(() => {});
    return () => {
      if (id) clearInterval(id);
    };
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
