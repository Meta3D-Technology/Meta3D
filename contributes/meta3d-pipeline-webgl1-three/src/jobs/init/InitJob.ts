import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { getState, setState } from "../Utils"
import { states } from "meta3d-pipeline-webgl1-three-protocol/src/StateType"
import { init } from "meta3d-pipeline-webgl1-three-utils/src/InitJobUtils"
import { state as meta3dState } from "meta3d-type"
import type { WebGLRenderer } from "three"
import { service as converterService } from "meta3d-scenegraph-converter-three-protocol/src/service/ServiceType"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService, converterService, threeAPIService, uiService, canvas } = getState(states)

    return mostService.callFunc(() => {
        console.log("init job")

        let data = init<converterService>(meta3dState, [converterService, threeAPIService, uiService], canvas)
        meta3dState = data[0] as meta3dState
        let renderer = data[1] as WebGLRenderer

        return setStatesFunc<states>(
            meta3dState,
            setState(states, {
                ...getState(states),
                renderer
            })
        )
    })
}