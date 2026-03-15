import { state as meta3dState, api } from "meta3d-type"
import { category, feature, model } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"
import { actionName as languageActionName, state as languageState } from "meta3d-action-mod-language-protocol"
import { language, languageKey, languageVariableKey } from "./Type"

export type data = Record<language, Record<any, string>>

export let getTextData = (): data => {
    return {
        [language.Chinese]: {
            [languageKey.Level]: "级别",

            [category.EliteGiantess]: "精英巨大娘",
            [model.EliteGiantessMelee1]: "精英巨大娘近战1",
            [feature.DamageBigger]: "受击变大",
        },
        [language.English]: {
            [languageKey.Level]: "Level",

            [category.EliteGiantess]: "Elite Giantess",
            [model.EliteGiantessMelee1]: "Elite Giantess Melee 1",
            [feature.DamageBigger]: "Damage Bigger",
        },
    }
}

export let getTextDataByVariable = () => {
    return {
        [language.Chinese]: {
            [languageVariableKey.LimitMaxCount]: (value) => `最多选择${value}个`,
        },
        [language.English]: {
            [languageVariableKey.LimitMaxCount]: (value) => `Can select ${value} at most`,
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

export let getLanguageTextVariableData = (api: api, meta3dState: meta3dState, key: any) => {
    let language_ = api.nullable.getWithDefault(
        api.nullable.map(
            (languageState) => languageState.language,
            api.action.getActionState<languageState>(meta3dState, languageActionName),
        ),
        language.Chinese
    )

    return _getLanguageDataByData(getTextDataByVariable(), key, language_)
}
