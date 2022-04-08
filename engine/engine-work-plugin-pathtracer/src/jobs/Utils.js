import { workPluginName } from "engine-work-plugin-pathtracer-protocol";
export function getState(states) {
    return states[workPluginName];
}
export function setState(states, state) {
    return Object.assign({}, states, {
        [workPluginName]: state
    });
}
//# sourceMappingURL=Utils.js.map