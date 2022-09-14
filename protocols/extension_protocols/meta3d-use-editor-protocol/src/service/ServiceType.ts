import { state } from "meta3d-type"

export type service = {
	run: (state: state) => void,
};
