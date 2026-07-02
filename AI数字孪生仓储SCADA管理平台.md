# AI数字孪生仓储SCADA管理平台

> 基于 Vue3 + Three.js + Spring Boot + WebSocket + MQTT + AI Agent 构建的企业级数字孪生仓储管理平台，实现仓库三维可视化、AGV机器人监控、SCADA设备监控、AI智能分析、知识库问答。

---

# 一、项目简介

## 项目背景

传统仓储管理系统只能展示二维数据，无法直观展示仓库运行情况。

本项目采用 **数字孪生（Digital Twin）** 技术，将真实仓库映射到三维场景，实现：

- 仓库可视化
- AGV机器人实时监控
- 仓位状态监控
- 设备SCADA监控
- 实时数据展示
- AI智能问答
- AI故障分析
- AI日报生成

---

# 二、项目架构

```
                   浏览器

     Vue3 + Three.js + ECharts
                │
          WebSocket 实时通信
                │
          Spring Boot API
       ┌────────┼─────────┐
       │        │         │
     MySQL    Redis      MQTT
                           │
                     EMQX Broker
                           │
            PLC / AGV / 设备 / 传感器
                           │
                   AI Agent 服务
                           │
                 RAG + 向量数据库
                           │
              DeepSeek / Qwen / GPT
```

---

# 三、技术栈

## 前端

- Vue3
- Vite
- TypeScript
- Pinia
- Vue Router
- Three.js
- ECharts
- GSAP
- Axios
- WebSocket

---

## 后端

- Spring Boot
- Spring Security
- JWT
- MyBatis Plus
- MySQL
- Redis
- WebSocket
- MQTT
- Docker

---

## AI

- LangChain4j
- Milvus
- DeepSeek
- Qwen
- MCP
- RAG

---

## 建模

- Blender
- 3ds Max
- SketchUp（可选）

---

# 四、系统功能

## 1. 登录系统

### 功能

- 登录
- JWT认证
- RBAC权限
- 用户管理
- 菜单管理
- 操作日志

---

## 2. 数字孪生

### 场景

- 仓库
- 办公区
- 通道
- 地面
- 灯光

### 模型

- AGV
- 货架
- 托盘
- 输送线
- 电梯
- 充电桩
- 摄像头
- 箱子

### Three.js

- OrbitControls
- Raycaster
- GLTFLoader
- AnimationMixer
- CSS2DRenderer

---

## 3. AGV机器人

机器人属性：

- 编号
- 名称
- 电量
- 状态
- 当前坐标
- 当前任务
- 当前速度
- 工作时间
- 在线状态

机器人动画：

- 前进
- 后退
- 转向
- 停止
- 充电
- 避障

---

## 4. 仓位管理

支持：

- 仓区
- 货架
- 仓位
- 库存
- 二维码
- RFID

仓位状态：

- 空闲
- 占用
- 锁定
- 异常

---

## 5. SCADA设备监控

支持：

- PLC
- AGV
- 输送线
- 电梯
- 机械臂
- 充电桩
- 摄像头

实时状态：

- 在线
- 离线
- 工作
- 停止
- 故障
- 报警

---

## 6. 数据大屏

左侧

- 机器人状态
- 电量统计
- 仓位统计
- 任务统计

中间

- Three.js数字孪生

右侧

- AGV列表
- 告警列表
- 实时日志

底部

- 快捷切换楼层
- 场景控制

---

## 7. 实时通信

采用：

WebSocket

实时推送：

- AGV位置
- 电量
- 仓位
- 告警
- 日志

刷新频率：

100~1000ms

---

## 8. MQTT

支持：

设备上传：

```
AGV

↓

MQTT

↓

EMQX

↓

SpringBoot

↓

WebSocket

↓

浏览器
```

Topic：

```
warehouse/agv

warehouse/device

warehouse/alarm

warehouse/task
```

---

## 9. 告警中心

支持：

- 电量过低
- AGV掉线
- PLC异常
- 仓位异常
- 网络异常

功能：

- 红色闪烁
- 声音报警
- 告警日志
- 邮件通知
- 企业微信通知

---

## 10. AI智能问答

例如：

```
AGV03为什么停止？
```

AI分析：

- 当前任务
- 电量
- 日志
- 告警
- 轨迹

返回：

```
AGV03电量低于15%

已自动前往充电桩

等待充电
```

---

## 11. AI知识库

上传：

- PDF
- Word
- Excel
- 图片OCR

支持：

- SOP
- 维修文档
- 设备说明书
- PLC手册

自然语言问答：

```
E302报警是什么意思？
```

AI回答。

---

## 12. AI Agent

每天自动：

检查：

- AGV
- PLC
- 仓位
- 电量
- 告警

自动：

- 生成日报
- 生成周报
- 发送企业微信

---

## 13. 系统管理

包括：

- 用户管理
- 角色管理
- 菜单管理
- 日志管理
- 参数管理
- 文件管理
- 模型管理

---

# 五、数据库设计

## 用户

- user

## 权限

- role
- menu

## AGV

- agv
- agv_status
- agv_track

## 仓库

- warehouse
- location
- shelf
- goods
- inventory

## 任务

- task
- task_log

## 告警

- alarm

## 设备

- device
- device_status

## 充电

- charger
- battery

## AI

- ai_chat
- ai_history
- knowledge_file
- vector_document

---

# 六、项目目录

```
warehouse-digital-twin

├── docs
├── sql
├── docker
├── web
│
├── backend
│
├── ai-service
│
├── mqtt
│
├── websocket
│
├── models
│
│   ├── warehouse.glb
│   ├── agv.glb
│   ├── shelf.glb
│   └── charger.glb
│
├── uploads
│
└── README.md
```

---

# 七、开发计划

## 第一阶段

- 项目初始化
- 登录
- 权限
- 数据库

---

## 第二阶段

Three.js

完成：

- 仓库
- 地面
- 灯光
- 模型加载

---

## 第三阶段

AGV动画

完成：

- 路径
- 行走
- 转向
- 电量

---

## 第四阶段

ECharts

完成：

- 仪表盘
- 柱状图
- 环形图
- 实时统计

---

## 第五阶段

SpringBoot

完成：

- API
- WebSocket
- MQTT

---

## 第六阶段

SCADA

接入：

- PLC
- MQTT
- Modbus
- OPC UA

---

## 第七阶段

AI

完成：

- LangChain4j
- DeepSeek
- Milvus
- MCP
- Agent

---

## 第八阶段

部署

Docker Compose

包括：

- MySQL
- Redis
- EMQX
- SpringBoot
- Vue
- AI

---

# 八、最终成果

完成后具备：

✅ 企业级数字孪生平台

✅ SCADA监控系统

✅ AGV机器人管理

✅ Three.js三维仓库

✅ WebSocket实时通信

✅ MQTT物联网通信

✅ AI知识库

✅ AI智能问答

✅ AI Agent

✅ Docker一键部署

✅ 企业级项目文档

---

# 九、未来扩展

- AI预测维护（Predictive Maintenance）
- 数字工厂
- WMS
- MES
- ERP
- APS
- ROS2机器人调度
- 多仓协同
- 多地图切换
- 无人叉车
- 无人机巡检
- BIM模型融合
- Cesium园区级数字孪生
- VR/AR远程运维

---

# 十、项目亮点

- 三维数字孪生可视化
- 企业级SCADA实时监控
- AI Agent智能运维
- RAG知识库问答
- WebSocket毫秒级数据推送
- MQTT设备接入
- 模块化架构设计
- Docker容器化部署
- 可扩展至WMS/MES/ERP集成
- 支持工业互联网与智慧仓储场景