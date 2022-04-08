import { componentName, dataName } from "meta3d-component-basiccameraview-protocol";
export function createBasicCameraView(engineCoreState, { unsafeGetUsedComponentContribute, createComponent, setUsedComponentContribute, }) {
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
export function active(engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }, basicCameraView) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName);
    contribute = setComponentData(contribute, basicCameraView, dataName.isActive, true);
    return setUsedComponentContribute(engineCoreState, contribute, componentName);
}
//# sourceMappingURL=BasicCameraViewAPI.js.map