import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-input-float3-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { getSelectedGameObject } from "meta3d-select-inspector-node-utils/src/Main"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "LocalPositionInput",
        func: (meta3dState) => {
            let { gameObject, transform } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).scene(meta3dState)


            return Promise.resolve(
                api.nullable.map(selectedGameObject => {
                    let transformComponent = gameObject.getTransform(meta3dState, selectedGameObject)

                    return transform.getLocalPosition(meta3dState, transformComponent)
                }, getSelectedGameObject(meta3dState, api)
                )
            )
        }
    }
}
