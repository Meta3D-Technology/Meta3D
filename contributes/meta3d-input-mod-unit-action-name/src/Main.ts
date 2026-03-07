import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-text-protocol"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { actionName as setCategoryActionName, state as setCategoryState } from "meta3d-action-mod-unit-set-category-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitSelectActionNameInput",
        func: (meta3dState) => {
            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.bind(({ allActionData, selectedActionIndex }) => {
                        let category = api.nullable.getExn(api.action.getActionState<setCategoryState>(meta3dState, setCategoryActionName)).category

                        return api.nullable.bind(actionData => {
                            return api.nullable.bind(selectedActionIndex => {
                                return Array.from(actionData.keys())[selectedActionIndex]
                            }, selectedActionIndex)
                        }, allActionData.get(category))
                    },
                        api.action.getActionState<initState>(meta3dState, initActionName)
                    ),
                    null
                )
            )
        }
    }
}
