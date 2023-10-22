import { outsideImmutableDataId } from "meta3d-event-sourcing-protocol/src/service/ServiceType"

export const eventName = "RemoveAssetEvent"

export type glbId = outsideImmutableDataId

export type inputData = [glbId]