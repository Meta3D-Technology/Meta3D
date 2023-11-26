import { outsideImmutableDataId } from "meta3d-event-sourcing-protocol/src/service/ServiceType"

export const eventName = "SelectAssetEvent"

export type fileId = outsideImmutableDataId

export type inputData = [fileId]