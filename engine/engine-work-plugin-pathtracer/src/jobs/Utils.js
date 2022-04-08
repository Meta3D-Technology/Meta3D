"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setState = exports.getState = void 0;
const engine_work_plugin_pathtracer_protocol_1 = require("engine-work-plugin-pathtracer-protocol");
function getState(states) {
    return states[engine_work_plugin_pathtracer_protocol_1.workPluginName];
}
exports.getState = getState;
function setState(states, state) {
    return Object.assign({}, states, {
        [engine_work_plugin_pathtracer_protocol_1.workPluginName]: state
    });
}
exports.setState = setState;
//# sourceMappingURL=Utils.js.map