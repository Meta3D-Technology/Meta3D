"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disposeGameObjectArcballCameraControllerComponent = exports.disposeGameObjectPerspectiveCameraProjectionComponent = exports.disposeGameObjectBasicCameraViewComponent = exports.disposeGameObjectGeometryComponent = exports.disposeGameObjectPBRMaterialComponent = exports.disposeGameObjectTransformComponent = exports.disposeGameObjects = exports.getNeedDisposedGameObjects = exports.cloneGameObject = exports.hasArcballCameraController = exports.addArcballCameraController = exports.getArcballCameraController = exports.hasPerspectiveCameraProjection = exports.addPerspectiveCameraProjection = exports.getPerspectiveCameraProjection = exports.hasBasicCameraView = exports.addBasicCameraView = exports.getBasicCameraView = exports.hasPBRMaterial = exports.addPBRMaterial = exports.getPBRMaterial = exports.hasGeometry = exports.addGeometry = exports.getGeometry = exports.hasTransform = exports.addTransform = exports.getTransform = exports.getAllGameObjects = exports.createGameObject = void 0;
const meta3d_component_geometry_protocol_1 = require("meta3d-component-geometry-protocol");
const meta3d_component_transform_protocol_1 = require("meta3d-component-transform-protocol");
const meta3d_component_pbrmaterial_protocol_1 = require("meta3d-component-pbrmaterial-protocol");
const meta3d_component_arcballcameracontroller_protocol_1 = require("meta3d-component-arcballcameracontroller-protocol");
const meta3d_component_basiccameraview_protocol_1 = require("meta3d-component-basiccameraview-protocol");
const meta3d_component_perspectivecameraprojection_protocol_1 = require("meta3d-component-perspectivecameraprojection-protocol");
const NullableUtils_1 = require("meta3d-commonlib-ts/src/NullableUtils");
function createGameObject(engineCoreState, { createGameObject }) {
    let contribute = createGameObject(engineCoreState);
    engineCoreState = contribute[0];
    let gameObject = contribute[1];
    return [
        engineCoreState,
        gameObject
    ];
}
exports.createGameObject = createGameObject;
function getAllGameObjects(engineCoreState, { getAllGameObjects }) {
    return getAllGameObjects(engineCoreState);
}
exports.getAllGameObjects = getAllGameObjects;
function getTransform(engineCoreState, { unsafeGetUsedComponentContribute, getComponent }, gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_transform_protocol_1.componentName);
    return (0, NullableUtils_1.getExn)(getComponent(contribute, gameObject));
}
exports.getTransform = getTransform;
function addTransform(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }, gameObject, transform) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_transform_protocol_1.componentName);
    return setUsedComponentContribute(engineCoreState, addComponent(contribute, gameObject, transform), meta3d_component_transform_protocol_1.componentName);
}
exports.addTransform = addTransform;
function hasTransform(engineCoreState, { unsafeGetUsedComponentContribute, hasComponent }, gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_transform_protocol_1.componentName);
    return hasComponent(contribute, gameObject);
}
exports.hasTransform = hasTransform;
function getGeometry(engineCoreState, { unsafeGetUsedComponentContribute, getComponent }, gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_geometry_protocol_1.componentName);
    return (0, NullableUtils_1.getExn)(getComponent(contribute, gameObject));
}
exports.getGeometry = getGeometry;
function addGeometry(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }, gameObject, geometry) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_geometry_protocol_1.componentName);
    return setUsedComponentContribute(engineCoreState, addComponent(contribute, gameObject, geometry), meta3d_component_geometry_protocol_1.componentName);
}
exports.addGeometry = addGeometry;
function hasGeometry(engineCoreState, { unsafeGetUsedComponentContribute, hasComponent }, gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_geometry_protocol_1.componentName);
    return hasComponent(contribute, gameObject);
}
exports.hasGeometry = hasGeometry;
function getPBRMaterial(engineCoreState, { unsafeGetUsedComponentContribute, getComponent }, gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_pbrmaterial_protocol_1.componentName);
    return (0, NullableUtils_1.getExn)(getComponent(contribute, gameObject));
}
exports.getPBRMaterial = getPBRMaterial;
function addPBRMaterial(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }, gameObject, pbrMaterial) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_pbrmaterial_protocol_1.componentName);
    return setUsedComponentContribute(engineCoreState, addComponent(contribute, gameObject, pbrMaterial), meta3d_component_pbrmaterial_protocol_1.componentName);
}
exports.addPBRMaterial = addPBRMaterial;
function hasPBRMaterial(engineCoreState, { unsafeGetUsedComponentContribute, hasComponent }, gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_pbrmaterial_protocol_1.componentName);
    return hasComponent(contribute, gameObject);
}
exports.hasPBRMaterial = hasPBRMaterial;
function getBasicCameraView(engineCoreState, { unsafeGetUsedComponentContribute, getComponent }, gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_basiccameraview_protocol_1.componentName);
    return (0, NullableUtils_1.getExn)(getComponent(contribute, gameObject));
}
exports.getBasicCameraView = getBasicCameraView;
function addBasicCameraView(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }, gameObject, basicCameraView) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_basiccameraview_protocol_1.componentName);
    return setUsedComponentContribute(engineCoreState, addComponent(contribute, gameObject, basicCameraView), meta3d_component_basiccameraview_protocol_1.componentName);
}
exports.addBasicCameraView = addBasicCameraView;
function hasBasicCameraView(engineCoreState, { unsafeGetUsedComponentContribute, hasComponent }, gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_basiccameraview_protocol_1.componentName);
    return hasComponent(contribute, gameObject);
}
exports.hasBasicCameraView = hasBasicCameraView;
function getPerspectiveCameraProjection(engineCoreState, { unsafeGetUsedComponentContribute, getComponent }, gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_perspectivecameraprojection_protocol_1.componentName);
    return (0, NullableUtils_1.getExn)(getComponent(contribute, gameObject));
}
exports.getPerspectiveCameraProjection = getPerspectiveCameraProjection;
function addPerspectiveCameraProjection(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }, gameObject, perspectiveCameraProjection) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_perspectivecameraprojection_protocol_1.componentName);
    return setUsedComponentContribute(engineCoreState, addComponent(contribute, gameObject, perspectiveCameraProjection), meta3d_component_perspectivecameraprojection_protocol_1.componentName);
}
exports.addPerspectiveCameraProjection = addPerspectiveCameraProjection;
function hasPerspectiveCameraProjection(engineCoreState, { unsafeGetUsedComponentContribute, hasComponent }, gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_perspectivecameraprojection_protocol_1.componentName);
    return hasComponent(contribute, gameObject);
}
exports.hasPerspectiveCameraProjection = hasPerspectiveCameraProjection;
function getArcballCameraController(engineCoreState, { unsafeGetUsedComponentContribute, getComponent }, gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_arcballcameracontroller_protocol_1.componentName);
    return getComponent(contribute, gameObject);
}
exports.getArcballCameraController = getArcballCameraController;
function addArcballCameraController(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }, gameObject, arcballCameraController) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_arcballcameracontroller_protocol_1.componentName);
    return setUsedComponentContribute(engineCoreState, addComponent(contribute, gameObject, arcballCameraController), meta3d_component_arcballcameracontroller_protocol_1.componentName);
}
exports.addArcballCameraController = addArcballCameraController;
function hasArcballCameraController(engineCoreState, { unsafeGetUsedComponentContribute, hasComponent }, gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_arcballcameracontroller_protocol_1.componentName);
    return hasComponent(contribute, gameObject);
}
exports.hasArcballCameraController = hasArcballCameraController;
function cloneGameObject(engineCoreState, { cloneGameObject }, count, cloneConfig, sourceGameObject) {
    return cloneGameObject(engineCoreState, count, cloneConfig, sourceGameObject);
}
exports.cloneGameObject = cloneGameObject;
function getNeedDisposedGameObjects(engineCoreState, { getNeedDisposedGameObjects }) {
    return getNeedDisposedGameObjects(engineCoreState);
}
exports.getNeedDisposedGameObjects = getNeedDisposedGameObjects;
function disposeGameObjects(engineCoreState, { deferDisposeGameObject }, gameObjects) {
    return gameObjects.reduce(deferDisposeGameObject, engineCoreState);
}
exports.disposeGameObjects = disposeGameObjects;
function disposeGameObjectTransformComponent(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, deferDisposeComponent }, gameObject, component) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_transform_protocol_1.componentName);
    return setUsedComponentContribute(engineCoreState, deferDisposeComponent(contribute, [component, gameObject]), meta3d_component_transform_protocol_1.componentName);
}
exports.disposeGameObjectTransformComponent = disposeGameObjectTransformComponent;
function disposeGameObjectPBRMaterialComponent(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, deferDisposeComponent }, gameObject, component) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_pbrmaterial_protocol_1.componentName);
    return setUsedComponentContribute(engineCoreState, deferDisposeComponent(contribute, [component, gameObject]), meta3d_component_pbrmaterial_protocol_1.componentName);
}
exports.disposeGameObjectPBRMaterialComponent = disposeGameObjectPBRMaterialComponent;
function disposeGameObjectGeometryComponent(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, deferDisposeComponent }, gameObject, component) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_geometry_protocol_1.componentName);
    return setUsedComponentContribute(engineCoreState, deferDisposeComponent(contribute, [component, gameObject]), meta3d_component_geometry_protocol_1.componentName);
}
exports.disposeGameObjectGeometryComponent = disposeGameObjectGeometryComponent;
function disposeGameObjectBasicCameraViewComponent(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, deferDisposeComponent }, gameObject, component) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_basiccameraview_protocol_1.componentName);
    return setUsedComponentContribute(engineCoreState, deferDisposeComponent(contribute, [component, gameObject]), meta3d_component_basiccameraview_protocol_1.componentName);
}
exports.disposeGameObjectBasicCameraViewComponent = disposeGameObjectBasicCameraViewComponent;
function disposeGameObjectPerspectiveCameraProjectionComponent(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, deferDisposeComponent }, gameObject, component) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_perspectivecameraprojection_protocol_1.componentName);
    return setUsedComponentContribute(engineCoreState, deferDisposeComponent(contribute, [component, gameObject]), meta3d_component_perspectivecameraprojection_protocol_1.componentName);
}
exports.disposeGameObjectPerspectiveCameraProjectionComponent = disposeGameObjectPerspectiveCameraProjectionComponent;
function disposeGameObjectArcballCameraControllerComponent(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, deferDisposeComponent }, gameObject, component) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_arcballcameracontroller_protocol_1.componentName);
    return setUsedComponentContribute(engineCoreState, deferDisposeComponent(contribute, [component, gameObject]), meta3d_component_arcballcameracontroller_protocol_1.componentName);
}
exports.disposeGameObjectArcballCameraControllerComponent = disposeGameObjectArcballCameraControllerComponent;
//# sourceMappingURL=GameObjectAPI.js.map