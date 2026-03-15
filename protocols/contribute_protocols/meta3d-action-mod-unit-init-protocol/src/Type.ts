// import { box3, damageType, euler, nullable, vector3 } from "type-api/src/ImportedTypes"
// import { api } from "type-api/src/Type"
import { action, category, feature, meleeRange, model, propName, skillType } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"
import { Map, List } from "immutable"

export type modelData = {
    model: model,
    // scalar: number,
    // initialEulerForMoveTween?: euler,
    // pickTransformRotation?: [number, number, number],
    // ubControlledTransformRotation?: [number, number, number],
    // putToBreastTransformRotation?: [number, number, number],
    // putToShoeTransformRotation?: [number, number, number],

    // updateBoxFunc: (box: box3) => box3,

    snapshotImageBase64: string,
}

// export type models = {
//     [category.EliteGiantess]: Array<modelData>
// }
export type models = Map<category, Array<modelData>>

export type actionData = {
    skillType: skillType,
    meleeRange?: meleeRange,
    snapshotImageBase64: string,
}

export type actions = Map<category, Map<action, actionData>>


export type propData = {
    name: propName,
    snapshotImageBase64: string,
}

export type props = List<propData>

export type featureData = {
    name: feature,
    maxLevel: number,
}

export type features = List<featureData>