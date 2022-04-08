import { componentName, dataName } from "meta3d-component-transform-protocol";
import { lookAt as lookAtTransform } from "meta3d-component-commonlib";
export function createTransform(engineCoreState, { unsafeGetUsedComponentContribute, createComponent, setUsedComponentContribute, }) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName);
    let data = createComponent(contribute);
    contribute = data[0];
    let transform = data[1];
    engineCoreState =
        setUsedComponentContribute(engineCoreState, contribute, componentName);
    return [
        engineCoreState,
        transform
    ];
}
export function setLocalPosition(engineCoreState, { unsafeGetUsedComponentContribute, setComponentData, setUsedComponentContribute }, transform, localPosition) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName);
    contribute = setComponentData(contribute, transform, dataName.localPosition, localPosition);
    return setUsedComponentContribute(engineCoreState, contribute, componentName);
}
export function lookAt(engineCoreState, engineCoreService, transform, target) {
    let contribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, componentName);
    contribute = lookAtTransform(contribute, engineCoreService, transform, target);
    return engineCoreService.setUsedComponentContribute(engineCoreState, contribute, componentName);
}
//# sourceMappingURL=TransformAPI.js.map