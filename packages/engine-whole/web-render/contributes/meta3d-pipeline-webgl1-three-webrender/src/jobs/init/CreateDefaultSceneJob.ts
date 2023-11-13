import { execFuncType } from "meta3d-core-protocol/src/service/ServiceType"
import { getState, setState } from "../Utils";
import { states } from "meta3d-pipeline-webgl1-three-webrender-protocol/src/StateType";
import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { state as meta3dState } from "meta3d-type"
import { addDefaultGameObjects } from "meta3d-pipeline-webgl1-three-utils/src/CreateDefaultSceneJobUtils"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils";
import { activeFirstBasicCameraView } from "meta3d-load-scene-utils/src/Main"
import { service as renderService } from "meta3d-engine-web-render-protocol/src/service/ServiceType"

let _addDefaultGameObjects = (meta3dState: meta3dState,
    engineSceneService: engineSceneService,
    aspect: number
): meta3dState => {
    let data = addDefaultGameObjects(meta3dState, engineSceneService)
    meta3dState = data[0]
    let cameraGameObject = data[2]


    meta3dState = engineSceneService.perspectiveCameraProjection.setAspect(meta3dState,
        engineSceneService.gameObject.getPerspectiveCameraProjection(meta3dState, cameraGameObject),
        aspect
    )

    meta3dState = activeFirstBasicCameraView(meta3dState, engineSceneService)

    return meta3dState
}

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let {
        mostService,
        canvas
    } = getState(states)

    return mostService.callFunc(() => {
        let renderService = api.getExtensionService<renderService>(meta3dState, "meta3d-engine-web-render-protocol")
        let { width, height } = getExn(renderService.getViewRect(meta3dState))

        meta3dState = _addDefaultGameObjects(meta3dState,
            getExn(
                getExn(api.getPackageService<engineSceneService>(meta3dState, "meta3d-engine-scene-protocol"))),
            width / height,
        )

        return meta3dState
    })
}