import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { state } from "meta3d-editor-engine-webgpu-whole-protocol/src/state/StateType"
import { service } from "meta3d-editor-engine-webgpu-whole-protocol/src/service/ServiceType"
import { dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap } from "./DependentMapType"
import { service as engineBasicService } from "meta3d-engine-basic-protocol/src/service/ServiceType"
import { service as engineWebgpuRenderService } from "meta3d-editor-engine-webgpu-render-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { init, render, update } from "./DirectorAPI"

export let getExtensionService: getExtensionServiceMeta3D<
	dependentExtensionProtocolNameMap,
	dependentContributeProtocolNameMap,
	service
> = (api, [{
	meta3dBsMostExtensionProtocolName,
	meta3dEngineCoreExtensionProtocolName,
	meta3dEngineBasicExtensionProtocolName,
	meta3dEditorEngineWebgpuRenderExtensionProtocolName,
}, _]) => {
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
			prepare: (meta3dState: meta3dState, isDebug, context) => {
				let engineBasicService = api.getExtensionService<engineBasicService>(
					meta3dState,
					meta3dEngineBasicExtensionProtocolName
				)

				meta3dState = engineBasicService.prepare(meta3dState, isDebug)


				let engineWebgpuRenderService = api.getExtensionService<engineWebgpuRenderService>(
					meta3dState,
					meta3dEditorEngineWebgpuRenderExtensionProtocolName
				)

				meta3dState = engineWebgpuRenderService.prepare(meta3dState, isDebug, context)


				return meta3dState
			},
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
