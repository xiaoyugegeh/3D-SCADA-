// 前端 Mock 数据生成器
// 当部署在纯静态环境（如 Vercel）或后端 API 不可用时，由浏览器自行生成初始数据，
// 保证 3D 场景、AGV、设备、任务、告警等动态效果与本地开发环境一致。

import type {
  AgvItem,
  AlarmItem,
  BoxItem,
  DeviceItem,
  LocationItem,
  TaskItem,
  WarehouseOverview,
} from '@/types';

const FLOOR_COUNT = 5;
const AGV_COUNT = 15;
const SHELF_ROWS = 6;
const SHELF_COLS = 10;
const LOCATIONS_PER_SHELF = 12;

const now = () => new Date().toISOString();

function generateAgvs(): AgvItem[] {
  return Array.from({ length: AGV_COUNT }, (_, i) => {
    const id = `AGV-${String(i + 1).padStart(3, '0')}`;
    const status: AgvItem['status'] =
      i < 3 ? 'working' : i < 8 ? 'charging' : i < 12 ? 'idle' : i === 12 ? 'abnormal' : 'offline';
    return {
      id,
      name: `机器人 ${i + 1}`,
      status,
      battery: [85, 92, 76, 100, 88, 95, 60, 45, 30, 15, 70, 55, 40, 20, 5][i],
      position: {
        x: (Math.random() - 0.5) * 60,
        y: i < 5 ? 0 : (i % 5) * 8 + 4,
        z: (Math.random() - 0.5) * 40,
        floor: i < 5 ? 1 : (i % 5) + 1,
      },
      speed: status === 'working' ? Math.random() * 1.2 + 0.3 : 0,
      taskId: status === 'working' ? `TASK-${Date.now()}-${i}` : undefined,
      workTime: Math.floor(Math.random() * 480),
      online: status !== 'offline',
    };
  });
}

function generateDevices(): DeviceItem[] {
  const plcs = Array.from({ length: FLOOR_COUNT }, (_, f) => ({
    id: `PLC-F${f + 1}-01`,
    name: `PLC 主控-${f + 1}F`,
    type: 'plc' as const,
    status: (f === 2 ? 'warning' : 'normal') as DeviceItem['status'],
    position: { x: -28, y: f * 8 + 2, z: -18, floor: f + 1 },
    floor: f + 1,
    runtime: 3600 + Math.floor(Math.random() * 10000),
    temperature: 35 + Math.random() * 15,
  }));

  const lifts = Array.from({ length: FLOOR_COUNT * 2 }, (_, i) => {
    const f = (i % FLOOR_COUNT) + 1;
    return {
      id: `LIFT-${String(i + 1).padStart(2, '0')}`,
      name: `垂直提升机 ${i + 1}`,
      type: 'lift' as const,
      status: 'normal' as DeviceItem['status'],
      position: { x: i % 2 === 0 ? -10 : 10, y: f * 8 + 4, z: 0, floor: f },
      floor: f,
      runtime: Math.floor(Math.random() * 5000),
      temperature: 30 + Math.random() * 10,
    };
  });

  const chargers = Array.from({ length: 4 }, (_, i) => ({
    id: `CHARGE-${String(i + 1).padStart(2, '0')}`,
    name: `充电桩 ${i + 1}`,
    type: 'charging' as const,
    status: (i < 2 ? 'normal' : 'warning') as DeviceItem['status'],
    position: { x: -25 + i * 6, y: 0.5, z: 20, floor: 1 },
    floor: 1,
    runtime: 1200 + Math.floor(Math.random() * 3000),
    temperature: 25 + Math.random() * 5,
  }));

  const cameras = Array.from({ length: 12 }, (_, i) => ({
    id: `CAM-${String(i + 1).padStart(2, '0')}`,
    name: `摄像头 ${i + 1}`,
    type: 'camera' as const,
    status: (i === 7 ? 'offline' : 'normal') as DeviceItem['status'],
    position: {
      x: (Math.random() - 0.5) * 50,
      y: 7,
      z: (Math.random() - 0.5) * 30,
      floor: 1,
    },
    floor: 1,
    runtime: Math.floor(Math.random() * 8000),
  }));

  return [...plcs, ...lifts, ...chargers, ...cameras];
}

function generateLocationsAndBoxes(): { locations: LocationItem[]; boxes: BoxItem[] } {
  const locations: LocationItem[] = [];
  const boxes: BoxItem[] = [];
  let locationIndex = 0;

  for (let f = 1; f <= FLOOR_COUNT; f++) {
    for (let r = 0; r < SHELF_ROWS; r++) {
      for (let c = 0; c < SHELF_COLS; c++) {
        const shelfCode = `S-${f}-${String(r + 1).padStart(2, '0')}-${String(c + 1).padStart(2, '0')}`;
        for (let l = 0; l < LOCATIONS_PER_SHELF; l++) {
          const locCode = `${shelfCode}-${String(l + 1).padStart(2, '0')}`;
          const rand = Math.random();
          let status: LocationItem['status'] = 'free';
          if (rand > 0.9) status = 'locked';
          else if (rand > 0.85) status = 'abnormal';
          else if (rand > 0.25) status = 'occupied';

          const pos: LocationItem = {
            id: `LOC-${++locationIndex}`,
            code: locCode,
            shelfCode,
            status,
            position: {
              x: -24 + c * 5 + (c >= 5 ? 4 : 0),
              y: (f - 1) * 8 + l * 0.65 + 1,
              z: -15 + r * 5.5,
              floor: f,
            },
          };
          locations.push(pos);

          if (status === 'occupied') {
            const containerCode = `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(
              65 + Math.floor(Math.random() * 26)
            )}${String(Math.floor(Math.random() * 100)).padStart(2, '0')}${String(
              Math.floor(Math.random() * 1000)
            ).padStart(3, '0')}.${Math.floor(Math.random() * 10)}`;
            boxes.push({
              containerCode,
              materialCode: `MAT-${String(Math.floor(Math.random() * 10000)).padStart(5, '0')}`,
              materialName: `电子元件-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
              batchNo: `B-${Math.floor(Math.random() * 1000000)}`,
              locationCode: locCode,
              position: pos.position,
              inboundTime: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            });
          }
        }
      }
    }
  }

  return { locations, boxes };
}

function generateTasks(agvs: AgvItem[]): TaskItem[] {
  return Array.from({ length: 24 }, (_, i) => {
    const status: TaskItem['status'] =
      i < 8 ? 'running' : i < 12 ? 'pending' : i < 22 ? 'completed' : 'failed';
    return {
      id: `TASK-${String(i + 1).padStart(4, '0')}`,
      type: ['inbound', 'outbound', 'transfer', 'charge'][i % 4] as TaskItem['type'],
      status,
      priority: ['low', 'normal', 'high', 'urgent'][i % 4] as TaskItem['priority'],
      agvId: status === 'running' ? agvs[i % agvs.length].id : undefined,
      source: `S-${(i % 5) + 1}-${String((i % 6) + 1).padStart(2, '0')}-${String((i % 10) + 1).padStart(2, '0')}`,
      target: `S-${((i + 2) % 5) + 1}-${String(((i + 3) % 6) + 1).padStart(2, '0')}-${String(
        ((i + 5) % 10) + 1
      ).padStart(2, '0')}`,
      progress: status === 'running' ? Math.floor(Math.random() * 80) : status === 'completed' ? 100 : 0,
      createdAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: now(),
    };
  });
}

function generateAlarms(): AlarmItem[] {
  return [
    {
      id: 'ALM-001',
      level: 'warning',
      type: '低电量',
      message: 'AGV-013 电量低于 20%，建议前往充电桩',
      deviceId: 'AGV-013',
      deviceType: 'agv',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      acknowledged: false,
    },
    {
      id: 'ALM-002',
      level: 'critical',
      type: 'PLC 异常',
      message: 'PLC 主控-3F 温度超过阈值 48°C',
      deviceId: 'PLC-F3-01',
      deviceType: 'plc',
      timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
      acknowledged: false,
    },
    {
      id: 'ALM-003',
      level: 'warning',
      type: '库位异常',
      message: '库位 S-2-03-05-08 检测到货物倾斜',
      deviceId: 'LOC-1052',
      deviceType: 'location',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      acknowledged: false,
    },
    {
      id: 'ALM-004',
      level: 'info',
      type: '任务完成',
      message: 'TASK-0001 出库任务已完成',
      deviceId: 'TASK-0001',
      deviceType: 'task',
      timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      acknowledged: true,
    },
  ];
}

function generateOverview(
  agvs: AgvItem[],
  locations: LocationItem[],
  tasks: TaskItem[],
  devices: DeviceItem[]
): WarehouseOverview {
  return {
    robotStatus: {
      total: agvs.length,
      working: agvs.filter((a) => a.status === 'working').length,
      charging: agvs.filter((a) => a.status === 'charging').length,
      idle: agvs.filter((a) => a.status === 'idle').length,
      offline: agvs.filter((a) => a.status === 'offline').length,
      abnormal: agvs.filter((a) => a.status === 'abnormal').length,
    },
    locationStatus: {
      total: locations.length,
      free: locations.filter((l) => l.status === 'free').length,
      occupied: locations.filter((l) => l.status === 'occupied').length,
      abnormal: locations.filter((l) => l.status === 'abnormal').length,
      locked: locations.filter((l) => l.status === 'locked').length,
    },
    powerDistribution: (() => {
      const dist = [0, 0, 0, 0, 0];
      agvs.forEach((a) => {
        const idx = Math.min(Math.floor(a.battery / 20), 4);
        dist[idx]++;
      });
      return dist;
    })(),
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
  };
}

export interface MockData {
  overview: WarehouseOverview;
  agvs: AgvItem[];
  devices: DeviceItem[];
  locations: LocationItem[];
  tasks: TaskItem[];
  alarms: AlarmItem[];
  boxes: BoxItem[];
}

export function generateMockData(): MockData {
  const agvs = generateAgvs();
  const devices = generateDevices();
  const { locations, boxes } = generateLocationsAndBoxes();
  const tasks = generateTasks(agvs);
  const alarms = generateAlarms();
  const overview = generateOverview(agvs, locations, tasks, devices);
  return { overview, agvs, devices, locations, tasks, alarms, boxes };
}
