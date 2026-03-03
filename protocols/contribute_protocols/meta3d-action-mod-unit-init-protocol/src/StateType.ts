import { nullable } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"
import { models } from "./Type"

export const actionName = "UnitModInit"

export type uiData = null

export type state = {
    allModelData: models,

    selectedModelIndex: nullable<number>,
    isShowModelModal: boolean,
}


