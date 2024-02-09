import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-set-script-asset-code-protocol"
import { eventName, inputData } from "meta3d-action-set-script-asset-code-protocol/src/EventType"
import { getSelectedAsset } from "meta3d-select-inspector-node-utils/src/Main"
import { find, update } from "meta3d-asset-utils/src/Main"
import { id } from "meta3d-action-add-asset-protocol"
import { getRestoreEditorValueEventName } from "meta3d-editor-event-utils/src/Main"

let _updateCode = (meta3dState: meta3dState, api: api, id: id, code: string) => {
    return update(meta3dState, asset => {
        return [asset[0], asset[1], asset[2], asset[3], code]
    }, api, id)
}

let _triggerRestoreEditorValueEvent = (meta3dState: meta3dState, api: api, editorWholeService: editorWholeService,) => {
    let { triggerCustomGlobalEvent2, createCustomEvent } = api.nullable.getExn(editorWholeService).event(meta3dState)

    return triggerCustomGlobalEvent2(meta3dState, "meta3d-event-protocol", createCustomEvent(getRestoreEditorValueEventName(), api.nullable.getEmpty()))
}

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, id, code) => {
                    let oldCode = api.nullable.getExn(
                        find(meta3dState, api, id)
                    )[4]

                    meta3dState = _updateCode(meta3dState, api, id, code)

                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))
                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        allScriptAssetCodeData: state.allScriptAssetCodeData.push([id, oldCode]),
                    })

                    return Promise.resolve(meta3dState)
                }, (meta3dState) => {
                    let {
                        allScriptAssetCodeData
                    } = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    if (api.nullable.isNullable(allScriptAssetCodeData.last())) {
                        return Promise.resolve(meta3dState)
                    }

                    let [id, code] = api.nullable.getExn(allScriptAssetCodeData.last())

                    meta3dState = _updateCode(meta3dState, api, id, code)
                    meta3dState = _triggerRestoreEditorValueEvent(meta3dState, api, api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")))


                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))
                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        allScriptAssetCodeData: state.allScriptAssetCodeData.pop(),
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
                allScriptAssetCodeData: api.immutable.createList()
            }
        }
    }
}
