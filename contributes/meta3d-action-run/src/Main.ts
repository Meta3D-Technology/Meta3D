import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { getState, setState } from "./Utils"
import { clickUIData } from "meta3d-ui-control-button-protocol"
import { actionName, state } from "meta3d-action-run-protocol"
import { service as runEngineService } from "meta3d-editor-run-engine-gameview-protocol/src/service/ServiceType"
import { setElementStateField } from "meta3d-ui-utils/src/ElementStateUtils"
import { bindEventForGameView } from "meta3d-pipeline-utils/src/ArcballCameraControllerEventUtils"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
// import { service as historyService } from "meta3d-redo-undo-history-protocol/src/service/ServiceType"

let _markIsRun = (meta3dState: meta3dState, api: api) => {
    return setElementStateField([
        (elementState: any) => {
            return { ...getState(elementState), isRun: true }
        },
        setState
    ], meta3dState, api)
}

let _startLoop = (meta3dState: meta3dState, api: api): meta3dState => {
    // let runEngineService = api.getExtensionService<runEngineService>(
    //     meta3dState,
    //     "meta3d-editor-run-engine-gameview-protocol"
    // )

    // return runEngineService.loopEngine(meta3dState).then((meta3dState: meta3dState) => {
    //     let id = requestAnimationFrame(
    //         (time) => {
    //             _startLoop(meta3dState, api)
    //         }
    //     )

    //     return setElementStateField([
    //         (elementState: any) => {
    //             return { ...getState(elementState), loopHandle: id }
    //         },
    //         setState
    //     ], meta3dState, api)
    // })

    let runEngineService = api.getExtensionService<runEngineService>(
        meta3dState,
        "meta3d-editor-run-engine-gameview-protocol"
    )

    return runEngineService.addToLoopFuncs(meta3dState)

    // return runEngineService.loopEngine(meta3dState).then((meta3dState: meta3dState) => {
    //     let id = requestAnimationFrame(
    //         (time) => {
    //             _startLoop(meta3dState, api)
    //         }
    //     )

    //     return setElementStateField([
    //         (elementState: any) => {
    //             return { ...getState(elementState), loopHandle: id }
    //         },
    //         setState
    //     ], meta3dState, api)
    // })
}

let _copyState = (meta3dState: meta3dState, api: api) => {
    // return api.getExtensionService<historyService>(meta3dState, "meta3d-redo-undo-history-protocol").push(meta3dState)


    return setElementStateField([
        (elementState: any) => {
            return { ...getState(elementState), meta3dStateBeforeRun: api.deepCopy(meta3dState) }
        },
        setState
    ], meta3dState, api)
}

export let getContribute: getContributeMeta3D<actionContribute<clickUIData, state>> = (api) => {
    return {
        actionName: actionName,
        handler: (meta3dState, uiData) => {
            console.log("run")

            meta3dState = _copyState(meta3dState, api)
            meta3dState = _markIsRun(meta3dState, api)
            meta3dState = _startLoop(meta3dState, api)

            bindEventForGameView(api.getExtensionService<eventService>(meta3dState, "meta3d-event-protocol"), "meta3d-event-protocol")

            return new Promise((resolve) => {
                resolve(meta3dState)
            })
        },
        createState: () => {
            return {
                meta3dStateBeforeRun: null,
                isRun: false,
            }
        }
    }
}
