import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { getState, setState } from "../Utils";
import { states } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/StateType";
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils";
import { getDragOverLocation, getPitch, getYaw, reset } from "meta3d-pipeline-utils/src/ArcballCameraControllerEventUtils";
import { getViewRect } from "meta3d-view-utils/src/SceneViewRect";
import { pointData } from "meta3d-event-protocol/src/service/EventType.gen";
import { rect } from "meta3d-type/src/contribute/UIControlProtocolConfigType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { nullable } from "meta3d-commonlib-ts/src/nullable";
import { api, state as meta3dState } from "meta3d-type"
import { service as engineWholeService } from "meta3d-engine-whole-protocol/src/service/ServiceType"

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

let _getArcballCameraController = (engineWholeService: engineWholeService, meta3dState: meta3dState) => {
    let arcballCameraControllers = engineWholeService.scene.gameObject.getAllGameObjects(meta3dState).filter(gameObject => engineWholeService.scene.gameObject.hasArcballCameraController(meta3dState, gameObject)).map(gameObject => engineWholeService.scene.gameObject.getArcballCameraController(meta3dState, gameObject))

    if (arcballCameraControllers.length == 0) {
        return null
    }

    return arcballCameraControllers[0]
}

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let {
        mostService,
        engineWholeService,
        uiService,
        // arcballCameraController,
        lastYaw,
        lastPitch
    } = getState(states)


    return mostService.callFunc(() => {
        console.log("update arcballCameraController job");

        let { getTheta, setTheta, getPhi, setPhi } = engineWholeService.scene.arcballCameraController


        let arcballCameraController = _getArcballCameraController(engineWholeService, meta3dState)
        if (isNullable(arcballCameraController)) {
            reset()

            return meta3dState
        }
        else {
            arcballCameraController = getExn(arcballCameraController)
        }


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
        meta3dState = setPhi(meta3dState, arcballCameraController, getExn(getPhi(meta3dState, arcballCameraController)) - currentYaw)

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