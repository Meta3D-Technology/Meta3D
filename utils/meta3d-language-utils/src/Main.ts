import { state as meta3dState, api } from "meta3d-type"
import { action, category, feature, model, propName } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"
import { actionName as languageActionName, state as languageState } from "meta3d-action-mod-language-protocol"
import { language, languageKey, languageVariableKey } from "./Type"

export type data = Record<language, Record<any, string>>

export let getTextData = (): data => {
    return {
        [language.Chinese]: {
            [languageKey.Level]: "级别",
            [languageKey.Count]: "数量",
            [languageKey.CountFactor]: "数量系数",
            [languageKey.DropRate]: "爆率",
            [languageKey.Difficulty]: "难度",
            [languageKey.AddGenerateDataInAttackCityStage]: "攻击城市关卡增加生成数据",
            [languageKey.AddGenerateDataInProtectCityStage]: "防卫城市关卡增加生成数据",
            [languageKey.AddGenerateDataInBossStage]: "boss关卡增加生成数据",
            [languageKey.ForSmallUnit]: "针对小型单位",
            [languageKey.ForBigUnit]: "针对大型单位",

            [category.EliteGiantess]: "精英巨大娘",
            [model.EliteGiantessMelee1]: "精英巨大娘近战1",
            [action.StompLight]: "轻踩",
            [action.KickLight]: "轻踢",
            [action.Cast]: "施法",
            [propName.AddHp1]: "加血（小）",
            [propName.AddHp2]: "加血（中）",
            [feature.DamageBigger]: "受击变大",
        },
        [language.English]: {
            [languageKey.Level]: "Level",
            [languageKey.Count]: "Count",
            [languageKey.CountFactor]: "Count Factor",
            [languageKey.DropRate]: "Drop Rate",
            [languageKey.Difficulty]: "Difficulty",
            [languageKey.AddGenerateDataInAttackCityStage]: "Add generate data in attack city stage",
            [languageKey.AddGenerateDataInProtectCityStage]: "Add generate data in protect city stage",
            [languageKey.AddGenerateDataInBossStage]: "Add generate data in boss stage",
            [languageKey.ForSmallUnit]: "For small unit",
            [languageKey.ForBigUnit]: "For big unit",

            [category.EliteGiantess]: "Elite Giantess",
            [model.EliteGiantessMelee1]: "Elite Giantess Melee 1",
            [action.StompLight]: "Stomp Light",
            [action.KickLight]: "Kick Light",
            [action.Cast]: "Cast",
            [propName.AddHp1]: "Add hp（small）",
            [propName.AddHp2]: "Add hp（medium）",
            [feature.DamageBigger]: "Damage Bigger",
        },
    }
}

export let getTextDataByVariable = () => {
    return {
        [language.Chinese]: {
            [languageVariableKey.LimitMaxCount]: (value: number) => `最多选择${value}个`,
        },
        [language.English]: {
            [languageVariableKey.LimitMaxCount]: (value: number) => `Can select ${value} at most`,
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
