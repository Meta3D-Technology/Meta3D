import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { data } from "meta3d-input-list-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { getLanguageTextData } from "meta3d-language-utils/src/Main"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitSelectSubEffectInput",
        func: (meta3dState, [subEffectsFieldName]) => {
            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.map((state) => {
                        return state.allSubEffects.filter(d => {
                            return !state[subEffectsFieldName].includes(d)
                        }).map(d => {
                            return `${getLanguageTextData(api, meta3dState, d)}`
                        }).toArray().sort((a, b) => {
                            return a.localeCompare(b)
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
