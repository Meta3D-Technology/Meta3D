import { state as meta3dState } from "meta3d-type"
import { getExtensionStateExn, getServiceExn, setExtensionState } from "meta3d"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { gameObject } from "meta3d-gameobject-protocol"

function _getMeta3DEngineCoreExtensionName(): string {
    return "meta3d-engine-core"
}

export function createGameObject(meta3dState: meta3dState): [meta3dState, gameObject] {
    let engineCoreState = getExtensionStateExn<engineCoreState>(
        meta3dState,
        _getMeta3DEngineCoreExtensionName(),
    )

    let { createGameObject } = getServiceExn<engineCoreService>(
        meta3dState,
        _getMeta3DEngineCoreExtensionName()
    )

    let data = createGameObject<gameObject>(engineCoreState)
    engineCoreState = data[0]
    let gameObject = data[1]

    return [
        setExtensionState(
            meta3dState,
            _getMeta3DEngineCoreExtensionName(),
            engineCoreState
        ),
        gameObject
    ]
}

export function getAllGameObjects(meta3dState: meta3dState): Array<gameObject> {
    let engineCoreState = getExtensionStateExn<engineCoreState>(
        meta3dState,
        _getMeta3DEngineCoreExtensionName(),
    )

    let { getAllGameObjects } = getServiceExn<engineCoreService>(
        meta3dState,
        _getMeta3DEngineCoreExtensionName()
    )

    return getAllGameObjects(engineCoreState)
}