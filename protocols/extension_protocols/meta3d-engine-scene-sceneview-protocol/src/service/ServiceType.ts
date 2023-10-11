import { Merge } from "meta3d-commonlib-ts/src/type"
import { state as meta3dState } from "meta3d-type"
import {
	addBasicCameraView, addGeometry, addPBRMaterial, addPerspectiveCameraProjection, addTransform, addArcballCameraController, cloneGameObject, createGameObject,
	disposeGameObjectArcballCameraControllerComponent,
	disposeGameObjectBasicCameraViewComponent, disposeGameObjectGeometryComponent, disposeGameObjectPBRMaterialComponent, disposeGameObjectPerspectiveCameraProjectionComponent, disposeGameObjects, disposeGameObjectTransformComponent, getAllGameObjects,
	getArcballCameraController,
	getBasicCameraView, getGeometry, getNeedDisposedGameObjects, getPBRMaterial, getPerspectiveCameraProjection, getTransform,
	hasArcballCameraController,
	hasBasicCameraView, hasGeometry, hasPBRMaterial, hasPerspectiveCameraProjection, hasTransform, addDirectionLight, disposeGameObjectDirectionLightComponent, getDirectionLight, hasDirectionLight
} from "./ecs/GameObject"
import { createTransform, getGameObjects as getTransformGameObjects, getChildren, getLocalPosition, getParent, lookAt, setLocalPosition, setParent, getLocalToWorldMatrix, getLocalRotation, setLocalRotation, getLocalScale, setLocalScale } from "./ecs/Transform";
import { createPerspectiveCameraProjection, getAspect, getFar, getFovy, getNear, getPMatrix, setAspect, setFar, setFovy, setNear } from "./ecs/PerspectiveCameraProjection";
import {
	createPBRMaterial, getAllPBRMaterials, getDiffuseColor, setDiffuseColor,
	getSpecular,
	setSpecular,
	getSpecularColor,
	setSpecularColor,
	getRoughness,
	setRoughness,
	getMetalness,
	setMetalness,
	getTransmission,
	setTransmission,
	getIOR,
	setIOR,
	getDiffuseMap,
	setDiffuseMap,
	getRoughnessMap,
	setRoughnessMap,
	getMetalnessMap,
	setMetalnessMap,
	getNormalMap,
	setNormalMap,
	getGameObjects as getPBRMaterialGameObjects,
} from "./ecs/PBRMaterial";
import {
	createTexture,
	disposeTexture,
	addMaterial,
	getWrapS,
	setWrapS,
	getWrapT,
	setWrapT,
	getMagFilter,
	setMagFilter,
	getMinFilter,
	setMinFilter,
	getFormat,
	setFormat,
	getType,
	setType,
	getIsNeedUpdate,
	setIsNeedUpdate,
	getFlipY,
	setFlipY,
	getImage,
	setImage,
} from "./ecs/BasicSourceTexture";
import {
	createGeometry, getIndices, getVertices, setIndices, setVertices,
	getGameObjects as getGeometryGameObjects,
} from "./ecs/Geometry";
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
import {
	createDirectionLight,
	getColor,
	getDirection,
	getGameObjects as getDirectionLightGameObjects,
	getIntensity,
	setColor,
	setDirection,
	setIntensity
} from "./ecs/DirectionLight";

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
		addDirectionLight: addDirectionLight,
		addGeometry: addGeometry,
		addPBRMaterial: addPBRMaterial,
		addPerspectiveCameraProjection: addPerspectiveCameraProjection,
		addTransform: addTransform,
		addArcballCameraController: addArcballCameraController,
		cloneGameObject: cloneGameObject,
		createGameObject: createGameObject,

		disposeGameObjectArcballCameraControllerComponent: disposeGameObjectArcballCameraControllerComponent,

		disposeGameObjectBasicCameraViewComponent: disposeGameObjectBasicCameraViewComponent,
		disposeGameObjectDirectionLightComponent: disposeGameObjectDirectionLightComponent,
		disposeGameObjectGeometryComponent: disposeGameObjectGeometryComponent,
		disposeGameObjectPBRMaterialComponent: disposeGameObjectPBRMaterialComponent,
		disposeGameObjectPerspectiveCameraProjectionComponent: disposeGameObjectPerspectiveCameraProjectionComponent,
		disposeGameObjects: disposeGameObjects,
		disposeGameObjectTransformComponent: disposeGameObjectTransformComponent,
		getAllGameObjects: getAllGameObjects,

		getArcballCameraController: getArcballCameraController,

		getBasicCameraView: getBasicCameraView,
		getDirectionLight: getDirectionLight,
		getGeometry: getGeometry,
		getNeedDisposedGameObjects: getNeedDisposedGameObjects,
		getPBRMaterial: getPBRMaterial,
		getPerspectiveCameraProjection: getPerspectiveCameraProjection,
		getTransform: getTransform,

		hasArcballCameraController: hasArcballCameraController,
		hasBasicCameraView: hasBasicCameraView,
		hasDirectionLight: hasDirectionLight,
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
		getLocalRotation: getLocalRotation,
		setLocalRotation: setLocalRotation,
		getLocalScale: getLocalScale,
		setLocalScale: setLocalScale,
		getLocalToWorldMatrix: getLocalToWorldMatrix,
		lookAt: lookAt,
	},
	directionLight: {
		createDirectionLight: createDirectionLight,
		getGameObjects: getDirectionLightGameObjects,
		getColor: getColor,
		setColor: setColor,
		getIntensity: getIntensity,
		setIntensity: setIntensity,
		getDirection: getDirection,
		setDirection: setDirection,
	},
	perspectiveCameraProjection: {
		createPerspectiveCameraProjection: createPerspectiveCameraProjection,
		getPMatrix: getPMatrix,
		getFovy: getFovy,
		setFovy: setFovy,
		getNear: getNear,
		setNear: setNear,
		getFar: getFar,
		setFar: setFar,
		getAspect: getAspect,
		setAspect: setAspect
	},
	pbrMaterial: {
		createPBRMaterial: createPBRMaterial,
		getDiffuseColor: getDiffuseColor,
		setDiffuseColor: setDiffuseColor,
		getSpecular: getSpecular,
		setSpecular: setSpecular,
		getSpecularColor: getSpecularColor,
		setSpecularColor: setSpecularColor,
		getRoughness: getRoughness,
		setRoughness: setRoughness,
		getMetalness: getMetalness,
		setMetalness: setMetalness,
		getTransmission: getTransmission,
		setTransmission: setTransmission,
		getIOR: getIOR,
		setIOR: setIOR,
		getDiffuseMap: getDiffuseMap,
		setDiffuseMap: setDiffuseMap,
		getRoughnessMap: getRoughnessMap,
		setRoughnessMap: setRoughnessMap,
		getMetalnessMap: getMetalnessMap,
		setMetalnessMap: setMetalnessMap,
		getNormalMap: getNormalMap,
		setNormalMap: setNormalMap,
		getAllPBRMaterials: getAllPBRMaterials,
		getGameObjects: getPBRMaterialGameObjects
	},
	basicSourceTexture: {
		createTexture: createTexture,
		disposeTexture: disposeTexture,
		addMaterial: addMaterial,
		getWrapS: getWrapS,
		setWrapS: setWrapS,
		getWrapT: getWrapT,
		setWrapT: setWrapT,
		getMagFilter: getMagFilter,
		setMagFilter: setMagFilter,
		getMinFilter: getMinFilter,
		setMinFilter: setMinFilter,
		getFormat: getFormat,
		setFormat: setFormat,
		getType: getType,
		setType: setType,
		getIsNeedUpdate: getIsNeedUpdate,
		setIsNeedUpdate: setIsNeedUpdate,
		getFlipY: getFlipY,
		setFlipY: setFlipY,
		getImage: getImage,
		setImage: setImage,
	},
	geometry: {
		createGeometry: createGeometry,
		getVertices: getVertices,
		setVertices: setVertices,
		getIndices: getIndices,
		setIndices: setIndices,
		getGameObjects: getGeometryGameObjects
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
