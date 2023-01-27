import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { getState } from "../Utils";
import { states } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/StateType";
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils";
import { getDragOverLocation, getPitch, getYaw } from "../ArcballCameraControllerEventUtils";
import { getViewRect } from "meta3d-view-utils/src/ViewRect";
import { pointData } from "meta3d-event-protocol/src/service/EventType.gen";
import { rect } from "meta3d-type/src/contribute/UIControlProtocolConfigType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"

let _isDragInSceneView = ([x, y]: pointData<number>, sceneViewRect: rect) => {
    return x >= sceneViewRect.x && x <= (sceneViewRect.x + sceneViewRect.width)
        && y >= sceneViewRect.y && y <= (sceneViewRect.y + sceneViewRect.height)
}

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let {
        mostService,
        engineWholeService,
        uiService,
        meta3dUIExtensionProtocolName,
        arcballCameraController
    } = getState(states)


    return mostService.callFunc(() => {
        console.log("update arcballCameraController job");

        let { getTheta, setTheta, getPhi, setPhi } = engineWholeService.scene.arcballCameraController

        arcballCameraController = getExn(arcballCameraController)


        let dragOverLocation = getDragOverLocation()

        if (isNullable(dragOverLocation)
            || !_isDragInSceneView(getExn(dragOverLocation), getExn(getViewRect(uiService,
                api.getExtensionState<uiState>(meta3dState, meta3dUIExtensionProtocolName)
            )))
        ) {
            return meta3dState
        }


        meta3dState = setTheta(meta3dState, arcballCameraController, getExn(getTheta(meta3dState, arcballCameraController)) - getExn(getPitch()))
        setPhi(meta3dState, arcballCameraController, getExn(getPhi(meta3dState, arcballCameraController)) - getExn(getYaw()))

        return meta3dState
    })
}