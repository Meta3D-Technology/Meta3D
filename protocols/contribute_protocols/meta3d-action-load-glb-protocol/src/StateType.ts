import type { List } from "immutable"
import { outsideImmutableDataId } from "meta3d-event-sourcing-protocol/src/service/ServiceType"

export const actionName = "LoadGLB"

export type uiData = null

export type state = {
    addedGLBIds: List<outsideImmutableDataId>,
}


