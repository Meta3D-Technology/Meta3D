import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { gameObject } from "meta3d-gameobject-protocol"
import { transform, componentName as transformComponentName } from "meta3d-component-transform-protocol"

export function createGameObject(engineCoreState: engineCoreState, { createGameObject }: engineCoreService): [engineCoreState, gameObject] {
    let contribute = createGameObject(engineCoreState)
    engineCoreState = contribute[0]
    let gameObject = contribute[1]

    return [
        engineCoreState,
        gameObject
    ]
}

export function addTransform(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }: engineCoreService, gameObject: gameObject, transform: transform) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, transformComponentName)

    return setUsedComponentContribute(engineCoreState, addComponent(contribute, gameObject, transform), transformComponentName)
}