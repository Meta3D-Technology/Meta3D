import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { state as meta3dState, api } from "meta3d-type"
import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"

export type controllerType = "none" | "arcball"

export type arcballControllerValue = {
    // name: nullable<string>,
    distance: number,
    phi: number,
    theta: number,
    target: [number, number, number],
    wheelSpeed: number
}

export type controllerValue = arcballControllerValue

type gameObjectName = string

export type allControllerData = Array<[
    gameObjectName,
    controllerType,
    controllerValue
]>

export type extensionValue = { type: controllerType, value: nullable<controllerValue> }

export let buildKey = () => "Meta3D_camera_controller"

export let buildValue = (type: controllerType, value: nullable<controllerValue>): extensionValue => {
    return { type: type, value: value }
}

export let getArcballCameraControllerValue = (engineSceneService: engineSceneService, meta3dState: meta3dState, gameObject): arcballControllerValue => {
    let arcballCameraControllerComponent = engineSceneService.gameObject.getArcballCameraController(meta3dState, gameObject)

    return {
        // name: engineSceneService.arcballCameraController.getName(meta3dState, arcballCameraControllerComponent),
        distance: engineSceneService.arcballCameraController.getDistance(meta3dState, arcballCameraControllerComponent),
        phi: engineSceneService.arcballCameraController.getPhi(meta3dState, arcballCameraControllerComponent),
        theta: engineSceneService.arcballCameraController.getTheta(meta3dState, arcballCameraControllerComponent),
        target: engineSceneService.arcballCameraController.getTarget(meta3dState, arcballCameraControllerComponent),
        wheelSpeed: engineSceneService.arcballCameraController.getWheelSpeed(meta3dState, arcballCameraControllerComponent),
    }
}