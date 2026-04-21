import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { data } from "meta3d-input-popup-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { getLanguageTextData } from "meta3d-language-utils/src/Main"
import { getModes } from "meta3d-action-mod-unit-utils/src/Main"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitSelectBehaviourDataModeInput",
        func: (meta3dState, [modeKey]) => {
            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.map(({ languageTextData }) => {
                        return getModes(modeKey).map(d => {
                            return getLanguageTextData(api, meta3dState, languageTextData, d)
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
