import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
// import { state } from "meta3d-engine-scene-sceneview-protocol/src/state/StateType"
import { service } from "meta3d-engine-scene-sceneview-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-sceneview-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-sceneview-protocol/src/state/StateType"
// import { pipelineContribute } from "meta3d-engine-core-sceneview-protocol/src/contribute/work/PipelineContributeType"
// import { state as cameraPipelineState, states as cameraPipelineStates } from "meta3d-pipeline-camera-sceneview-protocol/src/StateType";
// import { config as cameraPipelineConfig } from "meta3d-pipeline-camera-sceneview-protocol/src/ConfigType";
// import { state as transformPipelineState, states as transformPipelineStates } from "meta3d-pipeline-transform-sceneview-protocol/src/StateType";
// import { config as transformPipelineConfig } from "meta3d-pipeline-transform-sceneview-protocol/src/ConfigType";
// import { state as webgpuTriangleState, states as webgpuTriangleStates } from "meta3d-pipeline-editor-webgpu-triangle-protocol/src/StateType";
// import { state as rootState, states as rootStates } from "meta3d-pipeline-root-sceneview-protocol/src/StateType";
import {
	addBasicCameraView, addGeometry, addPBRMaterial, addPerspectiveCameraProjection, addTransform, addArcballCameraController, cloneGameObject, createGameObject,
	disposeGameObjectArcballCameraControllerComponent,
	disposeGameObjectBasicCameraViewComponent, disposeGameObjectGeometryComponent, disposeGameObjectPBRMaterialComponent, disposeGameObjectPerspectiveCameraProjectionComponent, disposeGameObjects, disposeGameObjectTransformComponent, getAllGameObjects,
	getArcballCameraController,
	getBasicCameraView, getGeometry, getNeedDisposedGameObjects, getPBRMaterial, getPerspectiveCameraProjection, getTransform,
	hasArcballCameraController,
	hasBasicCameraView, hasGeometry, hasPBRMaterial, hasPerspectiveCameraProjection, hasTransform
} from "./GameObjectAPI"
import {
	createTransform,
	getGameObjects as getTransformGameObjects,
	getChildren, getLocalPosition, getParent, lookAt, setLocalPosition,
	getLocalRotation, setLocalRotation,
	getLocalScale, setLocalScale,
	setParent, getLocalToWorldMatrix
} from "./TransformAPI";
import { createPerspectiveCameraProjection, getAspect, getFar, getFovy, getNear, getPMatrix, setAspect, setFar, setFovy, setNear } from "./PerspectiveCameraProjectionAPI";
import { createPBRMaterial, getAllPBRMaterials, getDiffuseColor, setDiffuseColor, getGameObjects as getPBRMaterialGameObjects, getSpecular, setSpecular, getSpecularColor, setSpecularColor, getRoughness, setRoughness, getMetalness, setMetalness, getTransmission, setTransmission, getIOR, setIOR, getDiffuseMap, setDiffuseMap, getRoughnessMap, setRoughnessMap, getMetalnessMap, setMetalnessMap, getNormalMap, setNormalMap } from "./PBRMaterialAPI";
import { createGeometry, getIndices, getVertices, setIndices, setVertices, getGameObjects as getGeometryGameObjects } from "./GeometryAPI";
import {
	createBasicCameraView, active, getViewWorldToCameraMatrix, getActiveCameraView,
	getGameObjects as getBasicCameraViewGameObjects
} from "./BasicCameraViewAPI";
import {
	createArcballCameraController,
	// getAllDirtyArcballCameraControllers, clearDirtyList,
	getDistance, setDistance, getPhi, setPhi, getTheta, setTheta, getTarget, setTarget, getGameObjects as getArcballCameraControllerGameObjects
} from "./ArcballCameraControllerAPI"
import { componentContribute } from "meta3d-engine-core-sceneview-protocol/src/contribute/scene_graph/ComponentContributeType"
import { gameObjectContribute } from "meta3d-engine-core-sceneview-protocol/src/contribute/scene_graph/GameObjectContributeType"
import { state as transformState, config as transformConfig, transform, componentName as transformComponentName } from "meta3d-component-transform-protocol";
import { state as arcballCameraControllerState, componentName as arcballCameraControllerComponentName, config as arcballCameraControllerConfig, arcballCameraController } from "meta3d-component-arcballcameracontroller-protocol"
import { state as perspecticeCameraProjectionState, componentName as perspecticeCameraProjectionComponentName, config as perspecticeCameraProjectionConfig, perspectiveCameraProjection } from "meta3d-component-perspectivecameraprojection-protocol"
import { state as basicCameraViewState, componentName as basicCameraViewComponentName, config as basicCameraViewConfig, basicCameraView } from "meta3d-component-basiccameraview-protocol"
import { state as pbrMaterialState, componentName as pbrMaterialComponentName, config as pbrMaterialConfig, pbrMaterial } from "meta3d-component-pbrmaterial-protocol"
import { state as geometryState, componentName as geometryComponentName, config as geometryConfig, geometry } from "meta3d-component-geometry-protocol"
import { state as directionlightState, config as directionLightConfig, directionLight, componentName as directionLightComponentName } from "meta3d-component-directionlight-protocol";
import { state as gameObjectState } from "meta3d-gameobject-protocol";
// import { active, createBasicCameraView } from "./BasicCameraViewAPI"
// import { createPerspectiveCameraProjection, setAspect, setFar, setFovy, setNear } from "./PerspectiveCameraProjectionAPI"
// import { pipeline as pipelineRootPipeline, job as pipelineRootJob } from "meta3d-pipeline-root-sceneview-protocol/src/StateType"
// import { pipeline as pipelineCameraPipeline, job as pipelineCameraJob } from "meta3d-pipeline-camera-sceneview-protocol/src/StateType"
import { service as textureService } from "meta3d-texture-basicsource-protocol/src/service/ServiceType"
import { texture, state as textureState, wrap } from "meta3d-texture-basicsource-protocol/src/state/StateType"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"
import { isActuallyDisposePBRMateiral } from "meta3d-component-commonlib"

let _engineCoreProtocolName: string


let _encapsulateSceneAPIReturnState = (meta3dState: meta3dState, func: (engineCoreState: engineCoreState, engineCoreService: engineCoreService) => engineCoreState, api: api): meta3dState => {
	let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, _engineCoreProtocolName)

	let engineCoreService = api.getExtensionService<engineCoreService>(
		meta3dState,
		_engineCoreProtocolName
	)

	meta3dState =
		api.setExtensionState(
			meta3dState,
			_engineCoreProtocolName,
			func(engineCoreState, engineCoreService)
		)

	return meta3dState
}

let _encapsulateSceneAPIReturnData = <Data>(meta3dState: meta3dState, func: (engineCoreState: engineCoreState, engineCoreService: engineCoreService) => Data, api: api): Data => {
	let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, _engineCoreProtocolName)

	let engineCoreService = api.getExtensionService<engineCoreService>(
		meta3dState,
		_engineCoreProtocolName
	)

	return func(engineCoreState, engineCoreService)
}

let _encapsulateSceneAPIReturnStateAndData = <Data>(meta3dState: meta3dState, func: (engineCoreState: engineCoreState, engineCoreService: engineCoreService) => [engineCoreState, Data], api: api): [meta3dState, Data] => {
	let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, _engineCoreProtocolName)

	let engineCoreService = api.getExtensionService<engineCoreService>(
		meta3dState,
		_engineCoreProtocolName
	)

	let data = func(engineCoreState, engineCoreService)

	meta3dState =
		api.setExtensionState(
			meta3dState,
			_engineCoreProtocolName,
			data[0]
		)

	return [meta3dState, data[1]]
}


let _encapsulateSceneAPIReturnStateAndDataForBasicSourceTexture = <Data>(meta3dState: meta3dState, func: (textureState: textureState, textureService: textureService) => [textureState, Data], api: api): [meta3dState, Data] => {
	let textureState = api.getExtensionState<textureState>(meta3dState, "meta3d-texture-basicsource-protocol")

	let textureService = api.getExtensionService<textureService>(
		meta3dState,
		"meta3d-texture-basicsource-protocol"
	)

	let data = func(textureState, textureService)

	meta3dState =
		api.setExtensionState(
			meta3dState,
			"meta3d-texture-basicsource-protocol",
			data[0]
		)

	return [meta3dState, data[1]]
}


let _encapsulateSceneAPIReturnStateForBasicSourceTexture = (meta3dState: meta3dState, func: (textureState: textureState, textureService: textureService) => textureState, api: api): meta3dState => {
	let textureState = api.getExtensionState<textureState>(meta3dState, "meta3d-texture-basicsource-protocol")

	let textureService = api.getExtensionService<textureService>(
		meta3dState,
		"meta3d-texture-basicsource-protocol"
	)

	meta3dState =
		api.setExtensionState(
			meta3dState,
			"meta3d-texture-basicsource-protocol",
			func(textureState, textureService)
		)

	return meta3dState
}

let _encapsulateSceneAPIReturnDataForBasicSourceTexture = <Data>(meta3dState: meta3dState, func: (textureState: textureState, textureService: textureService) => Data, api: api): Data => {
	let textureState = api.getExtensionState<textureState>(meta3dState, "meta3d-texture-basicsource-protocol")

	let textureService = api.getExtensionService<textureService>(
		meta3dState,
		"meta3d-texture-basicsource-protocol"
	)

	return func(textureState, textureService)
}

let _addMaterial = (meta3dState: meta3dState, api: api, texture: texture, pbrMaterial: pbrMaterial) => {
	let textureService = api.getExtensionService<textureService>(meta3dState, "meta3d-texture-basicsource-protocol")

	let textureState = api.getExtensionState<textureState>(meta3dState, "meta3d-texture-basicsource-protocol")

	return api.setExtensionState(meta3dState, "meta3d-texture-basicsource-protocol",
		textureService.addMaterial(textureState, texture, pbrMaterial)
	)
}

let _disposeTexture = (meta3dState: meta3dState, api: api, getMapFunc: any, pbrMaterial: pbrMaterial) => {
	let texture = _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getMapFunc(engineCoreState, engineCoreService, pbrMaterial), api)

	if (!isNullable(texture)) {
		let textureService = api.getExtensionService<textureService>(meta3dState, "meta3d-texture-basicsource-protocol")

		let textureState = api.getExtensionState<textureState>(meta3dState, "meta3d-texture-basicsource-protocol")

		meta3dState = api.setExtensionState(meta3dState, "meta3d-texture-basicsource-protocol",
			textureService.disposeTexture(textureState, texture, pbrMaterial)
		)
	}

	return meta3dState
}


let _disposeAllMaps = (meta3dState: meta3dState, api: api, pbrMaterial: pbrMaterial) => {
	meta3dState = _disposeTexture(meta3dState, api, getDiffuseMap, pbrMaterial)
	meta3dState = _disposeTexture(meta3dState, api, getRoughnessMap, pbrMaterial)
	meta3dState = _disposeTexture(meta3dState, api, getMetalnessMap, pbrMaterial)
	meta3dState = _disposeTexture(meta3dState, api, getNormalMap, pbrMaterial)

	return meta3dState
}


export let getExtensionServiceUtils = (
	registerPipelineFunc: any,
	api: api, engineCoreProtocolName: string): service => {
	_engineCoreProtocolName = engineCoreProtocolName

	return {
		prepare: (meta3dState: meta3dState, isDebug, ecsConfig) => {
			let {
				float9Array1,
				float32Array1,
				transformCount,
				geometryCount,
				geometryPointCount,
				pbrMaterialCount
			} = ecsConfig

			let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, _engineCoreProtocolName)

			let engineCoreService = api.getExtensionService<engineCoreService>(
				meta3dState,
				_engineCoreProtocolName
			)

			let { registerPipeline, registerComponent, setGameObjectContribute, createAndSetComponentState, createAndSetGameObjectState } = engineCoreService

			engineCoreState = registerPipelineFunc(engineCoreState, engineCoreService, meta3dState, isDebug)

			// engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<cameraPipelineConfig, cameraPipelineState>>(meta3dState, pipelineCameraProtocolName),
			// 	{
			// 		isDebug,
			// 	},
			// 	[
			// 		{
			// 			pipelineName: pipelineRootPipeline.Update,
			// 			insertElementName: pipelineRootJob.Update,
			// 			insertAction: "after"
			// 		}
			// 	]
			// )

			// engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<transformPipelineConfig, transformPipelineState>>(meta3dState, pipelineTransformProtocolName),
			// 	null,
			// 	[
			// 		{
			// 			pipelineName: pipelineCameraPipeline.Update,
			// 			insertElementName: pipelineCameraJob.UpdateCamera,
			// 			insertAction: "after"
			// 		},
			// 	]
			// )


			engineCoreState =
				registerComponent(engineCoreState, api.getContribute<componentContribute<transformState, transformConfig, transform>>(meta3dState, "meta3d-component-transform-protocol"))

			engineCoreState =
				registerComponent(engineCoreState, api.getContribute<componentContribute<geometryState, geometryConfig, geometry>>(meta3dState, "meta3d-component-geometry-protocol"))

			engineCoreState =
				registerComponent(engineCoreState, api.getContribute<componentContribute<pbrMaterialState, pbrMaterialConfig, pbrMaterial>>(meta3dState, "meta3d-component-pbrmaterial-protocol"))

			engineCoreState =
				registerComponent(engineCoreState, api.getContribute<componentContribute<basicCameraViewState, basicCameraViewConfig, basicCameraView>>(meta3dState, "meta3d-component-basiccameraview-protocol"))

			engineCoreState =
				registerComponent(engineCoreState, api.getContribute<componentContribute<perspecticeCameraProjectionState, perspecticeCameraProjectionConfig, perspectiveCameraProjection>>(meta3dState, "meta3d-component-perspectivecameraprojection-protocol"))

			engineCoreState =
				registerComponent(engineCoreState, api.getContribute<componentContribute<arcballCameraControllerState, arcballCameraControllerConfig, arcballCameraController>>(meta3dState, "meta3d-component-arcballcameracontroller-protocol"))

			engineCoreState =
				registerComponent(engineCoreState, api.getContribute<componentContribute<directionlightState, directionLightConfig, directionLight>>(meta3dState, "meta3d-component-directionlight-protocol"))



			engineCoreState = createAndSetComponentState<transformConfig>(engineCoreState, transformComponentName, {
				isDebug,
				float9Array1,
				float32Array1,
				transformCount
			})
			engineCoreState = createAndSetComponentState<pbrMaterialConfig>(engineCoreState, pbrMaterialComponentName, {
				isDebug,
				pbrMaterialCount
			})
			engineCoreState = createAndSetComponentState<geometryConfig>(engineCoreState, geometryComponentName, {
				isDebug,
				geometryCount,
				geometryPointCount
			})
			engineCoreState = createAndSetComponentState<basicCameraViewConfig>(engineCoreState, basicCameraViewComponentName, {
				isDebug
			})
			engineCoreState = createAndSetComponentState<perspecticeCameraProjectionConfig>(engineCoreState, perspecticeCameraProjectionComponentName, {
				isDebug
			})
			engineCoreState = createAndSetComponentState<arcballCameraControllerConfig>(engineCoreState, arcballCameraControllerComponentName, {
				isDebug
			})
			// TODO get directionLightCount from config
			engineCoreState = createAndSetComponentState<directionLightConfig>(engineCoreState, directionLightComponentName, {
				isDebug,
				directionLightCount: 4
			})



			engineCoreState =
				setGameObjectContribute(engineCoreState, api.getContribute<gameObjectContribute<gameObjectState>>(meta3dState, "meta3d-gameobject-protocol"))

			engineCoreState = createAndSetGameObjectState(engineCoreState, { isDebug })







			// engineCoreState = engineCoreService.init(engineCoreState, meta3dState)







			meta3dState =
				api.setExtensionState(
					meta3dState,
					_engineCoreProtocolName,
					engineCoreState
				)



			return meta3dState
		},
		// gameObject: {
		// 	addBasicCameraView, addGeometry, addPBRMaterial, addPerspectiveCameraProjection, addTransform, addArcballCameraController, cloneGameObject, createGameObject,
		// 	disposeGameObjectArcballCameraControllerComponent,
		// 	disposeGameObjectBasicCameraViewComponent, disposeGameObjectGeometryComponent, disposeGameObjectPBRMaterialComponent, disposeGameObjectPerspectiveCameraProjectionComponent, disposeGameObjects, disposeGameObjectTransformComponent, getAllGameObjects,
		// 	getArcballCameraController,
		// 	getBasicCameraView, getGeometry, getNeedDisposedGameObjects, getPBRMaterial, getPerspectiveCameraProjection, getTransform,
		// 	hasArcballCameraController,
		// 	hasBasicCameraView, hasGeometry, hasPBRMaterial, hasPerspectiveCameraProjection, hasTransform
		// },
		// transform: {
		// 	createTransform, getLocalPosition, lookAt, setLocalPosition
		// },
		// geometry: {
		// 	createGeometry, setIndices, setVertices
		// },
		// pbrMaterial: {
		// 	createPBRMaterial, getAllPBRMaterials, setDiffuseColor
		// },
		// arcballCameraController: {
		// 	createArcballCameraController,

		// 	// getAllDirtyArcballCameraControllers, clearDirtyList,

		// 	getDistance, setDistance, getPhi, setPhi, getTheta, setTheta, getTarget, setTarget, getArcballCameraControllerGameObjects
		// },
		// perspectiveCameraProjection: {
		// 	createPerspectiveCameraProjection, setAspect, setFar, setFovy, setNear
		// },
		// basicCameraView: {
		// 	createBasicCameraView, active
		// }
		gameObject: {
			createGameObject: (meta3dState) => {
				return _encapsulateSceneAPIReturnStateAndData(meta3dState, createGameObject, api)
			},
			getAllGameObjects: (meta3dState) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getAllGameObjects(engineCoreState, engineCoreService), api)
			},
			getTransform: (meta3dState, gameObject) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getTransform(engineCoreState, engineCoreService, gameObject), api)
			},
			addTransform: (meta3dState, gameObject, transform) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => addTransform(engineCoreState, engineCoreService, gameObject, transform), api)
			},
			hasTransform: (meta3dState, gameObject) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => hasTransform(engineCoreState, engineCoreService, gameObject), api)
			},
			getGeometry: (meta3dState, gameObject) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getGeometry(engineCoreState, engineCoreService, gameObject), api)
			},
			addGeometry: (meta3dState, gameObject, geometry) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => addGeometry(engineCoreState, engineCoreService, gameObject, geometry), api)
			},
			hasGeometry: (meta3dState, gameObject) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => hasGeometry(engineCoreState, engineCoreService, gameObject), api)
			},
			getPBRMaterial: (meta3dState, gameObject) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getPBRMaterial(engineCoreState, engineCoreService, gameObject), api)
			},
			addPBRMaterial: (meta3dState, gameObject, pbrMaterial) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => addPBRMaterial(engineCoreState, engineCoreService, gameObject, pbrMaterial), api)
			},
			hasPBRMaterial: (meta3dState, gameObject) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => hasPBRMaterial(engineCoreState, engineCoreService, gameObject), api)
			},
			getBasicCameraView: (meta3dState, gameObject) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getBasicCameraView(engineCoreState, engineCoreService, gameObject), api)
			},
			addBasicCameraView: (meta3dState, gameObject, basicCameraView) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => addBasicCameraView(engineCoreState, engineCoreService, gameObject, basicCameraView), api)
			},
			hasBasicCameraView: (meta3dState, gameObject) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => hasBasicCameraView(engineCoreState, engineCoreService, gameObject), api)
			},
			getPerspectiveCameraProjection: (meta3dState, gameObject) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getPerspectiveCameraProjection(engineCoreState, engineCoreService, gameObject), api)
			},
			addPerspectiveCameraProjection: (meta3dState, gameObject, perspectiveCameraProjection) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => addPerspectiveCameraProjection(engineCoreState, engineCoreService, gameObject, perspectiveCameraProjection), api)
			},
			hasPerspectiveCameraProjection: (meta3dState, gameObject) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => hasPerspectiveCameraProjection(engineCoreState, engineCoreService, gameObject), api)
			},
			getArcballCameraController: (meta3dState, gameObject) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getArcballCameraController(engineCoreState, engineCoreService, gameObject), api)
			},
			addArcballCameraController: (meta3dState, gameObject, arcballCameraController) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => addArcballCameraController(engineCoreState, engineCoreService, gameObject, arcballCameraController), api)
			},
			hasArcballCameraController: (meta3dState, gameObject) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => hasArcballCameraController(engineCoreState, engineCoreService, gameObject), api)
			},
			cloneGameObject: (meta3dState, count, cloneConfig, sourceGameObject) => {
				// TODO add texture to cloned pbr material

				return _encapsulateSceneAPIReturnStateAndData(meta3dState, (engineCoreState, engineCoreService) => cloneGameObject(engineCoreState, engineCoreService, count, cloneConfig, sourceGameObject), api)
			},
			getNeedDisposedGameObjects: (meta3dState) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getNeedDisposedGameObjects(engineCoreState, engineCoreService), api)
			},
			disposeGameObjects: (meta3dState, gameObjects) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => disposeGameObjects(engineCoreState, engineCoreService, gameObjects), api)
			},
			disposeGameObjectTransformComponent: (meta3dState, gameObject, component) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => disposeGameObjectTransformComponent(engineCoreState, engineCoreService, gameObject, component), api)
			},
			disposeGameObjectPBRMaterialComponent: (meta3dState, gameObject, component) => {
				meta3dState = _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => disposeGameObjectPBRMaterialComponent(engineCoreState, engineCoreService, gameObject, component), api)


				let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, _engineCoreProtocolName)

				let engineCoreService = api.getExtensionService<engineCoreService>(
					meta3dState,
					_engineCoreProtocolName
				)

				if (isActuallyDisposePBRMateiral(
					engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, pbrMaterialComponentName).state as any as pbrMaterialState,
					component, [gameObject]
				)) {
					meta3dState = _disposeAllMaps(meta3dState, api, component)
				}

				return meta3dState
			},
			disposeGameObjectGeometryComponent: (meta3dState, gameObject, component) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => disposeGameObjectGeometryComponent(engineCoreState, engineCoreService, gameObject, component), api)
			},
			disposeGameObjectBasicCameraViewComponent: (meta3dState, gameObject, component) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => disposeGameObjectBasicCameraViewComponent(engineCoreState, engineCoreService, gameObject, component), api)
			},
			disposeGameObjectPerspectiveCameraProjectionComponent: (meta3dState, gameObject, component) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => disposeGameObjectPerspectiveCameraProjectionComponent(engineCoreState, engineCoreService, gameObject, component), api)
			},
			disposeGameObjectArcballCameraControllerComponent: (meta3dState, gameObject, component) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => disposeGameObjectArcballCameraControllerComponent(engineCoreState, engineCoreService, gameObject, component), api)
			},
		},
		transform: {
			createTransform: (meta3dState) => {
				return _encapsulateSceneAPIReturnStateAndData(meta3dState, createTransform, api)
			},
			getGameObjects: (meta3dState, transform) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getTransformGameObjects(engineCoreState, engineCoreService, transform), api)
			},
			getParent: (meta3dState, transform) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getParent(engineCoreState, engineCoreService, transform), api)
			},
			setParent: (meta3dState, transform, parent) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => setParent(engineCoreState, engineCoreService, transform, parent), api)
			},
			getChildren: (meta3dState, transform) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getChildren(engineCoreState, engineCoreService, transform), api)
			},
			getLocalPosition: (meta3dState, transform) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getLocalPosition(engineCoreState, engineCoreService, transform), api)
			},
			setLocalPosition: (meta3dState, transform, localPosition) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => setLocalPosition(engineCoreState, engineCoreService, transform, localPosition), api)
			},
			getLocalRotation: (meta3dState, transform) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getLocalRotation(engineCoreState, engineCoreService, transform), api)
			},
			setLocalRotation: (meta3dState, transform, localRotation) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => setLocalRotation(engineCoreState, engineCoreService, transform, localRotation), api)
			},
			getLocalScale: (meta3dState, transform) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getLocalScale(engineCoreState, engineCoreService, transform), api)
			},
			setLocalScale: (meta3dState, transform, localScale) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => setLocalScale(engineCoreState, engineCoreService, transform, localScale), api)
			},
			getLocalToWorldMatrix: (meta3dState, transform) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getLocalToWorldMatrix(engineCoreState, engineCoreService, transform), api)
			},
			lookAt: (meta3dState, transform, target) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => lookAt(engineCoreState, engineCoreService, transform, target), api)
			},
		},
		basicCameraView: {
			createBasicCameraView: (meta3dState) => {
				return _encapsulateSceneAPIReturnStateAndData(meta3dState, createBasicCameraView, api)
			},
			getGameObjects: (meta3dState, basicCameraView) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getBasicCameraViewGameObjects(engineCoreState, engineCoreService, basicCameraView), api)
			},
			active: (meta3dState, basicCameraView) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => active(engineCoreState, engineCoreService, basicCameraView), api)
			},
			getViewWorldToCameraMatrix: (meta3dState, basicCameraView) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getViewWorldToCameraMatrix(engineCoreState, engineCoreService, basicCameraView), api)
			},
			getActiveCameraView: (meta3dState, isDebug) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getActiveCameraView(engineCoreState, engineCoreService, isDebug), api)
			},
		},
		geometry: {
			createGeometry: (meta3dState) => {
				return _encapsulateSceneAPIReturnStateAndData(meta3dState, createGeometry, api)
			},
			getVertices: (meta3dState, geometry) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getVertices(engineCoreState, engineCoreService, geometry), api)
			},
			setVertices: (meta3dState, geometry, vertices) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => setVertices(engineCoreState, engineCoreService, geometry, vertices), api)
			},
			getIndices: (meta3dState, geometry) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getIndices(engineCoreState, engineCoreService, geometry), api)
			},
			setIndices: (meta3dState, geometry, indices) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => setIndices(engineCoreState, engineCoreService, geometry, indices), api)
			},
			getGameObjects: (meta3dState, geometry) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getGeometryGameObjects(engineCoreState, engineCoreService, geometry), api)
			},
		},
		pbrMaterial: {
			createPBRMaterial: (meta3dState) => {
				return _encapsulateSceneAPIReturnStateAndData(meta3dState, createPBRMaterial, api)
			},
			getDiffuseColor: (meta3dState, pbrMaterial) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getDiffuseColor(engineCoreState, engineCoreService, pbrMaterial), api)
			},
			setDiffuseColor: (meta3dState, pbrMaterial, diffuseColor) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => setDiffuseColor(engineCoreState, engineCoreService, pbrMaterial, diffuseColor), api)
			},
			getSpecular: (meta3dState, pbrMaterial) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getSpecular(engineCoreState, engineCoreService, pbrMaterial), api)
			},
			setSpecular: (meta3dState, pbrMaterial, specular) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => setSpecular(engineCoreState, engineCoreService, pbrMaterial, specular), api)
			},
			getSpecularColor: (meta3dState, pbrMaterial) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getSpecularColor(engineCoreState, engineCoreService, pbrMaterial), api)
			},
			setSpecularColor: (meta3dState, pbrMaterial, specularColor) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => setSpecularColor(engineCoreState, engineCoreService, pbrMaterial, specularColor), api)
			},
			getRoughness: (meta3dState, pbrMaterial) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getRoughness(engineCoreState, engineCoreService, pbrMaterial), api)
			},
			setRoughness: (meta3dState, pbrMaterial, roughness) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => setRoughness(engineCoreState, engineCoreService, pbrMaterial, roughness), api)
			},
			getMetalness: (meta3dState, pbrMaterial) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getMetalness(engineCoreState, engineCoreService, pbrMaterial), api)
			},
			setMetalness: (meta3dState, pbrMaterial, metalness) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => setMetalness(engineCoreState, engineCoreService, pbrMaterial, metalness), api)
			},
			getTransmission: (meta3dState, pbrMaterial) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getTransmission(engineCoreState, engineCoreService, pbrMaterial), api)
			},
			setTransmission: (meta3dState, pbrMaterial, transmission) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => setTransmission(engineCoreState, engineCoreService, pbrMaterial, transmission), api)
			},
			getIOR: (meta3dState, pbrMaterial) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getIOR(engineCoreState, engineCoreService, pbrMaterial), api)
			},
			setIOR: (meta3dState, pbrMaterial, ior) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => setIOR(engineCoreState, engineCoreService, pbrMaterial, ior), api)
			},
			getDiffuseMap: (meta3dState, pbrMaterial) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getDiffuseMap(engineCoreState, engineCoreService, pbrMaterial), api)
			},
			setDiffuseMap: (meta3dState, pbrMaterial, texture) => {
				meta3dState = _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => setDiffuseMap(engineCoreState, engineCoreService, pbrMaterial, texture), api)

				return _addMaterial(meta3dState, api, texture, pbrMaterial)
			},
			getRoughnessMap: (meta3dState, pbrMaterial) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getRoughnessMap(engineCoreState, engineCoreService, pbrMaterial), api)
			},
			setRoughnessMap: (meta3dState, pbrMaterial, texture) => {
				meta3dState = _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => setRoughnessMap(engineCoreState, engineCoreService, pbrMaterial, texture), api)

				return _addMaterial(meta3dState, api, texture, pbrMaterial)
			},
			getMetalnessMap: (meta3dState, pbrMaterial) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getMetalnessMap(engineCoreState, engineCoreService, pbrMaterial), api)
			},
			setMetalnessMap: (meta3dState, pbrMaterial, texture) => {
				meta3dState = _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => setMetalnessMap(engineCoreState, engineCoreService, pbrMaterial, texture), api)

				return _addMaterial(meta3dState, api, texture, pbrMaterial)
			},
			getNormalMap: (meta3dState, pbrMaterial) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getNormalMap(engineCoreState, engineCoreService, pbrMaterial), api)
			},
			setNormalMap: (meta3dState, pbrMaterial, texture) => {
				meta3dState = _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => setNormalMap(engineCoreState, engineCoreService, pbrMaterial, texture), api)

				return _addMaterial(meta3dState, api, texture, pbrMaterial)
			},
			getAllPBRMaterials: (meta3dState) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getAllPBRMaterials(engineCoreState, engineCoreService), api)
			},
			getGameObjects: (meta3dState, pbrMaterial) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getPBRMaterialGameObjects(engineCoreState, engineCoreService, pbrMaterial), api)
			},
		},
		basicSourceTexture: {
			createTexture: (meta3dState) => {
				return _encapsulateSceneAPIReturnStateAndDataForBasicSourceTexture(meta3dState, (textureState, textureService) => {
					return textureService.createTexture(textureState)
				}, api)
			},
			disposeTexture: (meta3dState, texture, material) => {
				return _encapsulateSceneAPIReturnStateForBasicSourceTexture(meta3dState, (textureState, textureService) => {
					return textureService.disposeTexture(textureState, texture, material)
				}, api)
			},
			addMaterial: (meta3dState, texture, material) => {
				return _encapsulateSceneAPIReturnStateForBasicSourceTexture(meta3dState, (textureState, textureService) => {
					return textureService.addMaterial(textureState, texture, material)
				}, api)
			},
			getWrapS: (meta3dState, texture) => {
				return _encapsulateSceneAPIReturnDataForBasicSourceTexture(meta3dState, (textureState, textureService) => textureService.getWrapS(textureState, texture), api)
			},
			setWrapS: (meta3dState, texture, wrapS) => {
				return _encapsulateSceneAPIReturnStateForBasicSourceTexture(meta3dState, (textureState, textureService) => textureService.setWrapS(textureState, texture, wrapS), api)
			},
			getWrapT: (meta3dState, texture) => {
				return _encapsulateSceneAPIReturnDataForBasicSourceTexture(meta3dState, (textureState, textureService) => textureService.getWrapT(textureState, texture), api)
			},
			setWrapT: (meta3dState, texture, wrapT) => {
				return _encapsulateSceneAPIReturnStateForBasicSourceTexture(meta3dState, (textureState, textureService) => textureService.setWrapT(textureState, texture, wrapT), api)
			},
			getMagFilter: (meta3dState, texture) => {
				return _encapsulateSceneAPIReturnDataForBasicSourceTexture(meta3dState, (textureState, textureService) => textureService.getMagFilter(textureState, texture), api)
			},
			setMagFilter: (meta3dState, texture, filter) => {
				return _encapsulateSceneAPIReturnStateForBasicSourceTexture(meta3dState, (textureState, textureService) => textureService.setMagFilter(textureState, texture, filter), api)
			},
			getMinFilter: (meta3dState, texture) => {
				return _encapsulateSceneAPIReturnDataForBasicSourceTexture(meta3dState, (textureState, textureService) => textureService.getMinFilter(textureState, texture), api)
			},
			setMinFilter: (meta3dState, texture, filter) => {
				return _encapsulateSceneAPIReturnStateForBasicSourceTexture(meta3dState, (textureState, textureService) => textureService.setMinFilter(textureState, texture, filter), api)
			},
			getFormat: (meta3dState, texture) => {
				return _encapsulateSceneAPIReturnDataForBasicSourceTexture(meta3dState, (textureState, textureService) => textureService.getFormat(textureState, texture), api)
			},
			setFormat: (meta3dState, texture, format) => {
				return _encapsulateSceneAPIReturnStateForBasicSourceTexture(meta3dState, (textureState, textureService) => textureService.setFormat(textureState, texture, format), api)
			},
			getType: (meta3dState, texture) => {
				return _encapsulateSceneAPIReturnDataForBasicSourceTexture(meta3dState, (textureState, textureService) => textureService.getType(textureState, texture), api)
			},
			setType: (meta3dState, texture, type) => {
				return _encapsulateSceneAPIReturnStateForBasicSourceTexture(meta3dState, (textureState, textureService) => textureService.setType(textureState, texture, type), api)
			},
			getIsNeedUpdate: (meta3dState, texture) => {
				return _encapsulateSceneAPIReturnDataForBasicSourceTexture(meta3dState, (textureState, textureService) => textureService.getIsNeedUpdate(textureState, texture), api)
			},
			setIsNeedUpdate: (meta3dState, texture, isNeedUpdate) => {
				return _encapsulateSceneAPIReturnStateForBasicSourceTexture(meta3dState, (textureState, textureService) => textureService.setIsNeedUpdate(textureState, texture, isNeedUpdate), api)
			},
			getFlipY: (meta3dState, texture) => {
				return _encapsulateSceneAPIReturnDataForBasicSourceTexture(meta3dState, (textureState, textureService) => textureService.getFlipY(textureState, texture), api)
			},
			setFlipY: (meta3dState, texture, flipY) => {
				return _encapsulateSceneAPIReturnStateForBasicSourceTexture(meta3dState, (textureState, textureService) => textureService.setFlipY(textureState, texture, flipY), api)
			},
			getImage: (meta3dState, texture) => {
				return _encapsulateSceneAPIReturnDataForBasicSourceTexture(meta3dState, (textureState, textureService) => textureService.getImage(textureState, texture), api)
			},
			setImage: (meta3dState, texture, image) => {
				return _encapsulateSceneAPIReturnStateForBasicSourceTexture(meta3dState, (textureState, textureService) => textureService.setImage(textureState, texture, image), api)
			},
		},
		perspectiveCameraProjection: {
			createPerspectiveCameraProjection: (meta3dState) => {
				return _encapsulateSceneAPIReturnStateAndData(meta3dState, createPerspectiveCameraProjection, api)
			},
			getPMatrix: (meta3dState, perspectiveCameraProjection) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getPMatrix(engineCoreState, engineCoreService, perspectiveCameraProjection), api)
			},
			getFovy: (meta3dState, perspectiveCameraProjection) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getFovy(engineCoreState, engineCoreService, perspectiveCameraProjection), api)
			},
			setFovy: (meta3dState, perspectiveCameraProjection, fovy) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => setFovy(engineCoreState, engineCoreService, perspectiveCameraProjection, fovy), api)
			},
			getNear: (meta3dState, perspectiveCameraProjection) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getNear(engineCoreState, engineCoreService, perspectiveCameraProjection), api)
			},
			setNear: (meta3dState, perspectiveCameraProjection, near) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => setNear(engineCoreState, engineCoreService, perspectiveCameraProjection, near), api)
			},
			getFar: (meta3dState, perspectiveCameraProjection) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getFar(engineCoreState, engineCoreService, perspectiveCameraProjection), api)
			},
			setFar: (meta3dState, perspectiveCameraProjection, far) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => setFar(engineCoreState, engineCoreService, perspectiveCameraProjection, far), api)
			},
			getAspect: (meta3dState, perspectiveCameraProjection) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getAspect(engineCoreState, engineCoreService, perspectiveCameraProjection), api)
			},
			setAspect: (meta3dState, perspectiveCameraProjection, aspect) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => setAspect(engineCoreState, engineCoreService, perspectiveCameraProjection, aspect), api)
			},
		},
		arcballCameraController: {
			createArcballCameraController: (meta3dState) => {
				return _encapsulateSceneAPIReturnStateAndData(meta3dState, createArcballCameraController, api)
			},
			// getAllDirtyArcballCameraControllers: (meta3dState) => {
			// 	return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getAllDirtyArcballCameraControllers(engineCoreState, engineCoreService), api)
			// },
			// clearDirtyList: (meta3dState) => {
			// 	return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => clearDirtyList(engineCoreState, engineCoreService), api)
			// },
			getDistance: (meta3dState, arcballCameraController) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getDistance(engineCoreState, engineCoreService, arcballCameraController), api)
			},
			setDistance: (meta3dState, arcballCameraController, value) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => setDistance(engineCoreState, engineCoreService, arcballCameraController, value), api)
			},
			getTarget: (meta3dState, arcballCameraController) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getTarget(engineCoreState, engineCoreService, arcballCameraController), api)
			},
			setTarget: (meta3dState, arcballCameraController, value) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => setTarget(engineCoreState, engineCoreService, arcballCameraController, value), api)
			},
			getPhi: (meta3dState, arcballCameraController) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getPhi(engineCoreState, engineCoreService, arcballCameraController), api)
			},
			setPhi: (meta3dState, arcballCameraController, value) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => setPhi(engineCoreState, engineCoreService, arcballCameraController, value), api)
			},
			getTheta: (meta3dState, arcballCameraController) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getTheta(engineCoreState, engineCoreService, arcballCameraController), api)
			},
			setTheta: (meta3dState, arcballCameraController, value) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => setTheta(engineCoreState, engineCoreService, arcballCameraController, value), api)
			},
			getGameObjects: (meta3dState, arcballCameraController) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getArcballCameraControllerGameObjects(engineCoreState, engineCoreService, arcballCameraController), api)
			},
		},

	}
}