/**
 * reposeModelBind — 方案 F：bind re-pose 对齐 anim rest 帧
 *
 * 根因（probe-v10-orient D1 实锤）：normalizeRootMotion 的 swing3 手臂公式
 *   v(b)    = bindQ(b)⁻¹ · bindSegDir_world      （模型 bind 局部段方向）
 *   Swing   = 最短旋转(v → animSegDir(t))
 *   worldQ  = Twist · Swing
 * 模型 bind（Tripo A-pose，手臂 61°）与动画 rest（Mixamo 88.5°）帧差大，
 * v(b) ≠ anim rest 局部段方向 → Shoulder/Arm/Hand 绝对朝向偏离 anim 29~103°
 * （probe-v10-orient D1 worst=103.4°，均值 46.1°，36/48 > 10°）。
 *
 * 修复：在处理前把模型手臂骨 bind 重设到 anim rest 帧，使
 *   v(b) = bindQ(b)⁻¹ · bindSegDir ≈ restLocalSegDir
 * → swing3 从正确的 rest 局部段方向出发 → worldQ ≈ animQ → D≈0
 * （probe-v10-arms §2.4 实测：同骨架同参考源仅换 bind 帧即 103.4° → 1.7°）。
 *
 * 实现：对 Left/Right 各 4 骨（Shoulder/Arm/ForeArm/Hand）：
 *   - 计算 anim rest 世界位置/朝向（animSkeleton 播放前捕获）
 *   - 模型手臂骨重排：Shoulder 保持，Arm/ForeArm/Hand 沿 rest 段方向
 *     （restUp/restFo）按模型原骨长重排（nSh/nAr/nFo/nHa）
 *   - 每骨 local = parent⁻¹ · (nPos, restQ) 转 local position/quaternion
 * 只 re-pose 手臂 8 骨，躯干/腿不动（它们走 bindWorldQ·deltaLocalQ 路径，不受影响）。
 * re-pose 后 model.updateMatrixWorld(true) + 所有 SkinnedMesh skeleton.calculateInverses()
 * （重建 boneInverse 跟随新 bind 帧）。
 *
 * 幂等性：重排量全部来自 anim rest 帧（restPos/restQ），与模型当前 bind 无关；
 * 重复调用会把已 re-pose 的模型再次对齐到同一 anim rest 帧，结果不变。
 *
 * V11（D12，probe-v11-skin 实锤）：re-pose 后必须**重绑定蒙皮顶点**，否则「骨骼对 / 顶点错」。
 * 根因：re-pose 改了骨骼 matrixWorld（到 anim 帧）又 calculateInverses()（boneInverse 重建跟随
 * 新 bind 帧），但 geometry position attribute 仍是原始 Tripo A-pose 顶点坐标 → 骨骼处于新 bind 帧时
 * boneMat = matrixWorld_new × boneInverse_new = I → 蒙皮输出 = bindMatrix⁻¹·bindMatrix·v = 原始 A-pose 顶点，
 * 蒙皮纹丝不动（probe S1 偏移 0.000000），骨骼却已下垂（S2 74.3°）→ 实机「骨骼对、蒙皮错」。
 * 修复：re-pose 后把顶点从旧 bind 帧变换到新 bind 帧（方向 A）：
 *   v_new = bindMatrix⁻¹ · Σ w_i · matrixWorld_new(bone_i) · boneInverse_old(bone_i) · bindMatrix · v_old
 * 再写回 position attribute；随后 calculateInverses() 用新 matrixWorld 重建 boneInverse。
 */
import * as THREE from 'three';

/** 每侧手臂骨（Mixamo 命名） */
const SIDE_ARM_BONES = ['Shoulder', 'Arm', 'ForeArm', 'Hand'] as const;

/**
 * 判断 mesh.skeleton 是否处于「官方 TransformLink 帧」模式（V12.4）。
 * convert 链路（index.ts step 8.7）把官方 lod2 的 boneInverse 注入 skeleton 后，
 * boneInverse 不再自洽：bone.matrixWorld · boneInverse ≠ I（FBX TransformLink 绑定帧
 * 与 rest 帧不同，同名骨 maxDiff=6.031）。自洽帧（convert 重建骨架 calculateInverses）
 * 则恰好 = I。
 * @param mesh 已转换 + applyOfficialBoneInverses 的 SkinnedMesh（或纯 convert 自洽帧）
 */
function isOfficialFrameMode(mesh: THREE.SkinnedMesh): boolean {
    const sk = mesh.skeleton;
    if (!sk) return false;
    const probe = new THREE.Matrix4();
    const I = new THREE.Matrix4();
    for (let i = 0; i < sk.bones.length; i++) {
        const b = sk.bones[i];
        const inv = sk.boneInverses[i];
        if (!b || !inv) continue;
        probe.copy(b.matrixWorld).multiply(inv);
        const e = probe.elements;
        const ie = I.elements;
        let maxDev = 0;
        for (let k = 0; k < 16; k++) {
            const d = Math.abs(e[k] - ie[k]);
            if (d > maxDev) maxDev = d;
        }
        if (maxDev > 1e-3) return true;
    }
    return false;
}

/**
 * 把蒙皮顶点从旧 bind 帧变换到新 bind 帧（方向 A，V11）。
 * 旧 boneInverse（re-pose 前捕获）与 re-pose 后 matrixWorld 组合成旧帧→新帧的
 * 逐骨刚性变换，顶点按权重插值后写回 position attribute。
 * @param mesh 目标 SkinnedMesh（position/skinIndex/skinWeight 同几何体）
 * @param oldBoneInverse re-pose 前捕获的 skeleton.boneInverses（与 skeleton.bones 同序）
 */
function rebindSkinVertices(mesh: THREE.SkinnedMesh, oldBoneInverse: THREE.Matrix4[]): void {
    const geom = mesh.geometry;
    const posAttr = geom.getAttribute('position') as THREE.BufferAttribute;
    const idxAttr = geom.getAttribute('skinIndex') as THREE.BufferAttribute;
    const wgtAttr = geom.getAttribute('skinWeight') as THREE.BufferAttribute;
    const sk = mesh.skeleton;
    if (!posAttr || !idxAttr || !wgtAttr || !sk) return;
    const bmFwd = mesh.bindMatrix;
    const bmInv = mesh.bindMatrix.clone().invert();
    const pos = posAttr.array as Float32Array;
    const idx = idxAttr.array as Uint16Array | Uint32Array;
    const wgt = wgtAttr.array as Float32Array;
    const n = posAttr.count;
    const vBind = new THREE.Vector3();
    const skinVertex = new THREE.Vector3();
    const acc = new THREE.Vector3();
    const tmp = new THREE.Vector3();
    const boneMat = new THREE.Matrix4();
    for (let i = 0; i < n; i++) {
        vBind.fromArray(pos, i * 3);
        skinVertex.copy(vBind).applyMatrix4(bmFwd); // bindMatrix × v_old
        acc.set(0, 0, 0);
        for (let k = 0; k < 4; k++) {
            const w = wgt[i * 4 + k];
            if (w === 0) continue;
            const bi = idx[i * 4 + k];
            const bone = sk.bones[bi];
            const inv = oldBoneInverse[bi];
            if (!bone || !inv) continue;
            boneMat.copy(bone.matrixWorld).multiply(inv); // matrixWorld_new × boneInverse_old
            tmp.copy(skinVertex).applyMatrix4(boneMat);
            acc.addScaledVector(tmp, w);
        }
        acc.applyMatrix4(bmInv); // bindMatrix⁻¹ × skinned
        pos[i * 3] = acc.x;
        pos[i * 3 + 1] = acc.y;
        pos[i * 3 + 2] = acc.z;
    }
    posAttr.needsUpdate = true;
}

/**
 * 把模型手臂骨 bind re-pose 对齐到 anim rest 帧（方案 F）。
 * 副作用：原地修改 model 手臂 8 骨的 local position/quaternion，重绑定蒙皮顶点
 * （旧 bind 帧 → 新 bind 帧），并重建所有 SkinnedMesh 的 skeleton boneInverse。
 * @param model 已转换（convertTripoToMixamo）的模型根节点
 * @param animSkeleton 原始动画骨架（FBXLoader parse 后，尚未被 clip 驱动）
 */
export function rePoseModelBindToAnimRest(model: THREE.Object3D, animSkeleton: THREE.Object3D): void {
    const boneByName = new Map<string, THREE.Bone>();
    model.traverse((n) => {
        if ((n as THREE.Bone).isBone) boneByName.set(n.name, n as THREE.Bone);
    });
    const animBone = new Map<string, THREE.Bone>();
    animSkeleton.traverse((n) => {
        if ((n as THREE.Bone).isBone) animBone.set(n.name, n as THREE.Bone);
    });
    animSkeleton.updateMatrixWorld(true);
    model.updateMatrixWorld(true);
    // V11：re-pose 前捕获旧 bind 帧 boneInverse（skeleton.bones 顺序 = skinIndex 索引）
    // V12.4：官方帧模式判定必须在【re-pose 前】捕获点执行——re-pose 把骨骼转到 anim t=0 帧，
    // 该帧恰好与官方 TransformLink bind 帧一致 → matrixWorld·boneInverse≈I，re-pose 后判定
    // 会误判为「自洽帧」而走旧的 rebind+calculateInverses 路径（=v11g 陷阱 un 14990→14303）。
    const skinnedMeshes: THREE.SkinnedMesh[] = [];
    const oldBoneInverses = new Map<THREE.SkinnedMesh, THREE.Matrix4[]>();
    const officialFrameFlags = new Map<THREE.SkinnedMesh, boolean>();
    model.traverse((n) => {
        if ((n as THREE.SkinnedMesh).isSkinnedMesh) {
            const m = n as THREE.SkinnedMesh;
            if (m.skeleton) {
                skinnedMeshes.push(m);
                oldBoneInverses.set(m, m.skeleton.boneInverses.map((mi) => mi.clone()));
                // re-pose 前判定：此时 matrixWorld = convert 输出 rest 帧，与 TransformLink 不同
                officialFrameFlags.set(m, isOfficialFrameMode(m));
            }
        }
    });
    const restPos = new Map<string, THREE.Vector3>();
    const restQ = new Map<string, THREE.Quaternion>();
    for (const [bn, ab] of animBone) {
        restPos.set(bn, ab.getWorldPosition(new THREE.Vector3()));
        restQ.set(bn, new THREE.Quaternion().setFromRotationMatrix(ab.matrixWorld));
    }
    // V11 阶段 2（probe-stage2-hips / tmp-stage2-diag 实锤）：根骨骼（Hips）+ 躯干链 + 腿链
    // bind 世界旋转对齐动画首帧（t=0）。
    // 根因：模型 Hips bind 世界旋转 euler(-0.42,0.56,0.56)（-24°,32°,32°）保留模型坐标系
    // 旋转；躯干/腿局部原本补偿该倾斜（Spine 世界近直立），只 re-pose Hips 会把整链转歪
    // （tmp-stage2-diag D：Spine 偏离 60°、LeftUpLeg 45°）。故整链一起对齐动画首帧：
    //   每骨 worldQ = animSkeleton 同骨 t=0 世界旋转（S_w，Mixamo rest 已含其中），
    //   local  = 新父世界Q⁻¹ · 该骨目标世界Q（只改旋转，位置锁模型 bind，不抄动画尺度位置）。
    // 手臂 8 骨仍走下方专用 re-pose（位置沿 anim 段方向重排），worldQ 目标同为 anim t=0，
    // 两者不冲突（手臂 worldQ = 父链新世界 · local = animQ，与重排前一致）。
    const TORSO_LEG_CHAIN = [
        'mixamorigHips', 'mixamorigSpine', 'mixamorigSpine1', 'mixamorigSpine2',
        'mixamorigNeck', 'mixamorigHead', 'mixamorigHeadTop_End',
        'mixamorigLeftUpLeg', 'mixamorigLeftLeg', 'mixamorigLeftFoot', 'mixamorigLeftToeBase',
        'mixamorigRightUpLeg', 'mixamorigRightLeg', 'mixamorigRightFoot', 'mixamorigRightToeBase',
    ];
    const torsoWorldQ = new Map<string, THREE.Quaternion>();
    for (const bn of TORSO_LEG_CHAIN) {
        const bone = boneByName.get(bn);
        const animB = animBone.get(bn);
        if (!bone || !animB) continue;
        const targetQ = new THREE.Quaternion().setFromRotationMatrix(animB.matrixWorld);
        const parent = bone.parent;
        let localQ: THREE.Quaternion;
        if (parent && torsoWorldQ.has(parent.name)) {
            localQ = torsoWorldQ.get(parent.name)!.clone().invert().multiply(targetQ);
        } else {
            const pQ = parent ? new THREE.Quaternion().setFromRotationMatrix(parent.matrixWorld) : new THREE.Quaternion();
            localQ = pQ.clone().invert().multiply(targetQ);
        }
        bone.quaternion.copy(localQ);
        torsoWorldQ.set(bn, targetQ.clone());
    }
    // 躯干/腿重排后刷新世界矩阵，供下方手臂 re-pose 读取新鲜 parent.matrixWorld
    model.updateMatrixWorld(true);
    for (const side of ['Left', 'Right'] as const) {
        const names = SIDE_ARM_BONES.map((s) => `mixamorig${side}${s}`);
        // 防御：任一手臂骨缺失（非 Mixamo 骨架/非标准模型）则跳过该侧
        if (names.some((bn) => !boneByName.has(bn) || !restPos.has(bn) || !restQ.has(bn))) continue;
        const [sh, ar, fo, ha] = names;
        const bSh = boneByName.get(sh)!.getWorldPosition(new THREE.Vector3());
        const bAr = boneByName.get(ar)!.getWorldPosition(new THREE.Vector3());
        const bFo = boneByName.get(fo)!.getWorldPosition(new THREE.Vector3());
        const bHa = boneByName.get(ha)!.getWorldPosition(new THREE.Vector3());
        const restUp = restPos.get(fo)!.clone().sub(restPos.get(sh)!).normalize();
        const restFo = restPos.get(ha)!.clone().sub(restPos.get(fo)!).normalize();
        const nSh = bSh.clone();
        const nAr = nSh.clone().add(restUp.clone().multiplyScalar(bAr.clone().sub(bSh).length()));
        const nFo = nSh.clone().add(restUp.clone().multiplyScalar(bFo.clone().sub(bSh).length()));
        const nHa = nFo.clone().add(restFo.clone().multiplyScalar(bHa.clone().sub(bFo).length()));
        const nPos = new Map<string, THREE.Vector3>([
            [sh, nSh], [ar, nAr], [fo, nFo], [ha, nHa],
        ]);
        const nQ = new Map<string, THREE.Quaternion>([
            [sh, restQ.get(sh)!.clone()], [ar, restQ.get(ar)!.clone()],
            [fo, restQ.get(fo)!.clone()], [ha, restQ.get(ha)!.clone()],
        ]);
        for (const bn of names) {
            const bone = boneByName.get(bn)!;
            const parent = bone.parent;
            if (parent) {
                const pPos = nPos.get(parent.name) || parent.getWorldPosition(new THREE.Vector3());
                const pQ = nQ.get(parent.name) || new THREE.Quaternion().setFromRotationMatrix(parent.matrixWorld);
                const pInvQ = pQ.clone().invert();
                const lp = nPos.get(bn)!.clone().sub(pPos).applyQuaternion(pInvQ);
                const lq = pInvQ.clone().multiply(nQ.get(bn)!);
                bone.position.copy(lp);
                bone.quaternion.copy(lq);
            }
        }
    }
    model.updateMatrixWorld(true);
    // V12.4（boneInverse 参考系统一）：官方 TransformLink 帧模式下，蒙皮靠官方非自洽公式
    // （matrixWorld_new × boneInverse_official ≠ I）跟随骨骼，与 off 的渲染行为完全一致，
    // 因此【不 rebind geometry、不 calculateInverses】——calculateInverses 会把官方帧
    // 重算成自洽帧（boneMat=I），正好毁掉 step 8.7 注入的统一参考系（v11g/v11h 教训：
    // un 14990→13800 仅微降）。
    // 自洽帧模式（convert 未传 officialRestPose，boneInverse 为 calculateInverses 产物）：
    // 保持 V11 行为（rebind + calculateInverses），避免「骨骼对、蒙皮错」。
    // ⚠️ oldBoneInverses 捕获点（上方 117 行）在 convert 注入官方帧后捕获的即是官方帧，
    //    rebindSkinVertices 若在此模式执行会用官方帧重写 geometry → 反而引入 77 分歧，
    //    故官方帧模式下必须整段跳过。
    for (const m of skinnedMeshes) {
        const oldInv = oldBoneInverses.get(m);
        if (m.skeleton && oldInv) {
            if (officialFrameFlags.get(m)) {
                // 官方帧模式：geometry 保持 off 参考几何，boneInverse 保持官方帧（不 rebind、不 calculateInverses）
                continue;
            }
            rebindSkinVertices(m, oldInv);
            m.skeleton.calculateInverses();
        }
    }
}
