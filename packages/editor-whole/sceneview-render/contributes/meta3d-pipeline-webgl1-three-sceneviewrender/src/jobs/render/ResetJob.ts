import { execFuncType } from "meta3d-core-protocol/src/service/ServiceType"
import { getState } from "../Utils";
import { states } from "meta3d-pipeline-webgl1-three-sceneviewrender-protocol/src/StateType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let {
        mostService,
        renderer
    } = getState(states)


    return mostService.callFunc(() => {
        renderer = getExn(renderer)
        renderer.resetState()

        return meta3dState
    })
}