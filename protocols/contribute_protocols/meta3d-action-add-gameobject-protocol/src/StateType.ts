import { gameObject } from "meta3d-gameobject-protocol"
import * as EventType from "./EventType";
import type { List } from "immutable"

export const actionName = "AddGameObject"

export type uiData = EventType.selectedIndex

export enum gameObjectType {
    EmptyGameObject,
    Cube
}

export type state = {
    addedGameObjects: List<[gameObjectType, gameObject]>,
}


