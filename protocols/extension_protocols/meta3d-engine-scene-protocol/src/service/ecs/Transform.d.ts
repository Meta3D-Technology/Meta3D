import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { transform, componentName, dataName, localPosition } from "meta3d-component-transform-protocol"
import { lookAt as lookAtTransform } from "meta3d-component-commonlib"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export type createTransform = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute,
    createComponent,
    setUsedComponentContribute,
}: engineCoreService) => [engineCoreState, transform]

export type getLocalPosition = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, transform: transform) => nullable<localPosition>

export type setLocalPosition = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setComponentData, setUsedComponentContribute }: engineCoreService, transform: transform, localPosition: localPosition) => engineCoreState

export type lookAt = (engineCoreState: engineCoreState, engineCoreService: engineCoreService, transform: transform, target: [number, number, number]) => engineCoreState