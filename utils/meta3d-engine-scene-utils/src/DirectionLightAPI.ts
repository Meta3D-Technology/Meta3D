import { engineCoreService } from "meta3d-core-protocol/src/service/ServiceType"
import { state as meta3dState } from "meta3d-type"
import { componentName, directionLight, dataName, color, intensity } from "meta3d-component-directionlight-protocol"
import { componentName as transformComponentName } from "meta3d-component-transform-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { gameObject } from "meta3d-gameobject-protocol/src/Index"
import { getDirection as getDirectionUtils, setDirection as setDirectionUtils } from "meta3d-component-commonlib"

export function createDirectionLight(meta3dState: meta3dState, { unsafeGetUsedComponentContribute,
    createComponent,
    setUsedComponentContribute,
}: engineCoreService): [meta3dState, directionLight] {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    let data = createComponent<directionLight>(contribute)
    contribute = data[0]
    let directionLight = data[1]

    meta3dState =
        setUsedComponentContribute(meta3dState, contribute, componentName)

    return [
        meta3dState,
        directionLight
    ]
}

export let getName = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, directionLight: directionLight): nullable<string> => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getComponentData<directionLight, string>(contribute, directionLight, dataName.name)
}

export let setName = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, directionLight: directionLight, name: string): meta3dState => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)


    contribute = setComponentData(contribute, directionLight, dataName.name, name)

    return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let getColor = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, directionLight: directionLight): nullable<color> => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getComponentData<directionLight, color>(contribute, directionLight, dataName.color)
}

export let setColor = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, directionLight: directionLight, color: color) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)


    contribute = setComponentData(contribute, directionLight, dataName.color, color)

    return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let getIntensity = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, directionLight: directionLight): nullable<intensity> => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getComponentData<directionLight, intensity>(contribute, directionLight, dataName.intensity)
}

export let setIntensity = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, directionLight: directionLight, intensity: intensity) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)


    contribute = setComponentData(contribute, directionLight, dataName.intensity, intensity)

    return setUsedComponentContribute(meta3dState, contribute, componentName)
}


export let getDirection = (meta3dState: meta3dState, engineCoreService: engineCoreService, directionLight: directionLight): nullable<[number, number, number]> => {
    let { unsafeGetUsedComponentContribute } = engineCoreService

    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getDirectionUtils(contribute, engineCoreService,
        unsafeGetUsedComponentContribute(meta3dState, transformComponentName), directionLight)
}

export let setDirection = (meta3dState: meta3dState, engineCoreService: engineCoreService, directionLight: directionLight, direction: [number, number, number]) => {
    let { unsafeGetUsedComponentContribute, setUsedComponentContribute } = engineCoreService

    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    let transformContribute = setDirectionUtils(contribute, engineCoreService,
        unsafeGetUsedComponentContribute(meta3dState, transformComponentName), directionLight, direction)


    return setUsedComponentContribute(meta3dState, transformContribute, transformComponentName)
}

// export let getAllDirectionLights = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getAllComponents }: engineCoreService) => {
//     let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

//     return getAllComponents<directionLight>(contribute)
// }

export let getGameObjects = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentGameObjects }: engineCoreService, directionLight: directionLight): Array<gameObject> => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getComponentGameObjects<directionLight>(contribute, directionLight)
}