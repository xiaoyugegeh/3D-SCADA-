// 前端本地模拟器：当 WebSocket 不可用（如 Vercel Serverless）时，在前端自行驱动数据更新

import type { AgvItem, AlarmItem, DeviceItem, TaskItem, WarehouseOverview } from '@/types';

export interface SimulationCallbacks {
  getAgvs: () => AgvItem[];
  getDevices: () => DeviceItem[];
  getTasks: () => TaskItem[];
  getAlarms: () => AlarmItem[];
  getOverview: () => WarehouseOverview | null;
  setOverview: (overview: WarehouseOverview) => void;
  setAgvList: (list: AgvItem[]) => void;
  updateAgv: (agv: AgvItem) => void;
  updateDevice: (device: DeviceItem) => void;
  updateTask: (task: TaskItem) => void;
  addAlarm: (alarm: AlarmItem) => void;
}

const now = () => new Date().toISOString();

export function createClientSimulation(callbacks: SimulationCallbacks) {
  let timer: ReturnType<typeof setInterval> | null = null;

  function tick() {
    const agvs = callbacks.getAgvs();
    const devices = callbacks.getDevices();
    const tasks = callbacks.getTasks();

    if (agvs.length === 0) return;

    // 移动工作中的 AGV
    agvs.forEach((agv) => {
      if (agv.status === 'working' && agv.online) {
        agv.position.x += (Math.random() - 0.5) * 0.8;
        agv.position.z += (Math.random() - 0.5) * 0.8;
        agv.position.x = Math.max(-30, Math.min(30, agv.position.x));
        agv.position.z = Math.max(-20, Math.min(20, agv.position.z));
        agv.speed = Math.random() * 1.2 + 0.3;
        agv.workTime += 1;
        agv.battery = Math.round(Math.max(0, agv.battery - 0.02));
        callbacks.updateAgv({ ...agv });
      }
    });

    // 随机更新设备温度
    if (Math.random() > 0.5 && devices.length > 0) {
      const device = devices[Math.floor(Math.random() * devices.length)];
      if (device.temperature !== undefined) {
        device.temperature += (Math.random() - 0.5) * 2;
        callbacks.updateDevice({ ...device });
      }
    }

    // 更新进行中的任务
    tasks.forEach((task) => {
      if (task.status === 'running') {
        task.progress = Math.min(100, task.progress + Math.random() * 2);
        if (task.progress >= 100) {
          task.status = 'completed';
          task.updatedAt = now();
        }
        callbacks.updateTask({ ...task });
      }
    });

    // 偶尔生成告警
    if (Math.random() > 0.7) {
      const agv = agvs[Math.floor(Math.random() * agvs.length)];
      const types = [
        { type: '低电量', message: '电量持续下降，请安排充电' },
        { type: '网络延迟', message: '通信延迟超过 200ms' },
        { type: '温度告警', message: '设备温度异常升高' },
      ];
      const item = types[Math.floor(Math.random() * types.length)];
      const alarm: AlarmItem = {
        id: `ALM-${Date.now()}`,
        level: Math.random() > 0.7 ? 'critical' : 'warning',
        type: item.type,
        message: `${agv.name} ${item.message}`,
        deviceId: agv.id,
        deviceType: 'agv',
        timestamp: now(),
        acknowledged: false,
      };
      callbacks.addAlarm(alarm);
    }

    // 同步概览数据
    const currentOverview = callbacks.getOverview();
    if (currentOverview) {
      const powerDistribution = [0, 0, 0, 0, 0];
      agvs.forEach((a) => {
        const idx = Math.min(Math.floor(a.battery / 20), 4);
        powerDistribution[idx]++;
      });
      callbacks.setOverview({
        ...currentOverview,
        robotStatus: {
          total: agvs.length,
          working: agvs.filter((a) => a.status === 'working').length,
          charging: agvs.filter((a) => a.status === 'charging').length,
          idle: agvs.filter((a) => a.status === 'idle').length,
          offline: agvs.filter((a) => a.status === 'offline').length,
          abnormal: agvs.filter((a) => a.status === 'abnormal').length,
        },
        powerDistribution,
        taskStats: {
          pending: tasks.filter((t) => t.status === 'pending').length,
          running: tasks.filter((t) => t.status === 'running').length,
          completed: tasks.filter((t) => t.status === 'completed').length,
          failed: tasks.filter((t) => t.status === 'failed').length,
        },
        chargingStatus: {
          total: devices.filter((d) => d.type === 'charging').length,
          free: devices.filter((d) => d.type === 'charging' && d.status === 'normal').length,
          occupied: devices.filter((d) => d.type === 'charging' && d.status === 'warning').length,
        },
      });
    }
  }

  function start(interval = 800) {
    stop();
    timer = setInterval(tick, interval);
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  return { start, stop };
}
