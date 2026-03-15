import { action, countFactor, feature, nullable, propName } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"
import { actions, features, models, props } from "./Type"
import { autoDifficulty } from "meta3d-action-mod-unit-publish-to-game-protocol/src/Type"

export const actionName = "UnitModInit"

export type uiData = null

export type attackCitySingleSceneData = {
    difficulty: autoDifficulty,
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
    allModelData: models,
    allActionData: actions,
    allFeatureData: features,
    allPropData: props,

    selectedModelIndex: nullable<number>,
    selectedSmallSkillObjectActionIndex: nullable<number>,
    selectedBigSkillObjectActionIndex: nullable<number>,
    // selectedPropIndex: nullable<number>,

    // isShowModelWindow: boolean,
    // isShowSkillWindow: boolean,
    currentTabKey: string,

    isShowModelModal: boolean,
    isShowUnitValueModal: boolean,
    isShowSkillModal: boolean,
    isShowFeatureModal: boolean,
    isShowRewardModal: boolean,
    isShowSmallSkillObjectActionValueModal: boolean,
    isShowBigSkillObjectActionValueModal: boolean,
    isShowPropModal: boolean,

    excitement: number,

    skillType: nullable<string>,

    hasSmallSkillObject: boolean,
    hasBigSkillObject: boolean,

    s_action: action,
    s_emitSpeed: number,
    s_emitterSpeed: number,

    b_action: action,
    b_emitSpeed: number,
    b_emitterSpeed: number,


    features: Array<singleFeatureData>,


    hasAttackCitySceneChapterGenerateData: boolean,
    hasProtectCitySceneChapterGenerateData: boolean,
    hasBossSceneChapterGenerateData: boolean,

    ac_l_sceneData: Array<attackCitySingleSceneData>,
    ac_g_sceneData: Array<attackCitySingleSceneData>,

    // pc_sceneData: protectCitySceneData,
    pc_sceneData_rate: number,
    pc_sceneData_countFactor: number,

    // bo_sceneData: bossSceneData,
    bo_sceneData_rate: number,
    bo_sceneData_countFactor: number,


    prop: Array<propData>,
}


