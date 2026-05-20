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
    NeedLOD1LOD2SnapshotModelFile,

    ForAllUnit = "ForAllUnit",
    NeedAllSkillObjectEmitterData = "NeedAllSkillObjectEmitterData",

}

export enum languageVariableKey {
    LimitMaxCount,
    LimitFileSize,
}

export type languageTextData = Record<language, Record<any, string>>

export type languageTextDataByVariable = Record<language, Record<any, (...args: any[]) => string>>

