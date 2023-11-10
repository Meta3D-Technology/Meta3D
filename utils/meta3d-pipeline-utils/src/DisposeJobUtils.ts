import { api, state as meta3dState } from "meta3d-type"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { componentName as arcballCameraControllerComponentName } from "meta3d-component-arcballcameracontroller-protocol"
import { componentName as basicCameraViewComponentName } from "meta3d-component-basiccameraview-protocol"
import { componentName as perspectiveCameraProjectionComponentName } from "meta3d-component-perspectivecameraprojection-protocol";
import { componentName as pbrMaterialComponentName } from "meta3d-component-pbrmaterial-protocol"
import { componentName as transformComponentName } from "meta3d-component-transform-protocol"
import { componentName as geometryComponentName } from "meta3d-component-geometry-protocol"
import { componentName as directionLightComponentName } from "meta3d-component-directionlight-protocol"
import { hasIntersect } from "meta3d-structure-utils/src/ArrayUtils"
import { pbrMaterial } from "meta3d-component-pbrmaterial-protocol-common"
import { getDiffuseMap, getRoughnessMap, getMetalnessMap, getNormalMap } from "meta3d-engine-scene-utils/src/PBRMaterialAPI";
import { getExn, isNullable, return_ } from "meta3d-commonlib-ts/src/NullableUtils"
import { service as textureService } from "meta3d-texture-basicsource-protocol/src/service/ServiceType"
import { texture, state as textureState, wrap } from "meta3d-texture-basicsource-protocol/src/state/StateType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { requireCheck, test } from "meta3d-ts-contract-utils"

let _disposeComponents = <engineCoreState_ extends engineCoreState, engineCoreService_ extends engineCoreService>({ getNeedDisposedComponents, disposeComponents, unsafeGetUsedComponentContribute, setUsedComponentContribute }: engineCoreService_, engineCoreState: engineCoreState_) => {
    let transformContribute = unsafeGetUsedComponentContribute(engineCoreState, transformComponentName)
    let pbrMaterialContribute = unsafeGetUsedComponentContribute(engineCoreState, pbrMaterialComponentName)
    let geometryContribute = unsafeGetUsedComponentContribute(engineCoreState, geometryComponentName)
    let directionLightContribute = unsafeGetUsedComponentContribute(engineCoreState, directionLightComponentName)
    let basicCameraViewContribute = unsafeGetUsedComponentContribute(engineCoreState, basicCameraViewComponentName)
    let perspectiveCameraProjectionContribute = unsafeGetUsedComponentContribute(engineCoreState, perspectiveCameraProjectionComponentName)
    let arcballCameraControllerContribute = unsafeGetUsedComponentContribute(engineCoreState, arcballCameraControllerComponentName)

    let data = disposeComponents(
        transformContribute,
        getNeedDisposedComponents(
            transformContribute,
        )
    )
    transformContribute = data[0]
    let disposedTransforms = data[1]

    data = disposeComponents(
        pbrMaterialContribute,
        getNeedDisposedComponents(
            pbrMaterialContribute,
        )
    )
    pbrMaterialContribute = data[0]
    let disposedPBRMaterials = data[1]

    data = disposeComponents(
        geometryContribute,
        getNeedDisposedComponents(
            geometryContribute,
        )
    )
    geometryContribute = data[0]
    let disposedGeometrys = data[1]


    data = disposeComponents(
        directionLightContribute,
        getNeedDisposedComponents(
            directionLightContribute,
        )
    )
    directionLightContribute = data[0]
    let disposedDirectionLights = data[1]

    data = disposeComponents(
        basicCameraViewContribute,
        getNeedDisposedComponents(
            basicCameraViewContribute,
        )
    )
    basicCameraViewContribute = data[0]
    let disposedBasicCameraViews = data[1]

    data = disposeComponents(
        perspectiveCameraProjectionContribute,
        getNeedDisposedComponents(
            perspectiveCameraProjectionContribute,
        )
    )
    perspectiveCameraProjectionContribute = data[0]
    let disposedPerspectiveCameraProjections = data[1]

    data = disposeComponents(
        arcballCameraControllerContribute,
        getNeedDisposedComponents(
            arcballCameraControllerContribute,
        )
    )
    arcballCameraControllerContribute = data[0]
    let disposedArcballCameraControllers = data[1]


    engineCoreState = setUsedComponentContribute(engineCoreState, transformContribute, transformComponentName) as engineCoreState_
    engineCoreState = setUsedComponentContribute(engineCoreState, pbrMaterialContribute, pbrMaterialComponentName) as engineCoreState_
    engineCoreState = setUsedComponentContribute(engineCoreState, geometryContribute, geometryComponentName) as engineCoreState_
    engineCoreState = setUsedComponentContribute(engineCoreState, basicCameraViewContribute, basicCameraViewComponentName) as engineCoreState_
    engineCoreState = setUsedComponentContribute(engineCoreState, perspectiveCameraProjectionContribute, perspectiveCameraProjectionComponentName) as engineCoreState_
    engineCoreState = setUsedComponentContribute(engineCoreState, arcballCameraControllerContribute, arcballCameraControllerComponentName) as engineCoreState_


    return [engineCoreState,
        [
            disposedTransforms,
            disposedGeometrys,
            disposedPBRMaterials,
            disposedDirectionLights,
            disposedBasicCameraViews,
            disposedPerspectiveCameraProjections,
            disposedArcballCameraControllers
        ]
    ]
}


let _disposeGameObjects = <engineCoreState_ extends engineCoreState, engineCoreService_ extends engineCoreService>({ getNeedDisposedGameObjects, disposeGameObjects }: engineCoreService_, engineCoreState: engineCoreState_) => {
    return disposeGameObjects(
        engineCoreState,
        getNeedDisposedGameObjects(engineCoreState)
    )
}

let _checkNotIntersect = (
    [
        disposedTransforms,
        disposedGeometrys,
        disposedPBRMaterials,
        disposedDirectionLights,
        disposedBasicCameraViews,
        disposedPerspectiveCameraProjections,
        disposedArcballCameraControllers
    ]: any,
    [
        disposedTransformsFromGameObject,
        disposedGeometrysFromGameObject,
        disposedPBRMaterialsFromGameObject,
        disposedDirectionLightsFromGameObject,
        disposedBasicCameraViewsFromGameObject,
        disposedPerspectiveCameraProjectionsFromGameObject,
        disposedArcballCameraControllersFromGameObject
    ]: any
) => {
    requireCheck(() => {
        test("should not intersect", () => {
            return !(hasIntersect(disposedTransforms, disposedTransformsFromGameObject) ||
                hasIntersect(disposedGeometrys, disposedGeometrysFromGameObject) ||
                hasIntersect(disposedPBRMaterials, disposedPBRMaterialsFromGameObject) ||
                hasIntersect(disposedDirectionLights, disposedDirectionLightsFromGameObject) ||
                hasIntersect(disposedBasicCameraViews, disposedBasicCameraViewsFromGameObject) ||
                hasIntersect(disposedPerspectiveCameraProjections, disposedPerspectiveCameraProjectionsFromGameObject) ||
                hasIntersect(disposedArcballCameraControllers, disposedArcballCameraControllersFromGameObject)
            )
        })
    }, true)
}

let _disposeTexture = (meta3dState: meta3dState, api: api, meta3dEngineCoreExtensionProtocolName: string, getMapFunc: any, pbrMaterial: pbrMaterial): [meta3dState, nullable<texture>] => {
    let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, meta3dEngineCoreExtensionProtocolName)

    let engineCoreService = api.getExtensionService<engineCoreService>(
        meta3dState,
        meta3dEngineCoreExtensionProtocolName
    )

    let texture = getMapFunc(engineCoreState, engineCoreService, pbrMaterial)

    let disposedTexture = null

    if (!isNullable(texture)) {
        let textureService = api.getExtensionService<textureService>(meta3dState, "meta3d-texture-basicsource-protocol")

        let textureState = api.getExtensionState<textureState>(meta3dState, "meta3d-texture-basicsource-protocol")

        let data = textureService.disposeTexture(textureState, texture, pbrMaterial)
        textureState = data[0]
        disposedTexture = data[1]

        // if (!isNullable(disposedTexture)) {
        //     disposedTextures.push(getExn(disposedTexture))
        // }

        meta3dState = api.setExtensionState(meta3dState, "meta3d-texture-basicsource-protocol",
            textureState
        )
    }

    return [meta3dState, disposedTexture]
}

let _addDisposedTexture = (disposedTextures: Array<texture>, disposedTexture: nullable<texture>) => {
    if (isNullable(disposedTexture)) {
        return disposedTextures
    }

    disposedTextures.push(getExn(disposedTexture))

    return disposedTextures
}

let _disposeAllMaps = (meta3dState: meta3dState, api: api, meta3dEngineCoreExtensionProtocolName: string, disposedPBRMaterials: Array<pbrMaterial>) => {
    return disposedPBRMaterials.reduce(([meta3dState, disposedTextures]: [meta3dState, Array<texture>], pbrMaterial) => {
        let data = _disposeTexture(meta3dState, api, meta3dEngineCoreExtensionProtocolName, getDiffuseMap, pbrMaterial)
        meta3dState = data[0]
        disposedTextures = _addDisposedTexture(disposedTextures, data[1])

        data = _disposeTexture(meta3dState, api, meta3dEngineCoreExtensionProtocolName, getRoughnessMap, pbrMaterial)
        meta3dState = data[0]
        disposedTextures = _addDisposedTexture(disposedTextures, data[1])

        data = _disposeTexture(meta3dState, api, meta3dEngineCoreExtensionProtocolName, getMetalnessMap, pbrMaterial)
        meta3dState = data[0]
        disposedTextures = _addDisposedTexture(disposedTextures, data[1])

        data = _disposeTexture(meta3dState, api, meta3dEngineCoreExtensionProtocolName, getNormalMap, pbrMaterial)
        meta3dState = data[0]
        disposedTextures = _addDisposedTexture(disposedTextures, data[1])

        return [meta3dState, disposedTextures] as [meta3dState, Array<texture>]
    }, [meta3dState, []])
}

export let dispose = <engineCoreState_ extends engineCoreState, engineCoreService_ extends engineCoreService>(api: api, meta3dState: meta3dState, meta3dEngineCoreExtensionProtocolName: string,
    {
        DisposeGameObjectsEventName,
        DisposeGeometrysEventName,
        DisposePBRMaterialsEventName,
        DisposeDirectionLightsEventName,
        DisposeTransformsEventName,
        DisposeBasicCameraViewsEventName,
        DisposePerspectiveCameraProjectionsEventName,
        DisposeTextureEventName,
    }: any
) => {
    let engineCoreService = api.getExtensionService<engineCoreService_>(meta3dState, meta3dEngineCoreExtensionProtocolName)

    let data1 = _disposeComponents<engineCoreState_, engineCoreService_>(
        engineCoreService,
        api.getExtensionState<engineCoreState_>(meta3dState, meta3dEngineCoreExtensionProtocolName),
    )
    let engineCoreState = data1[0] as engineCoreState_
    let [
        disposedTransforms,
        disposedGeometrys,
        disposedPBRMaterials,
        disposedDirectionLights,
        disposedBasicCameraViews,
        disposedPerspectiveCameraProjections,
        disposedArcballCameraControllers
    ] = data1[1] as any

    let data2 = _disposeGameObjects<engineCoreState_, engineCoreService_>(engineCoreService, engineCoreState)
    engineCoreState = data2[0] as engineCoreState_
    let [
        disposedGameObjects,
        disposedTransformsFromGameObject,
        disposedGeometrysFromGameObject,
        disposedPBRMaterialsFromGameObject,
        disposedDirectionLightsFromGameObject,
        disposedBasicCameraViewsFromGameObject,
        disposedPerspectiveCameraProjectionsFromGameObject,
        disposedArcballCameraControllersFromGameObject
    ] = data2[1]

    _checkNotIntersect(
        data1[1], data2[1].slice(1)
    )


    meta3dState = api.setExtensionState<engineCoreState_>(meta3dState, meta3dEngineCoreExtensionProtocolName, engineCoreState)

    let allDisposedPBRMaterials = disposedPBRMaterials.concat(disposedPBRMaterialsFromGameObject)

    let data = _disposeAllMaps(meta3dState, api, meta3dEngineCoreExtensionProtocolName, allDisposedPBRMaterials)
    meta3dState = data[0]
    let disposedTextures = data[1]


    let allDisposedGameObjects = disposedGameObjects
    let allDisposedTransforms = disposedTransforms.concat(disposedTransformsFromGameObject)
    let allDisposedTextures = disposedTextures
    let allDisposedGeometrys = disposedGeometrys.concat(disposedGeometrysFromGameObject)
    let allDisposedDirectionLights = disposedDirectionLights.concat(disposedDirectionLightsFromGameObject)
    let allDisposedBasicCameraViews = disposedBasicCameraViews.concat(disposedBasicCameraViewsFromGameObject)
    let allDisposedPerspectiveCameraProjections = disposedPerspectiveCameraProjections.concat(disposedPerspectiveCameraProjectionsFromGameObject)
    let allDisposedArcballCameraControllers = disposedArcballCameraControllers.concat(disposedArcballCameraControllersFromGameObject)

    let eventService = api.getExtensionService<eventService>(meta3dState, "meta3d-event-protocol")

    if (allDisposedGameObjects.length > 0) {
        meta3dState = eventService.triggerCustomGlobalEvent2(meta3dState, "meta3d-event-protocol", eventService.createCustomEvent(DisposeGameObjectsEventName, return_(allDisposedGameObjects as any)))
    }
    if (allDisposedTransforms.length > 0) {
        meta3dState = eventService.triggerCustomGlobalEvent2(meta3dState, "meta3d-event-protocol", eventService.createCustomEvent(DisposeTransformsEventName, return_(allDisposedTransforms)))
    }
    if (allDisposedGeometrys.length > 0) {
        meta3dState = eventService.triggerCustomGlobalEvent2(meta3dState, "meta3d-event-protocol", eventService.createCustomEvent(DisposeGeometrysEventName, return_(allDisposedGeometrys)))
    }
    if (allDisposedPBRMaterials.length > 0) {
        meta3dState = eventService.triggerCustomGlobalEvent2(meta3dState, "meta3d-event-protocol", eventService.createCustomEvent(DisposePBRMaterialsEventName, return_(allDisposedPBRMaterials)))
    }
    if (allDisposedTextures.length > 0) {
        meta3dState = eventService.triggerCustomGlobalEvent2(meta3dState, "meta3d-event-protocol", eventService.createCustomEvent(DisposeTextureEventName, return_(allDisposedTextures as any)))
    }
    if (allDisposedDirectionLights.length > 0) {
        meta3dState = eventService.triggerCustomGlobalEvent2(meta3dState, "meta3d-event-protocol", eventService.createCustomEvent(DisposeDirectionLightsEventName, return_(allDisposedDirectionLights)))
    }
    if (allDisposedBasicCameraViews.length > 0) {
        meta3dState = eventService.triggerCustomGlobalEvent2(meta3dState, "meta3d-event-protocol", eventService.createCustomEvent(DisposeBasicCameraViewsEventName, return_(allDisposedBasicCameraViews)))
    }
    if (allDisposedPerspectiveCameraProjections.length > 0) {
        meta3dState = eventService.triggerCustomGlobalEvent2(meta3dState, "meta3d-event-protocol", eventService.createCustomEvent(DisposePerspectiveCameraProjectionsEventName, return_(allDisposedPerspectiveCameraProjections)))
    }
    if (allDisposedArcballCameraControllers.length > 0) {
        meta3dState = eventService.triggerCustomGlobalEvent2(meta3dState, "meta3d-event-protocol", eventService.createCustomEvent(DisposeTransformsEventName, return_(allDisposedArcballCameraControllers)))
    }

    return meta3dState
}