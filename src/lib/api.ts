// REST API 封装

import type { AgvItem, AlarmItem, BoxItem, DeviceItem, TaskItem, WarehouseOverview } from '@/types';

const API_BASE = '/api';

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.error || '请求失败');
  }
  return json.data as T;
}

export const api = {
  getOverview: () => request<WarehouseOverview>('/warehouse/overview'),
  getAgvList: () => request<AgvItem[]>('/agv/list'),
  getBoxList: () => request<BoxItem[]>('/box/list'),
  getBox: (containerCode: string) => request<BoxItem>(`/box/${encodeURIComponent(containerCode)}`),
  getAlarms: () => request<AlarmItem[]>('/alarms'),
  getDeviceList: () => request<DeviceItem[]>('/devices/list'),
  getTaskList: () => request<TaskItem[]>('/tasks/list'),
};
