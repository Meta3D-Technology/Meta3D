/**
 * bone_converter D1 package 骨架 BDD 步骤定义
 *
 * 覆盖 d1-package.feature 的 5 个场景：
 *  1. package.json 配置正确
 *  2. 工具模块与 demo 文件齐全
 *  3. 资产文件存在且非空（含 FBX magic bytes 校验）
 *  4. demo 资源 URL 对应真实文件
 *  5. types.ts 含审核修正
 *
 * 运行：cd packages/bone_converter && yarn test:bdd
 */
import { loadFeature, defineFeature } from "jest-cucumber";
import fs from "fs";
import path from "path";

const feature = loadFeature("./test/features/d1-package.feature");

// 仓库根目录（从 packages/bone_converter/test/step-definitions 出发，../../../.. 回到根）
const REPO_ROOT = path.resolve(__dirname, "..", "..", "..", "..");

// bone_converter package 目录
const PKG_DIR = path.join(REPO_ROOT, "packages", "bone_converter");

// FBX 二进制签名 magic bytes: "Kaydara FBX Binary  \x00\x1a\x00"
const FBX_MAGIC_PREFIX = Buffer.from([0x4B, 0x61, 0x79, 0x64, 0x61, 0x72, 0x61, 0x20, 0x46, 0x42, 0x58, 0x20, 0x42, 0x69, 0x6E, 0x61, 0x72, 0x79, 0x20, 0x20, 0x00, 0x1A, 0x00]);

function hasValidFbxSignature(filePath: string): boolean {
    const fd = fs.openSync(filePath, "r");
    const header = Buffer.alloc(FBX_MAGIC_PREFIX.length);
    fs.readSync(fd, header, 0, FBX_MAGIC_PREFIX.length, 0);
    fs.closeSync(fd);
    return header.equals(FBX_MAGIC_PREFIX);
}

function getFileSize(filePath: string): number {
    return fs.statSync(filePath).size;
}

// 资产文件（相对仓库根）
const ASSET_FILES: Record<string, string> = {
    "Tripo model": "packages/bone_converter/demo/tripo_model/tripo_convert_09140e64-4506-4ebd-8841-5aae00631788.fbx",
    "Mixamo Idle animation": "asset-lib/unit-action/src/asset/action/elitegiantess/default/Idle/1.fbx",
    "Mixamo Death animation": "asset-lib/unit-action/src/asset/action/elitegiantess/default/Death/1.fbx",
};

/** 把 demo URL 转成仓库根相对路径：
 *  /tripo-model/xxx.fbx → packages/bone_converter/demo/tripo_model/xxx.fbx
 *  /asset-lib/xxx       → asset-lib/xxx
 *  /snapshot/xxx        → packages/bone_converter/demo/snapshot_EliteGiantess9/xxx
 */
function urlToRepoPath(url: string): string {
    if (url.startsWith("/tripo-model/")) {
        return "packages/bone_converter/demo/tripo_model/" + url.slice("/tripo-model/".length);
    }
    if (url.startsWith("/snapshot/")) {
        return "packages/bone_converter/demo/snapshot_EliteGiantess9/" + url.slice("/snapshot/".length);
    }
    return url.replace(/^\/asset-lib\//, "asset-lib/");
}

// demo 三件套
const DEMO_FILES = ["main.ts", "index.html", "DebugPanel.ts"];

defineFeature(feature, (test) => {
    // ---- 场景 1：package.json 配置正确 ----
    test("package.json 配置正确（name、three 依赖、脚本齐全）", ({ given, when, then, and }) => {
        let pkg: Record<string, any> = {};

        given("the bone_converter package directory exists", () => {
            expect(fs.existsSync(PKG_DIR)).toBe(true);
        });
        when("checking the bone_converter package.json", () => {
            pkg = JSON.parse(fs.readFileSync(path.join(PKG_DIR, "package.json"), "utf8"));
        });
        then("the package name should be bone_converter", () => {
            expect(pkg.name).toBe("bone_converter");
        });
        and("the package should depend on three 0.159.0", () => {
            expect(pkg.dependencies.three).toBe("0.159.0");
        });
        and("the package should define the webpack:dev-server script", () => {
            expect(pkg.scripts["webpack:dev-server"]).toBeDefined();
        });
        and("the package should define the test:e2e script", () => {
            expect(pkg.scripts["test:e2e"]).toBeDefined();
        });
        and("the package should define the test:bdd script", () => {
            expect(pkg.scripts["test:bdd"]).toBeDefined();
        });
        and("the tsconfig, webpack config and jest config should exist", () => {
            expect(fs.existsSync(path.join(PKG_DIR, "tsconfig.json"))).toBe(true);
            expect(fs.existsSync(path.join(PKG_DIR, "webpack.config.js"))).toBe(true);
            expect(fs.existsSync(path.join(PKG_DIR, "jest.config.js"))).toBe(true);
        });
    });

    // ---- 场景 2：工具模块与 demo 文件齐全 ----
    test("工具模块与 demo 文件齐全", ({ given, when, then, and }) => {
        let modules: string[] = [];

        given("the bone_converter package directory exists", () => {
            expect(fs.existsSync(PKG_DIR)).toBe(true);
        });
        when("listing modules in src/tool/bone_converter", () => {
            const dir = path.join(PKG_DIR, "src/tool/bone_converter");
            modules = fs.readdirSync(dir).filter((f) => f.endsWith(".ts"));
        });
        then("the module list should contain 12 files", () => {
            expect(modules.length).toBe(12);
        });
        and("the module list should contain index.ts", () => {
            expect(modules).toContain("index.ts");
        });
        and("the module list should contain types.ts", () => {
            expect(modules).toContain("types.ts");
        });
        and("the module list should contain BoneMapping.ts", () => {
            expect(modules).toContain("BoneMapping.ts");
        });
        and("the module list should contain renameBones.ts", () => {
            expect(modules).toContain("renameBones.ts");
        });
        and("the module list should contain fixSkinningIndices.ts", () => {
            expect(modules).toContain("fixSkinningIndices.ts");
        });
        and("the module list should contain restructureHierarchy.ts", () => {
            expect(modules).toContain("restructureHierarchy.ts");
        });
        and("the module list should contain mergeBoneWeights.ts", () => {
            expect(modules).toContain("mergeBoneWeights.ts");
        });
        and("the module list should contain normalizeRootMotion.ts", () => {
            expect(modules).toContain("normalizeRootMotion.ts");
        });
        and("the module list should contain reposeModelBind.ts", () => {
            expect(modules).toContain("reposeModelBind.ts");
        });
        and("the module list should contain utils.ts", () => {
            expect(modules).toContain("utils.ts");
        });
        and("the module list should contain rebindJointVerts.ts", () => {
            expect(modules).toContain("rebindJointVerts.ts");
        });
        and("the demo files main.ts, index.html and DebugPanel.ts should exist", () => {
            for (const f of DEMO_FILES) {
                expect(fs.existsSync(path.join(PKG_DIR, "demo", f))).toBe(true);
            }
        });
    });

    // ---- 场景 3：资产文件存在且非空（含 FBX magic bytes 校验）----
    test("资产文件存在且非空（含 FBX magic bytes 校验）", ({ given, when, then, and }) => {
        let checkedFile = "";
        let fileExists = false;
        let fileSize = 0;
        let validSignature = false;

        given("the bone_converter package directory exists", () => {
            expect(fs.existsSync(PKG_DIR)).toBe(true);
        });
        when("checking the Tripo model FBX file", () => {
            checkedFile = path.join(REPO_ROOT, ASSET_FILES["Tripo model"]);
            fileExists = fs.existsSync(checkedFile);
            if (fileExists) {
                fileSize = getFileSize(checkedFile);
                validSignature = hasValidFbxSignature(checkedFile);
            }
        });
        then("the file should exist", () => {
            expect(fileExists).toBe(true);
        });
        and("the file should be non-empty", () => {
            expect(fileSize).toBeGreaterThan(0);
        });
        and("the file should have a valid FBX binary signature", () => {
            expect(validSignature).toBe(true);
        });
        when("checking the Mixamo Idle animation FBX file", () => {
            checkedFile = path.join(REPO_ROOT, ASSET_FILES["Mixamo Idle animation"]);
            fileExists = fs.existsSync(checkedFile);
            if (fileExists) {
                fileSize = getFileSize(checkedFile);
                validSignature = hasValidFbxSignature(checkedFile);
            }
        });
        then("the file should exist", () => {
            expect(fileExists).toBe(true);
        });
        and("the file should be non-empty", () => {
            expect(fileSize).toBeGreaterThan(0);
        });
        and("the file should have a valid FBX binary signature", () => {
            expect(validSignature).toBe(true);
        });
        when("checking the Mixamo Death animation FBX file", () => {
            checkedFile = path.join(REPO_ROOT, ASSET_FILES["Mixamo Death animation"]);
            fileExists = fs.existsSync(checkedFile);
            if (fileExists) {
                fileSize = getFileSize(checkedFile);
                validSignature = hasValidFbxSignature(checkedFile);
            }
        });
        then("the file should exist", () => {
            expect(fileExists).toBe(true);
        });
        and("the file should be non-empty", () => {
            expect(fileSize).toBeGreaterThan(0);
        });
        and("the file should have a valid FBX binary signature", () => {
            expect(validSignature).toBe(true);
        });
    });

    // ---- 场景 4：demo 资源 URL 对应真实文件 ----
    test("demo 资源 URL 对应真实文件", ({ given, when, then }) => {
        let src = "";
        let modelUrl = "";
        let animUrl = "";

        given("the bone_converter package directory exists", () => {
            expect(fs.existsSync(PKG_DIR)).toBe(true);
        });
        when("reading the model URL from demo/main.ts", () => {
            src = fs.readFileSync(path.join(PKG_DIR, "demo/main.ts"), "utf8");
            const m = src.match(/MODEL_URL\s*=\s*'([^']+)'/);
            expect(m).not.toBeNull();
            modelUrl = m![1];
        });
        then("the model URL should resolve to an existing file", () => {
            const rel = urlToRepoPath(modelUrl);
            expect(fs.existsSync(path.join(REPO_ROOT, rel))).toBe(true);
        });
        when("reading the animation URL from demo/main.ts", () => {
            src = fs.readFileSync(path.join(PKG_DIR, "demo/main.ts"), "utf8");
            const m = src.match(/ANIM_URL\s*=\s*'([^']+)'/);
            expect(m).not.toBeNull();
            animUrl = m![1];
        });
        then("the animation URL should resolve to an existing file", () => {
            const rel = animUrl.replace(/^\/asset-lib\//, "asset-lib/");
            expect(fs.existsSync(path.join(REPO_ROOT, rel))).toBe(true);
        });
    });

    // ---- 场景 5：types.ts 含审核修正 ----
    test("types.ts 含审核修正（幂等守卫 / 发骨策略）", ({ given, when, then, and }) => {
        let typesSrc = "";

        given("the bone_converter package directory exists", () => {
            expect(fs.existsSync(PKG_DIR)).toBe(true);
        });
        when("reading src/tool/bone_converter/types.ts", () => {
            typesSrc = fs.readFileSync(path.join(PKG_DIR, "src/tool/bone_converter/types.ts"), "utf8");
        });
        then("the source should contain the alreadyConverted field", () => {
            expect(typesSrc).toMatch(/alreadyConverted/);
        });
        and("the source should document deleteUnmapped defaults to false", () => {
            expect(typesSrc).toMatch(/默认 false/);
            expect(typesSrc).toMatch(/白名单/);
        });
    });
});
