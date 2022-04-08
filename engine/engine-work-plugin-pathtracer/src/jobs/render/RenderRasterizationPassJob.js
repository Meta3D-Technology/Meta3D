"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execFunc = void 0;
const Utils_1 = require("../Utils");
const NullableUtils_1 = require("meta3d-commonlib-ts/src/NullableUtils");
let execFunc = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc(engineCoreState);
    let { mostService, webgpuService, device, swapChain, queue, renderPipeline, vertexBuffer, indexBuffer, indexCount } = (0, Utils_1.getState)(states);
    device = (0, NullableUtils_1.getExn)(device);
    return mostService.callFunc(() => {
        let backBufferView = webgpuService.getCurrentTextureView(swapChain);
        let commandEncoder = webgpuService.createCommandEncoder(device, {});
        let renderPass = webgpuService.beginRenderPass(commandEncoder, {
            colorAttachments: [{
                    clearColor: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
                    loadOp: "clear",
                    storeOp: "store",
                    attachment: backBufferView
                }]
        });
        webgpuService.setPipeline(renderPass, (0, NullableUtils_1.getExn)(renderPipeline));
        webgpuService.setVertexBuffer(renderPass, 0, (0, NullableUtils_1.getExn)(vertexBuffer), 0);
        webgpuService.setIndexBuffer(renderPass, (0, NullableUtils_1.getExn)(indexBuffer));
        webgpuService.drawIndexed(renderPass, (0, NullableUtils_1.getExn)(indexCount), 1, 0, 0, 0);
        webgpuService.endPass(renderPass);
        let commandBuffer = webgpuService.finish(commandEncoder);
        webgpuService.submit((0, NullableUtils_1.getExn)(queue), [commandBuffer]);
        return engineCoreState;
    });
};
exports.execFunc = execFunc;
//# sourceMappingURL=RenderRasterizationPassJob.js.map