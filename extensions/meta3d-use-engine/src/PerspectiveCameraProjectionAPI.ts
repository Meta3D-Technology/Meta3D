import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { componentName, perspectiveCameraProjection, near, far, fovy, aspect, dataName } from "meta3d-component-perspectivecameraprojection-protocol"

export function createPerspectiveCameraProjection(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute,
    createComponent,
    setUsedComponentContribute,
}: engineCoreService): [engineCoreState, perspectiveCameraProjection] {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    let data = createComponent<perspectiveCameraProjection>(contribute)
    contribute = data[0]
    let basicCameraView = data[1]

    engineCoreState =
        setUsedComponentContribute(engineCoreState, contribute, componentName)

    return [
        engineCoreState,
        basicCameraView
    ]
}

export function setFovy(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, perspectiveCameraProjection: perspectiveCameraProjection, fovy: number) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    contribute = setComponentData(contribute, perspectiveCameraProjection, dataName.fovy, fovy)

    return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

export function setNear(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, perspectiveCameraProjection: perspectiveCameraProjection, near: number) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    contribute = setComponentData(contribute, perspectiveCameraProjection, dataName.near, near)

    return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

export function setFar(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, perspectiveCameraProjection: perspectiveCameraProjection, far: number) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    contribute = setComponentData(contribute, perspectiveCameraProjection, dataName.far, far)

    return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

export function setAspect(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, perspectiveCameraProjection: perspectiveCameraProjection, aspect: number) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    contribute = setComponentData(contribute, perspectiveCameraProjection, dataName.aspect, aspect)

    return setUsedComponentContribute(engineCoreState, contribute, componentName)
}