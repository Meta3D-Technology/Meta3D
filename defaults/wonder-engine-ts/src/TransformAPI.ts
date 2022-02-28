import { state as meta3dState } from "meta3d-type"
import { getExtensionStateExn, getServiceExn, setExtensionState } from "meta3d"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { transform, componentName } from "meta3d-component-transform-protocol"

function _getMeta3DEngineCoreExtensionName(): string {
    return "meta3d-engine-core"
}

export function createTransform(meta3dState: meta3dState): [meta3dState, transform] {
    let engineCoreState = getExtensionStateExn<engineCoreState>(
        meta3dState,
        _getMeta3DEngineCoreExtensionName(),
    )

    let {
        unsafeGetUsedComponentContribute,
        createComponent,
        setUsedComponentContribute,
    } = getServiceExn<engineCoreService>(
        meta3dState,
        _getMeta3DEngineCoreExtensionName()
    )

    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    let data = createComponent<transform>(contribute)
    contribute = data[0]
    let transform = data[1]

    engineCoreState =
        setUsedComponentContribute(engineCoreState, contribute, componentName)

    return [
        setExtensionState(
            meta3dState,
            _getMeta3DEngineCoreExtensionName(),
            engineCoreState
        ),
        transform
    ]
}