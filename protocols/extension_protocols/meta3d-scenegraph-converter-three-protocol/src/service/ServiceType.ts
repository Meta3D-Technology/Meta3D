import { state as meta3dState } from "meta3d-type"
import { state } from "../state/StateType"

export type service = {
	convert: (meta3dState: meta3dState) => state
};
