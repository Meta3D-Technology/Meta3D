import { state as meta3dState, api } from "meta3d-type"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { actionName as setCategoryActionName, state as setCategoryState } from "meta3d-action-mod-unit-set-category-protocol"
import { action, category, damageEffect, skillObject, skillType, weaponType } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"
import { actionData, animationData } from "meta3d-action-mod-unit-init-protocol/src/Type"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export let getActionEntries = (api: api, state: initState, isSmallSkill: boolean, category: category): [action, actionData][] => {
    // let isSmallSkill = selectedActionIndexFieldName === "selectedSmallSkillObjectActionIndex"
    // let isSmallSkill = selectedActionIndexFieldName.includes("Small")

    return api.nullable.getExn(
        api.nullable.bind(actionData => {
            return Array.from(actionData.filter((actionData) => {
                return actionData.skillObject == skillObject.All
                    || (
                        isSmallSkill ? actionData.skillObject == skillObject.Small : actionData.skillObject == skillObject.Big
                    )
            }).entries())
        }, state.allActionData.get(category))
    )
}

// export let getAction = (api: api, state: initState, selectedActionIndexFieldName: keyof initState, category: category): action => {
//     return Array.from(api.nullable.getExn(state.allActionData.get(
//         category
//     )).keys())[state[selectedActionIndexFieldName] as number]
// }
export let getActionData = (api: api, state: initState, selectedActionIndexFieldName: keyof initState, category: category): [action, actionData] => {
    return api.nullable.getExn(
        api.nullable.bind(selectedActionIndex => {
            let actionEntries = getActionEntries(api, state, selectedActionIndexFieldName.includes("Small"), category)

            return actionEntries[selectedActionIndex]
        }, state[selectedActionIndexFieldName])
    )
}

export let getAnimationData = (api: api, state: initState, actionFieldName: action, category: category): nullable<animationData> => {
    return api.nullable.map(
        index => {
            return api.nullable.getExn(api.nullable.getExn(state.allAnimationData.get(category)).get(actionFieldName))[index - 1]
        },
        state.animationData.get(actionFieldName)
    )
}

export let getSkillType = (api: api, meta3dState: meta3dState, selectedActionIndexFieldName: keyof initState) => {
    return api.nullable.getWithDefault(
        api.nullable.map((state: any) => {
            let category = api.nullable.getExn(api.action.getActionState<setCategoryState>(meta3dState, setCategoryActionName)).category

            // return api.nullable.getExn(api.nullable.getExn(state.allActionData.get(
            //     category
            // )).get(getAction(api, state, selectedActionIndexFieldName, category))).skillType
            return getActionData(api, state, selectedActionIndexFieldName, category)[1].skillType
        }, api.action.getActionState<initState>(meta3dState, initActionName)),
        skillType.Melee
    )
}

export let getSkillTypeByIndex = (api: api, meta3dState: meta3dState, selectedActionIndex: number, isSmallSkill: boolean) => {
    return api.nullable.getWithDefault(
        api.nullable.map((state: any) => {
            let category = api.nullable.getExn(api.action.getActionState<setCategoryState>(meta3dState, setCategoryActionName)).category

            let actionEntries = getActionEntries(api, state, isSmallSkill, category)

            return actionEntries[selectedActionIndex][1].skillType
        }, api.action.getActionState<initState>(meta3dState, initActionName)),
        skillType.Melee
    )
}

// export let getDamageEffectTypesBySkillType = (api: api, meta3dState: meta3dState, selectedActionIndexFieldName: keyof initState) => {
//     let skillType_ = getSkillType(api, meta3dState, selectedActionIndexFieldName)

//     let data
//     switch (skillType_) {
//         case skillType.Melee:
//             data = [
//                 meleeDamageEffectType.BodyDamage,
//                 meleeDamageEffectType.BodyDirectAndRangeDamage,
//             ]
//             break
//         case skillType.Ranged:
//             data = [
//                 rangedDamageEffectType.MagicDamage,
//             ]
//             break
//         default:
//             throw new Error("error")
//     }

//     return data
// }
export let getDamageTypes = (api: api, meta3dState: meta3dState) => {
    return [
        weaponType.Body,
        weaponType.Common,
        // weaponType.Effect,
        // weaponType.EffectSelf,
        weaponType.Explode,
        weaponType.Impact,
        weaponType.Magic,
        weaponType.Power,
    ]
}

export let getDamageEffects = (api: api, meta3dState: meta3dState) => {
    return [
        damageEffect.RangeDamage,
        damageEffect.Repel,
    ]
}