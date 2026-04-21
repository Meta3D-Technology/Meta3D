import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-mod-unit-set-behaviourdata-values-protocol"
import { eventName, inputData } from "meta3d-action-mod-unit-set-behaviourdata-values-protocol/src/EventType"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { getModes, getBehaviourModeData, singleBehaviourModeData } from "meta3d-action-mod-unit-utils/src/Main"
import { behaviourData } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, uiData) => {
                    let state = api.nullable.getExn(api.action.getActionState<initState>(meta3dState, initActionName))

                    let modeKey_: any = null
                    let values = uiData.reduce((values: any, [
                        modeKey,
                        key,
                        value,
                    ]: any) => {
                        modeKey_ = modeKey

                        // return api.action.setActionState<initState>(meta3dState, initActionName, {
                        //     ...state,
                        //     behaviourData: {
                        //         ...state.behaviourData,
                        //         [modeKey]: {
                        //             ...state.behaviourData[modeKey as keyof behaviourData],
                        //             values: {
                        //                 ...state.behaviourData[modeKey as keyof behaviourData].values,
                        //                 [key]: value,
                        //             }
                        //         }
                        //     }
                        // })
                        return {
                            ...values,
                            [key]: value,
                        }
                    }, {})
                    if (!api.nullable.isNullable(modeKey_)) {
                        meta3dState = api.action.setActionState<initState>(meta3dState, initActionName, {
                            ...state,
                            behaviourData: {
                                ...state.behaviourData,
                                [modeKey_]: {
                                    ...state.behaviourData[modeKey_ as keyof behaviourData],
                                    values
                                }
                            }
                        })
                    }

                    return Promise.resolve(meta3dState)
                }, (meta3dState) => {
                    return Promise.resolve(meta3dState)
                }))
            })

        },
        handler: (meta3dState, uiData) => {
            return new Promise<meta3dState>((resolve, reject) => {
                let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    isOnlyRead: true,
                    inputData: [uiData]
                }))
            })
        },
        createState: (meta3dState) => {
            return null
        }
    }
}
