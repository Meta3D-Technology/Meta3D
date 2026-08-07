# PROBE-V10-BINDDIAG-RESULT

> 第二根因定位：bind 层诊断（D1 基线 / D2 boneInverse / D3 skinIndex / D4 矩阵来源）
> 模型：tripo_convert_09140e64-4506-4ebd-8841-5aae00631788.fbx；动画：1.fbx
> 转换后 skeleton.bones = 22：mixamorigHips, mixamorigLeftUpLeg, mixamorigLeftLeg, mixamorigLeftFoot, mixamorigLeftToeBase, mixamorigRightUpLeg, mixamorigRightLeg, mixamorigRightFoot, mixamorigRightToeBase, mixamorigSpine, mixamorigSpine1, mixamorigSpine2, mixamorigNeck, mixamorigHead, mixamorigLeftShoulder, mixamorigLeftArm, mixamorigLeftForeArm, mixamorigLeftHand, mixamorigRightShoulder, mixamorigRightArm, mixamorigRightForeArm, mixamorigRightHand

## D1：bind pose 复验 + 播放帧对比（基线）

| 模式 | 段 | Left | Right |
|---|---|---|---|
| bind pose | 上臂 | 63.7° | 69.6° |
| bind pose | 前臂 | 62.3° | 54.4° |
| 播放 t=0.5 | 上臂 | 64.0° | 64.0° |
| 播放 t=0.5 | 前臂 | 64.6° | 64.6° |
| 播放 t=0.5 | 上臂 | 75.6° | 75.6° |
| 播放 t=0.5 | 前臂 | 62.8° | 62.8° |
| 播放 t=1.5 | 上臂 | 77.6° | 77.6° |
| 播放 t=1.5 | 前臂 | 81.0° | 81.0° |
| 播放 t=1.5 | 上臂 | 99.3° | 99.3° |
| 播放 t=1.5 | 前臂 | 72.0° | 72.0° |

**D1 基线：bind pose S17 worst = 69.6°（RED）→ 复验。播放帧预期 100°+（蒙皮层在播放帧偏离骨骼）。**

## D2：boneInverse 一致性检查

对每根手臂骨：① bind matrixWorld × stored boneInverse ≈ I？② stored boneInverse vs 现算 fresh inverse 差？

| 骨 | bones 索引 | bind MW × storedInv err(全4x4) | bind MW × storedInv err(3x3) | stored vs fresh err | 一致性 |
|---|---|---|---|---|---|
| mixamorigLeftShoulder | 14 | 0.00000 | 0.00000 | 0.00000 | ✅ |
| mixamorigLeftArm | 15 | 0.00000 | 0.00000 | 0.00000 | ✅ |
| mixamorigLeftForeArm | 16 | 0.00000 | 0.00000 | 0.00000 | ✅ |
| mixamorigLeftHand | 17 | 0.00000 | 0.00000 | 0.00000 | ✅ |
| mixamorigRightShoulder | 18 | 0.00000 | 0.00000 | 0.00000 | ✅ |
| mixamorigRightArm | 19 | 0.00000 | 0.00000 | 0.00000 | ✅ |
| mixamorigRightForeArm | 20 | 0.00000 | 0.00000 | 0.00000 | ✅ |
| mixamorigRightHand | 21 | 0.00000 | 0.00000 | 0.00000 | ✅ |

**D2：bind matrixWorld × stored boneInverse 的 3x3 部分最大误差 = 0.000000 → ✅ boneInverse 与当前 skeleton.bones 的 bind 帧严格自洽（非来自其他骨架实例）**

## D3：蒙皮顶点归属检查（skinIndex）

顶点数=41199；skinIndex min=0 max=21 bones.length=22；越界槽=0

各手臂骨 weight>0 影响顶点数 / dominant 顶点数：

| 骨 | 影响顶点(weight>0) | dominant 顶点 |
|---|---|---|
| mixamorigLeftShoulder | 1279 | 694 |
| mixamorigLeftArm | 940 | 783 |
| mixamorigLeftForeArm | 1273 | 261 |
| mixamorigLeftHand | 1665 | 1665 |
| mixamorigRightShoulder | 1629 | 808 |
| mixamorigRightArm | 1268 | 637 |
| mixamorigRightForeArm | 1156 | 538 |
| mixamorigRightHand | 1650 | 1650 |

输出骨架中剩余 Twist 骨（pattern 命中）参与权重的顶点数：
  无 — ✅ 无 Twist 骨参与蒙皮权重

### D3.1 Hand cluster 组成（权重≥0.3 落在 Hand 骨的顶点，其所有槽的骨名分布）

诊断 S17 前臂段（ForeArm→Hand）偏 86-141°：若 Hand 网格顶点实际跟随 ForeArm 或手指/Twist 骨，则 c(Hand) 在播放帧会被拉离 Hand 骨。

**Left Hand cluster：顶点数=1665，Hand 骨权重占比=96.9%，槽组成：mixamorigLeftHand=96.9%, mixamorigLeftForeArm=3.1%**
  → 除 Hand 外还跟随：mixamorigLeftForeArm

**Right Hand cluster：顶点数=1656，Hand 骨权重占比=96.9%，槽组成：mixamorigRightHand=96.9%, mixamorigRightForeArm=3.1%**
  → 除 Hand 外还跟随：mixamorigRightForeArm


### D3.2 skeleton.bones 顺序 vs skinIndex 语义抽查（bind 位置法）

取 ForeArm 骨 bind 世界位置，与 ForeArm cluster 质心比较：若质心贴近骨位，则顶点归属正确（蒙皮段方向偏差来自播放帧矩阵而非归属）。

| Left | ForeArm 骨 vs cluster 质心距=1.676 | Hand 骨 vs cluster 质心距=1.487 | ❌ / ✅ |
| Right | ForeArm 骨 vs cluster 质心距=1.166 | Hand 骨 vs cluster 质心距=1.039 | ✅ / ✅ |

## D4：蒙皮计算矩阵来源

实机渲染路径：THREE.SkinnedMesh + WebGLRenderer 标准蒙皮管线。
- `Skeleton.update()`（three r159）：`boneMatrices[i] = matrixWorld_i × boneInverse_i`（`_offsetMatrix.multiplyMatrices(matrix, boneInverses[i])`）
- 顶点着色器 `skinning_vertex.glsl`：`skinVertex = bindMatrix × v; skinned = Σ w·boneMat(skinIndex)·skinVertex; out = bindMatrixInverse × skinned`
- d5/probe 的 `skinCorrectCPU`：`v = Σ w·(boneMat(bone.name)·boneInverse[skinIndex])·vBind + mesh.matrixWorld` → 与 GPU 管线矩阵来源一致（bindMatrix=I 时）。

### D4.1 skinCorrectCPU vs Skeleton.update() 数值一致性（同一播放帧）

CPU skinCorrectCPU vs Skeleton.update() 输出最大顶点距离差 = 0.000000 → ✅ 完全一致（探针与实机 GPU 蒙皮矩阵同源）

### D4.2 rigid-follow 验证：cluster 质心 vs 该骨刚体变换预测质心（播放帧 t=1.5）

若 skinIndex/权重正确，cluster 质心 c(t) 应≈ matrixWorld(bone,t)×boneInverse(bone)×c_bind（刚体跟随）。偏差大 → 顶点归属错误（跟随了其他骨）。

| mixamorigLeftShoulder | 刚体预测质心 (-0.01,0.75,-0.08) | 实际质心 (-0.06,0.69,-0.02) | 距离=0.1029 | ⚠️ 非刚体（多骨混合/归属异常） |
| mixamorigLeftForeArm | 刚体预测质心 (0.02,0.60,-0.30) | 实际质心 (-0.05,0.60,-0.32) | 距离=0.0713 | ⚠️ 非刚体（多骨混合/归属异常） |
| mixamorigLeftHand | 刚体预测质心 (-0.08,0.52,-0.35) | 实际质心 (0.11,0.56,-0.45) | 距离=0.2113 | ⚠️ 非刚体（多骨混合/归属异常） |
| mixamorigRightShoulder | 刚体预测质心 (-0.01,0.74,0.05) | 实际质心 (-0.01,0.66,0.12) | 距离=0.1116 | ⚠️ 非刚体（多骨混合/归属异常） |
| mixamorigRightForeArm | 刚体预测质心 (-0.02,0.66,0.22) | 实际质心 (-0.01,0.66,0.20) | 距离=0.0251 | ⚠️ 非刚体（多骨混合/归属异常） |
| mixamorigRightHand | 刚体预测质心 (-0.17,0.59,0.36) | 实际质心 (-0.18,0.60,0.32) | 距离=0.0455 | ⚠️ 非刚体（多骨混合/归属异常） |

### D4.3 Hand cluster 质心 vs Hand 骨 / ForeArm 骨位置（播放帧 t=1.5）

若 Hand cluster 质心贴近 ForeArm 骨而非 Hand 骨 → Hand 网格顶点实际跟随 ForeArm（skinIndex 归属错位）。

| Left Hand cluster 质心 | Hand 骨距=0.457 | ForeArm 骨距=0.411 | 结论：贴近 ForeArm 骨（Hand 网格跟随 ForeArm ❌） |
| Right Hand cluster 质心 | Hand 骨距=0.392 | ForeArm 骨距=0.363 | 结论：贴近 ForeArm 骨（Hand 网格跟随 ForeArm ❌） |

### D4.4 决定性验证：高权重顶点是否严格跟随其骨（+ mesh 帧 / bone 引用同一性）

取每根手臂骨权重最大（且单槽权重 ≥0.9）的顶点，在播放帧 t=1.5 比较：
  实际蒙皮位置 vs 预测（该骨 matrixWorld(t) × boneInverse × vBind 后 × mesh.matrixWorld）。
  若完全一致 → skinning 正确跟随骨骼（S17 RED 不是蒙皮公式/引用问题）；若不一致 → 蒙皮矩阵引用错位。

mesh.matrixWorld = [1.000,0.000,0.000,0.000,0.000,-0.000,-1.000,0.000,0.000,1.000,-0.000,0.000,0.000,0.000,0.000,1.000]
mesh.bindMatrix = [1.000,0.000,0.000,0.000,0.000,-0.000,-1.000,0.000,0.000,1.000,-0.000,0.000,0.000,0.000,0.000,1.000]

| 骨 | 索引 | 顶点# | 槽权重 | 预测质心 | 实际蒙皮位置 | 距离 | 结论 |
|---|---|---|---|---|---|---|---|
| mixamorigLeftShoulder | 14 | 25100 | 1.000/1.000 | (-0.03,0.68,0.00) | (-0.03,0.68,0.00) | 0.0000 | ✅ 严格跟随 |
| mixamorigLeftArm | 15 | 20651 | 1.000/1.000 | (-0.05,0.64,-0.11) | (-0.05,0.64,-0.11) | 0.0000 | ✅ 严格跟随 |
| mixamorigLeftForeArm | 16 | 25550 | 1.000/1.000 | (-0.07,0.60,-0.30) | (-0.07,0.60,-0.30) | 0.0000 | ✅ 严格跟随 |
| mixamorigLeftHand | 17 | 26048 | 1.000/1.000 | (0.13,0.58,-0.43) | (0.13,0.58,-0.43) | 0.0000 | ✅ 严格跟随 |
| mixamorigRightShoulder | 18 | 5159 | 1.000/1.000 | (0.05,0.64,0.16) | (0.05,0.64,0.16) | 0.0000 | ✅ 严格跟随 |
| mixamorigRightArm | 19 | 17126 | 1.000/1.000 | (-0.16,0.59,0.13) | (-0.16,0.59,0.13) | 0.0000 | ✅ 严格跟随 |
| mixamorigRightForeArm | 20 | 2810 | 1.000/1.000 | (0.00,0.63,0.22) | (0.00,0.63,0.22) | 0.0000 | ✅ 严格跟随 |
| mixamorigRightHand | 21 | 2307 | 1.000/1.000 | (-0.16,0.60,0.35) | (-0.16,0.60,0.35) | 0.0000 | ✅ 严格跟随 |

骨架 bones vs 场景树同一性（skeleton.bones[i] === 场景树同名骨对象）：
  ✅ 全部同一对象引用（蒙皮矩阵来自树中该骨 matrixWorld）

### D4.5 决定性：含 bindMatrix 的 GPU 等价蒙皮重算 S17（判定 S17 RED 是否指标缺陷）

mesh.matrixWorld 非恒等（含旋转）→ d5 skinCorrectCPU 只做 'v = Σ w·(MW·Inv)·vBind + mesh.matrixWorld'，
而真实 GPU 着色器是 `out = bindMatrixInverse × Σ w·boneMat·(bindMatrix × v)`。
若 mesh.matrixWorld ≠ I，两式不等 → S17 RED 可能是指标缺 bindMatrix 项，而非真实蒙皮错误。

| 时间 | 指标实现 | Left 上臂 | Left 前臂 | Right 上臂 | Right 前臂 | worst |
|---|---|---|---|---|---|---|
| t=0.5 | d5 (无 bindMatrix) | 64.0° | 64.6° | 75.6° | 62.8° | 75.6° |
| t=0.5 | GPU 等价 (含 bindMatrix) | 133.9° | 150.2° | 36.9° | 36.3° | 150.2° |
| t=1.5 | d5 (无 bindMatrix) | 77.6° | 81.0° | 99.3° | 72.0° | 99.3° |
| t=1.5 | GPU 等价 (含 bindMatrix) | 129.6° | 126.2° | 31.0° | 51.1° | 129.6° |

若 GPU 等价行 worst 明显 < d5 行（且接近 <10°），→ S17 RED 主要由指标缺 bindMatrix 项导致，真实蒙皮在 GPU 路径下正确。

### D4.6 决定性：GPU 等价蒙皮单顶点跟随 + 骨骼运动幅度（判 S17 RED 来源）

GPU 等价蒙皮输出在 mesh-local 帧，骨位置在 world 帧 → 用 bindMatrix⁻¹ 把骨位折算回 mesh 帧再比。
若单顶点完全跟随其骨且骨骼几乎不动（Idle），而 S17 仍 RED → S17 度量（cluster 质心段 vs 骨位置段）本身有系统偏差。

| 骨段 | bind 骨段方向 | t=1.5 骨段方向 | 方向变化角 |
|---|---|---|---|
| Left 上臂 | (0.12,-0.00,-0.17) | (0.12,-0.00,-0.17) | 0.0° |
| Left 前臂 | (0.01,-0.03,-0.14) | (0.01,-0.03,-0.14) | 0.0° |
| Right 上臂 | (-0.11,0.03,-0.18) | (-0.11,0.03,-0.18) | 0.0° |
| Right 前臂 | (-0.00,-0.01,-0.15) | (-0.00,-0.01,-0.15) | 0.0° |

GPU 等价蒙皮 单顶点 rigid-follow（预测 = bindMatrix⁻¹×(MW(t)×Inv)×bindMatrix×vBind，即 gpuSkin 本身；对比该顶点 4 槽合成实际位置）：
| 骨 | 顶点# | 预测(仅主骨) | 实际(4槽合成) | 距离 | 结论 |
|---|---|---|---|---|---|
| mixamorigLeftShoulder | 25100 | (0.03,0.08,0.76) | (0.03,0.08,0.76) | 0.0000 | ✅ 严格跟随（GPU 蒙皮正确） |
| mixamorigLeftArm | 20651 | (-0.03,0.17,0.69) | (-0.03,0.17,0.69) | 0.0000 | ✅ 严格跟随（GPU 蒙皮正确） |
| mixamorigLeftForeArm | 25550 | (0.01,0.28,0.60) | (0.01,0.28,0.60) | 0.0000 | ✅ 严格跟随（GPU 蒙皮正确） |
| mixamorigLeftHand | 26048 | (-0.06,0.34,0.55) | (-0.06,0.34,0.55) | 0.0000 | ✅ 严格跟随（GPU 蒙皮正确） |
| mixamorigRightShoulder | 5159 | (0.03,-0.06,0.75) | (0.03,-0.06,0.75) | 0.0000 | ✅ 严格跟随（GPU 蒙皮正确） |
| mixamorigRightArm | 17126 | (-0.11,-0.07,0.66) | (-0.11,-0.07,0.66) | 0.0000 | ✅ 严格跟随（GPU 蒙皮正确） |
| mixamorigRightForeArm | 2810 | (-0.03,-0.25,0.63) | (-0.03,-0.25,0.63) | 0.0000 | ✅ 严格跟随（GPU 蒙皮正确） |
| mixamorigRightHand | 2307 | (-0.16,-0.39,0.57) | (-0.16,-0.39,0.57) | 0.0000 | ✅ 严格跟随（GPU 蒙皮正确） |

## 结论

（由上述数据填写，见下方人工汇总）