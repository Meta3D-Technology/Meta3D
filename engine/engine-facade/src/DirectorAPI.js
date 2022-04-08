import { registerExtension, getExtensionState, getExtensionService, setExtensionState } from "meta3d";
import { getExtensionService as getMostExtensionService, createExtensionState as createMostExtensionState } from "meta3d-bs-most";
import { getExtensionService as getEngineCoreExtensionService, createExtensionState as createEngineCoreExtensionState } from "meta3d-engine-core";
import { getExtensionService as getRegisterECSExtensionService, createExtensionState as createRegisterECSExtensionState } from "meta3d-register-ecs";
import { getExtensionService as getRegisterDefaultWorkPluginsECSExtensionService, createExtensionState as createRegisterDefaultWorkPluginsECSExtensionState } from "meta3d-register-default-work-plugins";
function _getMeta3DBsMostExtensionName() {
    return "meta3d-bs-most";
}
function _getMeta3DRegisterDefaultWorkPluginsExtensionName() {
    return "meta3d-register-default-work-plugins";
}
function _getMeta3DRegisterECSExtensionName() {
    return "meta3d-register-ecs";
}
// function _getMeta3DRegisterECSWorkerExtensionName(): string {
//     return "meta3d-register-ecs-worker"
// }
export function prepareRegisterECSExtension(meta3dState, engineCoreExtensionName, config) {
    meta3dState =
        registerExtension(meta3dState, _getMeta3DRegisterECSExtensionName(), getRegisterECSExtensionService, {
            meta3dEngineCoreExtensionName: engineCoreExtensionName,
        }, createRegisterECSExtensionState());
    let registerECSService = getExtensionService(meta3dState, _getMeta3DRegisterECSExtensionName());
    let engineCoreState = getExtensionState(meta3dState, engineCoreExtensionName);
    engineCoreState = registerECSService.register(engineCoreState, meta3dState, config);
    meta3dState =
        setExtensionState(meta3dState, engineCoreExtensionName, engineCoreState);
    return meta3dState;
}
export function prepare(meta3dState, engineCoreExtensionName, isDebug) {
    // TODO use pipe
    meta3dState =
        registerExtension(meta3dState, _getMeta3DBsMostExtensionName(), getMostExtensionService, null, createMostExtensionState());
    meta3dState =
        registerExtension(meta3dState, engineCoreExtensionName, getEngineCoreExtensionService, {
            meta3dBsMostExtensionName: _getMeta3DBsMostExtensionName(),
        }, createEngineCoreExtensionState());
    meta3dState =
        registerExtension(meta3dState, _getMeta3DRegisterDefaultWorkPluginsExtensionName(), getRegisterDefaultWorkPluginsECSExtensionService, {
            meta3dEngineCoreExtensionName: engineCoreExtensionName,
            meta3dBsMostExtensionName: _getMeta3DBsMostExtensionName(),
        }, createRegisterDefaultWorkPluginsECSExtensionState());
    let engineCoreState = getExtensionState(meta3dState, engineCoreExtensionName);
    let { setIsDebug } = getExtensionService(meta3dState, engineCoreExtensionName);
    engineCoreState = setIsDebug(engineCoreState, isDebug);
    let registerDefaultWorkPluginsService = getExtensionService(meta3dState, _getMeta3DRegisterDefaultWorkPluginsExtensionName());
    engineCoreState = registerDefaultWorkPluginsService.register(engineCoreState, meta3dState);
    meta3dState =
        setExtensionState(meta3dState, engineCoreExtensionName, engineCoreState);
    return meta3dState;
}
function _runPipeline(meta3dState, engineCoreState, engineCoreExtensionName, pipelineName) {
    //  TODO use NullableUtils for type
    let tempMeta3DState = null;
    let { map } = getExtensionService(meta3dState, _getMeta3DBsMostExtensionName());
    let { runPipeline } = getExtensionService(meta3dState, engineCoreExtensionName);
    return map((engineCoreState) => {
        tempMeta3DState = setExtensionState(meta3dState, engineCoreExtensionName, engineCoreState);
        return null;
    }, runPipeline(engineCoreState, meta3dState, pipelineName)).drain().then((_) => {
        //  TODO use NullableUtils for type
        return tempMeta3DState;
    });
}
export function init(meta3dState, engineCoreExtensionName) {
    let engineCoreState = getExtensionState(meta3dState, engineCoreExtensionName);
    let { init } = getExtensionService(meta3dState, engineCoreExtensionName);
    engineCoreState = init(engineCoreState);
    return _runPipeline(meta3dState, engineCoreState, engineCoreExtensionName, "init");
}
export function update(meta3dState, engineCoreExtensionName) {
    return _runPipeline(meta3dState, getExtensionState(meta3dState, engineCoreExtensionName), engineCoreExtensionName, "update");
}
export function render(meta3dState, engineCoreExtensionName) {
    return _runPipeline(meta3dState, getExtensionState(meta3dState, engineCoreExtensionName), engineCoreExtensionName, "render");
}
//# sourceMappingURL=DirectorAPI.js.map