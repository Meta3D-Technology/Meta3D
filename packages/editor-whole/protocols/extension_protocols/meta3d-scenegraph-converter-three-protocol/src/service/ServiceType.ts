import { state as meta3dState } from "meta3d-type"
import type { Group } from "three";
import { state } from "../state/StateType"
import { gameObject } from "meta3d-gameobject-protocol"

export type getAllGameObjectsFunc = (meta3dState: meta3dState) => Array<gameObject>

export type service = {
	init: (meta3dState: meta3dState) => meta3dState,
	convert: (getAllGameObjectsFunc: getAllGameObjectsFunc, meta3dState: meta3dState) => state,
	import: (meta3dState: meta3dState, sceneGroup: Group) => [meta3dState, gameObject]
}
