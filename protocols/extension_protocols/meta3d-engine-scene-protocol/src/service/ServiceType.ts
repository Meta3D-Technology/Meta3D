import { state as meta3dState } from "meta3d-type"
import {
	addBasicCameraView, addPerspectiveCameraProjection, addTransform, createGameObject
} from "./ecs/GameObject"

export type canvasSize = [number, number]

export type ecsConfig = {
	float9Array1: Float32Array,
	float32Array1: Float32Array,
	transformCount: number,
	geometryCount: number,
	geometryPointCount: number,
	pbrMaterialCount: number
}

export type service = {
	prepare: (meta3dState: meta3dState, isDebug: boolean, canvasSize: canvasSize, ecsConfig: ecsConfig) => meta3dState,
	gameObject: {
		// addBasicCameraView: addBasicCameraView, addPerspectiveCameraProjection: addPerspectiveCameraProjection, addTransform: addTransform, 
		createGameObject: createGameObject
	}
};
