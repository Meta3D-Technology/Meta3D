import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-mod-career-select-careerfeature-protocol"
import { eventName, inputData } from "meta3d-action-mod-career-select-careerfeature-protocol/src/EventType"
import { actionName as addCareerFeatureActionName, state as addCareerFeatureState, characterType } from "meta3d-action-mod-career-add-careerfeature-protocol"


//TODO duplicate
let _isCharacterTypeEqual = (characterType1: characterType, characterType2: characterType) => {
    if (characterType1 == characterType.GiantessOrLittleMan
        || characterType2 == characterType.GiantessOrLittleMan
    ) {
        return true
    }

    return characterType1 == characterType2
}

//TODO duplicate
let _findCareerFeature = (api: api, allDefaultCareerFeatures, name, characterType_: characterType) => {
    return api.nullable.getExn(allDefaultCareerFeatures.find(d => {
        return d.name == name && _isCharacterTypeEqual(d.characterType, characterType_)
    }))
}

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, careerFeatureName) => {
                    const characterType_ = characterType.LittleMan

                    let state = api.nullable.getExn(api.action.getActionState<addCareerFeatureState>(meta3dState, addCareerFeatureActionName))


                    let valueCount = _findCareerFeature(api, state.allDefaultCareerFeatures, careerFeatureName, characterType_).valueCount
                    let defaultValues = api.immutable.createList<number>()
                    for (let i = 0; i < valueCount; i++) {
                        defaultValues = defaultValues.push(0)
                    }

                    meta3dState = api.action.setActionState<addCareerFeatureState>(meta3dState, addCareerFeatureActionName, {
                        ...state,
                        allSelectedCareerFeatureData:
                            state.allSelectedCareerFeatureData.push(
                                {
                                    name: careerFeatureName,
                                    characterType: characterType_,
                                    values: defaultValues,
                                }
                            ),
                        isShowModal: false
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
                    inputData: [api.nullable.getExn(uiData)[1]]
                }))
            })
        },
        createState: () => {
            return null
        }
    }
}
