import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { data } from "meta3d-input-grid-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
// import { actionName as setCategoryActionName, state as setCategoryState } from "meta3d-action-mod-unit-set-category-protocol"
// import { getLanguageTextData } from "meta3d-language-utils/src/Main"
// import { skillObject } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"
import { getSkillType } from "meta3d-action-mod-unit-skill-utils/src/Main"
import { skillType } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"
import { getLanguageTextData } from "meta3d-language-utils/src/Main"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitSelectSubEffectInput",
        // func: (meta3dState, [allSubEffectsFieldName, subEffectsFieldName]) => {
        func: (meta3dState, [selectedSkillObjectActionIndexFieldName, subEffectsFieldName]) => {
            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.map((state) => {
                        // return state[allSubEffectsFieldName].filter(d => {
                        //     return !state[subEffectsFieldName].includes(d)
                        // }).map(d => {
                        //     return {
                        //         ...d,
                        //         name: getLanguageTextData(api, meta3dState, state.languageTextData, d.name)
                        //     }
                        // }).toArray()
                        // // .sort((a, b) => {
                        // //     return a.localeCompare(b)
                        // // })

                        let skillType_ = getSkillType(api, meta3dState, selectedSkillObjectActionIndexFieldName)

                        let result
                        switch (skillType_) {
                            case skillType.Melee:
                                result = state.allMeleeSubEffects.toArray()
                                break
                            case skillType.Ranged:
                                result = state.allRangedSubEffects.toArray()
                                break
                        }

                        // return result.map(d => {
                        //     return {
                        //         ...d,
                        //         name: getLanguageTextData(api, meta3dState, state.languageTextData, d.name),
                        //     }
                        // })
                        return result.filter(d => {
                            // return state[subEffectsFieldName].filter(f => f.name == d.name).length == 0
                            return state[subEffectsFieldName].filter(f => f == d.name).length == 0
                        }).map(d => {
                            return {
                                name: getLanguageTextData(api, meta3dState, state.languageTextData, d.name),
                                imageBase64: d.snapshotImageBase64
                            }
                        })
                    },
                        api.action.getActionState<initState>(meta3dState, initActionName)
                    ),
                    []
                )
            )
        }
    }
}
