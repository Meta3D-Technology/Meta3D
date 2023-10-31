import { api, getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
// import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
// import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { service as engineWholeService } from "meta3d-engine-whole-sceneview-protocol/src/service/ServiceType"
import { service as engineWholeGameViewService } from "meta3d-engine-whole-gameview-protocol/src/service/ServiceType"
import { service as runEngineGameViewService } from "meta3d-editor-run-engine-gameview-protocol/src/service/ServiceType"
import { state as meta3dState } from "meta3d-type"
import { clickUIData } from "meta3d-ui-control-button-protocol"
import { actionName, state } from "meta3d-action-add-cube-protocol"
import { eventName, inputData } from "meta3d-action-add-cube-protocol/src/EventType"
import { service as eventSourcingService } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
import { getActionState, setElementStateField } from "meta3d-ui-utils/src/ElementStateUtils"
import { getState, setState } from "./Utils"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { List } from "immutable"
import { gameObject } from "meta3d-gameobject-protocol"
import { disposeGameObjectAndAllChildren } from "meta3d-dispose-utils/src/DisposeGameObjectUtils"
import { createCubeGameObject } from "meta3d-primitive-utils/src/CubeUtils"
import { assertEqual, ensureCheck, test } from "meta3d-ts-contract-utils"

let _createCube = (meta3dState: meta3dState, api: api) => {
    let engineWholeService = api.getExtensionService<engineWholeService>(meta3dState, "meta3d-engine-whole-sceneview-protocol")
    let engineWholeGameViewService = api.getExtensionService<engineWholeGameViewService>(meta3dState, "meta3d-engine-whole-gameview-protocol")

    let diffuseColor: [number, number, number] = [Math.random(), Math.random(), Math.random()]
    let localPosition: [number, number, number] = [Math.random() * 10 - 5, Math.random() * 10 - 5, 0]

    let data = createCubeGameObject(meta3dState, engineWholeService, [localPosition, diffuseColor])
    meta3dState = data[0] as meta3dState
    let addedGameObjectForSceneView = data[1] as gameObject

    data = createCubeGameObject(meta3dState, engineWholeGameViewService, [localPosition, diffuseColor])
    meta3dState = data[0] as meta3dState
    let addedGameObjectForGameView = data[1] as gameObject

    return ensureCheck([
        addedGameObjectForSceneView, addedGameObjectForGameView
    ], ([
        addedGameObjectForSceneView, addedGameObjectForGameView
    ]) => {
        test("added gameObject should equal for both view", () => {
            return assertEqual(addedGameObjectForSceneView, addedGameObjectForGameView
            )
        })
    }, true)
}

export let getContribute: getContributeMeta3D<actionContribute<clickUIData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol")

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState) => {
                    let [addedGameObjectForSceneView, addedGameObjectForGameView] = _createCube(meta3dState, api)

                    let addedGameObject = addedGameObjectForSceneView

                    meta3dState = setElementStateField([
                        (elementState: any) => {
                            let state = getState(elementState)

                            return {
                                ...state,
                                addedGameObjects:
                                    state.addedGameObjects.push(addedGameObject)
                                ,
                            }
                        },
                        setState
                    ], meta3dState, api)

                    return api.getExtensionService<runEngineGameViewService>(meta3dState, "meta3d-editor-run-engine-gameview-protocol").loopEngineWhenStop(meta3dState)
                }, (meta3dState) => {
                    let {
                        addedGameObjects,
                    } = getActionState<state>(meta3dState, api, actionName)

                    let disposedGameObject = getExn(addedGameObjects.last())

                    meta3dState = setElementStateField([
                        (elementState: any) => {
                            let state = getState(elementState)

                            return {
                                ...state,
                                addedGameObjects:
                                    state.addedGameObjects.pop()
                            }
                        },
                        setState
                    ], meta3dState, api)

                    let engineWholeService = api.getExtensionService<engineWholeService>(meta3dState, "meta3d-engine-whole-sceneview-protocol")
                    let engineWholeGameViewService = api.getExtensionService<engineWholeGameViewService>(meta3dState, "meta3d-engine-whole-gameview-protocol")

                    meta3dState = disposeGameObjectAndAllChildren<engineWholeService>(meta3dState, engineWholeService, disposedGameObject)
                    meta3dState = disposeGameObjectAndAllChildren<engineWholeGameViewService>(meta3dState, engineWholeGameViewService, disposedGameObject)

                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            console.log("add cube")

            return new Promise<meta3dState>((resolve, reject) => {
                let eventSourcingService = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol")

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    inputData: []
                }))
            })
        },
        createState: () => {
            return {
                addedGameObjects: List(),
            }
        }
    }
}
