import { state, canvasData } from "meta3d-type"

export type configData = [canvasData, { isDebug: boolean }]

export type service = {
	run: (state: state, [canvasData, configData]: configData) => void,
};
