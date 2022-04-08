"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execFunc = void 0;
const Utils_1 = require("../Utils");
let execFunc = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc(engineCoreState);
    let { mostService, webgpuService, width, height } = (0, Utils_1.getState)(states);
    // TODO use pipe
    return mostService.flatMap(({ window, context }) => {
        return mostService.fromPromise(webgpuService.requestAdapter({ window, preferredBackend: "Vulkan" }).then((adapter) => {
            return webgpuService.requestDevice(adapter).then(device => {
                return webgpuService.getSwapChainPreferredFormat(device, context).then(swapChainFormat => {
                    let queue = webgpuService.getQueue(device);
                    let swapChain = context.configureSwapChain({
                        device: device,
                        format: swapChainFormat
                    });
                    return setStatesFunc(engineCoreState, (0, Utils_1.setState)(states, Object.assign(Object.assign({}, (0, Utils_1.getState)(states)), { window,
                        device,
                        queue,
                        swapChain,
                        swapChainFormat,
                        context })));
                });
            });
        }));
    }, mostService.callFunc(() => {
        let window = webgpuService.createWindow({
            width,
            height,
            title: "Wonder-Offline-Render-Edu",
            resizable: false
        });
        let context = webgpuService.getContext(window);
        return { window, context };
    }));
};
exports.execFunc = execFunc;
//# sourceMappingURL=InitWebGPUJob.js.map