import { state as meta3dState, api } from "meta3d-type"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { scene, service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { init, render, update } from "./DirectorAPI"

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
			getAllGameObjects: (meta3dState) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.getAllGameObjects(meta3dState)
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
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).gameObject.cloneGameObject(meta3dState, count, cloneConfig, sourceGameObject)
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
		},
		transform: {
			createTransform: (meta3dState) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).transform.createTransform(meta3dState)
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
			setVertices: (meta3dState, geometry, vertices) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).geometry.setVertices(meta3dState, geometry, vertices)
			},
			setIndices: (meta3dState, geometry, indices) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).geometry.setIndices(meta3dState, geometry, indices)
			},
		},
		pbrMaterial: {
			createPBRMaterial: (meta3dState) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).pbrMaterial.createPBRMaterial(meta3dState)

			},
			setDiffuseColor: (meta3dState, pbrMaterial, diffuseColor) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).pbrMaterial.setDiffuseColor(meta3dState, pbrMaterial, diffuseColor)
			},
			getAllPBRMaterials: (meta3dState) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).pbrMaterial.getAllPBRMaterials(meta3dState)
			},
		},
		perspectiveCameraProjection: {
			createPerspectiveCameraProjection: (meta3dState) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).perspectiveCameraProjection.createPerspectiveCameraProjection(meta3dState)

			},
			setFovy: (meta3dState, perspectiveCameraProjection, fovy) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).perspectiveCameraProjection.setFovy(meta3dState, perspectiveCameraProjection, fovy)
			},
			setNear: (meta3dState, perspectiveCameraProjection, near) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).perspectiveCameraProjection.setNear(meta3dState, perspectiveCameraProjection, near)
			},
			setFar: (meta3dState, perspectiveCameraProjection, far) => {
				return api.getExtensionService<engineSceneService>(
					meta3dState,
					meta3dEngineSceneExtensionProtocolName
				).perspectiveCameraProjection.setFar(meta3dState, perspectiveCameraProjection, far)
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