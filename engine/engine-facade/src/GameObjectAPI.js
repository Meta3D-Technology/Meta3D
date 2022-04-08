import { componentName as geometryComponentName } from "meta3d-component-geometry-protocol";
import { componentName as transformComponentName } from "meta3d-component-transform-protocol";
import { componentName as pbrMaterialComponentName } from "meta3d-component-pbrmaterial-protocol";
import { componentName as arcballCameraControllerComponentName } from "meta3d-component-arcballcameracontroller-protocol";
import { componentName as basicCameraViewComponentName } from "meta3d-component-basiccameraview-protocol";
import { componentName as perspectiveCameraProjectionComponentName } from "meta3d-component-perspectivecameraprojection-protocol";
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";
export function createGameObject(engineCoreState, { createGameObject }) {
    let contribute = createGameObject(engineCoreState);
    engineCoreState = contribute[0];
    let gameObject = contribute[1];
    return [
        engineCoreState,
        gameObject
    ];
}
export function getAllGameObjects(engineCoreState, { getAllGameObjects }) {
    return getAllGameObjects(engineCoreState);
}
export function getTransform(engineCoreState, { unsafeGetUsedComponentContribute, getComponent }, gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, transformComponentName);
    return getExn(getComponent(contribute, gameObject));
}
export function addTransform(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }, gameObject, transform) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, transformComponentName);
    return setUsedComponentContribute(engineCoreState, addComponent(contribute, gameObject, transform), transformComponentName);
}
export function hasTransform(engineCoreState, { unsafeGetUsedComponentContribute, hasComponent }, gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, transformComponentName);
    return hasComponent(contribute, gameObject);
}
export function getGeometry(engineCoreState, { unsafeGetUsedComponentContribute, getComponent }, gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, geometryComponentName);
    return getExn(getComponent(contribute, gameObject));
}
export function addGeometry(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }, gameObject, geometry) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, geometryComponentName);
    return setUsedComponentContribute(engineCoreState, addComponent(contribute, gameObject, geometry), geometryComponentName);
}
export function hasGeometry(engineCoreState, { unsafeGetUsedComponentContribute, hasComponent }, gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, geometryComponentName);
    return hasComponent(contribute, gameObject);
}
export function getPBRMaterial(engineCoreState, { unsafeGetUsedComponentContribute, getComponent }, gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, pbrMaterialComponentName);
    return getExn(getComponent(contribute, gameObject));
}
export function addPBRMaterial(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }, gameObject, pbrMaterial) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, pbrMaterialComponentName);
    return setUsedComponentContribute(engineCoreState, addComponent(contribute, gameObject, pbrMaterial), pbrMaterialComponentName);
}
export function hasPBRMaterial(engineCoreState, { unsafeGetUsedComponentContribute, hasComponent }, gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, pbrMaterialComponentName);
    return hasComponent(contribute, gameObject);
}
export function getBasicCameraView(engineCoreState, { unsafeGetUsedComponentContribute, getComponent }, gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, basicCameraViewComponentName);
    return getExn(getComponent(contribute, gameObject));
}
export function addBasicCameraView(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }, gameObject, basicCameraView) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, basicCameraViewComponentName);
    return setUsedComponentContribute(engineCoreState, addComponent(contribute, gameObject, basicCameraView), basicCameraViewComponentName);
}
export function hasBasicCameraView(engineCoreState, { unsafeGetUsedComponentContribute, hasComponent }, gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, basicCameraViewComponentName);
    return hasComponent(contribute, gameObject);
}
export function getPerspectiveCameraProjection(engineCoreState, { unsafeGetUsedComponentContribute, getComponent }, gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, perspectiveCameraProjectionComponentName);
    return getExn(getComponent(contribute, gameObject));
}
export function addPerspectiveCameraProjection(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }, gameObject, perspectiveCameraProjection) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, perspectiveCameraProjectionComponentName);
    return setUsedComponentContribute(engineCoreState, addComponent(contribute, gameObject, perspectiveCameraProjection), perspectiveCameraProjectionComponentName);
}
export function hasPerspectiveCameraProjection(engineCoreState, { unsafeGetUsedComponentContribute, hasComponent }, gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, perspectiveCameraProjectionComponentName);
    return hasComponent(contribute, gameObject);
}
export function getArcballCameraController(engineCoreState, { unsafeGetUsedComponentContribute, getComponent }, gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, arcballCameraControllerComponentName);
    return getComponent(contribute, gameObject);
}
export function addArcballCameraController(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }, gameObject, arcballCameraController) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, arcballCameraControllerComponentName);
    return setUsedComponentContribute(engineCoreState, addComponent(contribute, gameObject, arcballCameraController), arcballCameraControllerComponentName);
}
export function hasArcballCameraController(engineCoreState, { unsafeGetUsedComponentContribute, hasComponent }, gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, arcballCameraControllerComponentName);
    return hasComponent(contribute, gameObject);
}
export function cloneGameObject(engineCoreState, { cloneGameObject }, count, cloneConfig, sourceGameObject) {
    return cloneGameObject(engineCoreState, count, cloneConfig, sourceGameObject);
}
export function getNeedDisposedGameObjects(engineCoreState, { getNeedDisposedGameObjects }) {
    return getNeedDisposedGameObjects(engineCoreState);
}
export function disposeGameObjects(engineCoreState, { deferDisposeGameObject }, gameObjects) {
    return gameObjects.reduce(deferDisposeGameObject, engineCoreState);
}
export function disposeGameObjectTransformComponent(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, deferDisposeComponent }, gameObject, component) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, transformComponentName);
    return setUsedComponentContribute(engineCoreState, deferDisposeComponent(contribute, [component, gameObject]), transformComponentName);
}
export function disposeGameObjectPBRMaterialComponent(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, deferDisposeComponent }, gameObject, component) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, pbrMaterialComponentName);
    return setUsedComponentContribute(engineCoreState, deferDisposeComponent(contribute, [component, gameObject]), pbrMaterialComponentName);
}
export function disposeGameObjectGeometryComponent(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, deferDisposeComponent }, gameObject, component) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, geometryComponentName);
    return setUsedComponentContribute(engineCoreState, deferDisposeComponent(contribute, [component, gameObject]), geometryComponentName);
}
export function disposeGameObjectBasicCameraViewComponent(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, deferDisposeComponent }, gameObject, component) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, basicCameraViewComponentName);
    return setUsedComponentContribute(engineCoreState, deferDisposeComponent(contribute, [component, gameObject]), basicCameraViewComponentName);
}
export function disposeGameObjectPerspectiveCameraProjectionComponent(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, deferDisposeComponent }, gameObject, component) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, perspectiveCameraProjectionComponentName);
    return setUsedComponentContribute(engineCoreState, deferDisposeComponent(contribute, [component, gameObject]), perspectiveCameraProjectionComponentName);
}
export function disposeGameObjectArcballCameraControllerComponent(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, deferDisposeComponent }, gameObject, component) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, arcballCameraControllerComponentName);
    return setUsedComponentContribute(engineCoreState, deferDisposeComponent(contribute, [component, gameObject]), arcballCameraControllerComponentName);
}
//# sourceMappingURL=GameObjectAPI.js.map