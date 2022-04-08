import { componentName, dataName } from "meta3d-component-perspectivecameraprojection-protocol";
export function createPerspectiveCameraProjection(engineCoreState, { unsafeGetUsedComponentContribute, createComponent, setUsedComponentContribute, }) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName);
    let data = createComponent(contribute);
    contribute = data[0];
    let basicCameraView = data[1];
    engineCoreState =
        setUsedComponentContribute(engineCoreState, contribute, componentName);
    return [
        engineCoreState,
        basicCameraView
    ];
}
export function setFovy(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }, perspectiveCameraProjection, fovy) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName);
    contribute = setComponentData(contribute, perspectiveCameraProjection, dataName.fovy, fovy);
    return setUsedComponentContribute(engineCoreState, contribute, componentName);
}
export function setNear(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }, perspectiveCameraProjection, near) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName);
    contribute = setComponentData(contribute, perspectiveCameraProjection, dataName.near, near);
    return setUsedComponentContribute(engineCoreState, contribute, componentName);
}
export function setFar(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }, perspectiveCameraProjection, far) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName);
    contribute = setComponentData(contribute, perspectiveCameraProjection, dataName.far, far);
    return setUsedComponentContribute(engineCoreState, contribute, componentName);
}
export function setAspect(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }, perspectiveCameraProjection, aspect) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName);
    contribute = setComponentData(contribute, perspectiveCameraProjection, dataName.aspect, aspect);
    return setUsedComponentContribute(engineCoreState, contribute, componentName);
}
//# sourceMappingURL=PerspectiveCameraProjectionAPI.js.map