import { execFuncType } from "meta3d-core-protocol/src/service/ServiceType"
import { state as meta3dState } from "meta3d-type"
import { getState, setState } from "../Utils";
import { states } from "meta3d-pipeline-webgl1-three-webrender-protocol/src/StateType";
import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { service as renderService } from "meta3d-engine-web-render-protocol/src/service/ServiceType"
import { bind, getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils";

let _getAllPerspectiveCameraProjections = (meta3dState: meta3dState,
    scene: engineSceneService,
) => {
    return scene.gameObject.getAllGameObjects(meta3dState).filter(gameObject => {
        return scene.gameObject.hasPerspectiveCameraProjection(meta3dState, gameObject)
    }).map(gameObject => {
        return scene.gameObject.getPerspectiveCameraProjection(meta3dState, gameObject)
    })
}

let _updateAllCameraAspect = (meta3dState: meta3dState,
    engineSceneService: engineSceneService,
    width: number, height: number,
) => {
    let aspect = width / height

    return _getAllPerspectiveCameraProjections(meta3dState, engineSceneService).reduce((meta3dState, cameraProjection) => {
        return engineSceneService.perspectiveCameraProjection.setAspect(meta3dState, cameraProjection, aspect)
    }, meta3dState)
}

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let {
        mostService,
    } = getState(states)

    return mostService.callFunc(() => {
        let engineSceneService = getExn(api.getPackageService<engineSceneService>(meta3dState, "meta3d-engine-scene-protocol"))
        let renderService = api.getExtensionService<renderService>(meta3dState, "meta3d-engine-web-render-protocol")

        let { width, height } = getExn(renderService.getViewRect(meta3dState))

        return _updateAllCameraAspect(meta3dState, engineSceneService, width, height
        )
    })
}