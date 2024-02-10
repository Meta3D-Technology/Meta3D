import type { List } from "immutable"
import { id, selectedIndex } from "./EventType";
import { imguiImplTexture } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable";

export const actionName = "AddAsset"

export type uiData = selectedIndex

export enum assetType {
    Glb,
    Script
}

export type name = string

export type data = any

type icon = imguiImplTexture

export type asset = [assetType, id, name, icon, data]

export type state = {
    allAddedAssets: List<asset>,
    // iconMap: Map<assetType, icon>
    glbIcon: nullable<icon>,
    scriptIcon: nullable<icon>,
}


