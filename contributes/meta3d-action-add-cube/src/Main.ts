import { getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
// import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
// import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { service as engineWholeService } from "meta3d-engine-whole-sceneview-protocol/src/service/ServiceType"
import { service as engineWholeGameViewService } from "meta3d-engine-whole-gameview-protocol/src/service/ServiceType"
import { service as runEngineGameViewService } from "meta3d-editor-run-engine-gameview-protocol/src/service/ServiceType"
import { state as meta3dState } from "meta3d-type"
import { clickUIData } from "meta3d-ui-control-button-protocol"
import { actionName, state } from "meta3d-action-add-cube-protocol"
import { eventName, inputData, subEvent } from "meta3d-action-add-cube-protocol/src/EventType"
import { service as eventSourcingService } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { getActionState, setElementStateField } from "meta3d-ui-utils/src/ElementStateUtils"
import { getState, setState } from "./Utils"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { List } from "immutable"
import { gameObject } from "meta3d-gameobject-protocol"

let _createCubeGameObject = (meta3dState: meta3dState, { scene }: engineWholeService, [localPosition, diffuseColor]: [[number, number, number], [number, number, number]]) => {
    let data = scene.gameObject.createGameObject(meta3dState)
    meta3dState = data[0]
    let gameObject = data[1]


    data = scene.transform.createTransform(meta3dState)
    meta3dState = data[0]
    let transform = data[1]

    meta3dState = scene.gameObject.addTransform(meta3dState, gameObject, transform)

    data = scene.geometry.createGeometry(meta3dState)
    meta3dState = data[0]
    let geometry = data[1]


    let vertices = new Float32Array([
        1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0,
        -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0,
        -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0,
        -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0
    ])

    let indices = new Uint32Array([
        0, 1, 2, 0, 2, 3,
        4, 5, 6, 4, 6, 7,
        8, 9, 10, 8, 10, 11,
        12, 13, 14, 12, 14, 15,
        16, 17, 18, 16, 18, 19,
        20, 21, 22, 20, 22, 23
    ])
    meta3dState = scene.geometry.setVertices(meta3dState, geometry, vertices)
    meta3dState = scene.geometry.setIndices(meta3dState, geometry, indices)
    meta3dState = scene.gameObject.addGeometry(meta3dState, gameObject, geometry)


    meta3dState = scene.gameObject.addGeometry(meta3dState, gameObject, geometry)



    data = scene.pbrMaterial.createPBRMaterial(meta3dState)
    meta3dState = data[0]
    let material = data[1]
    meta3dState = scene.pbrMaterial.setDiffuseColor(meta3dState, material, diffuseColor)
    meta3dState = scene.gameObject.addPBRMaterial(meta3dState, gameObject, material)



    meta3dState = scene.transform.setLocalPosition(meta3dState, transform, localPosition)


    return [meta3dState, gameObject]
}

export let getContribute: getContributeMeta3D<actionContribute<clickUIData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol")

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState) => {
                    let engineWholeService = api.getExtensionService<engineWholeService>(meta3dState, "meta3d-engine-whole-sceneview-protocol")
                    let engineWholeGameViewService = api.getExtensionService<engineWholeGameViewService>(meta3dState, "meta3d-engine-whole-gameview-protocol")

                    let diffuseColor: [number, number, number] = [Math.random(), Math.random(), Math.random()]
                    let localPosition: [number, number, number] = [Math.random() * 10 - 5, Math.random() * 10 - 5, 0]

                    let data = _createCubeGameObject(meta3dState, engineWholeService, [localPosition, diffuseColor])
                    meta3dState = data[0] as meta3dState
                    let addedGameObjectForSceneView = data[1] as gameObject

                    data = _createCubeGameObject(meta3dState, engineWholeGameViewService, [localPosition, diffuseColor])
                    meta3dState = data[0] as meta3dState
                    let addedGameObjectForGameView = data[1] as gameObject

                    meta3dState = setElementStateField([
                        (elementState: any) => {
                            let state = getState(elementState)

                            return {
                                ...state,
                                addedGameObjectsForSceneView:
                                    state.addedGameObjectsForSceneView.push(addedGameObjectForSceneView)
                                ,
                                addedGameObjectsForGameView:
                                    state.addedGameObjectsForGameView.push(addedGameObjectForGameView)
                            }
                        },
                        setState
                    ], meta3dState, api)

                    return api.getExtensionService<runEngineGameViewService>(meta3dState, "meta3d-editor-run-engine-gameview-protocol").loopEngineWhenStop(meta3dState)
                }, (meta3dState) => {
                    let eventService = api.getExtensionService<eventService>(
                        meta3dState,
                        "meta3d-event-protocol"
                    )

                    let {
                        addedGameObjectsForSceneView,
                        addedGameObjectsForGameView
                    } = getActionState<state>(meta3dState, api, actionName)

                    let disposedGameObjectForSceneView = getExn(addedGameObjectsForSceneView.last())
                    let disposedGameObjectForGameView = getExn(addedGameObjectsForGameView.last())


                    meta3dState = setElementStateField([
                        (elementState: any) => {
                            let state = getState(elementState)

                            return {
                                ...state,
                                addedGameObjectsForSceneView:
                                    state.addedGameObjectsForSceneView.pop()
                                ,
                                addedGameObjectsForGameView:
                                    state.addedGameObjectsForGameView.pop()
                            }
                        },
                        setState
                    ], meta3dState, api)


                    meta3dState = eventService.triggerCustomGlobalEvent2(meta3dState, "meta3d-event-protocol",
                        eventService.createCustomEvent(
                            subEvent.disposeGameObjectEventNameForSceneView,
                            disposedGameObjectForSceneView as any
                        )
                    )
                    meta3dState = eventService.triggerCustomGlobalEvent2(meta3dState, "meta3d-event-protocol",
                        eventService.createCustomEvent(
                            subEvent.disposeGameObjectEventNameForGameView,
                            disposedGameObjectForSceneView as any
                        )
                    )

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
                addedGameObjectsForSceneView: List(),
                addedGameObjectsForGameView: List()
            }
        }
    }
}
