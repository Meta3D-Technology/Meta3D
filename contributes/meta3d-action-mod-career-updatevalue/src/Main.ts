import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-mod-career-updatevalue-protocol"
import { eventName, inputData } from "meta3d-action-mod-career-updatevalue-protocol/src/EventType"
import { actionName as addCareerFeatureActionName, state as addCareerFeatureState } from "meta3d-action-mod-career-add-careerfeature-protocol"


export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, map) => {
                    let addCareerFeatureState = api.action.getActionState<addCareerFeatureState>(meta3dState, addCareerFeatureActionName)

                    meta3dState = api.action.setActionState<addCareerFeatureState>(meta3dState, addCareerFeatureActionName, {
                        ...addCareerFeatureState,
                        allSelectedCareerFeatureData:
                            addCareerFeatureState.allSelectedCareerFeatureData.map((data) => {
                                let { name, values } = data

                                if (map.has(name)) {
                                    let list = api.nullable.getExn(
                                        map.get(name)
                                    )

                                    return {
                                        ...data,
                                        values: values.map((value, i) => {
                                            if (list.has(i)) {
                                                return api.nullable.getExn(list.get(i))
                                            }

                                            return value
                                        })
                                    }
                                }

                                return data
                            })
                    })

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
        createState: () => {
            return null
        }
    }
}
