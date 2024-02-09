import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-remove-asset-protocol"
import { eventName, inputData } from "meta3d-action-remove-asset-protocol/src/EventType"
import { actionName as addAssetActionName, state as addAssetState } from "meta3d-action-add-asset-protocol"
import { getSelectedAsset, notSelecteNode, selecteNode } from "meta3d-select-inspector-node-utils/src/Main"

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, selectedAssetFileId) => {
                    let addAssetState = api.nullable.getExn(api.action.getActionState<addAssetState>(meta3dState, addAssetActionName))
                    let removedAssetData = api.nullable.getExn(addAssetState.allAddedAssets.find((data) => data[1] == selectedAssetFileId))

                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))
                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        allRemoveAssetData: state.allRemoveAssetData.push(removedAssetData)
                    })

                    meta3dState = api.action.setActionState(meta3dState, addAssetActionName, {
                        ...addAssetState,
                        allAddedAssets: addAssetState.allAddedAssets.filter(data => data[1] != selectedAssetFileId
                        )
                    })


                    // let { triggerCustomGlobalEvent2, createCustomEvent } = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState)

                    // meta3dState = triggerCustomGlobalEvent2(meta3dState, "meta3d-event-protocol",
                    //     createCustomEvent(selectInspectorNodeBackwardEventName, api.nullable.getEmpty())
                    // )
                    meta3dState = notSelecteNode(meta3dState, api)


                    return Promise.resolve(meta3dState)
                }, (meta3dState) => {
                    let {
                        allRemoveAssetData
                    } = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    if (api.nullable.isNullable(allRemoveAssetData.last())) {
                        return Promise.resolve(meta3dState)
                    }

                    let asset = api.nullable.getExn(allRemoveAssetData.last())

                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))
                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        allRemoveAssetData: state.allRemoveAssetData.pop()
                    })

                    let addAssetState = api.nullable.getExn(api.action.getActionState<addAssetState>(meta3dState, addAssetActionName))
                    meta3dState = api.action.setActionState(meta3dState, addAssetActionName, {
                        ...addAssetState,
                        allAddedAssets: addAssetState.allAddedAssets.push(asset)
                    })


                    // let { triggerCustomGlobalEvent2, createCustomEvent } = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState)

                    // meta3dState = triggerCustomGlobalEvent2(meta3dState, "meta3d-event-protocol",
                    //     createCustomEvent(selectInspectorNodeEventName, api.nullable.return(["asset", fileId] as any))
                    // )
                    meta3dState = selecteNode(meta3dState, api, ["asset", asset[1]])


                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            return new Promise<meta3dState>((resolve, reject) => {
                let selectedAssetFileId = getSelectedAsset(meta3dState, api)

                if (api.nullable.isNullable(selectedAssetFileId)) {
                    resolve(meta3dState)

                    return
                }

                let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    inputData: [
                        api.nullable.getExn(selectedAssetFileId)
                    ]
                }))
            })
        },
        createState: (meta3dState) => {
            return {
                allRemoveAssetData: api.immutable.createList(),
            }
        }
    }
}
