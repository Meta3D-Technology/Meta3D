import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-set-localposition-protocol"
import { eventName, inputData } from "meta3d-action-set-localposition-protocol/src/EventType"
import { actionName as selectSceneTreeNodeActionName, state as selectSceneTreeNodeState } from "meta3d-action-select-scenetree-node-protocol"
import { runGameViewRenderOnlyOnce } from "meta3d-gameview-render-utils/src/GameViewRenderUtils"

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, gameObject, localPosition) => {
                    let editorWholeService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))
                    let engineSceneService = editorWholeService.scene(meta3dState)

                    let oldLocalPosition = engineSceneService.transform.getLocalPosition(meta3dState,
                        engineSceneService.gameObject.getTransform(meta3dState,
                            gameObject
                        )
                    )

                    meta3dState = engineSceneService.transform.setLocalPosition(meta3dState,
                        engineSceneService.gameObject.getTransform(meta3dState,
                            gameObject
                        ),
                        localPosition
                    )


                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))
                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        allLocalPositionData: state.allLocalPositionData.push([gameObject, oldLocalPosition]),
                    })

                    return Promise.resolve(runGameViewRenderOnlyOnce(meta3dState,api, api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))))
                }, (meta3dState) => {
                    let {
                        allLocalPositionData
                    } = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    if (api.nullable.isNullable(allLocalPositionData.last())) {
                        return Promise.resolve(meta3dState)
                    }

                    let [gameObject, localPosition] = api.nullable.getExn(allLocalPositionData.last())

                    let engineSceneService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))
                        .scene(meta3dState)

                    meta3dState = engineSceneService.transform.setLocalPosition(meta3dState,
                        engineSceneService.gameObject.getTransform(meta3dState,
                            gameObject
                        ),
                        localPosition
                    )

                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))
                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        allLocalPositionData: state.allLocalPositionData.pop(),
                    })

                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            return new Promise<meta3dState>((resolve, reject) => {
                let {
                    selectedGameObject,
                } = api.nullable.getExn(api.action.getActionState<selectSceneTreeNodeState>(meta3dState, selectSceneTreeNodeActionName))

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
                allLocalPositionData: api.immutable.createList()
            }
        }
    }
}
