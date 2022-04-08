"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAspect = exports.setFar = exports.setNear = exports.setFovy = exports.createPerspectiveCameraProjection = void 0;
const meta3d_component_perspectivecameraprojection_protocol_1 = require("meta3d-component-perspectivecameraprojection-protocol");
function createPerspectiveCameraProjection(engineCoreState, { unsafeGetUsedComponentContribute, createComponent, setUsedComponentContribute, }) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_perspectivecameraprojection_protocol_1.componentName);
    let data = createComponent(contribute);
    contribute = data[0];
    let basicCameraView = data[1];
    engineCoreState =
        setUsedComponentContribute(engineCoreState, contribute, meta3d_component_perspectivecameraprojection_protocol_1.componentName);
    return [
        engineCoreState,
        basicCameraView
    ];
}
exports.createPerspectiveCameraProjection = createPerspectiveCameraProjection;
function setFovy(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }, perspectiveCameraProjection, fovy) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_perspectivecameraprojection_protocol_1.componentName);
    contribute = setComponentData(contribute, perspectiveCameraProjection, meta3d_component_perspectivecameraprojection_protocol_1.dataName.fovy, fovy);
    return setUsedComponentContribute(engineCoreState, contribute, meta3d_component_perspectivecameraprojection_protocol_1.componentName);
}
exports.setFovy = setFovy;
function setNear(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }, perspectiveCameraProjection, near) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_perspectivecameraprojection_protocol_1.componentName);
    contribute = setComponentData(contribute, perspectiveCameraProjection, meta3d_component_perspectivecameraprojection_protocol_1.dataName.near, near);
    return setUsedComponentContribute(engineCoreState, contribute, meta3d_component_perspectivecameraprojection_protocol_1.componentName);
}
exports.setNear = setNear;
function setFar(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }, perspectiveCameraProjection, far) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_perspectivecameraprojection_protocol_1.componentName);
    contribute = setComponentData(contribute, perspectiveCameraProjection, meta3d_component_perspectivecameraprojection_protocol_1.dataName.far, far);
    return setUsedComponentContribute(engineCoreState, contribute, meta3d_component_perspectivecameraprojection_protocol_1.componentName);
}
exports.setFar = setFar;
function setAspect(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }, perspectiveCameraProjection, aspect) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_perspectivecameraprojection_protocol_1.componentName);
    contribute = setComponentData(contribute, perspectiveCameraProjection, meta3d_component_perspectivecameraprojection_protocol_1.dataName.aspect, aspect);
    return setUsedComponentContribute(engineCoreState, contribute, meta3d_component_perspectivecameraprojection_protocol_1.componentName);
}
exports.setAspect = setAspect;
//# sourceMappingURL=PerspectiveCameraProjectionAPI.js.map