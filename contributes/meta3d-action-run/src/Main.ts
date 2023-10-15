import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { getState, setState } from "./Utils"
import { clickUIData } from "meta3d-ui-control-button-protocol"
import { actionName, state } from "meta3d-action-run-protocol"
import { service as runEngineService } from "meta3d-editor-run-engine-gameview-protocol/src/service/ServiceType"
import { getActionState, setElementStateField } from "meta3d-ui-utils/src/ElementStateUtils"
import { setIsEventStopForGameView } from "meta3d-pipeline-utils/src/ArcballCameraControllerEventUtils"
// import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
// import { service as historyService } from "meta3d-redo-undo-history-protocol/src/service/ServiceType"
import { eventName, inputData } from "meta3d-action-run-protocol/src/EventType"
import { service as eventSourcingService } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"

let _markIsRun = (meta3dState: meta3dState, api: api, isRun: boolean) => {
    return setElementStateField([
        (elementState: any) => {
            return { ...getState(elementState), isRun: isRun }
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
        init: (meta3dState) => {
            let eventSourcingService = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol")

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState) => {
                    meta3dState = _copyState(meta3dState, api)
                    meta3dState = _markIsRun(meta3dState, api, true)
                    meta3dState = _startLoop(meta3dState, api)

                    setIsEventStopForGameView(false)

                    return new Promise((resolve) => {
                        resolve(meta3dState)
                    })
                }, (meta3dState) => {
                    setIsEventStopForGameView(true)

                    meta3dState = _markIsRun(meta3dState, api, false)

                    meta3dState = api.restore(meta3dState, getExn(getActionState<state>(meta3dState, api, actionName).meta3dStateBeforeRun))


                    let runEngineService = api.getExtensionService<runEngineService>(
                        meta3dState,
                        "meta3d-editor-run-engine-gameview-protocol"
                    )

                    return runEngineService.loopEngineWhenStop(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            console.log("run")

            return new Promise<meta3dState>((resolve, reject) => {
                let eventSourcingService = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol")

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    inputData: []
                }))
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
