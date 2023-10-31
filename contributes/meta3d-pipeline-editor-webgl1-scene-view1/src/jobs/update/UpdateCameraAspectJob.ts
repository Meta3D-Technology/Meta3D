import { execFunc as execFuncType } from "meta3d-engine-core-sceneview-protocol/src/contribute/work/PipelineContributeType"
import { getState, setState } from "../Utils";
import { states } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/StateType";
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";
import { getViewRect } from "meta3d-view-utils/src/SceneViewRect";
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { updateAllCameraAspect } from "meta3d-pipeline-editor-webgl1-view1-utils/src/CreateDefaultSceneJobUtils";

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let {
        mostService,
        engineWholeService
    } = getState(states)

    return mostService.callFunc(() => {
        let uiService = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")
        let uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")

        let { width, height } = getExn(getViewRect(
            uiService,
            uiState
        ))

        return updateAllCameraAspect(meta3dState, engineWholeService, width, height)
    })
}