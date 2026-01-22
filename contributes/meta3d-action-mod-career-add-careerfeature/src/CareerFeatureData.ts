import { language, careerFeature, characterType } from "meta3d-action-mod-career-add-careerfeature-protocol"

export let convertDecimalToPercent = (value: number, digit = 3) => {
    if (digit < 2) {
        throw new Error("error")
    }

    return Math.round(value * Math.pow(10, digit)) / Math.pow(10, digit - 2)
}

export enum careerFeatureName {
    IncreaseFullHp = "IncreaseFullHp2",
    ReduceDamageButIncreaseWhenSingleDamage = "ReduceDamageButIncreaseWhenSingleDamage",
}

export let getTextDataByVariable = () => {
    return {
        [language.Chinese]: {
            [careerFeatureName.IncreaseFullHp]: (value) => `最大生命值增加${value}%`,
            [careerFeatureName.ReduceDamageButIncreaseWhenSingleDamage]: ([v1, v2, v3]) => `减少${v1}%伤害。对同一个目标的每次攻击都会增加${v2}%伤害，持续${v3}秒`,
        },
        [language.English]: {
            [careerFeatureName.IncreaseFullHp]: (value) => `Maximum health increased by ${value}%`,
            [careerFeatureName.ReduceDamageButIncreaseWhenSingleDamage]: ([v1, v2, v3]) => `Reduce ${v1}% damage. Each attack on the same target will increase ${v2}% damage, keep ${v3}s`,
        },
    }
}

export let getData = (): Array<careerFeature> => {
    return [
        {
            name: careerFeatureName.IncreaseFullHp,
            characterType: characterType.GiantessOrLittleMan,
            valueCount: 1,

            getDescriptionFunc: (language, name, value) => {
                // return api.getLanguageDataByData(state, getTextDataByVariable(), languageVariableKey.IncreaseFullHp)(NumberUtils.convertDecimalToPercent(value, 3))
                return getTextDataByVariable()[language][name](convertDecimalToPercent(value, 3))
            },
        },
        {
            name: careerFeatureName.ReduceDamageButIncreaseWhenSingleDamage,
            characterType: characterType.GiantessOrLittleMan,
            valueCount: 3,

            getDescriptionFunc: (language, name, [v1, v2, v3]) => {
                return getTextDataByVariable()[language][name]([Math.round(v1 * 100), Math.round(v2 * 100), v3])
            },
        }
    ]
}