import { engineCoreService } from "meta3d-core-protocol/src/service/ServiceType"
import { state as meta3dState } from "meta3d-type"
import { gameObject, cloneConfig, name } from "meta3d-gameobject-protocol"
import { geometry, componentName as geometryComponentName } from "meta3d-component-geometry-protocol"
import { transform, componentName as transformComponentName } from "meta3d-component-transform-protocol"
import { pbrMaterial, componentName as pbrMaterialComponentName } from "meta3d-component-pbrmaterial-protocol"
import { arcballCameraController, componentName as arcballCameraControllerComponentName } from "meta3d-component-arcballcameracontroller-protocol"
import { basicCameraView, componentName as basicCameraViewComponentName } from "meta3d-component-basiccameraview-protocol"
import { perspectiveCameraProjection, componentName as perspectiveCameraProjectionComponentName } from "meta3d-component-perspectivecameraprojection-protocol"
import { getExn, getWithDefault, isNullable, map } from "meta3d-commonlib-ts/src/NullableUtils"
import { directionLight, componentName as directionLightComponentName } from "meta3d-component-directionlight-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { getChildren, setLocalPosition, setLocalScale, getGameObjects } from "./TransformAPI"
import { removeGameObjectData } from "meta3d-engine-scene-protocol/src/service/ecs/GameObject"
import { buildRemovedName, buildUnUsedName, isValidGameObjectName } from "./Utils"

export let createGameObject = (meta3dState: meta3dState, { createGameObject }: engineCoreService): [meta3dState, gameObject] => {
    let contribute = createGameObject(meta3dState)
    meta3dState = contribute[0]
    let gameObject = contribute[1]

    return [
        meta3dState,
        gameObject
    ]
}

export let createUnUseGameObject = (meta3dState: meta3dState, { createGameObject, setGameObjectName }: engineCoreService): [meta3dState, gameObject] => {
    let contribute = createGameObject(meta3dState)
    meta3dState = contribute[0]
    let gameObject = contribute[1]

    meta3dState = setGameObjectName(meta3dState, gameObject, buildUnUsedName())

    return [
        meta3dState,
        gameObject
    ]
}

export let getGameObjectName = (meta3dState: meta3dState, { getGameObjectName }: engineCoreService, gameObject: gameObject): nullable<name> => {
    return getGameObjectName(meta3dState, gameObject)
}

export let setGameObjectName = (meta3dState: meta3dState, { setGameObjectName }: engineCoreService, gameObject: gameObject, name: name): meta3dState => {
    return setGameObjectName(meta3dState, gameObject, name)
}

export let getTransform = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponent }: engineCoreService, gameObject: gameObject) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, transformComponentName)

    return getExn(getComponent<transform>(contribute, gameObject))
}

export let addTransform = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }: engineCoreService, gameObject: gameObject, transform: transform) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, transformComponentName)

    return setUsedComponentContribute(meta3dState, addComponent(contribute, gameObject, transform), transformComponentName)
}

export let hasTransform = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, hasComponent }: engineCoreService, gameObject: gameObject) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, transformComponentName)

    return hasComponent(contribute, gameObject)
}

export let getDirectionLight = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponent }: engineCoreService, gameObject: gameObject) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, directionLightComponentName)

    return getExn(getComponent<directionLight>(contribute, gameObject))
}

export let addDirectionLight = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }: engineCoreService, gameObject: gameObject, directionLight: directionLight) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, directionLightComponentName)

    return setUsedComponentContribute(meta3dState, addComponent(contribute, gameObject, directionLight), directionLightComponentName)
}

export let hasDirectionLight = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, hasComponent }: engineCoreService, gameObject: gameObject) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, directionLightComponentName)

    return hasComponent(contribute, gameObject)
}

export let getGeometry = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponent }: engineCoreService, gameObject: gameObject) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, geometryComponentName)

    return getExn(getComponent<geometry>(contribute, gameObject))
}

export let addGeometry = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }: engineCoreService, gameObject: gameObject, geometry: geometry) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, geometryComponentName)

    return setUsedComponentContribute(meta3dState, addComponent(contribute, gameObject, geometry), geometryComponentName)
}

export let hasGeometry = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, hasComponent }: engineCoreService, gameObject: gameObject) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, geometryComponentName)

    return hasComponent(contribute, gameObject)
}

export let getPBRMaterial = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponent }: engineCoreService, gameObject: gameObject) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, pbrMaterialComponentName)

    return getExn(getComponent<pbrMaterial>(contribute, gameObject))
}

export let addPBRMaterial = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }: engineCoreService, gameObject: gameObject, pbrMaterial: pbrMaterial) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, pbrMaterialComponentName)

    return setUsedComponentContribute(meta3dState, addComponent(contribute, gameObject, pbrMaterial), pbrMaterialComponentName)
}

export let hasPBRMaterial = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, hasComponent }: engineCoreService, gameObject: gameObject) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, pbrMaterialComponentName)

    return hasComponent(contribute, gameObject)
}

export let getBasicCameraView = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponent }: engineCoreService, gameObject: gameObject) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, basicCameraViewComponentName)

    return getExn(getComponent<basicCameraView>(contribute, gameObject))
}

export let addBasicCameraView = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }: engineCoreService, gameObject: gameObject, basicCameraView: basicCameraView) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, basicCameraViewComponentName)

    return setUsedComponentContribute(meta3dState, addComponent(contribute, gameObject, basicCameraView), basicCameraViewComponentName)
}

export let hasBasicCameraView = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, hasComponent }: engineCoreService, gameObject: gameObject) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, basicCameraViewComponentName)

    return hasComponent(contribute, gameObject)
}

export let getPerspectiveCameraProjection = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponent }: engineCoreService, gameObject: gameObject) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, perspectiveCameraProjectionComponentName)

    return getExn(getComponent<perspectiveCameraProjection>(contribute, gameObject))
}

export let addPerspectiveCameraProjection = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }: engineCoreService, gameObject: gameObject, perspectiveCameraProjection: perspectiveCameraProjection) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, perspectiveCameraProjectionComponentName)

    return setUsedComponentContribute(meta3dState, addComponent(contribute, gameObject, perspectiveCameraProjection), perspectiveCameraProjectionComponentName)
}

export let hasPerspectiveCameraProjection = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, hasComponent }: engineCoreService, gameObject: gameObject) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, perspectiveCameraProjectionComponentName)

    return hasComponent(contribute, gameObject)
}

export let getArcballCameraController = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponent }: engineCoreService, gameObject: gameObject) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, arcballCameraControllerComponentName)

    return getExn(getComponent<arcballCameraController>(contribute, gameObject))
}

export let addArcballCameraController = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }: engineCoreService, gameObject: gameObject, arcballCameraController: arcballCameraController) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, arcballCameraControllerComponentName)

    return setUsedComponentContribute(meta3dState, addComponent(contribute, gameObject, arcballCameraController), arcballCameraControllerComponentName)
}

export let hasArcballCameraController = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, hasComponent }: engineCoreService, gameObject: gameObject) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, arcballCameraControllerComponentName)

    return hasComponent(contribute, gameObject)
}

export let cloneGameObject = (meta3dState: meta3dState, { cloneGameObject }: engineCoreService, count: number, cloneConfig: cloneConfig, sourceGameObject: gameObject) => {
    return cloneGameObject(meta3dState, count, cloneConfig, sourceGameObject)
}

export let getNeedDisposedGameObjects = (meta3dState: meta3dState, { getNeedDisposedGameObjects }: engineCoreService) => {
    return getNeedDisposedGameObjects(meta3dState)
}

export let disposeGameObjects = (meta3dState: meta3dState, { deferDisposeGameObject }: engineCoreService, gameObjects: gameObject[]) => {
    return gameObjects.reduce(deferDisposeGameObject, meta3dState)
}

export let disposeGameObjectTransformComponent = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, deferDisposeComponent }: engineCoreService, gameObject: gameObject, component: transform) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, transformComponentName)

    return setUsedComponentContribute(meta3dState, deferDisposeComponent<transform>(contribute, [component, gameObject]), transformComponentName)
}

export let disposeGameObjectPBRMaterialComponent = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, deferDisposeComponent }: engineCoreService, gameObject: gameObject, component: pbrMaterial) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, pbrMaterialComponentName)

    return setUsedComponentContribute(meta3dState, deferDisposeComponent<pbrMaterial>(contribute, [component, gameObject]), pbrMaterialComponentName)
}

export let disposeGameObjectDirectionLightComponent = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, deferDisposeComponent }: engineCoreService, gameObject: gameObject, component: directionLight) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, directionLightComponentName)

    return setUsedComponentContribute(meta3dState, deferDisposeComponent<directionLight>(contribute, [component, gameObject]), directionLightComponentName)
}

export let disposeGameObjectGeometryComponent = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, deferDisposeComponent }: engineCoreService, gameObject: gameObject, component: geometry) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, geometryComponentName)

    return setUsedComponentContribute(meta3dState, deferDisposeComponent<geometry>(contribute, [component, gameObject]), geometryComponentName)
}

export let disposeGameObjectBasicCameraViewComponent = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, deferDisposeComponent }: engineCoreService, gameObject: gameObject, component: basicCameraView) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, basicCameraViewComponentName)

    return setUsedComponentContribute(meta3dState, deferDisposeComponent<basicCameraView>(contribute, [component, gameObject]), basicCameraViewComponentName)
}

export let disposeGameObjectPerspectiveCameraProjectionComponent = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, deferDisposeComponent }: engineCoreService, gameObject: gameObject, component: perspectiveCameraProjection) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, perspectiveCameraProjectionComponentName)

    return setUsedComponentContribute(meta3dState, deferDisposeComponent<perspectiveCameraProjection>(contribute, [component, gameObject]), perspectiveCameraProjectionComponentName)
}

export let disposeGameObjectArcballCameraControllerComponent = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, deferDisposeComponent }: engineCoreService, gameObject: gameObject, component: arcballCameraController) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, arcballCameraControllerComponentName)

    return setUsedComponentContribute(meta3dState, deferDisposeComponent<arcballCameraController>(contribute, [component, gameObject]), arcballCameraControllerComponentName)
}

export let getGameObjectAndAllChildren = (meta3dState: meta3dState, engineCoreService: engineCoreService, gameObject: gameObject): Array<gameObject> => {
    let _func = (result: Array<gameObject>, gameObject: gameObject, meta3dState: meta3dState): Array<gameObject> => {
        result.push(gameObject)

        let children = getChildren(meta3dState, engineCoreService, getTransform(meta3dState, engineCoreService, gameObject))

        if (!isNullable(children)) {
            children = getExn(children)
            if (children.length > 0) {
                return children.reduce((result: Array<gameObject>, child: transform) => {
                    return _func(result, getGameObjects(meta3dState, engineCoreService, child)[0], meta3dState)
                }, result)
            }
        }

        return result
    }

    return _func([], gameObject, meta3dState)
}


export let removeGameObjects = (meta3dState: meta3dState, engineCoreService: engineCoreService, gameObjects: Array<gameObject>): meta3dState => {
    return gameObjects.reduce((meta3dState, gameObject) => {
        meta3dState = setGameObjectName(meta3dState, engineCoreService, gameObject, buildRemovedName())

        let transform = getTransform(meta3dState, engineCoreService, gameObject)

        meta3dState = setLocalScale(meta3dState, engineCoreService, transform, [0, 0, 0])
        meta3dState = setLocalPosition(meta3dState, engineCoreService, transform, [10000, 10000, 10000])

        return meta3dState
    }, meta3dState)
}

export let restoreRemovedGameObjects = (meta3dState: meta3dState, engineCoreService: engineCoreService, data: Array<removeGameObjectData>): meta3dState => {
    return data.reduce((meta3dState, { gameObject, name, localScale, localPosition }) => {
        meta3dState = getWithDefault(map((name) => {
            return setGameObjectName(meta3dState, engineCoreService, gameObject, name)
        }, name), meta3dState)

        let transform = getTransform(meta3dState, engineCoreService, gameObject)

        meta3dState = setLocalScale(meta3dState, engineCoreService, transform, localScale)
        meta3dState = setLocalPosition(meta3dState, engineCoreService, transform, localPosition)

        return meta3dState
    }, meta3dState)
}

export let getAllGameObjects = (meta3dState: meta3dState, { getAllGameObjects, getGameObjectName }: engineCoreService): Array<gameObject> => {
    return getAllGameObjects(meta3dState).filter(gameObject => {
        return getWithDefault(map(isValidGameObjectName, getGameObjectName(meta3dState, gameObject)), true)
    })
}
