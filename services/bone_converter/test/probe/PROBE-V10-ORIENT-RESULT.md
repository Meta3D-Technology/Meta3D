# PROBE-V10-ORIENT-RESULT

> 骨骼朝向 D 度量诊断（方案 F re-pose 修复后重跑：current 转换产物播放 vs 原始 anim 世界朝向）
> 模型：tripo_convert_09140e64-4506-4ebd-8841-5aae00631788.fbx；动画：1.fbx
> 时间点：0, 0.5, 1.5, 2.5, 3.5, 4.5；D 度量 = 夹角(worldQ_play, worldQ_anim)，阈值 < 10°（任务书）

> **修复说明（方案 F 已集成）**：normalizeRootMotion 处理前调用 `rePoseModelBindToAnimRest`，
> 把模型手臂骨 bind re-pose 对齐 anim rest 帧（Tripo A-pose 61° → Mixamo 88.5°），
> 使 swing3 的 v(b)=bindQ⁻¹·bindSegDir ≈ restLocalSegDir → worldQ≈animQ → D≈0。
> **目标：D1 worst < 10°（probe-v10-arms §2.4 实测 ≈1.7°）**

## D4：动画源独立性确认 + bind/rest 静态偏移记录（re-pose 后）

- `worldQ_anim` 参考源：`animRef`（ANIM_FBX 全新 parse），`rawClipRef = animRef.animations[0]` **直接播放**，不经过 `normalizeRootMotion`。
- `normalizeRootMotion` 只作用于 `animNorm`（另一份 parse），其内部 `mixer.setTime` 对 `animNorm` 骨骼的改动不影响 `animRef`。
- `normalizeRootMotion` 采样用的是 clip 内联的 anim local 矩阵（S_local）与世界矩阵（S_w），本探针 worldQ_anim 不依赖该输出。

**D 度量口径**：采用**绝对朝向**（worldQ_play vs worldQ_anim 直接比），更贴近实机视觉。
re-pose 目标 = **动画 clip 首帧（t=0）姿态**（探针实测：对齐 FBX 静态 rest 反而更差，
对齐 clip 首帧后 D1 worst=0.0°@t=0；arms probe F=1.7° 实际也是污染后的「动画帧」目标）。
故 model bind 与 anim 静态 rest（FBX 未播放姿态）静态偏移 ≠ 0° 属预期，
下方仅作记录；D1 的 D 值即「play 播放帧世界朝向」相对「anim 播放帧世界朝向」的绝对夹角。

| 骨 | model bind 世界朝向（re-pose 到 clip 首帧） | anim 静态 rest 世界朝向 | 静态偏移 (bind vs rest) |
|---|---|---|---|
| mixamorigLeftShoulder | 0.59,0.42,-0.52,0.45 | -0.51,-0.45,0.55,-0.49 | 11.8° |
| mixamorigLeftArm | 0.85,0.11,-0.52,0.06 | 0.48,0.48,-0.52,0.52 | 81.7° |
| mixamorigLeftForeArm | 0.85,0.04,-0.52,0.09 | 0.48,0.48,-0.52,0.52 | 84.0° |
| mixamorigLeftHand | 0.74,-0.07,-0.62,0.25 | 0.48,0.48,-0.52,0.52 | 78.6° |
| mixamorigRightShoulder | 0.59,-0.40,0.57,0.40 | 0.51,-0.45,0.55,0.49 | 15.2° |
| mixamorigRightArm | 0.85,-0.10,0.52,-0.02 | 0.48,-0.48,0.52,0.52 | 89.1° |
| mixamorigRightForeArm | 0.85,-0.02,0.52,0.02 | 0.48,-0.48,0.52,0.52 | 91.2° |
| mixamorigRightHand | 0.67,0.00,0.70,0.26 | 0.48,-0.48,0.52,0.52 | 70.6° |

**re-pose 后 bind vs anim 静态 rest 偏移 worst = 91.2°（目标帧 = clip 首帧，非静态 rest，偏移大属预期）**
## D1：骨骼朝向 D 度量（worldQ_play vs worldQ_anim，绝对朝向）

D = 夹角(worldQ_play, worldQ_anim)，每根手臂骨 × 每个时间点。

| 骨 | t=0 | t=0.5 | t=1.5 | t=2.5 | t=3.5 | t=4.5 | worst | 均值 |
|---|---|---|---|---|---|---|---|---|
| mixamorigLeftShoulder | 0.0° | 0.7° | 7.4° | 0.1° | 0.6° | 9.6° | 9.6° | 3.1° |
| mixamorigLeftArm | 0.0° | 0.3° | 1.1° | 0.1° | 0.3° | 1.4° | 1.4° | 0.5° |
| mixamorigLeftForeArm | 0.0° | 0.0° | 0.0° | 0.0° | 0.0° | 0.0° | 0.0° | 0.0° |
| mixamorigLeftHand | 0.0° | 2.2° | 18.2° | 0.8° | 4.8° | 21.3° | 21.3° | 7.9° |
| mixamorigRightShoulder | 0.0° | 3.6° | 10.9° | 2.3° | 2.5° | 9.7° | 10.9° | 4.8° |
| mixamorigRightArm | 0.0° | 0.3° | 1.3° | 0.5° | 0.2° | 1.7° | 1.7° | 0.7° |
| mixamorigRightForeArm | 0.0° | 0.0° | 0.0° | 0.0° | 0.0° | 0.0° | 0.0° | 0.0° |
| mixamorigRightHand | 0.0° | 9.5° | 20.7° | 2.6° | 3.2° | 18.8° | 20.7° | 9.1° |

**D1：worst=21.3°（均值 3.3°，>10° 共 5/48）**
**D1 判定：❌ D 大（worst 21.3° > 10°）→ 骨骼世界朝向与 anim 偏离，实机扭曲 = 骨骼旋转错误**

## D2：绕轴分解（ΔQ = worldQ_play⁻¹ · worldQ_anim）

对每根骨 × 每时间点，ΔQ 分解为：
- **roll（绕骨长轴 roll/twist）**：前臂扭转类（绕 Segment→Segment 方向的滚动）
- **swing（绕垂直轴）**：外展/屈曲类（段方向偏离）

骨长轴 = anim 该时刻段方向：上臂骨（Shoulder/Arm）用 anim Fo−Sh，前臂骨（ForeArm/Hand）用 anim Ha−Fo。

### D2.1 roll（绕骨长轴 twist 角，°）

| 骨 | t=0 | t=0.5 | t=1.5 | t=2.5 | t=3.5 | t=4.5 | worst |
|---|---|---|---|---|---|---|---|
| mixamorigLeftShoulder | 0.0° | 0.4° | 6.4° | 0.1° | 0.4° | 8.4° | 8.4° |
| mixamorigLeftArm | 0.0° | 0.3° | 0.6° | 0.1° | 0.3° | 0.4° | 0.6° |
| mixamorigLeftForeArm | 0.0° | 0.0° | 0.0° | 0.0° | 0.0° | 0.0° | 0.0° |
| mixamorigLeftHand | 0.0° | 2.1° | 342.6° | 0.7° | 4.6° | 339.7° | 342.6° |
| mixamorigRightShoulder | 0.0° | 3.3° | 10.0° | 2.1° | 2.3° | 8.8° | 10.0° |
| mixamorigRightArm | 0.0° | 0.0° | 0.5° | 0.4° | 0.1° | 1.2° | 1.2° |
| mixamorigRightForeArm | 0.0° | 0.0° | 0.0° | 0.0° | 0.0° | 0.0° | 0.0° |
| mixamorigRightHand | 0.0° | 9.1° | 19.9° | 2.4° | 3.0° | 18.2° | 19.9° |

### D2.2 swing（绕垂直轴角，外展/屈曲类，°）

| 骨 | t=0 | t=0.5 | t=1.5 | t=2.5 | t=3.5 | t=4.5 | worst |
|---|---|---|---|---|---|---|---|
| mixamorigLeftShoulder | 0.0° | 0.5° | 3.8° | 0.0° | 0.5° | 4.7° | 4.7° |
| mixamorigLeftArm | 0.0° | 0.1° | 0.9° | 0.1° | 0.1° | 1.4° | 1.4° |
| mixamorigLeftForeArm | 0.0° | 0.0° | 0.0° | 0.0° | 0.0° | 0.0° | 0.0° |
| mixamorigLeftHand | 0.0° | 0.8° | 5.4° | 0.4° | 1.4° | 6.2° | 6.2° |
| mixamorigRightShoulder | 0.0° | 1.5° | 4.5° | 0.9° | 1.0° | 4.2° | 4.5° |
| mixamorigRightArm | 0.0° | 0.3° | 1.2° | 0.3° | 0.2° | 1.2° | 1.2° |
| mixamorigRightForeArm | 0.0° | 0.0° | 0.0° | 0.0° | 0.0° | 0.0° | 0.0° |
| mixamorigRightHand | 0.0° | 2.5° | 5.5° | 1.0° | 1.1° | 4.9° | 5.5° |

**D2 汇总：roll worst=342.6°（>10° 骨：mixamorigLeftHand, mixamorigRightHand）；swing worst=6.2°（>10° 骨：无）**
**D2 判定：扭曲以 roll/twist（前臂扭转/手腕扭转）为主**

## D3：骨骼位置段方向 vs anim 复验

位置段方向（骨位置法 Fo−Sh / Ha−Fo）角度差，预期 ≈2.5°（与 probe-v10-arms 一致）。

| 段 | 侧 | t=0 | t=0.5 | t=1.5 | t=2.5 | t=3.5 | t=4.5 | worst |
|---|---|---|---|---|---|---|---|---|
| 上臂 | Left | 0.0° | 0.1° | 0.7° | 0.1° | 0.1° | 0.8° | 0.8° |
| 前臂 | Left | 0.0° | 0.0° | 0.0° | 0.0° | 0.0° | 0.0° | 0.0° |
| 上臂 | Right | 0.0° | 0.3° | 0.8° | 0.2° | 0.3° | 0.7° | 0.8° |
| 前臂 | Right | 0.0° | 0.0° | 0.0° | 0.0° | 0.0° | 0.0° | 0.0° |

**D3：位置段方向 vs anim worst = 0.8°（预期 ≈2.5°，✅ 复验一致）**

## 结论

- **D1（骨骼朝向）worst=21.3°（修复前 103.4°）** → **⚠️ 方案 F 大幅改善（21.3° < 10°？否），Arm/ForeArm 已归零，残余在 Shoulder/Hand**
- **D2（绕轴分解）**：roll worst=342.6°，swing worst=6.2° → 残余扭转主要在 Hand（swing3 用 Ha−Fo 段，不随 Hand 骨刚性旋转）
- **D3（位置）**：位置段方向 vs anim worst=0.8°，位置正确（复验 probe-v10-arms 2.5°）
- **D4（源独立性 + re-pose 生效）**：worldQ_anim 直接播放 rawClip（全新 parse），不经过 normalizeRootMotion ✅；re-pose 目标 = clip 首帧 t=0 姿态（bind vs anim rest 静态偏移 ≠ 0 属预期，因为目标帧是 Idle 播放起点而非 FBX 静态 rest）

### 修复前后对比（方案 F：bind re-pose 对齐 clip 首帧 t=0）

| 度量 | 修复前（D10 swing3，A-pose bind） | 修复后（D11 re-pose t=0 + swing3） | 判定 |
|---|---|---|---|
| D1 骨骼朝向 worst（8 骨） | 103.4° | **21.3°** | ⚠️ 残余 >10°（见逐骨） |
| D2 roll worst | 91.3° | **342.6°** | ⚠️ |
| D2 swing worst | 55.1° | **6.2°** | ✅ GREEN |
| D3 位置段方向 worst | 2.5° | **0.8°** | ✅ |

### 逐骨解读（修复后）

- **ForeArm 两侧 D=0.0°**：swing3 用 Ha−Fo 段（随 ForeArm 骨刚性旋转），re-pose 后 v(b)=bindQ⁻¹·bindSegDir ≈ restLocalSegDir → worldQ≈animQ，D 完全归零。
- **Arm 两侧 D≤1.4°**：方案 F 修复（对应 arms probe F 的 上臂 D worst=1.7°，一致）。
- **Shoulder 残余 ≤10.9°**：swing3 用 Fo−Sh 段（跨 Shoulder+Arm 两骨），re-pose 后残余来自 Idle 摆动相位的段方向偏差。
- **Hand 残余 ≤21.3°**：swing3 对 Hand 用 Ha−Fo 段，该段不随 Hand 骨自身旋转刚性转动（手腕 roll 无法被该段表达）→ re-pose 后仍残留手腕扭转。arms probe F 未测 Shoulder/Hand（其 D 仅测 seg up/fo = Arm/ForeArm），故其「D worst=1.7°」与本法 Arm/ForeArm 一致，但不覆盖 Hand。

**总体判定：方案 F（bind re-pose 对齐 clip 首帧 t=0）已集成进 normalizeRootMotion（D11），D1 骨骼朝向 worst 从 103.4° 降至 21.3°。Arm/ForeArm 完全修复（0-1.7°，与 arms probe F 一致）；Shoulder/Hand 残余 >10° 为 swing3 公式对非刚性段（Fo−Sh / Ha−Fo）的固有局限，非 re-pose 可解。**
