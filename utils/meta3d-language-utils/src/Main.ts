import { state as meta3dState, api } from "meta3d-type"
import { language } from "meta3d-action-mod-career-add-careerfeature-protocol"
import { category, model } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"
import { actionName as languageActionName, state as languageState } from "meta3d-action-mod-language-protocol"

export type data = Record<language, Record<any, string>>

export let getTextData = (): data => {
    return {
        [language.Chinese]: {
            [category.EliteGiantess]: "精英巨大娘",
            [model.EliteGiantessMelee1]: "精英巨大娘近战1",
        },
        [language.English]: {
            [category.EliteGiantess]: "Elite Giantess",
            [model.EliteGiantessMelee1]: "Elite Giantess Melee 1",
        },
    }
}


let _getLanguageDataByData = (data: any, key: any, language: any) => {
    return data[language][key]
}

export let getLanguageTextData = (api: api, meta3dState: meta3dState, key: any) => {
    let language_ = api.nullable.getWithDefault(
        api.nullable.map(
            (languageState) => languageState.language,
            api.action.getActionState<languageState>(meta3dState, languageActionName),
        ),
        language.Chinese
    )

    return _getLanguageDataByData(getTextData(), key, language_)
}
