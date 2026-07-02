// WebSocket 实时推送服务

import type { Server } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import {
  agvs,
  devices,
  locations,
  tasks,
  alarms,
  tickSimulation,
  generateAlarm,
} from './data/generators.ts';
import type { WsMessage } from '../src/types/index.ts';

export function setupWebSocket(server: Server) {
  const wss = new WebSocketServer({ server, path: '/ws' });

  wss.on('connection', (ws) => {
    // 发送初始快照
    send(ws, { type: 'agv.update', payload: agvs, timestamp: Date.now() });
    send(ws, { type: 'device.update', payload: devices, timestamp: Date.now() });
    send(ws, { type: 'location.update', payload: locations.slice(0, 200), timestamp: Date.now() });
    send(ws, { type: 'task.update', payload: tasks, timestamp: Date.now() });

    ws.on('message', (raw) => {
      try {
        const data = JSON.parse(raw.toString());
        if (data.type === 'subscribe.floor') {
          send(ws, { type: 'location.update', payload: locations.filter((l) => l.position.floor === data.payload), timestamp: Date.now() });
        }
      } catch {
        // 忽略非法消息
      }
    });

    ws.on('error', () => {
      // 忽略连接错误
    });
  });

  // 定时推送模拟数据
  const interval = setInterval(() => {
    tickSimulation();

    // AGV 更新
    broadcast(wss, { type: 'agv.update', payload: agvs, timestamp: Date.now() });

    // 随机设备更新
    if (Math.random() > 0.5) {
      const device = devices[Math.floor(Math.random() * devices.length)];
      if (device.temperature !== undefined) {
        device.temperature += (Math.random() - 0.5) * 2;
      }
      broadcast(wss, { type: 'device.update', payload: [device], timestamp: Date.now() });
    }

    // 随机库位更新
    if (Math.random() > 0.7) {
      const loc = locations[Math.floor(Math.random() * locations.length)];
      broadcast(wss, { type: 'location.update', payload: [loc], timestamp: Date.now() });
    }

    // 任务更新
    broadcast(wss, { type: 'task.update', payload: tasks.filter((t) => t.status === 'running'), timestamp: Date.now() });

    // 偶尔生成告警
    const alarm = generateAlarm();
    if (alarm) {
      alarms.unshift(alarm);
      if (alarms.length > 100) alarms.pop();
      broadcast(wss, { type: 'alarm', payload: alarm, timestamp: Date.now() });
    }
  }, 800);

  // 清理
  wss.on('close', () => {
    clearInterval(interval);
  });
}

function send(ws: WebSocket, message: WsMessage) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message));
  }
}

function broadcast(wss: WebSocketServer, message: WsMessage) {
  const data = JSON.stringify(message);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}
