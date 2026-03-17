import { action, category, meleeRange, model, skillType, subEffect } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"

export let getActions = () => {
    return {
        [category.EliteGiantess]: {
            [action.StompLight]: {
                skillType: skillType.Melee,
                meleeRange: meleeRange.Level6 * 1.5 * 1.1 / 22,
            },
        }
    }
}

export let getActionSnapshotPath = (pathPrefix, category: category, action: action) => {
    return `${pathPrefix}/${category.toLowerCase()}/icon_action/${action}.png`
}

export let getSubEffects = () => {
    return [
        subEffect.FootDamageDecal,
        subEffect.StompDust,

        subEffect.HitFireball,
        subEffect.ShellExplode,
    ]
}