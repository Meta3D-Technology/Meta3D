"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExtensionState = exports.getExtensionService = void 0;
const meta3d_work_plugin_root_1 = require("meta3d-work-plugin-root");
let getExtensionService = (api, { meta3dEngineCoreExtensionName, meta3dBsMostExtensionName }) => {
    return {
        register: (engineCoreState, meta3dState) => {
            let { registerWorkPlugin } = api.getExtensionService(meta3dState, meta3dEngineCoreExtensionName);
            let mostService = api.getExtensionService(meta3dState, meta3dBsMostExtensionName);
            engineCoreState =
                registerWorkPlugin(engineCoreState, (0, meta3d_work_plugin_root_1.getWorkPluginContribute)(mostService));
            return engineCoreState;
        }
    };
};
exports.getExtensionService = getExtensionService;
let createExtensionState = () => {
    return null;
};
exports.createExtensionState = createExtensionState;
//# sourceMappingURL=Main.js.map