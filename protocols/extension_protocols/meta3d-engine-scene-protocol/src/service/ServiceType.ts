import { Merge } from "meta3d-commonlib-ts/src/type"
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
import { createTransform, getGameObjects as getTransformGameObjects, getChildren, getLocalPosition, getParent, lookAt, setLocalPosition, setParent, getLocalToWorldMatrix } from "./ecs/Transform";
import { createPerspectiveCameraProjection, getPMatrix, setAspect, setFar, setFovy, setNear } from "./ecs/PerspectiveCameraProjection";
import { createPBRMaterial, getAllPBRMaterials, getDiffuseColor, setDiffuseColor } from "./ecs/PBRMaterial";
import { createGeometry, getIndices, getVertices, setIndices, setVertices } from "./ecs/Geometry";
import {
	createBasicCameraView,
	getGameObjects as getBasicCameraViewGameObjects,
	active, getActiveCameraView, getViewWorldToCameraMatrix
} from "./ecs/BasicCameraView";
import {
	createArcballCameraController,
	// getAllDirtyArcballCameraControllers, clearDirtyList,
	getDistance, setDistance, getPhi, setPhi, getTheta, setTheta, getTarget, setTarget, getGameObjects as getArcballCameraControllerGameObjects
} from "./ecs/ArcballCameraController"

export type ecsConfig = {
	float9Array1: Float32Array,
	float32Array1: Float32Array,
	transformCount: number,
	geometryCount: number,
	geometryPointCount: number,
	pbrMaterialCount: number
}

export type scene = {
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
		getGameObjects: getTransformGameObjects,
		getParent: getParent,
		setParent: setParent,
		getChildren: getChildren,
		getLocalPosition: getLocalPosition,
		setLocalPosition: setLocalPosition,
		getLocalToWorldMatrix: getLocalToWorldMatrix,
		lookAt: lookAt,
	},
	perspectiveCameraProjection: {
		createPerspectiveCameraProjection: createPerspectiveCameraProjection,
		getPMatrix: getPMatrix,
		setFovy: setFovy,
		setNear: setNear,
		setFar: setFar,
		setAspect: setAspect
	},
	pbrMaterial: {
		createPBRMaterial: createPBRMaterial,
		getDiffuseColor: getDiffuseColor,
		setDiffuseColor: setDiffuseColor,
		getAllPBRMaterials: getAllPBRMaterials
	},
	geometry: {
		createGeometry: createGeometry,
		getVertices: getVertices,
		setVertices: setVertices,
		getIndices: getIndices,
		setIndices: setIndices
	},
	basicCameraView: {
		createBasicCameraView: createBasicCameraView,
		getGameObjects: getBasicCameraViewGameObjects,
		getViewWorldToCameraMatrix: getViewWorldToCameraMatrix,
		getActiveCameraView: getActiveCameraView,
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
		getGameObjects: getArcballCameraControllerGameObjects
	}
}

export type service = Merge<scene, {
	prepare: (meta3dState: meta3dState, isDebug: boolean, ecsConfig: ecsConfig) => meta3dState,
	// gameObject: {
	// 	addBasicCameraView: addBasicCameraView,
	// 	addGeometry: addGeometry,
	// 	addPBRMaterial: addPBRMaterial,
	// 	addPerspectiveCameraProjection: addPerspectiveCameraProjection,
	// 	addTransform: addTransform,
	// 	addArcballCameraController: addArcballCameraController,
	// 	cloneGameObject: cloneGameObject,
	// 	createGameObject: createGameObject,

	// 	disposeGameObjectArcballCameraControllerComponent: disposeGameObjectArcballCameraControllerComponent,

	// 	disposeGameObjectBasicCameraViewComponent: disposeGameObjectBasicCameraViewComponent,
	// 	disposeGameObjectGeometryComponent: disposeGameObjectGeometryComponent,
	// 	disposeGameObjectPBRMaterialComponent: disposeGameObjectPBRMaterialComponent,
	// 	disposeGameObjectPerspectiveCameraProjectionComponent: disposeGameObjectPerspectiveCameraProjectionComponent,
	// 	disposeGameObjects: disposeGameObjects,
	// 	disposeGameObjectTransformComponent: disposeGameObjectTransformComponent,
	// 	getAllGameObjects: getAllGameObjects,

	// 	getArcballCameraController: getArcballCameraController,

	// 	getBasicCameraView: getBasicCameraView,
	// 	getGeometry: getGeometry,
	// 	getNeedDisposedGameObjects: getNeedDisposedGameObjects,
	// 	getPBRMaterial: getPBRMaterial,
	// 	getPerspectiveCameraProjection: getPerspectiveCameraProjection,
	// 	getTransform: getTransform,

	// 	hasArcballCameraController: hasArcballCameraController,
	// 	hasBasicCameraView: hasBasicCameraView,
	// 	hasGeometry: hasGeometry,
	// 	hasPBRMaterial: hasPBRMaterial,
	// 	hasPerspectiveCameraProjection: hasPerspectiveCameraProjection,
	// 	hasTransform: hasTransform
	// },
	// transform: {
	// 	createTransform: createTransform,
	// 	getLocalPosition: getLocalPosition,
	// 	setLocalPosition: setLocalPosition,
	// 	lookAt: lookAt,
	// },
	// perspectiveCameraProjection: {
	// 	createPerspectiveCameraProjection: createPerspectiveCameraProjection,
	// 	setFovy: setFovy,
	// 	setNear: setNear,
	// 	setFar: setFar,
	// 	setAspect: setAspect
	// },
	// pbrMaterial: {
	// 	createPBRMaterial: createPBRMaterial,
	// 	setDiffuseColor: setDiffuseColor,
	// 	getAllPBRMaterials: getAllPBRMaterials
	// },
	// geometry: {
	// 	createGeometry: createGeometry,
	// 	setVertices: setVertices,
	// 	setIndices: setIndices
	// },
	// basicCameraView: {
	// 	createBasicCameraView: createBasicCameraView,
	// 	active: active
	// },
	// arcballCameraController: {
	// 	createArcballCameraController: createArcballCameraController,
	// 	// getAllDirtyArcballCameraControllers: getAllDirtyArcballCameraControllers,
	// 	// clearDirtyList: clearDirtyList,
	// 	getDistance: getDistance,
	// 	setDistance: setDistance,
	// 	getPhi: getPhi,
	// 	setPhi: setPhi,
	// 	getTheta: getTheta,
	// 	setTheta: setTheta,
	// 	getTarget: getTarget,
	// 	setTarget: setTarget,
	// 	getGameObjects: getGameObjects
	// }
}>;
