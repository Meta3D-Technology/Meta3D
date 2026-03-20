import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-text-protocol"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { actionName as setCategoryActionName, state as setCategoryState } from "meta3d-action-mod-unit-set-category-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { getLanguageTextData } from "meta3d-language-utils/src/Main"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitSelectModelNameInput",
        func: (meta3dState) => {
            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.bind(({ languageTextData, allModelData, selectedModelIndex }) => {
                        let category = api.nullable.getExn(api.action.getActionState<setCategoryState>(meta3dState, setCategoryActionName)).category

                        return api.nullable.bind(modelData => {
                            return api.nullable.bind(selectedModelIndex => {
                                return getLanguageTextData(api, meta3dState, languageTextData, modelData[selectedModelIndex].model)
                            }, selectedModelIndex)
                        }, allModelData.get(category))
                    },
                        api.action.getActionState<initState>(meta3dState, initActionName)
                    ),
                    null
                )
            )
        }
    }
}
