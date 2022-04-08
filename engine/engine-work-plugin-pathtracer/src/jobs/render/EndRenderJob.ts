import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType"
import { getState, setState } from "../Utils"
import { states } from "engine-work-plugin-pathtracer-protocol"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(engineCoreState)
    let { mostService, webgpuService, window, swapChain } = getState(states)

    return mostService.callFunc(() => {
        webgpuService.present(getExn(swapChain))
        webgpuService.pollEvents(getExn(window))

        return engineCoreState
    })
}