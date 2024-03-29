import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-active-camera-protocol"
import { eventName, inputData } from "meta3d-action-active-camera-protocol/src/EventType"
import { runGameViewRenderOnlyOnce } from "meta3d-gameview-render-utils/src/GameViewRenderUtils"
import { getSelectedGameObject } from "meta3d-select-inspector-node-utils/src/Main"

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, isActive, gameObject) => {
                    if (!isActive) {
                        console.log("not support")

                        return Promise.resolve(meta3dState)
                    }



                    let editorWholeService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))
                    let engineSceneService = editorWholeService.scene(meta3dState)

                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    let oldActivedBasicCameraView = engineSceneService.basicCameraView.getActiveCameraView(meta3dState,
                        true
                    )

                    let basicCameraViewComponent = api.nullable.getExn(engineSceneService.gameObject.getBasicCameraView(meta3dState,
                        gameObject
                    ))

                    meta3dState = engineSceneService.basicCameraView.active(
                        meta3dState,
                        basicCameraViewComponent
                    )

                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        allActivedBasicCameraViews: state.allActivedBasicCameraViews.push(oldActivedBasicCameraView),
                    })

                    return Promise.resolve(runGameViewRenderOnlyOnce(meta3dState, api, api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))))
                }, (meta3dState) => {
                    let {
                        allActivedBasicCameraViews
                    } = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    if (allActivedBasicCameraViews.count() == 0) {
                        return Promise.resolve(meta3dState)
                    }

                    meta3dState = api.nullable.getWithDefault(
                        api.nullable.map(oldActivedBasicCameraView => {
                            let engineSceneService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))
                                .scene(meta3dState)

                            return engineSceneService.basicCameraView.active(meta3dState, oldActivedBasicCameraView)
                        }, allActivedBasicCameraViews.last()),
                        meta3dState
                    )

                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))
                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        allActivedBasicCameraViews: state.allActivedBasicCameraViews.pop(),
                    })

                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            return new Promise<meta3dState>((resolve, reject) => {
                let selectedGameObject = getSelectedGameObject(meta3dState, api)

                if (api.nullable.isNullable(selectedGameObject)) {
                    resolve(meta3dState)

                    return
                }

                let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    inputData: [
                        uiData,
                        api.nullable.getExn(selectedGameObject),
                    ]
                }))
            })
        },
        createState: (meta3dState) => {
            return {
                allActivedBasicCameraViews: api.immutable.createList()
            }
        }
    }
}
