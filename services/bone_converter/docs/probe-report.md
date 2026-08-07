# D2 探针报告：真实 FBX 骨骼/轨道数据采集与映射表校准

> 日期：2026-08-01
> 探针脚本：`scripts/probe-fbx.ts`
> 输出：`docs/probe-output.json` / `docs/probe-output.txt`
> 状态：✅ 完成

> ## 🚨 注意（D3 追加）
>
> **本报告基于 asset-lib 已转换模型（mixamorig 命名），不代表当前目标模型。**
>
> - D3 起，实际转换目标已切换为 `demo/tripo_model/tripo_convert_09140e64-4506-4ebd-8841-5aae00631788.fbx`
>   （原始 Tripo FBX，41 骨，Tripo 命名，未过 Mixamo）。
> - 因此本报告中的**模型骨骼清单（EliteGiantess1 33 骨 / Soldier1 25 骨，全 mixamorig 命名）
>   不代表当前要转换的原始 Tripo 模型**。
> - **动画轨道数据仍有效**：Mixamo Idle/Death 的轨道骨名（22 基础身骨 + 6 手指骨）仍可作为
>   `mixamoName` 目标名参考，映射表 mixamoName 列即据此校准。

---

## 1. 探针资源

| 类型 | 文件 | 大小 |
|------|------|------|
| 模型（Tripo） | `asset-lib/unit-model/src/asset/elitegiantess/model_EliteGiantess1_lod1.fbx` | 1.9 MB |
| 模型（对比） | `asset-lib/unit-model/src/asset/soldier/model_Soldier1_lod1.fbx` | - |
| 动画（Idle） | `asset-lib/unit-action/src/asset/action/elitegiantess/default/Idle/1.fbx` | 428 KB |
| 动画（Death） | `asset-lib/unit-action/src/asset/action/elitegiantess/default/Death/1.fbx` | 370 KB |

---

## 2. 🚨 关键发现：模型已含 mixamorig 命名

**两个 Tripo 模型 FBX 的骨骼已全部使用 `mixamorig` 前缀命名**，而非方案假设的 `Hip`/`Root`/`Pelvis`/`R_Thigh` 等 Tripo 原始命名。

这意味着：
1. 这些 FBX 文件**可能已经过 Mixamo 自动绑骨处理**，不再保留 Tripo 原始骨名。
2. 对这类模型，`convertTripoToMixamo()` 的**幂等守卫会 early-return**（所有骨名已是 `mixamorig*`），无需任何转换。
3. **原始 Tripo 模型**（含 `Hip`/`Root`/`Pelvis` 等非 mixamorig 命名）的骨名映射仍需验证 —— 当前仓库无此类文件。

### 2.1 EliteGiantess1 模型骨骼清单（33 骨，全 `mixamorig` 前缀）

```
mixamorigHips                                       ← 根骨骼
├── mixamorigLeftUpLeg
│   └── mixamorigLeftLeg
│       └── mixamorigLeftFoot
│           └── mixamorigLeftToeBase
│               └── mixamorigLeftToe_End            ← 末端（无动画轨道）
├── mixamorigRightUpLeg
│   └── mixamorigRightLeg
│       └── mixamorigRightFoot
│           └── mixamorigRightToeBase
│               └── mixamorigRightToe_End           ← 末端（无动画轨道）
├── mixamorigSpine
│   └── mixamorigSpine1
│       └── mixamorigSpine2
│           ├── mixamorigRightShoulder
│           │   └── mixamorigRightArm
│           │       └── mixamorigRightForeArm
│           │           └── mixamorigRightHand
│           │               └── mixamorigRightHandIndex1
│           │                   └── mixamorigRightHandIndex2
│           │                       └── mixamorigRightHandIndex3
│           │                           └── mixamorigRightHandIndex4 ← 末端
│           ├── mixamorigNeck
│           │   └── mixamorigHead
│           │       └── mixamorigHeadTop_End        ← 末端
│           └── mixamorigLeftShoulder
│               └── mixamorigLeftArm
│                   └── mixamorigLeftForeArm
│                       └── mixamorigLeftHand
│                           └── mixamorigLeftHandIndex1
│                               └── mixamorigLeftHandIndex2
│                                   └── mixamorigLeftHandIndex3
│                                       └── mixamorigLeftHandIndex4 ← 末端
```

**关键参数：**
- 骨骼总数：33
- SkinnedMesh 数：1（`tripo_node_dd1cea04`，44670 顶点，28 骨骼）
- skinIndex 范围：[0..27]
- Twist 骨：0 个
- 发骨：0 个
- 手指骨（Index1~4）：8 个（4×2 侧，其中 Index4 为末端）
- 脚趾骨：4 个（ToeBase×2 + Toe_End×2，其中 Toe_End 为末端）
- 末端骨（无动画轨道）：5 个（HeadTop_End, Toe_End×2, HandIndex4×2）

### 2.2 Soldier1 模型骨骼清单（25 骨，全 `mixamorig` 前缀）

```
mixamorigHips
├── mixamorigSpine
│   └── mixamorigSpine1
│       └── mixamorigSpine2
│           ├── mixamorigNeck
│           │   └── mixamorigHead
│           │       └── mixamorigHeadTop_End        ← 末端
│           ├── mixamorigLeftShoulder
│           │   └── mixamorigLeftArm
│           │       └── mixamorigLeftForeArm
│           │           └── mixamorigLeftHand
│           └── mixamorigRightShoulder
│               └── mixamorigRightArm
│                   └── mixamorigRightForeArm
│                       └── mixamorigRightHand
├── mixamorigRightUpLeg
│   └── mixamorigRightLeg
│       └── mixamorigRightFoot
│           └── mixamorigRightToeBase
│               └── mixamorigRightToe_End           ← 末端
└── mixamorigLeftUpLeg
    └── mixamorigLeftLeg
        └── mixamorigLeftFoot
            └── mixamorigLeftToeBase
                └── mixamorigLeftToe_End            ← 末端
```

**关键参数：**
- 骨骼总数：25（无手指骨，无 Twist 骨，无发骨）
- SkinnedMesh 数：1（`tripo_node_14052614`，28569 顶点，22 骨骼）
- skinIndex 范围：[0..21]
- 不同于 EliteGiantess：层级结构中 Spine 子节点包含了 Shoulder/Neck（都在 Spine2 下），而 EliteGiantess 的 Shoulder/Neck 在 Spine2 下

---

## 3. 动画轨道分析

### 3.1 Mixamo Idle / Death 动画轨道清单

两个动画文件结构完全一致：

| 统计 | 值 |
|------|-----|
| AnimationClip 数 | 1 |
| 轨道总数 | 29 |
| 去重骨骼名数 | 28 |
| 含冒号 | ❌ 否（全部无冒号，确认方案根因①） |
| 基础身骨（非手指）| 22 |
| 手指轨道 | 6（Index1~3 × 2 侧）|
| 仅 position 轨道的骨骼 | Hips（含 position + quaternion 两条轨道）|

### 3.2 动画轨道骨骼名（去重后 28 个）

**基础身骨（22 个）：**
```
mixamorigHips          mixamorigSpine          mixamorigSpine1
mixamorigSpine2        mixamorigNeck           mixamorigHead
mixamorigLeftShoulder  mixamorigLeftArm        mixamorigLeftForeArm
mixamorigLeftHand      mixamorigLeftUpLeg      mixamorigLeftLeg
mixamorigLeftFoot      mixamorigLeftToeBase
mixamorigRightShoulder mixamorigRightArm       mixamorigRightForeArm
mixamorigRightHand     mixamorigRightUpLeg     mixamorigRightLeg
mixamorigRightFoot     mixamorigRightToeBase
```

**手指骨（6 个）：**
```
mixamorigLeftHandIndex1   mixamorigLeftHandIndex2   mixamorigLeftHandIndex3
mixamorigRightHandIndex1  mixamorigRightHandIndex2  mixamorigRightHandIndex3
```

**末端骨（5 个，无动画轨道）：**
```
mixamorigHeadTop_End
mixamorigLeftToe_End    mixamorigRightToe_End
mixamorigLeftHandIndex4 mixamorigRightHandIndex4
```

---

## 4. 映射表校准结果

### 4.1 mixamoName 目标名验证

映射表中全部 22 个基础身骨的 `mixamoName` 目标名均已在动画轨道中确认存在：

| 映射表条目 | mixamoName | 动画轨道中存在？ |
|-----------|-----------|:---:|
| Hip → Hips | `mixamorigHips` | ✅ |
| Waist → Spine | `mixamorigSpine` | ✅ |
| Spine01 → Spine1 | `mixamorigSpine1` | ✅ |
| Spine02 → Spine2 | `mixamorigSpine2` | ✅ |
| NeckTwist01/02 → Neck | `mixamorigNeck` | ✅ |
| Head → Head | `mixamorigHead` | ✅ |
| R_Clavicle → RightShoulder | `mixamorigRightShoulder` | ✅ |
| R_Upperarm → RightArm | `mixamorigRightArm` | ✅ |
| R_Forearm → RightForeArm | `mixamorigRightForeArm` | ✅ |
| R_Hand → RightHand | `mixamorigRightHand` | ✅ |
| L_Clavicle → LeftShoulder | `mixamorigLeftShoulder` | ✅ |
| L_Upperarm → LeftArm | `mixamorigLeftArm` | ✅ |
| L_Forearm → LeftForeArm | `mixamorigLeftForeArm` | ✅ |
| L_Hand → LeftHand | `mixamorigLeftHand` | ✅ |
| R_Thigh → RightUpLeg | `mixamorigRightUpLeg` | ✅ |
| R_Calf → RightLeg | `mixamorigRightLeg` | ✅ |
| R_Foot → RightFoot | `mixamorigRightFoot` | ✅ |
| R_ToeBase → RightToeBase | `mixamorigRightToeBase` | ✅ |
| L_Thigh → LeftUpLeg | `mixamorigLeftUpLeg` | ✅ |
| L_Calf → LeftLeg | `mixamorigLeftLeg` | ✅ |
| L_Foot → LeftFoot | `mixamorigLeftFoot` | ✅ |
| L_ToeBase → LeftToeBase | `mixamorigLeftToeBase` | ✅ |

**结论：全部 22 个目标名 100% 匹配。命名无误，无冒号。**

### 4.2 tripoName 输入名状态

| 状态 | 说明 |
|------|------|
| ⚠️ 未实测验证 | 当前仓库中两个模型 FBX 均使用 `mixamorig` 命名（可能已过 Mixamo 自动绑骨），无法获取原始 Tripo 骨名（`Hip`/`Root`/`Pelvis`/`R_Thigh` 等）|
| 📋 基于方案假设 | 现有 `tripoName` 条目来自 solution.md §5.3 的假设命名，等待原始 Tripo 模型到达后验证 |

### 4.3 D2 追加条目

基于动画轨道实测，新增 **6 条手指骨映射**：

| tripoName（假设） | mixamoName（实测确认） | action |
|-------------------|----------------------|--------|
| R_HandIndex1 | `mixamorigRightHandIndex1` | rename |
| R_HandIndex2 | `mixamorigRightHandIndex2` | rename |
| R_HandIndex3 | `mixamorigRightHandIndex3` | rename |
| L_HandIndex1 | `mixamorigLeftHandIndex1` | rename |
| L_HandIndex2 | `mixamorigLeftHandIndex2` | rename |
| L_HandIndex3 | `mixamorigLeftHandIndex3` | rename |

### 4.4 剩余差异（方案假设 vs 探针实测）

| 方案假设 | 探针实测 | 影响 |
|---------|---------|------|
| Tripo 骨名格式：`Hip`/`Root`/`Pelvis` | 模型已是 `mixamorig*` | 映射表 tripoName 未验证 |
| Tripo 有 Twist 骨（`*_Twist01/02`） | 模型无 Twist 骨 | TWIST_BONE_PATTERNS 保留备用 |
| Tripo 有发骨（`*_Hair*`/`*_Strand*`） | 模型无发骨 | UNMAPPED_KEEP_PATTERNS 保留备用 |
| Mixamo ~41 轨道 | 实际 29 轨道（28 骨） | 手指轨道少于预期（仅 Index1~3，无 Thumb/Pinky） |
| 层级：Root→Hip→Pelvis 三层 | 单根 `mixamorigHips` | 层级重组逻辑仍需（对原始 Tripo 模型） |
| Neck 双骨骼（NeckTwist01/02） | 单骨骼 `mixamorigNeck` | 映射保留 merge 条目备用 |
| Spine 命名：`Waist/Spine01/Spine02` | `Spine/Spine1/Spine2` | 映射目标名差异？（已在模型中使用 mixamorig 命名） |

---

## 5. 对 D3 的影响

### 5.1 不变

- **映射表 target 100% 正确**：所有 `mixamoName` 目标名在动画中确认存在，D3 `renameBones` 可直接使用。
- **冒号问题确认修复方向正确**：动画轨道无冒号，转换后骨名也应无冒号。
- **手指骨映射已补全**：D3 可以处理 HandIndex1~3 的转换。

### 5.2 待定

- **原始 Tripo 骨名仍需验证**：需获取未经 Mixamo 处理的原始 Tripo FBX（含 `Hip`/`Root`/`Pelvis` 等命名），否则映射表 `tripoName` 无法最终校准。
- **Twist 骨处理逻辑**：当前模型无 Twist 骨，`mergeBoneWeights` 的 Twist 合并逻辑需在获取原始 Tripo 模型后验证。
- **发骨保留逻辑**：当前模型无发骨，`UNMAPPED_KEEP_PATTERNS` 白名单效果需在获取含发骨模型后验证。

### 5.3 无需调整

- 层级重组（`restructureHierarchy`）逻辑：虽然当前模型已是单根 `mixamorigHips`，但原始 Tripo 模型仍可能有 `Root→Hip→Pelvis` 三层，重组逻辑保留。
- `fixSkinningIndices`：当前模型 skinIndex 已在有效范围 [0..27]（28 骨骼），转换后若删除骨骼，`fixSkinningIndices` 仍需执行。
- 幂等守卫：对已含 `mixamorig` 命名的模型，early-return 是正确行为。

---

## 6. 探针脚本说明

`scripts/probe-fbx.ts` 是一个可复用的 Node.js 探针工具：

```bash
# 运行（需 Node.js 24+）
cd packages/bone_converter
npx tsx scripts/probe-fbx.ts

# 输出
docs/probe-output.json  # 机器可读 JSON（含完整骨名/轨道/层级）
docs/probe-output.txt   # 人类可读文本（骨骼树 + 轨道清单）
```

**技术要点：**
- 使用 Three.js 0.159.0 内置 `FBXLoader` 直接 parse FBX binary（不走网络加载）
- Node.js 环境需 polyfill `window`/`document`/`Image`（FBXLoader 依赖 Three.js 的 `ImageLoader` 处理嵌入纹理）
- 支持模型 FBX（提取骨骼层级、SkinnedMesh、skinIndex）和动画 FBX（提取 AnimationClip tracks）
- 可轻松扩展探测更多模型/动画文件
