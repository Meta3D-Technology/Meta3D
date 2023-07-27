import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { componentName, basicCameraView, dataName } from "meta3d-component-basiccameraview-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { getViewWorldToCameraMatrix as getViewWorldToCameraMatrixUtils, getActiveCameraView as getActiveCameraViewUtils } from "meta3d-component-commonlib"
import { componentName as transformComponentName } from "meta3d-component-transform-protocol"
import { gameObject } from "meta3d-gameobject-protocol/src/Index"

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

export function getGameObjects(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentGameObjects }: engineCoreService, basicCameraView: basicCameraView): Array<gameObject> {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    return getComponentGameObjects<basicCameraView>(contribute, basicCameraView)
}

export function active(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, basicCameraView: basicCameraView) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    contribute = setComponentData(contribute, basicCameraView, dataName.isActive, true)

    return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

export function getViewWorldToCameraMatrix(engineCoreState: engineCoreState, engineCoreService: engineCoreService, basicCameraView: basicCameraView): nullable<Float32Array> {
    let { unsafeGetUsedComponentContribute } = engineCoreService

    return getViewWorldToCameraMatrixUtils(
        unsafeGetUsedComponentContribute(engineCoreState, componentName),
        engineCoreService,
        unsafeGetUsedComponentContribute(engineCoreState, transformComponentName),
        basicCameraView
    )
}

export function getActiveCameraView(engineCoreState: engineCoreState, engineCoreService: engineCoreService, isDebug: boolean): nullable<basicCameraView> {
    let { unsafeGetUsedComponentContribute } = engineCoreService

    return getActiveCameraViewUtils(
        unsafeGetUsedComponentContribute(engineCoreState, componentName),
        engineCoreService,
        isDebug
    )
}