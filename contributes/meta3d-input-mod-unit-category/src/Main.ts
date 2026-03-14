import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-popup-protocol"
import { inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { getLanguageTextData } from "meta3d-language-utils/src/Main"
import { actionName, state } from "meta3d-action-mod-unit-init-protocol"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitCategoryInput",
        func: (meta3dState) => {
            let allModelData = api.nullable.getWithDefault(
                api.nullable.map(state => Array.from(state.allModelData.keys()).map((model) => getLanguageTextData(api, meta3dState, model)), api.action.getActionState<state>(meta3dState, actionName)),
                []
            )

            return Promise.resolve(
                allModelData
            )
        }
    }
}
