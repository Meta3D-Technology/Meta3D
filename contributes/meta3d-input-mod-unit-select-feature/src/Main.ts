import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { data } from "meta3d-input-list-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { actionName as setCategoryActionName, state as setCategoryState } from "meta3d-action-mod-unit-set-category-protocol"
import { getLanguageTextData } from "meta3d-language-utils/src/Main"
import { filterFeatureData } from "meta3d-action-mod-unit-utils/src/Main"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitSelectFeatureInput",
        func: (meta3dState) => {
            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.map((initState) => {
                        let category = api.action.getActionState<setCategoryState>(meta3dState, setCategoryActionName).category

                        return filterFeatureData(api, category, initState).map(d => {
                            // return `${d.name}:${getLanguageTextData(api, meta3dState, languageTextData, d.name)}`
                            return getLanguageTextData(api, meta3dState, initState.languageTextData, d.name)
                        }).toArray()
                        // .sort((a, b) => {
                        //     return a.localeCompare(b)
                        // })
                    },
                        api.action.getActionState<initState>(meta3dState, initActionName)
                    ),
                    []
                )
            )
        }
    }
}
