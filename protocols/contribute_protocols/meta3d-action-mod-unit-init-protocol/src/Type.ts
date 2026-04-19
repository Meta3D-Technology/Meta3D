// import { box3, damageType, euler, nullable, vector3 } from "type-api/src/ImportedTypes"
// import { api } from "type-api/src/Type"
import { action, category, damageEffect, emitterSubEffect, emitterType, feature, instance, meleeSubEffect, model, particleImage, propName, rangedSubEffect, skillObject, skillType } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"
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
    skillObject: skillObject,
    // meleeRange?: meleeRange,
    snapshotImageBase64: string,
}

export type actions = Map<category, Map<action, actionData>>

export type damageEffects = List<damageEffect>

export type subEffectData<Name> = {
    name: Name,
    snapshotImageBase64: string,
}

export type meleeSubEffects = List<subEffectData<meleeSubEffect>>

export type rangedSubEffects = List<subEffectData<rangedSubEffect>>

export type emitterSubEffects = List<subEffectData<subEffectData<emitterSubEffect>>>

export type emitterTypes = List<emitterType>

export type emitterParticleImageData = {
    name: particleImage,
    snapshotImageBase64: string,
}

export type emitterParticleImages = List<emitterParticleImageData>

export type emitterInstanceData = {
    name: instance,
    snapshotImageBase64: string,
}

export type emitterInstances = List<emitterInstanceData>


export type propData = {
    name: propName,
    // snapshotImageBase64: string,
}

export type props = List<propData>

export type featureData = {
    name: feature,
    maxLevel: number,
}

export type features = List<featureData>