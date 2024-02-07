import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-input-float3-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName as setLocalEulerAngleActionName, state as setLocalEulerAngleState } from "meta3d-action-set-localeulerangle-protocol"
import { getSelectedGameObject } from "meta3d-select-inspector-node-utils/src/Main"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "LocalEulerAngleInput",
        func: (meta3dState) => {
            let { gameObject, transform } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).scene(meta3dState)

            return Promise.resolve(
                api.nullable.bind(({ localEulerAngleMap }) => {
                    return api.nullable.map(selectedGameObject => {
                        let transformComponent = gameObject.getTransform(meta3dState, selectedGameObject)

                        return api.nullable.getWithDefault(localEulerAngleMap.get(transformComponent), transform.getLocalEulerAngles(meta3dState, transformComponent))
                    }, getSelectedGameObject(meta3dState, api)
                    )
                }, api.action.getActionState<setLocalEulerAngleState>(meta3dState, setLocalEulerAngleActionName))
            )
        }
    }
}
