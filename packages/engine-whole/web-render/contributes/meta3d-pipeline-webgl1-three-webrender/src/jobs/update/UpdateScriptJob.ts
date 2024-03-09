import { execFuncType } from "meta3d-core-protocol/src/service/ServiceType"
import { getState, setState } from "../Utils"
import { states } from "meta3d-pipeline-webgl1-three-webrender-protocol/src/StateType";
import { execEventHandle, getViewServiceForEngine } from "meta3d-script-utils/src/Main"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService } = getState(states)

    return mostService.fromPromise(execEventHandle(meta3dState, api, "onUpdate", getViewServiceForEngine(meta3dState, api)))
}