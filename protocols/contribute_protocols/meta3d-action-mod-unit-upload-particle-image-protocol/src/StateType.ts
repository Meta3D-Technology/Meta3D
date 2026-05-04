import type { Map } from "immutable"

export const actionName = "UnitModUploadParticleImage"

export type uiData = null

export type base64 = string

export type state = {
    images: Map<string, base64>
}


