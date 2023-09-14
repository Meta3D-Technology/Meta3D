import { api, state as meta3dState } from "meta3d-type"
import { service as engineCoreService } from "meta3d-engine-core-sceneview-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-sceneview-protocol/src/state/StateType"
import { componentName as arcballCameraControllerComponentName } from "meta3d-component-arcballcameracontroller-protocol"
import { componentName as basicCameraViewComponentName } from "meta3d-component-basiccameraview-protocol"
import { componentName as perspectiveCameraProjectionComponentName } from "meta3d-component-perspectivecameraprojection-protocol";
import { componentName as pbrMaterialComponentName } from "meta3d-component-pbrmaterial-protocol"
import { componentName as transformComponentName } from "meta3d-component-transform-protocol"
import { componentName as geometryComponentName } from "meta3d-component-geometry-protocol"

// TODO dispose directionLight component
let _disposeComponents = <engineCoreState_ extends engineCoreState, engineCoreService_ extends engineCoreService>({ getNeedDisposedComponents, disposeComponents, unsafeGetUsedComponentContribute, setUsedComponentContribute }: engineCoreService_, engineCoreState: engineCoreState_): engineCoreState_ => {
    let transformContribute = unsafeGetUsedComponentContribute(engineCoreState, transformComponentName)
    let pbrMaterialContribute = unsafeGetUsedComponentContribute(engineCoreState, pbrMaterialComponentName)
    let geometryContribute = unsafeGetUsedComponentContribute(engineCoreState, geometryComponentName)
    let basicCameraViewContribute = unsafeGetUsedComponentContribute(engineCoreState, basicCameraViewComponentName)
    let perspectiveCameraProjectionContribute = unsafeGetUsedComponentContribute(engineCoreState, perspectiveCameraProjectionComponentName)
    let arcballCameraControllerContribute = unsafeGetUsedComponentContribute(engineCoreState, arcballCameraControllerComponentName)

    transformContribute = disposeComponents(
        transformContribute,
        getNeedDisposedComponents(
            transformContribute,
        )
    )

    pbrMaterialContribute = disposeComponents(
        pbrMaterialContribute,
        getNeedDisposedComponents(
            pbrMaterialContribute,
        )
    )

    geometryContribute = disposeComponents(
        geometryContribute,
        getNeedDisposedComponents(
            geometryContribute,
        )
    )

    basicCameraViewContribute = disposeComponents(
        basicCameraViewContribute,
        getNeedDisposedComponents(
            basicCameraViewContribute,
        )
    )

    perspectiveCameraProjectionContribute = disposeComponents(
        perspectiveCameraProjectionContribute,
        getNeedDisposedComponents(
            perspectiveCameraProjectionContribute,
        )
    )

    arcballCameraControllerContribute = disposeComponents(
        arcballCameraControllerContribute,
        getNeedDisposedComponents(
            arcballCameraControllerContribute,
        )
    )


    engineCoreState = setUsedComponentContribute(engineCoreState, transformContribute, transformComponentName) as engineCoreState_
    engineCoreState = setUsedComponentContribute(engineCoreState, pbrMaterialContribute, pbrMaterialComponentName) as engineCoreState_
    engineCoreState = setUsedComponentContribute(engineCoreState, geometryContribute, geometryComponentName) as engineCoreState_
    engineCoreState = setUsedComponentContribute(engineCoreState, basicCameraViewContribute, basicCameraViewComponentName) as engineCoreState_
    engineCoreState = setUsedComponentContribute(engineCoreState, perspectiveCameraProjectionContribute, perspectiveCameraProjectionComponentName) as engineCoreState_
    engineCoreState = setUsedComponentContribute(engineCoreState, arcballCameraControllerContribute, arcballCameraControllerComponentName) as engineCoreState_


    return engineCoreState
}


let _disposeGameObjects = <engineCoreState_ extends engineCoreState, engineCoreService_ extends engineCoreService>({ getNeedDisposedGameObjects, disposeGameObjects }: engineCoreService_, engineCoreState: engineCoreState_): engineCoreState_ => {
    return disposeGameObjects(
        engineCoreState,
        getNeedDisposedGameObjects(engineCoreState)
    ) as engineCoreState_
}

export let dispose = <engineCoreState_ extends engineCoreState, engineCoreService_ extends engineCoreService>(api: api, meta3dState: meta3dState, meta3dEngineCoreExtensionProtocolName: string) => {
    let engineCoreService = api.getExtensionService<engineCoreService_>(meta3dState, meta3dEngineCoreExtensionProtocolName)

    let engineCoreState = _disposeComponents<engineCoreState_, engineCoreService_>(
        engineCoreService,
        api.getExtensionState<engineCoreState_>(meta3dState, meta3dEngineCoreExtensionProtocolName),
    )
    engineCoreState = _disposeGameObjects<engineCoreState_, engineCoreService_>(engineCoreService, engineCoreState)

    return api.setExtensionState<engineCoreState_>(meta3dState, meta3dEngineCoreExtensionProtocolName, engineCoreState
    )
}