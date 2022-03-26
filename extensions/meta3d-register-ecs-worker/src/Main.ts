import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D } from "meta3d-type/src/Index"
import { dependentExtensionNameMap } from "meta3d-register-ecs-worker-protocol/src/service/DependentExtensionType"
import { service, config } from "meta3d-register-ecs-worker-protocol/src/service/ServiceType"
import { state } from "meta3d-register-ecs-worker-protocol/src/state/StateType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { getComponentContribute as getTransformComponentWorkerContribute } from "meta3d-component-transform-worker"
import { componentName as transformComponentName, config as transformConfig } from "meta3d-component-transform-worker-protocol"
import { getComponentContribute as getGeometryComponentWorkerContribute } from "meta3d-component-geometry-worker"
import { componentName as geometryComponentName, config as geometryConfig } from "meta3d-component-geometry-worker-protocol"
import { getComponentContribute as getPBRMaterialComponentWorkerContribute } from "meta3d-component-pbrmaterial-worker"
import { componentName as pbrMaterialComponentName, config as pbrMaterialConfig } from "meta3d-component-pbrmaterial-worker-protocol"

export let getExtensionService: getExtensionServiceMeta3D<
	dependentExtensionNameMap,
	service
> = (api, _) => {
	return {
		register: (engineCoreState, { registerComponent, createAndSetComponentState }: engineCoreService, { isDebug, transformCount, geometryCount, geometryPointCount, pbrMaterialCount, transformBuffer, geometryBuffer, pbrMateiralBuffer }: config) => {
			// TODO use pipe
			engineCoreState =
				registerComponent(engineCoreState, getTransformComponentWorkerContribute())
			engineCoreState = createAndSetComponentState<transformConfig>(engineCoreState,
				transformComponentName,
				{
					isDebug: isDebug,
					transformCount: transformCount,
					buffer: transformBuffer
				}
			)
			engineCoreState =
				registerComponent(engineCoreState, getGeometryComponentWorkerContribute())
			engineCoreState = createAndSetComponentState<geometryConfig>(engineCoreState,
				geometryComponentName,
				{
					isDebug: isDebug,
					geometryCount: geometryCount,
					geometryPointCount: geometryPointCount,
					buffer: geometryBuffer
				}
			)


			engineCoreState =
				registerComponent(engineCoreState, getPBRMaterialComponentWorkerContribute())
			engineCoreState = createAndSetComponentState<pbrMaterialConfig>(engineCoreState,
				pbrMaterialComponentName,
				{
					isDebug: isDebug,
					pbrMaterialCount: pbrMaterialCount,
					buffer: pbrMateiralBuffer
				}
			)

			return engineCoreState
		}
	}
}

export let createExtensionState: createExtensionStateMeta3D<
	state
> = () => {
	return null
}
