/**
 * bone_converter D2 探针 BDD 步骤定义
 *
 * 覆盖 d2-probe.feature 的 5 个场景：
 *  1. 探针输出 JSON 结构有效
 *  2. 映射表目标名全部在动画轨道中确认存在（mixamoName 校准）
 *  3. 模型骨骼已含 mixamorig 命名（幂等守卫适用）
 *  4. 动画轨道均无冒号（根因①验证）
 *  5. SkinnedMesh skinIndex 范围有效
 *
 * 运行：cd services/bone_converter && yarn test:bdd
 */
import { loadFeature, defineFeature } from "jest-cucumber";
import fs from "fs";
import path from "path";
import {
    DEFAULT_TRIPO_TO_MIXAMO_MAP,
} from "../../src/tool/bone_converter/BoneMapping";

const feature = loadFeature("./test/features/d2-probe.feature");

// 加载探针输出 JSON
const PROBE_JSON_PATH = path.join(__dirname, "..", "..", "docs", "probe-output.json");

interface ProbeModel {
    file: string;
    boneCount: number;
    bones: { name: string; parentName: string | null; depth: number }[];
    boneNameSet: string[];
    skinnedMeshes: {
        name: string;
        vertexCount: number;
        boneCount: number;
        maxSkinIndex: number;
        minSkinIndex: number;
    }[];
    error?: string;
}

interface ProbeAnim {
    file: string;
    clipCount: number;
    trackCount: number;
    tracks: { fullName: string; boneName: string; property: string; hasColon: boolean }[];
    trackBoneNameSet: string[];
    hasAnyColon: boolean;
    boneCount: number;
    error?: string;
}

interface ProbeData {
    generatedAt: string;
    models: ProbeModel[];
    animations: ProbeAnim[];
}

function loadProbeJson(): ProbeData {
    const raw = fs.readFileSync(PROBE_JSON_PATH, "utf8");
    return JSON.parse(raw) as ProbeData;
}

defineFeature(feature, (test) => {
    // ---- 场景 1：探针输出 JSON 结构有效 ----
    test("探针输出 JSON 结构有效", ({ given, when, then, and }) => {
        let probe: ProbeData;

        given("the bone_converter D2 probe output exists", () => {
            expect(fs.existsSync(PROBE_JSON_PATH)).toBe(true);
        });
        when("reading the probe-output.json file", () => {
            probe = loadProbeJson();
        });
        then("the JSON should have a generatedAt timestamp", () => {
            expect(probe.generatedAt).toBeDefined();
            expect(new Date(probe.generatedAt).getTime()).toBeGreaterThan(0);
        });
        and("the models array should contain EliteGiantess1 and Soldier1 entries", () => {
            expect(probe.models.length).toBeGreaterThanOrEqual(2);
            const modelFiles = probe.models.map((m) => m.file);
            expect(modelFiles.some((f) => f.includes("EliteGiantess1"))).toBe(true);
            expect(modelFiles.some((f) => f.includes("Soldier1"))).toBe(true);
        });
        and("the model bone counts should be greater than 20", () => {
            for (const m of probe.models) {
                if (!m.error) {
                    expect(m.boneCount).toBeGreaterThan(20);
                }
            }
        });
        and("all model bone names should be non-empty", () => {
            for (const m of probe.models) {
                if (!m.error) {
                    for (const b of m.bones) {
                        expect(b.name.length).toBeGreaterThan(0);
                    }
                }
            }
        });
        and("the animations array should contain Idle and Death entries", () => {
            expect(probe.animations.length).toBeGreaterThanOrEqual(2);
            const animFiles = probe.animations.map((a) => a.file);
            expect(animFiles.some((f) => f.includes("Idle"))).toBe(true);
            expect(animFiles.some((f) => f.includes("Death"))).toBe(true);
        });
    });

    // ---- 场景 2：映射表目标名验证 ----
    test("映射表目标名全部在动画轨道中确认存在（mixamoName 校准）", ({ given, when, then, and }) => {
        let probe: ProbeData;
        let mixamoNames: string[];

        given("the bone_converter D2 probe output exists", () => {
            expect(fs.existsSync(PROBE_JSON_PATH)).toBe(true);
        });
        when("reading the BoneMapping.ts default map", () => {
            mixamoNames = DEFAULT_TRIPO_TO_MIXAMO_MAP
                .filter((e) => e.mixamoName.length > 0)
                .map((e) => e.mixamoName);
        });
        and("reading the probe animation track bone name sets", () => {
            probe = loadProbeJson();
        });
        then("every non-empty mixamoName in the mapping should exist in the animation track bone name set", () => {
            // 收集所有动画的 trackBoneNameSet 的并集（作为 Mixamo 动画全部骨骼名的 ground truth）
            const allTrackBoneNames = new Set<string>();
            for (const a of probe.animations) {
                if (!a.error) {
                    for (const bn of a.trackBoneNameSet) {
                        allTrackBoneNames.add(bn);
                    }
                }
            }

            const missing: string[] = [];
            for (const mn of mixamoNames) {
                if (!allTrackBoneNames.has(mn)) {
                    missing.push(mn);
                }
            }
            if (missing.length > 0) {
                throw new Error(
                    `以下映射表 mixamoName 在动画轨道中未找到: ${missing.join(", ")}`,
                );
            }
            expect(missing.length).toBe(0);
        });
        and("no mixamoName should contain a colon character", () => {
            for (const mn of mixamoNames) {
                expect(mn).not.toContain(":");
            }
        });
        and("all mixamoName should start with the mixamorig prefix", () => {
            for (const mn of mixamoNames) {
                expect(mn).toMatch(/^mixamorig/);
            }
        });
    });

    // ---- 场景 3：模型已含 mixamorig 命名 ----
    test("模型骨骼已含 mixamorig 命名（asset-lib 旧模型，已转换；幂等守卫对已转换模型适用）", ({ given, when, then, and }) => {
        let probe: ProbeData;

        given("the bone_converter D2 probe output exists", () => {
            expect(fs.existsSync(PROBE_JSON_PATH)).toBe(true);
        });
        when("reading the probe model bone lists", () => {
            probe = loadProbeJson();
        });
        then("all bones in EliteGiantess1 and Soldier1 should start with mixamorig", () => {
            for (const m of probe.models) {
                if (m.error) continue;
                for (const b of m.bones) {
                    expect(b.name).toMatch(
                        /^mixamorig/,
                    );
                }
            }
        });
        and("EliteGiantess1 should have exactly 33 bones", () => {
            const eg = probe.models.find((m) => m.file.includes("EliteGiantess1"));
            expect(eg).toBeDefined();
            if (!eg!.error) {
                expect(eg!.boneCount).toBe(33);
            }
        });
        and("Soldier1 should have exactly 25 bones", () => {
            const s = probe.models.find((m) => m.file.includes("Soldier1"));
            expect(s).toBeDefined();
            if (!s!.error) {
                expect(s!.boneCount).toBe(25);
            }
        });
        and("no model bone should be named Root, Hip, or Pelvis", () => {
            const forbidden = ["Root", "Hip", "Pelvis"];
            for (const m of probe.models) {
                if (m.error) continue;
                for (const b of m.bones) {
                    expect(forbidden).not.toContain(b.name);
                }
            }
        });
    });

    // ---- 场景 4：动画轨道无冒号 ----
    test("动画轨道均无冒号（根因①验证）", ({ given, when, then, and }) => {
        let probe: ProbeData;

        given("the bone_converter D2 probe output exists", () => {
            expect(fs.existsSync(PROBE_JSON_PATH)).toBe(true);
        });
        when("reading the probe animation track lists", () => {
            probe = loadProbeJson();
        });
        then("no animation track bone name should contain a colon", () => {
            for (const a of probe.animations) {
                if (a.error) continue;
                expect(a.hasAnyColon).toBe(false);
                for (const t of a.tracks) {
                    expect(t.boneName).not.toContain(":");
                }
            }
        });
        and("the animation bone name sets for Idle and Death should be identical", () => {
            const idle = probe.animations.find((a) => a.file.includes("Idle"));
            const death = probe.animations.find((a) => a.file.includes("Death"));
            expect(idle).toBeDefined();
            expect(death).toBeDefined();
            if (!idle!.error && !death!.error) {
                expect([...idle!.trackBoneNameSet].sort()).toEqual(
                    [...death!.trackBoneNameSet].sort(),
                );
            }
        });
        and("the number of animation clips should be 1 for each animation", () => {
            for (const a of probe.animations) {
                if (a.error) continue;
                expect(a.clipCount).toBe(1);
            }
        });
    });

    // ---- 场景 5：SkinnedMesh skinIndex 范围 ----
    test("SkinnedMesh skinIndex 范围有效", ({ given, when, then, and }) => {
        let probe: ProbeData;

        given("the bone_converter D2 probe output exists", () => {
            expect(fs.existsSync(PROBE_JSON_PATH)).toBe(true);
        });
        when("reading the probe model SkinnedMesh data", () => {
            probe = loadProbeJson();
        });
        then("for each model the maxSkinIndex should be less than the skeleton boneCount used by that mesh", () => {
            for (const m of probe.models) {
                if (m.error) continue;
                for (const sm of m.skinnedMeshes) {
                    expect(sm.maxSkinIndex).toBeLessThan(sm.boneCount);
                    expect(sm.maxSkinIndex).toBeGreaterThanOrEqual(0);
                }
            }
        });
        and("for each model the minSkinIndex should be 0", () => {
            for (const m of probe.models) {
                if (m.error) continue;
                for (const sm of m.skinnedMeshes) {
                    expect(sm.minSkinIndex).toBe(0);
                }
            }
        });
    });
});
