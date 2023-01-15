import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/WorkPluginContributeType"
import { getState } from "../Utils";
import { states } from "meta3d-work-plugin-editor-webgl1-scene-view-protocol/src/StateType";

export let execFunc: execFuncType = (meta3dState, { getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService, engineWholeService
    } = getState(states)


    let { update } = engineWholeService

    return mostService.fromPromise(update(meta3dState))
}