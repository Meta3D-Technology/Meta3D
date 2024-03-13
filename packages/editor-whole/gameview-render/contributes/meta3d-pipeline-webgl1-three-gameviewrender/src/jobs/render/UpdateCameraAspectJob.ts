import { execFuncType } from "meta3d-core-protocol/src/service/ServiceType"
import { state as meta3dState } from "meta3d-type"
import { getState, setState } from "../Utils";
import { states } from "meta3d-pipeline-webgl1-three-gameviewrender-protocol/src/StateType";
import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { service as gameviewRenderService } from "meta3d-editor-gameview-render-protocol/src/service/ServiceType"
import { service as sceneviewRenderService } from "meta3d-editor-sceneview-render-protocol/src/service/ServiceType"
import { bind, getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils";
import { service as renderService } from "meta3d-editor-gameview-render-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable";
import { gameObject } from "meta3d-gameobject-protocol";

let _getAllPerspectiveCameraProjectionsExceptOneInSceneView = (meta3dState: meta3dState,
    scene: engineSceneService,
    arcballCameraControllerGameObjectInSceneView: nullable<gameObject>
) => {
    return scene.gameObject.getAllGameObjects(meta3dState).filter(gameObject => {
        return scene.gameObject.hasPerspectiveCameraProjection(meta3dState, gameObject)
    }).filter(gameObject => {
        if (!isNullable(arcballCameraControllerGameObjectInSceneView)) {
            return gameObject != getExn(arcballCameraControllerGameObjectInSceneView)
        }

        return true
    }).map(gameObject => {
        return scene.gameObject.getPerspectiveCameraProjection(meta3dState, gameObject)
    })
}

let _updateAllCameraAspect = (meta3dState: meta3dState,
    engineSceneService: engineSceneService,
    width: number, height: number,
    arcballCameraControllerGameObjectInSceneView: nullable<gameObject>
) => {
    let aspect = width / height

    return _getAllPerspectiveCameraProjectionsExceptOneInSceneView(meta3dState, engineSceneService, arcballCameraControllerGameObjectInSceneView).reduce((meta3dState, cameraProjection) => {
        return engineSceneService.perspectiveCameraProjection.setAspect(meta3dState, cameraProjection, aspect)
    }, meta3dState)
}

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let {
        mostService,
    } = getState(states)

    return mostService.callFunc(() => {
        if (api.getExtensionService<renderService>(meta3dState, "meta3d-editor-gameview-render-protocol").isPipelineStop(meta3dState)) {
            return meta3dState
        }

        let engineSceneService = getExn(api.getPackageService<engineSceneService>(meta3dState, "meta3d-engine-scene-protocol"))
        let gameviewRenderService = api.getExtensionService<gameviewRenderService>(meta3dState, "meta3d-editor-gameview-render-protocol")

        let { width, height } = getExn(gameviewRenderService.getViewRect(meta3dState))

        return _updateAllCameraAspect(meta3dState, engineSceneService, width, height,
            bind(
                sceneviewRenderService => {
                    return sceneviewRenderService.getArcballCameraControllerGameObject(meta3dState)
                },
                api.getPackageService<sceneviewRenderService>(meta3dState, "meta3d-editor-sceneview-render-protocol")
            )
        )
    })
}