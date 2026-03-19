import { action, category, emitterType, instance, meleeRange, model, particleImage, skillType, subEffect } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"

export let getActions = () => {
    return {
        [category.EliteGiantess]: {
            [action.StompLight]: {
                skillType: skillType.Melee,
            },
            [action.StompHeavy]: {
                skillType: skillType.Melee,
            },
            [action.KickLight]: {
                skillType: skillType.Melee,
            },
            [action.Cast]: {
                skillType: skillType.Ranged,
            },
        }
    }
}

export let getSubEffects = () => {
    return [
        subEffect.FootDamageDecal,
        subEffect.StompDust,

        subEffect.HitFireball,
        subEffect.ShellExplode,
    ]
}

export let getEmitterTypes = () => {
    return [
        emitterType.Particle,
        emitterType.Instance,
    ]
}

export let getEmitterParticleImages = () => {
    return [
        particleImage.Fireball1
    ]
}

export let getEmitterInstances = () => {
    return [
        instance.Missile1
    ]
}

export let getEmitterParticleImageSnapshotPath = (pathPrefix, name) => {
    return `${pathPrefix}/icon_particleimage/${name}.png`
}

export let getEmitterInstanceSnapshotPath = (pathPrefix, name) => {
    return `${pathPrefix}/icon_instance/${name}.png`
}

export let getActionSnapshotPath = (pathPrefix, category: category, action: action) => {
    // return `${pathPrefix}/${category.toLowerCase()}/icon_action/${action}.png`
    return `${pathPrefix}/icon_action/${action}.png`
}