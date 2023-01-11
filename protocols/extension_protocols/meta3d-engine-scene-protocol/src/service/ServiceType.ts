import { state as meta3dState } from "meta3d-type"
import {
	addBasicCameraView, addGeometry, addPBRMaterial, addPerspectiveCameraProjection, addTransform, cloneGameObject, createGameObject, disposeGameObjectBasicCameraViewComponent, disposeGameObjectGeometryComponent, disposeGameObjectPBRMaterialComponent, disposeGameObjectPerspectiveCameraProjectionComponent, disposeGameObjects, disposeGameObjectTransformComponent, getAllGameObjects, getBasicCameraView, getGeometry, getNeedDisposedGameObjects, getPBRMaterial, getPerspectiveCameraProjection, getTransform, hasBasicCameraView, hasGeometry, hasPBRMaterial, hasPerspectiveCameraProjection, hasTransform
} from "./ecs/GameObject"
import { createTransform, getLocalPosition, lookAt, setLocalPosition } from "./ecs/Transform";
import { createPerspectiveCameraProjection, setAspect, setFar, setFovy, setNear } from "./ecs/PerspectiveCameraProjection";
import { createPBRMaterial, getAllPBRMaterials, setDiffuseColor } from "./ecs/PBRMaterial";
import { createGeometry, setIndices, setVertices } from "./ecs/Geometry";
import { createBasicCameraView, active } from "./ecs/BasicCameraView";

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
		createGameObject: createGameObject,
		getAllGameObjects: getAllGameObjects,
		getTransform: getTransform,
		addTransform: addTransform,
		hasTransform: hasTransform,
		getGeometry: getGeometry,
		addGeometry: addGeometry,
		hasGeometry: hasGeometry,
		getPBRMaterial: getPBRMaterial,
		addPBRMaterial: addPBRMaterial,
		hasPBRMaterial: hasPBRMaterial,
		getBasicCameraView: getBasicCameraView,
		addBasicCameraView: addBasicCameraView,
		hasBasicCameraView: hasBasicCameraView,
		getPerspectiveCameraProjection: getPerspectiveCameraProjection, addPerspectiveCameraProjection: addPerspectiveCameraProjection,
		hasPerspectiveCameraProjection: hasPerspectiveCameraProjection,
		cloneGameObject: cloneGameObject,
		getNeedDisposedGameObjects: getNeedDisposedGameObjects,
		disposeGameObjects: disposeGameObjects,
		disposeGameObjectTransformComponent: disposeGameObjectTransformComponent,
		disposeGameObjectPBRMaterialComponent: disposeGameObjectPBRMaterialComponent,
		disposeGameObjectGeometryComponent: disposeGameObjectGeometryComponent,
		disposeGameObjectBasicCameraViewComponent: disposeGameObjectBasicCameraViewComponent,
		disposeGameObjectPerspectiveCameraProjectionComponent: disposeGameObjectPerspectiveCameraProjectionComponent
	},
	transform: {
		createTransform: createTransform,
		getLocalPosition: getLocalPosition,
		setLocalPosition: setLocalPosition,
		lookAt: lookAt,
	},
	perspectiveCameraProjection: {
		createPerspectiveCameraProjection: createPerspectiveCameraProjection,
		setFovy: setFovy,
		setNear: setNear,
		setFar: setFar,
		setAspect: setAspect
	},
	pbrMaterial: {
		createPBRMaterial: createPBRMaterial,
		setDiffuseColor: setDiffuseColor,
		getAllPBRMaterials: getAllPBRMaterials
	},
	geometry: {
		createGeometry: createGeometry,
		setVertices: setVertices,
		setIndices: setIndices
	},
	basicCameraView: {
		createBasicCameraView: createBasicCameraView,
		active: active
	}
};
