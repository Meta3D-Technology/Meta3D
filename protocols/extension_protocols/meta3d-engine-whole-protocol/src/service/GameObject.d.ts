import { state as meta3dState } from "meta3d-type"
import { gameObject } from "meta3d-gameobject-protocol"

export type createGameObject = (meta3dState: meta3dState) => [meta3dState, gameObject]