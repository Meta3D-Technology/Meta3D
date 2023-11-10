import { bind, getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils";
import { nullable } from "meta3d-commonlib-ts/src/nullable";
import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { api, state as meta3dState } from "meta3d-type"
// import { getDragOverLocation, getPitch, getTarget, getWheel, getYaw, target } from "meta3d-pipeline-utils/src/ArcballCameraControllerEventUtils";
import { target } from "./Type";
import { arcballCameraController } from "meta3d-component-arcballcameracontroller-protocol";

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

let _getActiveArcballCameraController = (meta3dState: meta3dState,
    engineSceneService: engineSceneService,
    isDebug: boolean
): nullable<arcballCameraController> => {
    return bind((basicCameraView) => {
        let gameObject = engineSceneService.basicCameraView.getGameObjects(meta3dState, basicCameraView)[0]

        if (engineSceneService.gameObject.hasArcballCameraController(meta3dState, gameObject)) {
            return engineSceneService.gameObject.getArcballCameraController(meta3dState, gameObject)
        }

        return null
    }, engineSceneService.basicCameraView.getActiveCameraView(meta3dState, isDebug))
}

export let update = (meta3dState: meta3dState,
    [
        getDragOverLocation, getPitch, getTarget, getWheel, getYaw
    ]: any,
    engineSceneService: engineSceneService,
    target: target,
    isEventStop: boolean,
    [
        lastYaw,
        lastPitch
    ]: [nullable<number>, nullable<number>]
): [meta3dState, nullable<number>, nullable<number>] => {
    let { getTheta, setTheta, getPhi, setPhi, getDistance, setDistance, getWheelSpeed } = engineSceneService.arcballCameraController

    let isDebug = true
    let arcballCameraController = _getActiveArcballCameraController(meta3dState, engineSceneService, isDebug)

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