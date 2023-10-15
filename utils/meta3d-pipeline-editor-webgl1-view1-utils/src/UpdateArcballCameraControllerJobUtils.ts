import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils";
import { nullable } from "meta3d-commonlib-ts/src/nullable";
import { service as engineWholeService } from "meta3d-engine-whole-sceneview-protocol/src/service/ServiceType"
import { service as engineWholeGameViewService } from "meta3d-engine-whole-gameview-protocol/src/service/ServiceType"
import { api, state as meta3dState } from "meta3d-type"
import { getActiveArcballCameraController } from "meta3d-pipeline-editor-webgl1-view1-utils/src/CreateDefaultSceneJobUtils";
import { getDragOverLocation, getPitch, getTarget, getWheel, getYaw, target } from "meta3d-pipeline-utils/src/ArcballCameraControllerEventUtils";

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

export let update = <engineWholeService_ extends engineWholeService | engineWholeGameViewService>(meta3dState: meta3dState, api: api,
    engineWholeService: engineWholeService_,
    target: target,
    isEventStop: boolean,
    [
        lastYaw,
        lastPitch
    ]: [nullable<number>, nullable<number>]
): [meta3dState, nullable<number>, nullable<number>] => {
    let { getTheta, setTheta, getPhi, setPhi, getDistance, setDistance, getWheelSpeed } = engineWholeService.scene.arcballCameraController

    let isDebug = true
    let arcballCameraController = getActiveArcballCameraController(meta3dState, engineWholeService, isDebug)

    if (isNullable(arcballCameraController)) {
        return [meta3dState, lastYaw, lastPitch]
    }
    else {
        arcballCameraController = getExn(arcballCameraController)
    }

    if (isEventStop || getTarget() != target) {
        return [meta3dState, lastYaw, lastPitch]
    }

    let wheel = getWheel()

    meta3dState = setDistance(meta3dState, arcballCameraController,
        getExn(getDistance(meta3dState, arcballCameraController)) - getExn(getWheelSpeed(meta3dState, arcballCameraController)) * wheel)

    let dragOverLocation = getDragOverLocation()

    if (isNullable(dragOverLocation)) {
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