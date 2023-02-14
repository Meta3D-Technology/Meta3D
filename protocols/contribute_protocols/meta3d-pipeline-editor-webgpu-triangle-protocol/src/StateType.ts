import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { service as webgpuService, device, renderPipeline, context } from "meta3d-webgpu-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export const pipelineName = "WebGPU_Triangle"

export type state = {
    mostService: mostService,
    uiService: uiService,
    webgpuService: webgpuService,
    device: nullable<device>,
    context: nullable<context>,
    renderPipeline: nullable<renderPipeline>,
}

export type states = {
    [pipelineName]: state
}
