/**
 * loadFbx.ts — 用 three FBXLoader 加载 FBX 字节到 THREE.Object3D
 *
 * 支持 binary / ASCII FBX（FBXLoader 自动识别）。纹理加载失败不影响整体解析
 * （Node 无 DOM 时由调用方 polyfill；material.map 可能为空，导出时用解压出的纹理兜底）。
 */
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

/** 把 Uint8Array 规整成 ArrayBuffer（保留 byteOffset 语义，避免 slice 错位） */
function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
    return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
}

export function loadFbx(fbxBytes: Uint8Array): THREE.Object3D {
    const loader = new FBXLoader();
    return loader.parse(toArrayBuffer(fbxBytes), '');
}
