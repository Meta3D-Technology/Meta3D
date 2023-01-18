import { state as meta3dState } from "meta3d-type"
// import { nullable } from "meta3d-commonlib-ts/src/nullable";
// import { webgl1Context } from "meta3d-webgl1-protocol/src/service/ServiceType";

// type glData = [nullable<HTMLCanvasElement>, nullable<webgl1Context>]

export type service = {
	prepare: (meta3dState: meta3dState, isDebug: boolean, canvas: HTMLCanvasElement) => meta3dState
};
