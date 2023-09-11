import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils";
import { pointData } from "meta3d-event-protocol/src/service/EventType.gen";
import { rect } from "meta3d-type/src/contribute/UIControlProtocolConfigType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { nullable } from "meta3d-commonlib-ts/src/nullable";
import { service as engineWholeService } from "meta3d-engine-whole-protocol/src/service/ServiceType"
import { service as engineWholeGameViewService } from "meta3d-engine-whole-gameview-protocol/src/service/ServiceType"
import { api, state as meta3dState } from "meta3d-type"
import { getActiveArcballCameraController } from "meta3d-pipeline-editor-webgl1-view1-utils/src/CreateDefaultSceneJobUtils";
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"

let _isDragInView = ([x, y]: pointData<number>, sceneViewRect: rect) => {
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

export let update = (meta3dState: meta3dState, api: api,
    [engineWholeService, uiService]: [
        engineWholeService | engineWholeGameViewService,
        uiService
    ],
    [
        [reset, getDragOverLocation, getYaw, getPitch],
        getViewRect
    ]: any,
    [
        lastYaw,
        lastPitch
    ]: [nullable<number>, nullable<number>]
): [meta3dState, nullable<number>, nullable<number>] => {
    let { getTheta, setTheta, getPhi, setPhi } = engineWholeService.scene.arcballCameraController

    let isDebug = true
    let arcballCameraController = getActiveArcballCameraController(meta3dState, engineWholeService, isDebug)

    if (isNullable(arcballCameraController)) {
        reset()

        return [meta3dState, lastYaw, lastPitch]
    }
    else {
        arcballCameraController = getExn(arcballCameraController)
    }


    let dragOverLocation = getDragOverLocation()

    if (isNullable(dragOverLocation)
        || !_isDragInView(getExn(dragOverLocation), getExn(getViewRect(uiService,
            api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol"
            )
        )))
    ) {
        return [meta3dState, lastYaw, lastPitch]
    }

    let currentYaw = getExn(getYaw())
    let currentPitch = getExn(getPitch())

    if (_isNotTriggerEvent([lastYaw, lastPitch], [currentYaw, currentPitch])) {
        return [meta3dState, lastYaw, lastPitch]
    }


    meta3dState = setTheta(meta3dState, arcballCameraController, getExn(getTheta(meta3dState, arcballCameraController)) - currentPitch)
    meta3dState = setPhi(meta3dState, arcballCameraController, getExn(getPhi(meta3dState, arcballCameraController)) - currentYaw)

    return [meta3dState, currentYaw, currentPitch]
}