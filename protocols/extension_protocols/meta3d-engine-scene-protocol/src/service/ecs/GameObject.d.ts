import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { gameObject, cloneConfig } from "meta3d-gameobject-protocol"
import { geometry, componentName as geometryComponentName } from "meta3d-component-geometry-protocol"
import { transform, componentName as transformComponentName } from "meta3d-component-transform-protocol"
import { pbrMaterial, componentName as pbrMaterialComponentName } from "meta3d-component-pbrmaterial-protocol"
// import { arcballCameraController, componentName as arcballCameraControllerComponentName } from "meta3d-component-arcballcameracontroller-protocol"
import { basicCameraView, componentName as basicCameraViewComponentName } from "meta3d-component-basiccameraview-protocol"
import { perspectiveCameraProjection, componentName as perspectiveCameraProjectionComponentName } from "meta3d-component-perspectivecameraprojection-protocol"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { clonedGameObjects } from "meta3d-engine-core-protocol/src/contribute/scene_graph/GameObjectContributeType"


export type createGameObject = (engineCoreState: engineCoreState, { createGameObject }: engineCoreService) => [engineCoreState, gameObject]

export type getAllGameObjects = (engineCoreState: engineCoreState, { getAllGameObjects }: engineCoreService) => Array<gameObject>

export type getTransform = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponent }: engineCoreService, gameObject: gameObject) => transform

export type addTransform = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }: engineCoreService, gameObject: gameObject, transform: transform) => engineCoreState

export type hasTransform = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, hasComponent }: engineCoreService, gameObject: gameObject) => boolean

export type getGeometry = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponent }: engineCoreService, gameObject: gameObject) => geometry

export type addGeometry = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }: engineCoreService, gameObject: gameObject, geometry: geometry) => engineCoreState

export type hasGeometry = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, hasComponent }: engineCoreService, gameObject: gameObject) => boolean

export type getPBRMaterial = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponent }: engineCoreService, gameObject: gameObject) => pbrMaterial

export type addPBRMaterial = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }: engineCoreService, gameObject: gameObject, pbrMaterial: pbrMaterial) => engineCoreState

export type hasPBRMaterial = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, hasComponent }: engineCoreService, gameObject: gameObject) => boolean

export type getBasicCameraView = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponent }: engineCoreService, gameObject: gameObject) => basicCameraView

export type addBasicCameraView = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }: engineCoreService, gameObject: gameObject, basicCameraView: basicCameraView) => engineCoreState


export type hasBasicCameraView = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, hasComponent }: engineCoreService, gameObject: gameObject) => boolean

export type getPerspectiveCameraProjection = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponent }: engineCoreService, gameObject: gameObject) => perspectiveCameraProjection

export type addPerspectiveCameraProjection = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }: engineCoreService, gameObject: gameObject, perspectiveCameraProjection: perspectiveCameraProjection) => engineCoreState

export type hasPerspectiveCameraProjection = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, hasComponent }: engineCoreService, gameObject: gameObject) => boolean

// export type getArcballCameraController = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponent }: engineCoreService, gameObject => gameObject) 

// export type addArcballCameraController = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }: engineCoreService, gameObject: gameObject, arcballCameraController => arcballCameraController) 

// export type hasArcballCameraController = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, hasComponent }: engineCoreService, gameObject => gameObject) 

export type cloneGameObject = (engineCoreState: engineCoreState, { cloneGameObject }: engineCoreService, count: number, cloneConfig: cloneConfig, sourceGameObject: gameObject) => [engineCoreState, clonedGameObjects]

export type getNeedDisposedGameObjects = (engineCoreState: engineCoreState, { getNeedDisposedGameObjects }: engineCoreService) => gameObject[]

export type disposeGameObjects = (engineCoreState: engineCoreState, { deferDisposeGameObject }: engineCoreService, gameObjects: gameObject[]) => engineCoreState

export type disposeGameObjectTransformComponent = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, deferDisposeComponent }: engineCoreService, gameObject: gameObject, component: transform) => engineCoreState

export type disposeGameObjectPBRMaterialComponent = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, deferDisposeComponent }: engineCoreService, gameObject: gameObject, component: pbrMaterial) => engineCoreState

export type disposeGameObjectGeometryComponent = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, deferDisposeComponent }: engineCoreService, gameObject: gameObject, component: geometry) => engineCoreState

export type disposeGameObjectBasicCameraViewComponent = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, deferDisposeComponent }: engineCoreService, gameObject: gameObject, component: basicCameraView) => engineCoreState

export type disposeGameObjectPerspectiveCameraProjectionComponent = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, deferDisposeComponent }: engineCoreService, gameObject: gameObject, component: perspectiveCameraProjection) => engineCoreState
