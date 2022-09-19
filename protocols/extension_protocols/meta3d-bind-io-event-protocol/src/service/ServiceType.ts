import { state as meta3dState } from "meta3d-type"
import { ioData } from "meta3d-ui-protocol/src/state/StateType"

export type service = {
	bindIOEvent: (meta3dState: meta3dState) => void,
	getIOData: () => ioData,
	resetIOData: () => void
};
