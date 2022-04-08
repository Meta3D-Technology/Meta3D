"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execFunc = void 0;
const Utils_1 = require("../Utils");
const NullableUtils_1 = require("meta3d-commonlib-ts/src/NullableUtils");
let execFunc = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc(engineCoreState);
    let { mostService, webgpuService, window, swapChain } = (0, Utils_1.getState)(states);
    return mostService.callFunc(() => {
        webgpuService.present((0, NullableUtils_1.getExn)(swapChain));
        webgpuService.pollEvents((0, NullableUtils_1.getExn)(window));
        return engineCoreState;
    });
};
exports.execFunc = execFunc;
//# sourceMappingURL=EndRenderJob.js.map