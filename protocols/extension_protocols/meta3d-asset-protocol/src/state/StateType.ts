import type { List } from "immutable"
import { outsideImmutableDataId } from "meta3d-event-sourcing-protocol/src/service/ServiceType"

export type glb = ArrayBuffer

export type state = {
    allGLBAssets: List<[outsideImmutableDataId, glb]>
}