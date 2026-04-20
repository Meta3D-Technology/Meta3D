import { action, category, damageEffect, emitterSubEffect, emitterType, instance, meleeRange, meleeSubEffect, model, particleImage, rangedSubEffect, skillObject, skillType } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"

export let getActions = () => {
    return {
        [category.EliteGiantess]: {
            [action.StompLight]: {
                skillType: skillType.Melee,
                skillObject: skillObject.Small,
            },
            [action.StompHeavy]: {
                skillType: skillType.Melee,
                skillObject: skillObject.Small,
            },
            [action.Kick1]: {
                skillType: skillType.Melee,
                skillObject: skillObject.Big,
            },
            [action.Kick2]: {
                skillType: skillType.Melee,
                skillObject: skillObject.Big,

            },
            [action.Bencao]: {
                skillType: skillType.Melee,
                skillObject: skillObject.Big,
            },
            [action.TwistRub]: {
                skillType: skillType.Melee,
                skillObject: skillObject.Small,
            },
            [action.ChickenDance]: {
                skillType: skillType.Melee,
                skillObject: skillObject.Small,
            },
            [action.RumbaDance]: {
                skillType: skillType.Melee,
                skillObject: skillObject.Small,
            },
            [action.JumpHeavy]: {
                skillType: skillType.Melee,
                skillObject: skillObject.Small,
            },
            [action.JumpLight]: {
                skillType: skillType.Melee,
                skillObject: skillObject.Small,
            },
            [action.CrossJumps]: {
                skillType: skillType.Melee,
                skillObject: skillObject.Small,
            },
            [action.LegSweep]: {
                skillType: skillType.Melee,
                skillObject: skillObject.Small,
            },
            [action.Punch]: {
                skillType: skillType.Melee,
                skillObject: skillObject.Big,
            },
            [action.Boxing]: {
                skillType: skillType.Melee,
                skillObject: skillObject.Big,
            },
            [action.Speedbag]: {
                skillType: skillType.Melee,
                skillObject: skillObject.Big,
            },
            [action.PunchCombo]: {
                skillType: skillType.Melee,
                skillObject: skillObject.Big,
            },
            [action.KickTwice]: {
                skillType: skillType.Melee,
                skillObject: skillObject.Big,

            },
            [action.Cast]: {
                skillType: skillType.Ranged,
                skillObject: skillObject.All,
            },
        }
    }
}

export let getAllDamageEffectData = () => {
    return {
        [damageEffect.RangeDamage]: {
            maxLevel: 5
        },
        [damageEffect.Repel]: {
            maxLevel: 5
        },
    }
}

export let getMeleeSubEffects = () => {
    return [
        meleeSubEffect.FootDamageDecal,
        meleeSubEffect.StompDust,
    ]
}

export let getRangedSubEffects = () => {
    return [
        rangedSubEffect.FireballHit,
        rangedSubEffect.ShellExplode,
    ]
}

export let getEmitterSubEffects = () => {
    return [
        emitterSubEffect.ShellEmit,
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
        particleImage.I1,
        particleImage.I2,
        particleImage.I3,
        particleImage.I4,
        particleImage.I5,
        particleImage.I6,
        particleImage.I7,
        particleImage.I8,
        particleImage.I9,
        particleImage.I10,
        particleImage.I11,
        particleImage.I12,
        particleImage.I13,
        particleImage.I14,
        particleImage.I15,
        particleImage.I16,
        particleImage.I17,
        particleImage.I18,
        particleImage.I19,
    ]
}

export let getEmitterInstances = () => {
    return [
        instance.Arrow1,
        instance.Missile1,
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

export let getMeleeSubEffectSnapshotPath = (pathPrefix, subEffect: meleeSubEffect) => {
    return `${pathPrefix}/icon_meleesubeffect/${subEffect}.png`
}

export let getRangedSubEffectSnapshotPath = (pathPrefix, subEffect: rangedSubEffect) => {
    return `${pathPrefix}/icon_rangedsubeffect/${subEffect}.png`
}

export let getEmitterSubEffectSnapshotPath = (pathPrefix, subEffect: emitterSubEffect) => {
    return `${pathPrefix}/icon_emittersubeffect/${subEffect}.png`
}