import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
// import { state } from "meta3d-engine-whole-sceneview-protocol/src/state/StateType"
// import { service } from "meta3d-engine-whole-sceneview-protocol/src/service/ServiceType"
import { service as engineBasicService } from "meta3d-engine-basic-sceneview-protocol/src/service/ServiceType"
// import { state as engineBasicState } from "meta3d-engine-basic-sceneview-protocol/src/state/StateType"
import { service as engineSceneService } from "meta3d-engine-scene-sceneview-protocol/src/service/ServiceType"
// import { state as engineSceneState } from "meta3d-engine-scene-sceneview-protocol/src/state/StateType"
import { service as engineCoreService } from "meta3d-engine-core-sceneview-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-sceneview-protocol/src/state/StateType"
import { service as engineRenderService } from "meta3d-editor-engine-render-sceneview-protocol/src/service/ServiceType"
import { getExtensionService as getEngineWholeExtensionService } from "meta3d-engine-whole-utils/src/implement/Main"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { state as converterState } from "meta3d-scenegraph-converter-three-sceneview-protocol/src/state/StateType"
import { state as pbrMaterialState, componentName as pbrMaterialComponentName } from "meta3d-component-pbrmaterial-protocol/src/Index"
import { state as geometryState, componentName as geometryComponentName } from "meta3d-component-geometry-protocol/src/Index"
import { isActuallyDisposeGeometry, isActuallyDisposePBRMateiral } from "meta3d-component-commonlib"
// import { pipeline as pipelineRootPipeline, job as pipelineRootJob } from "meta3d-pipeline-root-sceneview-protocol/src/StateType"
// import { pipeline as pipelineCameraPipeline, job as pipelineCameraJob } from "meta3d-pipeline-camera-sceneview-protocol/src/StateType"
// import { pipeline as pipelineThreePipeline, job as pipelineThreeJob } from "meta3d-pipeline-webgl1-three-sceneview-protocol/src/StateType"
// import { pipeline as pipelineSceneView1Pipeline, job as pipelineSceneView1Job } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/StateType"



// let _registerEditorPipelines = (
// 	meta3dState: meta3dState, api: api,
// 	[meta3dPipelineEditorWebgl1SceneView1ContributeName, meta3dPipelineEditorWebgl1SceneView2ContributeName, meta3dPipelineEditorEventContributeName]: [string, string, string],
// 	canvas: HTMLCanvasElement
// ) => {
// 	let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, engineCoreProtocolName)

// 	let engineCoreService = api.getExtensionService<engineCoreService>(
// 		meta3dState,
// 		engineCoreProtocolName
// 	)



// 	let { registerPipeline } = engineCoreService

// 	engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<sceneView1Config, sceneView1State>>(meta3dState, meta3dPipelineEditorWebgl1SceneView1ContributeName),
// 		{ canvas },
// 		[
// 			{
// 				pipelineName: pipelineRootPipeline.Init,
// 				insertElementName: pipelineRootJob.Init,
// 				insertAction: "after"
// 			},
// 			{
// 				pipelineName: pipelineCameraPipeline.Update,
// 				insertElementName: pipelineCameraJob.UpdateCamera,
// 				insertAction: "before"
// 			},
// 			{
// 				pipelineName: pipelineThreePipeline.Render,
// 				insertElementName: pipelineThreeJob.Render,
// 				insertAction: "before"
// 			},
// 		]
// 	)
// 	engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<sceneView2Config, sceneView2State>>(meta3dState, meta3dPipelineEditorWebgl1SceneView2ContributeName),
// 		null,
// 		[
// 			{
// 				pipelineName: pipelineThreePipeline.Render,
// 				insertElementName: pipelineThreeJob.Render,
// 				insertAction: "after"
// 			},
// 		]
// 	)

// 	engineCoreState = registerPipeline(engineCoreState, api.getContribute<pipelineContribute<editorEventConfig, editorEventState>>(meta3dState, meta3dPipelineEditorEventContributeName),
// 		null,
// 		[
// 			{
// 				pipelineName: pipelineSceneView1Pipeline.Init,
// 				insertElementName: pipelineSceneView1Job.CreateDefaultScene,
// 				insertAction: "before"
// 			},
// 		]
// 	)



// 	return api.setExtensionState(meta3dState, engineCoreProtocolName, engineCoreState)
// }

// let _isActuallyDisposePBRMaterial = (api: api, meta3dState: meta3dState,
// 	engineCoreProtocolName: string,
// 	material: number, gameObjects: Array<number>): boolean => {
// 	let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, engineCoreProtocolName)
// 	let engineCoreService = api.getExtensionService<engineCoreService>(
// 		meta3dState,
// 		engineCoreProtocolName
// 	)

// 	let contribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, pbrMaterialComponentName)

// 	return isActuallyDisposePBRMateiral(
// 		contribute.state as any as pbrMaterialState,
// 		material, gameObjects
// 	)
// }

// let _isActuallyDisposeGeometry = (api: api, meta3dState: meta3dState,
// 	engineCoreProtocolName: string,
// 	geometry: number, gameObjects: Array<number>): boolean => {
// 	let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, engineCoreProtocolName)
// 	let engineCoreService = api.getExtensionService<engineCoreService>(
// 		meta3dState,
// 		engineCoreProtocolName
// 	)

// 	let contribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, geometryComponentName)

// 	return isActuallyDisposeGeometry(
// 		contribute.state as any as geometryState,
// 		geometry, gameObjects
// 	)
// }

export let buildNewEngineWholeExtensionService = <converterState_ extends converterState>(api: api,
	{
		// engineBasicProtocolName,
		engineSceneProtocolName,
		engineCoreProtocolName,
		// editorEngineRenderProtocolName,
		scenegraphConverterProtocolName
	}: any

) => {
	let engineWholeExtensionService = getEngineWholeExtensionService(api, [
		"meta3d-bs-most-protocol",
		engineCoreProtocolName,
		engineSceneProtocolName,
	])
	// let gameObjectService = engineWholeExtensionService.scene.gameObject
	// let pbrMaterialService = engineWholeExtensionService.scene.pbrMaterial

	// return {
	// 	...engineWholeExtensionService,
	// 	scene: {
	// 		...engineWholeExtensionService.scene,
	// 		gameObject: {
	// 			...engineWholeExtensionService.scene.gameObject,
	// 			disposeGameObjects: (meta3dState: meta3dState, gameObjects: Array<number>) => {
	// 				let eventProtocolName = "meta3d-event-protocol"
	// 				let eventService = api.getExtensionService<eventService>(
	// 					meta3dState,
	// 					eventProtocolName
	// 				)

	// 				let converterState = api.getExtensionState<converterState_>(
	// 					meta3dState,
	// 					scenegraphConverterProtocolName
	// 				)


	// 				meta3dState = gameObjects.reduce((meta3dState: meta3dState, gameObject: number) => {
	// 					meta3dState =
	// 						eventService.triggerCustomGlobalEvent2(meta3dState, eventProtocolName,
	// 							eventService.createCustomEvent(
	// 								converterState.event.disposeGameObjectEventName,
	// 								gameObject as any
	// 							)
	// 						)

	// 					if (
	// 						gameObjectService.hasTransform(meta3dState, gameObject)
	// 					) {
	// 						meta3dState =
	// 							eventService.triggerCustomGlobalEvent2(meta3dState, eventProtocolName,
	// 								eventService.createCustomEvent(
	// 									converterState.event.disposeTransformEventName,
	// 									gameObjectService.getTransform(meta3dState, gameObject) as any
	// 								)
	// 							)
	// 					}

	// 					if (
	// 						gameObjectService.hasPBRMaterial(meta3dState, gameObject)

	// 					) {
	// 						let material = gameObjectService.getPBRMaterial(meta3dState, gameObject) as any

	// 						if (
	// 							_isActuallyDisposePBRMaterial(api, meta3dState,
	// 								engineCoreProtocolName,
	// 								material, pbrMaterialService.getGameObjects(meta3dState, material))
	// 						) {
	// 							meta3dState =
	// 								eventService.triggerCustomGlobalEvent2(meta3dState, eventProtocolName,
	// 									eventService.createCustomEvent(
	// 										converterState.event.disposePBRMaterialEventName,
	// 										material
	// 									)
	// 								)
	// 						}
	// 					}

	// 					if (
	// 						gameObjectService.hasGeometry(meta3dState, gameObject)
	// 					) {
	// 						let geometry = gameObjectService.getGeometry(meta3dState, gameObject) as any

	// 						if (
	// 							_isActuallyDisposeGeometry(api, meta3dState,
	// 								engineCoreProtocolName,
	// 								geometry, pbrMaterialService.getGameObjects(meta3dState, geometry))
	// 						) {
	// 							meta3dState =
	// 								eventService.triggerCustomGlobalEvent2(meta3dState, eventProtocolName,
	// 									eventService.createCustomEvent(
	// 										converterState.event.disposeGeometryEventName,
	// 										geometry
	// 									)
	// 								)
	// 						}

	// 					}


	// 					if (
	// 						gameObjectService.hasBasicCameraView(meta3dState, gameObject)
	// 					) {
	// 						meta3dState =
	// 							eventService.triggerCustomGlobalEvent2(meta3dState, eventProtocolName,
	// 								eventService.createCustomEvent(
	// 									converterState.event.disposeBasicCameraViewEventName,
	// 									gameObjectService.getBasicCameraView(meta3dState, gameObject) as any
	// 								)
	// 							)
	// 					}


	// 					if (
	// 						gameObjectService.hasArcballCameraController(meta3dState, gameObject)
	// 					) {
	// 						meta3dState =
	// 							eventService.triggerCustomGlobalEvent2(meta3dState, eventProtocolName,
	// 								eventService.createCustomEvent(
	// 									converterState.event.disposeArcballCameraControllerEventName,
	// 									gameObjectService.getArcballCameraController(meta3dState, gameObject) as any
	// 								)
	// 							)
	// 					}


	// 					if (
	// 						gameObjectService.hasPerspectiveCameraProjection(meta3dState, gameObject)
	// 					) {
	// 						meta3dState =
	// 							eventService.triggerCustomGlobalEvent2(meta3dState, eventProtocolName,
	// 								eventService.createCustomEvent(
	// 									converterState.event.disposePerspectiveCameraProjectionEventName,
	// 									gameObjectService.getPerspectiveCameraProjection(meta3dState, gameObject) as any
	// 								)
	// 							)
	// 					}

	// 					return meta3dState
	// 				}, meta3dState)


	// 				return gameObjectService.disposeGameObjects(meta3dState, gameObjects)
	// 			}
	// 		}
	// 		// TODO rewrite dispose components funcs
	// 	}
	// }

	return engineWholeExtensionService
}

export let prepare = <engineBasicService_ extends engineBasicService, engineSceneService_ extends engineSceneService, engineRenderService_ extends engineRenderService>(meta3dState: meta3dState, api: api,
	{
		engineBasicProtocolName,
		engineSceneProtocolName,
		editorEngineRenderProtocolName,
	}: any,
	isDebug: boolean, ecsConfig: any, gl: WebGLRenderingContext, canvas: HTMLCanvasElement) => {
	// let engineBasicState = api.getExtensionState<engineBasicState>(meta3dState, meta3dEngineBasicExtensionProtocolName)

	let engineBasicService = api.getExtensionService<engineBasicService_>(
		meta3dState,
		engineBasicProtocolName
	)

	meta3dState = engineBasicService.prepare(meta3dState, isDebug)

	// let engineSceneState = api.getExtensionState<engineSceneState>(meta3dState, meta3dEngineSceneExtensionProtocolName)

	let engineSceneService = api.getExtensionService<engineSceneService_>(
		meta3dState,
		engineSceneProtocolName
	)

	meta3dState = engineSceneService.prepare(meta3dState, isDebug, ecsConfig)


	// let engineRenderState = api.getExtensionState<engineRenderState>(meta3dState, meta3dEditorEngineRenderExtensionProtocolName)

	let engineRenderService = api.getExtensionService<engineRenderService_>(
		meta3dState,
		editorEngineRenderProtocolName
	)

	meta3dState = engineRenderService.prepare(meta3dState, isDebug, gl, canvas)


	// meta3dState = _registerEditorPipelines(
	// 	meta3dState, api,
	// 	["meta3d-pipeline-editor-webgl1-scene-view1-protocol", "meta3d-pipeline-editor-webgl1-scene-view2-protocol", "meta3d-pipeline-editor-event-sceneview-protocol"],
	// 	canvas
	// )




	return meta3dState
}
	// return {
	// 	...newEngineWholeExtensionService,
	// 	loadScene: (meta3dState, sceneGLB) => {
	// 		throw new Error("not implement")
	// 	},
	// }