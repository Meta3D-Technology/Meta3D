import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, api } from "meta3d-type"
// import { state } from "meta3d-editor-run-engine-protocol/src/state/StateType"
import { service } from "meta3d-editor-run-engine-protocol/src/service/ServiceType"
import { service as engineWholeService } from "meta3d-engine-whole-protocol/src/service/ServiceType"

export let getExtensionServiceUtils = (api: api, engineWholeProtocolName: string
): service => {
	return {
		prepareAndInitEngine: (meta3dState, gl, canvas, isDebug) => {
			let engineWholeService = api.getExtensionService<engineWholeService>(
				meta3dState,
				engineWholeProtocolName
			)

			meta3dState = engineWholeService.prepare(meta3dState, isDebug,
				{
					float9Array1: new Float32Array(),
					float32Array1: new Float32Array(),
					transformCount: 1000,
					geometryCount: 1000,
					geometryPointCount: 10000,
					pbrMaterialCount: 1000
				},
				gl,
				canvas
			)


			return engineWholeService.init(meta3dState)
		},
		loopEngine: (meta3dState) => {
			let engineWholeService = api.getExtensionService<engineWholeService>(
				meta3dState,
				engineWholeProtocolName
			)

			return engineWholeService.update(meta3dState).then(meta3dState => engineWholeService.render(meta3dState))
		}
	}
}