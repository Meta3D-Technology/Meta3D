/**
 * probe-v10-skel-diag — V10 骨架/蒙皮诊断探针
 *
 * 目的：确认转换后 skinned mesh 的骨骼清单 + 各骨 dominant 顶点数，为 S16
 * 多时间点网格方向断言选择可靠的骨区域（probe-v9-multitime Q7 发现左手区域
 * dominant 匹配 0 顶点，需查清原因）。
 *
 * Run:
 *   cd packages/bone_converter && npx jest --config jest.config.js --testMatch "**" --testPathPattern "probe-v10-skel-diag" --forceExit
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
import { convertTripoToMixamo } from '../../src/tool/bone_converter/index';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const MODEL_FBX = path.join(
    REPO_ROOT,
    'packages/bone_converter/demo/tripo_model/tripo_convert_09140e64-4506-4ebd-8841-5aae00631788.fbx',
);

function parseFreshFbx(filePath: string): THREE.Group {
    const buf = fs.readFileSync(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return new FBXLoader().parse(ab, '');
}

describe('probe-v10-skel-diag', () => {
    test('enumerate skeleton bones + dominant vertex counts per bone', () => {
        const model = parseFreshFbx(MODEL_FBX);
        convertTripoToMixamo(model);
        model.updateMatrixWorld(true);
        let mesh: THREE.SkinnedMesh | null = null;
        model.traverse((n) => {
            if ((n as THREE.SkinnedMesh).isSkinnedMesh && !mesh) mesh = n as THREE.SkinnedMesh;
        });
        const info: Record<string, any> = {};
        const allMeshes: any[] = [];
        model.traverse((n) => {
            if ((n as THREE.SkinnedMesh).isSkinnedMesh) allMeshes.push(n as THREE.SkinnedMesh);
        });
        info.skinnedMeshCount = allMeshes.length;
        info.meshVertexCounts = allMeshes.map((m) => (m.geometry.attributes.position as THREE.BufferAttribute).count);
        if (!mesh) {
            info.error = 'no skinned mesh found';
        } else {
            const sk = mesh.skeleton;
            info.skeletonBones = sk.bones.map((b) => b.name);
            info.boneInverseCount = sk.boneInverses.length;
            const posAttr = mesh.geometry.attributes.position as THREE.BufferAttribute;
            const idxAttr = mesh.geometry.attributes.skinIndex as THREE.BufferAttribute;
            const wgtAttr = mesh.geometry.attributes.skinWeight as THREE.BufferAttribute;
            info.vertexCount = posAttr.count;
            const counts = new Map<string, number>();
            for (let i = 0; i < posAttr.count; i++) {
                let best = -1;
                let bestW = -1;
                for (let k = 0; k < 4; k++) {
                    const w = wgtAttr.getX(i * 4 + k);
                    if (w > bestW) { bestW = w; best = idxAttr.getX(i * 4 + k); }
                }
                const bname = best >= 0 && sk.bones[best] ? sk.bones[best].name : '(none)';
                counts.set(bname, (counts.get(bname) || 0) + 1);
            }
            info.dominantCounts = Array.from(counts.entries()).map(([n, c]) => ({ bone: n, verts: c }));
            info.armBoneIndex = {};
            for (const s of ['Left', 'Right'] as const) {
                for (const part of ['Shoulder', 'Arm', 'ForeArm', 'Hand'] as const) {
                    const bn = `mixamorig${s}${part}`;
                    const bi = sk.bones.findIndex((b) => b.name === bn);
                    info.armBoneIndex[bn] = bi;
                }
            }
            // 顶层骨骼与 parent 结构（确认 Shoulder/Arm 是否都在肩关节附近）
            const hierarchy: Record<string, any> = {};
            sk.bones.forEach((b) => {
                hierarchy[b.name] = {
                    parent: b.parent && (b.parent as THREE.Bone).isBone ? b.parent.name : '(root/group)',
                    pos: [b.position.x, b.position.y, b.position.z],
                };
            });
            info.hierarchy = hierarchy;
            info.skinnedMeshWorldMatrix = mesh.matrixWorld.elements.slice();
        }
        console.log('\n===== probe-v10-skel-diag =====');
        console.log(JSON.stringify(info, null, 2));
        expect(true).toBe(true);
    });
});
