import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-set-gameobjectname-protocol"
import { eventName, inputData } from "meta3d-action-set-gameobjectname-protocol/src/EventType"
import { actionName as selectSceneTreeNodeActionName, state as selectSceneTreeNodeState } from "meta3d-action-select-scenetree-node-protocol"
import { runGameViewRenderOnlyOnce } from "meta3d-gameview-render-utils/src/GameViewRenderUtils"

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, gameObject, name) => {
                    let editorWholeService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))
                    let engineSceneService = editorWholeService.scene(meta3dState)

                    let oldName = engineSceneService.gameObject.getGameObjectName(meta3dState,
                        gameObject
                    )

                    meta3dState = engineSceneService.gameObject.setGameObjectName(meta3dState,
                        gameObject,
                        name
                    )


                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))
                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        allGameObjectNameData: state.allGameObjectNameData.push([gameObject, oldName]),
                    })

                    return Promise.resolve(runGameViewRenderOnlyOnce(meta3dState,api, api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))))
                }, (meta3dState) => {
                    let {
                        allGameObjectNameData
                    } = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    if (api.nullable.isNullable(allGameObjectNameData.last())) {
                        return Promise.resolve(meta3dState)
                    }

                    let [gameObject, name] = api.nullable.getExn(allGameObjectNameData.last())

                    let engineSceneService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))
                        .scene(meta3dState)

                    meta3dState = api.nullable.getWithDefault(api.nullable.map((name) => {
                        return engineSceneService.gameObject.setGameObjectName(meta3dState, gameObject, name)
                    }, name), meta3dState)

                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))
                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        allGameObjectNameData: state.allGameObjectNameData.pop(),
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
                allGameObjectNameData: api.immutable.createList()
            }
        }
    }
}
