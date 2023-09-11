import { execFunc as execFuncType } from "meta3d-engine-core-gameview-protocol/src/contribute/work/PipelineContributeType"
import { getState } from "../Utils"
import { states } from "meta3d-pipeline-dispose-gameview-protocol/src/StateType"
import { dispose } from "meta3d-pipeline-utils/src/DisposeJobUtils"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService } = getState(states)

    return mostService.callFunc(() => {
        console.log("dispose job")

        return dispose(api, meta3dState, "meta3d-engine-core-gameview-protocol")
    })
}