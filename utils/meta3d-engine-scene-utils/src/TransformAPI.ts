import { engineCoreService } from "meta3d-core-protocol/src/service/ServiceType"
import { state as meta3dState } from "meta3d-type"
import { transform, componentName, dataName, localPosition, localRotation, localScale, parent, children, localToWorldMatrix, localEulerAngles } from "meta3d-component-transform-protocol"
import { lookAt as lookAtTransform } from "meta3d-component-commonlib"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { gameObject } from "meta3d-gameobject-protocol/src/Index"
import { getExn, getWithDefault, map } from "meta3d-commonlib-ts/src/NullableUtils"
import { isValidGameObjectName } from "./Utils"

export function createTransform(meta3dState: meta3dState, { unsafeGetUsedComponentContribute,
    createComponent,
    setUsedComponentContribute,
}: engineCoreService): [meta3dState, transform] {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    let data = createComponent<transform>(contribute)
    contribute = data[0]
    let transform = data[1]

    meta3dState =
        setUsedComponentContribute(meta3dState, contribute, componentName)

    return [
        meta3dState,
        transform
    ]
}

export let getName = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, transform: transform): nullable<string> => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getComponentData<transform, string>(contribute, transform, dataName.name)
}

export let setName = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, transform: transform, name: string): meta3dState => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)


    contribute = setComponentData(contribute, transform, dataName.name, name)

    return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let getGameObjects = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentGameObjects }: engineCoreService, transform: transform): Array<gameObject> => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getComponentGameObjects<transform>(contribute, transform)
}

export let getParent = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, transform: transform): nullable<parent> => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getComponentData<transform, transform>(contribute, transform, dataName.parent)
}

export let setParent = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setComponentData, setUsedComponentContribute }: engineCoreService, transform: transform, parent: nullable<parent>) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    contribute = setComponentData(contribute, transform, dataName.parent, parent)

    return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let getChildren = (meta3dState: meta3dState, engineCoreService: engineCoreService, transform: transform): nullable<children> => {
    let { unsafeGetUsedComponentContribute, getComponentData, getGameObjectName } = engineCoreService

    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return map((children) => {
        return children.filter(child => {
            let gameObject = getGameObjects(meta3dState, engineCoreService, child)[0]

            return getWithDefault(map(isValidGameObjectName, getGameObjectName(meta3dState, gameObject)), true)
        })
    }, getComponentData<transform, children>(contribute, transform, dataName.children))
}

export let getLocalPosition = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, transform: transform): localPosition => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getExn(getComponentData<transform, localPosition>(contribute, transform, dataName.localPosition))
}

export let setLocalPosition = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setComponentData, setUsedComponentContribute }: engineCoreService, transform: transform, localPosition: localPosition) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    contribute = setComponentData(contribute, transform, dataName.localPosition, localPosition)

    return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let getLocalRotation = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, transform: transform): localRotation => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getExn(getComponentData<transform, localRotation>(contribute, transform, dataName.localRotation))
}

export let setLocalRotation = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setComponentData, setUsedComponentContribute }: engineCoreService, transform: transform, localRotation: localRotation) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    contribute = setComponentData(contribute, transform, dataName.localRotation, localRotation)

    return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let getLocalEulerAngles = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, transform: transform): localEulerAngles => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getExn(getComponentData<transform, localEulerAngles>(contribute, transform, dataName.localEulerAngles))
}

export let setLocalEulerAngles = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setComponentData, setUsedComponentContribute }: engineCoreService, transform: transform, localEulerAngles: localEulerAngles) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    contribute = setComponentData(contribute, transform, dataName.localEulerAngles, localEulerAngles)

    return setUsedComponentContribute(meta3dState, contribute, componentName)
}


export let getLocalScale = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, transform: transform): localScale => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getExn(getComponentData<transform, localScale>(contribute, transform, dataName.localScale))
}

export let setLocalScale = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setComponentData, setUsedComponentContribute }: engineCoreService, transform: transform, localScale: localScale) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    contribute = setComponentData(contribute, transform, dataName.localScale, localScale)

    return setUsedComponentContribute(meta3dState, contribute, componentName)
}


export let getLocalToWorldMatrix = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, transform: transform): localToWorldMatrix => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getExn(getComponentData<transform, localToWorldMatrix>(contribute, transform, dataName.localToWorldMatrix))
}

export let lookAt = (meta3dState: meta3dState, engineCoreService: engineCoreService, transform: transform, target: [number, number, number]) => {
    let contribute = engineCoreService.unsafeGetUsedComponentContribute(meta3dState, componentName)

    contribute = lookAtTransform(contribute, engineCoreService, transform, target)

    return engineCoreService.setUsedComponentContribute(meta3dState, contribute, componentName)
}