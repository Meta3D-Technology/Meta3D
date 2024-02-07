import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-checkbox-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { getSelectedGameObject } from "meta3d-select-inspector-node-utils/src/Main"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "CameraGroupIsActiveInput",
        func: (meta3dState) => {
            let { gameObject, basicCameraView } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).scene(meta3dState)

            let selectedGameObject = api.nullable.getExn(getSelectedGameObject(meta3dState, api))

            return Promise.resolve(
                api.nullable.getWithDefault(
                    api.nullable.map((activeCameraView) => {
                        return activeCameraView == api.nullable.getExn(gameObject.getBasicCameraView(meta3dState, selectedGameObject))
                    },
                        basicCameraView.getActiveCameraView(meta3dState, true)
                    ),
                    false
                )
            )
        }
    }
}
