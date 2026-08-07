/**
 * bone_converter Demo 入口（D1 + D4 集成）
 *
 * 功能：
 *  1. 创建 Three.js 场景（Scene + PerspectiveCamera + WebGLRenderer + OrbitControls）
 *  2. 「加载 Tripo 模型」按钮 → FBXLoader 加载精英巨大娘 lod1 模型 → 显示 T-pose + 骨骼列表
 *  3. 「Tripo→Mixamo 转换」按钮 → convertTripoToMixamo 完整转换（骨骼 41→22）→ 显示转换报告
 *  4. 「加载 Mixamo 动画」按钮 → FBXLoader 加载 Mixamo Idle 动画 → 显示动画轨道列表
 *  5. 「播放 / 停止」按钮 → AnimationMixer 播放 / 停止
 *  6. 底部日志区：console 风格日志（加载耗时、骨骼数、转换报告、轨道数）
 *
 * 资源通过 webpack-dev-server static 托管（publicPath /asset-lib），以 URL 引用。
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { DebugPanel } from './DebugPanel';
import { convertTripoToMixamo, normalizeRootMotion } from '../src/tool/bone_converter';
// ===== 资源 URL（对应 asset-lib 真实文件）=====
// V12：demo 改用 snapshot_EliteGiantess9 的 Tripo 模型（399df0b7，15075 顶点），
// 它与 Mixamo 官方 lod2 绑骨（model_EliteGiantess9_lod2.fbx）是同一套网格 →
// 转换时传入 lod2 官方骨架作为 rest pose 参照（officialRestPose），
// 转换后骨骼 rest transform 与 Mixamo 官方完全一致（D6 验收）。
const MODEL_URL = '/snapshot/tripo_convert_399df0b7-dabb-4524-b87e-b4605f9cf68a.fbx';
/** Mixamo 官方 lod2 绑骨骨架（rest pose 对齐参照） */
const OFFICIAL_REST_URL = '/snapshot/model_EliteGiantess9_lod2.fbx';
const ANIM_URL = '/asset-lib/unit-action/src/asset/action/elitegiantess/default/Walk/1.fbx'; // TEMP-V11: Walk test (revert to Idle)
// ===== 按钮 =====
const btnLoadModel = document.getElementById('btn-load-model');
const btnLoadOfficial = document.getElementById('btn-load-official');
const btnConvert = document.getElementById('btn-convert');
const btnLoadAnim = document.getElementById('btn-load-anim');
const btnPlay = document.getElementById('btn-play');
const btnStop = document.getElementById('btn-stop');
const statusEl = document.getElementById('status');
// ===== Three.js 场景 =====
const container = document.getElementById('viewport');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1e1e1e);
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10000);
camera.position.set(3, 2.5, 5);
camera.lookAt(0, 1.2, 0);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.2, 0);
controls.enableDamping = true;
controls.update();
// 灯光
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
scene.add(hemiLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);
// 地面网格（便于观察位移）
const grid = new THREE.GridHelper(20, 20, 0x888888, 0x555555);
scene.add(grid);
// ===== 运行时状态 =====
let model = null;
let mixer = null;
let currentClip = null;
let animClip = null;
/** 原始动画 FBX 骨架（含 Mixamo 静态 rest），供 normalizeRootMotion 变体 B 采样 S_w */
let animSkeleton = null;
/** V12：Mixamo 官方 lod2 骨架（rest pose 对齐参照），加载模型时一并异步加载 */
let officialRestRoot = null;
// window 访问出口：demo 专用（e2e 通过 window.__xxx__ 断言），统一走 win 保持简洁
const win = window;
/** e2e 探针：计算 model 世界包围盒（含骨骼变形，供「模型在视口内」断言） */
function computeModelBBox() {
    if (!model)
        return null;
    const box = new THREE.Box3();
    model.traverse((node) => {
        const mesh = node;
        if (mesh.isSkinnedMesh && mesh.geometry) {
            // 用骨骼变形后的顶点算包围盒（geometry.computeBoundingBox 内部走 getVertexPosition）
            const geo = mesh.geometry;
            if (geo.boundingBox === null)
                geo.computeBoundingBox();
            if (!geo.boundingBox)
                return;
            const b = geo.boundingBox.clone();
            b.applyMatrix4(mesh.matrixWorld);
            box.union(b);
        }
        else if (node.isMesh && node.geometry) {
            const geo = node.geometry;
            if (geo.boundingBox === null)
                geo.computeBoundingBox();
            if (!geo.boundingBox)
                return;
            const b = geo.boundingBox.clone();
            b.applyMatrix4(node.matrixWorld);
            box.union(b);
        }
    });
    if (box.isEmpty())
        return null;
    return {
        min: box.min.toArray(),
        max: box.max.toArray(),
        center: box.getCenter(new THREE.Vector3()).toArray(),
        size: box.getSize(new THREE.Vector3()).toArray(),
    };
}
/** e2e 探针：统计骨骼世界矩阵合法性（无 NaN/无穷，scale 非 0） */
function computeBoneStats() {
    if (!model)
        return null;
    let nanCount = 0;
    let infCount = 0;
    let zeroScaleCount = 0;
    let count = 0;
    const sample = [];
    model.traverse((node) => {
        const bone = node;
        if (!bone.isBone)
            return;
        count += 1;
        bone.updateWorldMatrix(true, false);
        const m = bone.matrixWorld;
        for (let i = 0; i < 16; i++) {
            const v = m.elements[i];
            if (Number.isNaN(v))
                nanCount += 1;
            else if (!Number.isFinite(v))
                infCount += 1;
        }
        const ws = new THREE.Vector3();
        bone.getWorldScale(ws);
        if (ws.lengthSq() === 0 || !Number.isFinite(ws.x + ws.y + ws.z))
            zeroScaleCount += 1;
        if (count <= 5)
            sample.push(`${bone.name}@(${bone.position.x.toFixed(3)},${bone.position.y.toFixed(3)},${bone.position.z.toFixed(3)})`);
    });
    return { count, nanCount, infCount, zeroScaleCount, sample };
}
// 探针挂到 window（e2e 断言模型可见性/骨骼合法性）
win.__MODEL_BBOX__ = computeModelBBox;
win.__BONE_STATS__ = computeBoneStats;
/** e2e 探针：设置相机位置（拉近/旋转用），传入相机世界位置 [x,y,z] 和注视目标 [tx,ty,tz] */
win.__SET_CAMERA__ = (pos, target) => {
    camera.position.set(pos[0], pos[1], pos[2]);
    controls.target.set(target[0], target[1], target[2]);
    controls.update();
};
const panel = new DebugPanel();
const fbxLoader = new FBXLoader();
// ===== 工具函数 =====
function log(message, level = 'info') {
    panel.log(message, level);
    // eslint-disable-next-line no-console
    console.log(`[bone_converter] ${message}`); // demo only
}
/** 收集所有骨骼名（traverse + isBone） */
function collectBoneNames(root) {
    const names = [];
    root.traverse((node) => {
        if (node.isBone)
            names.push(node.name);
    });
    return names;
}
/** 收集所有动画轨道名 */
function collectTrackNames(clip) {
    return clip.tracks.map((t) => t.name);
}
/** 轨道名后缀（如 mixamorigHips.position → mixamorigHips） */
const TRACK_SUFFIX_RE = /\.(position|quaternion|scale|rotation)$/;
/** D5 验收匹配率阈值（S5：≥0.8 视为满足 Mixamo 命名匹配） */
const ANIM_MATCH_THRESHOLD = 0.8;
/**
 * 手指骨轨道（Mixamo 命名）。S5 验收明确「手指可不部分匹配」：
 * Tripo 生成模型通常没有手指骨（D3 已验证），因此动画中的手指轨道天然无法绑定。
 * 匹配率按「可绑定轨道」（非手指轨道）计算，手指轨道单列统计、不参与 rate 分母。
 *
 * TODO: 当前正则硬编码 mixamorig 前缀，仅支持 Mixamo 骨架体系；若未来支持
 * 其他骨架命名（如 Unity Humanoid HumanBone），需将前缀参数化。
 */
const FINGER_TRACK_RE = /mixamorig(?:Left|Right)Hand(?:Index|Middle|Ring|Pinky|Thumb)\d*$/;
/** 从轨道名提取骨骼名（去 .position/.quaternion/.scale/.rotation 后缀） */
function trackBoneName(trackName) {
    return trackName.replace(TRACK_SUFFIX_RE, '');
}
/**
 * 计算动画轨道与模型骨骼的匹配统计，并挂到 window.__ANIM_MATCH__。
 *
 * 匹配规则：解析轨道名（去掉 .position/.quaternion/.scale/.rotation 后缀得到骨骼名），
 * 统计「骨骼名 ∈ 模型骨骼名集合」的轨道数量。
 * 模型未转换时（Tripo 命名）匹配率会很低 —— 这是预期，只有转换后（mixamorig 命名）才有高匹配。
 *
 * 匹配率按 S5 验收口径计算：rate = 匹配轨道数 / 可绑定轨道数（总轨道 - 手指轨道）。
 * 手指轨道因模型无手指骨（D3 已验证）天然无法命中，S5 明确「手指可不部分匹配」。
 *
 * @returns 统计结果；model 或 animClip 缺失时返回 null 并置 window.__ANIM_MATCH__ = null
 */
function computeAnimMatch() {
    if (!model || !animClip) {
        win.__ANIM_MATCH__ = null;
        return null;
    }
    const boneNames = new Set(collectBoneNames(model));
    const tracks = animClip.tracks;
    const total = tracks.length;
    let matched = 0;
    let fingerTracks = 0;
    const unmatchedSet = new Set();
    for (const t of tracks) {
        const boneName = trackBoneName(t.name);
        if (FINGER_TRACK_RE.test(boneName)) {
            fingerTracks += 1;
            continue;
        }
        if (boneNames.has(boneName)) {
            matched += 1;
        }
        else {
            unmatchedSet.add(boneName);
        }
    }
    // S5 口径：rate = 匹配 / 可绑定轨道（总轨道 - 手指轨道）
    const bindableTotal = total - fingerTracks;
    const rate = bindableTotal > 0 ? matched / bindableTotal : 0;
    const stat = { total, matched, rate, clipName: animClip.name };
    win.__ANIM_MATCH__ = stat;
    const pct = (rate * 100).toFixed(1);
    log(`轨道匹配: ${matched}/${total}（${pct}%）${rate >= ANIM_MATCH_THRESHOLD ? ' ✓ 满足 Mixamo 命名匹配' : ''}`, rate >= ANIM_MATCH_THRESHOLD ? 'ok' : 'warn');
    if (fingerTracks > 0) {
        log(`手指轨道 ${fingerTracks} 条（S5: 手指可不部分匹配，模型无手指骨，不计入匹配率）`, 'info');
    }
    if (unmatchedSet.size > 0) {
        log(`未匹配轨道骨骼名（${unmatchedSet.size}）: ${Array.from(unmatchedSet).join(' , ')}`, 'warn');
    }
    return stat;
}
function setStatus(text) {
    statusEl.textContent = text;
}
// ===== 加载 Tripo 模型 =====
function loadModel() {
    const t0 = performance.now();
    setStatus('加载模型中…');
    log(`开始加载模型: ${MODEL_URL}`);
    // V12：同时预加载 Mixamo 官方 lod2 骨架（rest pose 参照），转换时传入
    // convertTripoToMixamo(options.officialRestPose)。失败不阻塞模型加载，转换时降级。
    if (!officialRestRoot) {
        fbxLoader.load(OFFICIAL_REST_URL, (obj) => {
            officialRestRoot = obj;
            const bones = collectBoneNames(obj);
            log(`官方 lod2 骨架已加载（${bones.length} 骨），转换时将作为 rest pose 参照`, 'ok');
        }, undefined, (err) => {
            log(`官方 lod2 骨架加载失败: ${err instanceof Error ? err.message : String(err)}`, 'warn');
        });
    }
    fbxLoader.load(MODEL_URL, (object) => {
        // 清除旧模型
        if (model)
            scene.remove(model);
        // G2：重载模型时旧 mixer/动画引用随旧模型一并失效，重置避免误用旧骨骼
        mixer = null;
        currentClip = null;
        win.__ANIM_MIXER__ = null;
        model = object;
        scene.add(object);
        const elapsed = ((performance.now() - t0) / 1000).toFixed(2);
        const bones = collectBoneNames(object);
        panel.setBoneList(bones);
        log(`模型加载成功，耗时 ${elapsed}s`, 'ok');
        log(`骨骼数量: ${bones.length}`);
        log(`SkinnedMesh 数量: ${collectSkinnedMeshCount(object)}`);
        // D1 探针（方案 P2-1）：打印 Root 的 local/world scale，确认是否为单位阵
        probeRootScale(object);
        // D1 探针：Twist 骨 parent（方案 P2-4）
        probeTwistBones(bones, object);
        btnConvert.disabled = false;
        btnLoadAnim.disabled = false;
        // V12：Tripo 模型也是大模型（约 100 单位），拉远相机适配
        fitCameraToModel(object);
        // G1：重载模型后若已加载动画，重算轨道匹配（骨骼命名可能已变化）
        if (animClip)
            computeAnimMatch();
        setStatus('模型已加载，可转换或加载动画');
    }, undefined, (err) => {
        log(`模型加载失败: ${err instanceof Error ? err.message : String(err)}`, 'error');
        setStatus('模型加载失败');
    });
}
// ===== 加载 Mixamo 官方模型（lod2，对照组）=====
// V12 对照实验：直接加载官方 lod2 模型，看它播放 Mixamo 动画是否正确。
// 如果官方模型播放正常 → 问题在转换/对齐链路；如果官方模型也异常 → 问题在动画/播放链路。
function loadOfficialModel() {
    const t0 = performance.now();
    setStatus('加载官方 lod2 模型中…');
    log(`开始加载官方模型: ${OFFICIAL_REST_URL}`);
    fbxLoader.load(OFFICIAL_REST_URL, (object) => {
        if (model)
            scene.remove(model);
        mixer = null;
        currentClip = null;
        win.__ANIM_MIXER__ = null;
        model = object;
        officialRestRoot = object;
        scene.add(object);
        const elapsed = ((performance.now() - t0) / 1000).toFixed(2);
        const bones = collectBoneNames(object);
        panel.setBoneList(bones);
        log(`官方模型加载成功，耗时 ${elapsed}s`, 'ok');
        log(`骨骼数量: ${bones.length}（官方 65 骨）`);
        log(`SkinnedMesh 数量: ${collectSkinnedMeshCount(object)}`);
        // V12：官方模型 bbox 可能很大（lod2 约 100 单位），拉远相机适配
        fitCameraToModel(object);
        btnConvert.disabled = true; // 官方模型无需转换
        btnLoadAnim.disabled = false;
        if (animClip)
            computeAnimMatch();
        setStatus('官方模型已加载，可加载动画并播放（对照组）');
    }, undefined, (err) => {
        log(`官方模型加载失败: ${err instanceof Error ? err.message : String(err)}`, 'error');
        setStatus('官方模型加载失败');
    });
}
/** 相机适配：按模型 bbox 拉远镜头（lod2/Tripo 模型约 100 单位，默认相机看不到全貌） */
function fitCameraToModel(root) {
    root.updateWorldMatrix(true, true);
    const box = new THREE.Box3().setFromObject(root);
    if (box.isEmpty())
        return;
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const radius = size.length() * 0.5;
    camera.position.set(center.x + radius * 0.8, center.y + radius * 0.6, center.z + radius * 1.2);
    controls.target.copy(center);
    controls.update();
    log(`[相机适配] center=(${center.x.toFixed(2)},${center.y.toFixed(2)},${center.z.toFixed(2)}) size=(${size.x.toFixed(1)},${size.y.toFixed(1)},${size.z.toFixed(1)})`, 'info');
}
function collectSkinnedMeshCount(root) {
    let count = 0;
    root.traverse((node) => {
        if (node.isSkinnedMesh)
            count += 1;
    });
    return count;
}
/** 探针：Root 的 localScale / worldScale（方案 P2-1） */
function probeRootScale(root) {
    root.updateWorldMatrix(true, true);
    const localScale = root.scale.clone();
    const worldScale = new THREE.Vector3();
    root.getWorldScale(worldScale);
    log(`[探针] Root.localScale = (${localScale.x}, ${localScale.y}, ${localScale.z})`, 'info');
    log(`[探针] Root.worldScale = (${worldScale.x}, ${worldScale.y}, ${worldScale.z})`, 'info');
    log(localScale.lengthSq() === 3 ? '[探针] Root 缩放为单位阵' : '[探针] ⚠️ Root 携带非单位缩放，注意 attach() 烘焙', localScale.lengthSq() === 3 ? 'ok' : 'warn');
}
/** 探针：Twist 骨的实际 parent（方案 P2-4） */
function probeTwistBones(bones, root) {
    const twistPattern = /(Twist|twist)\d+$/i;
    const twistBones = bones.filter((n) => twistPattern.test(n));
    if (twistBones.length === 0) {
        log(`[探针] 未检测到 Twist 骨`, 'info');
        return;
    }
    const parents = [];
    root.traverse((node) => {
        if (node.isBone && twistPattern.test(node.name)) {
            const parent = node.parent;
            parents.push(`${node.name} -> parent=${parent ? parent.name : '(无)'}`);
        }
    });
    log(`[探针] Twist 骨 ${twistBones.length} 个:`, 'info');
    parents.forEach((p) => log(`  ${p}`, 'info'));
}
// ===== Tripo→Mixamo 转换（D4）=====
function convertToMixamo() {
    if (!model) {
        log('请先加载 Tripo 模型', 'warn');
        return;
    }
    const t0 = performance.now();
    setStatus('转换中…');
    log('开始 convertTripoToMixamo…');
    // 转换会重建 Skeleton，先停掉动画 mixer，避免引用旧骨骼
    if (mixer) {
        mixer.stopAllAction();
        mixer = null;
        currentClip = null;
        win.__ANIM_MIXER__ = null;
        // B1：动画已终止，播放标记同步复位（e2e 据此断言）
        win.__ANIM_PLAYING__ = false;
        btnPlay.disabled = true;
        btnStop.disabled = true;
        log('已停掉 AnimationMixer（Skeleton 即将重建）', 'warn');
    }
    const report = convertTripoToMixamo(model, { officialRestPose: officialRestRoot ?? undefined });
    const elapsed = ((performance.now() - t0) / 1000).toFixed(2);
    // 用转换后的骨骼更新列表
    panel.setBoneList(report.boneNamesAfter);
    log(`转换完成，耗时 ${elapsed}s`, 'ok');
    log(`骨骼数: ${report.boneCountBefore} → ${report.boneCountAfter}`);
    log(`重命名骨骼数: ${report.renameCount}`);
    log(`合并 Twist 骨: ${report.mergedTwistCount} 个`);
    log(`修复蒙皮顶点: ${report.fixedVertexCount} 槽位`);
    log(`Skeleton 重建: ${report.skeletonRebuilt ? '是' : '否'}`);
    log(`rest pose 对齐骨数: ${report.restPoseAlignedCount}（D6：对齐 Mixamo 官方 lod2）`, report.restPoseAlignedCount > 0 ? 'ok' : 'warn');
    if (report.unmatchedBones.length > 0) {
        log(`未匹配骨骼（保留）: ${report.unmatchedBones.join(', ')}`, 'warn');
    }
    if (report.warnings.length > 0) {
        report.warnings.forEach((w) => log(`警告: ${w}`, 'warn'));
    }
    // 转换报告挂到 window，供 e2e 断言
    win.__CONVERT_REPORT__ = report;
    // 转换后骨骼已是 Mixamo 命名，可直接匹配 Mixamo 动画轨道
    if (animClip) {
        setupMixer();
        log('转换后骨骼已匹配 Mixamo 命名，可播放动画', 'info');
        // D5：转换改变了骨骼命名，重新统计轨道匹配率并更新显示
        const match = computeAnimMatch();
        setStatus(`转换完成：${report.boneCountBefore} → ${report.boneCountAfter} 骨骼，轨道匹配 ${match ? (match.rate * 100).toFixed(1) : '-'}%`);
    }
    else {
        setStatus(`转换完成：${report.boneCountBefore} → ${report.boneCountAfter} 骨骼`);
    }
    btnConvert.disabled = true;
}
// ===== 加载 Mixamo 动画 =====
function loadAnim() {
    const t0 = performance.now();
    setStatus('加载动画中…');
    log(`开始加载动画: ${ANIM_URL}`);
    fbxLoader.load(ANIM_URL, (object) => {
        const elapsed = ((performance.now() - t0) / 1000).toFixed(2);
        if (!object.animations || object.animations.length === 0) {
            log('动画文件未包含 AnimationClip', 'warn');
            setStatus('动画文件无 clip');
            return;
        }
        animClip = object.animations[0];
        animSkeleton = object;
        const tracks = collectTrackNames(animClip);
        panel.setTrackList(tracks);
        log(`动画加载成功，耗时 ${elapsed}s`, 'ok');
        log(`AnimationClip: ${animClip.name}（时长 ${animClip.duration.toFixed(3)}s）`);
        log(`轨道数量: ${tracks.length}`);
        log(`轨道样例（前 5）: ${tracks.slice(0, 5).join(' , ')}`, 'info');
        // D1 验证：轨道名无冒号（如 mixamorigHips 而非 mixamorig:Hips）
        const colonTracks = tracks.filter((t) => t.includes(':'));
        if (colonTracks.length === 0) {
            log('✓ 轨道名无冒号（符合 Mixamo 规范）', 'ok');
        }
        else {
            log(`⚠️ 存在带冒号轨道: ${colonTracks.slice(0, 5).join(' , ')}`, 'warn');
        }
        // D5：计算转换后模型骨骼与动画轨道的匹配统计（模型未转换时匹配率会很低，属预期）
        const match = computeAnimMatch();
        // 有模型则建立 mixer 并启用播放/停止（setupMixer 内部会启用按钮）；
        // 无模型则保持禁用，等待先加载模型
        if (model) {
            setupMixer();
        }
        else {
            btnPlay.disabled = true;
            btnStop.disabled = true;
        }
        setStatus(match ? `动画已加载，轨道匹配 ${(match.rate * 100).toFixed(1)}%` : '动画已加载，可播放');
    }, undefined, (err) => {
        log(`动画加载失败: ${err instanceof Error ? err.message : String(err)}`, 'error');
        setStatus('动画加载失败');
    });
}
/** 用 model 上的骨骼 + 动画 clip 建立 mixer */
function setupMixer() {
    if (!model || !animClip)
        return;
    // G7：Mixamo 动画轨道是动画自身骨架坐标系下的绝对值（Hips.position≈(3,58,-0.4)、
    // 各骨骼 quaternion 首帧与绑定姿态偏差 43~174°），直接播放会让骨架瞬移出视锥
    // （原 bug「播放后模型消失」）并整体脱离绑定姿态（躯干前倾、姿态扭曲）。
    // normalizeRootMotion 把所有被驱动的轨道重写为「相对绑定姿态的偏移」，
    // t=0 模型原地站立、保留 Idle 摆动。
    // 变体 B：传入原始动画骨架（animSkeleton）采样 S_w，保证 Mixamo rest 不丢失
    const clip = normalizeRootMotion(animClip, model, animSkeleton ?? undefined);
    // V11 180° Y 翻转：模型根节点绕世界 Y 轴转 180° → 角色面朝 +Z（相机方向）
    // normalizeRootMotion 输出 -Z 空间 clip track，mixer 播放时 model 旋转使骨骼
    // 世界系输出面朝 +Z。re-pose 在旋转前完成（读原始 bind 帧），不受影响。
    model.rotateY(Math.PI);
    // 用 model 根节点建 mixer（内部按骨骼名匹配轨道）
    mixer = new THREE.AnimationMixer(model);
    currentClip = clip;
    // 供 e2e 读取 mixer.time 验证动画推进（S2 非 T-pose 断言）
    win.__ANIM_MIXER__ = mixer;
    btnPlay.disabled = false;
    btnStop.disabled = false;
    log('AnimationMixer 已建立（轨道按骨骼名匹配）', 'info');
}
/** 按名称查找骨骼（traverse），找不到返回 null */
// eslint 禁掉未使用警告；e2e/demo 预留工具（当前未被调用，保留以便后续调试）
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// (no-op：findBone 已移除，见下方 loadAnim 直接内联遍历)
// ===== 播放 / 停止 =====
function playAnim() {
    if (!mixer || !currentClip)
        return;
    mixer.stopAllAction();
    const action = mixer.clipAction(currentClip);
    action.reset();
    action.play();
    win.__ANIM_PLAYING__ = true;
    setStatus(`播放中: ${currentClip.name}`);
    log(`播放: ${currentClip.name}`, 'ok');
}
function stopAnim() {
    if (!mixer)
        return;
    mixer.stopAllAction();
    win.__ANIM_PLAYING__ = false;
    setStatus('已停止');
    log('停止播放', 'info');
}
// ===== 事件绑定 =====
btnLoadModel.addEventListener('click', loadModel);
btnLoadOfficial.addEventListener('click', loadOfficialModel);
btnConvert.addEventListener('click', convertToMixamo);
btnLoadAnim.addEventListener('click', loadAnim);
btnPlay.addEventListener('click', playAnim);
btnStop.addEventListener('click', stopAnim);
// ===== 渲染循环 =====
function resize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);
resize();
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    if (mixer)
        mixer.update(1 / 60);
    renderer.render(scene, camera);
}
animate();
log('Demo 已启动（D1）', 'ok');
log('点击「加载 Tripo 模型」开始。资源由 dev-server 托管于 /asset-lib', 'info');
//# sourceMappingURL=main.js.map