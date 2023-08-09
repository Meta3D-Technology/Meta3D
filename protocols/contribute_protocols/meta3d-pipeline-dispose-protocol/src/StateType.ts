import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"

export const pipelineName = "Dispose"

export type state = {
    mostService: mostService
}

export type states = {
    [pipelineName]: state
}
