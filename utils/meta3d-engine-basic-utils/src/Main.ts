import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { service } from "meta3d-engine-basic-protocol/src/service/ServiceType"
import { service as coreService, pipelineContribute } from "meta3d-core-protocol/src/service/ServiceType"
import { pipelineRootState, pipelineRootConfig } from "meta3d-core-protocol/src/state/StateType";
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"

export let getExtensionServiceUtils = (api: api): service => {
	return {
		prepare: (meta3dState: meta3dState, isDebug) => {
			let engineCoreService = getExn(api.getPackageService<coreService>(
				meta3dState,
				"meta3d-core-protocol"
			)).engineCore(meta3dState)

			let { setIsDebug, registerPipeline } = engineCoreService

			meta3dState = setIsDebug(meta3dState, isDebug)



			meta3dState = registerPipeline(meta3dState, api.getContribute<pipelineContribute<pipelineRootConfig, pipelineRootState>>(meta3dState, "meta3d-pipeline-root-protocol")
			)


			return meta3dState
		}
	}
}