import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { componentName, basicCameraView, dataName } from "meta3d-component-basiccameraview-protocol"

export type createBasicCameraView = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute,
    createComponent,
    setUsedComponentContribute,
}: engineCoreService) => [engineCoreState, basicCameraView]

export type active = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, basicCameraView: basicCameraView) => engineCoreState