import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { clickUIData } from "meta3d-ui-control-button-protocol"
import { actionName, state } from "meta3d-action-run-protocol"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { service as gameViewRenderService } from "meta3d-editor-gameview-render-protocol/src/service/ServiceType"
// import { setIsEventStopForGameView } from "meta3d-pipeline-utils/src/ArcballCameraControllerEventUtils"
// import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
// import { service as historyService } from "meta3d-redo-undo-history-protocol/src/service/ServiceType"
import { eventName, inputData } from "meta3d-action-run-protocol/src/EventType"
// import { service as eventSourcingService } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
// import { runGameViewRenderOnlyOnce } from "meta3d-gameview-render-utils/src/GameViewRenderUtils"

let _markIsRun = (meta3dState: meta3dState, api: api, isRun: boolean) => {
    return api.action.setActionState(meta3dState, actionName,
        { ...api.action.getActionState<state>(meta3dState, actionName), isRun: isRun })
}

let _startGameViewRender = (meta3dState: meta3dState, api: api): meta3dState => {
    let { getPluggablePackageService } = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))

    return api.nullable.getWithDefault(
        api.nullable.map(
            ({ start }) => {
                return start(meta3dState)
            },
            getPluggablePackageService<gameViewRenderService>(meta3dState, "meta3d-editor-gameview-render-protocol")
        ),
        meta3dState
    )
}

let _stopGameViewRender = (meta3dState: meta3dState, api: api): meta3dState => {
    let { getPluggablePackageService } = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))

    return api.nullable.getWithDefault(
        api.nullable.map(
            ({ stop }) => {
                return stop(meta3dState)
            },
            getPluggablePackageService<gameViewRenderService>(meta3dState, "meta3d-editor-gameview-render-protocol")
        ),
        meta3dState
    )

}

// let _copyState = (meta3dState: meta3dState, api: api) => {
//     // return api.getExtensionService<historyService>(meta3dState, "meta3d-redo-undo-history-protocol").push(meta3dState)


//     return setElementStateField([
//         (elementState: any) => {
//             return { ...getState(elementState), meta3dStateBeforeRun: api.deepCopy(meta3dState) }
//         },
//         setState
//     ], meta3dState, api)
// }

export let getContribute: getContributeMeta3D<actionContribute<clickUIData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            // meta3dState = runGameViewRenderOnlyOnce(meta3dState, api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")))

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState) => {
                    // meta3dState = _copyState(meta3dState, api)
                    meta3dState = _markIsRun(meta3dState, api, true)
                    meta3dState = _startGameViewRender(meta3dState, api)

                    return Promise.resolve(meta3dState)
                }, (meta3dState) => {
                    meta3dState = _markIsRun(meta3dState, api, false)
                    meta3dState = _stopGameViewRender(meta3dState, api)

                    // meta3dState = api.restore(meta3dState, api.nullable.getExn(getActionState<state>(meta3dState, api, actionName).meta3dStateBeforeRun))


                    // let runEngineService = api.getExtensionService<runEngineService>(
                    //     meta3dState,
                    //     "meta3d-editor-run-engine-gameview-protocol"
                    // )

                    // return runEngineService.loopEngineWhenStop(meta3dState)
                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            return new Promise<meta3dState>((resolve, reject) => {
                let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    inputData: []
                }))
            })
        },
        createState: () => {
            return {
                isRun: false,
            }
        }
    }
}
