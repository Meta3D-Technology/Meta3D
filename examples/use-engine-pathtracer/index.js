import { prepare as prepareMeta3D, registerExtension, getExtensionService, getExtensionState, setExtensionState } from "meta3d"
import { prepare as prepareEngine, prepareRegisterECSExtension, init as initEngine, update as updateEngine, render as renderEngine } from "engine-facade/src/DirectorAPI.js"
import { addBasicCameraView, addGeometry, addPBRMaterial, addPerspectiveCameraProjection, addTransform, cloneGameObject, createGameObject, getTransform } from "engine-facade/src/GameObjectAPI.js"
import { getExtensionService as getWebGPUExtensionService, createExtensionState as createWebGPUExtensionState } from "meta3d-webgpu-node/src/Main.js"
import { getExtensionService as getFSExtensionService, createExtensionState as createFSExtensionState } from "meta3d-fs/src/Main.js"
import { getWorkPluginContribute as getPathTracerWorkPluginContribute } from "engine-work-plugin-pathtracer/src/Main.js"
import { createGeometry, setIndices, setVertices } from "engine-facade/src/GeometryAPI.js"

function _getEngineCoreExtensionName() {
	return "meta3d-engine-core"
}

function _getMeta3DBsMostExtensionName() {
	return "meta3d-bs-most"
}

function _getMeta3DWebGPUExtensionName() {
	return "meta3d-webgpu-node"
}

function _getMeta3DFSExtensionName() {
	return "meta3d-fs"
}

function _registerWorkPlugins(engineCoreState, isDebug, meta3dState) {
	let { registerWorkPlugin } = getExtensionService(meta3dState, _getEngineCoreExtensionName())
	let mostService = getExtensionService(meta3dState, _getMeta3DBsMostExtensionName())
	let webgpuService = getExtensionService(meta3dState, _getMeta3DWebGPUExtensionName())
	let engineCoreService = getExtensionService(meta3dState, _getEngineCoreExtensionName())
	let fsService = getExtensionService(meta3dState, _getMeta3DFSExtensionName())

	engineCoreState =
		registerWorkPlugin(
			engineCoreState,
			getPathTracerWorkPluginContribute({ mostService, webgpuService, fsService, engineCoreService, width: 640, height: 480, dirname: "../../engine/engine-work-plugin-pathtracer/" }),
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

function _createTriangle(engineCoreState, engineCoreService) {
	let data = createGameObject(engineCoreState, engineCoreService)
	engineCoreState = data[0]
	let gameObject = data[1]

	data = createGeometry(engineCoreState, engineCoreService)
	engineCoreState = data[0]
	let geometry = data[1]

	let vertices = new Float32Array([
		0.0, 0.5,
		-0.5, -0.5,
		0.5, -0.5
	])

	let indices = new Uint32Array([
		0, 1, 2
	])
	engineCoreState = setVertices(engineCoreState, engineCoreService, geometry, vertices)
	engineCoreState = setIndices(engineCoreState, engineCoreService, geometry, indices)
	engineCoreState = addGeometry(engineCoreState, engineCoreService, gameObject, geometry)

	return [engineCoreState, gameObject]
}

function _createScene(engineCoreState, engineCoreService) {
	let data = _createTriangle(engineCoreState, engineCoreService)
	engineCoreState = data[0]

	return engineCoreState
}

function _init() {
	let isDebug = true

	let meta3dState = prepareMeta3D()

	meta3dState = prepareEngine(
		meta3dState,
		_getEngineCoreExtensionName(),
		isDebug
	)

	meta3dState = prepareRegisterECSExtension(
		meta3dState,
		_getEngineCoreExtensionName(),
		{
			isDebug: isDebug,
			float9Array1: new Float32Array(),
			float32Array1: new Float32Array(),
			transformCount: 10,
			geometryCount: 10,
			geometryPointCount: 100,
			pbrMaterialCount: 10
		}
	)

	meta3dState =
		registerExtension(
			meta3dState,
			_getMeta3DWebGPUExtensionName(),
			getWebGPUExtensionService,
			null,
			createWebGPUExtensionState()
		)
	meta3dState =
		registerExtension(
			meta3dState,
			_getMeta3DFSExtensionName(),
			getFSExtensionService,
			null,
			createFSExtensionState()
		)


	let engineCoreState = getExtensionState(meta3dState, _getEngineCoreExtensionName())

	engineCoreState = _registerWorkPlugins(engineCoreState, isDebug, meta3dState)

	engineCoreState = _createScene(engineCoreState, getExtensionService(meta3dState, _getEngineCoreExtensionName()))


	meta3dState = setExtensionState(meta3dState, _getEngineCoreExtensionName(), engineCoreState)

	return initEngine(meta3dState, _getEngineCoreExtensionName()).then((meta3dState) => {
		console.log("finish init engine")

		return meta3dState
	})
}

async function _loop(meta3dState) {
	while (true) {
		meta3dState = await renderEngine(meta3dState, _getEngineCoreExtensionName())
	}
}

_init().then(_loop)
