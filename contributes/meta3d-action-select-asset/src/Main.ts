import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-select-asset-protocol"
import { eventName, inputData } from "meta3d-action-select-asset-protocol/src/EventType"
import { eventName as selectInspectorNodeEventName, backwardEventName as selectInspectorNodeBackwardEventName } from "meta3d-action-select-inspector-node-protocol/src/EventType"

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, selectedAssetFileId) => {
                    let { triggerCustomGlobalEvent2, createCustomEvent } = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState)

                    return Promise.resolve(triggerCustomGlobalEvent2(meta3dState, "meta3d-event-protocol",
                        createCustomEvent(selectInspectorNodeEventName, api.nullable.return(["asset", selectedAssetFileId] as any))
                    ))
                }, (meta3dState) => {
                    let { triggerCustomGlobalEvent2, createCustomEvent } = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState)

                    return Promise.resolve(triggerCustomGlobalEvent2(meta3dState, "meta3d-event-protocol",
                        createCustomEvent(selectInspectorNodeBackwardEventName, api.nullable.getEmpty())
                    ))
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
            return null
        }
    }
}
