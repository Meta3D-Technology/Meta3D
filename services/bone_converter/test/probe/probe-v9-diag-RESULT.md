# probe-v9-diag — V8 生效性验证 + 断言/视觉 gap 量化结果

> 探针：`test/probe/probe-v9-diag.test.ts`
> 数据源：Tripo 模型 `tripo_convert_09140e64....fbx` + Mixamo Idle `1.fbx`，t=0 采样
> 运行：`npx jest --config jest.config.js --testMatch "**" --testPathPattern "probe-v9-diag" --forceExit`（PASS，含 Q1-Q8 全量 console 输出）

---

## 结论速览

| 问题 | 答案 | 关键数值 |
|---|---|---|
| Q1 V8 是否生效 | ✅ **生效**（代码层面） | out-vs-anim 最大 **0.03°**（<5°）；bind-vs-anim 39~177° |
| Q2 有无 SkinnedMesh | ✅ **有**（1 个，41199 顶点） | `tripo_node_09140e64`，有 skinIndex/skinWeight，22 骨 |
| Q3 手掌握向 | out==anim（**0.00°**）；bind 差 16.7~20.0° | 因 V8 直接拷贝 raw animQ，骨朝向层面必然相等 |
| Q4 肘弯平面法线 | out-vs-anim 仅 **1.8~2.2°**；bind 差 89~110° | 弯曲角 out 23.3/24.1° vs anim 25.3/26.4° |
| Q5 swing-twist | out-vs-anim 全 **0°**（swing/twist）；bind 差 6~177° | 因 worldQ==animQ 恒等 |
| Q6 位置/段方向 | 段**方向** out-vs-anim 0~2.5°（一致）；段**长度**差 100× | out 上臂 0.20 vs anim 13.999；前臂 0.143 vs 10.693 |
| Q7 蒙皮顶点 | 网格确实被蒙皮驱动（右手 320 顶点、质心位移 2.8） | 无法直接对 anim 骨架蒙皮（异骨架），作参考 |
| **Q8 帧校正目标** | 🔴 **输出偏离正确 retarget 99~146°** | **断言 gap 实锤** |

---

## 逐问分析

### Q1：V8 代码层面已生效 ✅

| 骨骼 | out-vs-anim(°) | bind-vs-anim(°) |
|---|---|---|
| mixamorigLeftShoulder | 0.02 | 127.47 |
| mixamorigLeftArm | 0.00 | 156.72 |
| mixamorigLeftForeArm | 0.00 | 162.19 |
| mixamorigLeftHand | 0.02 | 177.49 |
| mixamorigRightShoulder | 0.01 | 116.79 |
| mixamorigRightArm | 0.01 | 66.42 |
| mixamorigRightForeArm | 0.00 | 61.48 |
| mixamorigRightHand | 0.03 | 39.62 |

**V8 生效，但这是「问题」而非「成就」**：V8 的手臂骨 worldQ = `S_w` 动画世界朝向（`normalizeRootMotion.ts` 变体 B，`quat.setFromRotationMatrix(S_w.get(bn)[i])`），因此输出**恒等于**原始动画骨架 t=0 的朝向。所有「对比 anim」的断言必然 ≈0°，这正是 S13 全绿却视觉仍扭曲的结构性原因——**断言在对比输出是否等于 anim，而 V8 就是把输出设成了 anim**。

### Q2：有 SkinnedMesh → 可做基于蒙皮顶点的断言 ✅

转换后模型含 1 个 SkinnedMesh（41199 顶点、skinIndex/skinWeight 齐全、skeleton 22 骨）。**断言可以基于「蒙皮后顶点位置」，这是最贴近视觉的量**（Q7 已实测蒙皮可 CPU 计算）。

### Q3：手掌握向（掌心法线）—— 对比 raw anim 无效

| | bind-vs-out(°) | out-vs-anim(°) | bind-vs-anim(°) |
|---|---|---|---|
| Left | 16.74 | **0.00** | 16.74 |
| Right | 19.98 | **0.00** | 19.98 |

掌心法线 out==anim（0°）是 V8 拷贝 animQ 的必然结果。**「掌心法线 vs anim」不是 gap-catcher**——它测不出扭曲。兄弟视觉「掌心朝后」说明：虽然骨骼朝向等于 anim，但**蒙皮看到的相对旋转**是错的（见 Q8）。

### Q4：肘弯平面法线 —— 对比 raw anim 无效

| | bendDeg(bind/out/anim) | n out-vs-anim(°) | n bind-vs-out(°) |
|---|---|---|---|
| Left | 10.59 / 23.28 / 25.32 | **1.80** | 89.31 |
| Right | 11.37 / 24.12 / 26.43 | **2.16** | 109.73 |

弯曲平面法线 out-vs-anim 仅 1.8~2.2°，弯曲角 out 比 anim 小 ~2°。**「肘弯平面 vs anim」同样不是 gap-catcher**。bind 与 anim 差 89~110°，说明模型 bind（A-pose）与 Mixamo Idle 的肘弯平面本就不同，V8 已把它转到 anim 平面——但转角来源是「拷贝 anim 世界朝向」，不是「正确的相对旋转」。

### Q5：swing-twist 分解 —— 对比 raw anim 恒 0°

out-vs-anim：全部 8 骨 swing=0°、twist=0°（worldQ==animQ 恒等）。
bind-vs-anim：twist 6~177°、swing 36~115°（模型 bind 与 Mixamo rest 差异巨大）。

S13 断言 |θ_output − θ_anim| < 20° 在 V8 下**恒过（实测 0°）**——因为输出就是 anim。**仅测 twist 滚动角，且参考系是「拷贝对象本身」，双重原因导致断言失效。**

### Q6：位置 / 段方向 —— 骨骼几何与 anim 一致，但尺度差 100×

- 段**方向**（归一化）：上臂 out-vs-anim 2.18~2.49°，前臂 **0°** —— 骨骼链几何方向与 anim 一致
- 段**长度**：out 上臂 0.201 vs anim 13.999；out 前臂 0.143 vs anim 10.693 —— **anim 骨架是模型 100× 放大**（anim Hips y≈75，模型 y≈0.74）
- 各骨 |Δpos| 52~75 单位 = 纯尺度差（位置 walk 用模型 bind 局部偏移，模型保持自身尺度，正确）

结论：位置 walk 与 animQ 是**自洽**的（方向一致、模型自身尺度），**骨骼链几何不是扭曲来源**。

### Q7：CPU 蒙皮（补充验证，非门禁）

- 网格确实被骨骼矩阵蒙皮驱动：右手区域 320 顶点、手部质心 bind→out 位移 2.8 单位；前臂段方向 bind-vs-out 变化 133~148°（A-pose→Idle 下垂，属正常姿态运动）
- 左手区域 dominant 骨匹配 0 顶点（权重较分散），质心计算无效——**提示顶点级断言应改用「相对骨局部漂移」而非「dominant 骨质心」**
- 由于 anim 骨架（33 骨/100× 尺度）无法直接蒙皮模型网格，顶点级断言只能「输出 vs 帧校正参考」，不能「输出 vs anim 蒙皮」

### Q8：帧校正目标 —— 断言 gap 的实锤 🔴

**正确 retarget 的蒙皮一致性条件**：模型骨骼看到的相对旋转 = 动画骨骼看到的相对旋转，即

```
worldQ_out(b,t) · bindQ_model(b)⁻¹  ≡  animQ(b,t) · animBindQ(b)⁻¹
⇔ worldQ_out(b,t) = animQ(b,t) · animBindQ(b)⁻¹ · bindQ_model(b)   （帧校正公式）
```

V8 输出的是 **raw `animQ(b,t)`**，缺了因子 `animBindQ⁻¹·bindQ_model`（模型 bind 帧与 Mixamo rest 帧的调和）。实测：

| 骨骼 | out-vs-corrected(°) | out-vs-anim(°) | bindFrameDelta(°) |
|---|---|---|---|
| LeftShoulder | **115.75** | 0.02 | 115.75 |
| LeftArm | **146.04** | 0.00 | 146.04 |
| LeftForeArm | **137.64** | 0.00 | 137.64 |
| LeftHand | **136.98** | 0.02 | 136.98 |
| RightShoulder | **119.63** | 0.01 | 119.63 |
| RightArm | **99.01** | 0.01 | 99.01 |
| RightForeArm | **99.16** | 0.00 | 99.16 |
| RightHand | **98.97** | 0.03 | 98.97 |

**V8 输出偏离正确 retarget 99~146°**（8 骨全部 MISMATCH），而相对 raw anim 只有 0~0.03°。

---

## 明确结论

### ① V8 是否生效
**代码层面生效**（Q1 最大 0.03° < 5°，手臂骨 worldQ 确实取到了动画世界朝向）。
**但方案本身错误**：V8 把「动画骨架的绝对世界朝向」直接塞给模型骨骼，丢失了模型 bind 帧与 Mixamo rest 帧之间的调和（bindFrameDelta 99~146°）。躯干/腿用的是 `bindWorldQ·deltaLocalQ`（等价于帧校正公式），**只有手臂走了 raw animQ 这条不一致的路径**——这与兄弟「只有手臂扭曲」的视觉完全吻合。

### ② 断言 gap 的具体几何量
**能区分「视觉扭曲」与「断言通过」的量 = 蒙皮相对旋转（relative-to-bind rotation）**：

```
gap 量 = angle( worldQ_out(b) · bindQ_model(b)⁻¹ ,  animQ(b,t) · animBindQ(b)⁻¹ )
```

- V8 实现：worldQ=raw animQ → gap = angle(animQ·bindQ⁻¹, animQ·animBindQ⁻¹) = **bindFrameDelta = 99~146°**（应该≈0）
- 现有 S13（twist vs anim）与兄弟建议的「掌心法线/肘弯平面/段方向 **vs anim**」全部失效，因为它们**对比的是输出与 raw anim**，而 V8 恰好把输出设成 raw anim → 恒 0°。**参考系必须是「帧校正后的目标」，不是「被拷贝的对象」。**

### ③ 下一步 BDD 断言建议（按贴近视觉程度排序）

1. **蒙皮相对旋转断言（骨级、最核心、实现成本低）** — 新增 S14：
   - 对 8 根手臂骨：`angle(worldQ_out·bindQ_model⁻¹, animQ·animBindQ⁻¹) < 10°`
   - 数据可得：bindQ_model（转换后播放前捕获）、animBindQ（animObj 播放前 rest 捕获）、animQ（animObj t=0）、worldQ_out（现有 samples）
   - V8 实测 99~146°，阈值 10° 可稳抓；正确 retarget 应≈0°
   - **同时**：保留并修正 S13，但参考系从「raw anim」改为「帧校正目标」的 twist 分量

2. **蒙皮顶点断言（最贴近视觉，成本中等）** — 新增 S15：
   - CPU 蒙皮模型网格（Q7 已验证可行），采样手部/前臂区域顶点
   - 对比「输出骨骼矩阵蒙皮」vs「帧校正目标骨骼矩阵蒙皮」的顶点位置（同一网格、同一 bind，可直接算 |Δv|）
   - 建议阈值：手部区域顶点平均 |Δv| < 模型尺度 1%（模型高 ~1.7 单位 → <0.017）或最大 <5%；若用区域质心，阈值 <0.05
   - ⚠️ 实现注意：不要用 dominant 骨质心（左手 dominant 匹配 0 顶点），用「相对骨局部坐标漂移」或「全部顶点平均位移」

3. **骨级掌心/肘弯方向断言（在 1 已覆盖的前提下可省略）**：
   - 掌心法线 / 肘弯平面法线 **必须对比帧校正目标**（`animQ·animBindQ⁻¹·bindQ` 派生的法线），对比 raw anim 无意义
   - 若实现 1，2 可替代；阈值可沿用：掌心法线 <15°、肘弯平面 <15°

4. **关键纪律**：所有「贴近视觉」断言，参考系必须是 **`animQ(b,t)·animBindQ(b)⁻¹·bindQ_model(b)`（帧校正公式）**，绝不能是 `animQ(b,t)`（被拷贝对象）。这是本轮探针最重要、最可复用的教训。

---

## 附：探针文件结构（Q1-Q8）

- `probe-v9-diag.test.ts`：Node polyfill + FBXLoader + `convertTripoToMixamo` + `normalizeRootMotion` + `AnimationMixer` 采样 t=0，capture bind / animRest / anim / out 四个状态
- Q1 逐骨 |Δquat|；Q2 SkinnedMesh 遍历；Q3 palmNormal（Hand local 轴 ⊥ 手指方向，签号朝身体中线）；Q4 肘弯平面法线 n=d1×d2；Q5 swing-twist（相对 anim，用各状态段轴）；Q6 逐骨位置/段方向/段长；Q7 CPU 蒙皮（顶点位置 + 区域质心 + 局部漂移）；Q8 帧校正公式对比
- 未修改 `src/`、`test/step-definitions/`、`test/features/`、`doc/`、`笔记/` 任何文件
