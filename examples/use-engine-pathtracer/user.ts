import { state as meta3dState } from "meta3d-type"
import { prepare as prepareMeta3D, registerExtension, getExtensionService, getExtensionState, setExtensionState } from "meta3d"
import { prepare as prepareEngine, prepareRegisterECSExtension, init as initEngine, update as updateEngine, render as renderEngine } from "engine-facade/src/DirectorAPI"
import { addBasicCameraView, addGeometry, addPBRMaterial, addPerspectiveCameraProjection, addTransform, cloneGameObject, createGameObject, getTransform } from "engine-facade/src/GameObjectAPI"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgpuService } from "meta3d-webgpu-node-protocol/src/service/ServiceType"
import { service as fsService } from "meta3d-fs-protocol/src/service/ServiceType"
import { getExtensionService as getWebGPUExtensionService, createExtensionState as createWebGPUExtensionState } from "meta3d-webgpu-node"
import { getExtensionService as getFSExtensionService, createExtensionState as createFSExtensionState } from "meta3d-fs"
import { getWorkPluginContribute as getPathTracerWorkPluginContribute } from "engine-work-plugin-pathtracer/src/Main"
import { createGeometry, setIndices, setVertices } from "engine-facade/src/GeometryAPI"
import { gameObject } from "../../defaults/meta3d-gameobject-protocol/src/Index"

function _getEngineCoreExtensionName(): string {
    return "meta3d-engine-core"
}

function _getMeta3DBsMostExtensionName(): string {
    return "meta3d-bs-most"
}

function _getMeta3DWebGPUExtensionName(): string {
    return "meta3d-webgpu-node"
}

function _getMeta3DFSExtensionName(): string {
    return "meta3d-fs"
}

function _registerWorkPlugins(engineCoreState: engineCoreState, isDebug: boolean, meta3dState: meta3dState) {
    let { registerWorkPlugin } = getExtensionService<engineCoreService>(meta3dState, _getEngineCoreExtensionName())
    let mostService: mostService = getExtensionService(meta3dState, _getMeta3DBsMostExtensionName())
    let webgpuService: webgpuService = getExtensionService(meta3dState, _getMeta3DWebGPUExtensionName())
    let engineCoreService: engineCoreService = getExtensionService(meta3dState, _getEngineCoreExtensionName())
    let fsService: fsService = getExtensionService(meta3dState, _getMeta3DFSExtensionName())

    engineCoreState =
        registerWorkPlugin(
            engineCoreState,
            getPathTracerWorkPluginContribute({ mostService, webgpuService, fsService, engineCoreService, width: 640, height: 480 }),
            [
                {
                    pipelineName: "init",
                    insertElementName: "init_root_meta3d",
                    insertAction: "after"
                },
                {
                    pipelineName: "render",
                    insertElementName: "render_root_meta3d",
                    insertAction: "after"
                }
            ]
        )

    return engineCoreState
}

function _createTriangle(engineCoreState: engineCoreState, engineCoreService: engineCoreService): [engineCoreState, gameObject] {
    let data = createGameObject(engineCoreState, engineCoreService)
    engineCoreState = data[0]
    let gameObject = data[1]

    data = createGeometry(engineCoreState, engineCoreService)
    engineCoreState = data[0]
    let geometry = data[1]

    let vertices = new Float32Array([
        0.0, 0.5,
        -0.5, -0.5,
        0.5, -0.5
    ])

    let indices = new Uint32Array([
        0, 1, 2
    ])
    engineCoreState = setVertices(engineCoreState, engineCoreService, geometry, vertices)
    engineCoreState = setIndices(engineCoreState, engineCoreService, geometry, indices)
    engineCoreState = addGeometry(engineCoreState, engineCoreService, gameObject, geometry)

    return [engineCoreState, gameObject]
}

function _createScene(engineCoreState: engineCoreState, engineCoreService: engineCoreService) {
    let data = _createTriangle(engineCoreState, engineCoreService)
    engineCoreState = data[0]

    return engineCoreState
}

function _init() {
    let isDebug = true

    let meta3dState = prepareMeta3D()

    meta3dState = prepareEngine(
        meta3dState,
        _getEngineCoreExtensionName(),
        isDebug
    )

    meta3dState = prepareRegisterECSExtension(
        meta3dState,
        _getEngineCoreExtensionName(),
        {
            isDebug: isDebug,
            float9Array1: new Float32Array(),
            float32Array1: new Float32Array(),
            transformCount: 10,
            geometryCount: 10,
            geometryPointCount: 100,
            pbrMaterialCount: 10
        }
    )

    meta3dState =
        registerExtension(
            meta3dState,
            _getMeta3DWebGPUExtensionName(),
            getWebGPUExtensionService,
            null,
            createWebGPUExtensionState()
        )
    meta3dState =
        registerExtension(
            meta3dState,
            _getMeta3DFSExtensionName(),
            getFSExtensionService,
            null,
            createFSExtensionState()
        )


    let engineCoreState = getExtensionState<engineCoreState>(meta3dState, _getEngineCoreExtensionName())

    engineCoreState = _registerWorkPlugins(engineCoreState, isDebug, meta3dState)

    engineCoreState = _createScene(engineCoreState, getExtensionService(meta3dState, _getEngineCoreExtensionName()))


    meta3dState = setExtensionState(meta3dState, _getEngineCoreExtensionName(), engineCoreState)

    return initEngine(meta3dState, _getEngineCoreExtensionName()).then((meta3dState) => {
        console.log("finish init engine")

        return meta3dState
    })
}

async function _loop(meta3dState: meta3dState) {
    while (true) {
        meta3dState = await renderEngine(meta3dState, _getEngineCoreExtensionName())
    }
}

_init().then(_loop)
