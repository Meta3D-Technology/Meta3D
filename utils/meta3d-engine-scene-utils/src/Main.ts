import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
// import { state } from "meta3d-engine-scene-protocol/src/state/StateType"
import { service } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { service as coreService } from "meta3d-core-protocol/src/service/ServiceType"
import { engineCoreService } from "meta3d-core-protocol/src/service/ServiceType"
// import { pipelineContribute } from "meta3d-core-protocol/src/service/ServiceType"
// import { state as cameraPipelineState, states as cameraPipelineStates } from "meta3d-pipeline-camera-protocol/src/StateType";
// import { config as cameraPipelineConfig } from "meta3d-pipeline-camera-protocol/src/ConfigType";
// import { state as transformPipelineState, states as transformPipelineStates } from "meta3d-pipeline-transform-protocol/src/StateType";
// import { config as transformPipelineConfig } from "meta3d-pipeline-transform-protocol/src/ConfigType";
// import { state as webgpuTriangleState, states as webgpuTriangleStates } from "meta3d-pipeline-editor-webgpu-triangle-protocol/src/StateType";
import {
	addBasicCameraView, addGeometry, addPBRMaterial, addPerspectiveCameraProjection, addTransform, addArcballCameraController, cloneGameObject, createGameObject,
	disposeGameObjectArcballCameraControllerComponent,
	disposeGameObjectBasicCameraViewComponent, disposeGameObjectGeometryComponent, disposeGameObjectPBRMaterialComponent, disposeGameObjectPerspectiveCameraProjectionComponent, disposeGameObjects, disposeGameObjectTransformComponent, getAllGameObjects,
	getArcballCameraController,
	getBasicCameraView, getGeometry, getNeedDisposedGameObjects, getPBRMaterial, getPerspectiveCameraProjection, getTransform,
	hasArcballCameraController,
	hasBasicCameraView, hasGeometry, hasPBRMaterial, hasPerspectiveCameraProjection, hasTransform, getDirectionLight, addDirectionLight, hasDirectionLight, getGameObjectName, setGameObjectName, getGameObjectAndAllChildren, removeGameObjects, restoreRemovedGameObjects
} from "./GameObjectAPI"
import {
	createTransform,
	getGameObjects as getTransformGameObjects,
	getName as getTransformName,
	setName as setTransformName,
	getChildren, getLocalPosition, getParent, lookAt, setLocalPosition,
	getLocalRotation, setLocalRotation,
	getLocalScale, setLocalScale,
	setParent, getLocalToWorldMatrix, getLocalEulerAngles, setLocalEulerAngles
} from "./TransformAPI";
import {
	createPerspectiveCameraProjection,
	getName as getPerspectiveCameraProjectionName,
	setName as setPerspectiveCameraProjectionName,
	getAspect, getFar, getFovy, getNear, getPMatrix, setAspect, setFar, setFovy, setNear
} from "./PerspectiveCameraProjectionAPI";
import {
	createPBRMaterial,
	getName as getPBRMaterialName,
	setName as setPBRMaterialName,
	getDiffuseColor, setDiffuseColor, getGameObjects as getPBRMaterialGameObjects, getSpecular, setSpecular, getSpecularColor, setSpecularColor, getRoughness, setRoughness, getMetalness, setMetalness, getTransmission, setTransmission, getIOR, setIOR, getDiffuseMap, setDiffuseMap, getRoughnessMap, setRoughnessMap, getMetalnessMap, setMetalnessMap, getNormalMap, setNormalMap
} from "./PBRMaterialAPI";
import {
	createGeometry,
	getName as getGeometryName,
	setName as setGeometryName,
	getIndices, getVertices, setIndices, setVertices, getGameObjects as getGeometryGameObjects, getNormals, setNormals, getTexCoords, setTexCoords, getTangents, setTangents
} from "./GeometryAPI";
import {
	createBasicCameraView, active, notActive,
	getName as getBasicCameraViewName,
	setName as setBasicCameraViewName,
	getViewWorldToCameraMatrix, getActiveCameraView,
	getGameObjects as getBasicCameraViewGameObjects
} from "./BasicCameraViewAPI";
import {
	createArcballCameraController,
	// getAllDirtyArcballCameraControllers, clearDirtyList,
	getDistance, setDistance, getPhi, setPhi, getTheta, setTheta, getTarget, setTarget, getGameObjects as getArcballCameraControllerGameObjects, getWheelSpeed, setWheelSpeed,
	getName as getArcballCameraControllerName, setName as setArcballCameraControllerName
} from "./ArcballCameraControllerAPI"
import { componentContribute } from "meta3d-engine-core-protocol/src/contribute/scene_graph/ComponentContributeType"
import { gameObjectContribute } from "meta3d-engine-core-protocol/src/contribute/scene_graph/GameObjectContributeType"
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
// import { pipelineRootPipeline, pipelineRootJob } from "meta3d-core-protocol/src/state/StateType"
// import { pipeline as pipelineCameraPipeline, job as pipelineCameraJob } from "meta3d-pipeline-camera-protocol/src/StateType"
import { service as textureService } from "meta3d-texture-basicsource-protocol/src/service/ServiceType"
import { texture, state as textureState, wrap } from "meta3d-texture-basicsource-protocol/src/state/StateType"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"
// import { isActuallyDisposePBRMateiral } from "meta3d-component-commonlib"
import {
	createDirectionLight,
	getName as getDirectionLightName,
	setName as setDirectionLightName,
	getColor, getDirection, setDirection, getGameObjects as getDirectionLightGameObjects, getIntensity, setColor, setIntensity
} from "./DirectionLightAPI"

let _encapsulateSceneAPIReturnState = (meta3dState: meta3dState, func: (meta3dState: meta3dState, engineCoreService: engineCoreService) => meta3dState, api: api): meta3dState => {
	let coreService = getExn(api.getPackageService<coreService>(
		meta3dState,
		"meta3d-core-protocol"
	))
	let engineCoreService = coreService.engineCore(meta3dState)

	return func(meta3dState, engineCoreService)
}

let _encapsulateSceneAPIReturnData = <Data>(meta3dState: meta3dState, func: (meta3dState: meta3dState, engineCoreService: engineCoreService) => Data, api: api): Data => {
	let coreService = getExn(api.getPackageService<coreService>(
		meta3dState,
		"meta3d-core-protocol"
	))
	let engineCoreService = coreService.engineCore(meta3dState)

	return func(meta3dState, engineCoreService)
}

let _encapsulateSceneAPIReturnStateAndData = <Data>(meta3dState: meta3dState, func: (meta3dState: meta3dState, engineCoreService: engineCoreService) => [meta3dState, Data], api: api): [meta3dState, Data] => {
	let coreService = getExn(api.getPackageService<coreService>(
		meta3dState,
		"meta3d-core-protocol"
	))
	let engineCoreService = coreService.engineCore(meta3dState)

	return func(meta3dState, engineCoreService)
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

export let getExtensionServiceUtils = (
	registerPipelineFunc: any,
	api: api): service => {
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

			let coreService = getExn(api.getPackageService<coreService>(
				meta3dState,
				"meta3d-core-protocol"
			))
			let engineCoreService = coreService.engineCore(meta3dState)

			let { registerPipeline, registerComponent, setGameObjectContribute, createAndSetComponentState, createAndSetGameObjectState } = engineCoreService

			meta3dState = registerPipelineFunc(meta3dState, engineCoreService, isDebug)

			// meta3dState = registerPipeline(meta3dState, api.getContribute<pipelineContribute<cameraPipelineConfig, cameraPipelineState>>(meta3dState, pipelineCameraProtocolName),
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

			// meta3dState = registerPipeline(meta3dState, api.getContribute<pipelineContribute<transformPipelineConfig, transformPipelineState>>(meta3dState, pipelineTransformProtocolName),
			// 	null,
			// 	[
			// 		{
			// 			pipelineName: pipelineCameraPipeline.Update,
			// 			insertElementName: pipelineCameraJob.UpdateCamera,
			// 			insertAction: "after"
			// 		},
			// 	]
			// )


			meta3dState =
				registerComponent(meta3dState, api.getContribute<componentContribute<transformState, transformConfig, transform>>(meta3dState, "meta3d-component-transform-protocol"))

			meta3dState =
				registerComponent(meta3dState, api.getContribute<componentContribute<geometryState, geometryConfig, geometry>>(meta3dState, "meta3d-component-geometry-protocol"))

			meta3dState =
				registerComponent(meta3dState, api.getContribute<componentContribute<pbrMaterialState, pbrMaterialConfig, pbrMaterial>>(meta3dState, "meta3d-component-pbrmaterial-protocol"))

			meta3dState =
				registerComponent(meta3dState, api.getContribute<componentContribute<basicCameraViewState, basicCameraViewConfig, basicCameraView>>(meta3dState, "meta3d-component-basiccameraview-protocol"))

			meta3dState =
				registerComponent(meta3dState, api.getContribute<componentContribute<perspecticeCameraProjectionState, perspecticeCameraProjectionConfig, perspectiveCameraProjection>>(meta3dState, "meta3d-component-perspectivecameraprojection-protocol"))

			meta3dState =
				registerComponent(meta3dState, api.getContribute<componentContribute<arcballCameraControllerState, arcballCameraControllerConfig, arcballCameraController>>(meta3dState, "meta3d-component-arcballcameracontroller-protocol"))

			meta3dState =
				registerComponent(meta3dState, api.getContribute<componentContribute<directionlightState, directionLightConfig, directionLight>>(meta3dState, "meta3d-component-directionlight-protocol"))



			meta3dState = createAndSetComponentState<transformConfig>(meta3dState, transformComponentName, {
				isDebug,
				float9Array1,
				float32Array1,
				transformCount
			})
			meta3dState = createAndSetComponentState<pbrMaterialConfig>(meta3dState, pbrMaterialComponentName, {
				isDebug,
				pbrMaterialCount
			})
			meta3dState = createAndSetComponentState<geometryConfig>(meta3dState, geometryComponentName, {
				isDebug,
				geometryCount,
				geometryPointCount
			})
			meta3dState = createAndSetComponentState<basicCameraViewConfig>(meta3dState, basicCameraViewComponentName, {
				isDebug
			})
			meta3dState = createAndSetComponentState<perspecticeCameraProjectionConfig>(meta3dState, perspecticeCameraProjectionComponentName, {
				isDebug
			})
			meta3dState = createAndSetComponentState<arcballCameraControllerConfig>(meta3dState, arcballCameraControllerComponentName, {
				isDebug
			})
			// TODO get directionLightCount from config
			meta3dState = createAndSetComponentState<directionLightConfig>(meta3dState, directionLightComponentName, {
				isDebug,
				directionLightCount: 4
			})



			meta3dState =
				setGameObjectContribute(meta3dState, api.getContribute<gameObjectContribute<gameObjectState>>(meta3dState, "meta3d-gameobject-protocol"))

			meta3dState = createAndSetGameObjectState(meta3dState, { isDebug })







			// meta3dState = engineCoreService.init(meta3dState, meta3dState)






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
			// createUnUseGameObject: (meta3dState) => {
			// 	return _encapsulateSceneAPIReturnStateAndData(meta3dState, createUnUseGameObject, api)
			// },
			getAllGameObjects: (meta3dState) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getAllGameObjects(meta3dState, engineCoreService), api)
			},
			getGameObjectName: (meta3dState, gameObject) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getGameObjectName(meta3dState, engineCoreService, gameObject), api)
			},
			setGameObjectName: (meta3dState, gameObject, value) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setGameObjectName(meta3dState, engineCoreService, gameObject, value), api)
			},
			getTransform: (meta3dState, gameObject) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getTransform(meta3dState, engineCoreService, gameObject), api)
			},
			addTransform: (meta3dState, gameObject, transform) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => addTransform(meta3dState, engineCoreService, gameObject, transform), api)
			},
			hasTransform: (meta3dState, gameObject) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => hasTransform(meta3dState, engineCoreService, gameObject), api)
			},
			getDirectionLight: (meta3dState, gameObject) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getDirectionLight(meta3dState, engineCoreService, gameObject), api)
			},
			addDirectionLight: (meta3dState, gameObject, directionLight) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => addDirectionLight(meta3dState, engineCoreService, gameObject, directionLight), api)
			},
			hasDirectionLight: (meta3dState, gameObject) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => hasDirectionLight(meta3dState, engineCoreService, gameObject), api)
			},
			getGeometry: (meta3dState, gameObject) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getGeometry(meta3dState, engineCoreService, gameObject), api)
			},
			addGeometry: (meta3dState, gameObject, geometry) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => addGeometry(meta3dState, engineCoreService, gameObject, geometry), api)
			},
			hasGeometry: (meta3dState, gameObject) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => hasGeometry(meta3dState, engineCoreService, gameObject), api)
			},
			getPBRMaterial: (meta3dState, gameObject) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getPBRMaterial(meta3dState, engineCoreService, gameObject), api)
			},
			addPBRMaterial: (meta3dState, gameObject, pbrMaterial) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => addPBRMaterial(meta3dState, engineCoreService, gameObject, pbrMaterial), api)
			},
			hasPBRMaterial: (meta3dState, gameObject) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => hasPBRMaterial(meta3dState, engineCoreService, gameObject), api)
			},
			getBasicCameraView: (meta3dState, gameObject) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getBasicCameraView(meta3dState, engineCoreService, gameObject), api)
			},
			addBasicCameraView: (meta3dState, gameObject, basicCameraView) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => addBasicCameraView(meta3dState, engineCoreService, gameObject, basicCameraView), api)
			},
			hasBasicCameraView: (meta3dState, gameObject) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => hasBasicCameraView(meta3dState, engineCoreService, gameObject), api)
			},
			getPerspectiveCameraProjection: (meta3dState, gameObject) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getPerspectiveCameraProjection(meta3dState, engineCoreService, gameObject), api)
			},
			addPerspectiveCameraProjection: (meta3dState, gameObject, perspectiveCameraProjection) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => addPerspectiveCameraProjection(meta3dState, engineCoreService, gameObject, perspectiveCameraProjection), api)
			},
			hasPerspectiveCameraProjection: (meta3dState, gameObject) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => hasPerspectiveCameraProjection(meta3dState, engineCoreService, gameObject), api)
			},
			getArcballCameraController: (meta3dState, gameObject) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getArcballCameraController(meta3dState, engineCoreService, gameObject), api)
			},
			addArcballCameraController: (meta3dState, gameObject, arcballCameraController) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => addArcballCameraController(meta3dState, engineCoreService, gameObject, arcballCameraController), api)
			},
			hasArcballCameraController: (meta3dState, gameObject) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => hasArcballCameraController(meta3dState, engineCoreService, gameObject), api)
			},
			cloneGameObject: (meta3dState, count, cloneConfig, sourceGameObject) => {
				// TODO add texture to cloned pbr material

				return _encapsulateSceneAPIReturnStateAndData(meta3dState, (meta3dState, engineCoreService) => cloneGameObject(meta3dState, engineCoreService, count, cloneConfig, sourceGameObject), api)
			},
			getNeedDisposedGameObjects: (meta3dState) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getNeedDisposedGameObjects(meta3dState, engineCoreService), api)
			},
			disposeGameObjects: (meta3dState, gameObjects) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => disposeGameObjects(meta3dState, engineCoreService, gameObjects), api)
			},
			disposeGameObjectTransformComponent: (meta3dState, gameObject, component) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => disposeGameObjectTransformComponent(meta3dState, engineCoreService, gameObject, component), api)
			},
			disposeGameObjectPBRMaterialComponent: (meta3dState, gameObject, component) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => disposeGameObjectPBRMaterialComponent(meta3dState, engineCoreService, gameObject, component), api)
			},
			disposeGameObjectDirectionLightComponent: (meta3dState, gameObject, component) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => disposeGameObjectGeometryComponent(meta3dState, engineCoreService, gameObject, component), api)
			},
			disposeGameObjectGeometryComponent: (meta3dState, gameObject, component) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => disposeGameObjectGeometryComponent(meta3dState, engineCoreService, gameObject, component), api)
			},
			disposeGameObjectBasicCameraViewComponent: (meta3dState, gameObject, component) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => disposeGameObjectBasicCameraViewComponent(meta3dState, engineCoreService, gameObject, component), api)
			},
			disposeGameObjectPerspectiveCameraProjectionComponent: (meta3dState, gameObject, component) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => disposeGameObjectPerspectiveCameraProjectionComponent(meta3dState, engineCoreService, gameObject, component), api)
			},
			disposeGameObjectArcballCameraControllerComponent: (meta3dState, gameObject, component) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => disposeGameObjectArcballCameraControllerComponent(meta3dState, engineCoreService, gameObject, component), api)
			},
			getGameObjectAndAllChildren: (meta3dState, gameObject) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getGameObjectAndAllChildren(meta3dState, engineCoreService, gameObject), api)
			},
			removeGameObjects: (meta3dState, gameObjects) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => removeGameObjects(meta3dState, engineCoreService, gameObjects), api)
			},
			restoreRemovedGameObjects: (meta3dState, data) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => restoreRemovedGameObjects(meta3dState, engineCoreService, data), api)
			},
		},
		transform: {
			createTransform: (meta3dState) => {
				return _encapsulateSceneAPIReturnStateAndData(meta3dState, createTransform, api)
			},
			getGameObjects: (meta3dState, transform) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getTransformGameObjects(meta3dState, engineCoreService, transform), api)
			},
			getName: (meta3dState, transform) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getTransformName(meta3dState, engineCoreService, transform), api)
			},
			setName: (meta3dState, transform, value) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setTransformName(meta3dState, engineCoreService, transform, value), api)
			},
			getParent: (meta3dState, transform) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getParent(meta3dState, engineCoreService, transform), api)
			},
			setParent: (meta3dState, transform, parent) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setParent(meta3dState, engineCoreService, transform, parent), api)
			},
			getChildren: (meta3dState, transform) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getChildren(meta3dState, engineCoreService, transform), api)
			},
			getLocalPosition: (meta3dState, transform) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getLocalPosition(meta3dState, engineCoreService, transform), api)
			},
			setLocalPosition: (meta3dState, transform, localPosition) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setLocalPosition(meta3dState, engineCoreService, transform, localPosition), api)
			},
			getLocalRotation: (meta3dState, transform) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getLocalRotation(meta3dState, engineCoreService, transform), api)
			},
			setLocalRotation: (meta3dState, transform, localRotation) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setLocalRotation(meta3dState, engineCoreService, transform, localRotation), api)
			},
			getLocalEulerAngles: (meta3dState, transform) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getLocalEulerAngles(meta3dState, engineCoreService, transform), api)
			},
			setLocalEulerAngles: (meta3dState, transform, localEulerAngles) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setLocalEulerAngles(meta3dState, engineCoreService, transform, localEulerAngles), api)
			},
			getLocalScale: (meta3dState, transform) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getLocalScale(meta3dState, engineCoreService, transform), api)
			},
			setLocalScale: (meta3dState, transform, localScale) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setLocalScale(meta3dState, engineCoreService, transform, localScale), api)
			},
			getLocalToWorldMatrix: (meta3dState, transform) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getLocalToWorldMatrix(meta3dState, engineCoreService, transform), api)
			},
			lookAt: (meta3dState, transform, target) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => lookAt(meta3dState, engineCoreService, transform, target), api)
			},
		},
		directionLight: {
			createDirectionLight: (meta3dState) => {
				return _encapsulateSceneAPIReturnStateAndData(meta3dState, createDirectionLight, api)
			},
			getGameObjects: (meta3dState, directionLight) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getDirectionLightGameObjects(meta3dState, engineCoreService, directionLight), api)
			},
			getName: (meta3dState, directionLight) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getDirectionLightName(meta3dState, engineCoreService, directionLight), api)
			},
			setName: (meta3dState, directionLight, value) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setDirectionLightName(meta3dState, engineCoreService, directionLight, value), api)
			},
			getColor: (meta3dState, directionLight) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getColor(meta3dState, engineCoreService, directionLight), api)
			},
			setColor: (meta3dState, directionLight, color) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setColor(meta3dState, engineCoreService, directionLight, color), api)
			},
			getIntensity: (meta3dState, directionLight) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getIntensity(meta3dState, engineCoreService, directionLight), api)
			},
			setIntensity: (meta3dState, directionLight, intensity) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setIntensity(meta3dState, engineCoreService, directionLight, intensity), api)
			},
			getDirection: (meta3dState, directionLight) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getDirection(meta3dState, engineCoreService, directionLight), api)
			},
			setDirection: (meta3dState, directionLight, direction) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setDirection(meta3dState, engineCoreService, directionLight, direction), api)
			},
		},
		basicCameraView: {
			createBasicCameraView: (meta3dState) => {
				return _encapsulateSceneAPIReturnStateAndData(meta3dState, createBasicCameraView, api)
			},
			getGameObjects: (meta3dState, basicCameraView) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getBasicCameraViewGameObjects(meta3dState, engineCoreService, basicCameraView), api)
			},
			getName: (meta3dState, basicCameraView) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getBasicCameraViewName(meta3dState, engineCoreService, basicCameraView), api)
			},
			setName: (meta3dState, basicCameraView, value) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setBasicCameraViewName(meta3dState, engineCoreService, basicCameraView, value), api)
			},
			active: (meta3dState, basicCameraView) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => active(meta3dState, engineCoreService, basicCameraView), api)
			},
			notActive: (meta3dState, basicCameraView) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => notActive(meta3dState, engineCoreService, basicCameraView), api)
			},
			getViewWorldToCameraMatrix: (meta3dState, basicCameraView) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getViewWorldToCameraMatrix(meta3dState, engineCoreService, basicCameraView), api)
			},
			getActiveCameraView: (meta3dState, isDebug) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getActiveCameraView(meta3dState, engineCoreService, isDebug), api)
			},
		},
		geometry: {
			createGeometry: (meta3dState) => {
				return _encapsulateSceneAPIReturnStateAndData(meta3dState, createGeometry, api)
			},
			getName: (meta3dState, geometry) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getGeometryName(meta3dState, engineCoreService, geometry), api)
			},
			setName: (meta3dState, geometry, value) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setGeometryName(meta3dState, engineCoreService, geometry, value), api)
			},
			getVertices: (meta3dState, geometry) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getVertices(meta3dState, engineCoreService, geometry), api)
			},
			setVertices: (meta3dState, geometry, vertices) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setVertices(meta3dState, engineCoreService, geometry, vertices), api)
			},
			getNormals: (meta3dState, geometry) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getNormals(meta3dState, engineCoreService, geometry), api)
			},
			setNormals: (meta3dState, geometry, normals) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setNormals(meta3dState, engineCoreService, geometry, normals), api)
			},
			getTexCoords: (meta3dState, geometry) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getTexCoords(meta3dState, engineCoreService, geometry), api)
			},
			setTexCoords: (meta3dState, geometry, texCoords) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setTexCoords(meta3dState, engineCoreService, geometry, texCoords), api)
			},
			getTangents: (meta3dState, geometry) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getTangents(meta3dState, engineCoreService, geometry), api)
			},
			setTangents: (meta3dState, geometry, tangents) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setTangents(meta3dState, engineCoreService, geometry, tangents), api)
			},
			getIndices: (meta3dState, geometry) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getIndices(meta3dState, engineCoreService, geometry), api)
			},
			setIndices: (meta3dState, geometry, indices) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setIndices(meta3dState, engineCoreService, geometry, indices), api)
			},
			getGameObjects: (meta3dState, geometry) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getGeometryGameObjects(meta3dState, engineCoreService, geometry), api)
			},
		},
		pbrMaterial: {
			createPBRMaterial: (meta3dState) => {
				return _encapsulateSceneAPIReturnStateAndData(meta3dState, createPBRMaterial, api)
			},
			getName: (meta3dState, pbrMaterial) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getPBRMaterialName(meta3dState, engineCoreService, pbrMaterial), api)
			},
			setName: (meta3dState, pbrMaterial, value) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setPBRMaterialName(meta3dState, engineCoreService, pbrMaterial, value), api)
			},
			getDiffuseColor: (meta3dState, pbrMaterial) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getDiffuseColor(meta3dState, engineCoreService, pbrMaterial), api)
			},
			setDiffuseColor: (meta3dState, pbrMaterial, diffuseColor) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setDiffuseColor(meta3dState, engineCoreService, pbrMaterial, diffuseColor), api)
			},
			getSpecular: (meta3dState, pbrMaterial) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getSpecular(meta3dState, engineCoreService, pbrMaterial), api)
			},
			setSpecular: (meta3dState, pbrMaterial, specular) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setSpecular(meta3dState, engineCoreService, pbrMaterial, specular), api)
			},
			getSpecularColor: (meta3dState, pbrMaterial) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getSpecularColor(meta3dState, engineCoreService, pbrMaterial), api)
			},
			setSpecularColor: (meta3dState, pbrMaterial, specularColor) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setSpecularColor(meta3dState, engineCoreService, pbrMaterial, specularColor), api)
			},
			getRoughness: (meta3dState, pbrMaterial) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getRoughness(meta3dState, engineCoreService, pbrMaterial), api)
			},
			setRoughness: (meta3dState, pbrMaterial, roughness) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setRoughness(meta3dState, engineCoreService, pbrMaterial, roughness), api)
			},
			getMetalness: (meta3dState, pbrMaterial) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getMetalness(meta3dState, engineCoreService, pbrMaterial), api)
			},
			setMetalness: (meta3dState, pbrMaterial, metalness) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setMetalness(meta3dState, engineCoreService, pbrMaterial, metalness), api)
			},
			getTransmission: (meta3dState, pbrMaterial) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getTransmission(meta3dState, engineCoreService, pbrMaterial), api)
			},
			setTransmission: (meta3dState, pbrMaterial, transmission) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setTransmission(meta3dState, engineCoreService, pbrMaterial, transmission), api)
			},
			getIOR: (meta3dState, pbrMaterial) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getIOR(meta3dState, engineCoreService, pbrMaterial), api)
			},
			setIOR: (meta3dState, pbrMaterial, ior) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setIOR(meta3dState, engineCoreService, pbrMaterial, ior), api)
			},
			getDiffuseMap: (meta3dState, pbrMaterial) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getDiffuseMap(meta3dState, engineCoreService, pbrMaterial), api)
			},
			setDiffuseMap: (meta3dState, pbrMaterial, texture) => {
				meta3dState = _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setDiffuseMap(meta3dState, engineCoreService, pbrMaterial, texture), api)

				return _addMaterial(meta3dState, api, texture, pbrMaterial)
			},
			getRoughnessMap: (meta3dState, pbrMaterial) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getRoughnessMap(meta3dState, engineCoreService, pbrMaterial), api)
			},
			setRoughnessMap: (meta3dState, pbrMaterial, texture) => {
				meta3dState = _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setRoughnessMap(meta3dState, engineCoreService, pbrMaterial, texture), api)

				return _addMaterial(meta3dState, api, texture, pbrMaterial)
			},
			getMetalnessMap: (meta3dState, pbrMaterial) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getMetalnessMap(meta3dState, engineCoreService, pbrMaterial), api)
			},
			setMetalnessMap: (meta3dState, pbrMaterial, texture) => {
				meta3dState = _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setMetalnessMap(meta3dState, engineCoreService, pbrMaterial, texture), api)

				return _addMaterial(meta3dState, api, texture, pbrMaterial)
			},
			getNormalMap: (meta3dState, pbrMaterial) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getNormalMap(meta3dState, engineCoreService, pbrMaterial), api)
			},
			setNormalMap: (meta3dState, pbrMaterial, texture) => {
				meta3dState = _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setNormalMap(meta3dState, engineCoreService, pbrMaterial, texture), api)

				return _addMaterial(meta3dState, api, texture, pbrMaterial)
			},
			// getAllPBRMaterials: (meta3dState) => {
			// 	return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getAllPBRMaterials(meta3dState, engineCoreService), api)
			// },
			getGameObjects: (meta3dState, pbrMaterial) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getPBRMaterialGameObjects(meta3dState, engineCoreService, pbrMaterial), api)
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
					let data = textureService.disposeTexture(textureState, texture, material)
					textureState = data[0]

					return textureState
				}, api)
			},
			addMaterial: (meta3dState, texture, material) => {
				return _encapsulateSceneAPIReturnStateForBasicSourceTexture(meta3dState, (textureState, textureService) => {
					return textureService.addMaterial(textureState, texture, material)
				}, api)
			},
			getName: (meta3dState, texture) => {
				return _encapsulateSceneAPIReturnDataForBasicSourceTexture(meta3dState, (textureState, textureService) => textureService.getName(textureState, texture), api)
			},
			setName: (meta3dState, texture, name) => {
				return _encapsulateSceneAPIReturnStateForBasicSourceTexture(meta3dState, (textureState, textureService) => textureService.setName(textureState, texture, name), api)
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
			getName: (meta3dState, perspectiveCameraProjection) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getPerspectiveCameraProjectionName(meta3dState, engineCoreService, perspectiveCameraProjection), api)
			},
			setName: (meta3dState, perspectiveCameraProjection, value) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setPerspectiveCameraProjectionName(meta3dState, engineCoreService, perspectiveCameraProjection, value), api)
			},
			getPMatrix: (meta3dState, perspectiveCameraProjection) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getPMatrix(meta3dState, engineCoreService, perspectiveCameraProjection), api)
			},
			getFovy: (meta3dState, perspectiveCameraProjection) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getFovy(meta3dState, engineCoreService, perspectiveCameraProjection), api)
			},
			setFovy: (meta3dState, perspectiveCameraProjection, fovy) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setFovy(meta3dState, engineCoreService, perspectiveCameraProjection, fovy), api)
			},
			getNear: (meta3dState, perspectiveCameraProjection) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getNear(meta3dState, engineCoreService, perspectiveCameraProjection), api)
			},
			setNear: (meta3dState, perspectiveCameraProjection, near) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setNear(meta3dState, engineCoreService, perspectiveCameraProjection, near), api)
			},
			getFar: (meta3dState, perspectiveCameraProjection) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getFar(meta3dState, engineCoreService, perspectiveCameraProjection), api)
			},
			setFar: (meta3dState, perspectiveCameraProjection, far) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setFar(meta3dState, engineCoreService, perspectiveCameraProjection, far), api)
			},
			getAspect: (meta3dState, perspectiveCameraProjection) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getAspect(meta3dState, engineCoreService, perspectiveCameraProjection), api)
			},
			setAspect: (meta3dState, perspectiveCameraProjection, aspect) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setAspect(meta3dState, engineCoreService, perspectiveCameraProjection, aspect), api)
			},
		},
		arcballCameraController: {
			createArcballCameraController: (meta3dState) => {
				return _encapsulateSceneAPIReturnStateAndData(meta3dState, createArcballCameraController, api)
			},
			// getAllDirtyArcballCameraControllers: (meta3dState) => {
			// 	return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getAllDirtyArcballCameraControllers(meta3dState, engineCoreService), api)
			// },
			// clearDirtyList: (meta3dState) => {
			// 	return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => clearDirtyList(meta3dState, engineCoreService), api)
			// },
			getName: (meta3dState, arcballCameraController) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getArcballCameraControllerName(meta3dState, engineCoreService, arcballCameraController), api)
			},
			setName: (meta3dState, arcballCameraController, value) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setArcballCameraControllerName(meta3dState, engineCoreService, arcballCameraController, value), api)
			},
			getDistance: (meta3dState, arcballCameraController) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getDistance(meta3dState, engineCoreService, arcballCameraController), api)
			},
			setDistance: (meta3dState, arcballCameraController, value) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setDistance(meta3dState, engineCoreService, arcballCameraController, value), api)
			},
			getWheelSpeed: (meta3dState, arcballCameraController) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getWheelSpeed(meta3dState, engineCoreService, arcballCameraController), api)
			},
			setWheelSpeed: (meta3dState, arcballCameraController, value) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setWheelSpeed(meta3dState, engineCoreService, arcballCameraController, value), api)
			},
			getTarget: (meta3dState, arcballCameraController) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getTarget(meta3dState, engineCoreService, arcballCameraController), api)
			},
			setTarget: (meta3dState, arcballCameraController, value) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setTarget(meta3dState, engineCoreService, arcballCameraController, value), api)
			},
			getPhi: (meta3dState, arcballCameraController) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getPhi(meta3dState, engineCoreService, arcballCameraController), api)
			},
			setPhi: (meta3dState, arcballCameraController, value) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setPhi(meta3dState, engineCoreService, arcballCameraController, value), api)
			},
			getTheta: (meta3dState, arcballCameraController) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getTheta(meta3dState, engineCoreService, arcballCameraController), api)
			},
			setTheta: (meta3dState, arcballCameraController, value) => {
				return _encapsulateSceneAPIReturnState(meta3dState, (meta3dState, engineCoreService) => setTheta(meta3dState, engineCoreService, arcballCameraController, value), api)
			},
			getGameObjects: (meta3dState, arcballCameraController) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (meta3dState, engineCoreService) => getArcballCameraControllerGameObjects(meta3dState, engineCoreService, arcballCameraController), api)
			},
		},

	}
}