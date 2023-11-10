import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { getState, setState } from "../Utils";
import { states } from "meta3d-pipeline-webgl1-three-sceneviewrender-protocol/src/StateType";
// import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";
// import { getViewRect } from "meta3d-view-utils/src/SceneViewRect";
// import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
// import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { updateAllCameraAspect } from "meta3d-pipeline-webgl1-three-utils/src/CreateDefaultSceneJobUtils";
import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { service as renderService } from "meta3d-editor-sceneview-render-protocol/src/service/ServiceType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let {
        mostService,
    } = getState(states)

    return mostService.callFunc(() => {
        let engineSceneService = getExn(api.getPackageService<engineSceneService>(meta3dState, "meta3d-engine-scene-protocol"))
        let renderService = api.getExtensionService<renderService>(meta3dState, "meta3d-editor-sceneview-render-protocol")

        let { width, height } = getExn(renderService.getViewRect(meta3dState))

        return updateAllCameraAspect(meta3dState, engineSceneService, width, height)
    })
}