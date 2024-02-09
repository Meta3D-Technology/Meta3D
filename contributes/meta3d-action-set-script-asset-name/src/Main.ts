import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-set-script-asset-name-protocol"
import { eventName, inputData } from "meta3d-action-set-script-asset-name-protocol/src/EventType"
import { getSelectedAsset } from "meta3d-select-inspector-node-utils/src/Main"
import { find, update } from "meta3d-asset-utils/src/Main"
import { id } from "meta3d-action-add-asset-protocol"

let _updateName = (meta3dState: meta3dState, api: api, id: id, name: string) => {
    return update(meta3dState, asset => {
        return [asset[0], asset[1], name, asset[3], asset[4]]
    }, api, id)
}

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, id, name) => {
                    let oldName = api.nullable.getExn(
                        find(meta3dState, api, id)
                    )[2]

                    meta3dState = _updateName(meta3dState, api, id, name)

                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))
                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        allScriptAssetNameData: state.allScriptAssetNameData.push([id, oldName]),
                    })

                    return Promise.resolve(meta3dState)
                }, (meta3dState) => {
                    let {
                        allScriptAssetNameData
                    } = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    if (api.nullable.isNullable(allScriptAssetNameData.last())) {
                        return Promise.resolve(meta3dState)
                    }

                    let [id, name] = api.nullable.getExn(allScriptAssetNameData.last())

                    meta3dState = _updateName(meta3dState, api, id, name)


                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))
                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        allScriptAssetNameData: state.allScriptAssetNameData.pop(),
                    })

                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            return new Promise<meta3dState>((resolve, reject) => {
                let selectedScriptAssetId = getSelectedAsset(meta3dState, api)

                if (api.nullable.isNullable(selectedScriptAssetId)) {
                    resolve(meta3dState)

                    return
                }

                let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    inputData: [
                        api.nullable.getExn(selectedScriptAssetId),
                        uiData
                    ]
                }))
            })
        },
        createState: (meta3dState) => {
            return {
                allScriptAssetNameData: api.immutable.createList()
            }
        }
    }
}
