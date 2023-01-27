// import } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as meta3dState } from "meta3d-type"
import { componentName, arcballCameraController, dataName, distance, phi, theta, target, dirty } from "meta3d-component-arcballcameracontroller-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { gameObject } from "meta3d-gameobject-protocol/src/Index"

export type createArcballCameraController = (meta3dState: meta3dState) => [meta3dState, arcballCameraController]

export type getGameObjects = (meta3dState: meta3dState, arcballCameraController: arcballCameraController) => Array<gameObject>

export type getDistance = (meta3dState: meta3dState, arcballCameraController: arcballCameraController) => nullable<distance>

export type setDistance = (meta3dState: meta3dState, arcballCameraController: arcballCameraController, distance: distance) => meta3dState

export type getPhi = (meta3dState: meta3dState, arcballCameraController: arcballCameraController) => nullable<phi>

export type setPhi = (meta3dState: meta3dState, arcballCameraController: arcballCameraController, phi: phi) => meta3dState


export type getTheta = (meta3dState: meta3dState, arcballCameraController: arcballCameraController) => nullable<theta>

export type setTheta = (meta3dState: meta3dState, arcballCameraController: arcballCameraController, theta: theta) => meta3dState


export type getTarget = (meta3dState: meta3dState, arcballCameraController: arcballCameraController) => nullable<target>

export type setTarget = (meta3dState: meta3dState, arcballCameraController: arcballCameraController, target: target) => meta3dState

export type getAllDirtyArcballCameraControllers = (meta3dState: meta3dState) => Array<arcballCameraController>

export type clearDirtyList = (meta3dState: meta3dState) => meta3dState