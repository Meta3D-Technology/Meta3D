import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, characterType, state, uiData } from "meta3d-action-mod-career-add-careerfeature-protocol"
import { eventName, inputData } from "meta3d-action-mod-career-add-careerfeature-protocol/src/EventType"
import { careerFeatureName, getData } from "./CareerFeatureData"
import { push, range } from "./ArrayUtils"

//TODO duplicate
let _findCareerFeature = (api: api, allDefaultCareerFeatures, name: careerFeatureName, characterType_: characterType) => {
    return api.nullable.getExn(allDefaultCareerFeatures.find(d => {
        return d.name == name &&
            (
                d.characterType == characterType.GiantessOrLittleMan ? true : (
                    d.characterType == characterType_
                )
            )
    }))
}

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let allDefaultCareerFeatures = getData()

            // console.log("init")

            meta3dState = api.action.setActionState(meta3dState, actionName, {
                ...api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName)),
                allDefaultCareerFeatures: allDefaultCareerFeatures,
            })




            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState,) => {
                    // TODO restore for show modal
                    // meta3dState = api.action.setActionState(meta3dState, actionName, {
                    //     ...state,
                    //     isShowModal: true,
                    // })


                    const name = careerFeatureName.IncreaseFullHp
                    const characterType_ = characterType.LittleMan

                    let defaultValues = range(0,
                        _findCareerFeature(api, allDefaultCareerFeatures, name, characterType_).valueCount - 1
                    ).map(_ => 0)


                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        allSelectedCareerFeatureData: push(
                            state.allSelectedCareerFeatureData,
                            {
                                name: name,
                                characterType: characterType_,
                                values: defaultValues,
                            }
                        ),
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
            return {
                allDefaultCareerFeatures: [],
                allSelectedCareerFeatureData: [],
                isShowModal: false,
            }
        }
    }
}
