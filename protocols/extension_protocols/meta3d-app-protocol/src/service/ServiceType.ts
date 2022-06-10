import { state } from "meta3d-type/src/Index"

export type service = {
	run: (state: state) => state,
};
