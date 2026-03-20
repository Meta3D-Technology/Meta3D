import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-text-protocol"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { getLanguageTextData } from "meta3d-language-utils/src/Main"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitEmitterDataNameInput",
        func: (meta3dState, [allFieldName, selectedIndexFieldName]) => {
            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.bind((state) => {
                        return api.nullable.bind(selectedIndex => {
                            return getLanguageTextData(api, meta3dState, state.languageTextData, state[allFieldName].get(selectedIndex).name)
                        }, state[selectedIndexFieldName])
                    },
                        api.action.getActionState<initState>(meta3dState, initActionName)
                    ),
                    null
                )
            )
        }
    }
}
