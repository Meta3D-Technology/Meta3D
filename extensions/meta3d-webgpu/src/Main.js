"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtensionLife = exports.createExtensionState = exports.getExtensionService = void 0;
let getExtensionService = (_api, _) => {
    return {
        getContext: (canvas) => {
            return canvas.getContext("webgpu");
        },
        requestAdapter: () => {
            return navigator.gpu.requestAdapter();
        },
        requestDevice: (adapter) => {
            return adapter.requestDevice();
        },
        // getQueue: (device) => {
        //     return device.getQueue()
        // },
        configure: (context, configureDescriptor) => {
            return context.configure(configureDescriptor);
        },
        // createBuffer: (device, bufferDescriptor) => {
        //     return device.createBuffer(bufferDescriptor)
        // },
        createPipelineLayout: (device, pipelineLayoutConfig) => {
            return device.createPipelineLayout(pipelineLayoutConfig);
        },
        createShaderModule: (device, shaderModuleDescriptor) => {
            return device.createShaderModule(shaderModuleDescriptor);
        },
        createRenderPipeline: (device, renderPassEncoderDescriptor) => {
            return device.createRenderPipeline(renderPassEncoderDescriptor);
        },
        getCurrentTextureView: (context) => {
            return context.getCurrentTexture().createView();
        },
        createCommandEncoder: (device, commandEncoderDescriptor) => {
            return device.createCommandEncoder(commandEncoderDescriptor);
        },
        beginRenderPass: (commandEncoder, renderPassEncoderDescriptor) => {
            return commandEncoder.beginRenderPass(renderPassEncoderDescriptor);
        },
        setPipeline: (renderPassEncoder, renderPipeline) => {
            renderPassEncoder.setPipeline(renderPipeline);
        },
        // setVertexBuffer: (renderPassEncoder, slot, vertexBuffer, offset, size) => {
        //     renderPassEncoder.setVertexBuffer(slot, vertexBuffer, offset, size)
        // },
        // setIndexBuffer: (renderPassEncoder, indexBuffer) => {
        //     renderPassEncoder.setIndexBuffer(indexBuffer)
        // },
        // drawIndexed: (renderPassEncoder, indexBuffer, instanceCount, firstIndex, baseVertex, firstInstance) => {
        //     renderPassEncoder.drawIndexed(indexBuffer, instanceCount, firstIndex, baseVertex, firstInstance)
        // },
        draw: (renderPassEncoder, vertexCount, instanceCount, firstVertex, firstInstance) => {
            renderPassEncoder.draw(vertexCount, instanceCount, firstVertex, firstInstance);
        },
        end: (renderPassEncoder) => {
            renderPassEncoder.end();
        },
        finish: (commandEncoder) => {
            return commandEncoder.finish();
        },
        submit: (queue, commandBuffers) => {
            queue.submit(commandBuffers);
        },
        // getBufferUsageStorage: () => {
        //     return WebGPU.GPUBufferUsage.STORAGE
        // },
        // getBufferUsageUniform: () => {
        //     return WebGPU.GPUBufferUsage.UNIFORM
        // },
        // getBufferUsageIndirect: () => {
        //     return WebGPU.GPUBufferUsage.INDIRECT
        // },
        // getBufferUsageVertex: () => {
        //     return WebGPU.GPUBufferUsage.VERTEX
        // },
        // getBufferUsageIndex: () => {
        //     return WebGPU.GPUBufferUsage.INDEX
        // },
        // getBufferUsageCopyDst: () => {
        //     return WebGPU.GPUBufferUsage.COPY_DST
        // },
        // getBufferUsageCopySrc: () => {
        //     return WebGPU.GPUBufferUsage.COPY_SRC
        // },
    };
};
exports.getExtensionService = getExtensionService;
let createExtensionState = () => {
    return {};
};
exports.createExtensionState = createExtensionState;
let getExtensionLife = (api, extensionName) => {
    return {};
};
exports.getExtensionLife = getExtensionLife;
//# sourceMappingURL=Main.js.map