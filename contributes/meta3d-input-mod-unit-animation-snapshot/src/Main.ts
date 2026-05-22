import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-image-protocol"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { actionName as setCategoryActionName, state as setCategoryState } from "meta3d-action-mod-unit-set-category-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { getAnimationData } from "meta3d-action-mod-unit-skill-utils/src/Main"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModUnitAnimationSnapshotInput",
        func: (meta3dState, [actionFieldName]) => {
            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.bind((data) => {
                        let category = api.nullable.getExn(api.action.getActionState<setCategoryState>(meta3dState, setCategoryActionName)).category

                        return api.nullable.map(
                            animationData => {
                                return animationData.snapshotImageBase64
                            },
                            getAnimationData(api, data, actionFieldName, category)
                        )
                    },
                        api.action.getActionState<initState>(meta3dState, initActionName)
                    ),
                    null
                )
            )
        }
    }
}
