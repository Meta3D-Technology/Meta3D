import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { gameObject } from "meta3d-gameobject-protocol"

export function createGameObject(engineCoreState: engineCoreState, { createGameObject }: engineCoreService): [engineCoreState, gameObject] {
    let data = createGameObject<gameObject>(engineCoreState)
    engineCoreState = data[0]
    let gameObject = data[1]

    return [
        engineCoreState,
        gameObject
    ]
}

export function getAllGameObjects(engineCoreState: engineCoreState, { getAllGameObjects }: engineCoreService): Array<gameObject> {
    return getAllGameObjects(engineCoreState)
}