import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { transform, componentName, dataName, localPosition } from "meta3d-component-transform-protocol"
import { lookAt as lookAtTransform } from "meta3d-component-commonlib"

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

export function setLocalPosition(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setComponentData, setUsedComponentContribute }: engineCoreService, transform: transform, localPosition: localPosition) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    contribute = setComponentData(contribute, transform, dataName.localPosition, localPosition)

    return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

export function lookAt(engineCoreState: engineCoreState, engineCoreService: engineCoreService, transform: transform, target: [number, number, number]) {
    let contribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, componentName)

    contribute = lookAtTransform(contribute, engineCoreService, transform, target)

    return engineCoreService.setUsedComponentContribute(engineCoreState, contribute, componentName)
}