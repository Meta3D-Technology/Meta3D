import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-mod-unit-add-subeffect-protocol"
import { eventName, inputData } from "meta3d-action-mod-unit-add-subeffect-protocol/src/EventType"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { getLanguageTextVariableData } from "meta3d-language-utils/src/Main"
import { languageVariableKey } from "meta3d-language-utils/src/Type"


export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, uiData, [subEffectsFieldName, isShowSubEffectModalFieldName]) => {
                    let [selectedIndex, _] = api.nullable.getExn(uiData)


                    let state = api.action.getActionState<initState>(meta3dState, initActionName)

                    if (state.features.length >= 5) {
                        api.message.warn(getLanguageTextVariableData(api, meta3dState, state.languageTextDataByVariable, languageVariableKey.LimitMaxCount)(5))

                        return Promise.resolve(meta3dState)
                    }

                    let subEffectData = api.nullable.getExn(state.allSubEffects.filter(d => {
                        return !state[subEffectsFieldName].includes(d)
                    }).get(selectedIndex))

                    meta3dState = api.action.setActionState<initState>(meta3dState, initActionName, {
                        ...state,
                        [isShowSubEffectModalFieldName]: false,
                        [subEffectsFieldName]: [
                            ...state[subEffectsFieldName],
                            subEffectData
                        ]
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
