import { execFuncType } from "meta3d-core-protocol/src/service/ServiceType"
import { getState, setState } from "../Utils"
import { states } from "meta3d-pipeline-webgl1-three-webrender-protocol/src/StateType"
import { initForEngine } from "meta3d-pipeline-webgl1-three-utils/src/InitJobUtils"
import { state as meta3dState } from "meta3d-type"
import type { WebGLRenderer } from "three"
import { service as renderService } from "meta3d-engine-web-render-protocol/src/service/ServiceType"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService, converterService, threeAPIService, canvas } = getState(states)

    return mostService.callFunc(() => {
        meta3dState = api.getExtensionService<renderService>(meta3dState, "meta3d-engine-web-render-protocol").setViewRect(meta3dState, { x: 0, y: 0, width: canvas.width, height: canvas.height })

        let data = initForEngine(meta3dState, [converterService, threeAPIService], canvas,
        )
        meta3dState = data[0] as meta3dState
        let renderer = data[1] as WebGLRenderer
        let composer = data[2] as any
        let renderPass = data[3] as any

        return setStatesFunc<states>(
            meta3dState,
            setState(states, {
                ...getState(states),
                renderer,
                composer,
                renderPass
            })
        )
    })
}