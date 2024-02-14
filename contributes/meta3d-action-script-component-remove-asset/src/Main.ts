import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-script-component-remove-asset-protocol"
import { eventName, inputData } from "meta3d-action-script-component-remove-asset-protocol/src/EventType"
import { runGameViewRenderOnlyOnce } from "meta3d-gameview-render-utils/src/GameViewRenderUtils"
import { getSelectedGameObject } from "meta3d-select-inspector-node-utils/src/Main"
import { findAssetData, removeAssetData, addAssetData } from "meta3d-script-component-utils/src/Main"

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, name) => {
                    let selectedGameObject = api.nullable.getExn(getSelectedGameObject(meta3dState, api))

                    let assetData = findAssetData(meta3dState, api, selectedGameObject, name)

                    meta3dState = removeAssetData(meta3dState, api, selectedGameObject, name)


                    let state = api.nullable.getExn(
                        api.action.getActionState<state>(meta3dState, actionName)
                    )

                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        removedAssetData:
                            state.removedAssetData.push(assetData)
                    })

                    return Promise.resolve(runGameViewRenderOnlyOnce(meta3dState, api, api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))))
                }, (meta3dState) => {
                    let {
                        removedAssetData,
                    } = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    let assetData = api.nullable.getExn(removedAssetData.last())

                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        removedAssetData:
                            state.removedAssetData.pop()
                    })


                    let selectedGameObject = api.nullable.getExn(getSelectedGameObject(meta3dState, api))

                    meta3dState = addAssetData(meta3dState, api, selectedGameObject, assetData)

                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            return new Promise<meta3dState>((resolve, reject) => {
                let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

                let [_, name] = uiData

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    inputData: [name]
                }))
            })
        },
        createState: (meta3dState) => {
            return {
                removedAssetData: api.immutable.createList(),
            }
        }
    }
}
