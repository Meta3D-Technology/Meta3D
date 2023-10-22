import { rect } from "meta3d-type/src/contribute/UIControlProtocolConfigType"
import { outsideImmutableDataId } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export type loadGlbUIData = null

export const uiControlName = "Asset"

export type state = null

export type inputData = {
    rect: rect,
    label: string,
}

type glbId = outsideImmutableDataId

type isRemoveAsset = boolean

type isLoadGlb = boolean

type selectedGlbId = nullable<glbId>

export type outputData = [isRemoveAsset, isLoadGlb, selectedGlbId]