/**
 * bone_converter D3 renameBones BDD 步骤定义
 *
 * 覆盖 d3-rename.feature 的 6 个场景：
 *  1. TWIST_BONE_PATTERNS 匹配有/无下划线/ForeTwist 三种 Twist 骨名
 *  2. 映射表基础身骨 tripoName 全部在真实 Tripo 模型骨名清单中
 *  3. renameBones 对构造骨骼树改名/保留/unmatched 计数
 *  4. renameBones 记录 userData.originalName
 *  5. 幂等：对已是 mixamorig 命名的骨骼树不重复改名
 *  6. renameBones 对真实 tripo_model FBX 执行后 22 基础身骨全部 ^mixamorig
 *
 * 运行：cd services/bone_converter && yarn test:bdd
 */
// ── Node 环境 polyfill（three FBXLoader 需要 browser globals）──
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
    addEventListener(_event: string, _cb: any) { }
    removeEventListener(_event: string, _cb: any) { }
    setAttribute(_name: string, _value: string) { }
    getAttribute(_name: string) { return null; }
}
(global as any).MockImage = MockImage;
(global as any).Image = MockImage;

import { loadFeature, defineFeature } from 'jest-cucumber';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import * as fs from 'fs';
import * as path from 'path';
import {
    DEFAULT_TRIPO_TO_MIXAMO_MAP,
    TWIST_BONE_PATTERNS,
    DEFAULT_UNMAPPED_KEEP_PATTERNS,
} from '../../src/tool/bone_converter/BoneMapping';
import { renameBones } from '../../src/tool/bone_converter/renameBones';
import { BoneMapEntry, BoneMappingEntry } from '../../src/tool/bone_converter/types';

const feature = loadFeature('./test/features/d3-rename.feature');

/** 将映射表数组转成 renameBones 需要的 Map<string, BoneMapEntry> */
function buildRenameMap(entries: BoneMappingEntry[] = DEFAULT_TRIPO_TO_MIXAMO_MAP): Map<string, BoneMapEntry> {
    const map = new Map<string, BoneMapEntry>();
    for (const e of entries) {
        map.set(e.tripoName, {
            newName: e.mixamoName,
            action: e.action,
            mergeTarget: e.mergeTarget,
        });
    }
    return map;
}

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const MODEL_FBX = path.join(
    REPO_ROOT,
    'services/bone_converter/demo/tripo_model/tripo_convert_09140e64-4506-4ebd-8841-5aae00631788.fbx',
);

/** 加载并缓存真实 tripo_model FBX（所有用到真实 FBX 的场景共享） */
let cachedModel: THREE.Object3D | null = null;
function loadTripoModel(): THREE.Object3D {
    if (cachedModel) return cachedModel;
    const buf = fs.readFileSync(MODEL_FBX);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    const loader = new FBXLoader();
    cachedModel = loader.parse(ab, MODEL_FBX);
    return cachedModel;
}

function collectBoneNames(root: THREE.Object3D): string[] {
    const names: string[] = [];
    root.traverse((n) => {
        if ((n as THREE.Bone).isBone) names.push(n.name);
    });
    return names;
}

/** 构造一个测试骨骼树：6 个骨骼，覆盖 映射/合并/删除/白名单/unmatched 五类 */
function buildTestBoneTree(): THREE.Group {
    const group = new THREE.Group();

    const mkBone = (name: string): THREE.Bone => {
        const b = new THREE.Bone();
        b.name = name;
        return b;
    };

    const hip = mkBone('Hip');
    const upperarm = mkBone('R_Upperarm');
    const root = mkBone('Root');
    const pelvis = mkBone('Pelvis');
    const hair = mkBone('Hair_Strand01');
    const unknown = mkBone('Unknown_Extra');

    group.add(hip, upperarm, root, pelvis, hair, unknown);
    return group;
}

/** 构造一个已是 mixamorig 命名的骨骼树（幂等场景） */
function buildMixamorigBoneTree(): THREE.Group {
    const group = new THREE.Group();
    const mkBone = (name: string): THREE.Bone => {
        const b = new THREE.Bone();
        b.name = name;
        return b;
    };
    group.add(mkBone('mixamorigHips'), mkBone('mixamorigRightArm'), mkBone('mixamorigRightUpLeg'));
    return group;
}

/** 22 个基础身骨目标名 */
const BASE_BODY_TARGETS: string[] = [
    'mixamorigHips',
    'mixamorigSpine',
    'mixamorigSpine1',
    'mixamorigSpine2',
    'mixamorigNeck',
    'mixamorigHead',
    'mixamorigRightShoulder',
    'mixamorigRightArm',
    'mixamorigRightForeArm',
    'mixamorigRightHand',
    'mixamorigLeftShoulder',
    'mixamorigLeftArm',
    'mixamorigLeftForeArm',
    'mixamorigLeftHand',
    'mixamorigRightUpLeg',
    'mixamorigRightLeg',
    'mixamorigRightFoot',
    'mixamorigRightToeBase',
    'mixamorigLeftUpLeg',
    'mixamorigLeftLeg',
    'mixamorigLeftFoot',
    'mixamorigLeftToeBase',
];

/** 手指骨条目（真实模型无手指骨，应注释说明未实测命中） */
const FINGER_ENTRIES: string[] = [
    'R_HandIndex1',
    'R_HandIndex2',
    'R_HandIndex3',
    'L_HandIndex1',
    'L_HandIndex2',
    'L_HandIndex3',
];

defineFeature(feature, (test) => {
    // ---- 场景 1：TWIST_BONE_PATTERNS 正则修复 ----
    test('TWIST_BONE_PATTERNS 能匹配无下划线/有下划线/ForeTwist 三种 Twist 骨名', ({ given, when, then, and }) => {
        let patterns: RegExp[] = [];

        given('the bone_converter package directory exists', () => {
            expect(fs.existsSync(path.join(REPO_ROOT, 'services', 'bone_converter'))).toBe(true);
        });
        when('checking the TWIST_BONE_PATTERNS patterns', () => {
            patterns = TWIST_BONE_PATTERNS;
        });
        then('"R_UpperarmTwist01" should match a twist pattern', () => {
            expect(patterns.some((p) => p.test('R_UpperarmTwist01'))).toBe(true);
        });
        and('"R_Upperarm_Twist01" should match a twist pattern', () => {
            expect(patterns.some((p) => p.test('R_Upperarm_Twist01'))).toBe(true);
        });
        and('"R_Forearm_ForeTwist01" should match a twist pattern', () => {
            expect(patterns.some((p) => p.test('R_Forearm_ForeTwist01'))).toBe(true);
        });
        and('"R_Hand" should not match any twist pattern', () => {
            expect(patterns.some((p) => p.test('R_Hand'))).toBe(false);
        });
        and('"mixamorigRightArm" should not match any twist pattern', () => {
            expect(patterns.some((p) => p.test('mixamorigRightArm'))).toBe(false);
        });
    });

    // ---- 场景 2：映射表 tripoName 校准 ----
    test('映射表基础身骨 tripoName 全部在真实 Tripo 模型骨名清单中', ({ given, when, then, and }) => {
        let realBoneNames: string[] = [];

        given('the bone_converter package directory exists', () => {
            expect(fs.existsSync(path.join(REPO_ROOT, 'services', 'bone_converter'))).toBe(true);
        });
        when('loading the real tripo model FBX bone list', () => {
            realBoneNames = collectBoneNames(loadTripoModel());
        });
        then('the model should have 41 bones', () => {
            expect(realBoneNames.length).toBe(41);
        });
        and('every non-finger tripoName in the default map should exist in the real bone list', () => {
            const realSet = new Set(realBoneNames);
            const missing: string[] = [];
            for (const e of DEFAULT_TRIPO_TO_MIXAMO_MAP) {
                if (FINGER_ENTRIES.includes(e.tripoName)) continue;
                if (!realSet.has(e.tripoName)) missing.push(e.tripoName);
            }
            if (missing.length > 0) {
                throw new Error(`以下 tripoName 未在真实模型中命中: ${missing.join(', ')}`);
            }
            expect(missing.length).toBe(0);
        });
        and('the finger tripoName entries should be documented as unverified', () => {
            const src = fs.readFileSync(
                path.join(REPO_ROOT, 'services/bone_converter/src/tool/bone_converter/BoneMapping.ts'),
                'utf8',
            );
            // 手指条目注释应声明「未实测命中」（真实模型无手指骨）
            expect(src).toMatch(/未实测/);
            expect(src).toMatch(/手指/);
        });
    });

    // ---- 场景 3：构造骨骼树改名/保留/unmatched ----
    test('renameBones 对构造的测试骨骼树正确处理映射/白名单/unmatched', ({ given, when, then, and }) => {
        let tree: THREE.Group;
        let result: { renamed: number; unmatched: string[]; keptByWhitelist: string[] };

        given('the bone_converter package directory exists', () => {
            expect(fs.existsSync(path.join(REPO_ROOT, 'services', 'bone_converter'))).toBe(true);
        });
        given('a constructed test bone tree with mapped whitelisted and unmapped bones', () => {
            tree = buildTestBoneTree();
        });
        when('calling renameBones with the default mapping', () => {
            result = renameBones(tree, buildRenameMap(), DEFAULT_UNMAPPED_KEEP_PATTERNS);
        });
        then('the mapped bones should be renamed to their mixamorig names', () => {
            const names = collectBoneNames(tree);
            expect(names).toContain('mixamorigHips');
            expect(names).toContain('mixamorigRightArm');
            expect(names).not.toContain('Hip');
            expect(names).not.toContain('R_Upperarm');
        });
        and('the merged and deleted bones should keep their original names', () => {
            const names = collectBoneNames(tree);
            expect(names).toContain('Root');
            expect(names).toContain('Pelvis');
        });
        and('the whitelisted bone should keep its original name', () => {
            const names = collectBoneNames(tree);
            expect(names).toContain('Hair_Strand01');
            expect(result.keptByWhitelist).toContain('Hair_Strand01');
        });
        and('the unmatched count should be 1', () => {
            expect(result.unmatched.length).toBe(1);
        });
        and('the unmatched list should contain "Unknown_Extra"', () => {
            expect(result.unmatched).toContain('Unknown_Extra');
        });
        and('the renamed count should be 2', () => {
            expect(result.renamed).toBe(2);
        });
    });

    // ---- 场景 4：userData.originalName ----
    test('renameBones 记录每个骨骼的 userData.originalName', ({ given, when, then }) => {
        let tree: THREE.Group;

        given('the bone_converter package directory exists', () => {
            expect(fs.existsSync(path.join(REPO_ROOT, 'services', 'bone_converter'))).toBe(true);
        });
        given('a constructed test bone tree with mapped whitelisted and unmapped bones', () => {
            tree = buildTestBoneTree();
        });
        when('calling renameBones with the default mapping', () => {
            renameBones(tree, buildRenameMap(), DEFAULT_UNMAPPED_KEEP_PATTERNS);
        });
        then('every bone should have userData.originalName set to its pre-rename name', () => {
            const originalNames = ['Hip', 'R_Upperarm', 'Root', 'Pelvis', 'Hair_Strand01', 'Unknown_Extra'];
            const found = new Set<string>();
            tree.traverse((n) => {
                if ((n as THREE.Bone).isBone) {
                    expect(n.userData.originalName).toBeDefined();
                    expect(originalNames).toContain(n.userData.originalName);
                    found.add(n.userData.originalName);
                }
            });
            for (const on of originalNames) {
                expect(found.has(on)).toBe(true);
            }
        });
    });

    // ---- 场景 5：幂等 ----
    test('renameBones 对已是 mixamorig 命名的骨骼树不重复改名', ({ given, when, then, and }) => {
        let tree: THREE.Group;
        let beforeNames: string[];
        let result: { renamed: number; unmatched: string[]; keptByWhitelist: string[] };

        given('the bone_converter package directory exists', () => {
            expect(fs.existsSync(path.join(REPO_ROOT, 'services', 'bone_converter'))).toBe(true);
        });
        given('a bone tree already named with mixamorig names', () => {
            tree = buildMixamorigBoneTree();
            beforeNames = collectBoneNames(tree);
        });
        when('calling renameBones with the default mapping', () => {
            result = renameBones(tree, buildRenameMap(), DEFAULT_UNMAPPED_KEEP_PATTERNS);
        });
        then('no bone name should change', () => {
            expect(collectBoneNames(tree)).toEqual(beforeNames);
        });
        and('the renamed count should be 0', () => {
            expect(result.renamed).toBe(0);
        });
        and('every bone should be counted as unmatched', () => {
            expect(result.unmatched.sort()).toEqual([...beforeNames].sort());
        });
    });

    // ---- 场景 6：真实 FBX 验证 ----
    test('renameBones 对真实 tripo_model FBX 执行后 22 个基础身骨全部以 mixamorig 开头', ({ given, when, then, and }) => {
        let model: THREE.Object3D;
        let boneNamesAfter: string[];

        given('the bone_converter package directory exists', () => {
            expect(fs.existsSync(path.join(REPO_ROOT, 'services', 'bone_converter'))).toBe(true);
        });
        when('loading the real tripo model FBX and calling renameBones', () => {
            // 深拷贝一份新模型再 rename，避免对 loadTripoModel() 缓存的模型 in-place rename（场景间污染）
            const buf = fs.readFileSync(MODEL_FBX);
            const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
            model = new FBXLoader().parse(ab, '');
            renameBones(model, buildRenameMap(), DEFAULT_UNMAPPED_KEEP_PATTERNS);
            boneNamesAfter = collectBoneNames(model);
        });
        then('exactly 22 bones should start with mixamorig', () => {
            const mixamorigCount = boneNamesAfter.filter((n) => n.startsWith('mixamorig')).length;
            expect(mixamorigCount).toBe(22);
        });
        and('the 22 base body target names should all be present', () => {
            const afterSet = new Set(boneNamesAfter);
            for (const t of BASE_BODY_TARGETS) {
                expect(afterSet.has(t)).toBe(true);
            }
        });
        and('the root pelvis and twist bones should keep their original names', () => {
            expect(boneNamesAfter).toContain('Root');
            expect(boneNamesAfter).toContain('Pelvis');
            // Twist 骨保留原名（合并到父骨是 D4 范围）
            const twists = boneNamesAfter.filter((n) => /(Twist|twist)\d+$/.test(n));
            expect(twists.length).toBeGreaterThan(0);
        });
    });
});
