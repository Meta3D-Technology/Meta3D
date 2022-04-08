import { getState, setState } from "../Utils";
export let execFunc = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc(engineCoreState);
    let { mostService, webgpuService, width, height } = getState(states);
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
                    return setStatesFunc(engineCoreState, setState(states, Object.assign(Object.assign({}, getState(states)), { window,
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
//# sourceMappingURL=InitWebGPUJob.js.map