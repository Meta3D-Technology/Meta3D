import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/WorkPluginContributeType"
import { getState } from "../Utils"
import { states } from "meta3d-work-plugin-webgpu-triangle-protocol/src/StateType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc }) => {
    let states = getStatesFunc<states>(engineCoreState)
    let { mostService, webgpuService, device, context, renderPipeline } = getState(states)

    device = getExn(device)

    return mostService.callFunc(() => {
        let commandEncoder = webgpuService.createCommandEncoder(device, {})
        let textureView = webgpuService.getCurrentTextureView(getExn(context))

        let passEncoder = webgpuService.beginRenderPass(commandEncoder, {
            colorAttachments: [
                {
                    view: textureView,
                    clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
                    loadOp: 'clear',
                    storeOp: 'store',
                },
            ],
        })
        webgpuService.setPipeline(passEncoder, getExn(renderPipeline))
        webgpuService.draw(passEncoder, 3, 1, 0, 0)
        webgpuService.end(passEncoder)

        webgpuService.submit(device, [webgpuService.finish(commandEncoder)])

        return engineCoreState
    })
}