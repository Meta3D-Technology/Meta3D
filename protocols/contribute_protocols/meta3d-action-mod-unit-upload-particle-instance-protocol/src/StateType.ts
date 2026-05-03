import type { Map } from "immutable"
import { glbData, glbName } from "./EventType"

export const actionName = "UnitModUploadParticleInstance"

export type uiData = null

export type state = {
    instances: Map<string, [glbName, glbData]>
}


