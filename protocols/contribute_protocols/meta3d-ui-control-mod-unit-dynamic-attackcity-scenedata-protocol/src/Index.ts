import { func } from "meta3d-input-mod-unit-dynamic-attackcity-scenedata-protocol"
import { attackCitySingleSceneData } from "meta3d-action-mod-unit-init-protocol/src/StateType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import type { Map, List } from "immutable"

export const uiControlName = "ModUnitDynamicAttackCitySceneData"

export type state = null

export type inputFunc = nullable<func>

export type map = Map<string, List<number>>

export type specificData = {
    label: string,
}

export type outputData = Array<attackCitySingleSceneData>