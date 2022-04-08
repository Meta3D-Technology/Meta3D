"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = exports.update = exports.init = exports.prepare = exports.prepareRegisterECSExtension = void 0;
const meta3d_1 = require("meta3d");
const meta3d_bs_most_1 = require("meta3d-bs-most");
const meta3d_engine_core_1 = require("meta3d-engine-core");
const meta3d_register_ecs_1 = require("meta3d-register-ecs");
const meta3d_register_default_work_plugins_1 = require("meta3d-register-default-work-plugins");
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
function prepareRegisterECSExtension(meta3dState, engineCoreExtensionName, config) {
    meta3dState =
        (0, meta3d_1.registerExtension)(meta3dState, _getMeta3DRegisterECSExtensionName(), meta3d_register_ecs_1.getExtensionService, {
            meta3dEngineCoreExtensionName: engineCoreExtensionName,
        }, (0, meta3d_register_ecs_1.createExtensionState)());
    let registerECSService = (0, meta3d_1.getExtensionService)(meta3dState, _getMeta3DRegisterECSExtensionName());
    let engineCoreState = (0, meta3d_1.getExtensionState)(meta3dState, engineCoreExtensionName);
    engineCoreState = registerECSService.register(engineCoreState, meta3dState, config);
    meta3dState =
        (0, meta3d_1.setExtensionState)(meta3dState, engineCoreExtensionName, engineCoreState);
    return meta3dState;
}
exports.prepareRegisterECSExtension = prepareRegisterECSExtension;
function prepare(meta3dState, engineCoreExtensionName, isDebug) {
    // TODO use pipe
    meta3dState =
        (0, meta3d_1.registerExtension)(meta3dState, _getMeta3DBsMostExtensionName(), meta3d_bs_most_1.getExtensionService, null, (0, meta3d_bs_most_1.createExtensionState)());
    meta3dState =
        (0, meta3d_1.registerExtension)(meta3dState, engineCoreExtensionName, meta3d_engine_core_1.getExtensionService, {
            meta3dBsMostExtensionName: _getMeta3DBsMostExtensionName(),
        }, (0, meta3d_engine_core_1.createExtensionState)());
    meta3dState =
        (0, meta3d_1.registerExtension)(meta3dState, _getMeta3DRegisterDefaultWorkPluginsExtensionName(), meta3d_register_default_work_plugins_1.getExtensionService, {
            meta3dEngineCoreExtensionName: engineCoreExtensionName,
            meta3dBsMostExtensionName: _getMeta3DBsMostExtensionName(),
        }, (0, meta3d_register_default_work_plugins_1.createExtensionState)());
    let engineCoreState = (0, meta3d_1.getExtensionState)(meta3dState, engineCoreExtensionName);
    let { setIsDebug } = (0, meta3d_1.getExtensionService)(meta3dState, engineCoreExtensionName);
    engineCoreState = setIsDebug(engineCoreState, isDebug);
    let registerDefaultWorkPluginsService = (0, meta3d_1.getExtensionService)(meta3dState, _getMeta3DRegisterDefaultWorkPluginsExtensionName());
    engineCoreState = registerDefaultWorkPluginsService.register(engineCoreState, meta3dState);
    meta3dState =
        (0, meta3d_1.setExtensionState)(meta3dState, engineCoreExtensionName, engineCoreState);
    return meta3dState;
}
exports.prepare = prepare;
function _runPipeline(meta3dState, engineCoreState, engineCoreExtensionName, pipelineName) {
    //  TODO use NullableUtils for type
    let tempMeta3DState = null;
    let { map } = (0, meta3d_1.getExtensionService)(meta3dState, _getMeta3DBsMostExtensionName());
    let { runPipeline } = (0, meta3d_1.getExtensionService)(meta3dState, engineCoreExtensionName);
    return map((engineCoreState) => {
        tempMeta3DState = (0, meta3d_1.setExtensionState)(meta3dState, engineCoreExtensionName, engineCoreState);
        return null;
    }, runPipeline(engineCoreState, meta3dState, pipelineName)).drain().then((_) => {
        //  TODO use NullableUtils for type
        return tempMeta3DState;
    });
}
function init(meta3dState, engineCoreExtensionName) {
    let engineCoreState = (0, meta3d_1.getExtensionState)(meta3dState, engineCoreExtensionName);
    let { init } = (0, meta3d_1.getExtensionService)(meta3dState, engineCoreExtensionName);
    engineCoreState = init(engineCoreState);
    return _runPipeline(meta3dState, engineCoreState, engineCoreExtensionName, "init");
}
exports.init = init;
function update(meta3dState, engineCoreExtensionName) {
    return _runPipeline(meta3dState, (0, meta3d_1.getExtensionState)(meta3dState, engineCoreExtensionName), engineCoreExtensionName, "update");
}
exports.update = update;
function render(meta3dState, engineCoreExtensionName) {
    return _runPipeline(meta3dState, (0, meta3d_1.getExtensionState)(meta3dState, engineCoreExtensionName), engineCoreExtensionName, "render");
}
exports.render = render;
//# sourceMappingURL=DirectorAPI.js.map