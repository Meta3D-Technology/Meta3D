/**
 * officialRestPose.ts — 加载内置官方 lod2 骨架（rest pose 对齐参照）
 *
 * model_EliteGiantess10_lod2.fbx 已由 scripts/embed-asset.cjs 内联为 base64
 * （assets/lod2-base64.ts），运行时 decode + FBXLoader.parse 成 Object3D，
 * 无 fetch、webpack 兼容。结果单例缓存，避免多次 parse。
 */
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { LOD2_FBX_BASE64 } from './assets/lod2-base64';
import { base64ToUint8Array } from './base64';

let cached: THREE.Object3D | null = null;

export function loadOfficialRestPose(): THREE.Object3D {
    if (cached) return cached;
    const bytes = base64ToUint8Array(LOD2_FBX_BASE64);
    const ab = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
    cached = new FBXLoader().parse(ab, '');
    return cached;
}
