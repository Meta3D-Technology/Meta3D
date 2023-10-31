import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { actionName, state, uiData } from "meta3d-action-dispose-gameobject-protocol"
import { eventName, inputData } from "meta3d-action-dispose-gameobject-protocol/src/EventType"
import { service as engineWholeSceneViewService } from "meta3d-engine-whole-sceneview-protocol/src/service/ServiceType"
import { service as engineWholeGameViewService } from "meta3d-engine-whole-gameview-protocol/src/service/ServiceType"
import { service as eventSourcingService } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"
import { getActionState, setElementStateField } from "meta3d-ui-utils/src/ElementStateUtils"
import { getSelectSceneTreeNodeState, getState, setSelectSceneTreeNodeState, setState } from "./Utils"
import { List } from "immutable"
import { actionName as selectSceneTreeNodeActionName, state as selectSceneTreeNodeState } from "meta3d-action-select-scenetree-node-protocol"
import { gameObject } from "meta3d-gameobject-protocol"
import { isArraysEqual } from "meta3d-structure-utils/src/ArrayUtils"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { uiControlName as sceneTreeUIControlName, state as sceneTreeState } from "meta3d-ui-control-scenetree-protocol"
import { service as runEngineGameViewService } from "meta3d-editor-run-engine-gameview-protocol/src/service/ServiceType"
import { ensureCheck, test } from "meta3d-ts-contract-utils"
import { removeGameObjectData } from "meta3d-engine-scene-sceneview-protocol/src/service/ecs/GameObject"

let _dispose = (meta3dState: meta3dState, api: api, selectedGameObject: gameObject) => {
    let engineWholeSceneViewService = api.getExtensionService<engineWholeSceneViewService>(meta3dState, "meta3d-engine-whole-sceneview-protocol")
    let engineWholeGameViewService = api.getExtensionService<engineWholeGameViewService>(meta3dState, "meta3d-engine-whole-gameview-protocol")


    let removedGameObjectsForSceneView = engineWholeSceneViewService.scene.gameObject.getGameObjectAndAllChildren(meta3dState, selectedGameObject)

    let disposedGameObjectDataForSceneView = removedGameObjectsForSceneView.map(gameObject => {
        let transform = engineWholeSceneViewService.scene.gameObject.getTransform(meta3dState, gameObject)

        return {
            gameObject,
            name: engineWholeSceneViewService.scene.gameObject.getGameObjectName(meta3dState, gameObject),
            localScale: engineWholeSceneViewService.scene.transform.getLocalScale(meta3dState, transform),
            localPosition: engineWholeSceneViewService.scene.transform.getLocalPosition(meta3dState, transform),
        }
    })

    meta3dState = engineWholeSceneViewService.scene.gameObject.removeGameObjects(meta3dState, removedGameObjectsForSceneView)



    let removedGameObjectsForGameView = engineWholeGameViewService.scene.gameObject.getGameObjectAndAllChildren(meta3dState, selectedGameObject)

    meta3dState = engineWholeGameViewService.scene.gameObject.removeGameObjects(meta3dState, removedGameObjectsForGameView)


    return ensureCheck([
        disposedGameObjectDataForSceneView,
        removedGameObjectsForSceneView,
        removedGameObjectsForGameView
    ], ([
        disposedGameObjectDataForSceneView,
        removedGameObjectsForSceneView,
        removedGameObjectsForGameView
    ]) => {
        test("removed gameObject should equal for both view", () => {
            return isArraysEqual(
                removedGameObjectsForSceneView,
                removedGameObjectsForGameView
            )
        })
    }, true)
}

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol")

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, selectedGameObject) => {
                    let [
                        disposedGameObjectDataForSceneView,
                        removedGameObjectsForSceneView, removedGameObjectsForGameView
                    ] =
                        _dispose(meta3dState, api, selectedGameObject)

                    let disposedGameObjectData = disposedGameObjectDataForSceneView as any as Array<removeGameObjectData>

                    meta3dState = setElementStateField([
                        (elementState: any) => {
                            let state = getState(elementState)

                            return {
                                ...state,
                                allSelectedGameObjects: state.allSelectedGameObjects.push(selectedGameObject),
                                allDisposedGameObjectData: state.allDisposedGameObjectData.push(List(disposedGameObjectData)),
                            }
                        },
                        setState
                    ], meta3dState, api)

                    meta3dState = setElementStateField([
                        (elementState: any) => {
                            let state = getSelectSceneTreeNodeState(elementState)

                            return {
                                ...state,
                                selectedGameObject: null
                            }
                        },
                        setSelectSceneTreeNodeState
                    ], meta3dState, api)



                    let { getUIControlState, setUIControlState } = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")

                    let uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")
                    let sceneTreeState = getExn(getUIControlState<sceneTreeState>(api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol"), sceneTreeUIControlName))

                    let lastSceneTreeSelectedData = sceneTreeState.lastSceneTreeSelectedData

                    uiState = setUIControlState(uiState, sceneTreeUIControlName, {
                        ...sceneTreeState,
                        lastSceneTreeSelectedData: null
                    })

                    meta3dState = api.setExtensionState(meta3dState, "meta3d-ui-protocol", uiState)



                    meta3dState = setElementStateField([
                        (elementState: any) => {
                            let state = getState(elementState)

                            return {
                                ...state,
                                allLastSceneTreeSelectedData: state.allLastSceneTreeSelectedData.push(lastSceneTreeSelectedData),
                            }
                        },
                        setState
                    ], meta3dState, api)



                    return api.getExtensionService<runEngineGameViewService>(meta3dState, "meta3d-editor-run-engine-gameview-protocol").loopEngineWhenStop(meta3dState)
                }, (meta3dState) => {
                    let {
                        allSelectedGameObjects,
                        allLastSceneTreeSelectedData,
                        allDisposedGameObjectData,
                    } = getActionState<state>(meta3dState, api, actionName)

                    if (isNullable(allDisposedGameObjectData.last())) {
                        return Promise.resolve(meta3dState)
                    }

                    let disposedGameObjectData = getExn(allDisposedGameObjectData.last()).toArray()

                    let engineWholeSceneViewService = api.getExtensionService<engineWholeSceneViewService>(meta3dState, "meta3d-engine-whole-sceneview-protocol")
                    let engineWholeGameViewService = api.getExtensionService<engineWholeGameViewService>(meta3dState, "meta3d-engine-whole-gameview-protocol")

                    meta3dState = engineWholeSceneViewService.scene.gameObject.restoreRemovedGameObjects(meta3dState, disposedGameObjectData)
                    meta3dState = engineWholeGameViewService.scene.gameObject.restoreRemovedGameObjects(meta3dState, disposedGameObjectData)

                    let selectedGameObject = getExn(allSelectedGameObjects.last())

                    meta3dState = setElementStateField([
                        (elementState: any) => {
                            let state = getSelectSceneTreeNodeState(elementState)

                            return {
                                ...state,
                                selectedGameObject
                            }
                        },
                        setSelectSceneTreeNodeState
                    ], meta3dState, api)



                    let { getUIControlState, setUIControlState } = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")

                    let uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")
                    let sceneTreeState = getExn(getUIControlState<sceneTreeState>(api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol"), sceneTreeUIControlName))

                    let lastSceneTreeSelectedData = getExn(allLastSceneTreeSelectedData.last())

                    uiState = setUIControlState(uiState, sceneTreeUIControlName, {
                        ...sceneTreeState,
                        lastSceneTreeSelectedData
                    })

                    meta3dState = api.setExtensionState(meta3dState, "meta3d-ui-protocol", uiState)




                    meta3dState = setElementStateField([
                        (elementState: any) => {
                            let state = getState(elementState)

                            return {
                                ...state,
                                allSelectedGameObjects: state.allSelectedGameObjects.pop(),
                                allLastSceneTreeSelectedData: state.allLastSceneTreeSelectedData.pop(),
                                allDisposedGameObjectData: state.allDisposedGameObjectData.pop(),
                            }
                        },
                        setState
                    ], meta3dState, api)


                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            return new Promise<meta3dState>((resolve, reject) => {
                let {
                    selectedGameObject,
                } = getActionState<selectSceneTreeNodeState>(meta3dState, api, selectSceneTreeNodeActionName)

                if (isNullable(selectedGameObject)) {
                    resolve(meta3dState)

                    return
                }

                let eventSourcingService = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol")

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    inputData: [
                        getExn(selectedGameObject),
                    ]
                }))
            })
        },
        createState: () => {
            return {
                allSelectedGameObjects: List(),
                allLastSceneTreeSelectedData: List(),
                allDisposedGameObjectData: List(),
            }
        }
    }
}
