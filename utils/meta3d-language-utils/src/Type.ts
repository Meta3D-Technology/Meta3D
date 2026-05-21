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
    Melee = "Melee",
    Ranged = "Ranged",
    Assistant = "Assistant",
    NeedBigSkillObject = "NeedBigSkillObject",
    // Giantess,
    Mech = "Mech",
    // LittleMan = "LittleMan",
    // Building = "Building",
    Light = "Light",
    Heavy = "Heavy",

}

export enum languageVariableKey {
    LimitMaxCount,
    LimitFileSize,
}

export type languageTextData = Record<language, Record<any, string>>

export type languageTextDataByVariable = Record<language, Record<any, (...args: any[]) => string>>

