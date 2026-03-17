import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-mod-unit-set-damagetype-protocol"
import { eventName, inputData } from "meta3d-action-mod-unit-set-damagetype-protocol/src/EventType"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { getDamageEffectTypesBySkillType } from "meta3d-action-mod-unit-skill-utils/src/Main"

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, index: number, [actionFieldName, damageTypeFieldName]) => {
                    let state = api.nullable.getExn(api.action.getActionState<initState>(meta3dState, initActionName))
                    let data = getDamageEffectTypesBySkillType(api, meta3dState, actionFieldName)

                    meta3dState = api.action.setActionState<initState>(meta3dState, initActionName, {
                        ...state,
                        [damageTypeFieldName]: data[index]
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
        createState: (meta3dState) => {
            return null
        }
    }
}
