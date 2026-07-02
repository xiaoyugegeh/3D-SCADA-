<div align="center">

<img src="public/favicon.png" width="120" alt="YU Warehouse Digital Twin" />

<h1>智慧立库 3D SCADA 数字孪生平台</h1>

<p><b>Smart Automated Warehouse 3D SCADA Digital Twin Platform</b></p>

<p>
  让仓库“看得见、管得住、预测得了” —— 基于 React + Three.js + Express 的新一代立体仓库数字孪生运维平台。
</p>

<p>
  <a href="https://3-d-scada.vercel.app/" target="_blank"><b>🚀 在线演示</b></a> •
  <a href="#功能亮点">✨ 功能亮点</a> •
  <a href="#技术架构">🏗️ 技术架构</a> •
  <a href="#快速开始">🛠️ 快速开始</a> •
  <a href="#一起共建">🤝 一起共建</a>
</p>

<p>
  <a href="https://github.com/xiaoyugegeh/3D-SCADA-/stargazers"><img src="https://img.shields.io/github/stars/xiaoyugegeh/3D-SCADA-?color=FFD700&logo=github&logoColor=white" alt="GitHub Stars" /></a>
  <a href="https://github.com/xiaoyugegeh/3D-SCADA-/network/members"><img src="https://img.shields.io/github/forks/xiaoyugegeh/3D-SCADA-?color=32F08C&logo=github&logoColor=white" alt="GitHub Forks" /></a>
  <a href="https://github.com/xiaoyugegeh/3D-SCADA-/issues"><img src="https://img.shields.io/github/issues/xiaoyugegeh/3D-SCADA-?color=E34F26&logo=github&logoColor=white" alt="GitHub Issues" /></a>
  <a href="https://github.com/xiaoyugegeh/3D-SCADA-/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT" /></a>
</p>

<p>
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Three.js-000000?logo=three.js&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Express-000000?logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/WebSocket-010101?logo=socket.io&logoColor=white" alt="WebSocket" />
</p>

</div>

---

## 🚀 在线体验

无需安装，点击即可进入 3D 数字孪生指挥大厅：

<p align="center">
  <a href="https://3-d-scada.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🌐_点击访问在线演示-3--d--scada.vercel.app-32F08C?style=for-the-badge&logo=vercel&logoColor=white" alt="在线演示" />
  </a>
</p>

或者一键部署到你自己的 Vercel 账号：

<p align="center">
  <a href="https://vercel.com/new/clone?repository-url=https://github.com/xiaoyugegeh/3D-SCADA-.git" target="_blank">
    <img src="https://vercel.com/button" alt="Deploy with Vercel" />
  </a>
</p>

> 部署完成后，你将获得一个独立的 `https://你的项目名.vercel.app` 访问地址，每次 push 代码都会自动重新部署。

---

## ✨ 为什么这个项目值得 Star？

在智能制造与智慧物流爆发的今天，传统二维 SCADA 系统已经很难满足复杂立体仓库的实时监控需求。本项目不是又一个后台管理模板，而是一套**真正可运行、可演示、可扩展的 3D 数字孪生解决方案**。

### 它能带来什么价值？

- **👁️ 一眼掌握全局**：5 层 AS/RS 立体仓库、AGV、输送线、充电桩等设备在 3D 场景中实时运行。
- **⚡ 毫秒级同步**：WebSocket 每 800ms 推送一次全量状态更新，模拟真实工业现场。
- **🎯 异常秒级定位**：告警触发时，3D 场景自动红色闪烁并飞行定位，告别逐层排查。
- **🤖 AI 辅助决策**：内置 AI 维护建议、任务进度分析、日报周报生成能力。
- **🎨 三种主题一键切换**：深色 / 浅色 / 赛博朋克，适配指挥大厅、会议室、移动端多种场景。

### 与传统 SCADA 的对比

| 维度 | 传统 2D SCADA | 本 3D 数字孪生平台 |
|------|--------------|-------------------|
| 空间感知 | 平面图抽象，空间感弱 | 1:1 三维立体仓库，直观真实 |
| 设备状态 | 表格 + 指示灯，信息密度低 | 模型动画 + 数据看板，一眼看懂 |
| 异常定位 | 人工逐层排查，耗时久 | 3D 红色闪烁 + 自动相机飞行 |
| 决策支持 | 经验驱动 | AI 助手 + 数据预测 |
| 演示效果 | 单调，难打动客户 | 赛博朋克 HUD，适合投标/汇报 |
| 部署成本 | 依赖专有硬件/组态软件 | 纯 Web 技术栈，Vercel 一键上线 |

---

## 🎬 功能亮点

### 🏭 数字孪生指挥大厅
深空蓝 HUD 风格，玻璃拟态面板，顶部实时日期时间、系统标题、告警跑马灯，左中右三块式 SCADA 大屏布局，底部楼层切换与 3D 场景工具栏 —— 像极了航天任务控制中心。

### 🎮 3D 仓库场景
- 程序化生成 5 层 AS/RS 立体仓库
- 货架、AGV、输送线、垂直提升机、充电桩、摄像头全要素建模
- AGV 实时路径动画与转向倾斜
- GSAP 平滑相机飞行：楼层下钻、料箱定位
- Bloom 辉光、环境光遮蔽等后处理效果

### 📊 实时数据监控
- WebSocket 每 800ms 推送 AGV / 设备 / 库位 / 任务 / 告警
- 机器人状态仪表盘（总数 / 工作中 / 充电中 / 空闲 / 离线 / 异常）
- 库位状态环形图（空闲 / 占用 / 锁定 / 异常）
- 机器人电量分布柱状图
- 充电桩状态与机器人详情列表

### 🚨 智能告警中心
低电量、通信延迟、温度异常、库位异常等实时告警，支持告警声音开关与一键确认，3D 场景红色闪烁定位。

### 📦 料箱追溯
输入容器号，相机自动飞行至目标货架，目标料箱绿色脉冲高亮，显示物料编码、批次、库位、入库时间。

### 🤖 AI 智能助手
- 自然语言查询仓库状态、AGV 充电建议、任务进度
- AI 维护建议：低电量预警、库位利用率分析、设备温度趋势
- 日报 / 周报自动生成与图表可视化

### 🎨 多主题支持
深色 / 浅色 / 赛博朋克三种主题一键切换，HUD 显隐切换，便于演示投屏。

---

## 🏗️ 技术架构

### 前端
- **React 18** + **TypeScript** + **Vite**：现代、快速、类型安全
- **Three.js** + **@react-three/fiber** + **@react-three/drei** + **@react-three/postprocessing**：工业级 3D 渲染
- **Tailwind CSS** + CSS Variables：原子化样式与主题系统
- **Zustand**：轻量全局状态管理
- **ECharts / Recharts**：数据可视化
- **GSAP** + **Framer Motion**：流畅动画
- **Lucide React**：精致图标

### 后端
- **Express 4** + **TypeScript**：REST API 服务
- **WebSocket（ws）**：实时双向通信
- **Mock 数据生成器**：无需真实设备即可完整演示，可替换为 MQTT / EMQX / Spring Boot

### 部署
- **Vercel**：前端静态托管 + Serverless API
- 已配置 `vercel.json`，Git push 自动触发部署

---

## 🛠️ 快速开始

### 环境要求
- Node.js >= 18
- npm >= 9

### 安装依赖

```bash
git clone https://github.com/xiaoyugegeh/3D-SCADA-.git
cd 3D-SCADA-
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

## 📡 API 接口

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

## 📁 项目结构

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
├── vercel.json
└── README.md
```

---

## 🖥️ 页面预览

| 路由 | 说明 |
|------|------|
| `/` 或 `/dashboard` | 数字孪生大屏 |
| `/devices` | SCADA 设备监控 |
| `/tasks` | 任务调度与历史回放 |
| `/ai-chat` | AI 智能问答 |
| `/reports` | AI 日报 / 周报 |
| `/login` | 角色选择登录 |

---

## ❓ 常见问题

**Q: 没有真实仓库设备能运行吗？**  
A: 可以。项目内置了完整的 Mock 数据生成器，无需任何真实硬件即可体验全部功能。

**Q: 能接入真实 AGV 和 PLC 吗？**  
A: 后端采用模块化设计，只需将 `api/data/generators.ts` 替换为 MQTT / EMQX / Spring Boot 的数据源即可。

**Q: 3D 场景性能如何？**  
A: 使用 Three.js + React Three Fiber 构建，配合实例化渲染和 LOD 策略，普通笔记本也能流畅运行。

**Q: 部署到 Vercel 后 WebSocket 能用吗？**  
A: Vercel 对长连接 WebSocket 有限制，建议生产环境使用独立服务器或 Vercel 的 Serverless 方案做适配。

---

## 🤝 一起共建

如果你觉得这个项目有帮助，欢迎点亮 **Star ⭐** 支持我们继续迭代！

也欢迎提交 Issue 和 Pull Request：

1. Fork 本仓库
2. 创建你的功能分支：`git checkout -b feature/你的功能`
3. 提交改动：`git commit -m 'Add some feature'`
4. 推送分支：`git push origin feature/你的功能`
5. 发起 Pull Request

---

## ⭐ Star 历史

<p align="center">
  <a href="https://star-history.com/#xiaoyugegeh/3D-SCADA-&Date" target="_blank">
    <img src="https://api.star-history.com/svg?repos=xiaoyugegeh/3D-SCADA-&type=Date" alt="Star History Chart" />
  </a>
</p>

---

## 🗺️ 后续规划

- [ ] 接入真实 MQTT / EMQX 与 Spring Boot 后端
- [ ] 使用高精度 GLB 模型替换程序化仓库
- [ ] 接入 DeepSeek / Qwen API 实现真正的 RAG 知识库问答
- [ ] 增加权限管理（JWT + RBAC）
- [ ] Docker Compose 一键部署
- [ ] 多仓库 / 多园区数字孪生切换

---

## 📄 许可证

MIT License © 2026 Smart Warehouse Digital Twin Team
