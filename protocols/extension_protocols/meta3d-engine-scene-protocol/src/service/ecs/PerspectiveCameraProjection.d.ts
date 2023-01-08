import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { componentName, perspectiveCameraProjection, near, far, fovy, aspect, dataName } from "meta3d-component-perspectivecameraprojection-protocol"

export type createPerspectiveCameraProjection = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute,
    createComponent,
    setUsedComponentContribute,
}: engineCoreService) => [engineCoreState, perspectiveCameraProjection]

export type setFovy = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, perspectiveCameraProjection: perspectiveCameraProjection, fovy: number) => engineCoreState

export type setNear = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, perspectiveCameraProjection: perspectiveCameraProjection, near: number) => engineCoreState

export type setFar = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, perspectiveCameraProjection: perspectiveCameraProjection, far: number) => engineCoreState

export type setAspect = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, perspectiveCameraProjection: perspectiveCameraProjection, aspect: number) => engineCoreState