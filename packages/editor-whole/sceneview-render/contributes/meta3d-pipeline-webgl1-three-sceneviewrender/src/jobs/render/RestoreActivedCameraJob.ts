import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { getState, setState } from "../Utils"
import { states } from "meta3d-pipeline-webgl1-three-sceneviewrender-protocol/src/StateType";
import { service as renderService } from "meta3d-editor-sceneview-render-protocol/src/service/ServiceType"
import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { getExn, getWithDefault, map } from "meta3d-commonlib-ts/src/NullableUtils";

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService } = getState(states)

    return mostService.callFunc(() => {
        let engineSceneService = getExn(api.getPackageService<engineSceneService>(meta3dState, "meta3d-engine-scene-protocol"))
        let renderService = api.getExtensionService<renderService>(meta3dState, "meta3d-editor-sceneview-render-protocol")

        return getWithDefault(
            map((activeCameraView) => {
                return engineSceneService.basicCameraView.active(meta3dState, activeCameraView)
            }, renderService.getDefaultActiveCameraView(meta3dState)),
            meta3dState
        )
    })
}