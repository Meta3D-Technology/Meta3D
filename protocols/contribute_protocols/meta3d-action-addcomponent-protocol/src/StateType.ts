import type { List } from "immutable"
import { gameObject } from "meta3d-gameobject-protocol"
import { selectedIndex } from "./EventType";

export const actionName = "AddComponent"

export type uiData = selectedIndex

export enum componentType {
    CameraGroup,
    Script
}

export type state = {
    allAddedComponents: List<[componentType, gameObject]>,
}


