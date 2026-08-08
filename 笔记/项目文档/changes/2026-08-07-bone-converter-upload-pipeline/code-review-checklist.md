# upload_pipeline 代码审核报告（步骤 2）

> 审核对象：Meta3D 提交 `067efc919`（tripo zip → mixamo fbx + 嵌入纹理）
> 审核时间：2026-08-08 09:00（OpenCode Pro max 全自动）
> 基线：24 suites / 85 tests 全绿 + `npx tsc --noEmit` 0 error（实测复验）

## 阶段 A：规格合规（对照 solution.md）

| # | 级别 | 文件:行 | 问题 | 建议 |
|---|------|---------|------|------|
| A1 | 🟡 | exportFbx.ts:465-488 | Connections 全用 `"OO"`，规格 §5.3 规定 geometry→mesh/material→mesh/texture→material/video→texture 用 `"OC"` | 按规格改 `"OC"`（其余保留 `"OO"`）或标注有意简化 |
| A2 | 🟡 | exportFbx.ts:464-465 | 规格规定 mesh→rootBone（C: OO, meshModelId, rootBoneId），代码挂到 `0`（场景根） | 对齐规格挂 rootBone 或更新规格文档 |
| A3 | 🟡 | exportFbx.ts:221 | Definitions Count 公式 `meshes.length*2 + ... + 1`，mesh=1 时巧合正确，mesh≥2 时偏小 meshes-1（FBXLoader 预分配不足） | 改为 `meshes.length*3 + bones.length + (skinned ? 1+bones.length : 0) + textureNodeCount*2` |
| A4 | 🟡 | exportFbx.ts:473 | Skin→Geometry 连接硬编码 `geometryIds[0]`，多 mesh 时其余 mesh 的蒙皮连接错误 | 按 mesh 索引分别建立 skin→geometry 连接 |
| A5 | 🟢 | d1-package.steps.ts:23 | 路径修复同时把 snapshot_EliteGiantess9→10（数据版本变更混入） | 拆分提交或加注释说明意图 |

**阶段 A 总结**：S1-S9 全部实现、覆盖完整；核心流程（§4.2）一致；对外 API（§4.1）全部导出；关键对齐点（§5.4 负索引/角度制/UV/UTF-8/精度）均正确且 S6 闭环验证通过；纹理嵌入（§6）正确且 S7 闭环通过。唯一实质风险 = Definitions Count 公式 + Connections 类型，单 mesh 不触发，多 mesh 暴露。

## 阶段 B：代码质量

| # | 级别 | 文件:行 | 问题 | 建议 |
|---|------|---------|------|------|
| B1 | 🐛 | exportFbx.ts:71-77 | `fmt()` 对微小数值（如 1e-8）toFixed(7) 输出 "0.0000000" → 去零后 "0"，骨骼变换近 0 位置/旋转值丢符号 | 加科学计数法兜底：`Math.abs(n) < 1e-6 && n !== 0 ? n.toExponential(7) : ...` |
| B2 | 🐛 | exportFbx.ts:429-430 | `texName = str(entry.name)` 已转义，再用 `"${texName}"` 包引号 → 双重转义 | FileName/RelativeFilename 用原始文件名或只转义双引号 |
| B3 | 🟡 | convertToMixamo.ts:15-20 | 纯透传封装无业务价值 | 加 JSDoc 说明「仅做参数适配」 |
| B4 | 🟡 | unzipTripoZip.ts:46-47 | `isStandaloneImage` 只要图片后缀就收集，可能与 .fbm 目录下纹理重复（Map.set 后者覆盖前者） | isStandaloneImage 加 `!lower.includes('.fbm')` 排除 |
| B5 | 🟢 | upload-pipeline.steps.ts:19-57 | 全局 polyfill 污染（window/document/MockImage）+ MockImage 缺 crossOrigin + onload 未 call(this) | 抽到 jest setupFiles；MockImage 加 crossOrigin；`this.onload?.call(this)` |
| B6 | 🟢 | d1-package.steps.ts:23 | 同 A5（重复） | — |
| B7 | 🟡 | exportFbx.ts:385-388 | 无权重顶点的骨骼仍输出空 `Indexes: *0{a: }` / `Weights: *0{a: }` | indices 为空时跳过该 cluster 或注明设计 |
| B8 | 🟡 | base64.ts:27-48 | URL-safe base64（-_）时 lookup undefined 静默 continue，可能丢数据 | `if (val === undefined) throw new Error(...)` |
| B9 | 🟡 | exportFbx.ts:464-465 | 同 A2（mesh 挂 0 而非 rootBone，动画场景下 mesh 不跟随根骨） | 同 A2 |
| B10 | 🟢 | exportFbx.ts | 517 行超 500 阈值 | FbxWriter/Geometry/Material/Bone 导出逻辑拆分文件 |
| B11 | 🟢 | upload-pipeline.steps.ts:19-57 | polyfill 与 d4-convert.steps.ts/d6-rest-pose.steps.ts 重复定义 | 提取 test/polyfills.ts + jest.config.js setupFiles |
| B12 | 🟢 | 23 个 step-definitions | 路径修复（packages→services）范围合理无多余变更 | 确认通过 |
| B13 | 🟢 | 全部新增代码 | 无调试日志残留、无未使用 import、export 全部正确 re-export 且被测试引用 | 确认通过 |

**阶段 B 总结**：TypeScript 严格模式通过、测试全绿；核心设计（ASCII FBX 自写导出器、纹理嵌入、base64 编解码）质量高。主要风险点：fmt() 微小数值精度、Definitions Count 多 mesh 公式、polyfill 全局污染。无阻塞级 bug（当前单 mesh 测试资产下全部通过）。

## 修复清单（13 项，全默认要修）

1. [🐛B1] fmt() 微小数值科学计数法兜底
2. [🐛B2] 纹理 FileName/RelativeFilename 双重转义修复
3. [🟡A3] Definitions Count 公式修正（mesh×3）
4. [🟡A4] Skin→Geometry 按 mesh 索引连接
5. [🟡A1] Connections "OO"→"OC"（按规格）
6. [🟡A2/B9] mesh 挂 rootBone 而非 0
7. [🟡B4] isStandaloneImage 排除 .fbm
8. [🟡B7] 空 cluster 跳过或注明
9. [🟡B8] base64 未知字符 throw
10. [🟢B5/B11] polyfill 提取 jest setupFiles + MockImage crossOrigin/onload
11. [🟢B10] exportFbx 拆分
12. [🟢A5/B6] d1-package snapshot 变更加注释
13. [🟢B3] convertToMixamo 加 JSDoc
