import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { data } from "meta3d-input-mod-unit-dynamic-feature-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { getLanguageTextData } from "meta3d-language-utils/src/Main"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitDynamicDamageEffectInput",
        func: (meta3dState, [damageEffectFieldName]) => {
            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.map((data) => {
                        return data[damageEffectFieldName].map((damageEffect) => {
                            let damageEffectData = api.nullable.getExn(data.allDamageEffects.find((item) => {
                                return item.name === damageEffect.name
                            }))

                            return [
                                damageEffect.name,
                                getLanguageTextData(api, meta3dState, data.languageTextData, damageEffect.name),
                                damageEffect.level,
                                damageEffectData.maxLevel
                            ]
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
