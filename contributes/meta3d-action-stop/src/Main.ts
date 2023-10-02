import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { getRunState, getRunStateFromMeta3dState, setRunState } from "./Utils"
// import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
// import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
// import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { clickUIData } from "meta3d-ui-control-button-protocol"
import { actionName, state } from "meta3d-action-stop-protocol"
// import { service as runEngineService } from "meta3d-editor-run-engine-gameview-protocol/src/service/ServiceType"
// import { setElementStateField } from "meta3d-ui-utils/src/ElementStateUtils"
import { unbindEventForGameView } from "meta3d-pipeline-utils/src/ArcballCameraControllerEventUtils"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
// import { service as historyService } from "meta3d-redo-undo-history-protocol/src/service/ServiceType"
import { service as runEngineGameViewService } from "meta3d-editor-run-engine-gameview-protocol/src/service/ServiceType"

// let _markIsRun = (meta3dState: meta3dState, api: api) => {
//     return setElementStateField([
//         (elementState: any) => {
//             return { ...getRunState(elementState), isRun: false }
//         },
//         setRunState
//     ], meta3dState, api)
// }

// let _stopLoop = (meta3dState: meta3dState, api: api): meta3dState => {
//     // let { getCurrentElementState } = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")

//     // let uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")

//     // let { loopHandle } = getRunState(getCurrentElementState(uiState))

//     // cancelAnimationFrame(getExn(loopHandle))

//     let runEngineService = api.getExtensionService<runEngineService>(
//         meta3dState,
//         "meta3d-editor-run-engine-gameview-protocol"
//     )

//     return runEngineService.removeFromLoopFuncs(meta3dState)
// }

let _restoreState = (meta3dState: meta3dState, api: api) => {
    // return api.getExtensionService<historyService>(meta3dState, "meta3d-redo-undo-history-protocol").push(meta3dState)

    return api.restore(meta3dState, getExn(getRunStateFromMeta3dState(meta3dState, api).meta3dStateBeforeRun))
}

export let getContribute: getContributeMeta3D<actionContribute<clickUIData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            return new Promise((resolve, reject) => {
                resolve(meta3dState)
            })
        },
        handler: (meta3dState, uiData) => {
            console.log("stop")

            // meta3dState = _markIsRun(meta3dState, api)
            // meta3dState = _stopLoop(meta3dState, api)
            meta3dState = _restoreState(meta3dState, api)

            unbindEventForGameView(api.getExtensionService<eventService>(meta3dState, "meta3d-event-protocol"), "meta3d-event-protocol")

            return api.getExtensionService<runEngineGameViewService>(meta3dState, "meta3d-editor-run-engine-gameview-protocol").loopEngineWhenStop(meta3dState)
        },
        createState: () => null
    }
}
