import { engineCoreService } from "meta3d-core-protocol/src/service/ServiceType"
import { state as meta3dState } from "meta3d-type"
import { componentName, perspectiveCameraProjection, near, far, fovy, aspect, dataName, pMatrix } from "meta3d-component-perspectivecameraprojection-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export function createPerspectiveCameraProjection(meta3dState: meta3dState, { unsafeGetUsedComponentContribute,
    createComponent,
    setUsedComponentContribute,
}: engineCoreService): [meta3dState, perspectiveCameraProjection] {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    let data = createComponent<perspectiveCameraProjection>(contribute)
    contribute = data[0]
    let basicCameraView = data[1]

    meta3dState =
        setUsedComponentContribute(meta3dState, contribute, componentName)

    return [
        meta3dState,
        basicCameraView
    ]
}

export let getName = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, perspectiveCameraProjection: perspectiveCameraProjection): nullable<string> => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getComponentData<perspectiveCameraProjection, string>(contribute, perspectiveCameraProjection, dataName.name)
}

export let setName = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, perspectiveCameraProjection: perspectiveCameraProjection, name: string): meta3dState => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)


    contribute = setComponentData(contribute, perspectiveCameraProjection, dataName.name, name)

    return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let getFovy = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, perspectiveCameraProjection: perspectiveCameraProjection): nullable<fovy> => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getComponentData<perspectiveCameraProjection, fovy>(contribute, perspectiveCameraProjection, dataName.fovy)
}

export let setFovy = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, perspectiveCameraProjection: perspectiveCameraProjection, fovy: number) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    contribute = setComponentData(contribute, perspectiveCameraProjection, dataName.fovy, fovy)

    return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let getNear = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, perspectiveCameraProjection: perspectiveCameraProjection): nullable<near> => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getComponentData<perspectiveCameraProjection, near>(contribute, perspectiveCameraProjection, dataName.near)
}

export let setNear = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, perspectiveCameraProjection: perspectiveCameraProjection, near: number) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    contribute = setComponentData(contribute, perspectiveCameraProjection, dataName.near, near)

    return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let getFar = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, perspectiveCameraProjection: perspectiveCameraProjection): nullable<far> => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getComponentData<perspectiveCameraProjection, far>(contribute, perspectiveCameraProjection, dataName.far)
}

export let setFar = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, perspectiveCameraProjection: perspectiveCameraProjection, far: number) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    contribute = setComponentData(contribute, perspectiveCameraProjection, dataName.far, far)

    return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let getAspect = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, perspectiveCameraProjection: perspectiveCameraProjection): nullable<aspect> => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getComponentData<perspectiveCameraProjection, aspect>(contribute, perspectiveCameraProjection, dataName.aspect)
}

export let setAspect = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, perspectiveCameraProjection: perspectiveCameraProjection, aspect: number) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    contribute = setComponentData(contribute, perspectiveCameraProjection, dataName.aspect, aspect)

    return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let getPMatrix = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, perspectiveCameraProjection: perspectiveCameraProjection): nullable<pMatrix> => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getComponentData<perspectiveCameraProjection, pMatrix>(contribute, perspectiveCameraProjection, dataName.pMatrix)
}