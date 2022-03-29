import { state as meta3dState } from "meta3d-type"
import { prepare as prepareMeta3D, registerExtension, getExtensionService, getExtensionState, setExtensionState } from "meta3d"
import { getExtensionService as getUIExtensionService, createExtensionState as createUIExtensionState } from "meta3d-ui"
import { getExtensionService as getEventExtensionService, createExtensionState as createEventExtensionState } from "meta3d-event"
import { getExtensionService as getRegisterExtensionExtensionService, createExtensionState as createRegisterExtensionExtensionState } from "meta3d-register-extension"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { service as registerExtensionService } from "meta3d-register-extension-protocol/src/service/ServiceType"
import { ioData } from "meta3d-ui-protocol/src/state/StateType"
// import { prepare as prepareEngine, init as initEngine } from "wonder-engine-ts/src/DirectorAPI"
// import { createGameObject, getAllGameObjects } from "wonder-engine-ts/src/GameObjectAPI"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { getExtensionService as getLogExtensionService, createExtensionState as createLogExtensionState } from "wonder-log"
import { service as logService } from "wonder-log-protocol/src/service/ServiceType"
import { state as logState } from "wonder-log-protocol/src/state/StateType"


function _getMeta3DUIExtensionName(): string {
    return "meta3d-ui"
}

function _getMeta3DEventExtensionName(): string {
    return "meta3d-event"
}

function _getMeta3DRegisterExtensionExtensionName(): string {
    return "meta3d-register-extension"
}

function _getEditSceneEngineCoreExtensionName(): string {
    return "meta3d-edit-scene-engine-core"
}



// TODO move to UI extension 
let _ioData: ioData = {
    isPointDown: false,
    pointPosition: [0, 0]
}

// function _createScene(engineCoreState: engineCoreState, engineCoreService: engineCoreService) {
//     let data = createGameObject(engineCoreState, engineCoreService)
//     engineCoreState = data[0]
//     let gameObject1 = data[1]

//     data = createGameObject(engineCoreState, engineCoreService)
//     engineCoreState = data[0]
//     let gameObject2 = data[1]

//     console.log(getAllGameObjects(engineCoreState, engineCoreService))

//     return engineCoreState
// }

// function _initEditScene(meta3dState: meta3dState) {
//     let isDebug = true

//     meta3dState = prepareEngine(meta3dState,
//         _getEditSceneEngineCoreExtensionName(),
//         {
//             isDebug: isDebug,
//             float9Array1: new Float32Array(),
//             float32Array1: new Float32Array(),
//             transformCount: 10
//         })

//     let canvas = document.querySelector("#canvas") as HTMLCanvasElement;
//     canvas.style.width = canvas.width + " px";
//     canvas.style.height = canvas.height + " px";


//     let engineCoreState = getExtensionState<engineCoreState>(meta3dState, _getEditSceneEngineCoreExtensionName())

//     engineCoreState = _createScene(engineCoreState, getExtensionService(meta3dState, _getEditSceneEngineCoreExtensionName()))


//     meta3dState = setExtensionState(meta3dState, _getEditSceneEngineCoreExtensionName(), engineCoreState)

//     return initEngine(meta3dState, _getEditSceneEngineCoreExtensionName()).then((engineCoreState) => {
//         console.log("finish init engine")

//         return meta3dState
//     })
// }

export function init() {
    // TODO move to UI extension 
    // TODO fix: should only one pointdown!
    document.onmousedown = (e) => {
        _ioData = {
            isPointDown: true,
            pointPosition: [e.pageX, e.pageY]
        }
    }
    document.onmouseup = (e) => {
        _ioData = {
            isPointDown: false,
            pointPosition: [e.pageX, e.pageY]
        }
    }




    let meta3dState = prepareMeta3D()

    // TODO use pipe
    meta3dState =
        registerExtension(
            meta3dState,
            _getMeta3DUIExtensionName(),
            getUIExtensionService,
            null,
            createUIExtensionState()
        )
    meta3dState =
        registerExtension(
            meta3dState,
            _getMeta3DEventExtensionName(),
            getEventExtensionService,
            null,
            createEventExtensionState()
        )

    meta3dState =
        registerExtension(
            meta3dState,
            _getMeta3DRegisterExtensionExtensionName(),
            getRegisterExtensionExtensionService,
            {
                meta3dUIExtensionName: _getMeta3DUIExtensionName(),
                meta3dEventExtensionName: _getMeta3DEventExtensionName()
            },
            createRegisterExtensionExtensionState()
        )




    meta3dState =
        registerExtension(
            meta3dState,
            "wonder-log",
            getLogExtensionService,
            null,
            createLogExtensionState()
        )

    let { log, registerInfo } = getExtensionService<logService>(meta3dState, "wonder-log")

    let logState = getExtensionState<logState>(meta3dState, "wonder-log")

    logState = registerInfo(logState, { info: "aaa" })

    log(logState)


    meta3dState = setExtensionState(meta3dState, "wonder-log", logState)







    let { register } = getExtensionService<registerExtensionService>(meta3dState, _getMeta3DRegisterExtensionExtensionName())

    // return register(meta3dState).then(_initEditScene)
    return register(meta3dState)
}

export function loop(meta3dState: meta3dState) {
    let { render } = getExtensionService<uiService>(meta3dState, _getMeta3DUIExtensionName())

    render(meta3dState, _getMeta3DUIExtensionName(), _ioData).then((meta3dState: meta3dState) => {
        requestAnimationFrame(
            () => {
                loop(meta3dState)
            }
        )
    })
}