import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-input-float3-protocol"
import { service, inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName as selectSceneTreeNodeActionName, state as selectSceneTreeNodeState } from "meta3d-action-select-scenetree-node-protocol"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "LocalEulerAngleInput",
        func: (meta3dState) => {
            let { gameObject, transform } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).scene(meta3dState)


            return Promise.resolve(api.nullable.bind(
                selectSceneTreeNodeState => {
                    return api.nullable.map(selectedGameObject => {
                        return transform.getLocalEulerAngles(meta3dState, gameObject.getTransform(meta3dState, selectedGameObject))
                    },
                        selectSceneTreeNodeState.selectedGameObject
                    )
                },
                api.action.getActionState<selectSceneTreeNodeState>(meta3dState, selectSceneTreeNodeActionName)))
        }
    }
}
