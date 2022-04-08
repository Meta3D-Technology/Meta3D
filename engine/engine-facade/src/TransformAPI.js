"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lookAt = exports.setLocalPosition = exports.createTransform = void 0;
const meta3d_component_transform_protocol_1 = require("meta3d-component-transform-protocol");
const meta3d_component_commonlib_1 = require("meta3d-component-commonlib");
function createTransform(engineCoreState, { unsafeGetUsedComponentContribute, createComponent, setUsedComponentContribute, }) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_transform_protocol_1.componentName);
    let data = createComponent(contribute);
    contribute = data[0];
    let transform = data[1];
    engineCoreState =
        setUsedComponentContribute(engineCoreState, contribute, meta3d_component_transform_protocol_1.componentName);
    return [
        engineCoreState,
        transform
    ];
}
exports.createTransform = createTransform;
function setLocalPosition(engineCoreState, { unsafeGetUsedComponentContribute, setComponentData, setUsedComponentContribute }, transform, localPosition) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_transform_protocol_1.componentName);
    contribute = setComponentData(contribute, transform, meta3d_component_transform_protocol_1.dataName.localPosition, localPosition);
    return setUsedComponentContribute(engineCoreState, contribute, meta3d_component_transform_protocol_1.componentName);
}
exports.setLocalPosition = setLocalPosition;
function lookAt(engineCoreState, engineCoreService, transform, target) {
    let contribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_transform_protocol_1.componentName);
    contribute = (0, meta3d_component_commonlib_1.lookAt)(contribute, engineCoreService, transform, target);
    return engineCoreService.setUsedComponentContribute(engineCoreState, contribute, meta3d_component_transform_protocol_1.componentName);
}
exports.lookAt = lookAt;
//# sourceMappingURL=TransformAPI.js.map