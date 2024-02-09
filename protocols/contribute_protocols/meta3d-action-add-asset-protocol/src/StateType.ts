import type { List } from "immutable"
import { selectedIndex } from "./EventType";
import { imguiImplTexture } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"

export const actionName = "AddAsset"

export type uiData = selectedIndex

export enum assetType {
    Glb,
    Script
}

export type id = string

export type name = string

export type data = any

type icon = imguiImplTexture

export type asset = [assetType, id, name, icon, data]

export type state = {
    allAddedAssets: List<asset>,
}


