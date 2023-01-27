import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { componentName, arcballCameraController, dataName, distance, phi, theta, target, dirty } from "meta3d-component-arcballcameracontroller-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { gameObject } from "meta3d-gameobject-protocol/src/Index"

export type createArcballCameraController = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute,
    createComponent,
    setUsedComponentContribute,
}: engineCoreService) => [engineCoreState, arcballCameraController]

export type getGameObjects = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentGameObjects }: engineCoreService, arcballCameraController: arcballCameraController) => Array<gameObject>

export type getDistance = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, arcballCameraController: arcballCameraController) => nullable<distance>

export type setDistance = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, arcballCameraController: arcballCameraController, distance: distance) => engineCoreState

export type getPhi = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, arcballCameraController: arcballCameraController) => nullable<phi>

export type setPhi = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, arcballCameraController: arcballCameraController, phi: phi) => engineCoreState


export type getTheta = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, arcballCameraController: arcballCameraController) => nullable<theta>

export type setTheta = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, arcballCameraController: arcballCameraController, theta: theta) => engineCoreState


export type getTarget = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, arcballCameraController: arcballCameraController) => nullable<target>

export type setTarget = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, arcballCameraController: arcballCameraController, target: target) => engineCoreState

export type getAllDirtyArcballCameraControllers = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData, getAllComponents }: engineCoreService) => Array<arcballCameraController>

export type clearDirtyList = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setComponentData, getAllComponents, setUsedComponentContribute }: engineCoreService) => engineCoreState