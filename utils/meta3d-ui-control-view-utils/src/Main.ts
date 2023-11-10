import { state as meta3dState } from "meta3d-type"
import { uiTexture } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"
import { nullable, strictNullable } from "meta3d-commonlib-ts/src/nullable"
import { rect } from "meta3d-type/src/contribute/UIControlProtocolConfigType"

export let changeToStrictlyNull = (getFBOTexture: (meta3dState: meta3dState, textureID: string) => nullable<uiTexture>, meta3dState: meta3dState, textureID: string): strictNullable<uiTexture> => {
    let uiTexture = getFBOTexture(meta3dState, textureID)
    if (isNullable(uiTexture)) {
        return null
    }

    return getExn(uiTexture)
}

export let getFBORect = (rect: rect, windowBarHeight: number) => {
    return {
        x: rect.x,
        y: rect.y + windowBarHeight,
        width: rect.width,
        height: rect.height - windowBarHeight
    }
}
