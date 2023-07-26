import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D } from "meta3d-type"
import { state } from "meta3d-editor-run-engine-protocol/src/state/StateType"
import { service } from "meta3d-editor-run-engine-protocol/src/service/ServiceType"
import { service as engineWholeService } from "meta3d-editor-engine-whole-protocol/src/service/ServiceType"
import { getViewRect } from "meta3d-view-utils/src/ViewRect"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"

function _createCameraGameObject(meta3dState, scene, canvasSize) {
	// let { gameObject, basicCameraView } = scene

	let data = scene.gameObject.createGameObject(meta3dState)
	meta3dState = data[0]
	let gameObject = data[1]


	data = scene.transform.createTransform(meta3dState)
	meta3dState = data[0]
	let transform = data[1]

	meta3dState = scene.gameObject.addTransform(meta3dState, gameObject, transform)

	data = scene.basicCameraView.createBasicCameraView(meta3dState)
	meta3dState = data[0]
	let cameraView = data[1]

	meta3dState = scene.basicCameraView.active(meta3dState, cameraView)
	meta3dState = scene.gameObject.addBasicCameraView(meta3dState, gameObject, cameraView)

	data = scene.perspectiveCameraProjection.createPerspectiveCameraProjection(meta3dState)
	meta3dState = data[0]
	let cameraProjection = data[1]

	meta3dState = scene.perspectiveCameraProjection.setFovy(meta3dState, cameraProjection, 30)
	meta3dState = scene.perspectiveCameraProjection.setAspect(meta3dState, cameraProjection, canvasSize[0] / canvasSize[1])
	meta3dState = scene.perspectiveCameraProjection.setNear(meta3dState, cameraProjection, 1)
	meta3dState = scene.perspectiveCameraProjection.setFar(meta3dState, cameraProjection, 100)
	meta3dState = scene.gameObject.addPerspectiveCameraProjection(meta3dState, gameObject, cameraProjection)


	meta3dState = scene.transform.setLocalPosition(meta3dState, transform, [10, 10, 10])
	meta3dState = scene.transform.lookAt(meta3dState, transform, [0, 1, 0])

	console.log(scene.transform.getLocalPosition(meta3dState, transform))

	return meta3dState
}

function _createCubeGameObject(meta3dState, scene) {
	let data = scene.gameObject.createGameObject(meta3dState)
	meta3dState = data[0]
	let gameObject = data[1]


	data = scene.transform.createTransform(meta3dState)
	meta3dState = data[0]
	let transform = data[1]

	meta3dState = scene.gameObject.addTransform(meta3dState, gameObject, transform)

	data = scene.geometry.createGeometry(meta3dState)
	meta3dState = data[0]
	let geometry = data[1]


	let vertices = new Float32Array([
		1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0,
		1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0,
		1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0,
		-1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0,
		-1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0,
		-1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0
	])

	let indices = new Uint32Array([
		0, 1, 2, 0, 2, 3,
		4, 5, 6, 4, 6, 7,
		8, 9, 10, 8, 10, 11,
		12, 13, 14, 12, 14, 15,
		16, 17, 18, 16, 18, 19,
		20, 21, 22, 20, 22, 23
	])
	meta3dState = scene.geometry.setVertices(meta3dState, geometry, vertices)
	meta3dState = scene.geometry.setIndices(meta3dState, geometry, indices)
	meta3dState = scene.gameObject.addGeometry(meta3dState, gameObject, geometry)


	meta3dState = scene.gameObject.addGeometry(meta3dState, gameObject, geometry)



	data = scene.pbrMaterial.createPBRMaterial(meta3dState)
	meta3dState = data[0]
	let material = data[1]
	meta3dState = scene.pbrMaterial.setDiffuseColor(meta3dState, material, [1.0, 0.0, 0.0])
	meta3dState = scene.gameObject.addPBRMaterial(meta3dState, gameObject, material)


	return meta3dState
}

function _createScene(meta3dState, scene, canvasSize) {
	meta3dState = _createCameraGameObject(meta3dState, scene, canvasSize)

	meta3dState = _createCubeGameObject(meta3dState, scene)

	return meta3dState

}

export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	return {
		prepareAndInitEngine: (meta3dState, gl, isDebug) => {
			let engineWholeService = api.getExtensionService<engineWholeService>(
				meta3dState,
				"meta3d-editor-engine-whole-protocol"
			)

			meta3dState = engineWholeService.prepare(meta3dState, isDebug,
				{
					float9Array1: new Float32Array(),
					float32Array1: new Float32Array(),
					transformCount: 100,
					geometryCount: 100,
					geometryPointCount: 1000,
					pbrMaterialCount: 100
				},
				gl
			)

			let uiService = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")
			let { width, height } = getExn(getViewRect(uiService, api.getExtensionState(meta3dState, "meta3d-ui-protocol")))
			meta3dState = _createScene(meta3dState, engineWholeService.scene, { width, height })


			return engineWholeService.init(meta3dState)
		},
		loopEngine: (meta3dState) => {
			let engineWholeService = api.getExtensionService<engineWholeService>(
				meta3dState,
				"meta3d-editor-engine-whole-protocol"
			)

			return engineWholeService.update(meta3dState).then(meta3dState => engineWholeService.render(meta3dState))
		}
	}
}

export let createExtensionState: createExtensionStateMeta3D<
	state
> = () => {
	return null
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
	return {
	}
}
