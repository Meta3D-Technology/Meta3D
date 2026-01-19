import { language, careerFeature, characterType } from "meta3d-action-mod-career-add-careerfeature-protocol"

export let convertDecimalToPercent = (value: number, digit = 3) => {
    if (digit < 2) {
        throw new Error("error")
    }

    return Math.round(value * Math.pow(10, digit)) / Math.pow(10, digit - 2)
}

export enum careerFeatureName {
    IncreaseFullHp = "IncreaseFullHp2",
}

export let getTextDataByVariable = () => {
    return {
        [language.Chinese]: {
            [careerFeatureName.IncreaseFullHp]: (value) => `最大生命值增加${value}%`,
        },
        [language.English]: {
            [careerFeatureName.IncreaseFullHp]: (value) => `Maximum health increased by ${value}%`,
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
        }
    ]

}