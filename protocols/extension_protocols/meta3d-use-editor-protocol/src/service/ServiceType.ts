import { state, canvasData } from "meta3d-type"

export type configData = [canvasData, { isDebug: boolean, clearColor: [number, number, number, number], skinName: string }]

export type service = {
	run: (state: state, [canvasData, configData]: configData) => void,
};
