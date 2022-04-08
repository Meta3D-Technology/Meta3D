"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setIndices = exports.setVertices = exports.createGeometry = void 0;
const meta3d_component_geometry_protocol_1 = require("meta3d-component-geometry-protocol");
function createGeometry(engineCoreState, { unsafeGetUsedComponentContribute, createComponent, setUsedComponentContribute, }) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_geometry_protocol_1.componentName);
    let data = createComponent(contribute);
    contribute = data[0];
    let geometry = data[1];
    engineCoreState =
        setUsedComponentContribute(engineCoreState, contribute, meta3d_component_geometry_protocol_1.componentName);
    return [
        engineCoreState,
        geometry
    ];
}
exports.createGeometry = createGeometry;
function setVertices(engineCoreState, { unsafeGetUsedComponentContribute, setComponentData, setUsedComponentContribute, }, geometry, vertices) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_geometry_protocol_1.componentName);
    contribute = setComponentData(contribute, geometry, meta3d_component_geometry_protocol_1.dataName.vertices, vertices);
    return setUsedComponentContribute(engineCoreState, contribute, meta3d_component_geometry_protocol_1.componentName);
}
exports.setVertices = setVertices;
function setIndices(engineCoreState, { unsafeGetUsedComponentContribute, setComponentData, setUsedComponentContribute, }, geometry, indices) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_geometry_protocol_1.componentName);
    contribute = setComponentData(contribute, geometry, meta3d_component_geometry_protocol_1.dataName.indices, indices);
    return setUsedComponentContribute(engineCoreState, contribute, meta3d_component_geometry_protocol_1.componentName);
}
exports.setIndices = setIndices;
//# sourceMappingURL=GeometryAPI.js.map