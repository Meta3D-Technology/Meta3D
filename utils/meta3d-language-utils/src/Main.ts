import { state as meta3dState, api } from "meta3d-type"
import { action, category, emitterType, feature, instance, meleeDamageEffectType, model, particleImage, propName, rangedDamageEffectType, subEffect } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"
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
            [languageKey.Weight]: "权重",
            [languageKey.AddGenerateDataInAttackCityStage]: "攻击城市关卡增加生成数据",
            [languageKey.AddGenerateDataInProtectCityStage]: "防卫城市关卡增加生成数据",
            [languageKey.AddGenerateDataInBossStage]: "boss关卡增加生成数据",
            [languageKey.ForSmallUnit]: "针对小型单位",
            [languageKey.ForBigUnit]: "针对大型单位",
            [languageKey.DisplayNameCN]: "模组名称（中文）",
            [languageKey.DisplayNameEN]: "模组名称（英文）",
            [languageKey.UploadModIcon]: "上传模组图标",
            [languageKey.IsPublic]: "是否公开（如果不公开，则仅可在调试模式中订阅该模组）",
            [languageKey.Description]: "描述（包含中文、英文）（支持Markdown）",
            [languageKey.PublishToGame]: "发布到游戏",
            [languageKey.Cancel]: "取消",

            [languageKey.NeedDisplayNameCN]: "需要输入模组名称（中文）",
            [languageKey.NeedDisplayNameEN]: "需要输入模组名称（英文）",
            [languageKey.NeedDescription]: "需要输入描述",
            [languageKey.NeedModIcon]: "需要上传模组图标",
            [languageKey.NeedAllSkillObject]: "需要加入针对小型单位和大型单位的技能",
            [languageKey.NeedAtLeastOneGenerateData]: "需要为至少一个关卡加入生成数据",
            [languageKey.NeedSmallSkillObjectEmitterData]: "需要加入针对小型单位的技能->弹药数据",
            [languageKey.NeedBigSkillObjectEmitterData]: "需要加入针对大型单位的技能->弹药数据",


            [category.EliteGiantess]: "精英巨大娘",
            [model.EliteGiantessMelee1]: "精英巨大娘近战1",
            [action.StompLight]: "轻踩",
            [action.KickLight]: "轻踢",
            [action.Cast]: "施法",
            [propName.AddHp1]: "加血（小）",
            [propName.AddHp2]: "加血（中）",
            [feature.DamageBigger]: "受击变大",
            [meleeDamageEffectType.BodyDamage]: "身体伤害",
            [meleeDamageEffectType.BodyDirectAndRangeDamage]: "身体直接伤害和范围伤害",
            [rangedDamageEffectType.MagicDamage]: "魔法伤害",
            [subEffect.FootDamageDecal]: "地裂贴花",
            [subEffect.HitFireball]: "击中火球",
            [subEffect.ShellExplode]: "炮弹爆炸",
            [subEffect.StompDust]: "踩踏灰尘",
            [emitterType.Particle]: "粒子",
            [emitterType.Instance]: "实例",
            [particleImage.Fireball1]: "火球1",
            [instance.Missile1]: "导弹1",
        },
        [language.English]: {
            [languageKey.Level]: "Level",
            [languageKey.Count]: "Count",
            [languageKey.CountFactor]: "Count Factor",
            [languageKey.DropRate]: "Drop Rate",
            [languageKey.Difficulty]: "Difficulty",
            [languageKey.Weight]: "Weight",
            [languageKey.AddGenerateDataInAttackCityStage]: "Add generate data in attack city stage",
            [languageKey.AddGenerateDataInProtectCityStage]: "Add generate data in protect city stage",
            [languageKey.AddGenerateDataInBossStage]: "Add generate data in boss stage",
            [languageKey.ForSmallUnit]: "For small unit",
            [languageKey.ForBigUnit]: "For big unit",
            [languageKey.DisplayNameCN]: "Mod name（Chinese）",
            [languageKey.DisplayNameEN]: "Mod name（English）",
            [languageKey.UploadModIcon]: "Upload mod icon",
            [languageKey.IsPublic]: "Whether to make it public (if not, the module can only be subscribed in debug mode)",
            [languageKey.Description]: "Description (including Chinese and English) (Markdown supported)",
            [languageKey.PublishToGame]: "Publish to game",
            [languageKey.Cancel]: "Cancel",

            [languageKey.NeedDisplayNameCN]: "The mod name (in Chinese) needs to be entered",
            [languageKey.NeedDisplayNameEN]: "The mod name (in English) needs to be entered",
            [languageKey.NeedDescription]: "Description required",
            [languageKey.NeedModIcon]: "A mod icon needs to be uploaded",
            [languageKey.NeedAllSkillObject]: "Need to add skills for both small and large units",
            [languageKey.NeedAtLeastOneGenerateData]: "You need to add generated data for at least one level",
            [languageKey.NeedSmallSkillObjectEmitterData]: "Need to add skill->for small unit->ammunition data ",
            [languageKey.NeedBigSkillObjectEmitterData]: "Need to add skill->for big unit->ammunition data ",

            [category.EliteGiantess]: "Elite Giantess",
            [model.EliteGiantessMelee1]: "Elite Giantess Melee 1",
            [action.StompLight]: "Stomp Light",
            [action.KickLight]: "Kick Light",
            [action.Cast]: "Cast",
            [propName.AddHp1]: "Add hp（small）",
            [propName.AddHp2]: "Add hp（medium）",
            [feature.DamageBigger]: "Damage Bigger",
            [meleeDamageEffectType.BodyDamage]: "Body damage",
            [meleeDamageEffectType.BodyDirectAndRangeDamage]: "Body direct and range damage",
            [rangedDamageEffectType.MagicDamage]: "Magic damage",
            [subEffect.FootDamageDecal]: "Foot damage decal",
            [subEffect.HitFireball]: "Hit fireball",
            [subEffect.ShellExplode]: "Shell explode",
            [subEffect.StompDust]: "Stomp dust",
            [emitterType.Particle]: "Particle",
            [emitterType.Instance]: "Instance",
            [particleImage.Fireball1]: "Fireball1 1",
            [instance.Missile1]: "Missile 1",
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

export let isChinese = (api: api, meta3dState: meta3dState) => {
    return api.nullable.getWithDefault(
        api.nullable.map(
            (languageState) => languageState.language == language.Chinese,
            api.action.getActionState<languageState>(meta3dState, languageActionName),
        ),
        true
    )
}