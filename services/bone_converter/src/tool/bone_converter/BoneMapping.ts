/**
 * bone_converter 骨骼映射表
 *
 * 来源：`笔记/项目文档/changes/2026-08-01-tripo-bone-converter/solution.md` §5.3
 * 校准：
 *  - D2 探针实测 mixamoName（2026-08-01），见 `docs/probe-report.md`
 *  - D3 实测 tripoName（2026-08-01）：以真实原始 Tripo 模型
 *    `demo/tripo_model/tripo_convert_09140e64-4506-4ebd-8841-5aae00631788.fbx`
 *    （41 骨，未过 Mixamo）的实测骨名校准。
 *
 * 已含审核修正：
 *  - 脚趾骨条目 R_ToeBase / L_ToeBase（P2-2）
 *  - 未映射骨白名单制（P0-3，deleteUnmapped=false）
 *
 * ⚠️ 校准记录：
 *  - D3 实测（tripo_model，41 骨）：基础身骨（Root/Hip/Pelvis/Waist/Spine01/Spine02/
 *    NeckTwist01/NeckTwist02/Head/R_L_Clavicle/Upperarm/Forearm/Hand/Thigh/Calf/Foot/ToeBase）
 *    全部在真实模型骨名清单中命中，下方 tripoName 已按实测校准，不再是方案假设。
 *  - **手指骨条目未实测命中**：真实模型无手指骨，R/L_HandIndex1~3 为兼容其他 Tripo 模型保留，
 *    需人工确认命名。
 *  - mixamoName 列**已与动画 FBX 轨道实测数据核对**：全部 22 个基础身骨目标名
 *    在 Idle/Death 动画中均存在对应轨道，无冒号，命名正确。
 *  - Mixamo 动画新增手指轨道：HandIndex1/2/3 → 对应 Tripo 手指导航（D2 追加）。
 */
import { BoneMappingEntry } from './types';

/**
 * 默认映射表：Tripo 骨名 → Mixamo 骨名
 *
 * 说明：
 *  - action='rename' 直接改名
 *  - action='merge' 权重合并到 mergeTarget 对应的骨骼
 *  - action='delete' 删除（如 Root 容器）
 *  - 手指骨已按 D2 探针追加（HandIndex1~3），Twist/发骨/脚趾走白名单
 *
 * 🔍 校准状态：
 *  - mixamoName：✅ 全部目标名已在动画轨道中确认存在（D2）
 *  - tripoName：✅ 基础身骨已按 tripo_model 实测校准（D3）；手指骨条目未实测命中
 */
export const DEFAULT_TRIPO_TO_MIXAMO_MAP: BoneMappingEntry[] = [
    // === 根/髋部 ===
    // ✅ D3 实测：Root/Hip/Pelvis 均在 tripo_model 骨名清单中
    { tripoName: 'Root', mixamoName: '', action: 'delete' },
    { tripoName: 'Hip', mixamoName: 'mixamorigHips', action: 'rename' },
    { tripoName: 'Pelvis', mixamoName: 'mixamorigHips', action: 'merge', mergeTarget: 'mixamorigHips' },
    // === 脊柱 ===
    // ✅ D3 实测：Waist/Spine01/Spine02 均在 tripo_model 中命中（Waist→Spine01→Spine02 层级）
    { tripoName: 'Waist', mixamoName: 'mixamorigSpine', action: 'rename' },
    { tripoName: 'Spine01', mixamoName: 'mixamorigSpine1', action: 'rename' },
    { tripoName: 'Spine02', mixamoName: 'mixamorigSpine2', action: 'rename' },
    // === 颈部 ===
    // ✅ D3 实测：NeckTwist01/NeckTwist02 均在 tripo_model 中命中（NeckTwist01→NeckTwist02 层级）
    { tripoName: 'NeckTwist01', mixamoName: 'mixamorigNeck', action: 'rename' },
    { tripoName: 'NeckTwist02', mixamoName: 'mixamorigNeck', action: 'merge', mergeTarget: 'mixamorigNeck' },
    // === 头部 ===
    { tripoName: 'Head', mixamoName: 'mixamorigHead', action: 'rename' },
    // === 右臂 ===
    { tripoName: 'R_Clavicle', mixamoName: 'mixamorigRightShoulder', action: 'rename' },
    { tripoName: 'R_Upperarm', mixamoName: 'mixamorigRightArm', action: 'rename' },
    { tripoName: 'R_Forearm', mixamoName: 'mixamorigRightForeArm', action: 'rename' },
    { tripoName: 'R_Hand', mixamoName: 'mixamorigRightHand', action: 'rename' },
    // === 左臂 ===
    { tripoName: 'L_Clavicle', mixamoName: 'mixamorigLeftShoulder', action: 'rename' },
    { tripoName: 'L_Upperarm', mixamoName: 'mixamorigLeftArm', action: 'rename' },
    { tripoName: 'L_Forearm', mixamoName: 'mixamorigLeftForeArm', action: 'rename' },
    { tripoName: 'L_Hand', mixamoName: 'mixamorigLeftHand', action: 'rename' },
    // === 右腿 ===
    { tripoName: 'R_Thigh', mixamoName: 'mixamorigRightUpLeg', action: 'rename' },
    { tripoName: 'R_Calf', mixamoName: 'mixamorigRightLeg', action: 'rename' },
    { tripoName: 'R_Foot', mixamoName: 'mixamorigRightFoot', action: 'rename' },
    { tripoName: 'R_ToeBase', mixamoName: 'mixamorigRightToeBase', action: 'rename' },
    // === 左腿 ===
    { tripoName: 'L_Thigh', mixamoName: 'mixamorigLeftUpLeg', action: 'rename' },
    { tripoName: 'L_Calf', mixamoName: 'mixamorigLeftLeg', action: 'rename' },
    { tripoName: 'L_Foot', mixamoName: 'mixamorigLeftFoot', action: 'rename' },
    { tripoName: 'L_ToeBase', mixamoName: 'mixamorigLeftToeBase', action: 'rename' },
    // === 手指（D2 追加：Mixamo 动画含 Index1~3 轨道） ===
    // ⚠️ D3 实测未命中：真实 tripo_model **无手指骨**，以下条目为兼容其他 Tripo 模型保留，
    //    命名基于常见 Tripo 手指模式假设，需人工确认。命中时才会生效，未命中不影响转换。
    { tripoName: 'R_HandIndex1', mixamoName: 'mixamorigRightHandIndex1', action: 'rename' },
    { tripoName: 'R_HandIndex2', mixamoName: 'mixamorigRightHandIndex2', action: 'rename' },
    { tripoName: 'R_HandIndex3', mixamoName: 'mixamorigRightHandIndex3', action: 'rename' },
    { tripoName: 'L_HandIndex1', mixamoName: 'mixamorigLeftHandIndex1', action: 'rename' },
    { tripoName: 'L_HandIndex2', mixamoName: 'mixamorigLeftHandIndex2', action: 'rename' },
    { tripoName: 'L_HandIndex3', mixamoName: 'mixamorigLeftHandIndex3', action: 'rename' },
];

/** 通用 Twist 骨模式（Tripo 的特征性命名）
 *
 * D3 实测（tripo_model, 2026-08-01）：真实 Twist 骨名为
 *   R_UpperarmTwist01 / R_ForearmTwist01 / R_ThighTwist01 / R_CalfTwist01 等，
 *   **Twist 前无下划线**（不是 R_Upperarm_Twist01）。
 * 故第一个模式不要求下划线前缀，兼容有无下划线两种写法。
 *
 * @internal D4 使用（mergeBoneWeights 消费）
 */
export const TWIST_BONE_PATTERNS = [
    /(Twist|twist)\d+$/i, // 兼容 R_UpperarmTwist01 / R_Upperarm_Twist01（D3 实测：无下划线）
    // 被 pattern1 (Twist|twist)\d+$ 覆盖，不独立、优先级低于 pattern1；
    // D4 消费时用 find() 逐个匹配避免同一骨名命中多 pattern。
    /_ForeTwist\d+$/i, // e.g., "R_Forearm_ForeTwist01"
];

/**
 * 默认保留（不算 unmatched、不删除）的未映射骨模式 —— 白名单制（P0-3）
 *
 * 立项动机是「长头发女性模型在 Mixamo 手动绑骨失败」→ 自动转换必须保留头发骨骼。
 * 默认 deleteUnmapped=false，发骨/手指骨/脚趾骨全部保留原名。
 *
 * D2 探针：当前仓库模型（EliteGiantess1/Soldier1）无发骨、无额外手指/脚趾骨。
 * 白名单模式保留以兼容原始 Tripo 模型。
 */
export const DEFAULT_UNMAPPED_KEEP_PATTERNS: RegExp[] = [
    /_Hair.*$/, // 发丝骨，如 Hair_Main / Hair_Strand01
    /_Strand.*$/, // 发束骨
    /.*Finger.*$/, // 手指骨（不确定数量/命名，D2 已覆盖 Index1~3 映射）
    /.*Toe.*$/, // 脚趾骨（除已映射的 *_ToeBase 外）
];
