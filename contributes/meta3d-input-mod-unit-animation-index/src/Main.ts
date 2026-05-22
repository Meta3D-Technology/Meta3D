import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-grid-protocol"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { actionName as setCategoryActionName, state as setCategoryState } from "meta3d-action-mod-unit-set-category-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitAnimationIndexInput",
        func: (meta3dState, [actionFieldName]) => {
            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.bind((data) => {
                        // let category = api.nullable.getExn(api.action.getActionState<setCategoryState>(meta3dState, setCategoryActionName)).category

                        // return _range(1, data.allAnimationData.get(category).get(actionFieldName)).map(i => String(i))

                        let category = api.nullable.getExn(api.action.getActionState<setCategoryState>(meta3dState, setCategoryActionName)).category

                        return data.allAnimationData.get(category).get(actionFieldName)
                            .map((animationData) => {
                                return {
                                    name: String(animationData.index),
                                    imageBase64: animationData.snapshotImageBase64
                                }
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
