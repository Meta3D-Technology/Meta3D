import { execFunc as execFuncType } from "meta3d-engine-core-sceneview-protocol/src/contribute/work/PipelineContributeType"
import { getState, setState } from "../Utils"
import { states } from "meta3d-pipeline-webgl1-three-sceneview-protocol/src/StateType"
import { state as converterState } from "meta3d-scenegraph-converter-three-sceneview-protocol/src/state/StateType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { getViewRect } from "meta3d-view-utils/src/SceneViewRect";
import { setSizeAndViewport } from "meta3d-pipeline-webgl1-three-utils/src/RenderJobUtils"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService, renderer, canvas } = getState(states)

    return mostService.callFunc(() => {
        // console.log("render job")

        let { perspectiveCamera, scene } = api.getExtensionState<converterState>(meta3dState,
            "meta3d-scenegraph-converter-three-sceneview-protocol")

        perspectiveCamera = getExn(perspectiveCamera)
        scene = getExn(scene)

        // console.log(
        //     perspectiveCamera.matrixWorldInverse
        // )

        renderer = getExn(renderer)

        let uiService = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")
        let uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")

        setSizeAndViewport(renderer, getExn(getViewRect(
            uiService,
            uiState
        )), canvas)

        renderer.render(scene, perspectiveCamera);

        return meta3dState
    })
}