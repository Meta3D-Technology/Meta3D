import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { actionName, state, uiData } from "meta3d-action-set-parent-protocol"
import { eventName, inputData } from "meta3d-action-set-parent-protocol/src/EventType"
import { service as engineWholeSceneViewService } from "meta3d-engine-whole-sceneview-protocol/src/service/ServiceType"
import { service as engineWholeGameViewService } from "meta3d-engine-whole-gameview-protocol/src/service/ServiceType"
import { service as eventSourcingService } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
import { bind, getExn, isNullable, map } from "meta3d-commonlib-ts/src/NullableUtils"
import { getActionState, setElementStateField } from "meta3d-ui-utils/src/ElementStateUtils"
import { getState, setState } from "./Utils"
import { List } from "immutable"
import { service as runEngineGameViewService } from "meta3d-editor-run-engine-gameview-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol")

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, { source, target }) => {
                    let engineWholeSceneViewService = api.getExtensionService<engineWholeSceneViewService>(meta3dState, "meta3d-engine-whole-sceneview-protocol")
                    let engineWholeGameViewService = api.getExtensionService<engineWholeGameViewService>(meta3dState, "meta3d-engine-whole-gameview-protocol")

                    let sourceTranform = engineWholeSceneViewService.scene.gameObject.getTransform(meta3dState, source)
                    let targetTranform = map(target => {
                        return engineWholeSceneViewService.scene.gameObject.getTransform(meta3dState, target)
                    }, target)

                    let oldParent = bind((parent) => {
                        return engineWholeSceneViewService.scene.transform.getGameObjects(meta3dState, parent)[0]
                    }, engineWholeSceneViewService.scene.transform.getParent(meta3dState, sourceTranform))

                    meta3dState = engineWholeSceneViewService.scene.transform.setParent(meta3dState, sourceTranform, targetTranform)


                    sourceTranform = engineWholeGameViewService.scene.gameObject.getTransform(meta3dState, source)
                    targetTranform = map(target => {
                        return engineWholeGameViewService.scene.gameObject.getTransform(meta3dState, target)
                    }, target)

                    meta3dState = engineWholeGameViewService.scene.transform.setParent(meta3dState, sourceTranform, targetTranform)




                    meta3dState = setElementStateField([
                        (elementState: any) => {
                            let state = getState(elementState)

                            return {
                                ...state,
                                allHierachyData: state.allHierachyData.push({
                                    source,
                                    oldParent
                                }),
                            }
                        },
                        setState
                    ], meta3dState, api)


                    return api.getExtensionService<runEngineGameViewService>(meta3dState, "meta3d-editor-run-engine-gameview-protocol").loopEngineWhenStop(meta3dState)
                }, (meta3dState) => {
                    let {
                        allHierachyData
                    } = getActionState<state>(meta3dState, api, actionName)

                    if (isNullable(allHierachyData.last())) {
                        return Promise.resolve(meta3dState)
                    }

                    let { source, oldParent } = getExn(allHierachyData.last())

                    let engineWholeSceneViewService = api.getExtensionService<engineWholeSceneViewService>(meta3dState, "meta3d-engine-whole-sceneview-protocol")
                    let engineWholeGameViewService = api.getExtensionService<engineWholeGameViewService>(meta3dState, "meta3d-engine-whole-gameview-protocol")

                    meta3dState = engineWholeSceneViewService.scene.transform.setParent(meta3dState,
                        engineWholeSceneViewService.scene.gameObject.getTransform(meta3dState, source),
                        bind((oldParent) => {
                            return engineWholeSceneViewService.scene.gameObject.getTransform(meta3dState, oldParent)
                        }, oldParent)
                    )
                    meta3dState = engineWholeGameViewService.scene.transform.setParent(meta3dState,
                        engineWholeGameViewService.scene.gameObject.getTransform(meta3dState, source),
                        bind((oldParent) => {
                            return engineWholeGameViewService.scene.gameObject.getTransform(meta3dState, oldParent)
                        }, oldParent)
                    )


                    meta3dState = setElementStateField([
                        (elementState: any) => {
                            let state = getState(elementState)

                            return {
                                ...state,
                                allHierachyData: state.allHierachyData.pop(),
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
                    inputData: [uiData]
                }))
            })
        },
        createState: () => {
            return {
                allHierachyData: List()
            }
        }
    }
}
