import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { getState } from "../Utils"
import { states } from "meta3d-pipeline-dispose-protocol/src/StateType"
import { dispose } from "../DisposeJobUtils"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService } = getState(states)

    return mostService.callFunc(() => {
        console.log("dispose job")

        return dispose(api, meta3dState)
    })
}