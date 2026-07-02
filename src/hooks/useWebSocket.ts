// WebSocket 客户端钩子

import { useEffect, useRef } from 'react';
import { useDashboardStore } from '@/store';
import type { AgvItem, AlarmItem, DeviceItem, LocationItem, TaskItem, WsMessage } from '@/types';

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
    addAlarm,
    selectedFloor,
  } = useDashboardStore();
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
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
      // 自动重连由上层控制或页面刷新恢复
    };

    ws.onerror = () => {
      // 忽略连接错误
    };

    return () => {
      ws.close();
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
