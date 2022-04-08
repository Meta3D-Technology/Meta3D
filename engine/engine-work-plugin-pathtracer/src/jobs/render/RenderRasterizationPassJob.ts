import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType"
import { getState, setState } from "../Utils"
import { states } from "engine-work-plugin-pathtracer-protocol"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(engineCoreState)
    let { mostService, webgpuService, device, swapChain, queue, renderPipeline, vertexBuffer, indexBuffer, indexCount } = getState(states)

    device = getExn(device)

    return mostService.callFunc(() => {
        let backBufferView = webgpuService.getCurrentTextureView(swapChain)
        let commandEncoder = webgpuService.createCommandEncoder(device, {})
        let renderPass = webgpuService.beginRenderPass(commandEncoder, {
            colorAttachments: [{
                clearColor: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
                loadOp: "clear",
                storeOp: "store",
                attachment: backBufferView
            }]
        })
        webgpuService.setPipeline(renderPass, getExn(renderPipeline))
        webgpuService.setVertexBuffer(renderPass, 0, getExn(vertexBuffer), 0)
        webgpuService.setIndexBuffer(renderPass, getExn(indexBuffer))
        webgpuService.drawIndexed(renderPass, getExn(indexCount), 1, 0, 0, 0)
        webgpuService.endPass(renderPass)

        let commandBuffer = webgpuService.finish(commandEncoder)
        webgpuService.submit(getExn(queue), [commandBuffer])

        return engineCoreState
    })
}