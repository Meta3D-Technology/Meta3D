"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.active = exports.createBasicCameraView = void 0;
const meta3d_component_basiccameraview_protocol_1 = require("meta3d-component-basiccameraview-protocol");
function createBasicCameraView(engineCoreState, { unsafeGetUsedComponentContribute, createComponent, setUsedComponentContribute, }) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_basiccameraview_protocol_1.componentName);
    let data = createComponent(contribute);
    contribute = data[0];
    let basicCameraView = data[1];
    engineCoreState =
        setUsedComponentContribute(engineCoreState, contribute, meta3d_component_basiccameraview_protocol_1.componentName);
    return [
        engineCoreState,
        basicCameraView
    ];
}
exports.createBasicCameraView = createBasicCameraView;
function active(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }, basicCameraView) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_basiccameraview_protocol_1.componentName);
    contribute = setComponentData(contribute, basicCameraView, meta3d_component_basiccameraview_protocol_1.dataName.isActive, true);
    return setUsedComponentContribute(engineCoreState, contribute, meta3d_component_basiccameraview_protocol_1.componentName);
}
exports.active = active;
//# sourceMappingURL=BasicCameraViewAPI.js.map