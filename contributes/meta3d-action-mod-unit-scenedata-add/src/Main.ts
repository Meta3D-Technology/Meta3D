import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-mod-unit-scenedata-add-protocol"
import { eventName, inputData } from "meta3d-action-mod-unit-scenedata-add-protocol/src/EventType"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { autoDifficulty } from "meta3d-action-mod-unit-publish-to-game-protocol/src/Type"
import { countFactor } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"
import { getLanguageTextVariableData } from "meta3d-language-utils/src/Main"
import { languageVariableKey } from "meta3d-language-utils/src/Type"


export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, [fieldName]) => {
                    let state = api.action.getActionState<initState>(meta3dState, initActionName)

                    if (state[fieldName].length >= 10) {
                        api.message.warn(getLanguageTextVariableData(api, meta3dState, languageVariableKey.LimitMaxCount)(10))

                        return Promise.resolve(meta3dState)
                    }

                    meta3dState = api.action.setActionState<initState>(meta3dState, initActionName, {
                        ...state,
                        [fieldName]: [
                            ...state[fieldName],
                            {
                                difficulty: autoDifficulty.Middle,
                                weight: 0.1,
                                countFactor: countFactor.Level5,
                            }
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
                    inputData: [actionParams]
                }))
            })
        },
        createState: () => {
            return null
        }
    }
}
