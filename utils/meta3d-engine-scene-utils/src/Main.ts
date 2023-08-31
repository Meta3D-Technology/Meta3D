import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { state } from "meta3d-engine-scene-protocol/src/state/StateType"
import { service } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { pipelineContribute } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { state as cameraPipelineState, states as cameraPipelineStates } from "meta3d-pipeline-camera-protocol/src/StateType";
import { config as cameraPipelineConfig } from "meta3d-pipeline-camera-protocol/src/ConfigType";
import { state as transformPipelineState, states as transformPipelineStates } from "meta3d-pipeline-transform-protocol/src/StateType";
import { config as transformPipelineConfig } from "meta3d-pipeline-transform-protocol/src/ConfigType";
// import { state as webgpuTriangleState, states as webgpuTriangleStates } from "meta3d-pipeline-editor-webgpu-triangle-protocol/src/StateType";
// import { state as rootState, states as rootStates } from "meta3d-pipeline-root-protocol/src/StateType";
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
import { createPBRMaterial, getAllPBRMaterials, getDiffuseColor, setDiffuseColor, getGameObjects as getPBRMaterialGameObjects } from "./PBRMaterialAPI";
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
import { pipeline as pipelineRootPipeline, job as pipelineRootJob } from "meta3d-pipeline-root-protocol/src/StateType"
import { pipeline as pipelineCameraPipeline, job as pipelineCameraJob } from "meta3d-pipeline-camera-protocol/src/StateType"

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


export let getExtensionServiceUtils = (api: api, engineCoreProtocolName: string): service => {
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

			engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<cameraPipelineConfig, cameraPipelineState>>(meta3dState, "meta3d-pipeline-camera-protocol"),
				{
					isDebug
				},
				[
					{
						pipelineName: pipelineRootPipeline.Update,
						insertElementName: pipelineRootJob.Update,
						insertAction: "after"
					}
				]
			)

			engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<transformPipelineConfig, transformPipelineState>>(meta3dState, "meta3d-pipeline-transform-protocol"),
				null,
				[
					{
						pipelineName: pipelineCameraPipeline.Update,
						insertElementName: pipelineCameraJob.UpdateCamera,
						insertAction: "after"
					},
				]
			)


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
				return _encapsulateSceneAPIReturnState(meta3dState, (engineCoreState, engineCoreService) => disposeGameObjectPBRMaterialComponent(engineCoreState, engineCoreService, gameObject, component), api)
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
			getAllPBRMaterials: (meta3dState) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getAllPBRMaterials(engineCoreState, engineCoreService), api)
			},
			getGameObjects: (meta3dState, pbrMaterial) => {
				return _encapsulateSceneAPIReturnData(meta3dState, (engineCoreState, engineCoreService) => getPBRMaterialGameObjects(engineCoreState, engineCoreService, pbrMaterial), api)
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