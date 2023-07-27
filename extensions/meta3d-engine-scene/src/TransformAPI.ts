import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { transform, componentName, dataName, localPosition, parent, children, localToWorldMatrix } from "meta3d-component-transform-protocol"
import { lookAt as lookAtTransform } from "meta3d-component-commonlib"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { gameObject } from "meta3d-gameobject-protocol/src/Index"

export function createTransform(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute,
    createComponent,
    setUsedComponentContribute,
}: engineCoreService): [engineCoreState, transform] {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    let data = createComponent<transform>(contribute)
    contribute = data[0]
    let transform = data[1]

    engineCoreState =
        setUsedComponentContribute(engineCoreState, contribute, componentName)

    return [
        engineCoreState,
        transform
    ]
}

export function getGameObjects(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentGameObjects }: engineCoreService, transform: transform): Array<gameObject> {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    return getComponentGameObjects<transform>(contribute, transform)
}

export function getParent(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, transform: transform): nullable<parent> {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    return getComponentData<transform, transform>(contribute, transform, dataName.parent)
}

export function setParent(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setComponentData, setUsedComponentContribute }: engineCoreService, transform: transform, parent: parent) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    contribute = setComponentData(contribute, transform, dataName.parent, parent)

    return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

export function getChildren(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, transform: transform): nullable<children> {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    return getComponentData<transform, children>(contribute, transform, dataName.children)
}

export function getLocalPosition(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, transform: transform): nullable<localPosition> {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    return getComponentData<transform, localPosition>(contribute, transform, dataName.localPosition)
}

export function setLocalPosition(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setComponentData, setUsedComponentContribute }: engineCoreService, transform: transform, localPosition: localPosition) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    contribute = setComponentData(contribute, transform, dataName.localPosition, localPosition)

    return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

export function getLocalToWorldMatrix(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, transform: transform): nullable<localToWorldMatrix> {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    return getComponentData<transform, localToWorldMatrix>(contribute, transform, dataName.localToWorldMatrix)
}

export function lookAt(engineCoreState: engineCoreState, engineCoreService: engineCoreService, transform: transform, target: [number, number, number]) {
    let contribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, componentName)

    contribute = lookAtTransform(contribute, engineCoreService, transform, target)

    return engineCoreService.setUsedComponentContribute(engineCoreState, contribute, componentName)
}