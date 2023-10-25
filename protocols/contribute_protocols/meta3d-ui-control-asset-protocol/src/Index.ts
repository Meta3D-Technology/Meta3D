import { rect } from "meta3d-type/src/contribute/UIControlProtocolConfigType"
// import { outsideImmutableDataId } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
// import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { imguiImplTexture } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"

export type loadGlbUIData = null

export const uiControlName = "Asset"

export type state = {
    loadGlbTexture: imguiImplTexture,
    removeAssetTexture: imguiImplTexture,
    glbTexture: imguiImplTexture,
}

export type inputData = {
    rect: rect,
    label: string,
}

// type glbId = outsideImmutableDataId

// type isRemoveAsset = boolean

// type isLoadGlb = boolean

// type selectedGlbId = nullable<glbId>

export type outputData = null