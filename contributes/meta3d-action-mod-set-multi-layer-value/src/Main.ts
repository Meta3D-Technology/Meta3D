import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-mod-set-multi-layer-value-protocol"
import { eventName, inputData } from "meta3d-action-mod-set-multi-layer-value-protocol/src/EventType"

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, value, [initActionName, layer1FieldName, layer2FieldName, layer3FieldName]) => {
                    let initState = api.nullable.getExn(api.action.getActionState<any>(meta3dState, initActionName))

                    if (!api.nullable.isNullable(layer3FieldName)) {
                        initState[layer1FieldName][layer2FieldName][layer3FieldName] = value
                    }
                    else if (!api.nullable.isNullable(layer2FieldName)) {
                        initState[layer1FieldName][layer2FieldName] = value
                    }
                    else {
                        initState[layer1FieldName] = value
                    }

                    meta3dState = api.action.setActionState<any>(meta3dState, initActionName, initState)

                    return Promise.resolve(meta3dState)
                }, (meta3dState) => {
                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData, actionParams) => {
            return new Promise<meta3dState>((resolve, reject) => {
                let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    isOnlyRead: true,
                    inputData: [uiData, actionParams]
                }))
            })
        },
        createState: () => {
            return null
        }
    }
}
