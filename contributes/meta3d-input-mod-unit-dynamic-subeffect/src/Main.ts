import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { data } from "meta3d-input-mod-dynamic-texts-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { getLanguageTextData } from "meta3d-language-utils/src/Main"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitDynamicSubEffectInput",
        func: (meta3dState, [subEffectsFieldName]) => {
            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.map((data) => {
                        return data[subEffectsFieldName].map(d => {
                            return getLanguageTextData(api, meta3dState, data.languageTextData, d)
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
