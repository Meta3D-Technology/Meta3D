# 项目注册表

> Meta3D 生态中的项目类型。Meta3D 本体 = 模组编辑器平台；GTS-Play = 被编辑的游戏项目（单机 + 多人联网均在 GTS-Play，与本仓库独立）。

## 模组编辑器平台（Meta3D 本体）

- 主服务：`platform/frontend`（编辑器 Web UI）+ `platform/backend-cloudbase`（腾讯云后端）
- 包管理：Lerna + yarn workspaces
- 本地开发：各 contribute 包内 `yarn meta3d:publish_dev` 发布 bundle 到本地环境
- 部署：腾讯云 CloudBase（meta3d-platform-publish service）
- 备注：核心开发位置 = `contributes/`（action/input/ui-control 扩展）

## 游戏项目（GTS-Play，独立仓库）

- 路径：`D:\Github\GTS-Play\`
- 单机版：`packages/frontend`
- 多人联网：`packages/frontend-multiplayer`（room-service:4003 / match-service:3000）
- 论坛：`packages/forum`
- 备注：Meta3D 的模组编辑器产出 → 发布到 GTS-Play 游戏中使用
