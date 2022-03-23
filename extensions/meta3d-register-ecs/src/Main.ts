import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D } from "meta3d-type/src/Index"
import { dependentExtensionNameMap } from "meta3d-register-ecs-protocol/src/service/DependentExtensionType"
import { service, config } from "meta3d-register-ecs-protocol/src/service/ServiceType"
import { state } from "meta3d-register-ecs-protocol/src/state/StateType"
import { service as meta3dEngineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { getComponentContribute as getTransformComponentContribute } from "meta3d-component-transform"
import { componentName as transformComponentName, config as transformConfig } from "meta3d-component-transform-protocol"
import { getComponentContribute as getGeometryComponentContribute } from "meta3d-component-geometry"
import { componentName as geometryComponentName, config as geometryConfig } from "meta3d-component-geometry-protocol"
import { getComponentContribute as getPBRMaterialComponentContribute } from "meta3d-component-pbrmaterial"
import { componentName as pbrMaterialComponentName, config as pbrMaterialConfig } from "meta3d-component-pbrmaterial-protocol"
import { getComponentContribute as getBasicCameraViewComponentContribute } from "meta3d-component-basiccameraview"
import { componentName as basicCameraViewComponentName, config as basicCameraViewConfig } from "meta3d-component-basiccameraview-protocol"
import { getComponentContribute as getPerspecticeCameraProjectionComponentContribute } from "meta3d-component-perspectivecameraprojection"
import { componentName as perspecticeCameraProjectionComponentName, config as perspecticeCameraProjectionConfig } from "meta3d-component-perspectivecameraprojection-protocol"
import { getGameObjectContribute } from "meta3d-gameobject-dataoriented"

export let getExtensionService: getExtensionServiceMeta3D<
	dependentExtensionNameMap,
	service
> = (api, { meta3dEngineCoreExtensionName }) => {
	return {
		register: (engineCoreState, meta3dState, { isDebug, float9Array1, float32Array1, transformCount, geometryCount, geometryPointCount, pbrMaterialCount }: config) => {
			let { registerComponent, createAndSetComponentState, setGameObjectContribute, createAndSetGameObjectState } = api.getExtensionService<meta3dEngineCoreService>(meta3dState, meta3dEngineCoreExtensionName)

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
			engineCoreState =
				registerComponent(engineCoreState, getGeometryComponentContribute())
			engineCoreState = createAndSetComponentState<geometryConfig>(engineCoreState,
				geometryComponentName,
				{
					isDebug: isDebug,
					geometryCount: geometryCount,
					geometryPointCount: geometryPointCount
				}
			)


			engineCoreState =
				registerComponent(engineCoreState, getPBRMaterialComponentContribute())
			engineCoreState = createAndSetComponentState<pbrMaterialConfig>(engineCoreState,
				pbrMaterialComponentName,
				{
					isDebug: isDebug,
					pbrMaterialCount: pbrMaterialCount,
				}
			)

			engineCoreState =
				registerComponent(engineCoreState, getBasicCameraViewComponentContribute())
			engineCoreState = createAndSetComponentState<basicCameraViewConfig>(engineCoreState,
				basicCameraViewComponentName,
				{
					isDebug: isDebug
				}
			)

			engineCoreState =
				registerComponent(engineCoreState, getPerspecticeCameraProjectionComponentContribute())
			engineCoreState = createAndSetComponentState<perspecticeCameraProjectionConfig>(engineCoreState,
				perspecticeCameraProjectionComponentName,
				{
					isDebug: isDebug,
				}
			)




			engineCoreState = setGameObjectContribute(engineCoreState, getGameObjectContribute() as any
			)
			engineCoreState = createAndSetGameObjectState(engineCoreState)

			return engineCoreState
		}
	}
}

export let createExtensionState: createExtensionStateMeta3D<
	state
> = () => {
	return null
}
