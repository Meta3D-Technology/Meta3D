import { state as meta3dState } from "meta3d-type"
import { prepare as prepareMeta3D, registerExtension, getExtensionService, getExtensionState, setExtensionState } from "meta3d"
import { prepare as prepareEngine, init as initEngine } from "engine-facade/src/DirectorAPI"
import { createGameObject, getAllGameObjects } from "engine-facade/src/GameObjectAPI"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { getExtensionService as getWebGL1ExtensionService, createExtensionState as createWebGL1ExtensionState } from "meta3d-webgl1"
import { getWorkPluginContribute as getWebGL1WorkPluginContribute } from "engine-work-plugin-webgl1/src/Main"

function _getEngineCoreExtensionName(): string {
    return "meta3d-engine-core"
}

function _getMeta3DBsMostExtensionName(): string {
    return "meta3d-bs-most"
}

function _getMeta3DWebGL1ExtensionName(): string {
    return "meta3d-webgl1"
}

function _registerWorkPlugins(engineCoreState: engineCoreState, meta3dState: meta3dState, canvas: HTMLCanvasElement) {
    let { registerWorkPlugin } = getExtensionService<engineCoreService>(meta3dState, _getEngineCoreExtensionName())
    let meta3dMostService: mostService = getExtensionService(meta3dState, _getMeta3DBsMostExtensionName())
    let meta3dWebGL1Service: webgl1Service = getExtensionService(meta3dState, _getMeta3DWebGL1ExtensionName())
    let meta3dEngineCoreService: engineCoreService = getExtensionService(meta3dState, _getEngineCoreExtensionName())

    engineCoreState =
        registerWorkPlugin(
            engineCoreState,
            getWebGL1WorkPluginContribute({ mostService: meta3dMostService, webgl1Service: meta3dWebGL1Service, engineCoreService: meta3dEngineCoreService, canvas: canvas }),
            [
                {
                    pipelineName: "init",
                    insertElementName: "init_root_meta3d",
                    insertAction: "after"
                },
                // {
                //     pipelineName: "update",
                //     insertElementName: "update_root_meta3d",
                //     insertAction: "after"
                // },
                // {
                //     pipelineName: "render",
                //     insertElementName: "render_root_meta3d",
                //     insertAction: "after"
                // }
            ]
        )

    return engineCoreState
}

function _createScene(engineCoreState: engineCoreState, engineCoreService: engineCoreService) {
    let data = createGameObject(engineCoreState, engineCoreService)
    engineCoreState = data[0]
    let gameObject1 = data[1]

    data = createGameObject(engineCoreState, engineCoreService)
    engineCoreState = data[0]
    let gameObject2 = data[1]

    console.log(getAllGameObjects(engineCoreState, engineCoreService))

    return engineCoreState
}

function _init() {
    let isDebug = true


    let meta3dState = prepareMeta3D()

    meta3dState = prepareEngine(meta3dState,
        _getEngineCoreExtensionName(),
        {
            isDebug: isDebug,
            float9Array1: new Float32Array(),
            float32Array1: new Float32Array(),
            transformCount: 10,
            geometryCount: 10,
            geometryPointCount: 100
        })

    meta3dState =
        registerExtension(
            meta3dState,
            _getMeta3DWebGL1ExtensionName(),
            getWebGL1ExtensionService,
            null,
            createWebGL1ExtensionState()
        )

    let canvas = document.querySelector("#canvas") as HTMLCanvasElement;
    canvas.style.width = canvas.width + " px";
    canvas.style.height = canvas.height + " px";


    let engineCoreState = getExtensionState<engineCoreState>(meta3dState, _getEngineCoreExtensionName())

    engineCoreState = _registerWorkPlugins(engineCoreState, meta3dState, canvas)

    engineCoreState = _createScene(engineCoreState, getExtensionService(meta3dState, _getEngineCoreExtensionName()))


    meta3dState = setExtensionState(meta3dState, _getEngineCoreExtensionName(), engineCoreState)

    return initEngine(meta3dState, _getEngineCoreExtensionName()).then((engineCoreState) => {
        console.log("finish init engine")

        return meta3dState
    })
}


function _loop(meta3dState: meta3dState) {
}


_init().then((state) => {
    _loop(state)
})
