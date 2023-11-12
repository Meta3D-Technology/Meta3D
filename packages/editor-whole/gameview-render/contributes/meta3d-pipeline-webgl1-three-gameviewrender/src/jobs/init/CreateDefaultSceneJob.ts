import { execFuncType } from "meta3d-core-protocol/src/service/ServiceType"
import { getState, setState } from "../Utils";
import { states } from "meta3d-pipeline-webgl1-three-gameviewrender-protocol/src/StateType";
import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { state as meta3dState } from "meta3d-type"
import { addDefaultGameObjects } from "meta3d-pipeline-webgl1-three-utils/src/CreateDefaultSceneJobUtils"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils";
import { activeFirstBasicCameraView } from "meta3d-load-scene-utils/src/Main"

let _addDefaultGameObjects = (meta3dState: meta3dState,
    engineSceneService: engineSceneService
): meta3dState => {
    let data = addDefaultGameObjects(meta3dState, engineSceneService)
    meta3dState = data[0]

    meta3dState = activeFirstBasicCameraView(meta3dState, engineSceneService)

    return meta3dState
}

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let {
        mostService,
    } = getState(states)

    return mostService.callFunc(() => {
        if (!isNullable(api.getPackageService(meta3dState, "meta3d-editor-sceneview-render-protocol"))) {
            return meta3dState
        }

        meta3dState = _addDefaultGameObjects(meta3dState,
            getExn(
                getExn(api.getPackageService<engineSceneService>(meta3dState, "meta3d-engine-scene-protocol")))
        )

        return meta3dState
    })
}