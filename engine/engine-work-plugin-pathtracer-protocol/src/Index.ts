import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgpuService, window, device, adapter, context, queue, swapChain, textureFormat, buffer, renderPipeline } from "meta3d-webgpu-node-protocol/src/service/ServiceType"
// import { service as webgpuService } from "meta3d-webgpu-node-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { service as fsService } from "meta3d-fs-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const workPluginName = "engine-work-plugin-pathtracer"

export type state = {
    // isDebug: boolean,
    mostService: mostService,
    webgpuService: webgpuService,
    engineCoreService: engineCoreService,
    fsService: fsService,
    width: number,
    height: number,
    window: nullable<window>,
    device: nullable<device>,
    adapter: nullable<adapter>,
    context: nullable<context>,
    queue: nullable<queue>,
    swapChainFormat: nullable<textureFormat>,
    swapChain: nullable<swapChain>,
    vertexBuffer: nullable<buffer>,
    indexBuffer: nullable<buffer>,
    renderPipeline: nullable<renderPipeline>,
    indexCount: nullable<number>
}

export type states = {
    [workPluginName]: state,
}

export type config = {
    mostService: mostService,
    webgpuService: webgpuService,
    engineCoreService: engineCoreService,
    fsService: fsService,
    width: number,
    height: number
}