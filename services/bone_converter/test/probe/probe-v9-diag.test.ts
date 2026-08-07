/**
 * V9 diagnostic probe: verify V8 effectiveness + quantify "assertion vs visual" gap
 *
 * V8 (b352d2dc7) committed: arm bones (Shoulder/Arm/ForeArm/Hand) worldQ taken directly
 * from animation world quaternion animQ (S_w in normalizeRootMotion variant B); torso/legs
 * = bindWorldQ * deltaLocalQ; positions = bind-chain rigid walk. Brother's real-machine retest
 * still shows distortion (left forearm pronation / palm facing backward / hand reversed).
 * BDD 37/37 green but visual distortion remains -- S13 asserts |theta_out - theta_anim| < 20 deg
 * (twist roll only), cannot catch distortion.
 *
 * This probe answers Q1-Q7 with real FBX numbers:
 *   Q1: Is V8 effective at code level (arm world orientation output vs anim, |dQuat| per bone)
 *   Q2: Does model have SkinnedMesh (can assertions be vertex-based = closest to visual)
 *   Q3: Palm facing (bind vs V8 output vs anim palm normal world direction, pairwise angles)
 *   Q4: Elbow bend plane normal n = d1 x d2 (bind vs output vs anim pairwise angles)
 *   Q5: Per-bone swing-twist decomposition vs anim (swing diff / twist diff)
 *   Q6: Output vs anim skeleton positions / segment directions (lengths & direction angles)
 *   Q7: CPU skinning (vertex positions, most visual): palm-region centroid displacement,
 *       vertex local-coordinate drift relative to dominant bone (mesh stretch / twist proof)
 *
 * Run:
 *   cd packages/bone_converter && npx jest --config jest.config.js --testMatch "**" --testPathPattern "probe-v9-diag" --forceExit
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
import { convertTripoToMixamo, normalizeRootMotion } from '../../src/tool/bone_converter/index';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const MODEL_FBX = path.join(
    REPO_ROOT,
    'packages/bone_converter/demo/tripo_model/tripo_convert_09140e64-4506-4ebd-8841-5aae00631788.fbx',
);
const ANIM_FBX = path.join(
    REPO_ROOT,
    'asset-lib/unit-action/src/asset/action/elitegiantess/default/Idle/1.fbx',
);

const ARM_BONES = [
    'mixamorigLeftShoulder', 'mixamorigLeftArm', 'mixamorigLeftForeArm', 'mixamorigLeftHand',
    'mixamorigRightShoulder', 'mixamorigRightArm', 'mixamorigRightForeArm', 'mixamorigRightHand',
] as const;
type BoneName = typeof ARM_BONES[number];

const FINGER_RE = /mixamorig(Left|Right)Hand(Index|Middle|Ring|Pinky|Thumb)\d*$/;

function parseFreshFbx(filePath: string): THREE.Group {
    const buf = fs.readFileSync(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return new FBXLoader().parse(ab, '');
}

type WorldState = Map<string, { pos: THREE.Vector3; quat: THREE.Quaternion }>;

function captureAll(root: THREE.Object3D): WorldState {
    root.updateMatrixWorld(true);
    const out = new Map<string, { pos: THREE.Vector3; quat: THREE.Quaternion }>();
    root.traverse((n) => {
        if ((n as THREE.Bone).isBone) {
            out.set(n.name, {
                pos: n.getWorldPosition(new THREE.Vector3()),
                quat: n.getWorldQuaternion(new THREE.Quaternion()),
            });
        }
    });
    return out;
}

const rad2deg = (r: number) => r * 180 / Math.PI;

function quatDiffDeg(qA: THREE.Quaternion, qB: THREE.Quaternion): number {
    const rel = qA.clone().multiply(qB.clone().invert());
    const w = Math.min(1, Math.abs(rel.w));
    return rad2deg(2 * Math.acos(w));
}

function decomposeST(q: THREE.Quaternion, axis: THREE.Vector3): { swingDeg: number; twistDeg: number } {
    const a = axis.clone().normalize();
    const v = new THREE.Vector3(q.x, q.y, q.z);
    const dot = v.dot(a);
    const twist = new THREE.Quaternion(a.x * dot, a.y * dot, a.z * dot, q.w).normalize();
    const swing = q.clone().multiply(twist.clone().invert()).normalize();
    const tDeg = rad2deg(2 * Math.atan2(Math.sqrt(twist.x ** 2 + twist.y ** 2 + twist.z ** 2), Math.abs(twist.w)));
    const sDeg = rad2deg(2 * Math.atan2(Math.sqrt(swing.x ** 2 + swing.y ** 2 + swing.z ** 2), Math.abs(swing.w)));
    return { swingDeg: sDeg, twistDeg: tDeg };
}

function sideOf(bn: BoneName): 'Left' | 'Right' { return bn.startsWith('mixamorigLeft') ? 'Left' : 'Right'; }

function segDir(w: WorldState, bn: BoneName): THREE.Vector3 {
    const s = sideOf(bn);
    const isFore = bn.includes('ForeArm') || bn.includes('Hand');
    if (isFore) {
        return w.get(`mixamorig${s}ForeArm`)!.pos.clone().sub(w.get(`mixamorig${s}Hand`)!.pos).normalize();
    }
    return w.get(`mixamorig${s}Shoulder`)!.pos.clone().sub(w.get(`mixamorig${s}ForeArm`)!.pos).normalize();
}

function vecAngleDeg(a: THREE.Vector3, b: THREE.Vector3): number {
    const dot = Math.max(-1, Math.min(1, a.normalize().dot(b.normalize())));
    return rad2deg(Math.acos(dot));
}

/** Palm normal: vertical axis of finger-forward (fallback forearm segment) direction, signed toward body center */
function palmNormal(w: WorldState, side: 'Left' | 'Right'): THREE.Vector3 | null {
    const h = w.get(`mixamorig${side}Hand`);
    const fore = w.get(`mixamorig${side}ForeArm`);
    if (!h || !fore) return null;
    const Q = h.quat;
    let f: THREE.Vector3 | null = null;
    for (const [bn, e] of w) {
        if (FINGER_RE.test(bn) && bn.includes(side)) {
            f = e.pos.clone().sub(h.pos).normalize();
            break;
        }
    }
    if (!f) f = fore.pos.clone().sub(h.pos).normalize();
    const axes: THREE.Vector3[] = [
        new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1),
    ].map((a) => a.applyQuaternion(Q).normalize());
    let fAxis = axes[0];
    let fDot = Math.abs(f.dot(fAxis));
    for (const a of axes) {
        const d = Math.abs(f.dot(a));
        if (d > fDot) { fAxis = a; fDot = d; }
    }
    const handX = axes[0];
    let p = new THREE.Vector3().crossVectors(fAxis, handX).normalize();
    const targetX = side === 'Left' ? 1 : -1;
    if (p.x * targetX < 0) p.negate();
    return p;
}

function elbowPlaneNormal(w: WorldState, side: 'Left' | 'Right'): { n: THREE.Vector3 | null; bendDeg: number } {
    const s = w.get(`mixamorig${side}Shoulder`);
    const f = w.get(`mixamorig${side}ForeArm`);
    const h = w.get(`mixamorig${side}Hand`);
    if (!s || !f || !h) return { n: null, bendDeg: NaN };
    const d1 = f.pos.clone().sub(s.pos).normalize();
    const d2 = h.pos.clone().sub(f.pos).normalize();
    const dot = Math.max(-1, Math.min(1, d1.dot(d2)));
    const n = new THREE.Vector3().crossVectors(d1, d2).normalize();
    return { n, bendDeg: rad2deg(Math.acos(dot)) };
}

function v3(v: THREE.Vector3 | null): number[] | null { return v ? [+v.x.toFixed(4), +v.y.toFixed(4), +v.z.toFixed(4)] : null; }
function r2(x: number): number { return +x.toFixed(2); }

/** CPU skinning: skinned world position per vertex, plus dominant bone name (max weight) */
function skinMesh(mesh: THREE.SkinnedMesh): {
    skinned: THREE.Vector3[];
    dominantBone: string[];
} {
    mesh.updateMatrixWorld(true);
    const sk = mesh.skeleton;
    const posAttr = mesh.geometry.attributes.position as THREE.BufferAttribute;
    const idxAttr = mesh.geometry.attributes.skinIndex as THREE.BufferAttribute;
    const wgtAttr = mesh.geometry.attributes.skinWeight as THREE.BufferAttribute;
    const n = posAttr.count;
    const skinned: THREE.Vector3[] = new Array(n);
    const dominantBone: string[] = new Array(n);
    const vBind = new THREE.Vector3();
    const acc = new THREE.Vector3();
    const boneMat = new THREE.Matrix4();
    for (let i = 0; i < n; i++) {
        vBind.fromBufferAttribute(posAttr as any, i);
        // bind vertex -> skinned world = sum_i w_i * (bone.matrixWorld * boneInverse_i) * vBind
        acc.set(0, 0, 0);
        let best = -1;
        let bestW = -1;
        for (let k = 0; k < 4; k++) {
            const bi = idxAttr.getX(i * 4 + k);
            const w = wgtAttr.getX(i * 4 + k);
            if (w > bestW) { bestW = w; best = bi; }
            if (w === 0) continue;
            const bone = sk.bones[bi];
            if (!bone) continue;
            boneMat.copy(bone.matrixWorld).multiply(sk.boneInverses[bi]);
            const c = new THREE.Vector3().copy(vBind).applyMatrix4(boneMat).multiplyScalar(w);
            acc.add(c);
        }
        // model space -> world
        acc.applyMatrix4(mesh.matrixWorld);
        skinned[i] = acc.clone();
        dominantBone[i] = best >= 0 && sk.bones[best] ? sk.bones[best].name : '(none)';
    }
    return { skinned, dominantBone };
}

/** Collect verts whose dominant bone contains given substring, return centroid + list */
function boneRegion(skinned: THREE.Vector3[], dominant: string[], needle: string): { centroid: THREE.Vector3; count: number } {
    let c = new THREE.Vector3();
    let cnt = 0;
    for (let i = 0; i < skinned.length; i++) {
        if (dominant[i].includes(needle)) { c.add(skinned[i]); cnt++; }
    }
    return { centroid: cnt > 0 ? c.divideScalar(cnt) : new THREE.Vector3(), count: cnt };
}

function findSkinnedMesh(root: THREE.Object3D): THREE.SkinnedMesh | null {
    let found: THREE.SkinnedMesh | null = null;
    root.traverse((n) => {
        if ((n as THREE.SkinnedMesh).isSkinnedMesh && !found) found = n as THREE.SkinnedMesh;
    });
    return found;
}

describe('probe-v9-diag', () => {
    test('Q1-Q7: V8 effectiveness + assertion/visual gap (real FBX)', () => {
        const T0 = 0;

        // (1) bind: converted, not played
        const modelBind = parseFreshFbx(MODEL_FBX);
        convertTripoToMixamo(modelBind);
        const bind = captureAll(modelBind);

        // (2) anim rest (before playing) + anim t=0: original animation skeleton
        const animRef = parseFreshFbx(ANIM_FBX);
        const animRest = captureAll(animRef);
        const clipRef = animRef.animations[0];
        const animMixer = new THREE.AnimationMixer(animRef);
        animMixer.clipAction(clipRef).reset().play();
        animMixer.setTime(T0);
        const anim = captureAll(animRef);

        // (3) V8 output: normalizeRootMotion + mixer play t=0
        const modelOut = parseFreshFbx(MODEL_FBX);
        convertTripoToMixamo(modelOut);
        const animSrc = parseFreshFbx(ANIM_FBX);
        const clipSrc = animSrc.animations[0];
        const normalized = normalizeRootMotion(clipSrc, modelOut, animSrc);
        const mixer = new THREE.AnimationMixer(modelOut);
        mixer.clipAction(normalized).reset().play();
        mixer.setTime(T0);
        const out = captureAll(modelOut);

        // ============ Q1 ============
        const q1: Record<string, any> = {};
        let q1Max = 0;
        for (const bn of ARM_BONES) {
            const dOutAnim = quatDiffDeg(out.get(bn)!.quat, anim.get(bn)!.quat);
            const dBindAnim = quatDiffDeg(bind.get(bn)!.quat, anim.get(bn)!.quat);
            q1Max = Math.max(q1Max, dOutAnim);
            q1[bn] = { 'out_vs_anim_deg': r2(dOutAnim), 'bind_vs_anim_deg': r2(dBindAnim) };
        }
        const q1Verdict = q1Max < 5
            ? 'V8 EFFECTIVE at code level (max ' + q1Max.toFixed(2) + ' deg < 5, arm worldQ = animQ)'
            : q1Max > 30
                ? 'V8 NOT effective / path not reached (max ' + q1Max.toFixed(2) + ' deg > 30)'
                : 'V8 partial (max ' + q1Max.toFixed(2) + ' deg, 5-30, needs recheck)';

        // ============ Q2 ============
        const meshes: Record<string, any>[] = [];
        modelOut.traverse((n) => {
            const m = (n as THREE.SkinnedMesh);
            if (m.isSkinnedMesh) {
                const g = m.geometry;
                meshes.push({
                    name: m.name,
                    vertices: g.attributes.position ? g.attributes.position.count : 0,
                    hasSkinIndex: !!g.attributes.skinIndex,
                    hasSkinWeight: !!g.attributes.skinWeight,
                    boneCount: m.skeleton ? m.skeleton.bones.length : 0,
                });
            }
        });
        const rawMeshCount: Record<string, any>[] = [];
        const rawModel = parseFreshFbx(MODEL_FBX);
        rawModel.traverse((n) => {
            const m = (n as THREE.SkinnedMesh);
            if (m.isSkinnedMesh) rawMeshCount.push({ name: m.name, vertices: m.geometry.attributes.position?.count ?? 0 });
        });

        // ============ Q3 ============
        const q3: Record<string, any> = {};
        for (const side of ['Left', 'Right'] as const) {
            const pBind = palmNormal(bind, side);
            const pOut = palmNormal(out, side);
            const pAnim = palmNormal(anim, side);
            q3[side] = {
                bindNormal: v3(pBind),
                outNormal: v3(pOut),
                animNormal: v3(pAnim),
                'bind_vs_out_deg': pBind && pOut ? r2(vecAngleDeg(pBind, pOut)) : null,
                'out_vs_anim_deg': pOut && pAnim ? r2(vecAngleDeg(pOut, pAnim)) : null,
                'bind_vs_anim_deg': pBind && pAnim ? r2(vecAngleDeg(pBind, pAnim)) : null,
                hasFingerBone: !!findFingerBone(anim, side),
            };
        }

        // ============ Q4 ============
        const q4: Record<string, any> = {};
        for (const side of ['Left', 'Right'] as const) {
            const b = elbowPlaneNormal(bind, side);
            const o = elbowPlaneNormal(out, side);
            const a = elbowPlaneNormal(anim, side);
            q4[side] = {
                bendDeg: { bind: r2(b.bendDeg), out: r2(o.bendDeg), anim: r2(a.bendDeg) },
                n_bind: v3(b.n),
                n_out: v3(o.n),
                n_anim: v3(a.n),
                'n_bind_vs_out_deg': b.n && o.n ? r2(vecAngleDeg(b.n, o.n)) : null,
                'n_out_vs_anim_deg': o.n && a.n ? r2(vecAngleDeg(o.n, a.n)) : null,
                'n_bind_vs_anim_deg': b.n && a.n ? r2(vecAngleDeg(b.n, a.n)) : null,
            };
        }

        // ============ Q5 ============
        const q5: Record<string, any> = {};
        for (const bn of ARM_BONES) {
            const axisOut = segDir(out, bn);
            const axisAnim = segDir(anim, bn);
            const relOutAnim = out.get(bn)!.quat.clone().multiply(anim.get(bn)!.quat.clone().invert());
            const relBindAnim = bind.get(bn)!.quat.clone().multiply(anim.get(bn)!.quat.clone().invert());
            const stOut = decomposeST(relOutAnim, axisOut);
            const stBind = decomposeST(relBindAnim, axisAnim);
            q5[bn] = {
                'twist_out_vs_anim_deg': r2(stOut.twistDeg),
                'swing_out_vs_anim_deg': r2(stOut.swingDeg),
                'twist_bind_vs_anim_deg': r2(stBind.twistDeg),
                'swing_bind_vs_anim_deg': r2(stBind.swingDeg),
            };
        }

        // ============ Q6 ============
        const q6: Record<string, any> = {};
        for (const bn of ARM_BONES) {
            const dp = out.get(bn)!.pos.distanceTo(anim.get(bn)!.pos);
            q6[bn] = {
                'deltaPos_out_vs_anim': +dp.toFixed(3),
                outPos: v3(out.get(bn)!.pos),
                animPos: v3(anim.get(bn)!.pos),
            };
        }
        const q6Seg: Record<string, any> = {};
        for (const side of ['Left', 'Right'] as const) {
            const S = `mixamorig${side}Shoulder`, F = `mixamorig${side}ForeArm`, H = `mixamorig${side}Hand`;
            const upOut = out.get(F)!.pos.clone().sub(out.get(S)!.pos).normalize();
            const upAnim = anim.get(F)!.pos.clone().sub(anim.get(S)!.pos).normalize();
            const foOut = out.get(H)!.pos.clone().sub(out.get(F)!.pos).normalize();
            const foAnim = anim.get(H)!.pos.clone().sub(anim.get(F)!.pos).normalize();
            q6Seg[side] = {
                'upperArm_dir_out_vs_anim_deg': r2(vecAngleDeg(upOut, upAnim)),
                'foreArm_dir_out_vs_anim_deg': r2(vecAngleDeg(foOut, foAnim)),
                'upperArm_len_out': +out.get(S)!.pos.distanceTo(out.get(F)!.pos).toFixed(3),
                'upperArm_len_anim': +anim.get(S)!.pos.distanceTo(anim.get(F)!.pos).toFixed(3),
                'foreArm_len_out': +out.get(F)!.pos.distanceTo(out.get(H)!.pos).toFixed(3),
                'foreArm_len_anim': +anim.get(F)!.pos.distanceTo(anim.get(H)!.pos).toFixed(3),
            };
        }

        // ============ Q7: CPU skinning (closest to visual) ============
        const meshBind = findSkinnedMesh(modelBind);
        const meshOut = findSkinnedMesh(modelOut);
        const q7: Record<string, any> = {};
        if (meshBind && meshOut) {
            const skBind = skinMesh(meshBind);
            const skOut = skinMesh(meshOut);
            const regions: Record<string, [string, string]> = {
                Left: ['LeftHand', 'LeftForeArm'],
                Right: ['RightHand', 'RightForeArm'],
            };
            const q7side: Record<string, any> = {};
            for (const side of ['Left', 'Right'] as const) {
                const [handNeedle, foreNeedle] = regions[side];
                // hand region centroid (bind vs out)
                const hb = boneRegion(skBind.skinned, skBind.dominantBone, handNeedle);
                const ho = boneRegion(skOut.skinned, skOut.dominantBone, handNeedle);
                // forearm region centroid (dominant ForeArm bone)
                const fb = boneRegion(skBind.skinned, skBind.dominantBone, foreNeedle);
                const fo = boneRegion(skOut.skinned, skOut.dominantBone, foreNeedle);
                // forearm segment direction from centroids (bind vs out)
                const dirB = hb.centroid.clone().sub(fb.centroid).normalize();
                const dirO = ho.centroid.clone().sub(fo.centroid).normalize();
                // vertex local drift: for hand-region verts, recompute local pos relative to dominant bone
                // (bind frame) and compare to (out frame) using out bone matrix -> mesh stretch proof
                let maxDrift = 0;
                let sumDrift = 0;
                let driftN = 0;
                for (let i = 0; i < skBind.skinned.length; i++) {
                    if (!skBind.dominantBone[i].includes(handNeedle)) continue;
                    // local pos in bind frame (world->boneBindInv) vs out frame (world->boneOutInv)
                    const boneName = skBind.dominantBone[i];
                    const bBone = findBoneByName(meshBind, boneName);
                    const oBone = findBoneByName(meshOut, boneName);
                    if (!bBone || !oBone) continue;
                    const locBind = skBind.skinned[i].clone().applyMatrix4(bBone.matrixWorld.clone().invert());
                    const locOut = skOut.skinned[i].clone().applyMatrix4(oBone.matrixWorld.clone().invert());
                    const d = locBind.distanceTo(locOut);
                    maxDrift = Math.max(maxDrift, d);
                    sumDrift += d;
                    driftN++;
                }
                q7side[side] = {
                    handRegionVerts: ho.count,
                    handCentroid_bind: v3(hb.centroid),
                    handCentroid_out: v3(ho.centroid),
                    handCentroid_delta: +hb.centroid.distanceTo(ho.centroid).toFixed(3),
                    foreCentroid_bind: v3(fb.centroid),
                    foreCentroid_out: v3(fo.centroid),
                    'foreArmSeg_dir_bind_vs_out_deg': r2(vecAngleDeg(dirB, dirO)),
                    'handRegion_vertexLocalDrift_max': +maxDrift.toFixed(4),
                    'handRegion_vertexLocalDrift_mean': driftN ? +(sumDrift / driftN).toFixed(4) : null,
                    handRegion_dominantBoneSample: skBind.dominantBone.slice(0, 5),
                };
            }
            q7.mesh = { name: meshOut.name, vertexCount: meshOut.geometry.attributes.position.count };
            q7.sides = q7side;
            q7.verdict = 'CPU skinning done (see sides). Local drift > 0 => mesh vertices no longer track bones rigidly => skin-level distortion.';
        } else {
            q7.verdict = 'No SkinnedMesh found - vertex-based assertion NOT possible.';
        }

        // ============ Q8: corrected skinning target = animQ * animBindQ^-1 * bindQ_model ============
        // V8 output worldQ = animQ (raw anim world orientation). But skinning uses bone.matrixWorld
        // composed with model bindInverse; the vertex-consistent target is
        //   worldQ_correct(b,t) = animQ(b,t) * animBindQ(b)^-1 * bindQ_model(b)
        // i.e. anim orientation FIRST mapped back to anim bind frame, THEN into model bind frame.
        // If bindQ_model ~= animBindQ (bones share frame) the two coincide; when they differ
        // (model bind != Mixamo rest, measured 39-177 deg in Q1 bind_vs_anim) V8's raw animQ is off
        // by exactly that bind-frame rotation -> skin-level twist/pronation that bone-level
        // orientation assertions (S13) cannot see.
        const q8: Record<string, any> = {};
        for (const bn of ARM_BONES) {
            const bindQ = bind.get(bn)!.quat;
            const animBindQ = animRest.get(bn)!.quat;
            const animQq = anim.get(bn)!.quat;
            const corrected = animQq.clone().multiply(animBindQ.clone().invert()).multiply(bindQ.clone());
            const outQ = out.get(bn)!.quat;
            const angleCorrected = quatDiffDeg(outQ, corrected);
            const angleAnim = quatDiffDeg(outQ, animQq);
            const bindFrameDelta = quatDiffDeg(bindQ, animBindQ);
            q8[bn] = {
                'out_vs_corrected_deg': r2(angleCorrected),
                'out_vs_anim_deg': r2(angleAnim),
                'bindFrameDelta_model_vs_animRest_deg': r2(bindFrameDelta),
                'out_vs_corrected_verdict': angleCorrected < 5 ? 'OK (corrected matches)' : 'MISMATCH (V8 raw animQ wrong frame)',
            };
        }

        console.log('\n================= V9 DIAGNOSTIC PROBE (probe-v9-diag) =================');
        console.log('\n[Q1] V8 effectiveness: arm bone world orientation output vs anim (dQuat deg)');
        console.log(JSON.stringify({ q1, q1MaxDeg: r2(q1Max), q1Verdict }, null, 2));
        console.log('\n[Q2] SkinnedMesh');
        console.log(JSON.stringify({ convertedModelMeshes: meshes, rawModelMeshes: rawMeshCount }, null, 2));
        console.log('\n[Q3] Palm facing (palm normal, pairwise angles)');
        console.log(JSON.stringify(q3, null, 2));
        console.log('\n[Q4] Elbow bend plane normal (pairwise angles)');
        console.log(JSON.stringify(q4, null, 2));
        console.log('\n[Q5] Per-bone swing-twist decomposition (relative to anim)');
        console.log(JSON.stringify(q5, null, 2));
        console.log('\n[Q6] Positions / segment directions');
        console.log(JSON.stringify({ q6, q6Seg }, null, 2));
        console.log('\n[Q7] CPU skinning (closest to visual)');
        console.log(JSON.stringify(q7, null, 2));
        console.log('\n[Q8] Corrected skinning target = animQ*animBindQ^-1*bindQ (vs V8 output)');
        console.log(JSON.stringify(q8, null, 2));

        expect(true).toBe(true);
    });
});

function findFingerBone(w: WorldState, side: 'Left' | 'Right'): boolean {
    for (const bn of w.keys()) {
        if (FINGER_RE.test(bn) && bn.includes(side)) return true;
    }
    return false;
}

function findBoneByName(root: THREE.Object3D, name: string): THREE.Bone | null {
    let found: THREE.Bone | null = null;
    root.traverse((n) => {
        if ((n as THREE.Bone).isBone && n.name === name && !found) found = n as THREE.Bone;
    });
    return found;
}
