import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"

export const workPluginName = "Root"

export type state = { mostService: mostService }

export type states = { [workPluginName]: state }
