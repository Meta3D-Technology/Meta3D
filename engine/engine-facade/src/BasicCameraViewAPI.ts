import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { componentName, basicCameraView, active, dataName } from "meta3d-component-basiccameraview-protocol"

export function createBasicCameraView(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute,
    createComponent,
    setUsedComponentContribute,
}: engineCoreService): [engineCoreState, basicCameraView] {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    let data = createComponent<basicCameraView>(contribute)
    contribute = data[0]
    let basicCameraView = data[1]

    engineCoreState =
        setUsedComponentContribute(engineCoreState, contribute, componentName)

    return [
        engineCoreState,
        basicCameraView
    ]
}

export function active(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, basicCameraView: basicCameraView) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    contribute = setComponentData(contribute, basicCameraView, dataName.isActive, true)

    return setUsedComponentContribute(engineCoreState, contribute, componentName)
}