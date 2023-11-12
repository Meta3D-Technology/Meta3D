import { execFuncType } from "meta3d-core-protocol/src/service/ServiceType"
import { state as meta3dState } from "meta3d-type"
import { getState, setState } from "../Utils";
import { states } from "meta3d-pipeline-webgl1-three-sceneviewrender-protocol/src/StateType";
import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { service as renderService } from "meta3d-editor-sceneview-render-protocol/src/service/ServiceType"
import { getExn, getWithDefault, map } from "meta3d-commonlib-ts/src/NullableUtils";
import { nullable } from "meta3d-commonlib-ts/src/nullable";
import { gameObject } from "meta3d-gameobject-protocol";

let _updateAllCameraAspect = (meta3dState: meta3dState,
    engineSceneService: engineSceneService,
    width: number, height: number,
    arcballCameraControllerGameObject: nullable<gameObject>
) => {
    let aspect = width / height

    return getWithDefault(
        map(arcballCameraControllerGameObject => {
            return engineSceneService.perspectiveCameraProjection.setAspect(meta3dState, engineSceneService.gameObject.getPerspectiveCameraProjection(meta3dState, arcballCameraControllerGameObject), aspect)
        }, arcballCameraControllerGameObject),
        meta3dState
    )
}

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let {
        mostService,
    } = getState(states)

    return mostService.callFunc(() => {
        let engineSceneService = getExn(api.getPackageService<engineSceneService>(meta3dState, "meta3d-engine-scene-protocol"))
        let renderService = api.getExtensionService<renderService>(meta3dState, "meta3d-editor-sceneview-render-protocol")

        let { width, height } = getExn(renderService.getViewRect(meta3dState))

        return _updateAllCameraAspect(meta3dState, engineSceneService, width, height,
            renderService.getArcballCameraControllerGameObject(meta3dState)
        )
    })
}