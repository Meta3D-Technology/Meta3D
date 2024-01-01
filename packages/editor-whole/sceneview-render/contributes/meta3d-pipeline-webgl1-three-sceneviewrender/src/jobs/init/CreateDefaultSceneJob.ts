import { execFuncType } from "meta3d-core-protocol/src/service/ServiceType"
import { getState, setState } from "../Utils";
import { states } from "meta3d-pipeline-webgl1-three-sceneviewrender-protocol/src/StateType";
import { service as renderService } from "meta3d-editor-sceneview-render-protocol/src/service/ServiceType"
import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { state as meta3dState } from "meta3d-type"
import { addDefaultGameObjects, addGameObjectsForSceneView } from "meta3d-pipeline-webgl1-three-utils/src/CreateDefaultSceneJobUtils"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";
import { gameObject } from "meta3d-gameobject-protocol";

let _addDefaultGameObjects = (meta3dState: meta3dState,
    engineSceneService: engineSceneService
): [meta3dState, gameObject] => {
    let data = addDefaultGameObjects(meta3dState, engineSceneService)
    meta3dState = data[0]
    // let cameraController1 = data[1]
    let cameraController1GameObject = data[2]


    meta3dState = engineSceneService.basicCameraView.active(
        meta3dState,
        engineSceneService.gameObject.getBasicCameraView(
            meta3dState,
            cameraController1GameObject
        )
    )


    data = addGameObjectsForSceneView(meta3dState, engineSceneService)
    meta3dState = data[0]
    let cameraController2GameObject = data[2]


    // meta3dState = activeCamera(meta3dState, engineSceneService, cameraGameObject)

    return [meta3dState, cameraController2GameObject]
}

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let {
        mostService,
    } = getState(states)

    return mostService.callFunc(() => {
        //console.log("update job");


        let data = _addDefaultGameObjects(meta3dState,
            getExn(
                getExn(api.getPackageService<engineSceneService>(meta3dState, "meta3d-engine-scene-protocol")))
        )
        meta3dState = data[0]
        let cameraGameObject = data[1]

        let { setArcballCameraControllerGameObject } = getExn(api.getPackageService<renderService>(meta3dState, "meta3d-editor-sceneview-render-protocol"))

        meta3dState = setArcballCameraControllerGameObject(meta3dState, cameraGameObject)

        return meta3dState
    })
}