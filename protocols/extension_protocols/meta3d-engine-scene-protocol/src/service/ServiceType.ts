import { state as meta3dState } from "meta3d-type"
import {
	addBasicCameraView, addGeometry, addPBRMaterial, addPerspectiveCameraProjection, addTransform, addArcballCameraController, cloneGameObject, createGameObject,
	disposeGameObjectArcballCameraControllerComponent,
	disposeGameObjectBasicCameraViewComponent, disposeGameObjectGeometryComponent, disposeGameObjectPBRMaterialComponent, disposeGameObjectPerspectiveCameraProjectionComponent, disposeGameObjects, disposeGameObjectTransformComponent, getAllGameObjects,
	getArcballCameraController,
	getBasicCameraView, getGeometry, getNeedDisposedGameObjects, getPBRMaterial, getPerspectiveCameraProjection, getTransform,
	hasArcballCameraController,
	hasBasicCameraView, hasGeometry, hasPBRMaterial, hasPerspectiveCameraProjection, hasTransform
} from "./ecs/GameObject"
import { createTransform, getLocalPosition, lookAt, setLocalPosition } from "./ecs/Transform";
import { createPerspectiveCameraProjection, setAspect, setFar, setFovy, setNear } from "./ecs/PerspectiveCameraProjection";
import { createPBRMaterial, getAllPBRMaterials, setDiffuseColor } from "./ecs/PBRMaterial";
import { createGeometry, setIndices, setVertices } from "./ecs/Geometry";
import { createBasicCameraView, active } from "./ecs/BasicCameraView";
import {
	createArcballCameraController,
	// getAllDirtyArcballCameraControllers, clearDirtyList,
	getDistance, setDistance, getPhi, setPhi, getTheta, setTheta, getTarget, setTarget, getGameObjects
} from "./ecs/ArcballCameraController"

export type ecsConfig = {
	float9Array1: Float32Array,
	float32Array1: Float32Array,
	transformCount: number,
	geometryCount: number,
	geometryPointCount: number,
	pbrMaterialCount: number
}

export type service = {
	prepare: (meta3dState: meta3dState, isDebug: boolean, ecsConfig: ecsConfig) => meta3dState,
	gameObject: {
		addBasicCameraView: addBasicCameraView,
		addGeometry: addGeometry,
		addPBRMaterial: addPBRMaterial,
		addPerspectiveCameraProjection: addPerspectiveCameraProjection,
		addTransform: addTransform,
		addArcballCameraController: addArcballCameraController,
		cloneGameObject: cloneGameObject,
		createGameObject: createGameObject,

		disposeGameObjectArcballCameraControllerComponent: disposeGameObjectArcballCameraControllerComponent,

		disposeGameObjectBasicCameraViewComponent: disposeGameObjectBasicCameraViewComponent,
		disposeGameObjectGeometryComponent: disposeGameObjectGeometryComponent,
		disposeGameObjectPBRMaterialComponent: disposeGameObjectPBRMaterialComponent,
		disposeGameObjectPerspectiveCameraProjectionComponent: disposeGameObjectPerspectiveCameraProjectionComponent,
		disposeGameObjects: disposeGameObjects,
		disposeGameObjectTransformComponent: disposeGameObjectTransformComponent,
		getAllGameObjects: getAllGameObjects,

		getArcballCameraController: getArcballCameraController,

		getBasicCameraView: getBasicCameraView,
		getGeometry: getGeometry,
		getNeedDisposedGameObjects: getNeedDisposedGameObjects,
		getPBRMaterial: getPBRMaterial,
		getPerspectiveCameraProjection: getPerspectiveCameraProjection,
		getTransform: getTransform,

		hasArcballCameraController: hasArcballCameraController,
		hasBasicCameraView: hasBasicCameraView,
		hasGeometry: hasGeometry,
		hasPBRMaterial: hasPBRMaterial,
		hasPerspectiveCameraProjection: hasPerspectiveCameraProjection,
		hasTransform: hasTransform
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
	},
	arcballCameraController: {
		createArcballCameraController: createArcballCameraController,
		// getAllDirtyArcballCameraControllers: getAllDirtyArcballCameraControllers,
		// clearDirtyList: clearDirtyList,
		getDistance: getDistance,
		setDistance: setDistance,
		getPhi: getPhi,
		setPhi: setPhi,
		getTheta: getTheta,
		setTheta: setTheta,
		getTarget: getTarget,
		setTarget: setTarget,
		getGameObjects: getGameObjects
	}
};
