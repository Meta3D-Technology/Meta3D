import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { actionName, state, uiData } from "meta3d-action-set-gameobjectname-protocol"
import { eventName, inputData } from "meta3d-action-set-gameobjectname-protocol/src/EventType"
import { service as engineWholeSceneViewService } from "meta3d-engine-whole-sceneview-protocol/src/service/ServiceType"
import { service as engineWholeGameViewService } from "meta3d-engine-whole-gameview-protocol/src/service/ServiceType"
import { service as eventSourcingService } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
import { bind, getExn, getWithDefault, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"
import { getActionState, setElementStateField } from "meta3d-ui-utils/src/ElementStateUtils"
import { getState, setState } from "./Utils"
import { List } from "immutable"

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol")

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, gameObject, name) => {
                    let engineWholeSceneViewService = api.getExtensionService<engineWholeSceneViewService>(meta3dState, "meta3d-engine-whole-sceneview-protocol")
                    let engineWholeGameViewService = api.getExtensionService<engineWholeGameViewService>(meta3dState, "meta3d-engine-whole-gameview-protocol")

                    let oldName = engineWholeSceneViewService.scene.gameObject.getGameObjectName(meta3dState, gameObject)

                    meta3dState = engineWholeSceneViewService.scene.gameObject.setGameObjectName(meta3dState, gameObject, name)
                    meta3dState = engineWholeGameViewService.scene.gameObject.setGameObjectName(meta3dState, gameObject, name)


                    meta3dState = setElementStateField([
                        (elementState: any) => {
                            let state = getState(elementState)

                            return {
                                ...state,
                                allGameObjectNameData: state.allGameObjectNameData.push([gameObject, oldName ]),
                            }
                        },
                        setState
                    ], meta3dState, api)


                    return Promise.resolve(meta3dState)
                }, (meta3dState) => {
                    let {
                        allGameObjectNameData
                    } = getActionState<state>(meta3dState, api, actionName)

                    if (isNullable(allGameObjectNameData.last())) {
                        return Promise.resolve(meta3dState)
                    }

                    let [gameObject, name] = getExn(allGameObjectNameData.last())

                    let engineWholeSceneViewService = api.getExtensionService<engineWholeSceneViewService>(meta3dState, "meta3d-engine-whole-sceneview-protocol")
                    let engineWholeGameViewService = api.getExtensionService<engineWholeGameViewService>(meta3dState, "meta3d-engine-whole-gameview-protocol")

                    meta3dState = getWithDefault(bind((name) => {
                        meta3dState = engineWholeSceneViewService.scene.gameObject.setGameObjectName(meta3dState, gameObject, name)
                        meta3dState = engineWholeGameViewService.scene.gameObject.setGameObjectName(meta3dState, gameObject, name)

                        return meta3dState
                    }, name), meta3dState)


                    meta3dState = setElementStateField([
                        (elementState: any) => {
                            let state = getState(elementState)

                            return {
                                ...state,
                                allGameObjectNameData: state.allGameObjectNameData.pop(),
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
                let eventSourcingService = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol")

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    inputData: uiData
                }))
            })
        },
        createState: () => {
            return {
                allGameObjectNameData: List()
            }
        }
    }
}
