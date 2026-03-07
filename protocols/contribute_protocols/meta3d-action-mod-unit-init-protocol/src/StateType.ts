import { action, nullable } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"
import { actions, models } from "./Type"

export const actionName = "UnitModInit"

export type uiData = null

export type state = {
    allModelData: models,
    allActionData: actions,

    selectedModelIndex: nullable<number>,
    selectedSmallSkillObjectActionIndex: nullable<number>,
    selectedBigSkillObjectActionIndex: nullable<number>,

    isShowModelModal: boolean,
    isShowUnitValueModal: boolean,
    isShowActionModal: boolean,
    isShowSmallSkillObjectActionValueModal: boolean,
    isShowBigSkillObjectActionValueModal: boolean,

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
}


