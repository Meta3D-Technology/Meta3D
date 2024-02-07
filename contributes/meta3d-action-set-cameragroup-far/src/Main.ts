import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-set-cameragroup-far-protocol"
import { eventName, inputData } from "meta3d-action-set-cameragroup-far-protocol/src/EventType"
import { runGameViewRenderOnlyOnce } from "meta3d-gameview-render-utils/src/GameViewRenderUtils"
import { getSelectedGameObject } from "meta3d-select-inspector-node-utils/src/Main"

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, gameObject, far) => {
                    let editorWholeService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))
                    let engineSceneService = editorWholeService.scene(meta3dState)

                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    let perspectiveCameraProjectionComponent = api.nullable.getExn(engineSceneService.gameObject.getPerspectiveCameraProjection(meta3dState,
                        gameObject
                    ))


                    let oldFar = api.nullable.getWithDefault(state.farMap.get(perspectiveCameraProjectionComponent),
                        api.nullable.getExn(
                            engineSceneService.perspectiveCameraProjection.getFar(meta3dState,
                                perspectiveCameraProjectionComponent
                            )
                        )
                    )


                    meta3dState = engineSceneService.perspectiveCameraProjection.setFar(meta3dState,
                        perspectiveCameraProjectionComponent,
                        far
                    )

                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        allFarData: state.allFarData.push([gameObject, oldFar]),
                        farMap: state.farMap.set(perspectiveCameraProjectionComponent, far)
                    })

                    return Promise.resolve(runGameViewRenderOnlyOnce(meta3dState, api, api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))))
                }, (meta3dState) => {
                    let {
                        allFarData
                    } = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    if (api.nullable.isNullable(allFarData.last())) {
                        return Promise.resolve(meta3dState)
                    }

                    let [gameObject, far] = api.nullable.getExn(allFarData.last())

                    let engineSceneService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))
                        .scene(meta3dState)

                    let perspectiveCameraProjectionComponent = api.nullable.getExn(engineSceneService.gameObject.getPerspectiveCameraProjection(meta3dState,
                        gameObject
                    ))

                    meta3dState = engineSceneService.perspectiveCameraProjection.setFar(meta3dState,
                        perspectiveCameraProjectionComponent,
                        far
                    )

                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))
                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        allFarData: state.allFarData.pop(),
                        farMap: state.farMap.set(perspectiveCameraProjectionComponent, far)
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
                        api.nullable.getExn(selectedGameObject),
                        uiData
                    ]
                }))
            })
        },
        createState: (meta3dState) => {
            return {
                allFarData: api.immutable.createList(),
                farMap: api.immutable.createMap()
            }
        }
    }
}
