import { state as meta3dState, api } from "meta3d-type"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { init, render, update } from "./DirectorAPI"

let _encapsulateSceneAPIReturnState = (meta3dState: meta3dState, func: (engineCoreState: engineCoreState, engineCoreService: engineCoreService) => engineCoreState, api: api, meta3dEngineCoreExtensionProtocolName: string): meta3dState => {
	let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, meta3dEngineCoreExtensionProtocolName)

	let engineCoreService = api.getExtensionService<engineCoreService>(
		meta3dState,
		meta3dEngineCoreExtensionProtocolName
	)

	meta3dState =
		api.setExtensionState(
			meta3dState,
			meta3dEngineCoreExtensionProtocolName,
			func(engineCoreState, engineCoreService)
		)

	return meta3dState
}

let _encapsulateSceneAPIReturnData = <Data>(meta3dState: meta3dState, func: (engineCoreState: engineCoreState, engineCoreService: engineCoreService) => Data, api: api, meta3dEngineCoreExtensionProtocolName: string): Data => {
	let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, meta3dEngineCoreExtensionProtocolName)

	let engineCoreService = api.getExtensionService<engineCoreService>(
		meta3dState,
		meta3dEngineCoreExtensionProtocolName
	)

	return func(engineCoreState, engineCoreService)
}

let _encapsulateSceneAPIReturnStateAndData = <Data>(meta3dState: meta3dState, func: (engineCoreState: engineCoreState, engineCoreService: engineCoreService) => [engineCoreState, Data], api: api, meta3dEngineCoreExtensionProtocolName: string): [meta3dState, Data] => {
	let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, meta3dEngineCoreExtensionProtocolName)

	let engineCoreService = api.getExtensionService<engineCoreService>(
		meta3dState,
		meta3dEngineCoreExtensionProtocolName
	)

	let data = func(engineCoreState, engineCoreService)

	meta3dState =
		api.setExtensionState(
			meta3dState,
			meta3dEngineCoreExtensionProtocolName,
			data[0]
		)

	return [meta3dState, data[1]]
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
		scene: {
			gameObject: {
				createGameObject: (meta3dState) => {
					return _encapsulateSceneAPIReturnStateAndData(meta3dState, api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).gameObject.createGameObject, api, meta3dEngineCoreExtensionProtocolName)
				},
				getAllGameObjects: (meta3dState) => {
					return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).gameObject.getAllGameObjects(engineCoreState, engineCoreService), api, meta3dEngineCoreExtensionProtocolName)
				},
				getTransform: (meta3dState, gameObject) => {
					return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).gameObject.getTransform(engineCoreState, engineCoreService, gameObject), api, meta3dEngineCoreExtensionProtocolName)
				},
				addTransform: (meta3dState, gameObject, transform) => {
					return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).gameObject.addTransform(engineCoreState, engineCoreService, gameObject, transform), api, meta3dEngineCoreExtensionProtocolName)
				},
				hasTransform: (meta3dState, gameObject) => {
					return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).gameObject.hasTransform(engineCoreState, engineCoreService, gameObject), api, meta3dEngineCoreExtensionProtocolName)
				},
				getGeometry: (meta3dState, gameObject) => {
					return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).gameObject.getGeometry(engineCoreState, engineCoreService, gameObject), api, meta3dEngineCoreExtensionProtocolName)
				},
				addGeometry: (meta3dState, gameObject, geometry) => {
					return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).gameObject.addGeometry(engineCoreState, engineCoreService, gameObject, geometry), api, meta3dEngineCoreExtensionProtocolName)
				},
				hasGeometry: (meta3dState, gameObject) => {
					return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).gameObject.hasGeometry(engineCoreState, engineCoreService, gameObject), api, meta3dEngineCoreExtensionProtocolName)
				},
				getPBRMaterial: (meta3dState, gameObject) => {
					return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).gameObject.getPBRMaterial(engineCoreState, engineCoreService, gameObject), api, meta3dEngineCoreExtensionProtocolName)
				},
				addPBRMaterial: (meta3dState, gameObject, pbrMaterial) => {
					return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).gameObject.addPBRMaterial(engineCoreState, engineCoreService, gameObject, pbrMaterial), api, meta3dEngineCoreExtensionProtocolName)
				},
				hasPBRMaterial: (meta3dState, gameObject) => {
					return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).gameObject.hasPBRMaterial(engineCoreState, engineCoreService, gameObject), api, meta3dEngineCoreExtensionProtocolName)
				},
				getBasicCameraView: (meta3dState, gameObject) => {
					return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).gameObject.getBasicCameraView(engineCoreState, engineCoreService, gameObject), api, meta3dEngineCoreExtensionProtocolName)
				},
				addBasicCameraView: (meta3dState, gameObject, basicCameraView) => {
					return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).gameObject.addBasicCameraView(engineCoreState, engineCoreService, gameObject, basicCameraView), api, meta3dEngineCoreExtensionProtocolName)
				},
				hasBasicCameraView: (meta3dState, gameObject) => {
					return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).gameObject.hasBasicCameraView(engineCoreState, engineCoreService, gameObject), api, meta3dEngineCoreExtensionProtocolName)
				},
				getPerspectiveCameraProjection: (meta3dState, gameObject) => {
					return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).gameObject.getPerspectiveCameraProjection(engineCoreState, engineCoreService, gameObject), api, meta3dEngineCoreExtensionProtocolName)
				},
				addPerspectiveCameraProjection: (meta3dState, gameObject, perspectiveCameraProjection) => {
					return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).gameObject.addPerspectiveCameraProjection(engineCoreState, engineCoreService, gameObject, perspectiveCameraProjection), api, meta3dEngineCoreExtensionProtocolName)
				},
				hasPerspectiveCameraProjection: (meta3dState, gameObject) => {
					return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).gameObject.hasPerspectiveCameraProjection(engineCoreState, engineCoreService, gameObject), api, meta3dEngineCoreExtensionProtocolName)
				},
				cloneGameObject: (meta3dState, count, cloneConfig, sourceGameObject) => {
					return _encapsulateSceneAPIReturnStateAndData(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).gameObject.cloneGameObject(engineCoreState, engineCoreService, count, cloneConfig, sourceGameObject), api, meta3dEngineCoreExtensionProtocolName)
				},
				getNeedDisposedGameObjects: (meta3dState) => {
					return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).gameObject.getNeedDisposedGameObjects(engineCoreState, engineCoreService), api, meta3dEngineCoreExtensionProtocolName)
				},
				disposeGameObjects: (meta3dState, gameObjects) => {
					return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).gameObject.disposeGameObjects(engineCoreState, engineCoreService, gameObjects), api, meta3dEngineCoreExtensionProtocolName)
				},
				disposeGameObjectTransformComponent: (meta3dState, gameObject, component) => {
					return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).gameObject.disposeGameObjectTransformComponent(engineCoreState, engineCoreService, gameObject, component), api, meta3dEngineCoreExtensionProtocolName)
				},
				disposeGameObjectPBRMaterialComponent: (meta3dState, gameObject, component) => {
					return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).gameObject.disposeGameObjectPBRMaterialComponent(engineCoreState, engineCoreService, gameObject, component), api, meta3dEngineCoreExtensionProtocolName)
				},
				disposeGameObjectGeometryComponent: (meta3dState, gameObject, component) => {
					return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).gameObject.disposeGameObjectGeometryComponent(engineCoreState, engineCoreService, gameObject, component), api, meta3dEngineCoreExtensionProtocolName)
				},
				disposeGameObjectBasicCameraViewComponent: (meta3dState, gameObject, component) => {
					return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).gameObject.disposeGameObjectBasicCameraViewComponent(engineCoreState, engineCoreService, gameObject, component), api, meta3dEngineCoreExtensionProtocolName)
				},
				disposeGameObjectPerspectiveCameraProjectionComponent: (meta3dState, gameObject, component) => {
					return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).gameObject.disposeGameObjectPerspectiveCameraProjectionComponent(engineCoreState, engineCoreService, gameObject, component), api, meta3dEngineCoreExtensionProtocolName)
				},
			},
			transform: {
				createTransform: (meta3dState) => {
					return _encapsulateSceneAPIReturnStateAndData(meta3dState, api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).transform.createTransform, api, meta3dEngineCoreExtensionProtocolName)
				},
				getLocalPosition: (meta3dState, transform) => {
					return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).transform.getLocalPosition(engineCoreState, engineCoreService, transform), api, meta3dEngineCoreExtensionProtocolName)
				},
				setLocalPosition: (meta3dState, transform, localPosition) => {
					return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).transform.setLocalPosition(engineCoreState, engineCoreService, transform, localPosition), api, meta3dEngineCoreExtensionProtocolName)
				},
				lookAt: (meta3dState, transform, target) => {
					return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).transform.lookAt(engineCoreState, engineCoreService, transform, target), api, meta3dEngineCoreExtensionProtocolName)
				},
			},
			basicCameraView: {
				createBasicCameraView: (meta3dState) => {
					return _encapsulateSceneAPIReturnStateAndData(meta3dState, api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).basicCameraView.createBasicCameraView, api, meta3dEngineCoreExtensionProtocolName)
				},
				active: (meta3dState, basicCameraView) => {
					return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).basicCameraView.active(engineCoreState, engineCoreService, basicCameraView), api, meta3dEngineCoreExtensionProtocolName)
				},
			},
			geometry: {
				createGeometry: (meta3dState) => {
					return _encapsulateSceneAPIReturnStateAndData(meta3dState, api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).geometry.createGeometry, api, meta3dEngineCoreExtensionProtocolName)
				},
				setVertices: (meta3dState, geometry, vertices) => {
					return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).geometry.setVertices(engineCoreState, engineCoreService, geometry, vertices), api, meta3dEngineCoreExtensionProtocolName)
				},
				setIndices: (meta3dState, geometry, indices) => {
					return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).geometry.setIndices(engineCoreState, engineCoreService, geometry, indices), api, meta3dEngineCoreExtensionProtocolName)
				},
			},
			pbrMaterial: {
				createPBRMaterial: (meta3dState) => {
					return _encapsulateSceneAPIReturnStateAndData(meta3dState, api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).pbrMaterial.createPBRMaterial, api, meta3dEngineCoreExtensionProtocolName)
				},
				setDiffuseColor: (meta3dState, pbrMaterial, diffuseColor) => {
					return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).pbrMaterial.setDiffuseColor(engineCoreState, engineCoreService, pbrMaterial, diffuseColor), api, meta3dEngineCoreExtensionProtocolName)
				},
				getAllPBRMaterials: (meta3dState) => {
					return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).pbrMaterial.getAllPBRMaterials(engineCoreState, engineCoreService), api, meta3dEngineCoreExtensionProtocolName)
				},
			},
			perspectiveCameraProjection: {
				createPerspectiveCameraProjection: (meta3dState) => {
					return _encapsulateSceneAPIReturnStateAndData(meta3dState, api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).perspectiveCameraProjection.createPerspectiveCameraProjection, api, meta3dEngineCoreExtensionProtocolName)
				},
				setFovy: (meta3dState, perspectiveCameraProjection, fovy) => {
					return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).perspectiveCameraProjection.setFovy(engineCoreState, engineCoreService, perspectiveCameraProjection, fovy), api, meta3dEngineCoreExtensionProtocolName)
				},
				setNear: (meta3dState, perspectiveCameraProjection, near) => {
					return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).perspectiveCameraProjection.setNear(engineCoreState, engineCoreService, perspectiveCameraProjection, near), api, meta3dEngineCoreExtensionProtocolName)
				},
				setFar: (meta3dState, perspectiveCameraProjection, far) => {
					return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).perspectiveCameraProjection.setFar(engineCoreState, engineCoreService, perspectiveCameraProjection, far), api, meta3dEngineCoreExtensionProtocolName)
				},
				setAspect: (meta3dState, perspectiveCameraProjection, aspect) => {
					return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => api.getExtensionService<engineSceneService>(
						meta3dState,
						meta3dEngineSceneExtensionProtocolName
					).perspectiveCameraProjection.setAspect(engineCoreState, engineCoreService, perspectiveCameraProjection, aspect), api, meta3dEngineCoreExtensionProtocolName)
				},
			}
		}
	}
}