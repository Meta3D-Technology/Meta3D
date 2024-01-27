import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-checkbox-protocol"
import { actionName as selectSceneTreeNodeActionName, state as selectSceneTreeNodeState } from "meta3d-action-select-scenetree-node-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "CameraGroupIsActiveInput",
        func: (meta3dState) => {
            let { gameObject, basicCameraView } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).scene(meta3dState)

            let selectSceneTreeNodeState = api.nullable.getExn(
                api.action.getActionState<selectSceneTreeNodeState>(meta3dState, selectSceneTreeNodeActionName)
            )
            let selectedGameObject = api.nullable.getExn(selectSceneTreeNodeState.selectedGameObject)

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
