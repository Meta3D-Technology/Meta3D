import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { uiData, actionName, state } from "meta3d-action-run-protocol"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { service as gameViewRenderService } from "meta3d-editor-gameview-render-protocol/src/service/ServiceType"
// import { setIsEventStopForGameView } from "meta3d-pipeline-utils/src/ArcballCameraControllerEventUtils"
// import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
// import { service as historyService } from "meta3d-redo-undo-history-protocol/src/service/ServiceType"
import { eventName, inputData } from "meta3d-action-run-protocol/src/EventType"
// import { service as eventSourcingService } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
// import { runGameViewRenderOnlyOnce } from "meta3d-gameview-render-utils/src/GameViewRenderUtils"
import { execEventHandle } from "meta3d-script-utils/src/Main"
import { runGameViewRenderOnlyOnce } from "meta3d-gameview-render-utils/src/GameViewRenderUtils"

let _markIsRun = (meta3dState: meta3dState, api: api, isRun: boolean) => {
    return api.action.setActionState(meta3dState, actionName,
        { ...api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName)), isRun: isRun })
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

// let _execOnInitOfAllScripts= (meta3dState: meta3dState, api: api):  Promise<meta3dState> => {
//     let engineSceneService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).scene(meta3dState)

//     let eventFileStrs = engineSceneService.gameObject.getAllGameObjects(meta3dState).filter(gameObject => {
//         return engineSceneService.gameObject.hasScript(meta3dState, gameObject)
//     }).map(gameObject => {
//         return engineSceneService.gameObject.getScript(meta3dState, gameObject)
//     }).filter(script => {
//         return !api.nullable.isNullable(engineSceneService.script.getAllAssetData(meta3dState, script))
//     }).map(script => {
//         return api.nullable.getExn(engineSceneService.script.getAllAssetData(meta3dState, script))
//     })

// }

let _copyState = (meta3dState: meta3dState, api: api) => {
    return api.action.setActionState<state>(
        meta3dState,
        actionName,
        {
            ...api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName)),
            meta3dStateBeforeRun: api.deepCopy(meta3dState)
        }
    )
}

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            // meta3dState = runGameViewRenderOnlyOnce(meta3dState,api, api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")))

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState) => {
                    meta3dState = _copyState(meta3dState, api)
                    meta3dState = _markIsRun(meta3dState, api, true)
                    meta3dState = _startGameViewRender(meta3dState, api)

                    return execEventHandle(meta3dState, api, "onInit")
                }, (meta3dState) => {
                    meta3dState = _markIsRun(meta3dState, api, false)
                    meta3dState = _stopGameViewRender(meta3dState, api)

                    meta3dState = api.restore(meta3dState, api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName)).meta3dStateBeforeRun)


                    return execEventHandle(meta3dState, api, "onStop").then(meta3dState => {
                        return runGameViewRenderOnlyOnce(meta3dState, api, api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")))
                    })
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
        createState: (meta3dState) => {
            return {
                isRun: false,
                meta3dStateBeforeRun: null
            }
        }
    }
}
