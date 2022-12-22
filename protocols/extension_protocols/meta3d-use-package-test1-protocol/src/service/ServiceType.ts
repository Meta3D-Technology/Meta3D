import { state as meta3dState } from "meta3d-type"

export type service = {
	run: (meta3dState: meta3dState) => void
};
