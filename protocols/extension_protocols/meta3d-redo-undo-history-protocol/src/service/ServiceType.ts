import { state as meta3dState } from "meta3d-type"

export type service = {
	push: (currentMeta3dState: meta3dState) => meta3dState,
	undo: (currentMeta3dState: meta3dState) => meta3dState,
	redo: (currentMeta3dState: meta3dState) => meta3dState,
};
