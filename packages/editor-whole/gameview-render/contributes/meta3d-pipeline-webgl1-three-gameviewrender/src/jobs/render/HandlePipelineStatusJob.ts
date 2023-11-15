import { execFuncType } from "meta3d-core-protocol/src/service/ServiceType"
import { getState } from "../Utils";
import { states } from "meta3d-pipeline-webgl1-three-gameviewrender-protocol/src/StateType"
import { service as renderService } from "meta3d-editor-gameview-render-protocol/src/service/ServiceType"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let {
        mostService,
        renderer
    } = getState(states)


    return mostService.callFunc(() => {
        if (api.getExtensionService<renderService>(meta3dState, "meta3d-editor-gameview-render-protocol").isPipelineStop(meta3dState)) {
            return meta3dState
        }

        if (api.getExtensionService<renderService>(meta3dState, "meta3d-editor-gameview-render-protocol").isPipelineRunOnlyOnce(meta3dState)) {
            return api.getExtensionService<renderService>(meta3dState, "meta3d-editor-gameview-render-protocol").stop(meta3dState)
        }

        return meta3dState
    })
}