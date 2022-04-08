import WebGPU from "wonder-webgpu";
export let getExtensionService = (_api, _dependentExtensionNameMap) => {
    return {
        createWindow: (descriptor) => {
            return new WebGPU.WebGPUWindow(descriptor);
        },
        getContext: (window) => {
            return window.getContext("webgpu");
        },
        requestAdapter: (descriptor) => {
            return WebGPU.GPU.requestAdapter(descriptor);
        },
        requestDevice: (adapter) => {
            return adapter.requestDevice({});
        },
        getQueue: (device) => {
            return device.getQueue();
        },
        getSwapChainPreferredFormat: (device, context) => {
            return context.getSwapChainPreferredFormat(device);
        },
        configureSwapChain: (context, swapChainConfig) => {
            return context.configureSwapChain(swapChainConfig);
        },
        createBuffer: (device, bufferDescriptor) => {
            return device.createBuffer(bufferDescriptor);
        },
        setSubData: (buffer, offset, data) => {
            buffer.setSubData(offset, data);
        },
        createPipelineLayout: (device, pipelineLayoutConfig) => {
            return device.createPipelineLayout(pipelineLayoutConfig);
        },
        createShaderModule: (device, shaderModuleDescriptor) => {
            return device.createShaderModule(shaderModuleDescriptor);
        },
        createRenderPipeline: (device, renderPassEncoderDescriptor) => {
            return device.createRenderPipeline(renderPassEncoderDescriptor);
        },
        getCurrentTextureView: (swapChain) => {
            return swapChain.getCurrentTextureView();
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
        setVertexBuffer: (renderPassEncoder, slot, vertexBuffer, offset, size) => {
            renderPassEncoder.setVertexBuffer(slot, vertexBuffer, offset, size);
        },
        setIndexBuffer: (renderPassEncoder, indexBuffer) => {
            renderPassEncoder.setIndexBuffer(indexBuffer);
        },
        drawIndexed: (renderPassEncoder, indexBuffer, instanceCount, firstIndex, baseVertex, firstInstance) => {
            renderPassEncoder.drawIndexed(indexBuffer, instanceCount, firstIndex, baseVertex, firstInstance);
        },
        endPass: (renderPassEncoder) => {
            renderPassEncoder.endPass();
        },
        present: (swapChain) => {
            swapChain.present();
        },
        pollEvents: (window) => {
            window.pollEvents();
        },
        finish: (commandEncoder) => {
            return commandEncoder.finish();
        },
        submit: (queue, commandBuffers) => {
            queue.submit(commandBuffers);
        },
        getBufferUsageStorage: () => {
            return WebGPU.GPUBufferUsage.STORAGE;
        },
        getBufferUsageUniform: () => {
            return WebGPU.GPUBufferUsage.UNIFORM;
        },
        getBufferUsageIndirect: () => {
            return WebGPU.GPUBufferUsage.INDIRECT;
        },
        getBufferUsageVertex: () => {
            return WebGPU.GPUBufferUsage.VERTEX;
        },
        getBufferUsageIndex: () => {
            return WebGPU.GPUBufferUsage.INDEX;
        },
        getBufferUsageCopyDst: () => {
            return WebGPU.GPUBufferUsage.COPY_DST;
        },
        getBufferUsageCopySrc: () => {
            return WebGPU.GPUBufferUsage.COPY_SRC;
        },
    };
};
export let createExtensionState = () => {
    return {};
};
//# sourceMappingURL=Main.js.map