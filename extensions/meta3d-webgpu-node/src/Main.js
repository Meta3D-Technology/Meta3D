"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExtensionState = exports.getExtensionService = void 0;
const wonder_webgpu_1 = __importDefault(require("wonder-webgpu"));
let getExtensionService = (_api, _dependentExtensionNameMap) => {
    return {
        createWindow: (descriptor) => {
            return new wonder_webgpu_1.default.WebGPUWindow(descriptor);
        },
        getContext: (window) => {
            return window.getContext("webgpu");
        },
        requestAdapter: (descriptor) => {
            return wonder_webgpu_1.default.GPU.requestAdapter(descriptor);
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
            return wonder_webgpu_1.default.GPUBufferUsage.STORAGE;
        },
        getBufferUsageUniform: () => {
            return wonder_webgpu_1.default.GPUBufferUsage.UNIFORM;
        },
        getBufferUsageIndirect: () => {
            return wonder_webgpu_1.default.GPUBufferUsage.INDIRECT;
        },
        getBufferUsageVertex: () => {
            return wonder_webgpu_1.default.GPUBufferUsage.VERTEX;
        },
        getBufferUsageIndex: () => {
            return wonder_webgpu_1.default.GPUBufferUsage.INDEX;
        },
        getBufferUsageCopyDst: () => {
            return wonder_webgpu_1.default.GPUBufferUsage.COPY_DST;
        },
        getBufferUsageCopySrc: () => {
            return wonder_webgpu_1.default.GPUBufferUsage.COPY_SRC;
        },
    };
};
exports.getExtensionService = getExtensionService;
let createExtensionState = () => {
    return {};
};
exports.createExtensionState = createExtensionState;
//# sourceMappingURL=Main.js.map