import { state as meta3dState } from "meta3d-type"
import { prepare as prepareMeta3D, registerExtension, getExtensionService, getExtensionState, setExtensionState } from "meta3d"
import { prepare as prepareEngine, prepareRegisterECSExtension, init as initEngine, update as updateEngine, render as renderEngine } from "engine-facade/src/DirectorAPI"
import { addBasicCameraView, addGeometry, addPBRMaterial, addPerspectiveCameraProjection, addTransform, createGameObject } from "engine-facade/src/GameObjectAPI"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as immutableService } from "meta3d-immutable-protocol/src/service/ServiceType"
import { getExtensionService as getWebGL1ExtensionService, createExtensionState as createWebGL1ExtensionState } from "meta3d-webgl1"
import { getExtensionService as getImmutableExtensionService, createExtensionState as createImmutableExtensionState } from "meta3d-immutable"
import { workPluginName as webgl1WorkPluginName } from "engine-work-plugin-webgl1-protocol"
import { workPluginName as webgl1MainWorkPluginName } from "engine-work-plugin-webgl1-worker-main-protocol"
import { getWorkPluginContribute as getWebGL1GetGLWorkPluginContribute } from "meta3d-work-plugin-webgl1-creategl/src/Main"
import { getWorkPluginContribute as getWebGL1DetectGLWorkPluginContribute } from "meta3d-work-plugin-webgl1-detectgl/src/Main"
import { getWorkPluginContribute as getWebGL1GeometryWorkPluginContribute } from "meta3d-work-plugin-webgl1-geometry/src/Main"
import { getWorkPluginContribute as getWebGL1MaterialWorkPluginContribute } from "meta3d-work-plugin-webgl1-material/src/Main"
import { getWorkPluginContribute as getCameraWorkPluginContribute } from "meta3d-work-plugin-camera/src/Main"
import { getWorkPluginContribute as getTransformWorkPluginContribute } from "meta3d-work-plugin-transform/src/Main"
import { getWorkPluginContribute as getWebGL1WorkPluginContribute } from "engine-work-plugin-webgl1/src/Main"
import { getWorkPluginContribute as getWebGL1WorkerWorkPluginContribute } from "engine-work-plugin-webgl1-worker/src/main/Main"
import { createGeometry, setIndices, setVertices } from "engine-facade/src/GeometryAPI"
import { createPBRMaterial, setDiffuseColor } from "engine-facade/src/PBRMaterialAPI"
import { createTransform, setLocalPosition, lookAt } from "engine-facade/src/TransformAPI"
import { createBasicCameraView, active } from "engine-facade/src/BasicCameraViewAPI"
import { createPerspectiveCameraProjection, setAspect, setFar, setNear, setFovy } from "engine-facade/src/PerspectiveCameraProjectionAPI"
import { componentName as geometryComponentName, dataName as geometryDataName } from "meta3d-component-geometry-protocol";
import { componentName as transformComponentName, dataName as transformDataName } from "meta3d-component-transform-protocol";

function _getEngineCoreExtensionName(): string {
    return "meta3d-engine-core"
}

function _getMeta3DBsMostExtensionName(): string {
    return "meta3d-bs-most"
}

function _getMeta3DWebGL1ExtensionName(): string {
    return "meta3d-webgl1"
}

function _getMeta3DImmutableExtensionName(): string {
    return "meta3d-immutable"
}

function _registerWorkPlugins(engineCoreState: engineCoreState, isDebug: boolean, meta3dState: meta3dState, canvas: HTMLCanvasElement, useWorker: boolean) {
    let { registerWorkPlugin } = getExtensionService<engineCoreService>(meta3dState, _getEngineCoreExtensionName())
    let mostService: mostService = getExtensionService(meta3dState, _getMeta3DBsMostExtensionName())
    let webgl1Service: webgl1Service = getExtensionService(meta3dState, _getMeta3DWebGL1ExtensionName())
    let engineCoreService: engineCoreService = getExtensionService(meta3dState, _getEngineCoreExtensionName())
    let immutableService: immutableService = getExtensionService(meta3dState, _getMeta3DImmutableExtensionName())

    if (useWorker) {
        engineCoreState =
            registerWorkPlugin(
                engineCoreState,
                getCameraWorkPluginContribute({
                    isDebug,
                    mostService, engineCoreService, workPluginWhichHasCanvasName: webgl1MainWorkPluginName
                }),
                [
                    {
                        pipelineName: "update",
                        insertElementName: "send_render_data",
                        insertAction: "after"
                    }
                ]
            )
        engineCoreState =
            registerWorkPlugin(
                engineCoreState,
                getTransformWorkPluginContribute({
                    mostService, engineCoreService, transformData: {
                        componentName: transformComponentName,
                        updateDataName: transformDataName.update
                    }
                }),
                [
                    {
                        pipelineName: "update",
                        insertElementName: "update_camera_camera_meta3d",
                        insertAction: "after"
                    }
                ]
            )
        engineCoreState =
            registerWorkPlugin(
                engineCoreState,
                getWebGL1WorkerWorkPluginContribute({ isDebug, mostService: mostService, engineCoreService: engineCoreService, canvas: canvas, maxRenderGameObjectCount: 100 }),
                [
                    {
                        pipelineName: "init",
                        insertElementName: "init_root_meta3d",
                        insertAction: "after"
                    },
                    {
                        pipelineName: "update",
                        insertElementName: "update_root_meta3d",
                        insertAction: "after"
                    },
                    {
                        pipelineName: "render",
                        insertElementName: "render_root_meta3d",
                        insertAction: "after"
                    }
                ]
            )
    } else {
        engineCoreState =
            registerWorkPlugin(
                engineCoreState,
                getWebGL1GetGLWorkPluginContribute({ mostService, webgl1Service, workPluginWhichHasCanvasName: webgl1WorkPluginName }),
                [
                    {
                        pipelineName: "init",
                        insertElementName: "init_root_meta3d",
                        insertAction: "after"
                    }
                ]
            )
        engineCoreState =
            registerWorkPlugin(
                engineCoreState,
                getWebGL1DetectGLWorkPluginContribute({ mostService, webgl1Service }),
                [
                    {
                        pipelineName: "init",
                        insertElementName: "create_gl_webgl1_creategl_meta3d",
                        insertAction: "after"
                    }
                ]
            )
        engineCoreState =
            registerWorkPlugin(
                engineCoreState,
                getWebGL1WorkPluginContribute({ isDebug, mostService, webgl1Service, engineCoreService, immutableService, canvas }),
                [
                    {
                        pipelineName: "init",
                        insertElementName: "detect_gl_webgl1_detectgl_meta3d",
                        insertAction: "after"
                    },
                    {
                        pipelineName: "update",
                        insertElementName: "update_root_meta3d",
                        insertAction: "after"
                    },
                    {
                        pipelineName: "render",
                        insertElementName: "render_root_meta3d",
                        insertAction: "after"
                    }
                ]
            )
        engineCoreState =
            registerWorkPlugin(
                engineCoreState,
                getWebGL1GeometryWorkPluginContribute({
                    mostService, webgl1Service, engineCoreService, immutableService, workPluginWhichHasAllGeometryIndicesName: webgl1WorkPluginName, geometryData: {
                        componentName: geometryComponentName,
                        verticesDataName: geometryDataName.vertices,
                        indicesDataName: geometryDataName.indices
                    }
                }),
                [
                    {
                        pipelineName: "init",
                        insertElementName: "prepare_init_data_webgl_engine",
                        insertAction: "after"
                    }
                ]
            )
        engineCoreState =
            registerWorkPlugin(
                engineCoreState,
                getWebGL1MaterialWorkPluginContribute({
                    mostService, webgl1Service, engineCoreService, immutableService, workPluginWhichHasAllMaterialIndicesName: webgl1WorkPluginName
                }),
                [
                    {
                        pipelineName: "init",
                        insertElementName: "prepare_init_data_webgl_engine",
                        insertAction: "after"
                    }
                ]
            )
        engineCoreState =
            registerWorkPlugin(
                engineCoreState,
                getCameraWorkPluginContribute({
                    isDebug,
                    mostService, engineCoreService, workPluginWhichHasCanvasName: webgl1WorkPluginName
                }),
                [
                    {
                        pipelineName: "update",
                        insertElementName: "update_root_meta3d",
                        insertAction: "after"
                    }
                ]
            )
        engineCoreState =
            registerWorkPlugin(
                engineCoreState,
                getTransformWorkPluginContribute({
                    mostService, engineCoreService, transformData: {
                        componentName: transformComponentName,
                        updateDataName: transformDataName.update
                    }
                }),
                [
                    {
                        pipelineName: "update",
                        insertElementName: "update_camera_camera_meta3d",
                        insertAction: "after"
                    }
                ]
            )

    }

    return engineCoreState
}

function _createCubeGameObject(engineCoreState: engineCoreState, engineCoreService: engineCoreService) {
    let data = createGameObject(engineCoreState, engineCoreService)
    engineCoreState = data[0]
    let gameObject = data[1]


    data = createTransform(engineCoreState, engineCoreService)
    engineCoreState = data[0]
    let transform = data[1]

    engineCoreState = addTransform(engineCoreState, engineCoreService, gameObject, transform)

    data = createGeometry(engineCoreState, engineCoreService)
    engineCoreState = data[0]
    let geometry = data[1]

    let vertices = new Float32Array([
        1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0,
        -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0,
        -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0,
        -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0
    ])

    let indices = new Uint32Array([
        0, 1, 2, 0, 2, 3,
        4, 5, 6, 4, 6, 7,
        8, 9, 10, 8, 10, 11,
        12, 13, 14, 12, 14, 15,
        16, 17, 18, 16, 18, 19,
        20, 21, 22, 20, 22, 23
    ])
    engineCoreState = setVertices(engineCoreState, engineCoreService, geometry, vertices)
    engineCoreState = setIndices(engineCoreState, engineCoreService, geometry, indices)
    engineCoreState = addGeometry(engineCoreState, engineCoreService, gameObject, geometry)

    data = createPBRMaterial(engineCoreState, engineCoreService)
    engineCoreState = data[0]
    let material = data[1]
    engineCoreState = setDiffuseColor(engineCoreState, engineCoreService, material, [1.0, 0.0, 0.0])
    engineCoreState = addPBRMaterial(engineCoreState, engineCoreService, gameObject, material)

    return engineCoreState
}


let _createCameraGameObject = (engineCoreState: engineCoreState, engineCoreService: engineCoreService, canvas: HTMLCanvasElement) => {
    let data = createGameObject(engineCoreState, engineCoreService)
    engineCoreState = data[0]
    let gameObject = data[1]


    data = createTransform(engineCoreState, engineCoreService)
    engineCoreState = data[0]
    let transform = data[1]

    engineCoreState = addTransform(engineCoreState, engineCoreService, gameObject, transform)

    data = createBasicCameraView(engineCoreState, engineCoreService)
    engineCoreState = data[0]
    let cameraView = data[1]

    engineCoreState = active(engineCoreState, engineCoreService, cameraView)
    engineCoreState = addBasicCameraView(engineCoreState, engineCoreService, gameObject, cameraView)

    data = createPerspectiveCameraProjection(engineCoreState, engineCoreService)
    engineCoreState = data[0]
    let cameraProjection = data[1]

    engineCoreState = setFovy(engineCoreState, engineCoreService, cameraProjection, 30)
    engineCoreState = setAspect(engineCoreState, engineCoreService, cameraProjection, canvas.width / canvas.height)
    engineCoreState = setNear(engineCoreState, engineCoreService, cameraProjection, 1)
    engineCoreState = setFar(engineCoreState, engineCoreService, cameraProjection, 100)
    engineCoreState = addPerspectiveCameraProjection(engineCoreState, engineCoreService, gameObject, cameraProjection)


    engineCoreState = setLocalPosition(engineCoreState, engineCoreService, transform, [10, 10, 10])
    engineCoreState = lookAt(engineCoreState, engineCoreService, transform, [0, 1, 0])

    return engineCoreState
}

function _createScene(engineCoreState: engineCoreState, engineCoreService: engineCoreService, canvas: HTMLCanvasElement) {
    engineCoreState = _createCubeGameObject(engineCoreState, engineCoreService)
    engineCoreState = _createCameraGameObject(engineCoreState, engineCoreService, canvas)

    return engineCoreState
}

function _init(useWorker: boolean) {
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
            _getMeta3DWebGL1ExtensionName(),
            getWebGL1ExtensionService,
            null,
            createWebGL1ExtensionState()
        )
    meta3dState =
        registerExtension(
            meta3dState,
            _getMeta3DImmutableExtensionName(),
            getImmutableExtensionService,
            null,
            createImmutableExtensionState()
        )

    let canvas = document.querySelector("#canvas") as HTMLCanvasElement
    canvas.style.width = canvas.width + " px"
    canvas.style.height = canvas.height + " px"


    let engineCoreState = getExtensionState<engineCoreState>(meta3dState, _getEngineCoreExtensionName())

    engineCoreState = _registerWorkPlugins(engineCoreState, isDebug, meta3dState, canvas, useWorker)

    engineCoreState = _createScene(engineCoreState, getExtensionService(meta3dState, _getEngineCoreExtensionName()), canvas)


    meta3dState = setExtensionState(meta3dState, _getEngineCoreExtensionName(), engineCoreState)

    return initEngine(meta3dState, _getEngineCoreExtensionName()).then((meta3dState) => {
        console.log("finish init engine")

        return meta3dState
    })
}

function _loop(meta3dState: meta3dState) {
    updateEngine(meta3dState, _getEngineCoreExtensionName()).then((meta3dState) => {
        renderEngine(meta3dState, _getEngineCoreExtensionName()).then((meta3dState) => {
            requestAnimationFrame(() => {
                _loop(meta3dState)
            })
        })
    })
}

const useWorker = true
// const useWorker = false

_init(useWorker).then(_loop)
