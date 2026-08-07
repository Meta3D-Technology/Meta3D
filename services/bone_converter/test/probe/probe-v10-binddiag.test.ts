/**
 * probe-v10-binddiag — 第二根因定位：bind 层诊断（D1-D4）
 *
 * 背景（PROBE-V10-ARMS-RESULT 定稿）：
 *   bind pose S17 = 9.6°（GREEN，蒙皮层自洽），但所有链级变体播放帧 S17 仍 100~155°。
 *   链级公式方案（A/C/D/E）无法修复 S17 → 转向蒙皮层第二根因：
 *   boneInverse 帧约定 / skinIndex 归属 / Twist 骨权重 / 蒙皮矩阵来源。
 *
 * 本探针四组诊断：
 *   D1 基线：bind pose S17 复验（预期 9.6° GREEN）+ 播放帧 S17（预期 100°+）
 *   D2 boneInverse 一致性：每根手臂骨 matrixWorld(bind)×boneInverse ≈ I ？来源骨架判定
 *   D3 skinIndex 归属：手臂区域顶点指向的骨名、Twist 骨参与、hand cluster 组成
 *   D4 蒙皮矩阵来源：CPU skinCorrectCPU vs Skeleton.update() 一致性与 rigid-follow 验证
 *
 * 约束：不修改 src/、不修改 steps/features。复用 d5 的 skinCorrectCPU/skinClusterCentroid
 *   （.array 直读，禁止 getX(i*4+k)）。
 *
 * Run:
 *   cd packages/bone_converter && npx jest --config jest.config.js --testMatch "**" --testPathPattern "probe-v10-binddiag" --forceExit
 */
(global as any).self = global;
(global as any).window = global;
(global as any).document = {
    createElement: (tag: string) => {
        if (tag === 'img' || tag === 'image') return new (global as any).MockImage();
        return {};
    },
    createElementNS: (_ns: string, tag: string) => {
        if (tag === 'img' || tag === 'image') return new (global as any).MockImage();
        return {};
    },
};
class MockImage {
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    width = 1;
    height = 1;
    private _src = '';
    get src() { return this._src; }
    set src(v: string) {
        this._src = v;
        if (this.onload) setTimeout(() => this.onload!(), 0);
    }
    addEventListener(_e: string, _cb: any) { }
    removeEventListener(_e: string, _cb: any) { }
    setAttribute(_n: string, _v: string) { }
    getAttribute(_n: string) { return null; }
}
(global as any).MockImage = MockImage;
(global as any).Image = MockImage;

import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import * as fs from 'fs';
import * as path from 'path';
import { convertTripoToMixamo, normalizeRootMotion, TWIST_BONE_PATTERNS } from '../../src/tool/bone_converter/index';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const MODEL_FBX = path.join(REPO_ROOT, 'packages/bone_converter/demo/tripo_model/tripo_convert_09140e64-4506-4ebd-8841-5aae00631788.fbx');
const ANIM_FBX = path.join(REPO_ROOT, 'asset-lib/unit-action/src/asset/action/elitegiantess/default/Idle/1.fbx');
const OUT_PATH = path.join(__dirname, 'PROBE-V10-BINDDIAG-RESULT.md');

const ARM_BONES_8 = [
    'mixamorigLeftShoulder', 'mixamorigLeftArm', 'mixamorigLeftForeArm', 'mixamorigLeftHand',
    'mixamorigRightShoulder', 'mixamorigRightArm', 'mixamorigRightForeArm', 'mixamorigRightHand',
] as const;
const S17_ARM_BONES = [
    'mixamorigLeftShoulder', 'mixamorigLeftForeArm', 'mixamorigLeftHand',
    'mixamorigRightShoulder', 'mixamorigRightForeArm', 'mixamorigRightHand',
] as const;

function parseFreshFbx(filePath: string): THREE.Group {
    const buf = fs.readFileSync(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return new FBXLoader().parse(ab, '');
}

function angleDeg(a: THREE.Vector3, b: THREE.Vector3): number {
    const da = a.clone().normalize();
    const db = b.clone().normalize();
    const dot = Math.max(-1, Math.min(1, da.dot(db)));
    return Math.acos(dot) * 180 / Math.PI;
}
function fmtV(v: THREE.Vector3): string { return `(${v.x.toFixed(2)},${v.y.toFixed(2)},${v.z.toFixed(2)})`; }
function fmtM(m: THREE.Matrix4): string {
    const e = m.elements;
    return `[${e.map((x) => x.toFixed(3)).join(',')}]`;
}
/** 矩阵与单位阵的最大绝对偏差（平移列归一化后忽略位移，只比 3x3 旋转缩放部分 + 无位移） */
function matErrFromI(m: THREE.Matrix4): number {
    const e = m.elements;
    let max = 0;
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            const want = r === c ? 1 : 0;
            const d = Math.abs(e[c * 4 + r] - want);
            if (d > max) max = d;
        }
    }
    return max;
}
/** 矩阵与单位阵的最大绝对偏差（忽略平移列，只看 3x3 旋转缩放部分） */
function matRotErrFromI(m: THREE.Matrix4): number {
    const e = m.elements;
    let max = 0;
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            const want = r === c ? 1 : 0;
            const d = Math.abs(e[c * 4 + r] - want);
            if (d > max) max = d;
        }
    }
    return max;
}

// ─────────────────────────────────────────────────────────────
// d5 正确实现复用：.array 直读，禁止 getX(i*4+k)
// ─────────────────────────────────────────────────────────────
/** v = Σ w·(boneMat·boneInv)·vBind + mesh.matrixWorld（与 three Skeleton.update 一致） */
function skinCorrectCPU(mesh: THREE.SkinnedMesh, boneMatrices: Map<string, THREE.Matrix4>): THREE.Vector3[] {
    mesh.updateMatrixWorld(true);
    const sk = mesh.skeleton;
    const posAttr = mesh.geometry.attributes.position as THREE.BufferAttribute;
    const idxAttr = mesh.geometry.attributes.skinIndex as THREE.BufferAttribute;
    const wgtAttr = mesh.geometry.attributes.skinWeight as THREE.BufferAttribute;
    const ia = idxAttr.array as Uint16Array;
    const wa = wgtAttr.array as Float32Array;
    const n = posAttr.count;
    const out: THREE.Vector3[] = new Array(n);
    const vBind = new THREE.Vector3();
    const acc = new THREE.Vector3();
    const boneMat = new THREE.Matrix4();
    for (let i = 0; i < n; i++) {
        vBind.fromBufferAttribute(posAttr as any, i);
        acc.set(0, 0, 0);
        for (let k = 0; k < 4; k++) {
            const w = wa[i * 4 + k];
            if (w === 0) continue;
            const bi = ia[i * 4 + k];
            const bone = sk.bones[bi];
            if (!bone) continue;
            const m = boneMatrices.get(bone.name);
            if (!m) continue;
            boneMat.copy(m).multiply(sk.boneInverses[bi]);
            acc.addScaledVector(vBind.clone().applyMatrix4(boneMat), w);
        }
        acc.applyMatrix4(mesh.matrixWorld);
        out[i] = acc.clone();
    }
    return out;
}

/** S17 cluster 质心（d5 语义）：骨 b 的 cluster = 累计权重 ≥ threshold 的顶点；质心 = Σ w·vSkin / Σ w */
function skinClusterCentroid(
    mesh: THREE.SkinnedMesh,
    vSkin: THREE.Vector3[],
    boneNames: readonly string[],
    threshold: number,
): Map<string, THREE.Vector3> {
    const sk = mesh.skeleton;
    const idxAttr = mesh.geometry.attributes.skinIndex as THREE.BufferAttribute;
    const wgtAttr = mesh.geometry.attributes.skinWeight as THREE.BufferAttribute;
    const ia = idxAttr.array as Uint16Array;
    const wa = wgtAttr.array as Float32Array;
    const sumW = new Map<string, number>();
    const sumV = new Map<string, THREE.Vector3>();
    for (const bn of boneNames) { sumW.set(bn, 0); sumV.set(bn, new THREE.Vector3()); }
    const n = (mesh.geometry.attributes.position as THREE.BufferAttribute).count;
    for (let i = 0; i < n; i++) {
        for (let k = 0; k < 4; k++) {
            const w = wa[i * 4 + k];
            if (w < threshold) continue;
            const bi = ia[i * 4 + k];
            const bone = sk.bones[bi];
            if (!bone || !sumW.has(bone.name)) continue;
            sumW.set(bone.name, sumW.get(bone.name)! + w);
            sumV.get(bone.name)!.addScaledVector(vSkin[i], w);
        }
    }
    const out = new Map<string, THREE.Vector3>();
    for (const bn of boneNames) {
        const s = sumW.get(bn)!;
        out.set(bn, s > 0 ? sumV.get(bn)!.multiplyScalar(1 / s) : new THREE.Vector3());
    }
    return out;
}

describe('probe-v10-binddiag', () => {
    test('D1-D4 bind 层诊断', () => {
        const report: string[] = [];
        const model = parseFreshFbx(MODEL_FBX);
        convertTripoToMixamo(model);
        const animObj = parseFreshFbx(ANIM_FBX);
        const rawClip = animObj.animations[0];
        const normalized = normalizeRootMotion(rawClip, model, animObj);

        let mesh: THREE.SkinnedMesh | null = null;
        model.traverse((n) => { if ((n as THREE.SkinnedMesh).isSkinnedMesh && !mesh) mesh = n as THREE.SkinnedMesh; });
        const sk = mesh!.skeleton;

        report.push('# PROBE-V10-BINDDIAG-RESULT');
        report.push('');
        report.push('> 第二根因定位：bind 层诊断（D1 基线 / D2 boneInverse / D3 skinIndex / D4 矩阵来源）');
        report.push(`> 模型：${path.basename(MODEL_FBX)}；动画：${path.basename(ANIM_FBX)}`);
        report.push(`> 转换后 skeleton.bones = ${sk.bones.length}：${sk.bones.map((b) => b.name).join(', ')}`);
        report.push('');

        // ────────── D1 基线 ──────────
        report.push('## D1：bind pose 复验 + 播放帧对比（基线）');
        report.push('');
        report.push('| 模式 | 段 | Left | Right |');
        report.push('|---|---|---|---|');
        // bind pose
        model.updateMatrixWorld(true);
        const boneByName = new Map<string, THREE.Bone>();
        model.traverse((n) => { if ((n as THREE.Bone).isBone) boneByName.set(n.name, n as THREE.Bone); });
        const boneMatBind = new Map<string, THREE.Matrix4>();
        for (const [bn, b] of boneByName) boneMatBind.set(bn, b.matrixWorld.clone());
        const skinnedBind = skinCorrectCPU(mesh!, boneMatBind);
        const cBind = skinClusterCentroid(mesh!, skinnedBind, S17_ARM_BONES, 0.3);
        const bindDev: Record<string, number> = {};
        for (const side of ['Left', 'Right'] as const) {
            const sh = `mixamorig${side}Shoulder`;
            const fo = `mixamorig${side}ForeArm`;
            const ha = `mixamorig${side}Hand`;
            const pSh = boneByName.get(sh)!.getWorldPosition(new THREE.Vector3());
            const pFo = boneByName.get(fo)!.getWorldPosition(new THREE.Vector3());
            const pHa = boneByName.get(ha)!.getWorldPosition(new THREE.Vector3());
            bindDev[`${side}up`] = angleDeg(pFo.clone().sub(pSh), cBind.get(fo)!.clone().sub(cBind.get(sh)!));
            bindDev[`${side}fo`] = angleDeg(pHa.clone().sub(pFo), cBind.get(ha)!.clone().sub(cBind.get(fo)!));
        }
        report.push(`| bind pose | 上臂 | ${bindDev['Leftup'].toFixed(1)}° | ${bindDev['Rightup'].toFixed(1)}° |`);
        report.push(`| bind pose | 前臂 | ${bindDev['Leftfo'].toFixed(1)}° | ${bindDev['Rightfo'].toFixed(1)}° |`);
        // 播放帧
        const mixer = new THREE.AnimationMixer(model);
        const action = mixer.clipAction(normalized);
        action.reset();
        action.play();
        for (const t of [0.5, 1.5]) {
            mixer.setTime(t);
            model.updateMatrixWorld(true);
            const boneMat = new Map<string, THREE.Matrix4>();
            for (const [bn, b] of boneByName) boneMat.set(bn, b.matrixWorld.clone());
            const skinned = skinCorrectCPU(mesh!, boneMat);
            const c = skinClusterCentroid(mesh!, skinned, S17_ARM_BONES, 0.3);
            for (const side of ['Left', 'Right'] as const) {
                const sh = `mixamorig${side}Shoulder`;
                const fo = `mixamorig${side}ForeArm`;
                const ha = `mixamorig${side}Hand`;
                const pSh = boneByName.get(sh)!.getWorldPosition(new THREE.Vector3());
                const pFo = boneByName.get(fo)!.getWorldPosition(new THREE.Vector3());
                const pHa = boneByName.get(ha)!.getWorldPosition(new THREE.Vector3());
                report.push(`| 播放 t=${t} | 上臂 | ${angleDeg(pFo.clone().sub(pSh), c.get(fo)!.clone().sub(c.get(sh)!)).toFixed(1)}° | ${angleDeg(pFo.clone().sub(pSh), c.get(fo)!.clone().sub(c.get(sh)!)).toFixed(1)}° |`);
                report.push(`| 播放 t=${t} | 前臂 | ${angleDeg(pHa.clone().sub(pFo), c.get(ha)!.clone().sub(c.get(fo)!)).toFixed(1)}° | ${angleDeg(pHa.clone().sub(pFo), c.get(ha)!.clone().sub(c.get(fo)!)).toFixed(1)}° |`);
            }
        }
        report.push('');
        report.push(`**D1 基线：bind pose S17 worst = ${Math.max(...Object.values(bindDev)).toFixed(1)}°（${Math.max(...Object.values(bindDev)) >= 10 ? 'RED' : 'GREEN 预期 9.6°'}）→ 复验。播放帧预期 100°+（蒙皮层在播放帧偏离骨骼）。**`);
        report.push('');

        // ────────── D2 boneInverse 一致性 ──────────
        report.push('## D2：boneInverse 一致性检查');
        report.push('');
        report.push('对每根手臂骨：① bind matrixWorld × stored boneInverse ≈ I？② stored boneInverse vs 现算 fresh inverse 差？');
        report.push('');
        report.push('| 骨 | bones 索引 | bind MW × storedInv err(全4x4) | bind MW × storedInv err(3x3) | stored vs fresh err | 一致性 |');
        report.push('|---|---|---|---|---|---|');

        // 重新进入 bind pose（把播放状态复位：用 fresh 未播放模型采样）
        const modelBind = parseFreshFbx(MODEL_FBX);
        convertTripoToMixamo(modelBind);
        let meshB: THREE.SkinnedMesh | null = null;
        modelBind.traverse((n) => { if ((n as THREE.SkinnedMesh).isSkinnedMesh && !meshB) meshB = n as THREE.SkinnedMesh; });
        const skB = meshB!.skeleton;
        const boneByNameB = new Map<string, THREE.Bone>();
        modelBind.traverse((n) => { if ((n as THREE.Bone).isBone) boneByNameB.set(n.name, n as THREE.Bone); });
        modelBind.updateMatrixWorld(true);

        const idxOf = new Map<string, number>();
        skB.bones.forEach((b, i) => idxOf.set(b.name, i));

        // 3x3 旋转部分才是蒙皮有效性关键（位移是线段无关量）；但 4x4 也报
        let d2Worst = 0;
        const d2Rows: { name: string; full: number; rot: number; fresh: number }[] = [];
        for (const bn of ARM_BONES_8) {
            const i = idxOf.get(bn);
            if (i === undefined) { report.push(`| ${bn} | 缺失 | — | — | — | ❌ 不在 skeleton.bones |`); continue; }
            const bone = skB.bones[i];
            const bindMW = bone.matrixWorld.clone();
            const prod = new THREE.Matrix4().multiplyMatrices(bindMW, skB.boneInverses[i]);
            const fullErr = matErrFromI(prod);
            const rotErr = matRotErrFromI(prod);
            // fresh inverse = inverse(bind MW)
            const fresh = bindMW.clone().invert();
            // freshErr: |stored - fresh| max element
            const st = skB.boneInverses[i].elements;
            const fr = fresh.elements;
            let maxEl = 0;
            for (let k = 0; k < 16; k++) { const d = Math.abs(st[k] - fr[k]); if (d > maxEl) maxEl = d; }
            d2Rows.push({ name: bn, full: fullErr, rot: rotErr, fresh: maxEl });
            d2Worst = Math.max(d2Worst, rotErr);
        }
        for (const r of d2Rows) {
            report.push(`| ${r.name} | ${idxOf.get(r.name)} | ${r.full.toFixed(5)} | ${r.rot.toFixed(5)} | ${r.fresh.toFixed(5)} | ${r.rot < 1e-3 && r.fresh < 1e-3 ? '✅' : '❌'} |`);
        }
        report.push('');
        report.push(`**D2：bind matrixWorld × stored boneInverse 的 3x3 部分最大误差 = ${d2Worst.toFixed(6)} → ${d2Worst < 1e-3 ? '✅ boneInverse 与当前 skeleton.bones 的 bind 帧严格自洽（非来自其他骨架实例）' : '❌ boneInverse 与骨架 bind 帧错位（来源骨架不一致）'}**`);
        report.push('');

        // ────────── D3 skinIndex 归属 ──────────
        report.push('## D3：蒙皮顶点归属检查（skinIndex）');
        report.push('');
        const siA = (mesh!.geometry.getAttribute('skinIndex') as THREE.BufferAttribute).array as Uint16Array;
        const swA = (mesh!.geometry.getAttribute('skinWeight') as THREE.BufferAttribute).array as Float32Array;
        const posA = (mesh!.geometry.getAttribute('position') as THREE.BufferAttribute);
        const vc = posA.count;
        let siMin = Infinity, siMax = -1, siOOR = 0;
        for (let i = 0; i < siA.length; i++) { if (siA[i] < siMin) siMin = siA[i]; if (siA[i] > siMax) siMax = siA[i]; }
        for (let i = 0; i < siA.length; i++) { if (siA[i] >= sk.bones.length || siA[i] < 0) siOOR++; }
        report.push(`顶点数=${vc}；skinIndex min=${siMin} max=${siMax} bones.length=${sk.bones.length}；越界槽=${siOOR}`);
        report.push('');

        // 每根手臂骨：weight>0 影响顶点数 / dominant 顶点数；并检查 Twist 骨参与
        const bones = sk.bones;
        const targets = [...ARM_BONES_8];
        const infl = new Map<string, number>();
        const dom = new Map<string, number>();
        targets.forEach((t) => { infl.set(t, 0); dom.set(t, 0); });
        const twistWeights = new Map<string, number>(); // 剩余 Twist 骨名 → 受影响顶点数
        for (let i = 0; i < vc; i++) {
            let best = -1, bestW = -1;
            for (let k = 0; k < 4; k++) {
                const w = swA[i * 4 + k];
                if (w > bestW) { bestW = w; best = siA[i * 4 + k]; }
                if (w > 0) {
                    const bn = (best >= 0 && best < bones.length) ? bones[best].name : '';
                    if (bn) {
                        if (infl.has(bn)) infl.set(bn, infl.get(bn)! + 1);
                        if (TWIST_BONE_PATTERNS.some((p) => p.test(bn))) {
                            twistWeights.set(bn, (twistWeights.get(bn) ?? 0) + 1);
                        }
                    }
                }
            }
            if (best >= 0 && best < bones.length) {
                const dn = bones[best].name;
                if (dom.has(dn)) dom.set(dn, dom.get(dn)! + 1);
            }
        }
        report.push('各手臂骨 weight>0 影响顶点数 / dominant 顶点数：');
        report.push('');
        report.push('| 骨 | 影响顶点(weight>0) | dominant 顶点 |');
        report.push('|---|---|---|');
        for (const t of targets) report.push(`| ${t} | ${infl.get(t)} | ${dom.get(t)} |`);
        report.push('');
        report.push(`输出骨架中剩余 Twist 骨（pattern 命中）参与权重的顶点数：`);
        if (twistWeights.size === 0) report.push('  无 — ✅ 无 Twist 骨参与蒙皮权重');
        else {
            report.push('| Twist 骨 | 权重>0 顶点数 |');
            report.push('|---|---|');
            for (const [bn, n] of twistWeights) report.push(`| ${bn} | ${n} |`);
        }
        report.push('');

        // Hand cluster 组成分析：权重≥0.3 落在 Hand 骨上的顶点，其 4 槽骨名/权重分布
        report.push('### D3.1 Hand cluster 组成（权重≥0.3 落在 Hand 骨的顶点，其所有槽的骨名分布）');
        report.push('');
        report.push('诊断 S17 前臂段（ForeArm→Hand）偏 86-141°：若 Hand 网格顶点实际跟随 ForeArm 或手指/Twist 骨，则 c(Hand) 在播放帧会被拉离 Hand 骨。');
        report.push('');
        for (const side of ['Left', 'Right'] as const) {
            const ha = `mixamorig${side}Hand`;
            const haIdx = idxOf.get(ha);
            if (haIdx === undefined) continue;
            const clusterVerts: number[] = [];
            for (let i = 0; i < vc; i++) {
                for (let k = 0; k < 4; k++) {
                    if (swA[i * 4 + k] >= 0.3 && siA[i * 4 + k] === haIdx) { clusterVerts.push(i); break; }
                }
            }
            // 该 cluster 全部槽的 (骨名, 累计权重) 直方图
            const hist = new Map<string, number>();
            for (const vi of clusterVerts) {
                for (let k = 0; k < 4; k++) {
                    const w = swA[vi * 4 + k];
                    if (w === 0) continue;
                    const bi = siA[vi * 4 + k];
                    const bn = (bi >= 0 && bi < bones.length) ? bones[bi].name : `#${bi}`;
                    hist.set(bn, (hist.get(bn) ?? 0) + w);
                }
            }
            const sorted = Array.from(hist.entries()).sort((a, b) => b[1] - a[1]);
            const totalW = sorted.reduce((s, e) => s + e[1], 0);
            const handW = hist.get(ha) ?? 0;
            const handShare = totalW > 0 ? (handW / totalW) * 100 : 0;
            const parts = sorted.map(([bn, w]) => `${bn}=${(w / totalW * 100).toFixed(1)}%`).join(', ');
            report.push(`**${side} Hand cluster：顶点数=${clusterVerts.length}，Hand 骨权重占比=${handShare.toFixed(1)}%，槽组成：${parts}**`);
            // 非 Hand 骨（跟随错误骨）的顶点样本
            const wrong = new Set<string>();
            for (const [bn] of sorted) if (bn !== ha && bn !== `#${haIdx}`) wrong.add(bn);
            report.push(`  → 除 Hand 外还跟随：${wrong.size ? Array.from(wrong).join(', ') : '（无）'}`);
            report.push('');
        }
        report.push('');

        // D3.2：骨架重建索引一致性 —— skinIndex 指向的骨名是否就是几何语义
        report.push('### D3.2 skeleton.bones 顺序 vs skinIndex 语义抽查（bind 位置法）');
        report.push('');
        report.push('取 ForeArm 骨 bind 世界位置，与 ForeArm cluster 质心比较：若质心贴近骨位，则顶点归属正确（蒙皮段方向偏差来自播放帧矩阵而非归属）。');
        report.push('');
        const vSkinB = skinCorrectCPU(meshB!, boneMatBind);
        const cBindB = skinClusterCentroid(meshB!, vSkinB, S17_ARM_BONES, 0.3);
        for (const side of ['Left', 'Right'] as const) {
            const fo = `mixamorig${side}ForeArm`;
            const ha = `mixamorig${side}Hand`;
            const foPos = boneByNameB.get(fo)!.getWorldPosition(new THREE.Vector3());
            const haPos = boneByNameB.get(ha)!.getWorldPosition(new THREE.Vector3());
            const cFo = cBindB.get(fo)!;
            const cHa = cBindB.get(ha)!;
            const dFo = foPos.distanceTo(cFo);
            const dHa = haPos.distanceTo(cHa);
            report.push(`| ${side} | ForeArm 骨 vs cluster 质心距=${dFo.toFixed(3)} | Hand 骨 vs cluster 质心距=${dHa.toFixed(3)} | ${dFo < 1.5 ? '✅' : '❌'} / ${dHa < 1.5 ? '✅' : '❌'} |`);
        }
        report.push('');

        // ────────── D4 蒙皮矩阵来源 ──────────
        report.push('## D4：蒙皮计算矩阵来源');
        report.push('');
        report.push('实机渲染路径：THREE.SkinnedMesh + WebGLRenderer 标准蒙皮管线。');
        report.push('- `Skeleton.update()`（three r159）：`boneMatrices[i] = matrixWorld_i × boneInverse_i`（`_offsetMatrix.multiplyMatrices(matrix, boneInverses[i])`）');
        report.push('- 顶点着色器 `skinning_vertex.glsl`：`skinVertex = bindMatrix × v; skinned = Σ w·boneMat(skinIndex)·skinVertex; out = bindMatrixInverse × skinned`');
        report.push('- d5/probe 的 `skinCorrectCPU`：`v = Σ w·(boneMat(bone.name)·boneInverse[skinIndex])·vBind + mesh.matrixWorld` → 与 GPU 管线矩阵来源一致（bindMatrix=I 时）。');
        report.push('');

        // D4.1 CPU skinCorrectCPU vs Skeleton.update() 数值一致性
        report.push('### D4.1 skinCorrectCPU vs Skeleton.update() 数值一致性（同一播放帧）');
        report.push('');
        mixer.setTime(0.5);
        model.updateMatrixWorld(true);
        const bmAt05 = new Map<string, THREE.Matrix4>();
        for (const [bn, b] of boneByName) bmAt05.set(bn, b.matrixWorld.clone());
        const cpuSkin = skinCorrectCPU(mesh!, bmAt05);
        // Skeleton.update 路径
        sk.update();
        const boneMatArr = sk.boneMatrices;
        let maxDiff = 0;
        for (let i = 0; i < vc; i++) {
            const vBind = new THREE.Vector3();
            vBind.fromBufferAttribute(posA as any, i);
            const acc = new THREE.Vector3();
            for (let k = 0; k < 4; k++) {
                const w = swA[i * 4 + k];
                if (w === 0) continue;
                const bi = siA[i * 4 + k];
                const m = new THREE.Matrix4().fromArray(boneMatArr, bi * 16);
                acc.addScaledVector(vBind.clone().applyMatrix4(m), w);
            }
            acc.applyMatrix4(mesh!.matrixWorld);
            const d = acc.distanceTo(cpuSkin[i]);
            if (d > maxDiff) maxDiff = d;
        }
        report.push(`CPU skinCorrectCPU vs Skeleton.update() 输出最大顶点距离差 = ${maxDiff.toFixed(6)} → ${maxDiff < 1e-4 ? '✅ 完全一致（探针与实机 GPU 蒙皮矩阵同源）' : '❌ 不一致'}`);
        report.push('');

        // D4.2 rigid-follow 验证：cluster 质心是否严格跟随其骨（播放帧）
        report.push('### D4.2 rigid-follow 验证：cluster 质心 vs 该骨刚体变换预测质心（播放帧 t=1.5）');
        report.push('');
        report.push('若 skinIndex/权重正确，cluster 质心 c(t) 应≈ matrixWorld(bone,t)×boneInverse(bone)×c_bind（刚体跟随）。偏差大 → 顶点归属错误（跟随了其他骨）。');
        report.push('');
        mixer.setTime(1.5);
        model.updateMatrixWorld(true);
        const bmAt15 = new Map<string, THREE.Matrix4>();
        for (const [bn, b] of boneByName) bmAt15.set(bn, b.matrixWorld.clone());
        const skinned15 = skinCorrectCPU(mesh!, bmAt15);
        const c15 = skinClusterCentroid(mesh!, skinned15, S17_ARM_BONES, 0.3);
        for (const side of ['Left', 'Right'] as const) {
            for (const bn of [`mixamorig${side}Shoulder`, `mixamorig${side}ForeArm`, `mixamorig${side}Hand`]) {
                const i = idxOf.get(bn)!;
                const cBindVal = cBind.get(bn)!;
                const predicted = cBindVal.clone().applyMatrix4(new THREE.Matrix4().multiplyMatrices(boneByName.get(bn)!.matrixWorld, sk.boneInverses[i]));
                const actual = c15.get(bn)!;
                const d = predicted.distanceTo(actual);
                report.push(`| ${bn} | 刚体预测质心 ${fmtV(predicted)} | 实际质心 ${fmtV(actual)} | 距离=${d.toFixed(4)} | ${d < 1e-3 ? '✅ 刚体跟随' : '⚠️ 非刚体（多骨混合/归属异常）'} |`);
            }
        }
        report.push('');

        // D4.3 Hand cluster 质心 vs Hand 骨 / ForeArm 骨位置（判定 Hand 网格跟随哪根骨）
        report.push('### D4.3 Hand cluster 质心 vs Hand 骨 / ForeArm 骨位置（播放帧 t=1.5）');
        report.push('');
        report.push('若 Hand cluster 质心贴近 ForeArm 骨而非 Hand 骨 → Hand 网格顶点实际跟随 ForeArm（skinIndex 归属错位）。');
        report.push('');
        for (const side of ['Left', 'Right'] as const) {
            const ha = `mixamorig${side}Hand`;
            const fo = `mixamorig${side}ForeArm`;
            const cHa = c15.get(ha)!;
            const pHa = boneByName.get(ha)!.getWorldPosition(new THREE.Vector3());
            const pFo = boneByName.get(fo)!.getWorldPosition(new THREE.Vector3());
            const dHand = cHa.distanceTo(pHa);
            const dFo = cHa.distanceTo(pFo);
            report.push(`| ${side} Hand cluster 质心 | Hand 骨距=${dHand.toFixed(3)} | ForeArm 骨距=${dFo.toFixed(3)} | 结论：${dHand < dFo ? '贴近 Hand 骨（归属正确）' : '贴近 ForeArm 骨（Hand 网格跟随 ForeArm ❌）'} |`);
        }
        report.push('');

        // ────────── D4.4 决定性：单顶点 rigid-follow 验证 + 帧来源 ──────────
        report.push('### D4.4 决定性验证：高权重顶点是否严格跟随其骨（+ mesh 帧 / bone 引用同一性）');
        report.push('');
        report.push('取每根手臂骨权重最大（且单槽权重 ≥0.9）的顶点，在播放帧 t=1.5 比较：');
        report.push('  实际蒙皮位置 vs 预测（该骨 matrixWorld(t) × boneInverse × vBind 后 × mesh.matrixWorld）。');
        report.push('  若完全一致 → skinning 正确跟随骨骼（S17 RED 不是蒙皮公式/引用问题）；若不一致 → 蒙皮矩阵引用错位。');
        report.push('');
        report.push(`mesh.matrixWorld = ${fmtM(mesh!.matrixWorld)}`);
        report.push(`mesh.bindMatrix = ${fmtM(mesh!.bindMatrix)}`);
        const meshWorld = mesh!.matrixWorld.clone();
        report.push('');
        report.push('| 骨 | 索引 | 顶点# | 槽权重 | 预测质心 | 实际蒙皮位置 | 距离 | 结论 |');
        report.push('|---|---|---|---|---|---|---|---|');
        for (const bn of ARM_BONES_8) {
            const i = idxOf.get(bn);
            if (i === undefined) continue;
            // 找该骨为 dominant 且槽权重最大、且其它槽权重总和小的顶点
            let bestVi = -1, bestW = -0.1, bestSum = 0;
            for (let vi = 0; vi < vc; vi++) {
                let wBone = 0, sum = 0;
                for (let k = 0; k < 4; k++) {
                    const w = swA[vi * 4 + k];
                    if (w === 0) continue;
                    sum += w;
                    if (siA[vi * 4 + k] === i) wBone += w;
                }
                if (wBone > bestW && sum > 0.99) { bestW = wBone; bestVi = vi; bestSum = sum; }
            }
            if (bestVi < 0) { report.push(`| ${bn} | ${i} | 无（无 ≥0.9 槽权重的顶点） | — | — | — | — | — |`); continue; }
            const vBind = new THREE.Vector3();
            vBind.fromBufferAttribute(posA as any, bestVi);
            const m = boneByName.get(bn)!.matrixWorld.clone();
            const pred = new THREE.Matrix4().multiplyMatrices(m, sk.boneInverses[i]);
            const predPos = vBind.clone().applyMatrix4(pred).applyMatrix4(meshWorld);
            const actual = skinned15[bestVi];
            const d = predPos.distanceTo(actual);
            report.push(`| ${bn} | ${i} | ${bestVi} | ${bestW.toFixed(3)}/${bestSum.toFixed(3)} | ${fmtV(predPos)} | ${fmtV(actual)} | ${d.toFixed(4)} | ${d < 1e-3 ? '✅ 严格跟随' : '❌ 蒙皮不跟随骨'} |`);
        }
        report.push('');
        report.push('骨架 bones vs 场景树同一性（skeleton.bones[i] === 场景树同名骨对象）：');
        const identityOk = sk.bones.every((b) => b === boneByName.get(b.name));
        report.push(`  ${identityOk ? '✅ 全部同一对象引用（蒙皮矩阵来自树中该骨 matrixWorld）' : '❌ 存在不同对象（蒙皮用 skeleton.bones 的 matrixWorld ≠ 树中骨 matrixWorld）'}`);
        report.push('');

        // ────────── D4.5 决定性：GPU 等价 CPU 蒙皮（含 bindMatrix）重算 S17 ──────────
        report.push('### D4.5 决定性：含 bindMatrix 的 GPU 等价蒙皮重算 S17（判定 S17 RED 是否指标缺陷）');
        report.push('');
        report.push(`mesh.matrixWorld 非恒等（含旋转）→ d5 skinCorrectCPU 只做 'v = Σ w·(MW·Inv)·vBind + mesh.matrixWorld'，`);
        report.push('而真实 GPU 着色器是 `out = bindMatrixInverse × Σ w·boneMat·(bindMatrix × v)`。');
        report.push('若 mesh.matrixWorld ≠ I，两式不等 → S17 RED 可能是指标缺 bindMatrix 项，而非真实蒙皮错误。');
        report.push('');
        const gpuSkin = (bm: Map<string, THREE.Matrix4>): THREE.Vector3[] => {
            const bmInv = mesh!.bindMatrix.clone().invert();
            const bmFwd = mesh!.bindMatrix;
            const out: THREE.Vector3[] = new Array(vc);
            const vBind = new THREE.Vector3();
            const acc = new THREE.Vector3();
            const boneMat = new THREE.Matrix4();
            for (let i = 0; i < vc; i++) {
                vBind.fromBufferAttribute(posA as any, i);
                vBind.applyMatrix4(bmFwd); // skinVertex = bindMatrix × v
                acc.set(0, 0, 0);
                for (let k = 0; k < 4; k++) {
                    const w = swA[i * 4 + k];
                    if (w === 0) continue;
                    const bi = siA[i * 4 + k];
                    const bone = sk.bones[bi];
                    if (!bone) continue;
                    const m = bm.get(bone.name);
                    if (!m) continue;
                    boneMat.copy(m).multiply(sk.boneInverses[bi]);
                    acc.addScaledVector(vBind.clone().applyMatrix4(boneMat), w);
                }
                acc.applyMatrix4(bmInv); // transformed = bindMatrixInverse × skinned
                out[i] = acc.clone();
            }
            return out;
        };
        const clusterOf = (vSkin: THREE.Vector3[]): Map<string, THREE.Vector3> =>
            skinClusterCentroid(mesh!, vSkin, S17_ARM_BONES, 0.3);
        const segDev = (c: Map<string, THREE.Vector3>, bm2: Map<string, THREE.Bone>): Record<string, number> => {
            const dev: Record<string, number> = {};
            for (const side of ['Left', 'Right'] as const) {
                const sh = `mixamorig${side}Shoulder`;
                const fo = `mixamorig${side}ForeArm`;
                const ha = `mixamorig${side}Hand`;
                const pSh = bm2.get(sh)!.getWorldPosition(new THREE.Vector3());
                const pFo = bm2.get(fo)!.getWorldPosition(new THREE.Vector3());
                const pHa = bm2.get(ha)!.getWorldPosition(new THREE.Vector3());
                dev[`${side}上臂`] = angleDeg(pFo.clone().sub(pSh), c.get(fo)!.clone().sub(c.get(sh)!));
                dev[`${side}前臂`] = angleDeg(pHa.clone().sub(pFo), c.get(ha)!.clone().sub(c.get(fo)!));
            }
            return dev;
        };
        // 播放 t=0.5 / t=1.5，GPU 等价蒙皮 vs d5 蒙皮 的 S17
        report.push('| 时间 | 指标实现 | Left 上臂 | Left 前臂 | Right 上臂 | Right 前臂 | worst |');
        report.push('|---|---|---|---|---|---|---|');
        for (const t of [0.5, 1.5]) {
            mixer.setTime(t);
            model.updateMatrixWorld(true);
            const bmNow = new Map<string, THREE.Matrix4>();
            for (const [bn, b] of boneByName) bmNow.set(bn, b.matrixWorld.clone());
            const gpu = clusterOf(gpuSkin(bmNow));
            const devGpu = segDev(gpu, boneByName);
            const d5 = clusterOf(skinCorrectCPU(mesh!, bmNow));
            const devD5 = segDev(d5, boneByName);
            const wG = Math.max(...Object.values(devGpu));
            const wD = Math.max(...Object.values(devD5));
            report.push(`| t=${t} | d5 (无 bindMatrix) | ${devD5['Left上臂'].toFixed(1)}° | ${devD5['Left前臂'].toFixed(1)}° | ${devD5['Right上臂'].toFixed(1)}° | ${devD5['Right前臂'].toFixed(1)}° | ${wD.toFixed(1)}° |`);
            report.push(`| t=${t} | GPU 等价 (含 bindMatrix) | ${devGpu['Left上臂'].toFixed(1)}° | ${devGpu['Left前臂'].toFixed(1)}° | ${devGpu['Right上臂'].toFixed(1)}° | ${devGpu['Right前臂'].toFixed(1)}° | ${wG.toFixed(1)}° |`);
        }
        report.push('');
        report.push('若 GPU 等价行 worst 明显 < d5 行（且接近 <10°），→ S17 RED 主要由指标缺 bindMatrix 项导致，真实蒙皮在 GPU 路径下正确。');
        report.push('');

        // ────────── D4.6 决定性：GPU 等价蒙皮单顶点 rigid-follow + 骨骼实际运动幅度 ──────────
        report.push('### D4.6 决定性：GPU 等价蒙皮单顶点跟随 + 骨骼运动幅度（判 S17 RED 来源）');
        report.push('');
        report.push('GPU 等价蒙皮输出在 mesh-local 帧，骨位置在 world 帧 → 用 bindMatrix⁻¹ 把骨位折算回 mesh 帧再比。');
        report.push('若单顶点完全跟随其骨且骨骼几乎不动（Idle），而 S17 仍 RED → S17 度量（cluster 质心段 vs 骨位置段）本身有系统偏差。');
        report.push('');
        const bmInvMat = mesh!.bindMatrix.clone().invert();
        const boneAt = (name: string): THREE.Vector3 => {
            const b = boneByName.get(name)!;
            return b.getWorldPosition(new THREE.Vector3()).applyMatrix4(bmInvMat);
        };
        // 骨骼运动幅度：bind → t=1.5 的骨段方向变化
        report.push('| 骨段 | bind 骨段方向 | t=1.5 骨段方向 | 方向变化角 |');
        report.push('|---|---|---|---|');
        for (const side of ['Left', 'Right'] as const) {
            const sh = `mixamorig${side}Shoulder`;
            const fo = `mixamorig${side}ForeArm`;
            const ha = `mixamorig${side}Hand`;
            const segBone = (bnA: string, bnB: string): THREE.Vector3 =>
                boneAt(bnB).clone().sub(boneAt(bnA));
            const upBind = segBone(sh, fo);
            const foBind = segBone(fo, ha);
            // 播放 t=1.5 的骨段（需重新 setTime）
            mixer.setTime(1.5);
            model.updateMatrixWorld(true);
            const up15 = segBone(sh, fo);
            const fo15 = segBone(fo, ha);
            report.push(`| ${side} 上臂 | ${fmtV(upBind)} | ${fmtV(up15)} | ${angleDeg(upBind, up15).toFixed(1)}° |`);
            report.push(`| ${side} 前臂 | ${fmtV(foBind)} | ${fmtV(fo15)} | ${angleDeg(foBind, fo15).toFixed(1)}° |`);
        }
        report.push('');
        // GPU 等价单顶点跟随（在 mesh 帧）
        mixer.setTime(1.5);
        model.updateMatrixWorld(true);
        const bmNow2 = new Map<string, THREE.Matrix4>();
        for (const [bn, b] of boneByName) bmNow2.set(bn, b.matrixWorld.clone());
        const gpu15 = gpuSkin(bmNow2);
        report.push('GPU 等价蒙皮 单顶点 rigid-follow（预测 = bindMatrix⁻¹×(MW(t)×Inv)×bindMatrix×vBind，即 gpuSkin 本身；对比该顶点 4 槽合成实际位置）：');
        report.push('| 骨 | 顶点# | 预测(仅主骨) | 实际(4槽合成) | 距离 | 结论 |');
        report.push('|---|---|---|---|---|---|');
        for (const bn of ARM_BONES_8) {
            const i = idxOf.get(bn);
            if (i === undefined) continue;
            let bestVi = -1, bestW = -0.1;
            for (let vi = 0; vi < vc; vi++) {
                let wBone = 0, sum = 0;
                for (let k = 0; k < 4; k++) {
                    const w = swA[vi * 4 + k];
                    if (w === 0) continue;
                    sum += w;
                    if (siA[vi * 4 + k] === i) wBone += w;
                }
                if (wBone > bestW && sum > 0.99) { bestW = wBone; bestVi = vi; }
            }
            if (bestVi < 0) { report.push(`| ${bn} | 无 | — | — | — | — |`); continue; }
            // 仅主骨变换该顶点
            const vBind2 = new THREE.Vector3().fromBufferAttribute(posA as any, bestVi);
            const m = boneByName.get(bn)!.matrixWorld.clone();
            const pred = new THREE.Matrix4().multiplyMatrices(m, sk.boneInverses[i]);
            const predPos = vBind2.clone().applyMatrix4(mesh!.bindMatrix).applyMatrix4(pred).applyMatrix4(bmInvMat);
            const actual = gpu15[bestVi];
            const d = predPos.distanceTo(actual);
            report.push(`| ${bn} | ${bestVi} | ${fmtV(predPos)} | ${fmtV(actual)} | ${d.toFixed(4)} | ${d < 1e-3 ? '✅ 严格跟随（GPU 蒙皮正确）' : '❌ 不跟随'} |`);
        }
        report.push('');

        // ────────── 结论 ──────────
        report.push('## 结论');
        report.push('');
        report.push('（由上述数据填写，见下方人工汇总）');

        fs.writeFileSync(OUT_PATH, report.join('\n'), 'utf8');
        console.log(report.join('\n'));
        // 断言仅做 smoke：探针总能跑完并写报告
        expect(Math.max(...Object.values(bindDev))).toBeGreaterThan(0);
    });
});
