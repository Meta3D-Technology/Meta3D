/**
 * exportFbx.ts — 自写 ASCII FBX 导出器
 *
 * three.js 官方没有 FBXExporter，这里手写 ASCII FBX 7.4（UTF-8 编码 ArrayBuffer），
 * 逐项对齐 FBXLoader.js 的解析逻辑（TextParser / parseSkeleton / parseMeshGeometry /
 * parseModel 的 Lcl 变换 / parseMaterial / parseTexture / parseImage），保证
 * 导出的 FBX 能被 FBXLoader 重新解析（BDD S6/S7 闭环验证）。
 *
 * 输出内容：
 *   - FBXHeaderExtension / GlobalSettings / Definitions
 *   - Objects：Model::Mesh、Geometry（Vertices/PolygonVertexIndex/法线/UV/材质层）、
 *     Model::LimbNode（骨骼，Lcl Translation/Rotation/Scaling）、
 *     Deformer（Skin + Cluster，Indexes/Weights/TransformLink）、Material、Texture、Video
 *   - Connections：骨骼层级、mesh↔geometry↔material、skin↔cluster↔bone、texture↔material、video↔texture
 *   - 纹理嵌入：Video.Content 写 base64（不带 data: 前缀），FBXLoader parseImage 读回 data URL
 *
 * 坐标/变换约定（对齐 FBXLoader）：
 *   - Lcl Rotation 欧拉 XYZ 角度制（quaternion → Euler('XYZ') 弧度转角度）
 *   - PolygonVertexIndex 三角形输出 [i0, i1, ~i2]（~i = -(i+1)，负索引标记面结束）
 *   - 网格顶点/法线/UV 已按三角面展开（与 FBXLoader 读入的非索引几何一致）
 *   - Cluster.Indexes 引用展开后顶点索引，Weights 对齐；每顶点最多 4 槽（FBXLoader 读取后补 0）
 *   - Cluster.TransformLink = boneInverse 的逆（bind 世界矩阵）
 */
import * as THREE from 'three';
import { uint8ArrayToBase64 } from './base64';

export interface ExportFbxOptions {
    /** 纹理文件名 → 字节。非空时嵌入 Video/Texture 节点；为空则导出无纹理 FBX */
    textures?: Map<string, Uint8Array>;
}

/** 单个输出节点写入器（行缓存 + 缩进） */
class FbxWriter {
    lines: string[] = [];
    private indent = 0;

    begin(name: string, header = ''): void {
        this.lines.push('\t'.repeat(this.indent) + `${name}:${header ? ' ' + header : ''} {`);
        this.indent++;
    }

    end(): void {
        this.indent--;
        this.lines.push('\t'.repeat(this.indent) + '}');
    }

    prop(name: string, value: string): void {
        this.lines.push('\t'.repeat(this.indent) + `${name}: ${value}`);
    }

    /** 数字数组属性：`a: v1,v2,...`（单行，无尾逗号，TextParser 直接 parseNumberArray） */
    arrayProp(name: string, values: number[]): void {
        this.lines.push('\t'.repeat(this.indent) + `${name}: *${values.length} {`);
        this.indent++;
        this.lines.push('\t'.repeat(this.indent) + `a: ${values.map((n) => fmt(n)).join(',')}`);
        this.indent--;
        this.lines.push('\t'.repeat(this.indent) + '}');
    }

    /** P 属性（Properties70 专用，对齐 parseNodeSpecialProperty 的解析） */
    p70(name: string, type1: string, type2: string, flag: string, value: string): void {
        this.lines.push(`\t`.repeat(this.indent) + `P: "${name}", "${type1}", "${type2}", "${flag}",${value}`);
    }

    toString(): string {
        return this.lines.join('\n') + '\n';
    }
}

/** 数字格式：整数原样；浮点保留最多 7 位小数并去尾零（对齐 parseFloat 解析） */
function fmt(n: number): string {
    if (!Number.isFinite(n)) return '0';
    if (Number.isInteger(n)) return String(n);
    let s = n.toFixed(7);
    s = s.replace(/0+$/, '').replace(/\.$/, '');
    return s;
}

/** 数字数组 → 逗号分隔字符串（同时用于 Properties70 的 Vector/Color 值） */
function nums(arr: number[]): string {
    return arr.map((n) => fmt(n)).join(',');
}

/** 属性数组 → 逗号分隔字符串（layer element 数值） */
function numsOf(arr: ArrayLike<number>, start: number, end: number): number[] {
    const out: number[] = [];
    for (let i = start; i < end; i++) out.push(arr[i]);
    return out;
}

/** 安全字符串：转义 `\` 与 `"`，中文字符保留 UTF-8 */
function str(s: string): string {
    return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

/** 从材质取纹理文件名（优先 material.map 名/路径；失败返回 null 走兜底） */
function textureFileNameOf(mat: THREE.Material): string | null {
    const map = (mat as THREE.MeshStandardMaterial).map;
    if (!map) return null;
    const img = (map as { image?: { src?: string } }).image;
    const src = img?.src;
    if (src) {
        const base = src.split(/[\\/]/).pop();
        if (base) return base;
    }
    const name = (map as { name?: string }).name;
    return name && name.includes('.') ? name : null;
}

/** 收集一个材质要嵌入的纹理：优先 map 命中；否则取 textures 第一个（兜底，保证模型有贴图） */
function resolveTexture(
    mat: THREE.Material,
    textures: Map<string, Uint8Array>,
    fallbackUsed: boolean,
): { name: string; bytes: Uint8Array; usedFallback: boolean } | null {
    if (!textures || textures.size === 0) return null;
    const want = textureFileNameOf(mat);
    if (want) {
        for (const [name, bytes] of textures) {
            if (name.toLowerCase() === want.toLowerCase() || want.toLowerCase().endsWith(name.toLowerCase())) {
                return { name, bytes, usedFallback: false };
            }
        }
    }
    if (!fallbackUsed) {
        const first = textures.entries().next().value as [string, Uint8Array] | undefined;
        if (first) return { name: first[0], bytes: first[1], usedFallback: true };
    }
    return null;
}

/**
 * 导出为 ASCII FBX（UTF-8）ArrayBuffer。
 * 遍历场景中的 Mesh/SkinnedMesh：每个 mesh 一个 Geometry + 一个 Mesh Model；
 * 第一个 SkinnedMesh 提供骨骼层级与 Skin/Cluster 蒙皮数据。
 */
export function exportFbx(obj: THREE.Object3D, options: ExportFbxOptions = {}): ArrayBuffer {
    const textures = options.textures ?? new Map<string, Uint8Array>();

    // ── 收集 mesh / 骨骼 ──
    const meshes: THREE.Mesh[] = [];
    obj.traverse((n) => {
        if ((n as THREE.Mesh).isMesh) meshes.push(n as THREE.Mesh);
    });

    const skinned: THREE.SkinnedMesh | null =
        meshes.find((m): m is THREE.SkinnedMesh => (m as THREE.SkinnedMesh).isSkinnedMesh) ?? null;

    // 骨骼清单：转换后 skeleton.bones 是权威列表（与 Object3D 树同对象）
    const skeletonBones: THREE.Bone[] = skinned?.skeleton?.bones ?? [];
    const treeBones: THREE.Bone[] = [];
    obj.traverse((n) => {
        if ((n as THREE.Bone).isBone) treeBones.push(n as THREE.Bone);
    });
    // 层级：以 skeletonBones 为主（保证索引 = cluster 顺序），缺失时补 treeBones
    const bones = skeletonBones.length > 0 ? skeletonBones : treeBones;

    // ── 分配 ID ──
    let nextId = 1000;
    const id = (): number => nextId++;

    const geometryIds: number[] = meshes.map(() => id());
    const meshModelIds: number[] = meshes.map(() => id());
    const boneModelIds: number[] = bones.map(() => id());
    const clusterIds: number[] = bones.map(() => id());
    const skinId = skinned ? id() : 0;
    const materialIds: number[] = meshes.map(() => id());
    // 纹理/视频节点：按「需嵌入的 (材质,纹理)」惰性分配
    const textureEntryByMaterial = new Map<number, { name: string; bytes: Uint8Array }>();
    const textureIds = new Map<number, number>(); // materialIndex → textureId
    const videoIds = new Map<number, number>(); // materialIndex → videoId
    let textureNodeCount = 0;
    let fallbackUsed = false;
    for (let i = 0; i < meshes.length; i++) {
        const mat = Array.isArray(meshes[i].material) ? meshes[i].material[0] : meshes[i].material;
        if (!mat) continue;
        const resolved = resolveTexture(mat, textures, fallbackUsed);
        if (resolved) {
            fallbackUsed = resolved.usedFallback || fallbackUsed;
            textureEntryByMaterial.set(i, { name: resolved.name, bytes: resolved.bytes });
            textureIds.set(i, id());
            videoIds.set(i, id());
            textureNodeCount++;
        }
    }

    const w = new FbxWriter();
    // 注释行必须先于任何节点：FBXLoader isFbxFormatASCII 按三角偏移探测，
    // 首行过短会把「二进制 magic 字符」误判命中。多行注释让探测通过。
    w.lines.push('; FBX 7.4.0 project file');
    w.lines.push('; generated by bone_converter upload_pipeline exportFbx');

    // ══════════ FBXHeaderExtension ══════════
    w.begin('FBXHeaderExtension');
    w.prop('FBXHeaderVersion', '1003');
    w.prop('FBXVersion', '7400');
    w.prop('Creator', '"bone_converter"');
    w.begin('CreationTimeStamp');
    w.prop('Version', '1000');
    w.end();
    w.end();

    // ══════════ GlobalSettings ══════════
    w.begin('GlobalSettings');
    w.prop('Version', '1000');
    w.begin('Properties70');
    w.p70('UpAxis', 'int', 'Integer', '', '1');
    w.p70('UpAxisSign', 'int', 'Integer', '', '1');
    w.p70('FrontAxis', 'int', 'Integer', '', '2');
    w.p70('FrontAxisSign', 'int', 'Integer', '', '1');
    w.p70('CoordAxis', 'int', 'Integer', '', '0');
    w.p70('CoordAxisSign', 'int', 'Integer', '', '1');
    w.p70('OriginalUpAxis', 'int', 'Integer', '', '-1');
    w.p70('OriginalUpAxisSign', 'int', 'Integer', '', '1');
    w.p70('UnitScaleFactor', 'double', 'Number', '', '1');
    w.end();
    w.end();

    // ══════════ Definitions ══════════
    const defCount =
        meshes.length * 2 + bones.length + (skinned ? 1 + bones.length : 0) + textureNodeCount * 2 + 1;
    w.begin('Definitions');
    w.prop('Version', '100');
    w.prop('Count', String(defCount));
    w.begin('ObjectType', '"Model"');
    w.prop('Count', String(meshes.length + bones.length));
    w.end();
    w.begin('ObjectType', '"Geometry"');
    w.prop('Count', String(meshes.length));
    w.end();
    w.begin('ObjectType', '"Material"');
    w.prop('Count', String(meshes.length));
    w.end();
    w.begin('ObjectType', '"Texture"');
    w.prop('Count', String(textureNodeCount));
    w.end();
    w.begin('ObjectType', '"Video"');
    w.prop('Count', String(textureNodeCount));
    w.end();
    w.begin('ObjectType', '"Deformer"');
    w.prop('Count', String(skinned ? 1 + bones.length : 0));
    w.end();
    w.end();

    // ══════════ Objects ══════════
    w.begin('Objects');

    // ── Geometry（每个 mesh 一个）──
    for (let i = 0; i < meshes.length; i++) {
        const mesh = meshes[i];
        const geo = mesh.geometry;
        const geoId = geometryIds[i];
        const geoName = str(mesh.name || `mesh_${i}`);

        const posAttr = geo.getAttribute('position') as THREE.BufferAttribute | null;
        const normalAttr = geo.getAttribute('normal') as THREE.BufferAttribute | null;
        const uvAttr = geo.getAttribute('uv') as THREE.BufferAttribute | null;
        if (!posAttr) continue;
        const vcount = posAttr.count;

        // 顶点/索引（已三角展开，PolygonVertexIndex 顺序索引 + 负号标记面尾）
        const posArr = posAttr.array as ArrayLike<number>;
        const positions: number[] = new Array(vcount * 3);
        for (let v = 0; v < vcount; v++) {
            positions[v * 3] = posArr[v * 3];
            positions[v * 3 + 1] = posArr[v * 3 + 1];
            positions[v * 3 + 2] = posArr[v * 3 + 2];
        }
        const polyIdx: number[] = new Array(vcount);
        for (let v = 0; v < vcount; v++) polyIdx[v] = v;
        // 每个三角形最后一位取反（~i = -(i+1)），标记面结束
        const triCount = Math.floor(vcount / 3);
        for (let t = 0; t < triCount; t++) polyIdx[t * 3 + 2] = -(t * 3 + 3);

        w.begin('Geometry', `${geoId}, "Geometry::${geoName}", "Mesh"`);
        w.arrayProp('Vertices', positions);
        w.arrayProp('PolygonVertexIndex', polyIdx);
        w.prop('GeometryVersion', '124');

        if (normalAttr) {
            const nArr = normalAttr.array as ArrayLike<number>;
            w.begin('LayerElementNormal', '0');
            w.prop('Version', '101');
            w.prop('Name', '""');
            w.prop('MappingInformationType', '"ByPolygonVertex"');
            w.prop('ReferenceInformationType', '"Direct"');
            w.arrayProp('Normals', numsOf(nArr, 0, vcount * 3));
            w.end();
        }
        if (uvAttr) {
            const uvArr = uvAttr.array as ArrayLike<number>;
            w.begin('LayerElementUV', '0');
            w.prop('Version', '101');
            w.prop('Name', '"UVMap"');
            w.prop('MappingInformationType', '"ByPolygonVertex"');
            w.prop('ReferenceInformationType', '"Direct"');
            w.arrayProp('UV', numsOf(uvArr, 0, vcount * 2));
            w.end();
        }
        w.begin('LayerElementMaterial', '0');
        w.prop('Version', '101');
        w.prop('Name', '""');
        w.prop('MappingInformationType', '"AllSame"');
        w.prop('ReferenceInformationType', '"IndexToDirect"');
        w.arrayProp('Materials', [0]);
        w.end();
        w.end(); // Geometry
    }

    // ── Model::Mesh（每个 mesh 一个，Lcl 单位置）──
    for (let i = 0; i < meshes.length; i++) {
        const mesh = meshes[i];
        const meshName = str(mesh.name || `mesh_${i}`);
        w.begin('Model', `${meshModelIds[i]}, "Model::${meshName}", "Mesh"`);
        w.prop('Version', '232');
        w.begin('Properties70');
        // 单位置：网格节点不做额外位移（几何已在 bind 空间）
        w.p70('Lcl Translation', 'Lcl Translation', '', 'A', '0,0,0');
        w.p70('Lcl Rotation', 'Lcl Rotation', '', 'A', '0,0,0');
        w.p70('Lcl Scaling', 'Lcl Scaling', '', 'A', '1,1,1');
        w.end();
        w.prop('Shading', 'T');
        w.prop('Culling', '"CullingOff"');
        w.end();
    }

    // ── Model::LimbNode（骨骼，Lcl 局部变换，对齐 parseModel getTransformData）──
    for (let i = 0; i < bones.length; i++) {
        const bone = bones[i];
        const boneName = str(bone.name || `bone_${i}`);
        const euler = new THREE.Euler().setFromQuaternion(bone.quaternion, 'XYZ');
        w.begin('Model', `${boneModelIds[i]}, "Model::${boneName}", "LimbNode"`);
        w.prop('Version', '232');
        w.begin('Properties70');
        w.p70('Lcl Translation', 'Lcl Translation', '', 'A', nums([bone.position.x, bone.position.y, bone.position.z]));
        w.p70('Lcl Rotation', 'Lcl Rotation', '', 'A', nums([THREE.MathUtils.radToDeg(euler.x), THREE.MathUtils.radToDeg(euler.y), THREE.MathUtils.radToDeg(euler.z)]));
        w.p70('Lcl Scaling', 'Lcl Scaling', '', 'A', nums([bone.scale.x, bone.scale.y, bone.scale.z]));
        w.end();
        w.prop('Shading', 'T');
        w.prop('Culling', '"CullingOff"');
        w.end();
    }

    // ── Deformer：Skin + Cluster（蒙皮，对齐 parseSkeleton / genGeometry）──
    if (skinned) {
        const skin = skinned.skeleton;
        w.begin('Deformer', `${skinId}, "Skin", "Skin"`);
        w.prop('Version', '101');
        w.prop('Type', '"Skin"');
        w.prop('Link_DeformAcuracy', '50');
        w.prop('SkinningType', '"Linear"');
        w.end();

        const skinIdxAttr = skinned.geometry.getAttribute('skinIndex') as THREE.BufferAttribute | null;
        const skinWgtAttr = skinned.geometry.getAttribute('skinWeight') as THREE.BufferAttribute | null;
        const vcount = skinIdxAttr ? skinIdxAttr.count : 0;

        for (let b = 0; b < bones.length; b++) {
            const clusterId = clusterIds[b];
            // 该骨骼影响的（顶点索引, 权重）列表
            const indices: number[] = [];
            const weights: number[] = [];
            if (skinIdxAttr && skinWgtAttr && b < skin.bones.length) {
                const si = skinIdxAttr.array as ArrayLike<number>;
                const sw = skinWgtAttr.array as ArrayLike<number>;
                for (let v = 0; v < vcount; v++) {
                    for (let k = 0; k < 4; k++) {
                        if (si[v * 4 + k] === b && sw[v * 4 + k] > 0) {
                            indices.push(v);
                            weights.push(sw[v * 4 + k]);
                        }
                    }
                }
            }
            // TransformLink = inverse(boneInverse) = bind 世界矩阵
            const transformLink = new THREE.Matrix4();
            const inv = skin.boneInverses[b];
            if (inv) transformLink.copy(inv).invert();
            else transformLink.identity();

            w.begin('Deformer', `${clusterId}, "Cluster", "Cluster"`);
            w.prop('Version', '100');
            w.prop('Mode', '"Total1"');
            w.prop('UserData', '""');
            if (indices.length > 0) {
                w.arrayProp('Indexes', indices);
                w.arrayProp('Weights', weights);
            }
            w.arrayProp('TransformLink', numsOf(transformLink.elements, 0, 16));
            w.end();
        }
    }

    // ── Material（每个 mesh 一个，phong + DiffuseColor）──
    for (let i = 0; i < meshes.length; i++) {
        const mat = Array.isArray(meshes[i].material) ? meshes[i].material[0] : meshes[i].material;
        const matName = str((mat?.name ?? `mat_${i}`) || `mat_${i}`);
        const color = mat ? (mat as THREE.MeshStandardMaterial).color : new THREE.Color(0.8, 0.8, 0.8);
        const c = color.clone().convertLinearToSRGB();
        w.begin('Material', `${materialIds[i]}, "Material::${matName}", ""`);
        w.prop('Version', '102');
        w.prop('ShadingModel', '"phong"');
        w.prop('MultiLayer', '0');
        w.begin('Properties70');
        w.p70('Diffuse', 'Vector3D', 'Vector', '', nums([c.r, c.g, c.b]));
        w.p70('DiffuseColor', 'Color', '', 'A', nums([c.r, c.g, c.b]));
        w.p70('Specular', 'Vector3D', 'Vector', '', '0.2,0.2,0.2');
        w.p70('Shininess', 'double', 'Number', '', '0.2');
        w.p70('Opacity', 'double', 'Number', '', '1');
        w.p70('Emissive', 'Vector3D', 'Vector', '', '0,0,0');
        w.end();
        w.end();
    }

    // ── Texture + Video（纹理嵌入，对齐 parseTexture / parseImages / parseImage）──
    for (let i = 0; i < meshes.length; i++) {
        const entry = textureEntryByMaterial.get(i);
        if (!entry) continue;
        const texId = textureIds.get(i)!;
        const videoId = videoIds.get(i)!;
        const texName = str(entry.name);
        const base64 = uint8ArrayToBase64(entry.bytes);

        w.begin('Texture', `${texId}, "Texture::${texName}", ""`);
        w.prop('Type', '"TextureVideoClip"');
        w.prop('Version', '202');
        w.prop('TextureName', `"Texture::${texName}"`);
        w.prop('Media', `"Video::${texName}"`);
        w.prop('FileName', `"${texName}"`);
        w.prop('RelativeFilename', `"${texName}"`);
        w.prop('ModelUVTranslation', '0,0');
        w.prop('ModelUVScaling', '1,1');
        w.prop('Texture_Alpha_Source', '"None"');
        w.prop('Cropping', '0,0,0,0');
        w.end();

        w.begin('Video', `${videoId}, "Video::${texName}", "Clip"`);
        w.prop('Type', '"Clip"');
        w.prop('Version', '202');
        w.prop('Content', `"${base64}"`);
        w.prop('Filename', `"${texName}"`);
        w.prop('RelativeFilename', `"${texName}"`);
        w.prop('Embedded', '1');
        w.end();
    }

    w.end(); // Objects

    // ══════════ Connections ══════════
    w.begin('Connections');
    // bone 层级（child → parent；根骨 → 0）
    for (let i = 0; i < bones.length; i++) {
        const bone = bones[i];
        const parent = bone.parent;
        const isBoneParent = parent && (parent as THREE.Bone).isBone;
        if (isBoneParent) {
            const pIdx = bones.indexOf(parent as THREE.Bone);
            if (pIdx >= 0) w.prop('C', `"OO",${boneModelIds[i]},${boneModelIds[pIdx]}`);
            else w.prop('C', `"OO",${boneModelIds[i]},0`);
        } else {
            w.prop('C', `"OO",${boneModelIds[i]},0`);
        }
    }
    // mesh model → 0（挂到场景根）
    for (let i = 0; i < meshes.length; i++) w.prop('C', `"OO",${meshModelIds[i]},0`);
    // geometry → mesh model；material → mesh model
    for (let i = 0; i < meshes.length; i++) {
        w.prop('C', `"OO",${geometryIds[i]},${meshModelIds[i]}`);
        w.prop('C', `"OO",${materialIds[i]},${meshModelIds[i]}`);
    }
    // skin → geometry；cluster → skin；bone → cluster（buildSkeleton 靠 bone 的 parent=cluster 匹配）
    if (skinned) {
        w.prop('C', `"OO",${skinId},${geometryIds[0]}`);
        for (let i = 0; i < bones.length; i++) {
            w.prop('C', `"OO",${clusterIds[i]},${skinId}`);
        }
        for (let i = 0; i < bones.length; i++) {
            w.prop('C', `"OO",${boneModelIds[i]},${clusterIds[i]}`);
        }
    }
    // texture → material（OP DiffuseColor）；video → texture
    for (let i = 0; i < meshes.length; i++) {
        const texId = textureIds.get(i);
        if (texId === undefined) continue;
        const videoId = videoIds.get(i)!;
        w.prop('C', `"OP",${texId},${materialIds[i]},"DiffuseColor"`);
        w.prop('C', `"OO",${videoId},${texId}`);
    }
    w.end();

    const text = w.toString();
    return new TextEncoder().encode(text).buffer as ArrayBuffer;
}

/** 统计将嵌入的纹理数（processTripoZip 用，与 exportFbx 内部逻辑一致） */
export function countEmbeddedTextures(
    obj: THREE.Object3D,
    textures: Map<string, Uint8Array>,
): number {
    if (!textures || textures.size === 0) return 0;
    const meshes: THREE.Mesh[] = [];
    obj.traverse((n) => {
        if ((n as THREE.Mesh).isMesh) meshes.push(n as THREE.Mesh);
    });
    let fallbackUsed = false;
    let count = 0;
    for (const m of meshes) {
        const mat = Array.isArray(m.material) ? m.material[0] : m.material;
        if (!mat) continue;
        const resolved = resolveTexture(mat, textures, fallbackUsed);
        if (resolved) {
            fallbackUsed = resolved.usedFallback || fallbackUsed;
            count++;
        }
    }
    return count;
}
