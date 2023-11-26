import { execFuncType } from "meta3d-core-protocol/src/service/ServiceType"
import { getState, setState } from "../Utils"
import { states } from "meta3d-pipeline-webgl1-three-sceneviewrender-protocol/src/StateType"
import { init } from "meta3d-pipeline-webgl1-three-utils/src/InitJobUtils"
import { state as meta3dState } from "meta3d-type"
import type { WebGLRenderer } from "three"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService, converterService, uiService, threeAPIService, canvas } = getState(states)

    return mostService.callFunc(() => {
        // console.log("init job")

        meta3dState = converterService.init(meta3dState)

        let data = init(meta3dState, [ threeAPIService, uiService], canvas,
        )
        meta3dState = data[0] as meta3dState
        let renderer = data[1] as WebGLRenderer

        return setStatesFunc<states>(
            meta3dState,
            setState(states, {
                ...getState(states),
                renderer,
            })
        )
    })
}