import { box3, damageType, nullable, vector3 } from "type-api/src/ImportedTypes"
import { api } from "type-api/src/Type"
import { action, actionType, category, effect, renderEffect } from "unit-protocol/src/service/UnitType"

export type actionData = {
    type: actionType,
    workFrameIndex: number,
    getCollisionDirectionFunc: (api: api, forceDirection: vector3) => vector3,
    computeAttackBoxDataFunc: (api: api, box: box3, meleeRange: number, forceDirection: vector3) => [vector3, vector3],
}

export type actions = {
    [category.EliteGiantess]: Partial<Record<action, actionData>>,
}


export type effectData = {
    actionType: actionType,
    damageType: damageType,

    renderEffects: Array<renderEffect>,
}

export type effects = Record<effect, effectData>