import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { actionName, state, uiData } from "meta3d-action-remove-asset-protocol"
import { eventName, inputData } from "meta3d-action-remove-asset-protocol/src/EventType"
import { actionName as selectAssetActionName, state as selectAssetState } from "meta3d-action-select-asset-protocol"
import { service as eventSourcingService } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
import { service as assetService } from "meta3d-asset-protocol/src/service/ServiceType"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"
import { getActionState, setElementStateField } from "meta3d-ui-utils/src/ElementStateUtils"
import { getLoadGlbState, getSelectAssetState, getState, setLoadGlbState, setSelectAssetState, setState } from "./Utils"
import { List } from "immutable"

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol")

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, selectedGlbId) => {
                    let removedGlbData = getExn(api.getExtensionService<assetService>(meta3dState, "meta3d-asset-protocol").getAllGLBAssets(meta3dState).find((data) => data[0] == selectedGlbId))

                    meta3dState = api.getExtensionService<assetService>(meta3dState, "meta3d-asset-protocol").removeGLBAsset(meta3dState, selectedGlbId)

                    meta3dState = setElementStateField([
                        (elementState: any) => {
                            let state = getState(elementState)

                            return {
                                ...state,
                                allRemovedGlbData:
                                    state.allRemovedGlbData.push(removedGlbData)
                            }
                        },
                        setState
                    ], meta3dState, api)

                    meta3dState = setElementStateField([
                        (elementState: any) => {
                            let state = getLoadGlbState(elementState)

                            return {
                                ...state,
                                addedGLBIds: state.addedGLBIds.filter((addedGLBId) => addedGLBId != selectedGlbId
                                )
                            }
                        },
                        setLoadGlbState
                    ], meta3dState, api)

                    meta3dState = setElementStateField([
                        (elementState: any) => {
                            let state = getSelectAssetState(elementState)

                            return {
                                ...state,
                                selectedGlbId: null
                            }
                        },
                        setSelectAssetState
                    ], meta3dState, api)

                    return Promise.resolve(meta3dState)
                }, (meta3dState) => {
                    let {
                        allRemovedGlbData
                    } = getActionState<state>(meta3dState, api, actionName)

                    if (isNullable(allRemovedGlbData.last())) {
                        return Promise.resolve(meta3dState)
                    }

                    let [glbId, glbName, glb] = getExn(allRemovedGlbData.last())

                    meta3dState = api.getExtensionService<assetService>(meta3dState, "meta3d-asset-protocol").addGLBAsset(meta3dState, glb, glbId, glbName)


                    meta3dState = setElementStateField([
                        (elementState: any) => {
                            let state = getState(elementState)

                            return {
                                ...state,
                                allRemovedGlbData: state.allRemovedGlbData.pop()
                            }
                        },
                        setState
                    ], meta3dState, api)

                    meta3dState = setElementStateField([
                        (elementState: any) => {
                            let state = getLoadGlbState(elementState)

                            return {
                                ...state,
                                addedGLBIds: state.addedGLBIds.push(glbId)
                            }
                        },
                        setLoadGlbState
                    ], meta3dState, api)

                    meta3dState = setElementStateField([
                        (elementState: any) => {
                            let state = getSelectAssetState(elementState)

                            return {
                                ...state,
                                selectedGlbId: glbId
                            }
                        },
                        setSelectAssetState
                    ], meta3dState, api)

                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            return new Promise<meta3dState>((resolve, reject) => {
                let {
                    selectedGlbId
                } = getActionState<selectAssetState>(meta3dState, api, selectAssetActionName)

                if (isNullable(selectedGlbId)) {
                    resolve(meta3dState)

                    return
                }

                let eventSourcingService = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol")

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    inputData: [
                        getExn(selectedGlbId)
                    ]
                }))
            })
        },
        createState: () => {
            return {
                allRemovedGlbData: List(),
            }
        }
    }
}
