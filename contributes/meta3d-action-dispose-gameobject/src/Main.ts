import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { actionName, state, uiData } from "meta3d-action-dispose-gameobject-protocol"
import { eventName, inputData } from "meta3d-action-dispose-gameobject-protocol/src/EventType"
import { service as engineWholeSceneViewService } from "meta3d-engine-whole-sceneview-protocol/src/service/ServiceType"
import { service as engineWholeGameViewService } from "meta3d-engine-whole-gameview-protocol/src/service/ServiceType"
import { service as eventSourcingService } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"
import { getActionState, setElementStateField } from "meta3d-ui-utils/src/ElementStateUtils"
import { getState, setState } from "./Utils"
import { List } from "immutable"
import { actionName as selectSceneTreeNodeActionName, state as selectSceneTreeNodeState } from "meta3d-action-select-scenetree-node-protocol"
import { gameObject } from "meta3d-gameobject-protocol"
import { isArraysEqual } from "meta3d-structure-utils/src/ArrayUtils"

let _checkRemovdGameObjectShouldEqualForBothView = (removedGameObjectsForSceneView: Array<gameObject>, removedGameObjectsForGameView: Array<gameObject>) => {
    if (!isArraysEqual(removedGameObjectsForSceneView, removedGameObjectsForGameView)) {
        throw new Error("removed gameObject should equal for both view")
    }
}

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol")

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, selectedGameObject) => {
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


                    _checkRemovdGameObjectShouldEqualForBothView(removedGameObjectsForSceneView, removedGameObjectsForGameView)

                    let disposedGameObjectData = disposedGameObjectDataForSceneView

                    meta3dState = setElementStateField([
                        (elementState: any) => {
                            let state = getState(elementState)

                            return {
                                ...state,
                                allDisposedGameObjectData: state.allDisposedGameObjectData.push(List(disposedGameObjectData)),
                            }
                        },
                        setState
                    ], meta3dState, api)


                    return Promise.resolve(meta3dState)
                }, (meta3dState) => {
                    let {
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


                    meta3dState = setElementStateField([
                        (elementState: any) => {
                            let state = getState(elementState)

                            return {
                                ...state,
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
                allDisposedGameObjectData: List(),
            }
        }
    }
}
