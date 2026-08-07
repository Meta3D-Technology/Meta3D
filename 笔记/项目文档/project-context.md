<!-- 与 GTS-Play 的 docs/agent-context.md 角色类似：此文件注入到 Meta3D 相关 OpenCode brief 开头 -->
# Meta3D 项目上下文

> 此文件注入到所有 Meta3D 相关 OpenCode brief 开头。由 bot 自动附加字符串。

---

## 项目

- 开源 Web3D 低代码平台（Meta3D），Lerna monorepo + yarn workspaces
- 路径：`D:\Github\Meta3D\`
- 本项目用途：为单机游戏（GTS-Play）提供**模组编辑器**——职业模组编辑器 + 单位模组编辑器

## 技术栈

| 层 | 技术 |
|----|------|
| 语言 | TypeScript（严格模式） |
| 构建 | webpack 5 + ts-loader + gulp |
| 包管理 | Lerna + yarn workspaces |
| 测试 | Jest + cucumber（BDD，meta3d-bs-jest-cucumber） |
| 架构 | 事件溯源（event sourcing）+ 一切皆扩展（contribute: action/input/ui-control） |

## 模块结构

| 目录 | 说明 |
|------|------|
| `contributes/` | 扩展贡献包（**主要开发位置**）：meta3d-action-mod-unit-*（单位模组）、meta3d-action-mod-career-*（职业模组） |
| `protocols/` | 协议包（action 的 name/state/uiData 定义） |
| `packages/` | 核心包：asset / core / editor-whole / engine-whole / engine-scene / event / interact / three |
| `platform/` | 平台：frontend（编辑器 UI）/ backend-abstract / backend-cloudbase（腾讯云）/ backend-4everland |
| `services/` | 服务：meta3d-package / meta3d-platform-publish / meta3d-tool-publish / meta3d-tool-utils |
| `defaults/` | 默认构建配置（jest、cucumber、commonlib 等） |

## 编码红线（Meta3D 特有）

- 改 `.ts` 后跑 `npx tsc --noEmit` 验证
- 新 action 必须配 protocol 包（`*_protocol`），遵循 contribute 格式（actionName/init/handler/createState）
- 跨包依赖通过 `api.getPackageService()` / protocol 引入，禁止直接 import 实现
- 状态修改必须走 `api.action.setActionState` + 事件溯源（event sourcing），禁止直接改 meta3dState
- 发布/上传走 `api.backend.*`（backend-abstract 接口），不直接调云服务

## 单位模组上传模型链路（当前任务相关）

- `contributes/meta3d-action-mod-unit-upload-model-file/src/Main.ts`
  - handler: `_loadFBX` → importFile → 校验 `.fbx` 后缀 → `addEvent`
  - init 事件处理: 大小校验（lod1 ≤ 3MB / lod2 ≤ 1.5MB）→ `state.files.set(key, [fbxName, fbxData])`
- `contributes/meta3d-action-mod-unit-publish-to-game/src/Main.ts`
  - `_getAssetFiles`: files → `[./${name}_model_${key}.fbx, Uint8Array]` + snapshot png
  - `api.backend.publishMod(...)` → backend-cloudbase → 腾讯云云存储
- **后续任务**：上传的 tripo 导出模型（已绑骨骼）→ bone_converter 转换（GTS-Play `packages/bone_converter/`）→ 云存储

## 测试命令

```bash
# BDD 测试（包内）
cd contributes/<包名> && npx jest --config jest.config.js

# 类型检查
npx tsc --noEmit

# 发布本地 bundle
yarn meta3d:publish_dev   # = cross-env NODE_ENV=development webpack && gulp publish_local_env_bundle
```

## 文档目录

| 路径 | 说明 |
|------|------|
| `笔记/项目文档/specs/` | 场景知识库 |
| `笔记/项目文档/changes/` | 活跃变更目录 |
| `笔记/项目文档/rules/` | 规则体系 |
| `笔记/项目文档/Meta3D-Project-Index.md` | 项目索引（全景 + 核心链路） |
| `笔记/方案/` | 方案文档 |
