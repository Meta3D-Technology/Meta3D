import { gameObject } from "meta3d-gameobject-protocol"
import type { List } from "immutable"

export const actionName = "DropGlbToSceneView"

export type state = {
    importedGameObjects: List<gameObject>,
}


