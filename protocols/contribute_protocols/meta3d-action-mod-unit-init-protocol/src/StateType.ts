import { countFactor, damageEffectType, emitterType, feature, nullable, propName, subEffect } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"
import { actions, emitterInstances, emitterParticleImages, emitterTypes, features, models, props, subEffects } from "./Type"
import { autoDifficulty } from "meta3d-action-mod-unit-publish-to-game-protocol/src/Type"
import { languageTextData, languageTextDataByVariable } from "meta3d-language-utils/src/Type"


export const actionName = "UnitModInit"

export type uiData = null

export type singleSceneData = {
    difficulty: autoDifficulty,
    weight: number,
    countFactor: countFactor,
}

// type protectCitySceneData = {
//     rate: number,
//     countFactor: countFactor,
// }

// type bossSceneData = protectCitySceneData

export type singleFeatureData = {
    name: feature,
    // title: string,
    // description: string,
    level: number,
}

export type propData = {
    name: propName,
    count: number,
    rate: number
}


export type state = {
    languageTextData: languageTextData,
    languageTextDataByVariable: languageTextDataByVariable,

    allModelData: models,
    allActionData: actions,
    allSubEffects: subEffects,
    allEmitterTypes: emitterTypes,
    allEmitterParticleImages: emitterParticleImages,
    allEmitterInstances: emitterInstances,
    allFeatureData: features,
    allPropData: props,

    selectedModelIndex: number,
    selectedSmallSkillObjectActionIndex: number,
    selectedSmallSkillObjectEmitterParticleImageIndex: nullable<number>,
    selectedSmallSkillObjectEmitterInstanceIndex: nullable<number>,
    selectedBigSkillObjectActionIndex: number,
    selectedBigSkillObjectEmitterParticleImageIndex: nullable<number>,
    selectedBigSkillObjectEmitterInstanceIndex: nullable<number>,

    // isShowModelWindow: boolean,
    // isShowSkillWindow: boolean,
    currentTabKey: string,

    isShowModelModal: boolean,
    isShowUnitValueModal: boolean,
    isShowSmallSkillModal: boolean,
    isShowBigSkillModal: boolean,
    isShowFeatureModal: boolean,
    isShowRewardModal: boolean,
    isShowSmallSkillObjectActionValueModal: boolean,
    isShowSmallSkillObjectDamageValueModal: boolean,
    isShowSmallSkillObjectDamageSubEffectModal: boolean,
    isShowSmallSkillObjectEmitterParticleImageModal: boolean,
    isShowSmallSkillObjectEmitterInstanceModal: boolean,
    isShowSmallSkillObjectEmitterValueModal: boolean,
    isShowSmallSkillObjectEmitterSubEffectModal: boolean,
    isShowBigSkillObjectActionValueModal: boolean,
    isShowBigSkillObjectDamageValueModal: boolean,
    isShowBigSkillObjectDamageSubEffectModal: boolean,
    isShowBigSkillObjectEmitterParticleImageModal: boolean,
    isShowBigSkillObjectEmitterInstanceModal: boolean,
    isShowBigSkillObjectEmitterValueModal: boolean,
    isShowBigSkillObjectEmitterSubEffectModal: boolean,
    isShowPropModal: boolean,

    excitement: number,
    defenseFactor: number
    // armorType: armorType.Giantess,
    armorRatio: number,
    armorStrength: number,
    attackFactor: number,
    emitSpeedFactor: number,
    critRatioFactor: number,
    hp: number,
    moveSpeed: number,
    emitPrecision: number,
    scale: number,

    // skillType: nullable<string>,

    hasSmallSkillObject: boolean,
    hasBigSkillObject: boolean,

    s_emitSpeed: number,
    s_volume:number,

    s_damageType: damageEffectType,

    s_force: number,
    s_armorPiercingForceRatio: number,
    s_critRatio: number,

    s_hit_subEffects: Array<subEffect>,

    s_emitterType: emitterType,

    s_emitterSpeed: number,
    s_emitterLife: number,
    s_emitterSize: number,
    s_emitterCollisionSize: number,
    // s_emitterCount: number,
    s_explodeRange: number,

    s_emitter_subEffects: Array<subEffect>,



    b_emitSpeed: number,
    b_volume:number,

    b_damageType: damageEffectType,

    b_force: number,
    b_armorPiercingForceRatio: number,
    b_critRatio: number,

    b_hit_subEffects: Array<subEffect>,

    b_emitterType: emitterType,

    b_emitterSpeed: number,
    b_emitterLife: number,
    b_emitterSize: number,
    b_emitterCollisionSize: number,
    // b_emitterCount: number,
    b_explodeRange: number,

    b_emitter_subEffects: Array<subEffect>,





    features: Array<singleFeatureData>,


    hasAttackCitySceneChapterGenerateData: boolean,
    hasProtectCitySceneChapterGenerateData: boolean,
    hasBossSceneChapterGenerateData: boolean,

    ac_l_sceneData: Array<singleSceneData>,
    ac_g_sceneData: Array<singleSceneData>,

    // // pc_sceneData: protectCitySceneData,
    // pc_sceneData_rate: number,
    // pc_sceneData_countFactor: number,

    // // bo_sceneData: bossSceneData,
    // bo_sceneData_rate: number,
    // bo_sceneData_countFactor: number,


    prop: Array<propData>,



    isShowPublishModal: boolean,

    displayNameCN: string,
    displayNameEN: string,
    modIconBase64: nullable<string>,
    modIconTexture: nullable<any>,
    isPublic: boolean,
    description: string,

}


