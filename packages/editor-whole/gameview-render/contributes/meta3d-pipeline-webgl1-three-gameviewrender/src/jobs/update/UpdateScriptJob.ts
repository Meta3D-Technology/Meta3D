import { execFuncType } from "meta3d-core-protocol/src/service/ServiceType"
import { getState, setState } from "../Utils"
import { states } from "meta3d-pipeline-webgl1-three-gameviewrender-protocol/src/StateType";
import { service as renderService } from "meta3d-editor-gameview-render-protocol/src/service/ServiceType"
import { execEventHandle } from "meta3d-script-utils/src/Main"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService } = getState(states)

    if (
        api.getExtensionService<renderService>(meta3dState, "meta3d-editor-gameview-render-protocol").isPipelineStop(meta3dState)
        || api.getExtensionService<renderService>(meta3dState, "meta3d-editor-gameview-render-protocol").isPipelineRunOnlyOnce(meta3dState)
    ) {
        return mostService.just(meta3dState)
    }

    return mostService.fromPromise(execEventHandle(meta3dState, api, "onUpdate"))
}