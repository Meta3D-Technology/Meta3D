/**
 * normalizeRootMotion — Mixamo 动画轨道世界空间 rest-pose 对齐 retarget
 *
 * 背景（Bug 根因）：Mixamo 动画的轨道保存的是**动画自身骨架坐标系下的绝对
 * 变换**，参考系是动画导出时原骨架（Mixamo 标准骨架）的 rest pose。而转换后
 * 的 Tripo 骨架绑定姿态与 Mixamo rest pose 对每个骨骼都有差异（探针实测）：
 *   - Hips 绑定旋转 ≈ 89°，动画首帧 ≈ identity
 *   - Spine bind→动画首帧偏差 132°，左右肩 172~174°，左右臂 86~92°，
 *     左右大腿 73~77°（Mixamo rest 是 A/T-pose，与 Tripo 绑定姿态不同）
 * AnimationMixer 播放时会**整体覆盖**每个骨骼的 local transform，导致：
 *   1. Hips.position 被覆盖成 (3.0, 58.2, -0.4) → 骨架瞬移 ~58 单位飞出视锥
 *   2. 所有骨骼被覆盖成动画绝对帧 → 角色脱离自身绑定姿态，躯干前倾 43°、
 *      姿态扭曲（截图分析确认「前倾/躺平感」）
 *
 * D5 第四版（本文件）：**Hips 级世界姿态对齐 retarget —— 变体 B**。
 *
 * 前几版缺陷回顾：
 *   - v2：每根骨骼乘自己的 T_bind_w(bone)（模型 bind 世界矩阵），转 local 时
 *     T_bind(parent)⁻¹·T_bind(bone) ≠ 恒等，把模型 bind 姿态（Tripo A-pose
 *     61°）混进每根骨骼的 local → t=0 模型完全显示模型 bind（A-pose），动画
 *     第一帧（手臂 24° 自然下垂）被丢弃。
 *   - v3（变体 A）：R = T_bind_w(Hips)·S_rest_w(Hips)⁻¹ 统一对齐 + copy 骨架
 *     （identity rest）采样 S_w → 丢失 Mixamo rest，模型显示模型自身 rest
 *     （Tripo A-pose 61°），S4 实测 arm Left=62.76° Right=26.87° 仍错。
 *
 * 变体 B（本版，probe-q4 实测正确）：
 *   **S_w 必须从原始动画骨架（animSkeleton，FBXLoader parse 后骨骼含 Mixamo
 *   静态 rest 位置/旋转）采样，不是 copy 骨架（identity rest）**。
 *
 *   - 根骨骼 Hips：local = parentWorldInv · S_w(Hips,t)（不再乘 R），位置锁
 *     bind 防 drift → Hips world = 动画 Hips 姿态（Idle 近直立）
 *   - 非根骨骼：local = S_local(anim)（= S_w(parent)⁻¹·S_w(bone)，动画真实
 *     局部变换，含 Mixamo rest 效果）
 *
 * 效果（probe-q4 实测）：
 *   - 模型完全显示动画姿态（Mixamo Idle 自然站姿：Hips 近直立、手臂
 *     Left=23.82°/Right=18.10° 下垂），Hips 位置锁 bind 防漂移 ✅
 *   - 骨骼相对 Hips 摆动保留（ForeArm ~6°、Head ~2.9°、Spine ~0.55°、
 *     UpLeg ~0.97°）✅
 *
 * D7 第七轮（本文件）：**手臂链物理方向对齐**（修复 V6-final 左臂前臂内旋/反折）。
 * 探针实锤根因：anim 骨架（Mixamo 33 骨）手臂骨骼 localY 沿手臂方向，而模型
 * （Tripo convert 后 22 骨）手臂骨骼 localZ 沿手臂方向——两套骨架轴约定差 90°。
 * V6-final 手臂链（Shoulder/Arm/ForeArm/Hand）直接取 anim 世界朝向，等于把 anim 的
 * localY 约定强加给模型 localZ 约定 → 手臂骨相对模型 bind 帧出现 ~78-145° 滚动
 * （左肩 127°/左臂 145°，右臂较轻），网格前臂内旋/反折（双角度截图 + Kimi 确认）。
 *
 * D7 修复：手臂骨不再抄 anim 世界朝向，改为 **R(t)·bindWorldQ(b)**：
 *   - R(t) = anim 手臂段物理方向（anim 骨架世界位置 Shoulder→ForeArm / ForeArm→Hand）
 *     相对模型 bind 手臂方向的最短旋转（每侧上臂/前臂分别计算）
 *   - bindWorldQ(b) 保留模型 bind 相对帧 → 无内旋/滚动；手臂随动画方向自然下垂+摆动
 * 躯干/腿仍走 bindWorldQ·deltaLocalQ（不变）。S13 新增手臂链滚动角断言
 * （左肩 156.26°→~0°）。
 *
 * D8 第八轮（本文件）：**手臂骨直接取动画世界朝向（animQ）**。
 * 循环论证实锤（probe-arm-roll-r8 + probe-v8-diag）：D7 的 R(t) = setFromUnitVectors
 * 只对齐段方向（2 自由度），绕段轴的滚动（第 3 自由度）仍来自 bind 帧（bindWorldQ
 * 未分解）；模型 bind（Tripo）手臂滚动 ≠ Mixamo Idle 滚动 → Kimi 双角度截图仍判左臂
 * 前臂内旋/掌心朝后。且 D7 笔记「模型手臂骨骼 localZ 沿手臂」被 probe-r8 的
 * foreArmLocalXYZ_world 实测推翻——模型与 anim 手臂骨 localY 均沿手臂段方向，两套骨架
 * 轴约定一致。故手臂骨 worldQ = animQ（S_w 提取的动画世界四元数）：twist 即动画滚动、
 * 段方向也跟随动画。任务书 swing-twist 公式（R_seg·R_twistΔ·bindWorldQ）经 probe-v8-diag
 * 实测为 twist 无操作（thOut≡θ_bind，任何绕段轴 twist 与 bindWorldQ 组合都不改 twist），弃用。
 * S13 断言改为对比 anim 滚动（消除循环论证），阈值 20°。
 *
 * D9 第九轮（本文件）：**手臂路径帧校正**（修复 V8 视觉扭曲）。
 * V8 手臂骨 worldQ = raw animQ（S_w 动画世界朝向），丢掉了模型 bind 帧 ↔ Mixamo rest 帧的
 * 调和。probe-v9-diag Q8 实锤：输出偏离正确 retarget 99~146°（8 骨全 MISMATCH），而相对 raw
 * anim 仅 0~0.03°——所有「对比 raw anim」断言恒过，S13 V8 版 37/37 全绿但实机仍扭曲。
 * 修复：手臂骨改为**帧校正公式** worldQ_out(b,t) = animQ·animBindQ⁻¹·bindQ_model，
 *   其中 animBindQ 在播放前捕获（animBindWorldQ）。躯干/腿的 bindWorldQ·deltaLocalQ 路径
 *   与帧校正等价，不动。S14/S15 断言对比帧校正目标（V8 下 99~146° 真实 RED，修复后 ≈0° GREEN）。
 *
 * D10 第十轮（本文件）：**swing3 方向/滚动双修正**（修复 V9 手臂外展过度，probe-v10 实锤）。
 * V9 帧校正公式只保「相对自身 bind 的旋转」，不保「绝对朝向」：模型 bind（Tripo A-pose）与
 * 动画 rest（Mixamo T-pose）世界朝向差 ~99~146°（bind 段方向 vs rest 段方向差 ~88~92°），
 * 帧校正的相对旋转叠在 A-pose 上 → 蒙皮手臂外展过度（probe Q3 mesh L95~99/R74~78 vs anim
 * 34/30，dev 41~64°；S16 24 项全 RED）。且 bind/rest 帧差与动画真实滚动（掌心朝向）不匹配，
 * 纯方向修正（D7 setFromUnitVectors）或纯帧校正（V9）都会在某自由度上错。
 *
 * D10 手臂世界朝向 = Twist·Swing（推导见下方世界朝向循环内注释）：
 *   方向：Swing 把模型 bind 局部段方向转到动画当前段方向（dev=0，S16 全绿）
 *   滚动：Twist 保留动画绕段轴的真实 twist（rollVsAnim=0，防掌心朝后）
 *   位置：仍走 poseQ（raw animQ），S4/S13 位置断言不断
 *
 * 参数：
 *   - animSkeleton：原始动画 FBX 骨架（THREE.Group），可选。传入时走变体 B；
 *     不传时回退到旧实现（copy 骨架 + R 统一对齐），保证无骨架调用点可用。
 *
 * 幂等：根骨骼 position 轨道已是 bind 常量（已归一化特征）时原样返回。
 */
import * as THREE from 'three';
import { rePoseModelBindToAnimRest } from './reposeModelBind';

/** 从轨道名提取骨骼名（去 .position/.quaternion/.scale 后缀） */
function trackBoneName(trackName: string): string {
    return trackName.replace(/\.(position|quaternion|scale)$/, '');
}

/**
 * Shoemake swing-twist：世界四元数 q 绕世界单位轴 axis 的 twist（滚动）角（度）。
 * ⚠️ 必须用**原始 q.w**：twist 角 = 2·atan2(|q_imag·axis|, q.w)。若先 normalize 再取 tw.w
 * （S13 旧实现），主导 swing 的四元数（q.w ≪ |q_imag|）角度会被压缩失真（探针实测：
 * 真值 135.4° 被误测成 ~53°）。w<0 时翻转符号，保证返回值落在 (-180, 180]。
 */
function twistAroundQ(q: THREE.Quaternion, axis: THREE.Vector3): number {
    const v = new THREE.Vector3(q.x, q.y, q.z);
    const dot = v.dot(axis);
    const twistVec = axis.clone().multiplyScalar(dot);
    const ang = 2 * Math.atan2(twistVec.length(), Math.abs(q.w)) * 180 / Math.PI;
    return ang * (q.w >= 0 ? 1 : -1) * (dot >= 0 ? 1 : -1);
}

/**
 * 归一化动画 clip 中所有被骨骼驱动的轨道（世界空间 rest-pose 对齐）
 * @param clip 原始 AnimationClip（不改原对象，返回新 clip）
 * @param root 模型根节点，用于按名称查找骨骼、读取绑定世界变换
 * @param animSkeleton 原始动画 FBX 骨架（含 Mixamo 静态 rest）。可选；
 *        传入时 S_w 从它采样（变体 B），不传时回退旧实现（copy 骨架）
 * @returns 归一化后的新 AnimationClip；无任何骨骼轨道时原样返回
 */
export function normalizeRootMotion(
    clip: THREE.AnimationClip,
    root: THREE.Object3D,
    animSkeleton?: THREE.Object3D,
): THREE.AnimationClip {
    // 建立 boneName → Bone 索引
    const boneByName = new Map<string, THREE.Bone>();
    root.traverse((node) => {
        if ((node as THREE.Bone).isBone) boneByName.set(node.name, node as THREE.Bone);
    });
    if (boneByName.size === 0) return clip;

    // 骨架根骨骼：parent 不是 Bone 的骨骼（Tripo 转换后即 mixamorigHips）。
    const rootBoneName: string | null = (() => {
        for (const [name, b] of boneByName) {
            const parent = b.parent;
            if (!parent || !(parent as THREE.Bone).isBone) return name;
        }
        return null;
    })();

    // 幂等守卫：根骨骼 position 轨道已是 bind 常量（上一版/本版归一化的特征），直接返回
    if (rootBoneName) {
        const rootPosTrack = clip.tracks.find((t) => t.name === rootBoneName + '.position');
        if (rootPosTrack) {
            const values = (rootPosTrack as THREE.VectorKeyframeTrack).values as Float32Array;
            const bind = boneByName.get(rootBoneName)!.position;
            const stride = 3;
            let constantBind = true;
            for (let j = 0; j < values.length; j += stride) {
                if (Math.abs(values[j] - bind.x) > 1e-4 || Math.abs(values[j + 1] - bind.y) > 1e-4 || Math.abs(values[j + 2] - bind.z) > 1e-4) {
                    constantBind = false;
                    break;
                }
            }
            if (constantBind) return clip;
        }
    }

    // ── 方案 F（D11）：bind re-pose 对齐动画 clip 首帧（t=0）──
    // 根因（probe-v10-orient D1 实锤）：模型 bind（Tripo A-pose 61°）与动画首帧姿态帧差大
    // → swing3 的 v(b)=bindQ⁻¹·bindSegDir ≠ anim 局部段方向 → Shoulder/Arm/Hand 绝对朝向
    // 偏离 anim 29~103°（D1 worst=103.4°）。
    //
    // ⚠️ 目标帧的选择（探针实测）：
    //   - re-pose 到 FBX 静态 rest（未播放 clip 的骨架姿态）→ D1 反而变差（Arm 62°）。
    //     原因：swing3 的参考是「clip 各采样时刻」的 anim 姿态，不是静态 rest。
    //   - re-pose 到 clip 首帧（t=0，mixer.setTime(0) 后的姿态）→ D1 worst=0.0°（8 骨全 <10°）。
    //   - arms probe F（D worst=1.7°）实际测的是**污染后的 animObj**（C/D variant 的 mixer
    //     把它停在 t=4.5，偏离 true rest 80.5°）——恰好近似「动画帧」，故其 1.7° 与
    //     「re-pose 到动画帧」一致；re-pose 到 true 静态 rest 会得到 62°。
    //   结论：方案 F 的 re-pose 目标 = **动画 clip 首帧（t=0）姿态**。
    //
    // 只 re-pose 手臂 8 骨，躯干/腿走 bindWorldQ·deltaLocalQ 路径不受影响。
    // 必须在 root.updateMatrixWorld(true) 与 bindWorld 采样**之前**执行，使
    // bindWorld/bindWorldQ/bindSegDir 全部基于 re-pose 后的新 bind 帧。
    // 幂等守卫已在前：已是归一化产物的 clip 直接返回，不会重复 re-pose。
    if (animSkeleton) {
        // 保存 animSkeleton 静态 rest 局部变换（re-pose 目标驱动后还原，
        // 保证后续 animRestLocal 采样仍是静态 rest，躯干/腿 deltaLocalQ 语义不变）
        const animBoneNodes = new Map<string, THREE.Bone>();
        animSkeleton.traverse((n) => {
            if ((n as THREE.Bone).isBone) animBoneNodes.set(n.name, n as THREE.Bone);
        });
        const savedLocal = new Map<string, { p: THREE.Vector3; q: THREE.Quaternion; s: THREE.Vector3 }>();
        for (const [name, b] of animBoneNodes) {
            savedLocal.set(name, { p: b.position.clone(), q: b.quaternion.clone(), s: b.scale.clone() });
        }
        // 驱动 animSkeleton 到 clip 首帧 t=0 作为 re-pose 目标
        const poseMixer = new THREE.AnimationMixer(animSkeleton);
        const poseAction = poseMixer.clipAction(clip);
        poseAction.reset();
        poseAction.play();
        poseMixer.setTime(0);
        animSkeleton.updateMatrixWorld(true);
        rePoseModelBindToAnimRest(root, animSkeleton);
        // 还原 animSkeleton 静态 rest
        for (const [name, b] of animBoneNodes) {
            const s = savedLocal.get(name);
            if (s) {
                b.position.copy(s.p);
                b.quaternion.copy(s.q);
                b.scale.copy(s.s);
            }
        }
        animSkeleton.updateMatrixWorld(true);
    }

    // ---- T_bind_w：模型当前骨骼世界变换（bind pose） ----
    root.updateMatrixWorld(true);
    const bindWorld = new Map<string, THREE.Matrix4>();
    for (const [name, b] of boneByName) bindWorld.set(name, b.matrixWorld.clone());

    // 收集被动画驱动的骨骼及各自属性轨道
    const drivenBones = new Set<string>();
    const hasPos = new Set<string>();
    const hasQuat = new Set<string>();
    const hasScale = new Set<string>();
    for (const t of clip.tracks) {
        const bn = trackBoneName(t.name);
        drivenBones.add(bn);
        if (t.name.endsWith('.position')) hasPos.add(bn);
        else if (t.name.endsWith('.quaternion')) hasQuat.add(bn);
        else if (t.name.endsWith('.scale')) hasScale.add(bn);
    }
    const drivenInModel = Array.from(drivenBones).filter((bn) => boneByName.has(bn));
    if (drivenInModel.length === 0) return clip;

    // 所有关键帧时间点并集（含 t=0），用于采样和构建完整时间轨道
    const timeSet = new Set<number>([0]);
    for (const t of clip.tracks) for (const tm of t.times) timeSet.add(tm);
    const times = Array.from(timeSet).sort((a, b) => a - b);

    // ---- S_w / S_local：采样源选择 ----
    // 变体 B（animSkeleton 传入）：从原始动画骨架采样，骨骼含 Mixamo 静态 rest；
    // 回退（未传）：copy 骨架（identity rest）+ R 统一对齐的旧实现。
    const useAnimSkeleton = !!animSkeleton;
    const S_w = new Map<string, THREE.Matrix4[]>();
    const S_local = new Map<string, THREE.Matrix4[]>();
    /** 动画静态 rest 局部矩阵（不施加 clip，捕获于 mixer 运行前），变体 B 计算 delta 用 */
    const animRestLocal = new Map<string, THREE.Matrix4>();
    /**
     * V9（D9）：动画骨架播放前（rest）世界朝向 —— 帧校正公式的 animBindQ。
     * 捕获于 mixer 运行前（animSkeleton 尚未被 clip 驱动），供手臂骨帧校正用。
     */
    const animBindWorldQ = new Map<string, THREE.Quaternion>();

    if (useAnimSkeleton) {
        // 原始动画骨架骨骼索引（FBXLoader parse 后骨骼 local = Mixamo 静态 rest）
        const animBone = new Map<string, THREE.Bone>();
        animSkeleton!.traverse((n) => {
            if ((n as THREE.Bone).isBone) animBone.set(n.name, n as THREE.Bone);
        });
        // 采样集合 = 模型骨骼 ∩ 动画骨架骨骼（含未驱动但作为 parent 的骨骼，
        // 保证非根骨骼计算 S_w(parent)⁻¹·S_w(bone) 时 parent world 可查）
        const sampleNames = Array.from(boneByName.keys()).filter((bn) => animBone.has(bn));
        if (sampleNames.length === 0) return clip;
        for (const bn of sampleNames) {
            S_w.set(bn, []);
            S_local.set(bn, []);
        }

        // 动画静态 rest 局部矩阵（不施加 clip，捕获于 mixer 运行前）。
        // clip 首帧 ≠ 静态 rest（Mixamo Idle 首帧即下垂姿态，静态 rest 是 A/T-pose 外展），
        // 因此 delta = rest⁻¹·animLocal 在 t=0 非恒等，模型显示动画 Idle 姿态而非自身 bind。
        animSkeleton!.updateMatrixWorld(true);
        for (const bn of sampleNames) {
            const ab = animBone.get(bn)!;
            animRestLocal.set(bn, ab.matrix.clone());
            // V9（D9）：同步捕获 rest 世界朝向（帧校正公式的 animBindQ）
            animBindWorldQ.set(bn, new THREE.Quaternion().setFromRotationMatrix(ab.matrixWorld));
        }

        // 用完整 clip 驱动原始动画骨架（其骨骼含 Mixamo rest，轨道名与之同名绑定）
        const mixer = new THREE.AnimationMixer(animSkeleton!);
        const action = mixer.clipAction(clip);
        action.reset();
        action.play();

        for (const tm of times) {
            mixer.setTime(tm);
            animSkeleton!.updateMatrixWorld(true);
            for (const bn of sampleNames) {
                const ab = animBone.get(bn)!;
                S_w.get(bn)!.push(ab.matrixWorld.clone());
                S_local.get(bn)!.push(ab.matrix.clone());
            }
        }
    } else {
        // ---- 回退：copy 骨架（identity rest）+ R 统一对齐（旧实现） ----
        const copyRoot = new THREE.Group();
        const copyBone = new Map<string, THREE.Bone>();
        const topBones: THREE.Bone[] = [];
        for (const b of boneByName.values()) {
            const parent = b.parent;
            if (!parent || !(parent as THREE.Bone).isBone) topBones.push(b);
        }
        function cloneBone(src: THREE.Bone, parent: THREE.Object3D): void {
            const c = new THREE.Bone();
            c.name = src.name;
            parent.add(c);
            copyBone.set(src.name, c);
            for (const child of src.children) {
                if ((child as THREE.Bone).isBone) cloneBone(child as THREE.Bone, c);
            }
        }
        for (const tb of topBones) cloneBone(tb, copyRoot);
        copyRoot.updateMatrixWorld(true);

        const mixer = new THREE.AnimationMixer(copyRoot);
        const filteredTracks = clip.tracks.filter((t) => drivenBones.has(trackBoneName(t.name)) && boneByName.has(trackBoneName(t.name)));
        const filteredClip = new THREE.AnimationClip(clip.name, clip.duration, filteredTracks);
        const action = mixer.clipAction(filteredClip);
        action.reset();
        action.play();

        for (const tm of times) {
            mixer.setTime(tm);
            copyRoot.updateMatrixWorld(true);
            for (const bn of drivenInModel) {
                const cb = copyBone.get(bn);
                if (!cb) continue;
                if (!S_w.has(bn)) {
                    S_w.set(bn, []);
                    S_local.set(bn, []);
                }
                S_w.get(bn)!.push(cb.matrixWorld.clone());
                S_local.get(bn)!.push(cb.matrix.clone());
            }
        }
    }

    // ---- 构建新轨道：每骨骼一条轨道、含全部关键帧时间点 ----
    // 变体 B（D6，探针实测）：V6-final 无扭曲 retarget
    //   worldQ(b,t) = 手臂(含肩) → anim 世界朝向（Idle 下垂 23°）
    //                躯干/腿 → bindWorldQ(b) · deltaLocalQ(b,t)
    //   deltaLocalQ(b,t) = quat(animRestLocal(b)⁻¹ · S_local(b,t))：动画相对静态 rest 的旋转 delta
    //                      （clip 首帧 ≠ 静态 rest，t=0 即显示动画 Idle 姿态）
    //   worldPos(b,t) = bind 链刚性 walk（段长保 bind，防拉丝），根锚定 bind
    //   local = parentWorld⁻¹ · world
    // 回退（无 animSkeleton）：旧实现（copy 骨架 + R 统一对齐）
    const newTracks: THREE.KeyframeTrack[] = [];
    const tmpA = new THREE.Matrix4();
    const pos = new THREE.Vector3();
    const quat = new THREE.Quaternion();
    const scale = new THREE.Vector3();
    const mTmp2 = new THREE.Matrix4();
    const vTmp2 = new THREE.Vector3();
    // D10 swing3 手臂临时量
    const vTmp3 = new THREE.Vector3();
    const posB = new THREE.Vector3();
    const posC = new THREE.Vector3();
    const swingTmp = new THREE.Quaternion();
    const twistTmp = new THREE.Quaternion();

    if (useAnimSkeleton) {
        // 手臂链（含肩）：模型 bind 手臂 61° ≠ anim rest 手臂 88.5°，delta 叠加在 bind 帧
        // 会转错方向（外展 74°），需直接取动画 Idle 世界朝向（下垂 23°）。躯干/腿 Idle 几乎不动，
        // delta ≈ identity → 保持 bind（骨盆/脊柱不被扭转，S12）。
        const ARM_BONES = new Set([
            'mixamorigLeftShoulder', 'mixamorigLeftArm', 'mixamorigLeftForeArm', 'mixamorigLeftHand',
            'mixamorigRightShoulder', 'mixamorigRightArm', 'mixamorigRightForeArm', 'mixamorigRightHand',
        ]);
        // V11 腿修复（Plan C）：腿骨 worldPos 直接用 anim 世界位置（相对根锚定），
        // 消除「bindLocalPos 用模型骨长」与 anim 骨长的差异（探针实测模型腿骨 0.207m
        // 与 anim 腿骨差异放大 → 左膝 126° Z-fold、LeftToeBase 离地 0.088~0.251）。
        const LEG_BONES = new Set([
            'mixamorigLeftUpLeg', 'mixamorigLeftLeg', 'mixamorigLeftFoot', 'mixamorigLeftToeBase',
            'mixamorigRightUpLeg', 'mixamorigRightLeg', 'mixamorigRightFoot', 'mixamorigRightToeBase',
        ]);
        // V11.1（v3.0）：躯干链改用 S_w 直取（与 Hips/legs 同一模式），消除
        // bindWorldQ·deltaLocalQ 的参考系错配（delta 基准 static rest vs bind 基准 re-pose 目标）。
        const TORSO_CHAIN = new Set([
            'mixamorigSpine', 'mixamorigSpine1', 'mixamorigSpine2',
            'mixamorigNeck', 'mixamorigHead',
        ]);
        // bind 世界/局部参考
        const bindWorldQ = new Map<string, THREE.Quaternion>();
        const bindWorldPos = new Map<string, THREE.Vector3>();
        const bindLocalPos = new Map<string, THREE.Vector3>();
        for (const [bn, b] of boneByName) {
            bindWorldQ.set(bn, new THREE.Quaternion().setFromRotationMatrix(b.matrixWorld));
            bindWorldPos.set(bn, b.getWorldPosition(new THREE.Vector3()));
            bindLocalPos.set(bn, b.position.clone());
        }
        // deltaLocalQ(b,t) = quat(animRestLocal(b)⁻¹ · S_local(b,t))
        const sampleBones = Array.from(animRestLocal.keys());
        const deltaLocalQ = new Map<string, THREE.Quaternion[]>();
        for (const bn of sampleBones) {
            deltaLocalQ.set(bn, []);
            for (let i = 0; i < times.length; i++) {
                const l = S_local.get(bn)![i];
                if (!l) { deltaLocalQ.get(bn)!.push(new THREE.Quaternion()); continue; }
                tmpA.copy(animRestLocal.get(bn)!).invert().multiply(l);
                quat.setFromRotationMatrix(tmpA);
                deltaLocalQ.get(bn)!.push(quat.clone());
            }
        }
        // 层级
        const parentOf = new Map<string, THREE.Bone | null>();
        const childrenOf = new Map<string, string[]>();
        for (const [bn, b] of boneByName) {
            const p = b.parent;
            parentOf.set(bn, p && (p as THREE.Bone).isBone ? p as THREE.Bone : null);
        }
        for (const [bn, b] of boneByName) {
            const pp = b.parent;
            if (pp && (pp as THREE.Bone).isBone) {
                if (!childrenOf.has(pp.name)) childrenOf.set(pp.name, []);
                childrenOf.get(pp.name)!.push(bn);
            }
        }
        const localPositions: Record<string, number[]> = {};
        const localQuats: Record<string, number[]> = {};
        for (const bn of drivenInModel) { localPositions[bn] = []; localQuats[bn] = []; }
        const worldQ = new Map<string, THREE.Quaternion>();
        const worldPos = new Map<string, THREE.Vector3>();
        const identityQ = new THREE.Quaternion();

        for (let i = 0; i < times.length; i++) {
            // worldQ：手臂 = 帧校正公式（D9）；根骨骼 = 动画世界旋转 S_w（V11 阶段 2）；
            // 躯干/腿 = bindWorldQ·deltaLocalQ
            for (const bn of sampleBones) {
                if (ARM_BONES.has(bn)) {
                    // D10（本文件）：**swing3 公式**修复 V9 手臂外展过度（probe-v10-formula 实锤）。
                    // V9 帧校正公式 worldQ = animQ·animBindQ⁻¹·bindQ 只保「相对自身 bind 的旋转」，
                    // 不保「绝对朝向」：模型 bind（Tripo A-pose）与动画 rest（Mixamo T-pose）世界
                    // 朝向差 ~99~146°（bind 段方向 vs rest 段方向差 ~88~92°），帧校正把相对旋转
                    // 叠在 A-pose 上 → 蒙皮手臂外展过度（mesh L95~99/R74~78 vs anim 34/30，
                    // dev 41~64°，S16 24 项全 RED）。
                    // 正确 retarget 需要同时满足两个独立约束：
                    //   ① 方向：渲染段方向 = 动画段方向（S16，|meshDir−animDir| < 20°）
                    //   ② 滚动：绕段轴的 twist = 动画真实 twist（防掌心朝后，rollVsAnim ≈ 0）
                    // 构造（世界朝向 = Twist·Swing）：
                    //   v(b)    = bindQ(b)⁻¹ · bindSegDir_world      （bind 局部段方向）
                    //   Swing   = 最短旋转(v → animSegDir(t))          （方向修正；轴 ⊥ animDir
                    //             → 对 twist 无贡献）
                    //   roll    = twist(animQ(b,t), animSegDir(t))      （动画真实滚动）
                    //   Twist   = 绕 animSegDir(t) 转 roll
                    //   worldQ  = Twist · Swing
                    // 验证：meshDir = worldQ·bindQ⁻¹·bindDir = Swing·v = animDir → dev=0；
                    //   twist(worldQ, animDir) = roll（2·atan2(cos(β/2)sin(α/2),cos(α/2)cos(β/2))
                    //   = α，Twist·Swing 两旋转轴垂直故 twist 可加）→ rollVsAnim=0。
                    // 位置仍走 poseQ（raw animQ，下方不变），S4/S13 位置断言不断。
                    const side: 'Left' | 'Right' = bn.includes('Left') ? 'Left' : 'Right';
                    const segIsFo = bn.includes('ForeArm') || bn.includes('Hand');
                    const shName = `mixamorig${side}Shoulder`;
                    const foName = `mixamorig${side}ForeArm`;
                    const haName = `mixamorig${side}Hand`;
                    // bind 段方向（模型 bind 世界系）：上臂 = Shoulder→ForeArm，前臂 = ForeArm→Hand
                    const bindSegDir = segIsFo
                        ? bindWorldPos.get(haName)!.clone().sub(bindWorldPos.get(foName)!)
                        : bindWorldPos.get(foName)!.clone().sub(bindWorldPos.get(shName)!);
                    // v = bindQ(bn)⁻¹ · bindSegDir（bind 局部段方向）
                    vTmp3.copy(bindSegDir).applyQuaternion(bindWorldQ.get(bn)!.clone().invert()).normalize();
                    // 动画 t 时刻段方向（S_w 矩阵分解出世界位置）
                    pos.setFromMatrixPosition(S_w.get(foName)![i]);
                    posB.setFromMatrixPosition(S_w.get(shName)![i]);
                    posC.setFromMatrixPosition(S_w.get(haName)![i]);
                    const animSegDir = (segIsFo ? posC.clone().sub(pos) : pos.clone().sub(posB)).normalize();
                    swingTmp.setFromUnitVectors(vTmp3, animSegDir);
                    quat.setFromRotationMatrix(S_w.get(bn)![i]);      // animQ(b,t)
                    const roll = twistAroundQ(quat, animSegDir);
                    twistTmp.setFromAxisAngle(animSegDir, roll * Math.PI / 180);
                    quat.copy(twistTmp).multiply(swingTmp);           // worldQ(b,t) = Twist · Swing
                } else if (bn === rootBoneName) {
                    // V11 阶段 2（probe-stage2-hips 实锤）：根骨骼（Hips）世界朝向直接取动画
                    // 世界旋转 S_w(bn,t)，不再叠加模型 bind 帧。
                    // 原实现走通用分支 worldQ = bindWorldQ(bn)·deltaLocalQ(bn,t)，把模型坐标系
                    // bind 旋转（Tripo Hips euler(-0.42,0.56,0.56)）叠进播放帧 → ⑤实测=④预测
                    // =(-0.39,0.48,0.54)，Hips 歪转 32°。S_w 是变体 B 从 animSkeleton 采样的
                    // 真实动画世界矩阵（Mixamo rest 已在其中），t=0 即动画首帧近直立。
                    const mw = S_w.get(bn)?.[i];
                    if (mw) {
                        quat.setFromRotationMatrix(mw);
                    } else {
                        const bq0 = bindWorldQ.get(bn) || identityQ;
                        quat.copy(bq0);
                    }
                } else if (LEG_BONES.has(bn)) {
                    // V11 腿修复：腿骨 worldQ 直接用 anim 世界旋转 S_w（同 Hips 根策略），
                    // 消除通用分支 bindWorldQ·deltaLocalQ 的「模型 bind 帧 × anim 局部增量」
                    // 参考系错配（探针实锤：play0 左膝 126° Z-fold，UpLeg→Leg 段 Z=-0.183
                    // 而 Leg→Foot 段 Z=+0.2206 → 大腿后甩/小腿前折）。S_w 直接取 anim 世界旋转，
                    // 与 Mixamo rest 帧一致，膝盖弯折跟随动画真实方向。
                    const mw = S_w.get(bn)?.[i];
                    if (mw) {
                        quat.setFromRotationMatrix(mw);
                    } else {
                        const bq0 = bindWorldQ.get(bn) || identityQ;
                        quat.copy(bq0);
                    }
                } else if (TORSO_CHAIN.has(bn)) {
                    // V11.1（v3.0）：躯干链 worldQ 直接用动画世界旋转 S_w（同 Hips/legs 策略）。
                    // 原通用分支 worldQ = bindWorldQ·deltaLocalQ 存在参考系错配：bindWorldQ 以
                    // re-pose 目标（clip t=0）为基准，deltaLocalQ 以 static rest（A/T-pose）为
                    // 基准，两基准不一致 → 躯干/头/手臂相对根节点残留旋转误差。S_w 直接取动画
                    // 世界矩阵（Mixamo rest 已含其中），与 Mixamo 参考系完全一致。
                    const mw = S_w.get(bn)?.[i];
                    if (mw) {
                        quat.setFromRotationMatrix(mw);
                    } else {
                        const bq0 = bindWorldQ.get(bn) || identityQ;
                        quat.copy(bq0);
                    }
                } else {
                    const bq = bindWorldQ.get(bn) || identityQ;
                    const dq = deltaLocalQ.get(bn)![i];
                    quat.copy(bq).multiply(dq);
                }
                worldQ.set(bn, quat.clone());
            }
            // 未参与 delta 的模型骨骼：worldQ = bind 世界朝向
            for (const [bn, b] of boneByName) {
                if (!worldQ.has(bn)) worldQ.set(bn, new THREE.Quaternion().setFromRotationMatrix(b.matrixWorld));
            }
            // D9：位置 walk 用 poseQ（手臂 = raw animQ，其余 = worldQ）。
            // 关键调和（probe-v9-arm-dir 实锤）：帧校正朝向会让手臂段横摆（Shoulder→ForeArm
            // 相对竖直向下 97°，而 anim 实际 34°）—— 因为模型 bind 手臂帧与 anim rest 帧差
            // 99~146°，delta·bindQ 把 bind 手臂转到 anim-rest 方向的 A-pose。若 walk 也用它，
            // S4/S13 方向断言必挂。故**位置跟随 raw animQ（V8，段方向 out-vs-anim 0~2.5°，
            // probe-v9-diag Q6）**、**蒙皮朝向跟随 swing3（worldQ）**：位置链保证关节落点
            // 贴近动画（S4/S13/S16 位置断言），朝向链保证蒙皮方向正确。D10.1 曾试「位置也
            // 用 worldQ」—— 剪切角归零但位置偏离动画 22°（Shoulder/Arm），S4/S13 回归失败，
            // 故回退 poseQ（锚定动画位置，探针实测位置法方向 dev 0-2.5°）。
            const poseQ = new Map<string, THREE.Quaternion>();
            for (const bn of sampleBones) {
                if (ARM_BONES.has(bn)) {
                    quat.setFromRotationMatrix(S_w.get(bn)![i]);      // raw animQ（位置跟随动画）
                    poseQ.set(bn, quat.clone());
                } else {
                    poseQ.set(bn, worldQ.get(bn)!);
                }
            }
            for (const [bn] of boneByName) {
                if (!poseQ.has(bn)) poseQ.set(bn, worldQ.get(bn) || identityQ);
            }
            // worldPos：bind 链刚性 walk，根锚定 bind
            worldPos.set(rootBoneName!, bindWorldPos.get(rootBoneName!)!.clone());
            const stack: string[] = [rootBoneName!];
            while (stack.length) {
                const bn = stack.pop()!;
                const pq = poseQ.get(bn) || worldQ.get(bn) || identityQ;
                const pp = worldPos.get(bn)!;
                for (const c of childrenOf.get(bn) || []) {
                    vTmp2.copy(bindLocalPos.get(c)!).applyQuaternion(pq).add(pp);
                    worldPos.set(c, vTmp2.clone());
                    stack.push(c);
                }
            }
            // 转 local
            for (const bn of drivenInModel) {
                const b = boneByName.get(bn)!;
                const parent = parentOf.get(bn);
                let localM: THREE.Matrix4;
                if (parent) {
                    const pPos = worldPos.get(parent.name)!;
                    const pQ = worldQ.get(parent.name) || identityQ;
                    mTmp2.compose(pPos, pQ, new THREE.Vector3(1, 1, 1)).invert();
                    localM = new THREE.Matrix4().compose(worldPos.get(bn)!, worldQ.get(bn)!, new THREE.Vector3(1, 1, 1)).premultiply(mTmp2);
                } else {
                    const pNode = b.parent;
                    const pInv = pNode ? pNode.matrixWorld.clone().invert() : new THREE.Matrix4().identity();
                    localM = new THREE.Matrix4().compose(worldPos.get(bn)!, worldQ.get(bn)!, new THREE.Vector3(1, 1, 1)).premultiply(pInv);
                }
                localM.decompose(pos, quat, scale);
                localPositions[bn].push(pos.x, pos.y, pos.z);
                localQuats[bn].push(quat.x, quat.y, quat.z, quat.w);
            }
            worldQ.clear();
            worldPos.clear();
        }
        for (const bn of drivenInModel) {
            newTracks.push(new THREE.VectorKeyframeTrack(bn + '.position', times, new Float32Array(localPositions[bn])));
            newTracks.push(new THREE.QuaternionKeyframeTrack(bn + '.quaternion', times, new Float32Array(localQuats[bn])));
        }
    } else {
        // ---- 回退：copy 骨架（identity rest）+ R 统一对齐（旧实现） ----
        // 回退路径的 R
        const R = new THREE.Matrix4();
        const rootRest = rootBoneName ? S_w.get(rootBoneName)?.[0] : undefined;
        if (rootBoneName && rootRest) {
            R.copy(bindWorld.get(rootBoneName)!).multiply(rootRest.clone().invert());
        } else {
            R.identity();
        }

        for (const bn of drivenInModel) {
            const bone = boneByName.get(bn)!;
            const isRoot = bn === rootBoneName;
            // 根骨骼的 local 相对模型实际父节点（Armature Group），需去掉祖先链偏移
            const rootParentWorldInv = isRoot
                ? bone.parent
                    ? bone.parent.matrixWorld.clone().invert()
                    : new THREE.Matrix4().identity()
                : null;

            const positions: number[] = [];
            const quats: number[] = [];
            const scales: number[] = [];

            for (let i = 0; i < times.length; i++) {
                let local: THREE.Matrix4;
                if (isRoot) {
                    tmpA.copy(R).multiply(S_w.get(bn)![i]);
                    local = tmpA.clone().premultiply(rootParentWorldInv!);
                } else {
                    const animLocal = S_local.get(bn)?.[i];
                    if (!animLocal) continue;
                    local = animLocal.clone();
                }
                local.decompose(pos, quat, scale);
                if (isRoot) {
                    // 根骨骼 position 锁 bind（防 root drift）
                    pos.set(bone.position.x, bone.position.y, bone.position.z);
                }
                positions.push(pos.x, pos.y, pos.z);
                quats.push(quat.x, quat.y, quat.z, quat.w);
                scales.push(scale.x, scale.y, scale.z);
            }

            if (hasPos.has(bn) || isRoot) {
                newTracks.push(new THREE.VectorKeyframeTrack(bn + '.position', times, new Float32Array(positions)));
            }
            if (hasQuat.has(bn)) {
                newTracks.push(new THREE.QuaternionKeyframeTrack(bn + '.quaternion', times, new Float32Array(quats)));
            }
            if (hasScale.has(bn)) {
                newTracks.push(new THREE.VectorKeyframeTrack(bn + '.scale', times, new Float32Array(scales)));
            }
        }
    }

    if (newTracks.length === 0) {
        return clip;
    }
    return new THREE.AnimationClip(clip.name, clip.duration, newTracks);
}
