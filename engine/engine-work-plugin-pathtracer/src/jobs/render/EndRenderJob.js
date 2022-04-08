import { getState } from "../Utils";
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";
export let execFunc = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc(engineCoreState);
    let { mostService, webgpuService, window, swapChain } = getState(states);
    return mostService.callFunc(() => {
        webgpuService.present(getExn(swapChain));
        webgpuService.pollEvents(getExn(window));
        return engineCoreState;
    });
};
//# sourceMappingURL=EndRenderJob.js.map