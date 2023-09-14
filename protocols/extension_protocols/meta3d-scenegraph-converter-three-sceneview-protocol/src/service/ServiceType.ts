import { state as meta3dState } from "meta3d-type"
import type { Group } from "three";
import { state } from "../state/StateType"

export type service = {
	init: (meta3dState: meta3dState) => meta3dState,
	convert: (meta3dState: meta3dState) => state,
	import: (meta3dState: meta3dState, sceneGroup: Group) => meta3dState
}
