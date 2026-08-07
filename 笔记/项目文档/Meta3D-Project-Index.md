---
created: 2026-08-07
updated: 2026-08-07
tags:
  - project-index
  - meta3d
  - mod-editor
aliases:
  - Meta3D项目索引
  - 项目索引
---

# Meta3D 项目索引

> 创建日期：2026-08-07
> 最后更新：2026-08-07 14:50
> 用途：项目全景 + 模组编辑器核心链路索引（尤其单位模组上传模型 → 转换 → 云存储）

---

## 一、项目全景

```
Meta3D/
├── contributes/          ← 扩展贡献包（核心开发位置）
│   ├── meta3d-action-mod-career-*   ← 职业模组编辑器 actions（约 25 个）
│   ├── meta3d-action-mod-unit-*     ← 单位模组编辑器 actions（约 40 个）
│   ├── meta3d-action-*              ← 编辑器通用 actions（add-gameobject、publish 等）
│   ├── meta3d-input-*               ← 输入扩展
│   └── meta3d-ui-control-*          ← UI 控件扩展
├── protocols/             ← 协议包（contribute_protocols 定义 action 的 name/state/uiData）
├── packages/              ← 核心包
│   ├── asset/             ← 资源系统
│   ├── core/              ← 核心引擎
│   ├── editor-whole/      ← 编辑器整体（含 gameview-render / sceneview-render / ui / lib 子包）
│   ├── engine-whole/      ← 引擎整体（含 web-render）
│   ├── engine-scene/      ← 引擎场景
│   ├── event/             ← 事件系统（event sourcing）
│   ├── interact/          ← 交互
│   └── three/             ← Three.js 适配
├── platform/              ← 平台
│   ├── frontend/          ← 平台前端（编辑器 Web UI）
│   ├── backend-abstract/  ← 后端抽象（api.backend.publishMod 等接口）
│   ├── backend-cloudbase/ ← 腾讯云 CloudBase 后端实现
│   └── backend-4everland/ ← 4everland 后端实现
├── services/              ← 服务
│   ├── meta3d-package/        ← 包管理
│   ├── meta3d-platform-publish← 平台发布（云存储上传）
│   ├── meta3d-tool-publish/  ← 发布工具
│   └── meta3d-tool-utils/    ← 工具
├── defaults/              ← 默认构建配置（meta3d-bs-jest / meta3d-bs-jest-cucumber / meta3d-commonlib-ts 等）
├── externals/             ← 外部扩展
├── examples/ demos/ doc/ utils/ templates/ mine/
└── 笔记/                  ← 项目笔记（Obsidian）
```

---

## 二、核心链路：单位模组上传模型 → 转换 → 云存储

### 2.1 现状链路（上传 .fbx → 发布时打包上传）

```
用户选择模型文件
  └─ meta3d-action-mod-unit-upload-model-file/src/Main.ts
      ├─ handler: _loadFBX(api)
      │   ├─ importFile()                    ← meta3d-file-ts-utils
      │   ├─ 校验: 后缀必须 .fbx
      │   ├─ eventSourcingService.addEvent() ← 触发 eventName 事件
      │   └─ catch → api.message.error
      └─ init: on<eventName>
          ├─ 大小校验: lod1 ≤ 3MB / lod2 ≤ 1.5MB（超限 warn 并 return）
          ├─ state.files.set(key, [fbxName, fbxData])   ← key ∈ {lod1, lod2}
          └─ 清空 selectedModelIndex
      └─ createState: { files: immutable.Map() }

发布（meta3d-action-mod-unit-publish-to-game/src/Main.ts）
  ├─ _getAssetFiles(api, meta3dState, name)
  │   ├─ state.files.reduce → [`./${name}_model_${key}.fbx`, Uint8Array(fbxData)]
  │   ├─ snapshot → [`./${name}_model_snapshot.png`, data]
  │   └─ 返回 assetFiles 数组
  └─ publish()
      └─ api.backend.publishMod(json, description, distFileContent, assetFiles, modIconBase64, 2)
          └─ backend-cloudbase 实现 → 上传腾讯云云存储
```

### 2.2 后续任务（bone_converter 接入）

- **目标**：`meta3d-action-mod-unit-upload-model-file` 中，上传的 tripo 导出模型（**已绑骨骼**）→ 用 bone_converter 转换 → 再上传腾讯云云存储保存
- **要点**：
  - tripo 导出格式待确认（当前 action 只收 `.fbx`，tripo 通常导出 glb/fbx，需核实）
  - 转换位置：`_loadFBX` 拿到 ArrayBuffer 后、`addEvent` 之前（或事件处理内）
  - 大小限制当前 3MB/1.5MB，转换后体积可能变化，需评估
  - 上传链路走 `api.backend.publishMod`（backend-cloudbase）
  - bone_converter 位于 GTS-Play `packages/bone_converter/`（V12.1 状态，含 BDD 63/63）

---

## 三、模组编辑器 actions 清单

### 职业模组（meta3d-action-mod-career-*）
add-careerfeature / add-negativecareerfeature / add-positivecareerfeature / clear-selectedcareerfeatures / close-pubilsh-to-game-modal / close-select-careerfeatures-modal / info / load-careerpreview / load-modpreview / publish-to-game / select-careerfeature / selectcharactertype / set-author / set-displaynamecn / set-displaynameen / set-ispublic / set-needgem / set-readme / show-pubilsh-to-game-modal / updatevalue / jumptocareerdoc / jumptocareereditor

### 单位模组（meta3d-action-mod-unit-*）
init / select / select-model / upload-model-file / upload-model-snapshot / upload-particle-image / upload-particle-instance / publish-to-game / quicktest / add-feature / clear-feature / add-damageeffect / add-skillobject / add-subeffect / remove-skillobject / reward-clearprop / scenedata-add / select-action / select-prop / set-animation-index / set-armor-type / set-behaviourdata-mode / set-behaviourdata-values / set-category / set-damagetype / set-emittertype / set-generate / set-height / show-publish-modal / open-unitvalue-modal ...

---

## 四、技术栈

| 层 | 技术 |
|----|------|
| 语言 | TypeScript（+ 少量 ReScript 历史包） |
| 构建 | webpack 5 + ts-loader + gulp |
| 包管理 | Lerna + yarn workspaces（registry.npmmirror.com） |
| 测试 | Jest + cucumber（meta3d-bs-jest-cucumber，BDD） |
| 架构 | 事件溯源（event sourcing）+ 一切皆扩展（action/input/ui-control/protocol） |
| 后端 | backend-abstract 接口抽象 + backend-cloudbase（腾讯云）/ backend-4everland 实现 |

---

## 五、关键 API 模式

```typescript
// action 贡献格式（contribute）
export let getContribute = (api) => ({
    actionName,
    init: (meta3dState) => Promise<meta3dState>,   // 注册事件监听
    handler: (meta3dState, uiData, actionParams) => Promise<meta3dState>,  // UI 触发
    createState: () => state,                       // 初始化 action state
})

// 跨 action 取状态
api.action.getActionState<state>(meta3dState, actionName)
api.action.setActionState<state>(meta3dState, actionName, {...state})

// 事件溯源
eventSourcingService.on<inputData>(meta3dState, eventName, 0, handler)
eventSourcingService.addEvent<inputData>(meta3dState, { name, isOnlyRead, inputData })

// 后端调用
api.backend.publishMod(json, description, distFileContent, assetFiles, modIconBase64, characterType)
```

---

## 六、文档目录

| 路径 | 说明 |
|------|------|
| `笔记/项目文档/specs/` | 场景知识库 |
| `笔记/项目文档/changes/` | 活跃变更目录 |
| `笔记/项目文档/rules/` | 规则体系 |
| `笔记/方案/` | 方案文档 |
| `doc/` | 官方文档（editor / engine / files / platform / record） |
