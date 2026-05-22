import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { state, uiData } from "meta3d-action-mod-unit-set-animation-index-protocol"
import { eventName, inputData } from "meta3d-action-mod-unit-set-animation-index-protocol/src/EventType"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: "UnitModSetAnimationIndex",
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, index: number, [actionFieldName]) => {
                    let value = index + 1
                    let state = api.nullable.getExn(api.action.getActionState<initState>(meta3dState, initActionName))

                    meta3dState = api.action.setActionState<initState>(meta3dState, initActionName, {
                        ...state,
                        animationData: state.animationData.set(actionFieldName, value),
                        isShowAnimationModal: false,
                    })

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
