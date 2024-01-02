import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-collapse-protocol"
import { inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName as selectSceneTreeNodeActionName, state as selectSceneTreeNodeState } from "meta3d-action-select-scenetree-node-protocol"
import { service } from "meta3d-editor-whole-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "BasicCameraViewCollapseInput",
        func: (meta3dState) => {

            return Promise.resolve(api.nullable.getWithDefault(
                api.nullable.map(
                    gameObject => {
                        let engineSceneService = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).scene(meta3dState)

                        return engineSceneService.gameObject.hasBasicCameraView(meta3dState, gameObject)
                    },
                    api.nullable.bind(selectSceneTreeNodeState => selectSceneTreeNodeState.selectedGameObject, api.action.getActionState<selectSceneTreeNodeState>(meta3dState, selectSceneTreeNodeActionName))
                ),
                false
            ))
        }
    }
}
