"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPBRMaterials = exports.setDiffuseColor = exports.createPBRMaterial = void 0;
const meta3d_component_pbrmaterial_protocol_1 = require("meta3d-component-pbrmaterial-protocol");
function createPBRMaterial(engineCoreState, { unsafeGetUsedComponentContribute, createComponent, setUsedComponentContribute, }) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_pbrmaterial_protocol_1.componentName);
    let data = createComponent(contribute);
    contribute = data[0];
    let pbrMaterial = data[1];
    engineCoreState =
        setUsedComponentContribute(engineCoreState, contribute, meta3d_component_pbrmaterial_protocol_1.componentName);
    return [
        engineCoreState,
        pbrMaterial
    ];
}
exports.createPBRMaterial = createPBRMaterial;
function setDiffuseColor(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }, pbrMaterial, diffuseColor) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_pbrmaterial_protocol_1.componentName);
    contribute = setComponentData(contribute, pbrMaterial, meta3d_component_pbrmaterial_protocol_1.dataName.diffuseColor, diffuseColor);
    return setUsedComponentContribute(engineCoreState, contribute, meta3d_component_pbrmaterial_protocol_1.componentName);
}
exports.setDiffuseColor = setDiffuseColor;
function getAllPBRMaterials(engineCoreState, { unsafeGetUsedComponentContribute, getAllComponents }) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, meta3d_component_pbrmaterial_protocol_1.componentName);
    return getAllComponents(contribute);
}
exports.getAllPBRMaterials = getAllPBRMaterials;
//# sourceMappingURL=PBRMaterialAPI.js.map