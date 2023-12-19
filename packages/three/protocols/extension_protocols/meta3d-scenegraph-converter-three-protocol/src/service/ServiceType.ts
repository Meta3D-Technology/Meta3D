import { state as meta3dState } from "meta3d-type"
import type { Group } from "three";
import { gameObject } from "meta3d-gameobject-protocol"

export type getAllGameObjectsFunc = (meta3dState: meta3dState) => Array<gameObject>


// export type addScene = (meta3dState: meta3dState, sceneGroup: Group) => [meta3dState, gameObject]
export type addScene = (meta3dState: meta3dState, sceneGroup: Group) => [meta3dState]

export type service = {
	init: (meta3dState: meta3dState) => meta3dState,
	convert: (getAllGameObjectsFunc: getAllGameObjectsFunc, meta3dState: meta3dState) => meta3dState,
	import: addScene
}
