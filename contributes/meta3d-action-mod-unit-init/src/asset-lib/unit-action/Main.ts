import { action, actionType, category, meleeRange, model, skillType } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"

export let getActions = () => {
    return {
        [category.EliteGiantess]: {
            [action.StompLight]: {
                // type: actionType.Body,
                skillType: skillType.Melee,
                meleeRange: meleeRange.Level6 * 1.5 * 1.1 / 22,
            },
        }
    }
}

export let getActionSnapshotPath = (pathPrefix, category: category, action: action) => {
    return `${pathPrefix}/${category.toLowerCase()}/icon_action/${action}.png`
}
