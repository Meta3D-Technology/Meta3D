import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-grid-protocol"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { actionName as setCategoryActionName, state as setCategoryState } from "meta3d-action-mod-unit-set-category-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitSelectModelInput",
        func: (meta3dState) => {
            let allModelData = api.nullable.getWithDefault(
                api.nullable.map(state => {
                    let category = api.nullable.getExn(api.action.getActionState<setCategoryState>(meta3dState, setCategoryActionName)).category

                    return api.nullable.getExn(state.allModelData.get(
                        category
                    )).map((modelData) => {
                        return {
                            name: modelData.model,
                            imageBase64: modelData.snapshotImageBase64
                        }
                    }).sort((a, b) => {
                        return a.name.localeCompare(b.name)
                    })
                }, api.action.getActionState<initState>(meta3dState, initActionName)),
                []
            )

            return Promise.resolve(
                allModelData
            )
        }
    }
}
