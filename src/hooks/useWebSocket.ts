// WebSocket 客户端钩子，支持本地模拟 fallback

import { useEffect, useRef } from 'react';
import { useDashboardStore } from '@/store';
import { api } from '@/lib/api';
import { createClientSimulation } from '@/lib/simulation';
import { generateMockData } from '@/lib/mockData';
import type { AgvItem, AlarmItem, DeviceItem, LocationItem, TaskItem, WsMessage } from '@/types';

const WS_TIMEOUT = 3000;

export function useWebSocket() {
  const {
    setAgvList,
    updateAgv,
    setDeviceList,
    updateDevice,
    setLocationList,
    updateLocation,
    setTaskList,
    updateTask,
    setAlarms,
    addAlarm,
    setOverview,
    selectedFloor,
  } = useDashboardStore();
  const wsRef = useRef<WebSocket | null>(null);
  const fallbackRef = useRef<ReturnType<typeof createClientSimulation> | null>(null);
  const connectedRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const store = useDashboardStore.getState();
    fallbackRef.current = createClientSimulation({
      getAgvs: () => store.agvList,
      getDevices: () => store.deviceList,
      getTasks: () => store.taskList,
      getAlarms: () => store.alarms,
      getOverview: () => store.overview,
      setOverview,
      setAgvList,
      updateAgv,
      updateDevice,
      updateTask,
      addAlarm,
    });

    // 先注入浏览器 Mock 数据并启动本地模拟，保证 Vercel 等静态部署立即有动态效果；
    // 若本地 WebSocket 连接成功，再用服务端数据覆盖。
    loadInitialDataAndStartSimulation();

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    timeoutRef.current = setTimeout(() => {
      if (!connectedRef.current) {
        // WebSocket 未在规定时间内连接，关闭即可，本地模拟已在运行
        ws.close();
      }
    }, WS_TIMEOUT);

    ws.onopen = () => {
      connectedRef.current = true;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (fallbackRef.current) {
        fallbackRef.current.stop();
      }
      if (selectedFloor !== 'all') {
        ws.send(JSON.stringify({ type: 'subscribe.floor', payload: selectedFloor }));
      }
    };

    ws.onmessage = (event) => {
      try {
        const message: WsMessage = JSON.parse(event.data);
        handleMessage(message);
      } catch {
        // 忽略非法消息
      }
    };

    ws.onclose = () => {
      if (connectedRef.current) {
        connectedRef.current = false;
        // 连接成功后断开，也 fallback 到本地模拟
        loadInitialDataAndStartSimulation();
      }
    };

    ws.onerror = () => {
      // 连接错误会在 timeout 或 onclose 中处理
    };

    async function loadInitialDataAndStartSimulation() {
      try {
        const [overview, agvs, devices, tasks, alarms] = await Promise.all([
          api.getOverview(),
          api.getAgvList(),
          api.getDeviceList(),
          api.getTaskList(),
          api.getAlarms(),
        ]);
        setOverview(overview);
        setAgvList(agvs);
        setDeviceList(devices);
        setTaskList(tasks);
        setAlarms(alarms);
      } catch {
        // 后端 API 不可用（如 Vercel Serverless 崩溃），使用浏览器本地 Mock 数据
        const mock = generateMockData();
        setOverview(mock.overview);
        setAgvList(mock.agvs);
        setDeviceList(mock.devices);
        setTaskList(mock.tasks);
        setAlarms(mock.alarms);
      }
      fallbackRef.current?.start(800);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      ws.close();
      fallbackRef.current?.stop();
    };
  }, []);

  // 订阅楼层变化
  useEffect(() => {
    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      if (selectedFloor !== 'all') {
        ws.send(JSON.stringify({ type: 'subscribe.floor', payload: selectedFloor }));
      }
    }
  }, [selectedFloor]);

  function handleMessage(message: WsMessage) {
    switch (message.type) {
      case 'agv.update': {
        const payload = message.payload as AgvItem[] | AgvItem;
        const list = Array.isArray(payload) ? payload : [payload];
        if (list.length > 1) {
          setAgvList(list);
        } else {
          list.forEach((agv) => updateAgv(agv));
        }
        break;
      }
      case 'device.update': {
        const payload = message.payload as DeviceItem[] | DeviceItem;
        const list = Array.isArray(payload) ? payload : [payload];
        if (list.length > 5) {
          setDeviceList(list);
        } else {
          list.forEach((device) => updateDevice(device));
        }
        break;
      }
      case 'location.update': {
        const payload = message.payload as LocationItem[] | LocationItem;
        const list = Array.isArray(payload) ? payload : [payload];
        if (list.length > 50) {
          setLocationList(list);
        } else {
          list.forEach((location) => updateLocation(location));
        }
        break;
      }
      case 'task.update': {
        const payload = message.payload as TaskItem[] | TaskItem;
        const list = Array.isArray(payload) ? payload : [payload];
        if (list.length > 5) {
          setTaskList(list);
        } else {
          list.forEach((task) => updateTask(task));
        }
        break;
      }
      case 'alarm': {
        const alarm = message.payload as AlarmItem;
        addAlarm(alarm);
        break;
      }
    }
  }
}
