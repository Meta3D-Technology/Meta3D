import { state as meta3dState } from "meta3d-type"
import { state } from "../state/StateType";

export type service = {
	log: (state: state) => void,
	registerInfo: (state: state, meta3dState: meta3dState) => state
};
