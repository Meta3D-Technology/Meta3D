import { state as meta3dState, api } from "meta3d-type"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { actionName as setCategoryActionName, state as setCategoryState } from "meta3d-action-mod-unit-set-category-protocol"
import { meleeDamageEffectType, rangedDamageEffectType, skillType } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"

export let getDamageEffectTypesBySkillType = (api: api, meta3dState: meta3dState, actionFieldName: string) => {
    let skillType_ = api.nullable.getWithDefault(
        api.nullable.map((state: any) => {
            let category = api.nullable.getExn(api.action.getActionState<setCategoryState>(meta3dState, setCategoryActionName)).category

            return api.nullable.getExn(api.nullable.getExn(state.allActionData.get(
                category
            )).get(state[actionFieldName])).skillType
        }, api.action.getActionState<initState>(meta3dState, initActionName)),
        skillType.Melee
    )

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