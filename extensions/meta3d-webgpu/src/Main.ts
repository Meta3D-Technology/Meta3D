import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-webgpu-protocol/src/service/DependentMapType"
import { service } from "meta3d-webgpu-protocol/src/service/ServiceType"
import { state } from "meta3d-webgpu-protocol/src/state/StateType"
import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D } from "meta3d-type"

export let getExtensionService: getExtensionServiceMeta3D<dependentExtensionNameMap, dependentContributeNameMap, service> = (_api, _) => {
    return {
        getContext: (canvas) => {
            return canvas.getContext("webgpu")
        },
        requestAdapter: () => {
            return (navigator as any).gpu.requestAdapter()
        },
        requestDevice: (adapter) => {
            return adapter.requestDevice()
        },
        getPreferredCanvasFormat: () => {
            return (navigator as any).gpu.getPreferredCanvasFormat()
        },
        getQueue: (device) => {
            return device.queue
        },
        configure: (context, configureDescriptor) => {
            return context.configure(configureDescriptor)
        },
        // createBuffer: (device, bufferDescriptor) => {
        //     return device.createBuffer(bufferDescriptor)
        // },
        createPipelineLayout: (device, pipelineLayoutConfig) => {
            return device.createPipelineLayout(pipelineLayoutConfig)
        },
        createShaderModule: (device, shaderModuleDescriptor) => {
            return device.createShaderModule(shaderModuleDescriptor)
        },
        createRenderPipeline: (device, renderPassEncoderDescriptor) => {
            return device.createRenderPipeline(renderPassEncoderDescriptor)
        },
        getCurrentTextureView: (context) => {
            return context.getCurrentTexture().createView()
        },
        createCommandEncoder: (device, commandEncoderDescriptor) => {
            return device.createCommandEncoder(commandEncoderDescriptor)
        },
        beginRenderPass: (commandEncoder, renderPassEncoderDescriptor) => {
            return commandEncoder.beginRenderPass(renderPassEncoderDescriptor)
        },
        setPipeline: (renderPassEncoder, renderPipeline) => {
            renderPassEncoder.setPipeline(renderPipeline)
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
            renderPassEncoder.draw(vertexCount, instanceCount, firstVertex, firstInstance)
        },
        end: (renderPassEncoder) => {
            renderPassEncoder.end()
        },
        finish: (commandEncoder) => {
            return commandEncoder.finish()
        },
        submit: (queue, commandBuffers) => {
            queue.submit(commandBuffers)
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
    }
}

export let createExtensionState: createExtensionStateMeta3D<state> = () => {
    return {}
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionName) => {
    return {
    }
}