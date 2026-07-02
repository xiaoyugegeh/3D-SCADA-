# 智慧立库 3D SCADA 数字孪生平台

<p align="center">
  <img src="public/favicon.png" width="96" alt="Smart Warehouse Digital Twin Logo" />
</p>

<p align="center">
  <b>Smart Automated Warehouse 3D SCADA Digital Twin Platform</b>
</p>

<p align="center">
  基于 React + Three.js + Express 构建的新一代自动化立体仓库数字孪生运维平台。
  <br />
  实现仓库三维可视化、AGV 实时监控、SCADA 设备监控、AI 智能问答与预测性维护。
</p>

<p align="center">
  <a href="#功能特性">功能特性</a> •
  <a href="#技术栈">技术栈</a> •
  <a href="#快速开始">快速开始</a> •
  <a href="#api-接口">API 接口</a> •
  <a href="#项目结构">项目结构</a>
</p>

---

## 功能特性

### 数字孪生大屏
- 深空蓝指挥控制中心风格 UI，玻璃拟态面板
- 顶部实时日期时间、系统标题、告警跑马灯
- 左 / 中 / 右三块式 SCADA 大屏布局
- 底部楼层切换与 3D 场景工具栏

### 3D 仓库场景
- 程序化生成 5 层 AS/RS 立体仓库
- 货架、AGV、输送线、垂直提升机、充电桩、摄像头
- AGV 实时路径动画与转向倾斜
- GSAP 平滑相机飞行：楼层下钻、料箱定位
- Bloom 辉光、环境光遮蔽等后处理效果

### 实时数据监控
- WebSocket 每 800ms 推送 AGV / 设备 / 库位 / 任务 / 告警
- 机器人状态仪表盘（总数 / 工作中 / 充电中 / 空闲 / 离线 / 异常）
- 库位状态环形图（空闲 / 占用 / 锁定 / 异常）
- 机器人电量分布柱状图
- 充电桩状态与机器人详情列表

### 智能告警中心
- 低电量、通信延迟、温度异常、库位异常等实时告警
- 告警声音开关与一键确认
- 3D 场景红色闪烁定位

### 料箱追溯
- 输入容器号，相机自动飞行至目标货架
- 目标料箱绿色脉冲高亮
- 显示物料编码、批次、库位、入库时间

### AI 智能助手
- 自然语言查询仓库状态、AGV 充电建议、任务进度
- AI 维护建议：低电量预警、库位利用率分析、设备温度趋势
- 日报 / 周报自动生成与图表可视化

### 多主题支持
- 深色 / 浅色 / 赛博朋克三种主题一键切换
- HUD 显隐切换，便于演示投屏

---

## 技术栈

### 前端
- React 18 + TypeScript + Vite
- Three.js + @react-three/fiber + @react-three/drei + @react-three/postprocessing
- Tailwind CSS + CSS Variables
- Zustand（状态管理）
- ECharts / Recharts（数据可视化）
- GSAP + Framer Motion（动画）
- Lucide React（图标）

### 后端
- Express 4 + TypeScript
- WebSocket（ws）实时推送
- Mock 数据生成器（可替换为真实 MQTT / EMQX / Spring Boot）

---

## 快速开始

### 环境要求
- Node.js >= 18
- npm >= 9

### 安装依赖

```bash
git clone <your-repo-url>
cd warehouse-digital-twin
npm install
```

### 启动开发服务器

```bash
npm run dev
```

- 前端：http://localhost:5173/
- 后端 API：http://localhost:3001/

### 构建生产版本

```bash
npm run build
npm run preview
```

---

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/health` | 健康检查 |
| GET | `/api/warehouse/overview` | 仓库概览数据 |
| GET | `/api/agv/list` | AGV 列表 |
| GET | `/api/box/list` | 料箱列表 |
| GET | `/api/box/:containerCode` | 料箱详情 |
| GET | `/api/alarms` | 告警列表 |
| GET | `/api/devices/list` | 设备列表 |
| GET | `/api/tasks/list` | 任务列表 |

### WebSocket 消息

连接 `ws://localhost:3001/ws` 后可接收：

- `agv.update`：AGV 位置、电量、状态更新
- `device.update`：设备温度、运行时长更新
- `location.update`：库位状态更新
- `task.update`：任务进度更新
- `alarm`：实时告警事件

---

## 项目结构

```
.
├── api/                    # Express 后端
│   ├── data/               # Mock 数据生成器
│   ├── routes/             # REST 路由
│   ├── app.ts              # Express 应用
│   ├── server.ts           # 服务器入口
│   └── websocket.ts        # WebSocket 服务
├── public/                 # 静态资源
│   └── favicon.png         # 项目 Logo
├── src/
│   ├── components/         # React 组件
│   │   ├── charts/         # ECharts 图表
│   │   ├── dashboard/      # 大屏与 3D 场景
│   │   └── ui/             # UI 基础组件
│   ├── hooks/              # 自定义 Hooks
│   ├── lib/                # 工具函数与 API 封装
│   ├── pages/              # 页面组件
│   ├── store/              # Zustand 全局状态
│   ├── types/              # TypeScript 类型
│   ├── App.tsx             # 路由配置
│   └── index.css           # 全局样式与主题变量
├── .trae/documents/        # PRD 与技术架构文档
├── package.json
├── tsconfig.json
└── README.md
```

---

## 页面预览

- `/` 或 `/dashboard`：数字孪生大屏
- `/devices`：SCADA 设备监控
- `/tasks`：任务调度与历史回放
- `/ai-chat`：AI 智能问答
- `/reports`：AI 日报 / 周报
- `/login`：角色选择登录

---

## 后续规划

- [ ] 接入真实 MQTT / EMQX 与 Spring Boot 后端
- [ ] 使用高精度 GLB 模型替换程序化仓库
- [ ] 接入 DeepSeek / Qwen API 实现真正的 RAG 知识库问答
- [ ] 增加权限管理（JWT + RBAC）
- [ ] Docker Compose 一键部署
- [ ] 多仓库 / 多园区数字孪生切换

---

## 许可证

MIT License © 2026 Smart Warehouse Digital Twin Team
