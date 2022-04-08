import { componentName, dataName } from "meta3d-component-geometry-protocol";
export function createGeometry(engineCoreState, { unsafeGetUsedComponentContribute, createComponent, setUsedComponentContribute, }) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName);
    let data = createComponent(contribute);
    contribute = data[0];
    let geometry = data[1];
    engineCoreState =
        setUsedComponentContribute(engineCoreState, contribute, componentName);
    return [
        engineCoreState,
        geometry
    ];
}
export function setVertices(engineCoreState, { unsafeGetUsedComponentContribute, setComponentData, setUsedComponentContribute, }, geometry, vertices) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName);
    contribute = setComponentData(contribute, geometry, dataName.vertices, vertices);
    return setUsedComponentContribute(engineCoreState, contribute, componentName);
}
export function setIndices(engineCoreState, { unsafeGetUsedComponentContribute, setComponentData, setUsedComponentContribute, }, geometry, indices) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName);
    contribute = setComponentData(contribute, geometry, dataName.indices, indices);
    return setUsedComponentContribute(engineCoreState, contribute, componentName);
}
//# sourceMappingURL=GeometryAPI.js.map