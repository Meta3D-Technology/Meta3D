import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { actionName, state, uiData } from "meta3d-action-select-scenetree-node-protocol"
import { eventName, inputData } from "meta3d-action-select-scenetree-node-protocol/src/EventType"
import { service as eventSourcingService } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"
import { getActionState, setElementStateField } from "meta3d-ui-utils/src/ElementStateUtils"
import { getState, setState } from "./Utils"
import { List } from "immutable"

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol")

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, selectedGameObject) => {
                    meta3dState = setElementStateField([
                        (elementState: any) => {
                            let state = getState(elementState)

                            return {
                                ...state,
                                allSelectedGameObjects: state.allSelectedGameObjects.push(selectedGameObject),
                                selectedGameObject: selectedGameObject,
                            }
                        },
                        setState
                    ], meta3dState, api)

                    return Promise.resolve(meta3dState)
                }, (meta3dState) => {
                    let {
                        allSelectedGameObjects
                    } = getActionState<state>(meta3dState, api, actionName)

                    if (isNullable(allSelectedGameObjects.last())) {
                        return Promise.resolve(meta3dState)
                    }

                    meta3dState = setElementStateField([
                        (elementState: any) => {
                            let state = getState(elementState)

                            return {
                                ...state,
                                allSelectedGameObjects: state.allSelectedGameObjects.pop(),
                                selectedGameObject: getExn(state.allSelectedGameObjects.last())
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
                selectedGameObject: null,
                allSelectedGameObjects: List(),
            }
        }
    }
}
