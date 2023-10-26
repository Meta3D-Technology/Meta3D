import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { actionName, state, uiData } from "meta3d-action-set-localeulerangle-protocol"
import { eventName, inputData } from "meta3d-action-set-localeulerangle-protocol/src/EventType"
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
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, gameObject, localEulerAngle) => {
                    let engineWholeSceneViewService = api.getExtensionService<engineWholeSceneViewService>(meta3dState, "meta3d-engine-whole-sceneview-protocol")
                    let engineWholeGameViewService = api.getExtensionService<engineWholeGameViewService>(meta3dState, "meta3d-engine-whole-gameview-protocol")

                    let oldLocalEulerAngle = engineWholeSceneViewService.scene.transform.getLocalEulerAngles(meta3dState,
                        engineWholeSceneViewService.scene.gameObject.getTransform(meta3dState,
                            gameObject
                        )
                    )

                    meta3dState = engineWholeSceneViewService.scene.transform.setLocalEulerAngles(meta3dState,
                        engineWholeSceneViewService.scene.gameObject.getTransform(meta3dState,
                            gameObject
                        ),
                        localEulerAngle
                    )
                    meta3dState = engineWholeGameViewService.scene.transform.setLocalEulerAngles(meta3dState,
                        engineWholeGameViewService.scene.gameObject.getTransform(meta3dState,
                            gameObject
                        ),
                        localEulerAngle
                    )


                    meta3dState = setElementStateField([
                        (elementState: any) => {
                            let state = getState(elementState)

                            return {
                                ...state,
                                allLocalEulerAngleData: state.allLocalEulerAngleData.push([gameObject, oldLocalEulerAngle]),
                            }
                        },
                        setState
                    ], meta3dState, api)


                    return Promise.resolve(meta3dState)
                }, (meta3dState) => {
                    let {
                        allLocalEulerAngleData
                    } = getActionState<state>(meta3dState, api, actionName)

                    if (isNullable(allLocalEulerAngleData.last())) {
                        return Promise.resolve(meta3dState)
                    }

                    let [gameObject, localEulerAngle] = getExn(allLocalEulerAngleData.last())

                    let engineWholeSceneViewService = api.getExtensionService<engineWholeSceneViewService>(meta3dState, "meta3d-engine-whole-sceneview-protocol")
                    let engineWholeGameViewService = api.getExtensionService<engineWholeGameViewService>(meta3dState, "meta3d-engine-whole-gameview-protocol")

                    meta3dState = engineWholeSceneViewService.scene.transform.setLocalEulerAngles(meta3dState,
                        engineWholeSceneViewService.scene.gameObject.getTransform(meta3dState,
                            gameObject
                        ),
                        localEulerAngle
                    )
                    meta3dState = engineWholeGameViewService.scene.transform.setLocalEulerAngles(meta3dState,
                        engineWholeGameViewService.scene.gameObject.getTransform(meta3dState,
                            gameObject
                        ),
                        localEulerAngle
                    )

                    meta3dState = setElementStateField([
                        (elementState: any) => {
                            let state = getState(elementState)

                            return {
                                ...state,
                                allLocalEulerAngleData: state.allLocalEulerAngleData.pop(),
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
                allLocalEulerAngleData: List()
            }
        }
    }
}
