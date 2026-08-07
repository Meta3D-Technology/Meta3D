# PROBE-V11-STAGE2-RESULT — Hips 根骨骼 32° 歪转修复

> V11 阶段2 | 任务：修复 `packages/bone_converter` 转换后模型 Hips 根骨骼带模型坐标系 bind 旋转 → 播放全程上半身歪转
> 流程：TDD RED → GREEN → 回归 → tsc 0 error

## 1. 根因（探针实锤）

`normalizeRootMotion.ts` 头部注释声称根骨骼「local = parentWorldInv · S_w(Hips,t) 不再乘 R」，但**实际实现**中 Hips 走了通用分支 `worldQ = bindWorldQ(Hips)·deltaLocalQ(Hips,t)`（bind 帧叠加 delta），注释与实现不符（⑤实测 = ④预测，实锤 bind 帧叠加）。

`reposeModelBind.ts` 的 re-pose 只对齐手臂 8 骨，Hips 根骨骼 + 躯干链 + 腿链没对齐动画首帧 → 保留模型坐标系 bind 旋转。

**几何约束（tmp-stage2-diag 实测）**：模型 Hips bind 世界旋转 euler(-0.42,0.56,0.56)（-24°,32°,32°）保留模型坐标系旋转；躯干/腿链局部原本**补偿**该倾斜（Spine 世界近直立）。因此**只 re-pose Hips** 会把整链转歪（实测 Spine 偏离 59.9°、LeftUpLeg 45.2°）——fix2 必须 Hips + 躯干链 + 腿链一起对齐动画首帧。

## 2. 修复前后 euler 对比（弧度，单位 YXZ）

| 项 | 修复前 | 修复后 | 目标 ① |
|----|--------|--------|---------|
| ③ 静态帧（normalize 后未播放）Hips | (-0.42,0.56,0.56) | **(-0.01,-0.08,-0.05)** | (-0.01,-0.08,-0.05) |
| ⑤ 播放 t=0 Hips | (-0.39,0.48,0.54) | **(-0.01,-0.08,-0.05)** | (-0.01,-0.08,-0.05) |
| dev vs ①（四元数夹角） | **55.0°** | **0.0°** | < 5° |

静态帧整链 vs anim t=0 世界旋转（修复后，tmp-stage2-diag E 区）：

| 链 | worst 偏离 |
|----|-----------|
| 躯干（Hips→Spine→Spine1→Spine2→Neck→Head） | 0.0° |
| 腿（UpLeg→Leg→Foot） | 0.0° |
| 手臂（Shoulder→Arm→ForeArm→Hand） | = anim t=0（与修复前一致，左肩 (75.7,-101.8,174.0)°） |

播放 t=0（F 区）：Hips 0.0° vs anim t=0，躯干/手臂/腿均近 anim 姿态。

## 3. 改动清单（仅 2 个 .ts 源文件）

1. **`src/tool/bone_converter/normalizeRootMotion.ts`** — 世界朝向循环内新增根骨骼分支：`bn === rootBoneName` 时 `worldQ(bn,t)` 直接取 `S_w(bn,t)`（变体 B 从 animSkeleton 采样的真实动画世界矩阵）的旋转，不再叠加模型 bind 帧。修**播放中**歪转。
2. **`src/tool/bone_converter/reposeModelBind.ts`** — re-pose 扩展 `TORSO_LEG_CHAIN`（Hips / Spine / Spine1 / Spine2 / Neck / Head / HeadTop_End / L+R UpLeg,Leg,Foot,ToeBase）：每骨 `worldQ = animSkeleton 同骨 t=0 世界旋转`，`local = 新父世界Q⁻¹ · 目标世界Q`，只改旋转、位置锁模型 bind；在手臂 re-pose 之前执行 + `model.updateMatrixWorld(true)`。修**加载动画后未播放**静态帧歪转。

## 4. 固化断言（probe-stage2-hips.test.ts）

- ⑤ 播放 t=0 Hips worldQ vs ①：四元数角度差 < 5°
- ③ 静态帧 Hips worldQ vs ①：< 5°
- 每轴 euler 容差 ~0.09 rad（防四元数夹角通过但单轴歪转的盲区）

RED 证据：修复前 dev = 55.0° > 5°，断言真实失败（非硬编码/盲区）。

## 5. 回归结果

| 套件 | 结果 |
|------|------|
| probe-stage2-hips（固化断言） | ✅ GREEN（RED 55.0° → GREEN 0.0°） |
| probe-v11-skin（V11 顶点重绑定） | ✅ PASS（S1 armMax=0.533 GREEN，S3=13.4°<15 GREEN，S4=14.5°<15 GREEN） |
| 全部 BDD（`yarn test:bdd`） | ⚠️ 40 passed / 1 failed |
| tsc --noEmit | ✅ 0 error |

**BDD 唯一失败为 S17（d5-animation：蒙皮 cluster 段方向 vs 骨位置段方向 < 10°），实测 12-14.5°**。已确认 **HEAD 基线既有失败**（`git checkout` 原文件跑基线同样失败、同样 t=4.5 Left 前臂 13.4°；S17 只依赖手臂蒙皮，本次改动不改手臂，数值与基线逐项一致）→ **非本次回归**，属既有待办（S17 与 V11 蒙皮重绑定相关，超出本任务范围，见 probe-v11-skin 自容差 <15°）。

## 6. 附注

- 诊断探针 `test/probe/tmp-stage2-diag.test.ts` + `.log`：记录「仅 re-pose Hips 会破坏躯干/腿」的几何证据与修复后静态帧验证，留档备查。
- 不做清单：未动其它包 / 未改 doc 与笔记 / 未写 VMD-MMD / 未重构无关代码。
