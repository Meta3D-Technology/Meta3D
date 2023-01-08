import { state as meta3dState } from "meta3d-type"
import {
	addBasicCameraView, addPerspectiveCameraProjection, addTransform, createGameObject
} from "./ecs/GameObject"

type ecsConfig = {
	float9Array1: Float32Array,
	float32Array1: Float32Array,
	transformCount: number,
	geometryCount: number,
	geometryPointCount: number,
	pbrMaterialCount: number
}

export type service = {
	init: (meta3dState: meta3dState, isDebug: boolean, canvasSize: [number, number], ecsConfig: ecsConfig) => meta3dState,
	gameObject: {
		addBasicCameraView: addBasicCameraView, addPerspectiveCameraProjection: addPerspectiveCameraProjection, addTransform: addTransform, createGameObject: createGameObject
	}
};
