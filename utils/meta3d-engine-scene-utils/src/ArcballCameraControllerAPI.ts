import { engineCoreService } from "meta3d-core-protocol/src/service/ServiceType"
import { state as meta3dState } from "meta3d-type"
import { componentName, arcballCameraController, dataName, distance, phi, theta, target, dirty, wheelSpeed } from "meta3d-component-arcballcameracontroller-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { gameObject } from "meta3d-gameobject-protocol/src/Index"

export function createArcballCameraController(meta3dState: meta3dState, { unsafeGetUsedComponentContribute,
    createComponent,
    setUsedComponentContribute,
}: engineCoreService): [meta3dState, arcballCameraController] {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    let data = createComponent<arcballCameraController>(contribute)
    contribute = data[0]
    let arcballCameraController = data[1]

    meta3dState =
        setUsedComponentContribute(meta3dState, contribute, componentName)

    return [
        meta3dState,
        arcballCameraController
    ]
}

export let getName = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, arcballCameraController: arcballCameraController): nullable<string> => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getComponentData<arcballCameraController, string>(contribute, arcballCameraController, dataName.name)
}

export let setName = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, arcballCameraController: arcballCameraController, name: string): meta3dState => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)


    contribute = setComponentData(contribute, arcballCameraController, dataName.name, name)

    return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let getGameObjects = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentGameObjects }: engineCoreService, arcballCameraController: arcballCameraController): Array<gameObject> => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getComponentGameObjects<arcballCameraController>(contribute, arcballCameraController)
}

export let getDistance = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, arcballCameraController: arcballCameraController): nullable<distance> => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getComponentData<arcballCameraController, distance>(contribute, arcballCameraController, dataName.distance)
}

export let setDistance = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, arcballCameraController: arcballCameraController, distance: distance): meta3dState => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)


    contribute = setComponentData(contribute, arcballCameraController, dataName.distance, distance)

    return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let getWheelSpeed = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, arcballCameraController: arcballCameraController): nullable<wheelSpeed> => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getComponentData<arcballCameraController, wheelSpeed>(contribute, arcballCameraController, dataName.wheelSpeed)
}

export let setWheelSpeed = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, arcballCameraController: arcballCameraController, wheelSpeed: wheelSpeed): meta3dState => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)


    contribute = setComponentData(contribute, arcballCameraController, dataName.wheelSpeed, wheelSpeed)

    return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let getPhi = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, arcballCameraController: arcballCameraController): nullable<phi> => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getComponentData<arcballCameraController, phi>(contribute, arcballCameraController, dataName.phi)
}

export let setPhi = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, arcballCameraController: arcballCameraController, phi: phi): meta3dState => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)


    contribute = setComponentData(contribute, arcballCameraController, dataName.phi, phi)

    return setUsedComponentContribute(meta3dState, contribute, componentName)
}


export let getTheta = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, arcballCameraController: arcballCameraController): nullable<theta> => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getComponentData<arcballCameraController, theta>(contribute, arcballCameraController, dataName.theta)
}

export let setTheta = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, arcballCameraController: arcballCameraController, theta: theta): meta3dState => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)


    contribute = setComponentData(contribute, arcballCameraController, dataName.theta, theta)

    return setUsedComponentContribute(meta3dState, contribute, componentName)
}


export let getTarget = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, arcballCameraController: arcballCameraController): nullable<target> => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getComponentData<arcballCameraController, target>(contribute, arcballCameraController, dataName.target)
}

export let setTarget = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, arcballCameraController: arcballCameraController, target: target): meta3dState => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)


    contribute = setComponentData(contribute, arcballCameraController, dataName.target, target)

    return setUsedComponentContribute(meta3dState, contribute, componentName)
}

// export let getAllDirtyArcballCameraControllers = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData, getAllComponents }: engineCoreService): Array<arcballCameraController>  => {
//     let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

//     return getAllComponents<arcballCameraController>(contribute).filter(arcballCameraController => {
//         return getComponentData<arcballCameraController, dirty>(contribute, arcballCameraController, dataName.dirty)
//     })
// }

// export let clearDirtyList = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setComponentData, getAllComponents, setUsedComponentContribute }: engineCoreService): meta3dState  => {
//     let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

//     contribute = getAllComponents<arcballCameraController>(contribute).reduce((contribute, arcballCameraController) => {
//         return setComponentData(contribute, arcballCameraController, dataName.dirty, false)
//     }, contribute)

//     return setUsedComponentContribute(meta3dState, contribute, componentName)
// }