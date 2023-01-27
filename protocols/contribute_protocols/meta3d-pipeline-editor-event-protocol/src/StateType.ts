import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"

export const pipelineName = "Editor_Event"

export type state = {
    mostService: mostService,
    eventService: eventService,
    meta3dEventExtensionProtocolName: string
}

export type states = {
    [pipelineName]: state
}
