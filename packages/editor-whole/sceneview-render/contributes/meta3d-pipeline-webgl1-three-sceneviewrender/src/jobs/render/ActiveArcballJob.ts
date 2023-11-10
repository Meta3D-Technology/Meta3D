import { execFuncType } from "meta3d-core-protocol/src/service/ServiceType"
import { getState, setState } from "../Utils"
import { states } from "meta3d-pipeline-webgl1-three-sceneviewrender-protocol/src/StateType";
import { service as renderService } from "meta3d-editor-sceneview-render-protocol/src/service/ServiceType"
import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { state as meta3dState } from "meta3d-type"
import { getExn, getWithDefault, isNullable, map } from "meta3d-commonlib-ts/src/NullableUtils";

let _saveActivedCameraView = (meta3dState: meta3dState, engineSceneService: engineSceneService, renderService: renderService) => {
    let isDebug = true

    return getWithDefault(
        map((activeCameraView) => {
            return renderService.setDefaultActiveCameraView(meta3dState, activeCameraView)
        }, engineSceneService.basicCameraView.getActiveCameraView(meta3dState, isDebug)),
        meta3dState
    )
}

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService } = getState(states)

    return mostService.callFunc(() => {
        let engineSceneService = getExn(api.getPackageService<engineSceneService>(meta3dState, "meta3d-engine-scene-protocol"))
        let renderService = api.getExtensionService<renderService>(meta3dState, "meta3d-editor-sceneview-render-protocol")

        meta3dState = _saveActivedCameraView(meta3dState, engineSceneService, renderService)

        meta3dState = engineSceneService.basicCameraView.active(meta3dState,
            engineSceneService.gameObject.getBasicCameraView(meta3dState,
                getExn(renderService.getArcballCameraControllerGameObject(meta3dState))
            )
        )

        return meta3dState
    })
}