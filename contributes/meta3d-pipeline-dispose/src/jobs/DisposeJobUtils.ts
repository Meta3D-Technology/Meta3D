import { api, state as meta3dState } from "meta3d-type"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { componentName as arcballCameraControllerComponentName } from "meta3d-component-arcballcameracontroller-protocol"
import { componentName as basicCameraViewComponentName } from "meta3d-component-basiccameraview-protocol"
import { componentName as perspectiveCameraProjectionComponentName } from "meta3d-component-perspectivecameraprojection-protocol";
import { componentName as pbrMaterialComponentName } from "meta3d-component-pbrmaterial-protocol"
import { componentName as transformComponentName } from "meta3d-component-transform-protocol"
import { componentName as geometryComponentName } from "meta3d-component-geometry-protocol"

// TODO dispose directionLight component
let _disposeComponents = ({ getNeedDisposedComponents, disposeComponents, unsafeGetUsedComponentContribute, setUsedComponentContribute }: engineCoreService, engineCoreState: engineCoreState) => {
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


    engineCoreState = setUsedComponentContribute(engineCoreState, transformContribute, transformComponentName)
    engineCoreState = setUsedComponentContribute(engineCoreState, pbrMaterialContribute, pbrMaterialComponentName)
    engineCoreState = setUsedComponentContribute(engineCoreState, geometryContribute, geometryComponentName)
    engineCoreState = setUsedComponentContribute(engineCoreState, basicCameraViewContribute, basicCameraViewComponentName)
    engineCoreState = setUsedComponentContribute(engineCoreState, perspectiveCameraProjectionContribute, perspectiveCameraProjectionComponentName)
    engineCoreState = setUsedComponentContribute(engineCoreState, arcballCameraControllerContribute, arcballCameraControllerComponentName)


    return engineCoreState
}


let _disposeGameObjects = ({ getNeedDisposedGameObjects, disposeGameObjects }: engineCoreService, engineCoreState: engineCoreState) => {
    return disposeGameObjects(
        engineCoreState,
        getNeedDisposedGameObjects(engineCoreState)
    )
}

export let dispose = (api: api, meta3dState: meta3dState) => {
    let meta3dEngineCoreExtensionProtocolName = "meta3d-engine-core-protocol"

    let engineCoreService = api.getExtensionService<engineCoreService>(meta3dState, meta3dEngineCoreExtensionProtocolName)

    let engineCoreState = _disposeComponents(
        engineCoreService,
        api.getExtensionState<engineCoreState>(meta3dState, meta3dEngineCoreExtensionProtocolName),
    )
    engineCoreState = _disposeGameObjects(engineCoreService, engineCoreState)

    return api.setExtensionState<engineCoreState>(meta3dState, meta3dEngineCoreExtensionProtocolName, engineCoreState
    )
}