import { state as meta3dState } from "meta3d-type"
import { getWorkPluginContribute } from "./Main";
import { prepare as prepareMeta3D, registerExtension, getExtensionService, getExtensionState, setExtensionState } from "meta3d"
import { prepare as prepareEngine, init as initEngine, update as updateEngine, render as renderEngine } from "engine-facade/src/DirectorAPI"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as immutableService } from "meta3d-immutable-protocol/src/service/ServiceType"
import { service as renderDataBufferService } from "meta3d-renderdatabuffer-protocol/src/service/ServiceType"
import { service as webgl1WorkerSyncService } from "meta3d-webgl1-worker-sync-protocol/src/service/ServiceType"
import { getExtensionService as getWebGL1ExtensionService, createExtensionState as createWebGL1ExtensionState } from "meta3d-webgl1"
import { getExtensionService as getRegisterECSWorkerExtensionService, createExtensionState as createRegisterECSWorkerExtensionState } from "meta3d-register-ecs-worker"
import { getExtensionService as getImmutableExtensionService, createExtensionState as createImmutableExtensionState } from "meta3d-immutable"
import { getExtensionService as getRenderDataBufferExtensionService, createExtensionState as createRenderDataBufferExtensionState } from "meta3d-renderdatabuffer"
import { getExtensionService as getWebGL1WorkerSyncExtensionService, createExtensionState as createWebGL1WorkerSyncExtensionState } from "meta3d-webgl1-worker-sync"
import { service as registerECSWorkerService } from "meta3d-register-ecs-worker-protocol/src/service/ServiceType"
import { getWorkPluginContribute as getWebGL1GetGLWorkPluginContribute } from "meta3d-work-plugin-webgl1-creategl/src/Main"
import { workPluginName } from "engine-work-plugin-webgl1-worker-render-protocol"
import { getWorkPluginContribute as getWebGL1DetectGLWorkPluginContribute } from "meta3d-work-plugin-webgl1-detectgl/src/Main"
import { getWorkPluginContribute as getWebGL1GeometryWorkPluginContribute } from "meta3d-work-plugin-webgl1-geometry/src/Main"
import { getWorkPluginContribute as getWebGL1MaterialWorkPluginContribute } from "meta3d-work-plugin-webgl1-material/src/Main"
import { getWorkPluginContribute as getWebGL1SendUniformShaderDataWorkPluginContribute } from "meta3d-work-plugin-webgl1-senduniformshaderdata/src/Main"
import { getWorkPluginContribute as getWebGL1RenderWorkPluginContribute } from "meta3d-work-plugin-webgl1-render/src/Main"
import { componentName as geometryComponentName, dataName as geometryDataName } from "meta3d-component-geometry-worker-protocol";
import { componentName as transformComponentName, dataName as transformDataName } from "meta3d-component-transform-worker-protocol";

function _getEngineCoreExtensionName(): string {
	return "meta3d-engine-core"
}

function _getMeta3DBsMostExtensionName(): string {
	return "meta3d-bs-most"
}

function _getMeta3DWebGL1ExtensionName(): string {
	return "meta3d-webgl1"
}

function _getMeta3DRegisterECSWorkerExtensionName(): string {
	return "meta3d-register-ecs-worker"
}

function _getMeta3DImmutableExtensionName(): string {
	return "meta3d-immutable"
}

function _getMeta3DRenderDataBufferExtensionName(): string {
	return "meta3d-renderdatabuffer"
}

function _getMeta3DWebGL1WorkerSyncExtensionName(): string {
	return "meta3d-webgl1-worker-sync"
}


function _registerWorkPlugins(engineCoreState: engineCoreState, isDebug: boolean, meta3dState: meta3dState) {
	let { registerWorkPlugin } = getExtensionService<engineCoreService>(meta3dState, _getEngineCoreExtensionName())
	let mostService: mostService = getExtensionService(meta3dState, _getMeta3DBsMostExtensionName())
	let webgl1Service: webgl1Service = getExtensionService(meta3dState, _getMeta3DWebGL1ExtensionName())
	let engineCoreService: engineCoreService = getExtensionService(meta3dState, _getEngineCoreExtensionName())
	let registerECSService: registerECSWorkerService = getExtensionService(meta3dState, _getMeta3DRegisterECSWorkerExtensionName())
	let immutableService: immutableService = getExtensionService(meta3dState, _getMeta3DImmutableExtensionName())
	let renderDataBufferService: renderDataBufferService = getExtensionService(meta3dState, _getMeta3DRenderDataBufferExtensionName())
	let webgl1WorkerSyncService: webgl1WorkerSyncService = getExtensionService(meta3dState, _getMeta3DWebGL1WorkerSyncExtensionName())

	engineCoreState =
		engineCoreService.registerWorkPlugin(
			engineCoreState,
			getWebGL1GetGLWorkPluginContribute({ mostService, webgl1Service, workPluginWhichHasCanvasName: workPluginName }),
			[
				{
					pipelineName: "init",
					insertElementName: "get_init_render_data_webgl1_worker_render_engine",
					insertAction: "after"
				}
			]
		)
	engineCoreState =
		registerWorkPlugin(
			engineCoreState,
			getWebGL1DetectGLWorkPluginContribute({ mostService, webgl1Service }),
			[
				{
					pipelineName: "init",
					insertElementName: "create_gl_webgl1_creategl_meta3d",
					insertAction: "after"
				}
			]
		)
	engineCoreState =
		registerWorkPlugin(
			engineCoreState,
			getWebGL1GeometryWorkPluginContribute({
				mostService, webgl1Service, engineCoreService, immutableService, workPluginWhichHasAllGeometryIndicesName: workPluginName, geometryData: {
					componentName: geometryComponentName,
					verticesDataName: geometryDataName.vertices,
					indicesDataName: geometryDataName.indices
				}
			}),
			[
				{
					pipelineName: "init",
					insertElementName: "register_ecs_webgl1_worker_render_engine",
					insertAction: "after"
				}
			]
		)
	engineCoreState =
		registerWorkPlugin(
			engineCoreState,
			getWebGL1MaterialWorkPluginContribute({
				mostService, webgl1Service, engineCoreService, immutableService, workPluginWhichHasAllMaterialIndicesName: workPluginName
			}),
			[
				{
					pipelineName: "init",
					insertElementName: "register_ecs_webgl1_worker_render_engine",
					insertAction: "after"
				}
			]
		)
	engineCoreState =
		registerWorkPlugin(
			engineCoreState,
			getWebGL1SendUniformShaderDataWorkPluginContribute({
				mostService, webgl1Service, workPluginWhichHasUniformShaderDataName: workPluginName
			}),
			[
				{
					pipelineName: "render",
					insertElementName: "get_render_data_webgl1_worker_render_engine",
					insertAction: "after"
				}
			]
		)
	engineCoreState =
		registerWorkPlugin(
			engineCoreState,
			getWebGL1RenderWorkPluginContribute({
				mostService, webgl1Service, engineCoreService, immutableService, workPluginWhichHasAllRenderComponentsName: workPluginName,
				transformData: {
					componentName: transformComponentName,
					localToWorldMatrixDataName: transformDataName.localToWorldMatrix
				},
				geometryData: {
					componentName: geometryComponentName,
					indicesCountDataName: geometryDataName.indicesCount
				}

			}),
			[
				{
					pipelineName: "render",
					insertElementName: "send_uniform_shader_data_webgl1_senduniformshaderdata_meta3d",
					insertAction: "after"
				}
			]
		)
	engineCoreState =
		registerWorkPlugin(
			engineCoreState,
			getWorkPluginContribute({ isDebug, mostService, webgl1WorkerSyncService, webgl1Service, engineCoreService, renderDataBufferService, registerECSService, immutableService }),
			[
				{
					pipelineName: "init",
					insertElementName: "init_root_meta3d",
					insertAction: "after"
				},
				{
					pipelineName: "render",
					insertElementName: "render_root_meta3d",
					insertAction: "after"
				}
			]
		)

	return engineCoreState
}

function _registerExtensions(meta3dState: meta3dState) {
	meta3dState =
		registerExtension(
			meta3dState,
			_getMeta3DWebGL1ExtensionName(),
			getWebGL1ExtensionService,
			null,
			createWebGL1ExtensionState()
		)

	meta3dState =
		registerExtension(
			meta3dState,
			_getMeta3DRegisterECSWorkerExtensionName(),
			getRegisterECSWorkerExtensionService,
			null,
			createRegisterECSWorkerExtensionState()
		)
	meta3dState =
		registerExtension(
			meta3dState,
			_getMeta3DImmutableExtensionName(),
			getImmutableExtensionService,
			null,
			createImmutableExtensionState()
		)
	meta3dState =
		registerExtension(
			meta3dState,
			_getMeta3DRenderDataBufferExtensionName(),
			getRenderDataBufferExtensionService,
			null,
			createRenderDataBufferExtensionState()
		)
	meta3dState =
		registerExtension(
			meta3dState,
			_getMeta3DWebGL1WorkerSyncExtensionName(),
			getWebGL1WorkerSyncExtensionService,
			null,
			createWebGL1WorkerSyncExtensionState()
		)

	return meta3dState
}

function _init(meta3dState: meta3dState, isDebug: boolean) {
	// meta3dState =
	// 	registerExtension(
	// 		meta3dState,
	// 		_getMeta3DWebGL1ExtensionName(),
	// 		getWebGL1ExtensionService,
	// 		null,
	// 		createWebGL1ExtensionState()
	// 	)

	// meta3dState =
	// 	registerExtension(
	// 		meta3dState,
	// 		_getMeta3DRegisterECSWorkerExtensionName(),
	// 		getRegisterECSWorkerExtensionService,
	// 		null,
	// 		createRegisterECSWorkerExtensionState()
	// 	)
	// meta3dState =
	// 	registerExtension(
	// 		meta3dState,
	// 		_getMeta3DImmutableExtensionName(),
	// 		getImmutableExtensionService,
	// 		null,
	// 		createImmutableExtensionState()
	// 	)
	// meta3dState =
	// 	registerExtension(
	// 		meta3dState,
	// 		_getMeta3DRenderDataBufferExtensionName(),
	// 		getRenderDataBufferExtensionService,
	// 		null,
	// 		createRenderDataBufferExtensionState()
	// 	)
	// meta3dState =
	// 	registerExtension(
	// 		meta3dState,
	// 		_getMeta3DWebGL1WorkerSyncExtensionName(),
	// 		getWebGL1WorkerSyncExtensionService,
	// 		null,
	// 		createWebGL1WorkerSyncExtensionState()
	// 	)

	let engineCoreState = getExtensionState<engineCoreState>(meta3dState, _getEngineCoreExtensionName())

	engineCoreState = _registerWorkPlugins(engineCoreState, isDebug, meta3dState)

	meta3dState = setExtensionState(meta3dState, _getEngineCoreExtensionName(), engineCoreState)

	return initEngine(meta3dState, _getEngineCoreExtensionName()).then((meta3dState) => {
		console.log("finish init engine")

		return meta3dState
	})
}


let isDebug = true

function _render(meta3dState: meta3dState) {
	return renderEngine(meta3dState, _getEngineCoreExtensionName())
}

let meta3dState_ = prepareMeta3D()

meta3dState_ = prepareEngine(
	meta3dState_,
	_getEngineCoreExtensionName(),
	isDebug
)

meta3dState_ = _registerExtensions(meta3dState_)

getExtensionService<webgl1WorkerSyncService>(meta3dState_, _getMeta3DWebGL1WorkerSyncExtensionName()).initConcatGetBeginLoopData(getExtensionService(meta3dState_, _getMeta3DBsMostExtensionName()), _init, _render, meta3dState_, isDebug)