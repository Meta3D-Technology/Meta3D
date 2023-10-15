import { outsideImmutableDataId } from "meta3d-event-sourcing-protocol/src/service/ServiceType"

export const eventName = "LoadGLBEvent"

type glb = ArrayBuffer

type glbId = outsideImmutableDataId

export type inputData = [glb, glbId]