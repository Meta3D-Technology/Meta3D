import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-select-asset-protocol"
import { eventName, inputData } from "meta3d-action-select-asset-protocol/src/EventType"

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, selectedAssetFileId) => {
                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        allSelectedFileAssetIds: state.allSelectedFileAssetIds.push(selectedAssetFileId),
                        selectedAssetFileId: selectedAssetFileId,
                    })

                    return Promise.resolve(meta3dState)
                }, (meta3dState) => {
                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    if (api.nullable.isNullable(state.allSelectedFileAssetIds.last())) {
                        return Promise.resolve(meta3dState)
                    }

                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        allSelectedFileAssetIds: state.allSelectedFileAssetIds.pop(),
                        selectedAssetFileId: api.nullable.getExn(state.allSelectedFileAssetIds.last())
                    })

                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            return new Promise<meta3dState>((resolve, reject) => {
                let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    inputData: [uiData]
                }))
            })
        },
        createState: (meta3dState) => {
            return {
                selectedAssetFileId: null,
                allSelectedFileAssetIds: api.immutable.createList(meta3dState)
            }
        }
    }
}
