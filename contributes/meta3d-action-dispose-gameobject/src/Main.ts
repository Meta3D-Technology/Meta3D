import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-dispose-gameobject-protocol"
import { eventName, inputData } from "meta3d-action-dispose-gameobject-protocol/src/EventType"
import { actionName as selectSceneTreeNodeActionName, state as selectSceneTreeNodeState } from "meta3d-action-select-scenetree-node-protocol"
import { state as treeState } from "meta3d-ui-control-tree-protocol"
import { gameObject } from "meta3d-gameobject-protocol"
import { removeGameObjectData } from "meta3d-engine-scene-protocol/src/service/ecs/GameObject"
import { runGameViewRenderOnlyOnce } from "meta3d-gameview-render-utils/src/GameViewRenderUtils"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { treeIndexData } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { assertNullableExist, ensureCheck, test } from "meta3d-ts-contract-utils"

let _dispose = (meta3dState: meta3dState, api: api, selectedGameObject: gameObject) => {
    let engineSceneService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).scene(meta3dState)

    let removedGameObjects = engineSceneService.gameObject.getGameObjectAndAllChildren(meta3dState, selectedGameObject)

    let disposedGameObjectData = removedGameObjects.map(gameObject => {
        let transform = engineSceneService.gameObject.getTransform(meta3dState, gameObject)

        return {
            gameObject,
            name: engineSceneService.gameObject.getGameObjectName(meta3dState, gameObject),
            localScale: engineSceneService.transform.getLocalScale(meta3dState, transform),
            localPosition: engineSceneService.transform.getLocalPosition(meta3dState, transform),
        }
    })

    meta3dState = engineSceneService.gameObject.removeGameObjects(meta3dState, removedGameObjects)

    return [meta3dState, disposedGameObjectData]
}

let _getLastTreeSelectedData = (sceneTreeState: treeState) => {
    return ensureCheck(
        sceneTreeState.lastTreeSelectedData
        , (
            lastTreeSelectedData
                : nullable<treeIndexData>) => {
            test("lastTreeSelectedData should exist", () => {
                return assertNullableExist(lastTreeSelectedData)
            })
        }, true)
}

let _buildSceneTreeLabel = () => "Scene Tree"

let _getSceneTreeUIControlState = (meta3dState: meta3dState, api: api, sceneTreeLabel: string) => {
    let state = api.uiControl.getUIControlState<treeState>(meta3dState, sceneTreeLabel)

    if (api.nullable.isNullable(state)) {
        throw new Error("should exist UI Control whose label is Scene Tree");
    }

    return api.nullable.getExn(state)
}

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, selectedGameObject) => {
                    let data = _dispose(meta3dState, api, selectedGameObject)
                    meta3dState = data[0] as meta3dState
                    let disposedGameObjectData = data[1] as any as Array<removeGameObjectData>

                    let state = api.nullable.getExn(
                        api.action.getActionState<state>(meta3dState, actionName)
                    )

                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        allSelectedGameObjects: state.allSelectedGameObjects.push(selectedGameObject),
                        allDisposedGameObjectData: state.allDisposedGameObjectData.push(api.immutable.createListOfData(disposedGameObjectData)),
                    })

                    meta3dState = api.action.setActionState(meta3dState, selectSceneTreeNodeActionName, {
                        ...api.action.getActionState<selectSceneTreeNodeState>(meta3dState, selectSceneTreeNodeActionName),
                        selectedGameObject: null
                    })


                    let sceneTreeLabel = _buildSceneTreeLabel()

                    let sceneTreeState = _getSceneTreeUIControlState(meta3dState, api, sceneTreeLabel)

                    let lastTreeSelectedData = _getLastTreeSelectedData(sceneTreeState)


                    meta3dState = api.uiControl.setUIControlState(meta3dState, sceneTreeLabel, {
                        ...sceneTreeState,
                        lastTreeSelectedData: null
                    })

                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...api.action.getActionState<state>(meta3dState, actionName),
                        allLastSceneTreeSelectedData: state.allLastSceneTreeSelectedData.push(lastTreeSelectedData),
                    })


                    return Promise.resolve(runGameViewRenderOnlyOnce(meta3dState, api, api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))))
                }, (meta3dState) => {
                    let {
                        allSelectedGameObjects,
                        allLastSceneTreeSelectedData,
                        allDisposedGameObjectData,
                    } = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    if (api.nullable.isNullable(allDisposedGameObjectData.last())) {
                        return Promise.resolve(meta3dState)
                    }

                    let disposedGameObjectData = api.nullable.getExn(allDisposedGameObjectData.last()).toArray()

                    let engineSceneService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).scene(meta3dState)

                    meta3dState = engineSceneService.gameObject.restoreRemovedGameObjects(meta3dState, disposedGameObjectData)

                    let selectedGameObject = api.nullable.getExn(allSelectedGameObjects.last())

                    meta3dState = api.action.setActionState(meta3dState, selectSceneTreeNodeActionName, {
                        ...api.action.getActionState<selectSceneTreeNodeState>(meta3dState, selectSceneTreeNodeActionName),
                        selectedGameObject
                    })


                    let sceneTreeLabel = _buildSceneTreeLabel()

                    let sceneTreeState = _getSceneTreeUIControlState(meta3dState, api, sceneTreeLabel)

                    meta3dState = api.uiControl.setUIControlState(meta3dState, sceneTreeLabel, {
                        ...sceneTreeState,
                        lastTreeSelectedData: api.nullable.getExn(allLastSceneTreeSelectedData.last())
                    })


                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        allSelectedGameObjects: state.allSelectedGameObjects.pop(),
                        allLastSceneTreeSelectedData: state.allLastSceneTreeSelectedData.pop(),
                        allDisposedGameObjectData: state.allDisposedGameObjectData.pop(),
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
                allSelectedGameObjects: api.immutable.createList(),
                allLastSceneTreeSelectedData: api.immutable.createList(),
                allDisposedGameObjectData: api.immutable.createList(),
            }
        }
    }
}
