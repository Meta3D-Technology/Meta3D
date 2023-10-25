import { state as meta3dState, api } from "meta3d-type"
import { service as engineCoreService } from "meta3d-engine-core-sceneview-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-sceneview-protocol/src/state/StateType"
import { scene, service as engineSceneService } from "meta3d-engine-scene-sceneview-protocol/src/service/ServiceType"
import { init, render, update } from "./DirectorAPI"
import { clonedGameObjects } from "meta3d-engine-core-sceneview-protocol/src/contribute/scene_graph/GameObjectContributeType"
import { bind, getWithDefault } from "meta3d-commonlib-ts/src/NullableUtils"
import { pbrMaterial } from "meta3d-component-pbrmaterial-protocol-common"
// import { gameObject } from "meta3d-engine-core-sceneview-protocol/src/state/GameObjectType"

let _addMaterial = (meta3dState: meta3dState,
	{ basicSourceTexture }: engineSceneService,
	getMapFunc: any,
	material: pbrMaterial
) => {
	return getWithDefault(bind((map) => {
		return basicSourceTexture.addMaterial(meta3dState, map, material)
	}, getMapFunc(meta3dState, material)), meta3dState)
}

let _addMaterialForTextureWhenClone = (meta3dState: meta3dState, engineSceneService: engineSceneService,
	clonedGameObjects: clonedGameObjects) => {
	if (clonedGameObjects.length > 1) {
		throw new Error("error")
	}

	let { gameObject, pbrMaterial, basicSourceTexture } = engineSceneService

	return clonedGameObjects[0].reduce((meta3dState, clonedGameObject) => {
		if (gameObject.hasPBRMaterial(meta3dState, clonedGameObject)) {
			let material = gameObject.getPBRMaterial(meta3dState, clonedGameObject)

			meta3dState = _addMaterial(meta3dState,
				engineSceneService,
				pbrMaterial.getDiffuseMap,
				material
			)
			meta3dState = _addMaterial(meta3dState,
				engineSceneService,
				pbrMaterial.getMetalnessMap,
				material
			)
			meta3dState = _addMaterial(meta3dState,
				engineSceneService,
				pbrMaterial.getRoughnessMap,
				material
			)
			meta3dState = _addMaterial(meta3dState,
				engineSceneService,
				pbrMaterial.getNormalMap,
				material
			)

			return meta3dState
		}

		return meta3dState
	}, meta3dState)
}

let _getSceneService = (
	api: api, meta3dEngineSceneExtensionProtocolName: string
): scene => {
	return {
		gameObject: {
			createGameObject: (meta3dState) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.createGameObject(meta3dState)
			},
			createUnUseGameObject: (meta3dState) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.createUnUseGameObject(meta3dState)
			},
			getAllGameObjects: (meta3dState) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.getAllGameObjects(meta3dState)
			},
			getGameObjectName: (meta3dState, gameObject) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.getGameObjectName(meta3dState, gameObject)
			},
			setGameObjectName: (meta3dState, gameObject, name) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.setGameObjectName(meta3dState, gameObject, name)
			},
			getTransform: (meta3dState, gameObject) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.getTransform(meta3dState, gameObject)
			},
			addTransform: (meta3dState, gameObject, transform) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.addTransform(meta3dState, gameObject, transform)
			},
			hasTransform: (meta3dState, gameObject) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.hasTransform(meta3dState, gameObject)
			},
			getDirectionLight: (meta3dState, gameObject) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.getDirectionLight(meta3dState, gameObject)
			},
			addDirectionLight: (meta3dState, gameObject, directionLight) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.addDirectionLight(meta3dState, gameObject, directionLight)
			},
			hasDirectionLight: (meta3dState, gameObject) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.hasDirectionLight(meta3dState, gameObject)
			},
			getGeometry: (meta3dState, gameObject) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.getGeometry(meta3dState, gameObject)
			},
			addGeometry: (meta3dState, gameObject, geometry) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.addGeometry(meta3dState, gameObject, geometry)
			},
			hasGeometry: (meta3dState, gameObject) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.hasGeometry(meta3dState, gameObject)
			},
			getPBRMaterial: (meta3dState, gameObject) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.getPBRMaterial(meta3dState, gameObject)
			},
			addPBRMaterial: (meta3dState, gameObject, pbrMaterial) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.addPBRMaterial(meta3dState, gameObject, pbrMaterial)
			},
			hasPBRMaterial: (meta3dState, gameObject) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.hasPBRMaterial(meta3dState, gameObject)
			},
			getBasicCameraView: (meta3dState, gameObject) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.getBasicCameraView(meta3dState, gameObject)
			},
			addBasicCameraView: (meta3dState, gameObject, basicCameraView) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.addBasicCameraView(meta3dState, gameObject, basicCameraView)
			},
			hasBasicCameraView: (meta3dState, gameObject) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.hasBasicCameraView(meta3dState, gameObject)
			},
			getPerspectiveCameraProjection: (meta3dState, gameObject) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.getPerspectiveCameraProjection(meta3dState, gameObject)
			},
			addPerspectiveCameraProjection: (meta3dState, gameObject, perspectiveCameraProjection) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.addPerspectiveCameraProjection(meta3dState, gameObject, perspectiveCameraProjection)
			},
			hasPerspectiveCameraProjection: (meta3dState, gameObject) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.hasPerspectiveCameraProjection(meta3dState, gameObject)
			},
			getArcballCameraController: (meta3dState, gameObject) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.getArcballCameraController(meta3dState, gameObject)
			},
			addArcballCameraController: (meta3dState, gameObject, arcballCameraController) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.addArcballCameraController(meta3dState, gameObject, arcballCameraController)
			},
			hasArcballCameraController: (meta3dState, gameObject) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.hasArcballCameraController(meta3dState, gameObject)
			},
			cloneGameObject: (meta3dState, count, cloneConfig, sourceGameObject) => {
				// return api.getExtensionService<engineSceneService>(
				// 	meta3dState,
				// 	meta3dEngineSceneExtensionProtocolName
				// ).gameObject.cloneGameObject(meta3dState, count, cloneConfig, sourceGameObject)
				let engineSceneService = api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				)

				let data = engineSceneService.gameObject.cloneGameObject(meta3dState, count, cloneConfig, sourceGameObject)
				meta3dState = data[0]
				let clonedGameObjects = data[1]

				if (!cloneConfig.isShareMaterial) {
					meta3dState = _addMaterialForTextureWhenClone(meta3dState,
						engineSceneService,
						clonedGameObjects)
				}

				return [meta3dState, clonedGameObjects]
			},
			getNeedDisposedGameObjects: (meta3dState) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.getNeedDisposedGameObjects(meta3dState)
			},
			disposeGameObjects: (meta3dState, gameObjects) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.disposeGameObjects(meta3dState, gameObjects)
			},
			disposeGameObjectTransformComponent: (meta3dState, gameObject, component) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.disposeGameObjectTransformComponent(meta3dState, gameObject, component)
			},
			disposeGameObjectPBRMaterialComponent: (meta3dState, gameObject, component) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.disposeGameObjectPBRMaterialComponent(meta3dState, gameObject, component)
			},
			disposeGameObjectDirectionLightComponent: (meta3dState, gameObject, component) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.disposeGameObjectDirectionLightComponent(meta3dState, gameObject, component)
			},
			disposeGameObjectGeometryComponent: (meta3dState, gameObject, component) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.disposeGameObjectGeometryComponent(meta3dState, gameObject, component)
			},
			disposeGameObjectBasicCameraViewComponent: (meta3dState, gameObject, component) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.disposeGameObjectBasicCameraViewComponent(meta3dState, gameObject, component)
			},
			disposeGameObjectPerspectiveCameraProjectionComponent: (meta3dState, gameObject, component) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.disposeGameObjectPerspectiveCameraProjectionComponent(meta3dState, gameObject, component)
			},
			disposeGameObjectArcballCameraControllerComponent: (meta3dState, gameObject, component) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.disposeGameObjectArcballCameraControllerComponent(meta3dState, gameObject, component)
			},
			getGameObjectAndAllChildren: (meta3dState, gameObject) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.getGameObjectAndAllChildren(meta3dState, gameObject)
			},
			removeGameObjects: (meta3dState, gameObjects) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.removeGameObjects(meta3dState, gameObjects)
			},
			restoreRemovedGameObjects: (meta3dState, data) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.restoreRemovedGameObjects(meta3dState, data)
			},
		},
		transform: {
			createTransform: (meta3dState) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).transform.createTransform(meta3dState)
			},
			getGameObjects: (meta3dState, transform) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).transform.getGameObjects(meta3dState, transform)
			},
			getName: (meta3dState, transform) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).transform.getName(meta3dState, transform)
			},
			setName: (meta3dState, transform, name) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).transform.setName(meta3dState, transform, name)
			},
			getParent: (meta3dState, transform) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).transform.getParent(meta3dState, transform)
			},
			setParent: (meta3dState, transform, parent) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).transform.setParent(meta3dState, transform, parent)
			},
			getChildren: (meta3dState, transform) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).transform.getChildren(meta3dState, transform)
			},
			getLocalToWorldMatrix: (meta3dState, transform) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).transform.getLocalToWorldMatrix(meta3dState, transform)
			},
			getLocalPosition: (meta3dState, transform) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).transform.getLocalPosition(meta3dState, transform)
			},
			setLocalPosition: (meta3dState, transform, localPosition) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).transform.setLocalPosition(meta3dState, transform, localPosition)
			},
			getLocalRotation: (meta3dState, transform) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).transform.getLocalRotation(meta3dState, transform)
			},
			setLocalRotation: (meta3dState, transform, localRotation) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).transform.setLocalRotation(meta3dState, transform, localRotation)
			},
			getLocalScale: (meta3dState, transform) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).transform.getLocalScale(meta3dState, transform)
			},
			setLocalScale: (meta3dState, transform, localScale) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).transform.setLocalScale(meta3dState, transform, localScale)
			},
			lookAt: (meta3dState, transform, target) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).transform.lookAt(meta3dState, transform, target)
			},
		},
		basicCameraView: {
			createBasicCameraView: (meta3dState) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).basicCameraView.createBasicCameraView(meta3dState)
			},
			getGameObjects: (meta3dState, basicCameraView) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).basicCameraView.getGameObjects(meta3dState, basicCameraView)
			},
			getName: (meta3dState, basicCameraView) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).basicCameraView.getName(meta3dState, basicCameraView)
			},
			setName: (meta3dState, basicCameraView, name) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).basicCameraView.setName(meta3dState, basicCameraView, name)
			},
			getViewWorldToCameraMatrix: (meta3dState, basicCameraView) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).basicCameraView.getViewWorldToCameraMatrix(meta3dState, basicCameraView)
			},
			getActiveCameraView: (meta3dState, isDebug) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).basicCameraView.getActiveCameraView(meta3dState, isDebug)
			},
			active: (meta3dState, basicCameraView) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).basicCameraView.active(meta3dState, basicCameraView)
			},
		},
		geometry: {
			createGeometry: (meta3dState) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).geometry.createGeometry(meta3dState)
			},
			getName: (meta3dState, geometry) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).geometry.getName(meta3dState, geometry)
			},
			setName: (meta3dState, geometry, name) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).geometry.setName(meta3dState, geometry, name)
			},
			getVertices: (meta3dState, geometry) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).geometry.getVertices(meta3dState, geometry)
			},
			setVertices: (meta3dState, geometry, vertices) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).geometry.setVertices(meta3dState, geometry, vertices)
			},
			getNormals: (meta3dState, geometry) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).geometry.getNormals(meta3dState, geometry)
			},
			setNormals: (meta3dState, geometry, normals) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).geometry.setNormals(meta3dState, geometry, normals)
			},
			getTexCoords: (meta3dState, geometry) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).geometry.getTexCoords(meta3dState, geometry)
			},
			setTexCoords: (meta3dState, geometry, texCoords) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).geometry.setTexCoords(meta3dState, geometry, texCoords)
			},
			getTangents: (meta3dState, geometry) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).geometry.getTangents(meta3dState, geometry)
			},
			setTangents: (meta3dState, geometry, tangents) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).geometry.setTangents(meta3dState, geometry, tangents)
			},
			getIndices: (meta3dState, geometry) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).geometry.getIndices(meta3dState, geometry)
			},
			setIndices: (meta3dState, geometry, indices) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).geometry.setIndices(meta3dState, geometry, indices)
			},
			getGameObjects: (meta3dState, geometry) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).geometry.getGameObjects(meta3dState, geometry)
			},
		},
		pbrMaterial: {
			createPBRMaterial: (meta3dState) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).pbrMaterial.createPBRMaterial(meta3dState)

			},
			getName: (meta3dState, pbrMaterial) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).pbrMaterial.getName(meta3dState, pbrMaterial)
			},
			setName: (meta3dState, pbrMaterial, name) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).pbrMaterial.setName(meta3dState, pbrMaterial, name)
			},
			getDiffuseColor: (meta3dState, pbrMaterial) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).pbrMaterial.getDiffuseColor(meta3dState, pbrMaterial)
			},
			setDiffuseColor: (meta3dState, pbrMaterial, diffuseColor) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).pbrMaterial.setDiffuseColor(meta3dState, pbrMaterial, diffuseColor)
			},
			getSpecular: (meta3dState, pbrMaterial) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).pbrMaterial.getSpecular(meta3dState, pbrMaterial)
			},
			setSpecular: (meta3dState, pbrMaterial, value) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).pbrMaterial.setSpecular(meta3dState, pbrMaterial, value)
			},
			getSpecularColor: (meta3dState, pbrMaterial) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).pbrMaterial.getSpecularColor(meta3dState, pbrMaterial)
			},
			setSpecularColor: (meta3dState, pbrMaterial, value) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).pbrMaterial.setSpecularColor(meta3dState, pbrMaterial, value)
			},
			getMetalness: (meta3dState, pbrMaterial) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).pbrMaterial.getMetalness(meta3dState, pbrMaterial)
			},
			setMetalness: (meta3dState, pbrMaterial, value) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).pbrMaterial.setMetalness(meta3dState, pbrMaterial, value)
			},
			getRoughness: (meta3dState, pbrMaterial) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).pbrMaterial.getRoughness(meta3dState, pbrMaterial)
			},
			setRoughness: (meta3dState, pbrMaterial, value) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).pbrMaterial.setRoughness(meta3dState, pbrMaterial, value)
			},
			getTransmission: (meta3dState, pbrMaterial) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).pbrMaterial.getTransmission(meta3dState, pbrMaterial)
			},
			setTransmission: (meta3dState, pbrMaterial, value) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).pbrMaterial.setTransmission(meta3dState, pbrMaterial, value)
			},
			getIOR: (meta3dState, pbrMaterial) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).pbrMaterial.getIOR(meta3dState, pbrMaterial)
			},
			setIOR: (meta3dState, pbrMaterial, value) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).pbrMaterial.setIOR(meta3dState, pbrMaterial, value)
			},
			getDiffuseMap: (meta3dState, pbrMaterial) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).pbrMaterial.getDiffuseMap(meta3dState, pbrMaterial)
			},
			setDiffuseMap: (meta3dState, pbrMaterial, value) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).pbrMaterial.setDiffuseMap(meta3dState, pbrMaterial, value)
			},
			getMetalnessMap: (meta3dState, pbrMaterial) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).pbrMaterial.getMetalnessMap(meta3dState, pbrMaterial)
			},
			setMetalnessMap: (meta3dState, pbrMaterial, value) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).pbrMaterial.setMetalnessMap(meta3dState, pbrMaterial, value)
			},
			getNormalMap: (meta3dState, pbrMaterial) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).pbrMaterial.getNormalMap(meta3dState, pbrMaterial)
			},
			setNormalMap: (meta3dState, pbrMaterial, value) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).pbrMaterial.setNormalMap(meta3dState, pbrMaterial, value)
			},
			getRoughnessMap: (meta3dState, pbrMaterial) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).pbrMaterial.getRoughnessMap(meta3dState, pbrMaterial)
			},
			setRoughnessMap: (meta3dState, pbrMaterial, value) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).pbrMaterial.setMetalnessMap(meta3dState, pbrMaterial, value)
			},
			getAllPBRMaterials: (meta3dState) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).pbrMaterial.getAllPBRMaterials(meta3dState)
			},
			getGameObjects: (meta3dState, pbrMaterial) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).pbrMaterial.getGameObjects(meta3dState, pbrMaterial)
			},
		},
		basicSourceTexture: {
			createTexture: (meta3dState) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).basicSourceTexture.createTexture(meta3dState)

			},
			disposeTexture: (meta3dState, texture, material) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).basicSourceTexture.disposeTexture(meta3dState, texture, material)
			},
			addMaterial: (meta3dState, texture, material) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).basicSourceTexture.addMaterial(meta3dState, texture, material)
			},
			getName: (meta3dState, texture) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).basicSourceTexture.getName(meta3dState, texture)
			},
			setName: (meta3dState, texture, name) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).basicSourceTexture.setName(meta3dState, texture, name)
			},
			getWrapS: (meta3dState, texture) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).basicSourceTexture.getWrapS(meta3dState, texture)
			},
			setWrapS: (meta3dState, texture, value) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).basicSourceTexture.setWrapS(meta3dState, texture, value)
			},
			getWrapT: (meta3dState, texture) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).basicSourceTexture.getWrapT(meta3dState, texture)
			},
			setWrapT: (meta3dState, texture, value) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).basicSourceTexture.setWrapT(meta3dState, texture, value)
			},
			getFlipY: (meta3dState, texture) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).basicSourceTexture.getFlipY(meta3dState, texture)
			},
			setFlipY: (meta3dState, texture, value) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).basicSourceTexture.setFlipY(meta3dState, texture, value)
			},
			getFormat: (meta3dState, texture) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).basicSourceTexture.getFormat(meta3dState, texture)
			},
			setFormat: (meta3dState, texture, value) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).basicSourceTexture.setFormat(meta3dState, texture, value)
			},
			getImage: (meta3dState, texture) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).basicSourceTexture.getImage(meta3dState, texture)
			},
			setImage: (meta3dState, texture, value) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).basicSourceTexture.setImage(meta3dState, texture, value)
			},
			getIsNeedUpdate: (meta3dState, texture) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).basicSourceTexture.getIsNeedUpdate(meta3dState, texture)
			},
			setIsNeedUpdate: (meta3dState, texture, value) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).basicSourceTexture.setIsNeedUpdate(meta3dState, texture, value)
			},
			getMagFilter: (meta3dState, texture) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).basicSourceTexture.getMagFilter(meta3dState, texture)
			},
			setMagFilter: (meta3dState, texture, value) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).basicSourceTexture.setMagFilter(meta3dState, texture, value)
			},
			getMinFilter: (meta3dState, texture) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).basicSourceTexture.getMinFilter(meta3dState, texture)
			},
			setMinFilter: (meta3dState, texture, value) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).basicSourceTexture.setMinFilter(meta3dState, texture, value)
			},
			getType: (meta3dState, texture) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).basicSourceTexture.getType(meta3dState, texture)
			},
			setType: (meta3dState, texture, value) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).basicSourceTexture.setType(meta3dState, texture, value)
			},

		},
		directionLight: {
			createDirectionLight: (meta3dState) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).directionLight.createDirectionLight(meta3dState)

			},
			getGameObjects: (meta3dState, directionLight) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).directionLight.getGameObjects(meta3dState, directionLight)
			},
			getName: (meta3dState, directionLight) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).directionLight.getName(meta3dState, directionLight)
			},
			setName: (meta3dState, directionLight, name) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).directionLight.setName(meta3dState, directionLight, name)
			},
			getColor: (meta3dState, directionLight) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).directionLight.getColor(meta3dState, directionLight)
			},
			setColor: (meta3dState, directionLight, value) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).directionLight.setColor(meta3dState, directionLight, value)
			},
			getDirection: (meta3dState, directionLight) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).directionLight.getDirection(meta3dState, directionLight)
			},
			setDirection: (meta3dState, directionLight, value) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).directionLight.setDirection(meta3dState, directionLight, value)
			},
			getIntensity: (meta3dState, directionLight) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).directionLight.getIntensity(meta3dState, directionLight)
			},
			setIntensity: (meta3dState, directionLight, value) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).directionLight.setIntensity(meta3dState, directionLight, value)
			},
		},
		perspectiveCameraProjection: {
			createPerspectiveCameraProjection: (meta3dState) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).perspectiveCameraProjection.createPerspectiveCameraProjection(meta3dState)

			},
			getName: (meta3dState, perspectiveCameraProjection) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).perspectiveCameraProjection.getName(meta3dState, perspectiveCameraProjection)
			},
			setName: (meta3dState, perspectiveCameraProjection, name) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).perspectiveCameraProjection.setName(meta3dState, perspectiveCameraProjection, name)
			},
			getPMatrix: (meta3dState, perspectiveCameraProjection) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).perspectiveCameraProjection.getPMatrix(meta3dState, perspectiveCameraProjection)
			},
			getFovy: (meta3dState, perspectiveCameraProjection) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).perspectiveCameraProjection.getFovy(meta3dState, perspectiveCameraProjection)
			},
			setFovy: (meta3dState, perspectiveCameraProjection, fovy) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).perspectiveCameraProjection.setFovy(meta3dState, perspectiveCameraProjection, fovy)
			},
			getNear: (meta3dState, perspectiveCameraProjection) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).perspectiveCameraProjection.getNear(meta3dState, perspectiveCameraProjection)
			},
			setNear: (meta3dState, perspectiveCameraProjection, near) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).perspectiveCameraProjection.setNear(meta3dState, perspectiveCameraProjection, near)
			},
			getFar: (meta3dState, perspectiveCameraProjection) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).perspectiveCameraProjection.getFar(meta3dState, perspectiveCameraProjection)
			},
			setFar: (meta3dState, perspectiveCameraProjection, far) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).perspectiveCameraProjection.setFar(meta3dState, perspectiveCameraProjection, far)
			},
			getAspect: (meta3dState, perspectiveCameraProjection) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).perspectiveCameraProjection.getAspect(meta3dState, perspectiveCameraProjection)
			},
			setAspect: (meta3dState, perspectiveCameraProjection, aspect) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).perspectiveCameraProjection.setAspect(meta3dState, perspectiveCameraProjection, aspect)
			},
		},
		arcballCameraController: {
			createArcballCameraController: (meta3dState) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).arcballCameraController.createArcballCameraController(meta3dState)
			},
			getName: (meta3dState, arcballCameraController) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).arcballCameraController.getName(meta3dState, arcballCameraController)
			},
			setName: (meta3dState, arcballCameraController, name) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).arcballCameraController.setName(meta3dState, arcballCameraController, name)
			},
			getDistance: (meta3dState, arcballCameraController) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).arcballCameraController.getDistance(meta3dState, arcballCameraController)
			},
			setDistance: (meta3dState, arcballCameraController, value) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).arcballCameraController.setDistance(meta3dState, arcballCameraController, value)
			},
			getWheelSpeed: (meta3dState, arcballCameraController) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).arcballCameraController.getWheelSpeed(meta3dState, arcballCameraController)
			},
			setWheelSpeed: (meta3dState, arcballCameraController, value) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).arcballCameraController.setWheelSpeed(meta3dState, arcballCameraController, value)
			},
			getTarget: (meta3dState, arcballCameraController) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).arcballCameraController.getTarget(meta3dState, arcballCameraController)
			},
			setTarget: (meta3dState, arcballCameraController, value) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).arcballCameraController.setTarget(meta3dState, arcballCameraController, value)
			},
			getPhi: (meta3dState, arcballCameraController) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).arcballCameraController.getPhi(meta3dState, arcballCameraController)
			},
			setPhi: (meta3dState, arcballCameraController, value) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).arcballCameraController.setPhi(meta3dState, arcballCameraController, value)
			},
			getTheta: (meta3dState, arcballCameraController) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).arcballCameraController.getTheta(meta3dState, arcballCameraController)
			},
			setTheta: (meta3dState, arcballCameraController, value) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).arcballCameraController.setTheta(meta3dState, arcballCameraController, value)
			},
			getGameObjects: (meta3dState, arcballCameraController) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).arcballCameraController.getGameObjects(meta3dState, arcballCameraController)
			},
		},
	}
}

export let getExtensionService = (api: api, [
	meta3dBsMostExtensionProtocolName,
	meta3dEngineCoreExtensionProtocolName,
	meta3dEngineSceneExtensionProtocolName,
]: [string, string, string]) => {
	return {
		init: (meta3dState: meta3dState) => {
			let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, meta3dEngineCoreExtensionProtocolName)

			let engineCoreService = api.getExtensionService<engineCoreService>(
				meta3dState,
				meta3dEngineCoreExtensionProtocolName
			)

			engineCoreState = engineCoreService.init(engineCoreState, meta3dState)



			meta3dState =
				api.setExtensionState(
					meta3dState,
					meta3dEngineCoreExtensionProtocolName,
					engineCoreState
				)



			return init(api, meta3dState, meta3dBsMostExtensionProtocolName, meta3dEngineCoreExtensionProtocolName)
		},
		update: (meta3dState: meta3dState) => {
			return update(api, meta3dState, meta3dBsMostExtensionProtocolName, meta3dEngineCoreExtensionProtocolName)
		},
		render: (meta3dState: meta3dState) => {
			return render(api, meta3dState, meta3dBsMostExtensionProtocolName, meta3dEngineCoreExtensionProtocolName)
		},
		scene: _getSceneService(
			api, meta3dEngineSceneExtensionProtocolName
		)
	}
}