import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-input-float1-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { getSelectedGameObject } from "meta3d-select-inspector-node-utils/src/Main"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "CameraGroupFarInput",
        func: (meta3dState) => {
            let { gameObject, perspectiveCameraProjection } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).scene(meta3dState)

            let selectedGameObject = api.nullable.getExn(getSelectedGameObject(meta3dState, api))

            return Promise.resolve(
                api.nullable.getExn(perspectiveCameraProjection.getFar(meta3dState, api.nullable.getExn(gameObject.getPerspectiveCameraProjection(meta3dState, selectedGameObject))))
            )
        }
    }
}
