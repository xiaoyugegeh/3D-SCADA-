// 全局类型定义

export type AgvStatus = 'working' | 'charging' | 'idle' | 'offline' | 'abnormal';
export type AlarmLevel = 'critical' | 'warning' | 'info';
export type ThemeMode = 'dark' | 'light' | 'cyberpunk';
export type FloorMode = 'all' | 1 | 2 | 3 | 4 | 5;
export type TaskStatus = 'pending' | 'running' | 'completed' | 'failed';

export interface Position3D {
  x: number;
  y: number;
  z: number;
  floor: number;
}

export interface AgvItem {
  id: string;
  name: string;
  status: AgvStatus;
  battery: number;
  position: Position3D;
  speed: number;
  taskId?: string;
  workTime: number; // 分钟
  online: boolean;
}

export interface DeviceItem {
  id: string;
  name: string;
  type: 'plc' | 'stacker' | 'conveyor' | 'lift' | 'charging' | 'camera' | 'robot';
  status: 'normal' | 'warning' | 'error' | 'offline';
  position: Position3D;
  floor: number;
  runtime: number;
  temperature?: number;
}

export interface LocationItem {
  id: string;
  code: string;
  shelfCode: string;
  status: 'free' | 'occupied' | 'abnormal' | 'locked';
  position: Position3D;
  containerCode?: string;
}

export interface BoxItem {
  containerCode: string;
  materialCode: string;
  materialName: string;
  batchNo: string;
  locationCode: string;
  position: Position3D;
  inboundTime: string;
  outboundTime?: string;
}

export interface AlarmItem {
  id: string;
  level: AlarmLevel;
  type: string;
  message: string;
  deviceId: string;
  deviceType: string;
  timestamp: string;
  acknowledged: boolean;
}

export interface TaskItem {
  id: string;
  type: 'inbound' | 'outbound' | 'transfer' | 'charge';
  status: TaskStatus;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  agvId?: string;
  source: string;
  target: string;
  progress: number;
  createdAt: string;
  updatedAt: string;
  path?: Position3D[];
}

export interface WarehouseOverview {
  robotStatus: {
    total: number;
    working: number;
    charging: number;
    idle: number;
    offline: number;
    abnormal: number;
  };
  locationStatus: {
    total: number;
    free: number;
    occupied: number;
    abnormal: number;
    locked: number;
  };
  powerDistribution: number[];
  taskStats: {
    pending: number;
    running: number;
    completed: number;
    failed: number;
  };
  chargingStatus: {
    total: number;
    free: number;
    occupied: number;
  };
}

export interface WsMessage {
  type: 'agv.update' | 'device.update' | 'location.update' | 'task.update' | 'alarm';
  payload: unknown;
  timestamp: number;
}

export interface CameraTarget {
  position: [number, number, number];
  target: [number, number, number];
}

export interface UserRole {
  id: string;
  name: string;
  label: string;
}
