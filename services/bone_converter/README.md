# bone_converter

运行时骨骼名转换工具：将 **Tripo AI 生成的 FBX 模型**（自带骨骼绑定）的骨骼名转换为 **Mixamo 命名体系**，使模型无需重新手动绑骨即可直接播放 Mixamo 动画。

> 背景：Mixamo 官网手动绑骨在长头发女性等模型上绑定失败，改为运行时骨骼名转换。
> 方案文档：`笔记/项目文档/changes/2026-08-01-tripo-bone-converter/solution.md`

## 目录结构

```
packages/bone_converter/
├── package.json          # name: "bone_converter"
├── tsconfig.json
├── webpack.config.js     # demo 构建配置（development 模式）
├── demo/                 # Demo 源码（D1：基础场景 + 加载按钮 + 动画预览）
│   ├── index.html
│   ├── main.ts           # Three.js 场景 + FBXLoader + AnimationMixer
│   └── DebugPanel.ts     # 调试面板：骨骼列表 / 动画轨道列表 / 日志
├── src/tool/bone_converter/   # 工具源码（D1 只建骨架 + 类型/映射表）
│   ├── index.ts              # convertTripoToMixamo 入口（TODO 实现）
│   ├── types.ts              # 类型定义（完整）
│   ├── BoneMapping.ts        # 骨骼映射表（完整）
│   ├── renameBones.ts        # TODO
│   ├── fixSkinningIndices.ts # TODO
│   ├── restructureHierarchy.ts # TODO
│   └── mergeBoneWeights.ts   # TODO
└── test/e2e/             # e2e 测试（D1 建目录，后续步骤逐步加）
```

## 安装依赖

```bash
# 在项目根目录执行（Lerna monorepo，勿单独 npm install 本包）
yarn bootstrap
```

## 启动 Demo

```bash
cd packages/bone_converter
yarn webpack:dev-server     # 默认端口 8094，自动打开浏览器
```

Demo 页面功能：
1. 点击「加载 Tripo 模型」→ 加载 `asset-lib/unit-model/src/asset/elitegiantess/model_EliteGiantess1_lod1.fbx`，中央视口显示 T-pose 模型，左侧显示全部骨骼名 + 数量
2. 点击「加载 Mixamo 动画」→ 加载 Mixamo Idle 动画，右侧显示动画轨道列表（tracks 名称）
3. 点击「播放 / 停止」→ 通过 AnimationMixer 播放 / 停止
4. 底部日志区：console 风格日志（加载耗时、骨骼数、轨道数）

### 资源引用方式

demo 通过 webpack-dev-server 的 `static` 托管仓库根目录 `asset-lib/`（publicPath `/asset-lib`），FBX 资源以 URL 形式引用，不复制进 dist：

- 模型：`/asset-lib/unit-model/src/asset/elitegiantess/model_EliteGiantess1_lod1.fbx`
- 动画：`/asset-lib/unit-action/src/asset/action/elitegiantess/default/Idle/1.fbx`

## 类型检查

```bash
cd packages/bone_converter
yarn watch                 # tsc -w -noEmit
```

## e2e 测试

```bash
cd packages/bone_converter
yarn test:e2e
```

## 约束

- **不依赖 frontend/ 的任何代码**（frontend 不引用本包，方向单向）
- 转换逻辑为独立工具模块，不硬编码进现有角色加载链
- 状态同步、转换实现等见方案文档 §5
