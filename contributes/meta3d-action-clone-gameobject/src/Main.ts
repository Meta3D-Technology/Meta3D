import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-clone-gameobject-protocol"
import { eventName, inputData } from "meta3d-action-clone-gameobject-protocol/src/EventType"
import { actionName as selectSceneTreeNodeActionName, state as selectSceneTreeNodeState } from "meta3d-action-select-scenetree-node-protocol"
import { runGameViewRenderOnlyOnce } from "meta3d-gameview-render-utils/src/GameViewRenderUtils"
import { gameObject } from "meta3d-gameobject-protocol"
import { flatten } from "meta3d-structure-utils/src/ArrayUtils"

let _clone = (meta3dState: meta3dState, api: api, selectedGameObject: gameObject) => {
    let engineSceneService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).scene(meta3dState)

    let data = engineSceneService.gameObject.cloneGameObject(meta3dState, 1, { isShareMaterial: true, }, selectedGameObject)
    meta3dState = data[0]
    let clonedGameObjects = flatten(data[1])


    return [meta3dState, clonedGameObjects]
}

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, selectedGameObject) => {
                    let data = _clone(meta3dState, api, selectedGameObject)
                    meta3dState = data[0] as meta3dState
                    let clonedGameObjects = data[1] as any as Array<gameObject>

                    let state = api.nullable.getExn(
                        api.action.getActionState<state>(meta3dState, actionName)
                    )

                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        allClonedGameObjects: state.allClonedGameObjects.push(api.immutable.createListOfData( clonedGameObjects)),
                    })

                    return Promise.resolve(runGameViewRenderOnlyOnce(meta3dState, api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))))
                }, (meta3dState) => {
                    let {
                        allClonedGameObjects,
                    } = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    if (api.nullable.isNullable(allClonedGameObjects.last())) {
                        return Promise.resolve(meta3dState)
                    }

                    let clonedGameObjects = api.nullable.getExn(allClonedGameObjects.last()).toArray()

                    let engineSceneService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).scene(meta3dState)

                    meta3dState = engineSceneService.gameObject.disposeGameObjects(meta3dState, clonedGameObjects)

                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))
                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        allClonedGameObjects: state.allClonedGameObjects.pop(),
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
                    ]
                }))
            })
        },
        createState: (meta3dState) => {
            return {
                allClonedGameObjects: api.immutable.createList(),
            }
        }
    }
}
