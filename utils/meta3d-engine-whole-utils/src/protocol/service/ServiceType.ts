import { state as meta3dState } from "meta3d-type"
// import { ecsConfig } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { addBasicCameraView, addGeometry, addPBRMaterial, addPerspectiveCameraProjection, addTransform, cloneGameObject, createGameObject, disposeGameObjectBasicCameraViewComponent, disposeGameObjectGeometryComponent, disposeGameObjectPBRMaterialComponent, disposeGameObjectPerspectiveCameraProjectionComponent, disposeGameObjects, disposeGameObjectTransformComponent, getAllGameObjects, getBasicCameraView, getGeometry, getNeedDisposedGameObjects, getPBRMaterial, getPerspectiveCameraProjection, getTransform, hasBasicCameraView, hasGeometry, hasPBRMaterial, hasPerspectiveCameraProjection, hasTransform } from "./GameObject";
import { createTransform, getLocalPosition, lookAt, setLocalPosition } from "./Transform";
import { createPerspectiveCameraProjection, setAspect, setFar, setFovy, setNear } from "./PerspectiveCameraProjection";
import { createPBRMaterial, getAllPBRMaterials, setDiffuseColor } from "./PBRMaterial";
import { createGeometry, setIndices, setVertices } from "./Geometry";
import { createBasicCameraView, active } from "./BasicCameraView";
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
	}
};
