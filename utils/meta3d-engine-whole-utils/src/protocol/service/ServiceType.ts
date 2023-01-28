import { state as meta3dState } from "meta3d-type"
// import { ecsConfig } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import {
	addBasicCameraView, addGeometry, addPBRMaterial, addPerspectiveCameraProjection, addTransform, addArcballCameraController, cloneGameObject, createGameObject,
	disposeGameObjectArcballCameraControllerComponent,
	disposeGameObjectBasicCameraViewComponent, disposeGameObjectGeometryComponent, disposeGameObjectPBRMaterialComponent, disposeGameObjectPerspectiveCameraProjectionComponent, disposeGameObjects, disposeGameObjectTransformComponent, getAllGameObjects,
	getArcballCameraController,
	getBasicCameraView, getGeometry, getNeedDisposedGameObjects, getPBRMaterial, getPerspectiveCameraProjection, getTransform,
	hasArcballCameraController,
	hasBasicCameraView, hasGeometry, hasPBRMaterial, hasPerspectiveCameraProjection, hasTransform
} from "./GameObject";
import { createTransform, getLocalPosition, lookAt, setLocalPosition } from "./Transform";
import { createPerspectiveCameraProjection, setAspect, setFar, setFovy, setNear } from "./PerspectiveCameraProjection";
import { createPBRMaterial, getAllPBRMaterials, setDiffuseColor } from "./PBRMaterial";
import { createGeometry, setIndices, setVertices } from "./Geometry";
import { createBasicCameraView, active } from "./BasicCameraView";
import {
	createArcballCameraController,
	// getAllDirtyArcballCameraControllers, clearDirtyList,
	getDistance, setDistance, getPhi, setPhi, getTheta, setTheta, getTarget, setTarget, getGameObjects
} from "./ArcballCameraController"

// import { nullable } from "meta3d-commonlib-ts/src/nullable";
// import { webgl1Context } from "meta3d-webgl1-protocol/src/service/ServiceType";

// type glData = [nullable<HTMLCanvasElement>, nullable<webgl1Context>]

export type service = {
	// prepare: (meta3dState: meta3dState, isDebug: boolean, ecsConfig: ecsConfig, glData: glData) => meta3dState,
	init: (meta3dState: meta3dState) => Promise<meta3dState>,
	update: (meta3dState: meta3dState) => Promise<meta3dState>,
	render: (meta3dState: meta3dState) => Promise<meta3dState>,
	scene: {
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
	}
};
