import { state as meta3dState, api } from "meta3d-type"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { actionName as setCategoryActionName, state as setCategoryState } from "meta3d-action-mod-unit-set-category-protocol"
import { action, category, skillType } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"

export let getAction = (api: api, state: initState, selectedActionIndexFieldName: keyof initState, category: category): action => {
    return Array.from(api.nullable.getExn(state.allActionData.get(
        category
    )).keys())[state[selectedActionIndexFieldName] as number]
}

export let getSkillType = (api: api, meta3dState: meta3dState, selectedActionIndexFieldName: keyof initState) => {
    return api.nullable.getWithDefault(
        api.nullable.map((state: any) => {
            let category = api.nullable.getExn(api.action.getActionState<setCategoryState>(meta3dState, setCategoryActionName)).category

            return api.nullable.getExn(api.nullable.getExn(state.allActionData.get(
                category
            )).get(getAction(api, state, selectedActionIndexFieldName, category))).skillType
        }, api.action.getActionState<initState>(meta3dState, initActionName)),
        skillType.Melee
    )
}

export let getDamageEffectTypesBySkillType = (api: api, meta3dState: meta3dState, selectedActionIndexFieldName: keyof initState) => {
    let skillType_ = getSkillType(api, meta3dState, selectedActionIndexFieldName)

    let data
    switch (skillType_) {
        case skillType.Melee:
            data = [
                meleeDamageEffectType.BodyDamage,
                meleeDamageEffectType.BodyDirectAndRangeDamage,
            ]
            break
        case skillType.Ranged:
            data = [
                rangedDamageEffectType.MagicDamage,
            ]
            break
        default:
            throw new Error("error")
    }

    return data
}