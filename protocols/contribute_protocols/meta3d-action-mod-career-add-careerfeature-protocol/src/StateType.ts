import { language} from "meta3d-language-utils/src/Type"
import type { List } from "immutable"

export const actionName = "CareerModAddCareerFeature"

export type uiData = null


export enum characterType {
    Giantess,
    LittleMan,
    GiantessOrLittleMan,
    // GiantessOrGiantessBoss,
    // LittleManOrArmy,
    // GiantessOrLittleManOrArmyOrGiantessBoss,
    // Army,
    // GiantessBoss,
    // None,
}

type careerFeatureName = string

type careerFeatureValue = number | [number, number] | [number, number, number] | any

type value = number

// type getDescriptionFunc = (language: language, name: careerFeatureName, values: number | Array<number>) => string
type getDescriptionFunc = (language: language, name: careerFeatureName, values: number & Array<number>) => string

export type careerFeature = {
    name: careerFeatureName,
    characterType: characterType,
    valueCount: number,
    positive: boolean,
    minValue?: careerFeatureValue,
    maxValue?: careerFeatureValue,

    getDescriptionFunc: getDescriptionFunc,
}

export type state = {
    allDefaultCareerFeatures: List<careerFeature>,

    allSelectedCareerFeatureData: List<
        {
            name: careerFeatureName,
            characterType: characterType,
            positive: boolean,
            values: List<value>,
            minValue?: careerFeatureValue,
            maxValue?: careerFeatureValue,
        }>,

    isShowModal: boolean,
    isSelectPositiveCareerFeature: boolean,
}


