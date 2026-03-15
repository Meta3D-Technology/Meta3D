import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { language} from "meta3d-language-utils/src/Type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-mod-career-add-negativecareerfeature-protocol"
import { eventName, inputData } from "meta3d-action-mod-career-add-negativecareerfeature-protocol/src/EventType"
import { actionName as addCareerFeatureActionName, state as addCareerFeatureState } from "meta3d-action-mod-career-add-careerfeature-protocol"
import { actionName as languageActionName, state as languageState } from "meta3d-action-mod-language-protocol"

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState,) => {
                    let { allSelectedCareerFeatureData } = api.nullable.getExn(api.action.getActionState<addCareerFeatureState>(meta3dState, addCareerFeatureActionName))

                    if (allSelectedCareerFeatureData.filter(d => !d.positive).count() >= 3) {
                        api.message.warn(api.action.getActionState<languageState>(meta3dState, languageActionName).language == language.Chinese ? "最多只能选择3个负面职业特征" : "You can only select up to 3 negative career features")


                        return Promise.resolve(meta3dState)
                    }

                    meta3dState = api.action.setActionState(meta3dState, addCareerFeatureActionName, {
                        ...api.nullable.getExn(api.action.getActionState<addCareerFeatureState>(meta3dState, addCareerFeatureActionName)),
                        isShowModal: true,
                        isSelectPositiveCareerFeature: false,
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
