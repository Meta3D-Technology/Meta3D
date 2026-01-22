import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { data } from "meta3d-input-mod-select-careerfeatures-names-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName as addCareerFeatureActionName, state as addCareerFeatureState, characterType, language } from "meta3d-action-mod-career-add-careerfeature-protocol"
import { actionName as selectCharacterTypeActionName, state as selectCharacterTypeState } from "meta3d-action-mod-career-selectcharactertype-protocol"

//TODO duplicate
let _isCharacterTypeEqual = (characterType1: characterType, characterType2: characterType) => {
    if (characterType1 == characterType.GiantessOrLittleMan
        || characterType2 == characterType.GiantessOrLittleMan
    ) {
        return true
    }

    return characterType1 == characterType2
}

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModSelectCareerFeaturesNamesInput",
        func: (meta3dState) => {
            let characterType_ = api.action.getActionState<selectCharacterTypeState>(meta3dState, selectCharacterTypeActionName).characterType
            // const language_ = language.Chinese

            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.map(({ allDefaultCareerFeatures, allSelectedCareerFeatureData }) => {
                        return allDefaultCareerFeatures.filter((d => _isCharacterTypeEqual(d.characterType, characterType_))).filter((d => api.nullable.isNullable(allSelectedCareerFeatureData.find(s => s.name == d.name)))).map(d => {
                            // return `${d.name}:${d.getDescriptionFunc(language_, d.name, range(0, d.valueCount - 1).map(_ => 0))}`
                            return d.name
                        }).toArray()
                    },
                        api.action.getActionState<addCareerFeatureState>(meta3dState, addCareerFeatureActionName)
                    ),
                    []
                )
            )
        }
    }
}
