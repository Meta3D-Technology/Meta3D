import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { getState, setState } from "../Utils";
import { states } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/StateType";
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils";
import { getDragOverLocation, getPitch, getYaw } from "../ArcballCameraControllerEventUtils";
import { getViewRect } from "meta3d-view-utils/src/ViewRect";
import { pointData } from "meta3d-event-protocol/src/service/EventType.gen";
import { rect } from "meta3d-type/src/contribute/UIControlProtocolConfigType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { nullable } from "meta3d-commonlib-ts/src/nullable";

let _isDragInSceneView = ([x, y]: pointData<number>, sceneViewRect: rect) => {
    return x >= sceneViewRect.x && x <= (sceneViewRect.x + sceneViewRect.width)
        && y >= sceneViewRect.y && y <= (sceneViewRect.y + sceneViewRect.height)
}

let _isNotTriggerEvent = (
    [
        lastYaw,
        lastPitch
    ]: [nullable<number>, nullable<number>],
    [
        currentYaw,
        currentPitch
    ]: [number, number],
): boolean => {
    if (isNullable(lastYaw) && isNullable(lastPitch)) {
        return false
    }

    return getExn(lastYaw) === currentYaw && getExn(lastPitch) === currentPitch
}

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let {
        mostService,
        engineWholeService,
        uiService,
        arcballCameraController,
        lastYaw,
        lastPitch
    } = getState(states)


    return mostService.callFunc(() => {
        console.log("update arcballCameraController job");

        let { getTheta, setTheta, getPhi, setPhi } = engineWholeService.scene.arcballCameraController

        arcballCameraController = getExn(arcballCameraController)


        let dragOverLocation = getDragOverLocation()

        if (isNullable(dragOverLocation)
            || !_isDragInSceneView(getExn(dragOverLocation), getExn(getViewRect(uiService,
                api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol"
                )
            )))
        ) {
            return meta3dState
        }

        let currentYaw = getExn(getYaw())
        let currentPitch = getExn(getPitch())

        if (_isNotTriggerEvent([lastYaw, lastPitch], [currentYaw, currentPitch])) {
            return meta3dState
        }


        meta3dState = setTheta(meta3dState, arcballCameraController, getExn(getTheta(meta3dState, arcballCameraController)) - currentPitch)
        setPhi(meta3dState, arcballCameraController, getExn(getPhi(meta3dState, arcballCameraController)) - currentYaw)

        return setStatesFunc<states>(
            meta3dState,
            setState(states,
                {
                    ...getState(states),
                    lastYaw: currentYaw,
                    lastPitch: currentPitch,
                }
            )
        )
    })
}