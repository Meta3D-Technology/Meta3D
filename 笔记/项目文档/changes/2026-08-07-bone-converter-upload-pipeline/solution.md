# 方案：bone_converter 上传管线封装（upload_pipeline）

> 日期：2026-08-07
> 项目：Meta3D（模组编辑器）
> 任务：把「tripo 模型压缩包 → 转换骨骼为 Mixamo → 输出带嵌入纹理的 FBX」四步封装进 `services/bone_converter/`，供 `meta3d-action-mod-unit-upload-model-file` 调用
> 模式：gts-auto 全自动（兄弟不在场）

## 1. 背景

兄弟提供 tripo 导出的模型压缩包（zip 内含 `.fbx` + `.fbm/` 纹理目录），要求：
1. 用 jszip 解压（参考 `packages/editor-whole/lib/extensions/meta3d-jszip/src/Main.ts` 的封装写法）
2. 把纹理合并进 FBX（嵌入，不依赖外部 .fbm 文件）
3. 把 FBX 的骨骼转换为 Mixamo 命名体系（复用 GTS-Play 迁入的 `convertTripoToMixamo`）
4. 保存为 `fbxData`（ArrayBuffer）

**这些步骤的代码全部封装到 `services/bone_converter/`**（兄弟明确要求），action 只调用 bone_converter 的 API。

## 2. 范围

### 做（本轮单元1）
- `services/bone_converter/src/tool/upload_pipeline/` 新模块（6 个文件 + assets）
- `package.json` 声明 jszip 依赖（根 node_modules 已有 3.10.1，hoisted，**不重装**）
- BDD 测试：`test/features/upload-pipeline.feature` + `test/step-definitions/upload-pipeline.steps.ts`
- 验证：`yarn test:bdd` 全绿 + `npx tsc --noEmit` 0 error（services/bone_converter 目录下）

### 不做（后续单元，需兄弟确认）
- **不改 `contributes/meta3d-action-mod-unit-upload-model-file`**：action 加 bone_converter workspace 依赖 = node_modules 链接变更，按 gts-auto 规则必须停问兄弟（yarn bootstrap 装依赖），兄弟不在场 → 本轮不做，完成后通知
- 不动 GTS-Play 任何文件
- 不改 three 版本、不改 demo 资产、不改 protocol 包
- 不操作 CloudBase / 数据库

## 3. 已确认事实（勘察结论，预置给实现方）

| # | 事实 | 验证方式 |
|---|------|---------|
| F1 | 测试资产：`services/bone_converter/demo/snapshot_EliteGiantess10/` 有 `tripo_convert_1efef564....fbx`（842KB，binary）+ `tripo_convert_....fbm/动漫女孩3d模型_basecolor.PNG`（527KB）+ `model_EliteGiantess10_lod2.fbx`（1077KB，官方 lod2 骨架） | 目录实测 |
| F2 | 兄弟桌面 zip 内容 = 上述 tripo fbx + PNG（1299KB），即 snapshot_EliteGiantess10 的 tripo 模型 | zip 实测 |
| F3 | **three.js 官方没有 FBXExporter**（examples/jsm/exporters 只有 DRACO/EXR/GLTF/KTX2/MMD/OBJ/PLY/STL/USDZ；r150/r159/master 均无 FBXExporter.js）→ **必须自写 ASCII FBX 导出器** | GitHub 目录实测 |
| F4 | three FBXLoader **支持 embedded texture**：Video 节点 `Content` 字段（base64 string）→ `data:image/png;base64,...`（源码 FBXLoader.js L223-340 parseImages/parseImage 确认） | 源码阅读 |
| F5 | 根 node_modules `jszip@3.10.1` 已存在（hoisted），bone_converter import 'jszip' 可解析，**无需重装** | node_modules 实测 |
| F6 | `convertTripoToMixamo(obj, { officialRestPose })`：输入 THREE.Object3D 原地转换，输出 ConvertReport；幂等守卫 `alreadyConverted`；传 officialRestPose 时做 rest pose 对齐（D6）+ 网格坐标变换（D7）+ 关节重绑（V12.3）+ boneInverse 对齐（V12.4） | bone_converter/index.ts 源码 |
| F7 | 同款 tripo 模型在 GTS-Play 侧转换结果：骨骼 41 → 22，全部 mixamorig 前缀（d4-convert.feature 场景 5 断言） | GTS-Play BDD |
| F8 | FBXLoader 在 Node 环境需要 polyfill（self/window/document/Image），参考 `test/step-definitions/d4-convert.steps.ts` 顶部 MockImage 方案 | 既有代码 |
| F9 | tripo fbx 是 **binary** FBX（头部 "Kaydara FBX Binary"），FBXLoader 可解析 | 文件头实测 |
| F10 | `meta3d-jszip` extension 只有 createZip/file/generateAsync（无解压）——本轮解压逻辑直接在 bone_converter 内用 jszip 实现，不依赖该 extension | 源码阅读 |
| F11 | 纹理文件名含中文（`动漫女孩3d模型_basecolor.PNG`），FBX 导出时文件名/引用需保留 UTF-8（ASCII FBX 支持 UTF-8 字符串） | 资产实测 |

## 4. 模块设计

```
services/bone_converter/src/tool/upload_pipeline/
├── index.ts               # 主入口 processTripoZip + 子步骤导出
├── unzipTripoZip.ts       # jszip 解压 → { fbxName, fbxBytes, textures: Map<fileName, Uint8Array> }
├── loadFbx.ts             # FBXLoader 加载（binary/ASCII 通用）
├── convertToMixamo.ts     # convertTripoToMixamo + officialRestPose 注入
├── exportFbx.ts           # 自写 ASCII FBX 导出器（几何/骨骼/蒙皮/材质 + 纹理 base64 嵌入）
├── officialRestPose.ts    # 内置官方 lod2 骨架加载
└── assets/
    └── lod2-base64.ts     # model_EliteGiantess10_lod2.fbx 的 base64 内联（生成脚本产出，约 1.4MB）
```

### 4.1 对外 API（index.ts）

```ts
export interface UnzippedTripo {
  fbxName: string;                       // 原始 fbx 文件名去扩展名
  fbxBytes: Uint8Array;
  textures: Map<string, Uint8Array>;     // key = 文件名（含扩展名，如 "动漫女孩3d模型_basecolor.PNG"）
}

export interface UploadPipelineOptions {
  officialRestPose?: THREE.Object3D;     // 不传则用内置 lod2 骨架
  embedTextures?: boolean;               // 默认 true
}

export interface UploadPipelineResult {
  fbxName: string;
  fbxData: ArrayBuffer;                  // 最终产物：mixamo 骨骼 + 嵌入纹理的 ASCII FBX
  report: ConvertReport;
  warnings: string[];
  textureCount: number;                  // 嵌入的纹理数
  fbxByteLength: number;                 // 转换后 fbx 字节数（lod 大小校验用）
}

export async function processTripoZip(zipBytes: ArrayBuffer, options?: UploadPipelineOptions): Promise<UploadPipelineResult>
export async function unzipTripoZip(zipBytes: ArrayBuffer): Promise<UnzippedTripo>
export function loadFbx(fbxBytes: Uint8Array): THREE.Object3D
export function convertToMixamo(obj: THREE.Object3D, officialRestPose?: THREE.Object3D): ConvertReport
export function exportFbx(obj: THREE.Object3D, options: { textures?: Map<string, Uint8Array> }): ArrayBuffer
export function loadOfficialRestPose(): THREE.Object3D
```

### 4.2 流程

```
processTripoZip(zipBytes)
  → unzipTripoZip(zipBytes)              // jszip.loadAsync → fbx + textures
  → loadFbx(fbxBytes)                    // FBXLoader.parse → THREE.Object3D（不加载纹理，纹理加载失败不影响）
  → convertToMixamo(obj, officialRestPose ?? loadOfficialRestPose())
  → exportFbx(obj, { textures })         // ASCII FBX + base64 嵌入
  → { fbxName, fbxData, report, ... }
```

## 5. ASCII FBX 导出规格（exportFbx 核心）

> 输出 FBX 7.4/7.5 ASCII 文本 → UTF-8 编码 ArrayBuffer。FBXLoader 能读回（BDD 闭环验证）。

### 5.1 顶层节点

```
; FBX 7.4.0 project file
FBXHeaderExtension:  {
    FBXHeaderVersion: 1003
    FBXVersion: 7400
    Creator: "bone_converter"
    CreationTimeStamp:  { ... }          // 可留空
}
GlobalSettings:  {
    Version: 1000
    Properties70:  {
        P: "UpAxis", "int", "Integer", "",1
        P: "UpAxisSign", "int", "Integer", "",1
        P: "FrontAxis", "int", "Integer", "",2
        P: "FrontAxisSign", "int", "Integer", "",1
        P: "CoordAxis", "int", "Integer", "",0
        P: "CoordAxisSign", "int", "Integer", "",1
        P: "OriginalUpAxis", "int", "Integer", "",-1
        P: "OriginalUpAxisSign", "int", "Integer", "",1
        P: "UnitScaleFactor", "double", "Number", "",1
    }
}
Definitions:  {
    Version: 100
    Count: <ModelCount+GeometryCount+MaterialCount+TextureCount+VideoCount>
    ObjectType: "Model" { Count: <n> }
    ObjectType: "Geometry" { Count: <n> }
    ObjectType: "Material" { Count: <n> }
    ObjectType: "Texture" { Count: <n> }
    ObjectType: "Video" { Count: <n> }
}
```

### 5.2 Objects

**Model::Mesh（网格挂点）**
```
Model: <meshModelId>, "Model::<meshName>", "Mesh" {
    Version: 232
    Properties70:  { }
    Shading: T
    Culling: "CullingOff"
}
```

**Geometry::<meshName>（网格数据 + 蒙皮）**
```
Geometry: <geometryId>, "Geometry::<meshName>", "Mesh" {
    Vertices: *<n>{a: x,y,z,...}                     // 展平 float
    PolygonVertexIndex: *<n>{a: ...}                 // 三角形索引，最后一位带符号位（-1 标记面结束）
    GeometryVersion: 124
    LayerElementNormal: 0 { Version: 101, Name: "", MappingInformationType: "ByPolygonVertex", ReferenceInformationType: "Direct", Normals: *<n>{a: ...} }
    LayerElementUV: 0 { Version: 101, Name: "UVMap", MappingInformationType: "ByPolygonVertex", ReferenceInformationType: "Direct", UV: *<n>{a: ...} }
    LayerElementMaterial: 0 { Version: 101, Name: "", MappingInformationType: "AllSame", ReferenceInformationType: "IndexToDirect", Materials: *1{a: 0} }
    LayerElementSmoothing: 0 { Version: 102, Name: "", MappingInformationType: "ByPolygon", ReferenceInformationType: "Direct", Smoothing: *<n>{a: ...} }
    Skin: {
        Version: 101
        SkinningType: "Linear"
        Geometry: "Geometry::<meshName>"
        Deformers: *<m>{a: <boneId>...}              // 骨骼 Model id 列表
        Weights: *<n>{a: ...}                        // 展平权重（对齐 FBXLoader parseMesh 的 Skin 解析）
        // 需要读 FBXLoader.js 的 parseMesh/skin 部分对齐格式（每顶点槽位/顺序/填充规则）
    }
}
```

**Model::LimbNode（骨骼）**
```
Model: <boneId>, "Model::<boneName>", "LimbNode" {
    Version: 232
    Properties70:  {
        P: "Lcl Translation", "Lcl Translation", "", "A",<x>,<y>,<z>
        P: "Lcl Rotation", "Lcl Rotation", "", "A",<rx>,<ry>,<rz>       // 欧拉 XYZ 角度制
        P: "Lcl Scaling", "Lcl Scaling", "", "A",<sx>,<sy>,<sz>
        // 如骨骼有 PreRotation 需求（FBXLoader 读 PreRotation），按需输出，默认不输出
    }
}
```

**Material**
```
Material: <materialId>, "Material::<matName>", "" {
    Version: 102
    ShadingModel: "phong"
    MultiLayer: 0
    Properties70:  {
        P: "Diffuse", "Vector3D", "Vector", "",0.8,0.8,0.8
        P: "DiffuseColor", "Color", "", "A",<r>,<g>,<b>
        P: "Specular", "Vector3D", "Vector", "",0.2,0.2,0.2
        ...
    }
}
```

**Texture + Video（纹理嵌入，F4 依据）**
```
Texture: <textureId>, "Texture::<texName>", "" {
    Type: "TextureVideoClip"
    Version: 202
    TextureName: "Texture::<texName>"
    Media: "Video::<videoName>"
    FileName: ""
    RelativeFilename: "<纹理文件名>"
    ModelUVTranslation: 0,0
    ModelUVScaling: 1,1
    Texture_Alpha_Source: "None"
    Cropping: 0,0,0,0
}
Video: <videoId>, "Video::<videoName>", "Clip" {
    Type: "Clip"
    Version: 202
    Content: "<base64 字符串，不带 data: 前缀>"
    Filename: "<纹理文件名>"
    RelativeFilename: "<纹理文件名>"
    Embedded: 1
}
```

### 5.3 Connections

```
Connections:  {
    C: "OO", <boneChildId>, <boneParentId>          // 骨骼父子层级（按转换后 Object3D 树）
    C: "OO", <meshModelId>, <rootBoneId>            // 网格挂到根骨
    C: "OC", <geometryId>, <meshModelId>            // Geometry → Model
    C: "OC", <materialId>, <meshModelId>            // Material → Model
    C: "OC", <textureId>, <materialId>              // Texture → Material
    C: "OC", <videoId>, <textureId>                 // Video → Texture
}
```

### 5.4 关键对齐点（实现时必须对照 FBXLoader.js 源码）

1. **PolygonVertexIndex**：FBXLoader 读负索引（`~index`）判断面结束，三角形输出 `[i0, i1, ~i2]`（i2 取反-1）
2. **Skin 解析**（FBXLoader.js `parseMesh`）：读 `Skin.Deformers`（骨骼 id）+ `Skin.Weights`，生成 skinIndex/skinWeight attributes——**导出格式必须与解析逻辑精确对齐**（顶点顺序、每顶点权重槽数、越界填充）
3. **骨骼 transform**：Lcl Translation/Rotation/Scaling 用 local 值；Rotation 欧拉 XYZ 角度制；three Object3D.quaternion → Euler('XYZ') → 弧度转角度
4. **UV 是 ByPolygonVertex**（顶点展开，每三角形 3 个 UV，重复顶点 UV 各自记录）
5. **ASCII 字符串**：`"..."` 内字符转义（`\` 与 `"`）；中文字符直接 UTF-8 输出（F11）
6. **数字格式**：float 用足够精度（如 6-8 位小数），保证坐标不丢失

## 6. 纹理嵌入规格

- 来源：解压出的 `textures: Map<fileName, Uint8Array>`
- 导出时：把纹理转 base64（`Buffer.from(bytes).toString('base64')` 或浏览器 btoa 兼容写法）写入 Video.Content
- Texture.RelativeFilename 与 Video.RelativeFilename 都用**原始文件名**（如 `动漫女孩3d模型_basecolor.PNG`），FBXLoader 的 parseImages 以 RelativeFilename 为 key 关联 blob（F4）
- 材质 map 名匹配：three 材质 `map.name` 或材质上记录的纹理文件名（导出时从材质取纹理：`(material.map as Texture)?.name` 或 image 的 src/文件名）——**若材质没挂纹理（源 fbx 纹理未加载），则导出时不生成 Texture/Video 节点，但 processTripoZip 应把解压出的纹理仍嵌入（按材质名/第一个纹理兜底）**——实现时定：优先材质 map；无 map 时若 textures 非空，把第一个纹理挂到第一个材质（保证模型有贴图）

## 7. BDD 场景清单（test/features/upload-pipeline.feature）

> 资产：`demo/snapshot_EliteGiantess10/` 下 tripo fbx + PNG + lod2 fbx。zip 在测试内用 jszip 现场打包（不依赖桌面文件）。

| # | 场景 | 断言 |
|---|------|------|
| S1 | 解压 zip | 返回 fbxBytes（≥100KB）、textures 含 1 项（PNG 字节一致）、fbxName 正确 |
| S2 | 无 fbx 的 zip | reject/throw 明确错误 |
| S3 | 加载 tripo fbx | Object3D 有 SkinnedMesh、骨骼数 > 20（tripo 原始 41 骨） |
| S4 | 转换骨骼 | 所有骨骼 mixamorig 前缀、骨数 22、无 Root/Pelvis/Twist、skinIndex < boneCount、报告字段完整 |
| S5 | 转换时传 officialRestPose | report.restPoseAlignedCount > 0（lod2 对齐生效） |
| S6 | 导出 FBX | ArrayBuffer 非空、FBXLoader 重新 parse 成功、网格/骨骼存在、骨骼名 mixamorig、skinIndex < boneCount、权重和 ≈1 |
| S7 | 纹理嵌入 | parse 后材质 map 存在、map.image.src 以 `data:image/png;base64,` 开头、解码后字节与原 PNG 一致 |
| S8 | 主流程 processTripoZip | fbxData 可 parse、骨骼全 mixamorig、纹理嵌入数 ≥1、fbxByteLength < 3MB（lod1 上限） |
| S9 | 幂等 | 已 mixamorig 命名的树再转换 → report.alreadyConverted=true（不重复转换） |

## 8. 验收标准（单元1）

1. `cd services/bone_converter && yarn test:bdd` → 既有 d1-d7 + 新增 upload-pipeline 全绿（0 failed）
2. `cd services/bone_converter && npx tsc --noEmit` → 0 error
3. 主流程真实 zip → 输出满足 S8 断言（骨骼 mixamorig / 纹理嵌入 / <3MB）
4. 不回归：d1-d7 场景全绿

## 9. 风险与对策

| 风险 | 对策 |
|------|------|
| ASCII FBX 导出格式与 FBXLoader 解析不完全对齐（蒙皮/索引） | BDD S6 闭环验证（导出→重解析→断言）；对照 FBXLoader.js parseMesh 源码逐项对齐 |
| 纹理嵌入后 FBXLoader 读不出 | F4 已验证 Content base64 支持；S7 断言 data URL 前缀 + 字节一致 |
| 中文文件名（F11）编码问题 | ASCII FBX 字符串 UTF-8 输出；测试用真实中文文件名资产 |
| base64 内联 lod2 资产体积（1.4MB ts） | 一次性加载可接受；webpack 打包无压力；生成脚本独立（scripts/embed-asset.cjs） |
| 浏览器/Node 双环境 | loadFbx 的 polyfill 与 d4-convert.steps.ts 一致；exportFbx 纯计算无 DOM 依赖（base64 用 Uint8Array 手写转换，不依赖 Buffer） |
| 转换后骨骼数量 ≠ 22（不同 tripo 模型） | 断言用「全部 mixamorig 前缀 + 无残留 Root/Pelvis/Twist」为主，骨数按样本断言 |
