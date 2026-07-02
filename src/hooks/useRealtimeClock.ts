// 实时时钟钩子

import { useEffect, useState } from 'react';

function formatDateTime(date: Date) {
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const h = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');
  return {
    date: `${y}-${m}-${d}`,
    weekday: weekdays[date.getDay()],
    time: `${h}:${min}:${s}`,
  };
}

export function useRealtimeClock() {
  const [clock, setClock] = useState(() => formatDateTime(new Date()));

  useEffect(() => {
    const timer = setInterval(() => {
      setClock(formatDateTime(new Date()));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return clock;
}
