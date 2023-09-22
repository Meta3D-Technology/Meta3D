import { service as engineCoreService } from "meta3d-engine-core-sceneview-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-sceneview-protocol/src/state/StateType"
import { componentName, perspectiveCameraProjection, near, far, fovy, aspect, dataName, pMatrix } from "meta3d-component-perspectivecameraprojection-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

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

export let getFovy = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, perspectiveCameraProjection: perspectiveCameraProjection): nullable<fovy>  => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    return getComponentData<perspectiveCameraProjection, fovy>(contribute, perspectiveCameraProjection, dataName.fovy)
}

export let setFovy = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, perspectiveCameraProjection: perspectiveCameraProjection, fovy: number) =>  {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    contribute = setComponentData(contribute, perspectiveCameraProjection, dataName.fovy, fovy)

    return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

export let getNear = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, perspectiveCameraProjection: perspectiveCameraProjection): nullable<near>  => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    return getComponentData<perspectiveCameraProjection, near>(contribute, perspectiveCameraProjection, dataName.near)
}

export let setNear = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, perspectiveCameraProjection: perspectiveCameraProjection, near: number) =>  {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    contribute = setComponentData(contribute, perspectiveCameraProjection, dataName.near, near)

    return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

export let getFar = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, perspectiveCameraProjection: perspectiveCameraProjection): nullable<far>  => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    return getComponentData<perspectiveCameraProjection, far>(contribute, perspectiveCameraProjection, dataName.far)
}

export let setFar = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, perspectiveCameraProjection: perspectiveCameraProjection, far: number) =>  {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    contribute = setComponentData(contribute, perspectiveCameraProjection, dataName.far, far)

    return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

export let getAspect = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, perspectiveCameraProjection: perspectiveCameraProjection): nullable<aspect>  => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    return getComponentData<perspectiveCameraProjection, aspect>(contribute, perspectiveCameraProjection, dataName.aspect)
}

export let setAspect = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, perspectiveCameraProjection: perspectiveCameraProjection, aspect: number) =>  {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    contribute = setComponentData(contribute, perspectiveCameraProjection, dataName.aspect, aspect)

    return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

export let getPMatrix = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, perspectiveCameraProjection: perspectiveCameraProjection): nullable<pMatrix>  => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

    return getComponentData<perspectiveCameraProjection, pMatrix>(contribute, perspectiveCameraProjection, dataName.pMatrix)
}