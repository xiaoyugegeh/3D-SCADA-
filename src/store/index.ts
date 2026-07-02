// Zustand 全局状态管理

import { create } from 'zustand';
import type {
  AgvItem,
  AlarmItem,
  BoxItem,
  CameraTarget,
  DeviceItem,
  FloorMode,
  LocationItem,
  TaskItem,
  ThemeMode,
  WarehouseOverview,
} from '@/types';

interface DashboardState {
  // 主题与 UI
  theme: ThemeMode;
  hudVisible: boolean;
  setTheme: (theme: ThemeMode) => void;
  toggleHud: () => void;

  // 楼层与相机
  selectedFloor: FloorMode;
  setSelectedFloor: (floor: FloorMode) => void;
  cameraTarget: CameraTarget | null;
  setCameraTarget: (target: CameraTarget | null) => void;
  resetCamera: () => void;

  // 数据
  overview: WarehouseOverview | null;
  setOverview: (overview: WarehouseOverview) => void;

  agvList: AgvItem[];
  setAgvList: (list: AgvItem[]) => void;
  updateAgv: (agv: AgvItem) => void;

  deviceList: DeviceItem[];
  setDeviceList: (list: DeviceItem[]) => void;
  updateDevice: (device: DeviceItem) => void;

  locationList: LocationItem[];
  setLocationList: (list: LocationItem[]) => void;
  updateLocation: (location: LocationItem) => void;

  taskList: TaskItem[];
  setTaskList: (list: TaskItem[]) => void;
  updateTask: (task: TaskItem) => void;

  alarms: AlarmItem[];
  setAlarms: (alarms: AlarmItem[]) => void;
  addAlarm: (alarm: AlarmItem) => void;
  acknowledgeAlarm: (id: string) => void;

  // 料箱搜索
  selectedBox: BoxItem | null;
  setSelectedBox: (box: BoxItem | null) => void;

  // 播放控制
  playing: boolean;
  replayMode: boolean;
  togglePlaying: () => void;
  setReplayMode: (mode: boolean) => void;

  // 告警声音
  soundEnabled: boolean;
  toggleSound: () => void;
}

const initialOverview: WarehouseOverview = {
  robotStatus: { total: 15, working: 3, charging: 8, idle: 4, offline: 0, abnormal: 0 },
  locationStatus: { total: 10350, free: 1365, occupied: 8132, abnormal: 585, locked: 132 },
  powerDistribution: [2, 2, 6, 2, 3],
  taskStats: { pending: 12, running: 8, completed: 156, failed: 2 },
  chargingStatus: { total: 2, free: 2, occupied: 0 },
};

export const useDashboardStore = create<DashboardState>((set, get) => ({
  theme: 'dark',
  hudVisible: true,
  setTheme: (theme) => set({ theme }),
  toggleHud: () => set((state) => ({ hudVisible: !state.hudVisible })),

  selectedFloor: 'all',
  setSelectedFloor: (selectedFloor) => set({ selectedFloor }),
  cameraTarget: null,
  setCameraTarget: (cameraTarget) => set({ cameraTarget }),
  resetCamera: () => set({ cameraTarget: null, selectedFloor: 'all', selectedBox: null }),

  overview: initialOverview,
  setOverview: (overview) => set({ overview }),

  agvList: [],
  setAgvList: (agvList) => set({ agvList }),
  updateAgv: (agv) =>
    set((state) => ({
      agvList: state.agvList.map((item) => (item.id === agv.id ? agv : item)),
    })),

  deviceList: [],
  setDeviceList: (deviceList) => set({ deviceList }),
  updateDevice: (device) =>
    set((state) => ({
      deviceList: state.deviceList.map((item) => (item.id === device.id ? device : item)),
    })),

  locationList: [],
  setLocationList: (locationList) => set({ locationList }),
  updateLocation: (location) =>
    set((state) => ({
      locationList: state.locationList.map((item) => (item.id === location.id ? location : item)),
    })),

  taskList: [],
  setTaskList: (taskList) => set({ taskList }),
  updateTask: (task) =>
    set((state) => ({
      taskList: state.taskList.map((item) => (item.id === task.id ? task : item)),
    })),

  alarms: [],
  setAlarms: (alarms) => set({ alarms }),
  addAlarm: (alarm) =>
    set((state) => {
      const next = [alarm, ...state.alarms].slice(0, 100);
      return { alarms: next };
    }),
  acknowledgeAlarm: (id) =>
    set((state) => ({
      alarms: state.alarms.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)),
    })),

  selectedBox: null,
  setSelectedBox: (selectedBox) => set({ selectedBox }),

  playing: true,
  replayMode: false,
  togglePlaying: () => set((state) => ({ playing: !state.playing })),
  setReplayMode: (replayMode) => set({ replayMode }),

  soundEnabled: false,
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
}));
