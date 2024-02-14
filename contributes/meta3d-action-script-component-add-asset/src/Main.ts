import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-script-component-add-asset-protocol"
import { backwardEventName as closeEventName } from "meta3d-action-operate-select-script-asset-modal-protocol/src/EventType"
import { eventName, inputData } from "meta3d-action-script-component-add-asset-protocol/src/EventType"
import { runGameViewRenderOnlyOnce } from "meta3d-gameview-render-utils/src/GameViewRenderUtils"
import { getSelectedGameObject } from "meta3d-select-inspector-node-utils/src/Main"
import { removeAssetData, addAssetData } from "meta3d-script-component-utils/src/Main"
import { actionName as addAssetActionName, state as addAssetState, assetType } from "meta3d-action-add-asset-protocol"

let _findAssetEventFileStr = (meta3dState: meta3dState, api: api, name: string) => {
    let { allAddedAssets } = api.nullable.getExn(
        api.action.getActionState<addAssetState>(meta3dState, addAssetActionName)
    )

    let asset = api.nullable.getExn(
        allAddedAssets.find(asset => {
            return asset[0] == assetType.Script && asset[2] == name
        })
    )

    return asset[4] as string
}

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, name) => {
                    let selectedGameObject = api.nullable.getExn(getSelectedGameObject(meta3dState, api))

                    let eventFileStr = _findAssetEventFileStr(meta3dState, api, name)

                    let assetData = { name, eventFileStr }

                    meta3dState = addAssetData(meta3dState, api, selectedGameObject, assetData)


                    let state = api.nullable.getExn(
                        api.action.getActionState<state>(meta3dState, actionName)
                    )

                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        addedAssetData:
                            state.addedAssetData.push(assetData)
                    })


                    let { createCustomEvent, triggerCustomGlobalEvent2 } = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState)

                    meta3dState = triggerCustomGlobalEvent2(meta3dState, "meta3d-event-protocol",
                        createCustomEvent(closeEventName, null)
                    )


                    return Promise.resolve(runGameViewRenderOnlyOnce(meta3dState, api, api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))))
                }, (meta3dState) => {
                    let {
                        addedAssetData,
                    } = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    let assetData = api.nullable.getExn(addedAssetData.last())

                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        addedAssetData:
                            state.addedAssetData.pop()
                    })


                    let selectedGameObject = api.nullable.getExn(getSelectedGameObject(meta3dState, api))

                    meta3dState = removeAssetData(meta3dState, api, selectedGameObject, assetData.name)

                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            return new Promise<meta3dState>((resolve, reject) => {
                let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

                let [_, selectedValue] = uiData

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    inputData: [selectedValue]
                }))
            })
        },
        createState: (meta3dState) => {
            return {
                addedAssetData: api.immutable.createList(),
            }
        }
    }
}
