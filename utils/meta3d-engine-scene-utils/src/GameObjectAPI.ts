import { service as engineCoreService } from "meta3d-engine-core-sceneview-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-sceneview-protocol/src/state/StateType"
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
import { getChildren, setLocalPosition, setLocalScale } from "./TransformAPI"
import { removeGameObjectData } from "meta3d-engine-scene-sceneview-protocol/src/service/ecs/GameObject"

export let createGameObject = (engineCoreState: engineCoreState, { createGameObject }: engineCoreService): [engineCoreState, gameObject] => {
    let contribute = createGameObject(engineCoreState)
    engineCoreState = contribute[0]
    let gameObject = contribute[1]

    return [
        engineCoreState,
        gameObject
    ]
}

let _buildUnUsedName = () => "meta3d_gameobject_unused"

export let createUnUseGameObject = (engineCoreState: engineCoreState, { createGameObject, setGameObjectName }: engineCoreService): [engineCoreState, gameObject] => {
    let contribute = createGameObject(engineCoreState)
    engineCoreState = contribute[0]
    let gameObject = contribute[1]

    engineCoreState = setGameObjectName(engineCoreState, gameObject, _buildUnUsedName())

    return [
        engineCoreState,
        gameObject
    ]
}

export let getGameObjectName = (engineCoreState: engineCoreState, { getGameObjectName }: engineCoreService, gameObject: gameObject): nullable<name> => {
    return getGameObjectName(engineCoreState, gameObject)
}

export let setGameObjectName = (engineCoreState: engineCoreState, { setGameObjectName }: engineCoreService, gameObject: gameObject, name: name): engineCoreState => {
    return setGameObjectName(engineCoreState, gameObject, name)
}

export let getTransform = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponent }: engineCoreService, gameObject: gameObject) => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, transformComponentName)

    return getExn(getComponent<transform>(contribute, gameObject))
}

export let addTransform = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }: engineCoreService, gameObject: gameObject, transform: transform) => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, transformComponentName)

    return setUsedComponentContribute(engineCoreState, addComponent(contribute, gameObject, transform), transformComponentName)
}

export let hasTransform = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, hasComponent }: engineCoreService, gameObject: gameObject) => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, transformComponentName)

    return hasComponent(contribute, gameObject)
}

export let getDirectionLight = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponent }: engineCoreService, gameObject: gameObject) => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, directionLightComponentName)

    return getExn(getComponent<directionLight>(contribute, gameObject))
}

export let addDirectionLight = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }: engineCoreService, gameObject: gameObject, directionLight: directionLight) => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, directionLightComponentName)

    return setUsedComponentContribute(engineCoreState, addComponent(contribute, gameObject, directionLight), directionLightComponentName)
}

export let hasDirectionLight = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, hasComponent }: engineCoreService, gameObject: gameObject) => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, directionLightComponentName)

    return hasComponent(contribute, gameObject)
}

export let getGeometry = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponent }: engineCoreService, gameObject: gameObject) => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, geometryComponentName)

    return getExn(getComponent<geometry>(contribute, gameObject))
}

export let addGeometry = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }: engineCoreService, gameObject: gameObject, geometry: geometry) => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, geometryComponentName)

    return setUsedComponentContribute(engineCoreState, addComponent(contribute, gameObject, geometry), geometryComponentName)
}

export let hasGeometry = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, hasComponent }: engineCoreService, gameObject: gameObject) => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, geometryComponentName)

    return hasComponent(contribute, gameObject)
}

export let getPBRMaterial = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponent }: engineCoreService, gameObject: gameObject) => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, pbrMaterialComponentName)

    return getExn(getComponent<pbrMaterial>(contribute, gameObject))
}

export let addPBRMaterial = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }: engineCoreService, gameObject: gameObject, pbrMaterial: pbrMaterial) => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, pbrMaterialComponentName)

    return setUsedComponentContribute(engineCoreState, addComponent(contribute, gameObject, pbrMaterial), pbrMaterialComponentName)
}

export let hasPBRMaterial = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, hasComponent }: engineCoreService, gameObject: gameObject) => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, pbrMaterialComponentName)

    return hasComponent(contribute, gameObject)
}

export let getBasicCameraView = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponent }: engineCoreService, gameObject: gameObject) => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, basicCameraViewComponentName)

    return getExn(getComponent<basicCameraView>(contribute, gameObject))
}

export let addBasicCameraView = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }: engineCoreService, gameObject: gameObject, basicCameraView: basicCameraView) => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, basicCameraViewComponentName)

    return setUsedComponentContribute(engineCoreState, addComponent(contribute, gameObject, basicCameraView), basicCameraViewComponentName)
}

export let hasBasicCameraView = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, hasComponent }: engineCoreService, gameObject: gameObject) => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, basicCameraViewComponentName)

    return hasComponent(contribute, gameObject)
}

export let getPerspectiveCameraProjection = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponent }: engineCoreService, gameObject: gameObject) => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, perspectiveCameraProjectionComponentName)

    return getExn(getComponent<perspectiveCameraProjection>(contribute, gameObject))
}

export let addPerspectiveCameraProjection = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }: engineCoreService, gameObject: gameObject, perspectiveCameraProjection: perspectiveCameraProjection) => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, perspectiveCameraProjectionComponentName)

    return setUsedComponentContribute(engineCoreState, addComponent(contribute, gameObject, perspectiveCameraProjection), perspectiveCameraProjectionComponentName)
}

export let hasPerspectiveCameraProjection = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, hasComponent }: engineCoreService, gameObject: gameObject) => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, perspectiveCameraProjectionComponentName)

    return hasComponent(contribute, gameObject)
}

export let getArcballCameraController = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponent }: engineCoreService, gameObject: gameObject) => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, arcballCameraControllerComponentName)

    return getExn(getComponent<arcballCameraController>(contribute, gameObject))
}

export let addArcballCameraController = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }: engineCoreService, gameObject: gameObject, arcballCameraController: arcballCameraController) => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, arcballCameraControllerComponentName)

    return setUsedComponentContribute(engineCoreState, addComponent(contribute, gameObject, arcballCameraController), arcballCameraControllerComponentName)
}

export let hasArcballCameraController = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, hasComponent }: engineCoreService, gameObject: gameObject) => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, arcballCameraControllerComponentName)

    return hasComponent(contribute, gameObject)
}

export let cloneGameObject = (engineCoreState: engineCoreState, { cloneGameObject }: engineCoreService, count: number, cloneConfig: cloneConfig, sourceGameObject: gameObject) => {
    return cloneGameObject(engineCoreState, count, cloneConfig, sourceGameObject)
}

export let getNeedDisposedGameObjects = (engineCoreState: engineCoreState, { getNeedDisposedGameObjects }: engineCoreService) => {
    return getNeedDisposedGameObjects(engineCoreState)
}

export let disposeGameObjects = (engineCoreState: engineCoreState, { deferDisposeGameObject }: engineCoreService, gameObjects: gameObject[]) => {
    return gameObjects.reduce(deferDisposeGameObject, engineCoreState)
}

export let disposeGameObjectTransformComponent = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, deferDisposeComponent }: engineCoreService, gameObject: gameObject, component: transform) => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, transformComponentName)

    return setUsedComponentContribute(engineCoreState, deferDisposeComponent<transform>(contribute, [component, gameObject]), transformComponentName)
}

export let disposeGameObjectPBRMaterialComponent = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, deferDisposeComponent }: engineCoreService, gameObject: gameObject, component: pbrMaterial) => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, pbrMaterialComponentName)

    return setUsedComponentContribute(engineCoreState, deferDisposeComponent<pbrMaterial>(contribute, [component, gameObject]), pbrMaterialComponentName)
}

export let disposeGameObjectDirectionLightComponent = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, deferDisposeComponent }: engineCoreService, gameObject: gameObject, component: directionLight) => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, directionLightComponentName)

    return setUsedComponentContribute(engineCoreState, deferDisposeComponent<directionLight>(contribute, [component, gameObject]), directionLightComponentName)
}

export let disposeGameObjectGeometryComponent = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, deferDisposeComponent }: engineCoreService, gameObject: gameObject, component: geometry) => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, geometryComponentName)

    return setUsedComponentContribute(engineCoreState, deferDisposeComponent<geometry>(contribute, [component, gameObject]), geometryComponentName)
}

export let disposeGameObjectBasicCameraViewComponent = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, deferDisposeComponent }: engineCoreService, gameObject: gameObject, component: basicCameraView) => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, basicCameraViewComponentName)

    return setUsedComponentContribute(engineCoreState, deferDisposeComponent<basicCameraView>(contribute, [component, gameObject]), basicCameraViewComponentName)
}

export let disposeGameObjectPerspectiveCameraProjectionComponent = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, deferDisposeComponent }: engineCoreService, gameObject: gameObject, component: perspectiveCameraProjection) => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, perspectiveCameraProjectionComponentName)

    return setUsedComponentContribute(engineCoreState, deferDisposeComponent<perspectiveCameraProjection>(contribute, [component, gameObject]), perspectiveCameraProjectionComponentName)
}

export let disposeGameObjectArcballCameraControllerComponent = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, deferDisposeComponent }: engineCoreService, gameObject: gameObject, component: arcballCameraController) => {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, arcballCameraControllerComponentName)

    return setUsedComponentContribute(engineCoreState, deferDisposeComponent<arcballCameraController>(contribute, [component, gameObject]), arcballCameraControllerComponentName)
}

export let getGameObjectAndAllChildren = (engineCoreState: engineCoreState, engineCoreService: engineCoreService, gameObject: gameObject): Array<gameObject> => {
    let _func = (result: Array<gameObject>, gameObject: gameObject, engineCoreState: engineCoreState): Array<gameObject> => {
        result.push(gameObject)

        let children = getChildren(engineCoreState, engineCoreService, getTransform(engineCoreState, engineCoreService, gameObject))

        if (!isNullable(children)) {
            children = getExn(children)
            if (children.length > 0) {
                return children.reduce((result: Array<gameObject>, child: gameObject) => {
                    return _func(result, child, engineCoreState)
                }, result)
            }
        }

        return result
    }

    return _func([], gameObject, engineCoreState)
}

let _buildRemovedName = () => "meta3d_gameObject_removed"

export let removeGameObjects = (engineCoreState: engineCoreState, engineCoreService: engineCoreService, gameObjects: Array<gameObject>): engineCoreState => {
    return gameObjects.reduce((engineCoreState, gameObject) => {
        engineCoreState = setGameObjectName(engineCoreState, engineCoreService, gameObject, _buildRemovedName())

        let transform = getTransform(engineCoreState, engineCoreService, gameObject)

        engineCoreState = setLocalScale(engineCoreState, engineCoreService, transform, [0, 0, 0])
        engineCoreState = setLocalPosition(engineCoreState, engineCoreService, transform, [10000, 10000, 10000])

        return engineCoreState
    }, engineCoreState)
}

export let restoreRemovedGameObjects = (engineCoreState: engineCoreState, engineCoreService: engineCoreService, data: Array<removeGameObjectData>): engineCoreState => {
    return data.reduce((engineCoreState, { gameObject, name, localScale, localPosition }) => {
        engineCoreState = getWithDefault(map((name) => {
            return setGameObjectName(engineCoreState, engineCoreService, gameObject, name)
        }, name), engineCoreState)

        let transform = getTransform(engineCoreState, engineCoreService, gameObject)

        engineCoreState = setLocalScale(engineCoreState, engineCoreService, transform, localScale)
        engineCoreState = setLocalPosition(engineCoreState, engineCoreService, transform, localPosition)

        return engineCoreState
    }, engineCoreState)
}

export let getAllGameObjects = (engineCoreState: engineCoreState, { getAllGameObjects, getGameObjectName }: engineCoreService): Array<gameObject> => {
    return getAllGameObjects(engineCoreState).filter(gameObject => {
        return getWithDefault(map((name) => {
            return name != _buildUnUsedName() && name != _buildRemovedName()
        }, getGameObjectName(engineCoreState, gameObject)), true)
    })
}
