import { api, state as meta3dState } from "meta3d-type"
import { service as coreService } from "meta3d-core-protocol/src/service/ServiceType"
import { engineCoreService } from "meta3d-core-protocol/src/service/ServiceType"
import { componentName as arcballCameraControllerComponentName } from "meta3d-component-arcballcameracontroller-protocol"
import { componentName as basicCameraViewComponentName } from "meta3d-component-basiccameraview-protocol"
import { componentName as perspectiveCameraProjectionComponentName } from "meta3d-component-perspectivecameraprojection-protocol";
import { componentName as scriptComponentName } from "meta3d-component-script-protocol";
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

let _disposeComponents = (meta3dState: meta3dState, { getNeedDisposedComponents, disposeComponents, unsafeGetUsedComponentContribute, setUsedComponentContribute }: engineCoreService) => {
    let transformContribute = unsafeGetUsedComponentContribute(meta3dState, transformComponentName)
    let pbrMaterialContribute = unsafeGetUsedComponentContribute(meta3dState, pbrMaterialComponentName)
    let geometryContribute = unsafeGetUsedComponentContribute(meta3dState, geometryComponentName)
    let directionLightContribute = unsafeGetUsedComponentContribute(meta3dState, directionLightComponentName)
    let basicCameraViewContribute = unsafeGetUsedComponentContribute(meta3dState, basicCameraViewComponentName)
    let perspectiveCameraProjectionContribute = unsafeGetUsedComponentContribute(meta3dState, perspectiveCameraProjectionComponentName)
    let scriptContribute = unsafeGetUsedComponentContribute(meta3dState, scriptComponentName)
    let arcballCameraControllerContribute = unsafeGetUsedComponentContribute(meta3dState, arcballCameraControllerComponentName)

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
        scriptContribute,
        getNeedDisposedComponents(
            scriptContribute,
        )
    )
    scriptContribute = data[0]
    let disposedScripts = data[1]

    data = disposeComponents(
        arcballCameraControllerContribute,
        getNeedDisposedComponents(
            arcballCameraControllerContribute,
        )
    )
    arcballCameraControllerContribute = data[0]
    let disposedArcballCameraControllers = data[1]


    meta3dState = setUsedComponentContribute(meta3dState, transformContribute, transformComponentName) as meta3dState
    meta3dState = setUsedComponentContribute(meta3dState, pbrMaterialContribute, pbrMaterialComponentName) as meta3dState
    meta3dState = setUsedComponentContribute(meta3dState, geometryContribute, geometryComponentName) as meta3dState
    meta3dState = setUsedComponentContribute(meta3dState, basicCameraViewContribute, basicCameraViewComponentName) as meta3dState
    meta3dState = setUsedComponentContribute(meta3dState, perspectiveCameraProjectionContribute, perspectiveCameraProjectionComponentName) as meta3dState
    meta3dState = setUsedComponentContribute(meta3dState, scriptContribute, scriptComponentName) as meta3dState
    meta3dState = setUsedComponentContribute(meta3dState, arcballCameraControllerContribute, arcballCameraControllerComponentName) as meta3dState


    return [meta3dState,
        [
            disposedTransforms,
            disposedGeometrys,
            disposedPBRMaterials,
            disposedDirectionLights,
            disposedBasicCameraViews,
            disposedPerspectiveCameraProjections,
            disposedScripts,
            disposedArcballCameraControllers
        ]
    ]
}


let _disposeGameObjects = (meta3dState: meta3dState, { getNeedDisposedGameObjects, disposeGameObjects }: engineCoreService) => {
    return disposeGameObjects(
        meta3dState,
        getNeedDisposedGameObjects(meta3dState)
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

let _disposeTexture = (meta3dState: meta3dState, api: api, getMapFunc: any, pbrMaterial: pbrMaterial): [meta3dState, nullable<texture>] => {
    let engineCoreService = getExn(api.getPackageService<coreService>(
        meta3dState,
        "meta3d-core-protocol"
    )).engineCore(meta3dState)

    let texture = getMapFunc(meta3dState, engineCoreService, pbrMaterial)

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

let _disposeAllMaps = (meta3dState: meta3dState, api: api, disposedPBRMaterials: Array<pbrMaterial>) => {
    return disposedPBRMaterials.reduce(([meta3dState, disposedTextures]: [meta3dState, Array<texture>], pbrMaterial) => {
        let data = _disposeTexture(meta3dState, api, getDiffuseMap, pbrMaterial)
        meta3dState = data[0]
        disposedTextures = _addDisposedTexture(disposedTextures, data[1])

        data = _disposeTexture(meta3dState, api, getRoughnessMap, pbrMaterial)
        meta3dState = data[0]
        disposedTextures = _addDisposedTexture(disposedTextures, data[1])

        data = _disposeTexture(meta3dState, api, getMetalnessMap, pbrMaterial)
        meta3dState = data[0]
        disposedTextures = _addDisposedTexture(disposedTextures, data[1])

        data = _disposeTexture(meta3dState, api, getNormalMap, pbrMaterial)
        meta3dState = data[0]
        disposedTextures = _addDisposedTexture(disposedTextures, data[1])

        return [meta3dState, disposedTextures] as [meta3dState, Array<texture>]
    }, [meta3dState, []])
}

export let dispose = (api: api, meta3dState: meta3dState,
    {
        DisposeGameObjectsEventName,
        DisposeGeometrysEventName,
        DisposePBRMaterialsEventName,
        DisposeDirectionLightsEventName,
        DisposeTransformsEventName,
        DisposeBasicCameraViewsEventName,
        DisposePerspectiveCameraProjectionsEventName,
        DisposeScriptEventName,
        DisposeTextureEventName,
    }: any
) => {
    let coreService = getExn(api.getPackageService<coreService>(meta3dState, "meta3d-core-protocol"))
    let engineCoreService = coreService.engineCore(meta3dState)

    let data1 = _disposeComponents(
        meta3dState,
        engineCoreService,
    )
    meta3dState = data1[0] as meta3dState
    let [
        disposedTransforms,
        disposedGeometrys,
        disposedPBRMaterials,
        disposedDirectionLights,
        disposedBasicCameraViews,
        disposedPerspectiveCameraProjections,
        disposedScripts,
        disposedArcballCameraControllers
    ] = data1[1] as any

    let data2 = _disposeGameObjects(meta3dState, engineCoreService)
    meta3dState = data2[0] as meta3dState
    let [
        disposedGameObjects,
        disposedTransformsFromGameObject,
        disposedGeometrysFromGameObject,
        disposedPBRMaterialsFromGameObject,
        disposedDirectionLightsFromGameObject,
        disposedBasicCameraViewsFromGameObject,
        disposedPerspectiveCameraProjectionsFromGameObject,
        disposedScriptsFromGameObject,
        disposedArcballCameraControllersFromGameObject
    ] = data2[1]

    _checkNotIntersect(
        data1[1], data2[1].slice(1)
    )


    let allDisposedPBRMaterials = disposedPBRMaterials.concat(disposedPBRMaterialsFromGameObject)

    let data = _disposeAllMaps(meta3dState, api, allDisposedPBRMaterials)
    meta3dState = data[0]
    let disposedTextures = data[1]


    let allDisposedGameObjects = disposedGameObjects
    let allDisposedTransforms = disposedTransforms.concat(disposedTransformsFromGameObject)
    let allDisposedTextures = disposedTextures
    let allDisposedGeometrys = disposedGeometrys.concat(disposedGeometrysFromGameObject)
    let allDisposedDirectionLights = disposedDirectionLights.concat(disposedDirectionLightsFromGameObject)
    let allDisposedBasicCameraViews = disposedBasicCameraViews.concat(disposedBasicCameraViewsFromGameObject)
    let allDisposedPerspectiveCameraProjections = disposedPerspectiveCameraProjections.concat(disposedPerspectiveCameraProjectionsFromGameObject)
    let allDisposedScripts = disposedScripts.concat(disposedScriptsFromGameObject)
    let allDisposedArcballCameraControllers = disposedArcballCameraControllers.concat(disposedArcballCameraControllersFromGameObject)

    let eventService = getExn(api.getPackageService<eventService>(meta3dState, "meta3d-event-protocol"))

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
    if (allDisposedScripts.length > 0) {
        meta3dState = eventService.triggerCustomGlobalEvent2(meta3dState, "meta3d-event-protocol", eventService.createCustomEvent(DisposeScriptEventName, return_(allDisposedScripts)))
    }
    if (allDisposedArcballCameraControllers.length > 0) {
        meta3dState = eventService.triggerCustomGlobalEvent2(meta3dState, "meta3d-event-protocol", eventService.createCustomEvent(DisposeTransformsEventName, return_(allDisposedArcballCameraControllers)))
    }

    return meta3dState
}