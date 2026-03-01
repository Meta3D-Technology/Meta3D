import { box3, damageType, euler, nullable, vector3 } from "type-api/src/ImportedTypes"
import { api } from "type-api/src/Type"
import { action, actionType, category, effect, model, renderEffect } from "unit-protocol/src/service/UnitType"

export type modelData = {
    model: model,
    scalar: number,
    initialEulerForMoveTween?: euler,
    pickTransformRotation?: [number, number, number],
    ubControlledTransformRotation?: [number, number, number],
    putToBreastTransformRotation?: [number, number, number],
    putToShoeTransformRotation?: [number, number, number],

    updateBoxFunc: (box: box3) => box3,
}

export type models = {
    [category.EliteGiantess]: Array<modelData>
}
