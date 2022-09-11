import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { transform, componentName, dataName, localPosition } from "meta3d-component-transform-protocol"

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

export function getLocalPosition(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, transform: transform) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    return getComponentData(contribute, transform, dataName.localPosition)
}

export function setLocalPosition(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setComponentData, setUsedComponentContribute }: engineCoreService, transform: transform, localPosition: localPosition) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    contribute = setComponentData(contribute, transform, dataName.localPosition, localPosition)

    return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

