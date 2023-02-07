import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { componentName, arcballCameraController, dataName, distance, phi, theta, target, dirty } from "meta3d-component-arcballcameracontroller-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { gameObject } from "meta3d-gameobject-protocol/src/Index"

export function createArcballCameraController(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute,
    createComponent,
    setUsedComponentContribute,
}: engineCoreService): [engineCoreState, arcballCameraController] {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    let data = createComponent<arcballCameraController>(contribute)
    contribute = data[0]
    let arcballCameraController = data[1]

    engineCoreState =
        setUsedComponentContribute(engineCoreState, contribute, componentName)

    return [
        engineCoreState,
        arcballCameraController
    ]
}

export function getGameObjects(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentGameObjects }: engineCoreService, arcballCameraController: arcballCameraController): Array<gameObject> {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    return getComponentGameObjects<arcballCameraController>(contribute, arcballCameraController)
}

export function getDistance(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, arcballCameraController: arcballCameraController): nullable<distance> {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    return getComponentData<arcballCameraController, distance>(contribute, arcballCameraController, dataName.distance)
}

export function setDistance(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, arcballCameraController: arcballCameraController, distance: distance): engineCoreState {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)


    contribute = setComponentData(contribute, arcballCameraController, dataName.distance, distance)

    return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

export function getPhi(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, arcballCameraController: arcballCameraController): nullable<phi> {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    return getComponentData<arcballCameraController, phi>(contribute, arcballCameraController, dataName.phi)
}

export function setPhi(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, arcballCameraController: arcballCameraController, phi: phi): engineCoreState {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)


    contribute = setComponentData(contribute, arcballCameraController, dataName.phi, phi)

    return setUsedComponentContribute(engineCoreState, contribute, componentName)
}


export function getTheta(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, arcballCameraController: arcballCameraController): nullable<theta> {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    return getComponentData<arcballCameraController, theta>(contribute, arcballCameraController, dataName.theta)
}

export function setTheta(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, arcballCameraController: arcballCameraController, theta: theta): engineCoreState {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)


    contribute = setComponentData(contribute, arcballCameraController, dataName.theta, theta)

    return setUsedComponentContribute(engineCoreState, contribute, componentName)
}


export function getTarget(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, arcballCameraController: arcballCameraController): nullable<target> {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    return getComponentData<arcballCameraController, target>(contribute, arcballCameraController, dataName.target)
}

export function setTarget(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, arcballCameraController: arcballCameraController, target: target): engineCoreState {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)


    contribute = setComponentData(contribute, arcballCameraController, dataName.target, target)

    return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

// export function getAllDirtyArcballCameraControllers(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData, getAllComponents }: engineCoreService): Array<arcballCameraController> {
//     let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

//     return getAllComponents<arcballCameraController>(contribute).filter(arcballCameraController => {
//         return getComponentData<arcballCameraController, dirty>(contribute, arcballCameraController, dataName.dirty)
//     })
// }

// export function clearDirtyList(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setComponentData, getAllComponents, setUsedComponentContribute }: engineCoreService): engineCoreState {
//     let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

//     contribute = getAllComponents<arcballCameraController>(contribute).reduce((contribute, arcballCameraController) => {
//         return setComponentData(contribute, arcballCameraController, dataName.dirty, false)
//     }, contribute)

//     return setUsedComponentContribute(engineCoreState, contribute, componentName)
// }