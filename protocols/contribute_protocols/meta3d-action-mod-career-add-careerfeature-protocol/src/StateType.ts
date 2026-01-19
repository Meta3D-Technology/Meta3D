export const actionName = "CareerModAddCareerFeature"

export type uiData = null


export enum language {
    Chinese = "Chinese",
    English = "English"
}

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

type value = number

// type getDescriptionFunc = (language: language, values: number | Array<number>) => string
type getDescriptionFunc = (language: language, name: careerFeatureName, values: number & Array<number>) => string

export type careerFeature = {
    name: careerFeatureName,
    characterType: characterType,
    valueCount: number,

    getDescriptionFunc: getDescriptionFunc,
}

export type state = {
    allDefaultCareerFeatures: Array<careerFeature>,

    allSelectedCareerFeatureData: Array<
        {
            name: careerFeatureName,
            characterType: characterType,
            values: Array<value>,
        }>,

    isShowModal: boolean,
}


