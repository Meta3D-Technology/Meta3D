import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-popup-protocol"
import { inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { getLanguageTextData } from "meta3d-language-utils/src/Main"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { getSkillType } from "meta3d-action-mod-unit-skill-utils/src/Main"
import { skillType } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitSelectDamageEffectInput",
        func: (meta3dState, [damageEffectFieldName, selectedSkillObjectActionIndexFieldName]) => {
            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.map((state) => {
                        let skillType_ = getSkillType(api, meta3dState, selectedSkillObjectActionIndexFieldName)

                        switch (skillType_) {
                            case skillType.Melee:
                                return state.allDamageEffects.filter(d => {
                                    return state[damageEffectFieldName].filter(f => f.name == d.name).length == 0
                                    // return !state[damageEffectFieldName].includes(d)
                                }).map(d => {
                                    // return `${d.name}:${getLanguageTextData(api, meta3dState, languageTextData, d.name)}`
                                    return getLanguageTextData(api, meta3dState, state.languageTextData, d.name)
                                }).toArray()
                            // .sort((a, b) => {
                            //     return a.localeCompare(b)
                            // })
                            case skillType.Ranged:
                                return []
                        }
                    },
                        api.action.getActionState<initState>(meta3dState, initActionName)
                    ),
                    []
                )
            )
        }
    }
}
