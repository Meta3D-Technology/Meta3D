import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"

export const workPluginName: string

export type state = {
    mostService: mostService
}

export type states = { "Root": state }

export type config = mostService