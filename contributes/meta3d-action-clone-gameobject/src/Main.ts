import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { actionName, state, uiData } from "meta3d-action-clone-gameobject-protocol"
import { eventName, inputData } from "meta3d-action-clone-gameobject-protocol/src/EventType"
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
import { service as runEngineGameViewService } from "meta3d-editor-run-engine-gameview-protocol/src/service/ServiceType"

let _checkClonedGameObjectShouldEqualForBothView = (clonedGameObjectsForSceneView: Array<gameObject>, clonedGameObjectsForGameView: Array<gameObject>) => {
    if (!isArraysEqual(clonedGameObjectsForSceneView, clonedGameObjectsForGameView)) {
        throw new Error("cloned gameObject should equal for both view")
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

                    let data = engineWholeSceneViewService.scene.gameObject.cloneGameObject(meta3dState, 1, { isShareMaterial: true, }, selectedGameObject)
                    meta3dState = data[0]
                    let clonedGameObjectsForSceneView = data[1][0]

                    data = engineWholeGameViewService.scene.gameObject.cloneGameObject(meta3dState, 1, { isShareMaterial: true, }, selectedGameObject)
                    meta3dState = data[0]
                    let clonedGameObjectsForGameView = data[1][0]


                    _checkClonedGameObjectShouldEqualForBothView(clonedGameObjectsForSceneView, clonedGameObjectsForGameView)

                    let clonedGameObjects = clonedGameObjectsForSceneView

                    meta3dState = setElementStateField([
                        (elementState: any) => {
                            let state = getState(elementState)

                            return {
                                ...state,
                                allClonedGameObjects: state.allClonedGameObjects.push(List(clonedGameObjects)),
                            }
                        },
                        setState
                    ], meta3dState, api)

                    return api.getExtensionService<runEngineGameViewService>(meta3dState, "meta3d-editor-run-engine-gameview-protocol").loopEngineWhenStop(meta3dState)
                }, (meta3dState) => {
                    let {
                        allClonedGameObjects,
                    } = getActionState<state>(meta3dState, api, actionName)

                    if (isNullable(allClonedGameObjects.last())) {
                        return Promise.resolve(meta3dState)
                    }

                    let clonedGameObjects = getExn(allClonedGameObjects.last()).toArray()

                    let engineWholeSceneViewService = api.getExtensionService<engineWholeSceneViewService>(meta3dState, "meta3d-engine-whole-sceneview-protocol")
                    let engineWholeGameViewService = api.getExtensionService<engineWholeGameViewService>(meta3dState, "meta3d-engine-whole-gameview-protocol")

                    meta3dState = engineWholeSceneViewService.scene.gameObject.disposeGameObjects(meta3dState, clonedGameObjects)
                    meta3dState = engineWholeGameViewService.scene.gameObject.disposeGameObjects(meta3dState, clonedGameObjects)


                    meta3dState = setElementStateField([
                        (elementState: any) => {
                            let state = getState(elementState)

                            return {
                                ...state,
                                allClonedGameObjects: state.allClonedGameObjects.pop(),
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
                allClonedGameObjects: List(),
            }
        }
    }
}
