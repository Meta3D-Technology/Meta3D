/**
 * D2 探针脚本：加载真实 FBX（Tripo 模型 + Mixamo 动画），输出骨骼/轨道探针数据
 *
 * 用法：npx tsx scripts/probe-fbx.ts
 * 输出：docs/probe-output.json（机器可读） + docs/probe-output.txt（人类可读）
 *
 * 🔴 仅 Node.js 环境运行，不依赖浏览器 / DOM。
 */
// Polyfill browser globals for Node.js (Three.js loaders need these)
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
// Mock HTMLImageElement for Three.js ImageLoader
class MockImage {
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    width = 1;
    height = 1;
    private _src = '';
    get src() { return this._src; }
    set src(v: string) {
        this._src = v;
        // Trigger onload asynchronously to simulate image loading
        if (this.onload) setTimeout(() => this.onload!(), 0);
    }
    addEventListener(_event: string, _cb: any) { }
    removeEventListener(_event: string, _cb: any) { }
    setAttribute(_name: string, _value: string) { }
    getAttribute(_name: string) { return null; }
}
(global as any).MockImage = MockImage;
(global as any).Image = MockImage;

import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import * as fs from 'fs';
import * as path from 'path';

// ============================================================
// 配置
// ============================================================
const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const MODEL_FBX = path.join(
    REPO_ROOT,
    'asset-lib/unit-model/src/asset/elitegiantess/model_EliteGiantess1_lod1.fbx',
);
const SOLDIER_FBX = path.join(
    REPO_ROOT,
    'asset-lib/unit-model/src/asset/soldier/model_Soldier1_lod1.fbx',
);
const IDLE_FBX = path.join(
    REPO_ROOT,
    'asset-lib/unit-action/src/asset/action/elitegiantess/default/Idle/1.fbx',
);
const DEATH_FBX = path.join(
    REPO_ROOT,
    'asset-lib/unit-action/src/asset/action/elitegiantess/default/Death/1.fbx',
);
const DOCS_DIR = path.join(__dirname, '..', 'docs');

// ============================================================
// 类型
// ============================================================
interface BoneInfo {
    name: string;
    parentName: string | null;
    depth: number;
    hasTwistSuffix: boolean;
    localPosition: [number, number, number];
}

interface SkinnedMeshInfo {
    name: string;
    vertexCount: number;
    boneCount: number; // mesh.skeleton.bones.length
    maxSkinIndex: number; // max value in skinIndex attribute
    minSkinIndex: number;
}

interface TrackInfo {
    fullName: string;
    boneName: string; // 去掉 .position/.quaternion/.scale 的前缀
    property: 'position' | 'quaternion' | 'scale';
    hasColon: boolean;
}

interface ModelProbe {
    file: string;
    boneCount: number;
    bones: BoneInfo[];
    boneNameSet: string[]; // sorted, deduplicated
    boneTree: string; // indented hierarchical tree
    rootBone: string | null; // 第一个 Bone 对象名
    hipBone: string | null; // 匹配 Hip 的骨名
    pelvisBone: string | null; // 匹配 Pelvis 的骨名
    twistBones: string[]; // 匹配 twist 模式的骨名
    hairBones: string[]; // 匹配发骨模式的骨名
    fingerBones: string[]; // 匹配手指模式的骨名
    toeBones: string[]; // 匹配脚趾模式的骨名
    skinnedMeshes: SkinnedMeshInfo[];
    error?: string;
}

interface AnimationProbe {
    file: string;
    clipCount: number;
    trackCount: number;
    tracks: TrackInfo[];
    trackBoneNameSet: string[]; // sorted, deduplicated track bone names (prefixes)
    hasAnyColon: boolean;
    boneNameSet: string[]; // sorted bone names from the animation FBX skeleton
    boneCount: number;
    error?: string;
}

interface FullProbe {
    generatedAt: string;
    models: ModelProbe[];
    animations: AnimationProbe[];
}

// ============================================================
// 工具函数
// ============================================================

/** 读取 FBX 文件的 ArrayBuffer */
function readFbxArrayBuffer(filePath: string): ArrayBuffer {
    const buffer = fs.readFileSync(filePath);
    return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
}

/** 解析 FBX */
function parseFbx(arrayBuffer: ArrayBuffer, filePath: string): THREE.Group {
    const loader = new FBXLoader();
    return loader.parse(arrayBuffer, filePath);
}

/** 构建骨骼层级树（缩进表示） */
function buildBoneTree(bones: BoneInfo[]): string {
    const lines: string[] = [];
    for (const b of bones) {
        const indent = '  '.repeat(b.depth);
        const twist = b.hasTwistSuffix ? ' [TWIST]' : '';
        const pos = `(${b.localPosition[0].toFixed(3)}, ${b.localPosition[1].toFixed(3)}, ${b.localPosition[2].toFixed(3)})`;
        lines.push(`${indent}├── ${b.name}${twist} ${pos}`);
    }
    return lines.join('\n');
}

/**
 * 判断骨骼名是否匹配 Twist 模式
 *
 * ⚠️ X1：这是探针脚本的独立实现，与生产 TWIST_BONE_PATTERNS 有意不同，勿合并。
 *   生产实现见 src/tool/bone_converter/BoneMapping.ts 的 TWIST_BONE_PATTERNS
 *   （更精确的断言式 /^(R|L)_(UpperArm|ForeArm)...Twist\d+$/ 系列），本函数仅用于
 *   probe 输出的快速标记，宽松匹配不会影响转换逻辑。
 */
function isTwistBone(name: string): boolean {
    return /_(Twist|twist|ForeTwist)\d+$/i.test(name);
}

/** 判断骨骼名是否匹配发骨模式 */
function isHairBone(name: string): boolean {
    return /_Hair|Hair_|_Strand|Strand_/i.test(name);
}

/** 判断骨骼名是否匹配手指模式 */
function isFingerBone(name: string): boolean {
    return /Finger/i.test(name);
}

/** 判断骨骼名是否匹配脚趾模式 */
function isToeBone(name: string): boolean {
    return /Toe/i.test(name) && !/_ToeBase$/i.test(name);
}

/** 从 Object3D 树中提取所有 Bone 信息（深度优先，保持层级顺序） */
function extractBones(obj: THREE.Object3D): BoneInfo[] {
    const result: BoneInfo[] = [];

    function traverse(node: THREE.Object3D, depth: number) {
        if (node instanceof THREE.Bone) {
            result.push({
                name: node.name,
                parentName:
                    node.parent && node.parent instanceof THREE.Bone
                        ? node.parent.name
                        : null,
                depth,
                hasTwistSuffix: isTwistBone(node.name),
                localPosition: [node.position.x, node.position.y, node.position.z],
            });
        }
        for (const child of node.children) {
            traverse(child, depth + 1);
        }
    }

    traverse(obj, 0);
    return result;
}

/** 提取 SkinnedMesh 信息 */
function extractSkinnedMeshes(obj: THREE.Object3D): SkinnedMeshInfo[] {
    const result: SkinnedMeshInfo[] = [];
    obj.traverse((child) => {
        if (child instanceof THREE.SkinnedMesh) {
            const skinIndexAttr = child.geometry.getAttribute('skinIndex');
            let maxIdx = -1;
            let minIdx = Number.MAX_SAFE_INTEGER;
            if (skinIndexAttr) {
                for (let i = 0; i < skinIndexAttr.count; i++) {
                    for (let j = 0; j < 4; j++) {
                        const v = skinIndexAttr.getComponent(i, j);
                        if (v > maxIdx) maxIdx = v;
                        if (v < minIdx) minIdx = v;
                    }
                }
            }
            result.push({
                name: child.name,
                vertexCount: child.geometry.getAttribute('position')?.count ?? 0,
                boneCount: child.skeleton?.bones.length ?? 0,
                maxSkinIndex: maxIdx,
                minSkinIndex: minIdx,
            });
        }
    });
    return result;
}

/** 从 Object3D 的 animations 数组中提取动画轨道信息 */
function extractAnimationTracks(obj: THREE.Object3D): {
    clipCount: number;
    trackCount: number;
    tracks: TrackInfo[];
    trackBoneNameSet: string[];
    hasAnyColon: boolean;
} {
    const clips: THREE.AnimationClip[] = obj.animations || [];
    const tracks: TrackInfo[] = [];
    const boneNameSet = new Set<string>();
    let hasColon = false;

    for (const clip of clips) {
        for (const track of clip.tracks) {
            const fullName = track.name;
            // 去掉 .position / .quaternion / .scale 后缀得到骨骼名
            const boneName = fullName.replace(/\.(position|quaternion|scale)$/, '');
            const property = fullName.endsWith('.position')
                ? 'position'
                : fullName.endsWith('.quaternion')
                    ? 'quaternion'
                    : 'scale';
            if (boneName.includes(':')) hasColon = true;

            boneNameSet.add(boneName);
            tracks.push({
                fullName,
                boneName,
                property: property as 'position' | 'quaternion' | 'scale',
                hasColon: boneName.includes(':'),
            });
        }
    }

    return {
        clipCount: clips.length,
        trackCount: tracks.length,
        tracks,
        trackBoneNameSet: [...boneNameSet].sort(),
        hasAnyColon: hasColon,
    };
}

/** 探测一个模型 FBX */
function probeModel(filePath: string, label: string): ModelProbe {
    try {
        const ab = readFbxArrayBuffer(filePath);
        const group = parseFbx(ab, filePath);

        const bones = extractBones(group);
        const boneNameSet = [...new Set(bones.map((b) => b.name))].sort();

        // 找 Root/Hip/Pelvis
        let rootBone: string | null = null;
        let hipBone: string | null = null;
        let pelvisBone: string | null = null;
        for (const b of bones) {
            const bn = b.name.toLowerCase();
            if (bn === 'root' || bn === 'rootnode') rootBone = b.name;
            if (bn === 'hip' || bn === 'hips') hipBone = b.name;
            if (bn === 'pelvis') pelvisBone = b.name;
        }

        return {
            file: path.relative(REPO_ROOT, filePath),
            boneCount: bones.length,
            bones,
            boneNameSet,
            boneTree: buildBoneTree(bones),
            rootBone,
            hipBone,
            pelvisBone,
            twistBones: bones.filter((b) => b.hasTwistSuffix).map((b) => b.name),
            hairBones: bones.filter((b) => isHairBone(b.name)).map((b) => b.name),
            fingerBones: bones.filter((b) => isFingerBone(b.name)).map((b) => b.name),
            toeBones: bones.filter((b) => isToeBone(b.name)).map((b) => b.name),
            skinnedMeshes: extractSkinnedMeshes(group),
        };
    } catch (e: any) {
        return {
            file: path.relative(REPO_ROOT, filePath),
            boneCount: 0,
            bones: [],
            boneNameSet: [],
            boneTree: '',
            rootBone: null,
            hipBone: null,
            pelvisBone: null,
            twistBones: [],
            hairBones: [],
            fingerBones: [],
            toeBones: [],
            skinnedMeshes: [],
            error: e.message || String(e),
        };
    }
}

/** 探测一个动画 FBX（含骨骼 + 动画轨道） */
function probeAnimation(filePath: string, label: string): AnimationProbe {
    try {
        const ab = readFbxArrayBuffer(filePath);
        const group = parseFbx(ab, filePath);

        const bones = extractBones(group);
        const boneNameSet = [...new Set(bones.map((b) => b.name))].sort();

        const animInfo = extractAnimationTracks(group);

        return {
            file: path.relative(REPO_ROOT, filePath),
            clipCount: animInfo.clipCount,
            trackCount: animInfo.trackCount,
            tracks: animInfo.tracks,
            trackBoneNameSet: animInfo.trackBoneNameSet,
            hasAnyColon: animInfo.hasAnyColon,
            boneNameSet,
            boneCount: bones.length,
        };
    } catch (e: any) {
        return {
            file: path.relative(REPO_ROOT, filePath),
            clipCount: 0,
            trackCount: 0,
            tracks: [],
            trackBoneNameSet: [],
            hasAnyColon: false,
            boneNameSet: [],
            boneCount: 0,
            error: e.message || String(e),
        };
    }
}

// ============================================================
// 主流程
// ============================================================

function main() {
    console.log('=== D2 FBX 探针 ===');
    console.log(`仓库根: ${REPO_ROOT}`);
    console.log('');

    const result: FullProbe = {
        generatedAt: new Date().toISOString(),
        models: [],
        animations: [],
    };

    // 1. 探测模型
    console.log('[1/5] 探测 EliteGiantess1 模型...');
    const model = probeModel(MODEL_FBX, 'EliteGiantess1');
    result.models.push(model);
    if (model.error) {
        console.error(`  ❌ 错误: ${model.error}`);
    } else {
        console.log(`  ✅ 骨骼数: ${model.boneCount}`);
        console.log(`  Root: ${model.rootBone || '(无)'}`);
        console.log(`  Hip: ${model.hipBone || '(无)'}`);
        console.log(`  Pelvis: ${model.pelvisBone || '(无)'}`);
        console.log(`  Twist骨: ${model.twistBones.length} 个`);
        console.log(`  发骨: ${model.hairBones.length} 个`);
        console.log(`  手指骨: ${model.fingerBones.length} 个`);
        console.log(`  脚趾骨: ${model.toeBones.length} 个`);
        console.log(`  SkinnedMesh: ${model.skinnedMeshes.length} 个`);
    }

    console.log('');
    console.log('[2/5] 探测 Soldier1 模型...');
    const soldier = probeModel(SOLDIER_FBX, 'Soldier1');
    result.models.push(soldier);
    if (soldier.error) {
        console.error(`  ❌ 错误: ${soldier.error}`);
    } else {
        console.log(`  ✅ 骨骼数: ${soldier.boneCount}`);
        console.log(`  Root: ${soldier.rootBone || '(无)'}`);
        console.log(`  Hip: ${soldier.hipBone || '(无)'}`);
        console.log(`  Pelvis: ${soldier.pelvisBone || '(无)'}`);
        console.log(`  Twist骨: ${soldier.twistBones.length} 个`);
        console.log(`  SkinnedMesh: ${soldier.skinnedMeshes.length} 个`);
    }

    console.log('');
    console.log('[3/5] 探测 Idle 动画...');
    const idle = probeAnimation(IDLE_FBX, 'Idle');
    result.animations.push(idle);
    if (idle.error) {
        console.error(`  ❌ 错误: ${idle.error}`);
    } else {
        console.log(`  ✅ 骨骼数: ${idle.boneCount}`);
        console.log(`  Clip数: ${idle.clipCount}`);
        console.log(`  轨道数: ${idle.trackCount}`);
        console.log(`  轨道骨骼名（去重后）: ${idle.trackBoneNameSet.length} 个`);
        console.log(`  含冒号: ${idle.hasAnyColon ? '是' : '否'}`);
    }

    console.log('');
    console.log('[4/5] 探测 Death 动画...');
    const death = probeAnimation(DEATH_FBX, 'Death');
    result.animations.push(death);
    if (death.error) {
        console.error(`  ❌ 错误: ${death.error}`);
    } else {
        console.log(`  ✅ 骨骼数: ${death.boneCount}`);
        console.log(`  Clip数: ${death.clipCount}`);
        console.log(`  轨道数: ${death.trackCount}`);
        console.log(`  轨道骨骼名（去重后）: ${death.trackBoneNameSet.length} 个`);
        console.log(`  含冒号: ${death.hasAnyColon ? '是' : '否'}`);
    }

    // 5. 输出 JSON
    console.log('');
    console.log('[5/5] 输出结果...');

    if (!fs.existsSync(DOCS_DIR)) {
        fs.mkdirSync(DOCS_DIR, { recursive: true });
    }

    const jsonPath = path.join(DOCS_DIR, 'probe-output.json');
    fs.writeFileSync(jsonPath, JSON.stringify(result, null, 2), 'utf8');
    console.log(`  📄 JSON: ${jsonPath}`);

    // 生成人类可读报告
    const txtPath = path.join(DOCS_DIR, 'probe-output.txt');
    const txtLines: string[] = [];
    txtLines.push(`=== D2 FBX 探针结果 ===`);
    txtLines.push(`生成时间: ${result.generatedAt}`);
    txtLines.push('');

    for (const m of result.models) {
        txtLines.push(`─`.repeat(70));
        txtLines.push(`模型: ${m.file}`);
        txtLines.push(`─`.repeat(70));
        if (m.error) {
            txtLines.push(`  ❌ 错误: ${m.error}`);
            txtLines.push('');
            continue;
        }
        txtLines.push(`  骨骼数: ${m.boneCount}`);
        txtLines.push(`  Root: ${m.rootBone || '(无)'}`);
        txtLines.push(`  Hip: ${m.hipBone || '(无)'}`);
        txtLines.push(`  Pelvis: ${m.pelvisBone || '(无)'}`);
        txtLines.push(`  Twist骨 (${m.twistBones.length}): ${m.twistBones.join(', ') || '(无)'}`);
        txtLines.push(`  发骨 (${m.hairBones.length}): ${m.hairBones.join(', ') || '(无)'}`);
        txtLines.push(`  手指骨 (${m.fingerBones.length}): ${m.fingerBones.join(', ') || '(无)'}`);
        txtLines.push(`  脚趾骨 (${m.toeBones.length}): ${m.toeBones.join(', ') || '(无)'}`);
        txtLines.push('');
        txtLines.push(`  🦴 骨骼层级树:`);
        txtLines.push(m.boneTree);
        txtLines.push('');
        txtLines.push(`  📐 SkinnedMesh (${m.skinnedMeshes.length}):`);
        for (const sm of m.skinnedMeshes) {
            txtLines.push(
                `    - ${sm.name}: ${sm.vertexCount} 顶点, ${sm.boneCount} 骨骼, skinIndex [${sm.minSkinIndex}..${sm.maxSkinIndex}]`,
            );
        }
        txtLines.push('');
    }

    for (const a of result.animations) {
        txtLines.push(`─`.repeat(70));
        txtLines.push(`动画: ${a.file}`);
        txtLines.push(`─`.repeat(70));
        if (a.error) {
            txtLines.push(`  ❌ 错误: ${a.error}`);
            txtLines.push('');
            continue;
        }
        txtLines.push(`  骨骼数: ${a.boneCount}`);
        txtLines.push(`  Clip数: ${a.clipCount}`);
        txtLines.push(`  轨道数: ${a.trackCount}`);
        txtLines.push(`  含冒号: ${a.hasAnyColon ? '是 ⚠️' : '否 ✅'}`);
        txtLines.push('');
        txtLines.push(`  🎬 动画骨骼名（去重后，${a.trackBoneNameSet.length} 个）:`);
        for (const bn of a.trackBoneNameSet) {
            txtLines.push(`    - ${bn}`);
        }
        txtLines.push('');
        txtLines.push(`  📋 全部轨道 (${a.tracks.length}):`);
        for (const t of a.tracks) {
            txtLines.push(`    ${t.fullName}`);
        }
        txtLines.push('');
    }

    fs.writeFileSync(txtPath, txtLines.join('\n'), 'utf8');
    console.log(`  📄 TXT: ${txtPath}`);

    console.log('');
    console.log('=== 探针完成 ===');
}

main();
