import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { data } from "meta3d-input-modal-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName as addCareerFeatureActionName, state as addCareerFeatureState, language } from "meta3d-action-mod-career-add-careerfeature-protocol"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ModSelectCareerFeaturesModalInput",
        func: (meta3dState) => {
            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.map(({ isShowModal }) => {
                        return isShowModal
                    },
                        api.action.getActionState<addCareerFeatureState>(meta3dState, addCareerFeatureActionName)
                    ),
                    false
                )
            )
        }
    }
}
