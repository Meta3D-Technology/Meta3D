import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgpuService, device, renderPipeline, context } from "meta3d-webgpu-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const workPluginName = "WebGPU_Triangle"

export type state = {
    mostService: mostService,
    webgpuService: webgpuService,
    device: nullable<device>,
    context: nullable<context>,
    renderPipeline: nullable<renderPipeline>,
}

export type states = {
    [workPluginName]: state
}
