import { service as engineCoreService } from "meta3d-engine-core-sceneview-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-sceneview-protocol/src/state/StateType"
import { componentName, directionLight, dataName, color, intensity } from "meta3d-component-directionlight-protocol"
import { componentName as transformComponentName } from "meta3d-component-transform-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { gameObject } from "meta3d-gameobject-protocol/src/Index"
import { getDirection as getDirectionUtils, setDirection as setDirectionUtils } from "meta3d-component-commonlib"

export function createDirectionLight(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute,
    createComponent,
    setUsedComponentContribute,
}: engineCoreService): [engineCoreState, directionLight] {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    let data = createComponent<directionLight>(contribute)
    contribute = data[0]
    let directionLight = data[1]

    engineCoreState =
        setUsedComponentContribute(engineCoreState, contribute, componentName)

    return [
        engineCoreState,
        directionLight
    ]
}

export let getName = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService,directionLight:directionLight): nullable<string> => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    return getComponentData<directionLight, string>(contribute,directionLight, dataName.name)
}

export let setName = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService,directionLight:directionLight, name: string): engineCoreState => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)


    contribute = setComponentData(contribute,directionLight, dataName.name, name)

    return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

export let getColor = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, directionLight: directionLight): nullable<color> => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    return getComponentData<directionLight, color>(contribute, directionLight, dataName.color)
}

export let setColor = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, directionLight: directionLight, color: color) => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)


    contribute = setComponentData(contribute, directionLight, dataName.color, color)

    return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

export let getIntensity = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, directionLight: directionLight): nullable<intensity> => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    return getComponentData<directionLight, intensity>(contribute, directionLight, dataName.intensity)
}

export let setIntensity = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, directionLight: directionLight, intensity: intensity) => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)


    contribute = setComponentData(contribute, directionLight, dataName.intensity, intensity)

    return setUsedComponentContribute(engineCoreState, contribute, componentName)
}


export let getDirection = (engineCoreState: engineCoreState, engineCoreService: engineCoreService, directionLight: directionLight): nullable<[number, number, number]> => {
    let { unsafeGetUsedComponentContribute } = engineCoreService

    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    return getDirectionUtils(contribute, engineCoreService,
        unsafeGetUsedComponentContribute(engineCoreState, transformComponentName), directionLight)
}

export let setDirection = (engineCoreState: engineCoreState, engineCoreService: engineCoreService, directionLight: directionLight, direction: [number, number, number]) => {
    let { unsafeGetUsedComponentContribute, setUsedComponentContribute } = engineCoreService

    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    let transformContribute = setDirectionUtils(contribute, engineCoreService,
        unsafeGetUsedComponentContribute(engineCoreState, transformComponentName), directionLight, direction)


    return setUsedComponentContribute(engineCoreState, transformContribute, transformComponentName)
}

export let getAllDirectionLights = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getAllComponents }: engineCoreService) => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    return getAllComponents<directionLight>(contribute)
}

export let getGameObjects = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentGameObjects }: engineCoreService, directionLight: directionLight): Array<gameObject> => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    return getComponentGameObjects<directionLight>(contribute, directionLight)
}