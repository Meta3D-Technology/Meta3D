import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-mod-career-add-positivecareerfeature-protocol"
import { eventName, inputData } from "meta3d-action-mod-career-add-positivecareerfeature-protocol/src/EventType"
import { actionName as addCareerFeatureActionName, state as addCareerFeatureState } from "meta3d-action-mod-career-add-careerfeature-protocol"

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState,) => {
                    let { allSelectedCareerFeatureData } = api.nullable.getExn(api.action.getActionState<addCareerFeatureState>(meta3dState, addCareerFeatureActionName))

                    if (allSelectedCareerFeatureData.filter(d => d.positive).count() >= 3) {
                        api.message.warn("最多只能选择3个正面职业特征")

                        return Promise.resolve(meta3dState)
                    }

                    meta3dState = api.action.setActionState(meta3dState, addCareerFeatureActionName, {
                        ...api.nullable.getExn(api.action.getActionState<addCareerFeatureState>(meta3dState, addCareerFeatureActionName)),
                        isShowModal: true,
                        isSelectPositiveCareerFeature: true,
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
                    inputData: []
                }))
            })
        },
        createState: () => {
            return null
        }
    }
}
