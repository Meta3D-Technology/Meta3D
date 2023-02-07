import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D } from "meta3d-type"
import { state } from "meta3d-editor-run-engine-protocol/src/state/StateType"
import { service } from "meta3d-editor-run-engine-protocol/src/service/ServiceType"
import { dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap } from "./DependentMapType"
import { service as engineWholeService } from "meta3d-editor-engine-whole-protocol/src/service/ServiceType"

export let getExtensionService: getExtensionServiceMeta3D<
	dependentExtensionProtocolNameMap,
	dependentContributeProtocolNameMap,
	service
> = (api, [{
	meta3dEditorEngineWholeExtensionProtocolName
}, _]) => {
		return {
			prepareAndInitEngine: (meta3dState, gl, isDebug) => {
				let engineWholeService = api.getExtensionService<engineWholeService>(
					meta3dState,
					meta3dEditorEngineWholeExtensionProtocolName
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

				return engineWholeService.init(meta3dState)
			},
			loopEngine: (meta3dState) => {
				let engineWholeService = api.getExtensionService<engineWholeService>(
					meta3dState,
					meta3dEditorEngineWholeExtensionProtocolName
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
