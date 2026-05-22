import { armorType, behaviourData, countFactor, emitterSubEffect, emitterType, feature, meleeSubEffect, nullable, propName, rangedSubEffect, weaponType } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"
import { actions, allAnimationData, animations, damageEffects, emitterInstances, emitterParticleImages, emitterSubEffects, emitterTypes, features, meleeSubEffects, models, props, rangedSubEffects } from "./Type"
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

export type singleDamageEffectData = {
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
    allDamageEffects: damageEffects,
    allMeleeSubEffects: meleeSubEffects,
    allRangedSubEffects: rangedSubEffects,
    allEmitterSubEffects: emitterSubEffects,
    allEmitterTypes: emitterTypes,
    allEmitterParticleImages: emitterParticleImages,
    allEmitterInstances: emitterInstances,
    allFeatureData: features,
    allPropData: props,
    allAnimationData: allAnimationData,

    selectedModelIndex: nullable<number>,
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
    isShowEliteGiantessUnitValueModal: boolean,
    isShowOtherUnitValueModal: boolean,
    isShowSmallSkillModal: boolean,
    isShowBigSkillModal: boolean,
    isShowFeatureModal: boolean,
    isShowRewardModal: boolean,
    isShowBehaviourFindAttackTargetModeModal: boolean,
    isShowSmallSkillObjectActionValueModal: boolean,
    isShowSmallSkillObjectDamageValueModal: boolean,
    isShowSmallSkillObjectDamageEffectModal: boolean,
    isShowSmallSkillObjectSubEffectModal: boolean,
    isShowSmallSkillObjectEmitterParticleImageModal: boolean,
    isShowSmallSkillObjectEmitterInstanceModal: boolean,
    isShowSmallSkillObjectEmitterValueModal: boolean,
    isShowSmallSkillObjectEmitterSubEffectModal: boolean,
    isShowBigSkillObjectActionValueModal: boolean,
    isShowBigSkillObjectDamageValueModal: boolean,
    isShowBigSkillObjectDamageEffectModal: boolean,
    isShowBigSkillObjectSubEffectModal: boolean,
    isShowBigSkillObjectEmitterParticleImageModal: boolean,
    isShowBigSkillObjectEmitterInstanceModal: boolean,
    isShowBigSkillObjectEmitterValueModal: boolean,
    isShowBigSkillObjectEmitterSubEffectModal: boolean,
    isShowPropModal: boolean,

    excitement: number,
    defenseFactor: number
    armorType: armorType,
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
    s_volume: number,

    s_damageType: weaponType,
    s_damageEffects: Array<singleDamageEffectData>,

    s_force: number,
    s_armorPiercingForceRatio: number,
    s_critRatio: number,

    s_hit_subEffects: Array<meleeSubEffect | rangedSubEffect>,

    s_emitterType: emitterType,

    s_emitterSpeed: number,
    s_emitterLife: number,
    s_emitterSize: number,
    s_emitterCollisionSize: number,
    // s_mitterCount: number,
    s_explodeRange: number,

    s_emitter_subEffects: Array<emitterSubEffect>,



    b_emitSpeed: number,
    b_volume: number,

    b_damageType: weaponType,
    b_damageEffects: Array<singleDamageEffectData>,

    b_force: number,
    b_armorPiercingForceRatio: number,
    b_critRatio: number,

    b_hit_subEffects: Array<meleeSubEffect | rangedSubEffect>,

    b_emitterType: emitterType,

    b_emitterSpeed: number,
    b_emitterLife: number,
    b_emitterSize: number,
    b_emitterCollisionSize: number,
    // b_emitterCount: number,
    b_explodeRange: number,

    b_emitter_subEffects: Array<emitterSubEffect>,



    animationData: animations,


    behaviourData: behaviourData,


    features: Array<singleFeatureData>,


    hasAttackCitySceneChapterGenerateData: boolean,
    hasProtectCitySceneChapterGenerateData: boolean,
    hasBossSceneChapterGenerateData: boolean,

    ac_l_sceneData: Array<singleSceneData>,
    ac_g_sceneData: Array<singleSceneData>,

    pc_l_sceneData: Array<singleSceneData>,
    pc_g_sceneData: Array<singleSceneData>,

    bo_l_sceneData: Array<singleSceneData>,
    bo_g_sceneData: Array<singleSceneData>,


    prop: Array<propData>,
    gem: number,
    coin: number,
    experienceValue: number,



    isShowPublishModal: boolean,

    displayNameCN: string,
    displayNameEN: string,
    modIconBase64: nullable<string>,
    modIconTexture: nullable<any>,
    isPublic: boolean,
    description: string,

}


