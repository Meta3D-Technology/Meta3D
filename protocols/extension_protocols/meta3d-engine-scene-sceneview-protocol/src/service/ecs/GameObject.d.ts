import { state as meta3dState } from "meta3d-type"
import { gameObject, cloneConfig } from "meta3d-gameobject-protocol"
import { directionLight, componentName as directionLightComponentName } from "meta3d-component-directionlight-protocol"
import { geometry, componentName as geometryComponentName } from "meta3d-component-geometry-protocol"
import { transform, componentName as transformComponentName } from "meta3d-component-transform-protocol"
import { pbrMaterial, componentName as pbrMaterialComponentName } from "meta3d-component-pbrmaterial-protocol"
// import { arcballCameraController, componentName as arcballCameraControllerComponentName } from "meta3d-component-arcballcameracontroller-protocol"
import { basicCameraView, componentName as basicCameraViewComponentName } from "meta3d-component-basiccameraview-protocol"
import { perspectiveCameraProjection, componentName as perspectiveCameraProjectionComponentName } from "meta3d-component-perspectivecameraprojection-protocol"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { clonedGameObjects } from "meta3d-engine-core-sceneview-protocol/src/contribute/scene_graph/GameObjectContributeType"
import { arcballCameraController } from "meta3d-component-arcballcameracontroller-protocol/src/Index"


export type createGameObject = (meta3dState: meta3dState) => [meta3dState, gameObject]

export type getAllGameObjects = (meta3dState: meta3dState) => Array<gameObject>

export type getTransform = (meta3dState: meta3dState, gameObject: gameObject) => transform

export type addTransform = (meta3dState: meta3dState, gameObject: gameObject, transform: transform) => meta3dState

export type hasTransform = (meta3dState: meta3dState, gameObject: gameObject) => boolean

export type getDirectionLight = (meta3dState: meta3dState, gameObject: gameObject) => directionLight

export type addDirectionLight = (meta3dState: meta3dState, gameObject: gameObject, directionLight: directionLight) => meta3dState

export type hasDirectionLight = (meta3dState: meta3dState, gameObject: gameObject) => boolean

export type getGeometry = (meta3dState: meta3dState, gameObject: gameObject) => geometry

export type addGeometry = (meta3dState: meta3dState, gameObject: gameObject, geometry: geometry) => meta3dState

export type hasGeometry = (meta3dState: meta3dState, gameObject: gameObject) => boolean

export type getPBRMaterial = (meta3dState: meta3dState, gameObject: gameObject) => pbrMaterial

export type addPBRMaterial = (meta3dState: meta3dState, gameObject: gameObject, pbrMaterial: pbrMaterial) => meta3dState

export type hasPBRMaterial = (meta3dState: meta3dState, gameObject: gameObject) => boolean

export type getBasicCameraView = (meta3dState: meta3dState, gameObject: gameObject) => basicCameraView

export type addBasicCameraView = (meta3dState: meta3dState, gameObject: gameObject, basicCameraView: basicCameraView) => meta3dState

export type hasBasicCameraView = (meta3dState: meta3dState, gameObject: gameObject) => boolean

export type getPerspectiveCameraProjection = (meta3dState: meta3dState, gameObject: gameObject) => perspectiveCameraProjection

export type addPerspectiveCameraProjection = (meta3dState: meta3dState, gameObject: gameObject, perspectiveCameraProjection: perspectiveCameraProjection) => meta3dState

export type hasPerspectiveCameraProjection = (meta3dState: meta3dState, gameObject: gameObject) => boolean

export type getArcballCameraController = (meta3dState: meta3dState, gameObject: gameObject) => arcballCameraController

export type addArcballCameraController = (meta3dState: meta3dState, gameObject: gameObject, arcballCameraController: arcballCameraController) => meta3dState

export type hasArcballCameraController = (meta3dState: meta3dState, gameObject: gameObject) => boolean


// export type getArcballCameraController = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponent }: engineCoreService, gameObject => gameObject) 

// export type addArcballCameraController = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }: engineCoreService, gameObject: gameObject, arcballCameraController => arcballCameraController) 

// export type hasArcballCameraController = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, hasComponent }: engineCoreService, gameObject => gameObject) 

export type cloneGameObject = (meta3dState: meta3dState, count: number, cloneConfig: cloneConfig, sourceGameObject: gameObject) => [meta3dState, clonedGameObjects]

export type getNeedDisposedGameObjects = (meta3dState: meta3dState) => gameObject[]

export type disposeGameObjects = (meta3dState: meta3dState, gameObjects: gameObject[]) => meta3dState

export type disposeGameObjectTransformComponent = (meta3dState: meta3dState, gameObject: gameObject, component: transform) => meta3dState

export type disposeGameObjectDirectionLightComponent = (meta3dState: meta3dState, gameObject: gameObject, component: directionLight) => meta3dState

export type disposeGameObjectPBRMaterialComponent = (meta3dState: meta3dState, gameObject: gameObject, component: pbrMaterial) => meta3dState

export type disposeGameObjectGeometryComponent = (meta3dState: meta3dState, gameObject: gameObject, component: geometry) => meta3dState

export type disposeGameObjectBasicCameraViewComponent = (meta3dState: meta3dState, gameObject: gameObject, component: basicCameraView) => meta3dState

export type disposeGameObjectPerspectiveCameraProjectionComponent = (meta3dState: meta3dState, gameObject: gameObject, component: perspectiveCameraProjection) => meta3dState

export type disposeGameObjectArcballCameraControllerComponent = (meta3dState: meta3dState, gameObject: gameObject, component: arcballCameraController) => meta3dState
