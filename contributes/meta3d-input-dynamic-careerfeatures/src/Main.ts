import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { data, careerFeatureName } from "meta3d-input-dynamic-careerfeatures-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName as addCareerFeatureActionName, state as addCareerFeatureState, characterType, language } from "meta3d-action-mod-career-add-careerfeature-protocol"

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

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "DynamicCareerFeaturesInput",
        func: (meta3dState) => {
            // console.log("aaa")
            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.map(({ allSelectedCareerFeatureData, allDefaultCareerFeatures }) => {
                        const language_ = language.Chinese

                        return allSelectedCareerFeatureData.map(({ name, characterType, values }) => {
                            let { getDescriptionFunc } = _findCareerFeature(api, allDefaultCareerFeatures, name, characterType)

                            return [
                                name,
                                getDescriptionFunc(language_, name, values.length == 1 ? values[0] : values),
                                values
                            ]
                        })
                    },
                        api.action.getActionState<addCareerFeatureState>(meta3dState, addCareerFeatureActionName)
                    ),
                    []
                )
            )
        }
    }
}
