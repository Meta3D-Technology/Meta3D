export enum language {
    Chinese = "Chinese",
    English = "English"
}


export enum languageKey {
    Level,
    Count,
    CountFactor,
    DropRate,
    Difficulty,
    Weight,
    GenerateRate,
    AddGenerateDataInAttackCityLevel,
    AddGenerateDataInProtectCityLevel,
    AddGenerateDataInBossLevel,
    ForSmallUnit,
    ForBigUnit,
    Loading,
    Publishing,
    Success,
    Fail,

    DisplayNameCN,
    DisplayNameEN,
    IsPublic,
    UploadModIcon,
    Description,
    PublishToGame,
    Cancel,

    NeedDisplayNameCN,
    NeedDisplayNameEN,
    NeedDescription,
    NeedModIcon,
    NeedAllSkillObject,
    NeedAtLeastOneGenerateData,
    NeedSmallSkillObjectEmitterData,
    NeedBigSkillObjectEmitterData,


}

export enum languageVariableKey {
    LimitMaxCount,
}

export type languageTextData = Record<language, Record<any, string>>

export type languageTextDataByVariable = Record<language, Record<any, (...args: any[]) => string>>

