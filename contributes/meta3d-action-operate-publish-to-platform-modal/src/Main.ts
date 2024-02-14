import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-operate-publish-to-platform-modal-protocol"
import { eventName as openEventName, backwardEventName as closeEventName } from "meta3d-action-operate-publish-to-platform-modal-protocol/src/EventType"

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let { onCustomGlobalEvent2 } = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState)

            meta3dState = onCustomGlobalEvent2(meta3dState, "meta3d-event-protocol", [
                closeEventName,
                0,
                (meta3dState) => {
                    return api.action.setActionState(meta3dState, actionName, {
                        ...api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName)),
                        isOpen: false
                    })
                }
            ])
            meta3dState = onCustomGlobalEvent2(meta3dState, "meta3d-event-protocol", [
                openEventName,
                0,
                (meta3dState) => {
                    return api.action.setActionState(meta3dState, actionName, {
                        ...api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName)),
                        isOpen: true
                    })
                }
            ])

            return Promise.resolve(meta3dState)
        },
        handler: (meta3dState, uiData) => {
            throw new Error("error")
        },
        createState: (meta3dState) => {
            return {
                isOpen: false
            }
        }
    }
}
