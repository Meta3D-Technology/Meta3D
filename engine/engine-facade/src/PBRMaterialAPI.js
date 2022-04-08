import { componentName, dataName } from "meta3d-component-pbrmaterial-protocol";
export function createPBRMaterial(engineCoreState, { unsafeGetUsedComponentContribute, createComponent, setUsedComponentContribute, }) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName);
    let data = createComponent(contribute);
    contribute = data[0];
    let pbrMaterial = data[1];
    engineCoreState =
        setUsedComponentContribute(engineCoreState, contribute, componentName);
    return [
        engineCoreState,
        pbrMaterial
    ];
}
export function setDiffuseColor(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }, pbrMaterial, diffuseColor) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName);
    contribute = setComponentData(contribute, pbrMaterial, dataName.diffuseColor, diffuseColor);
    return setUsedComponentContribute(engineCoreState, contribute, componentName);
}
export function getAllPBRMaterials(engineCoreState, { unsafeGetUsedComponentContribute, getAllComponents }) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName);
    return getAllComponents(contribute);
}
//# sourceMappingURL=PBRMaterialAPI.js.map