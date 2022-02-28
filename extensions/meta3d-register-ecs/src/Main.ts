import { getExtensionService as getExtensionServiceMeta3d, createExtensionState as createExtensionStateMeta3d } from "meta3d-type/src/Index"
import { dependentExtensionNameMap } from "meta3d-register-ecs-protocol/src/service/DependentExtensionType"
import { service, config } from "meta3d-register-ecs-protocol/src/service/ServiceType"
import { state } from "meta3d-register-ecs-protocol/src/state/StateType"
import { service as meta3dEngineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { getComponentContribute as getTransformComponentContribute } from "meta3d-component-transform"
import { componentName as transformComponentName, config as transformConfig } from "meta3d-component-transform-protocol"
import { getGameObjectContribute } from "meta3d-gameobject-dataoriented"

export let getExtensionService: getExtensionServiceMeta3d<
	dependentExtensionNameMap,
	service
> = (api, { meta3dEngineCoreExtensionName }) => {
	return {
		register: (engineCoreState, meta3dState, { isDebug, float9Array1, float32Array1, transformCount }: config) => {
			let { registerComponent, createAndSetComponentState, setGameObjectContribute, createAndSetGameObjectState } = api.getServiceExn<meta3dEngineCoreService>(meta3dState, meta3dEngineCoreExtensionName)

			// TODO use pipe
			engineCoreState =
				registerComponent(engineCoreState, getTransformComponentContribute())
			engineCoreState = createAndSetComponentState<transformConfig>(engineCoreState,
				transformComponentName,
				{
					isDebug: isDebug,
					transformCount: transformCount,
					float9Array1: float9Array1,
					float32Array1: float32Array1,
				}
			)
			engineCoreState = setGameObjectContribute(engineCoreState, getGameObjectContribute() as any
			)
			engineCoreState = createAndSetGameObjectState(engineCoreState)

			return engineCoreState
		}
	}
}

export let createExtensionState: createExtensionStateMeta3d<
	state
> = () => {
	return null
}
