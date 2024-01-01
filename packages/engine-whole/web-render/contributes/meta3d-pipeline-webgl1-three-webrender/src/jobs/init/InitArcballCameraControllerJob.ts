import { execFuncType } from "meta3d-core-protocol/src/service/ServiceType"
import { getState } from "../Utils";
import { states } from "meta3d-pipeline-webgl1-three-webrender-protocol/src/StateType";
import { init } from "../ArcballCameraControllerEventUtils";

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let {
        mostService,
    } = getState(states)

    return mostService.callFunc(() => {
        //console.log("InitArcballCameraController job");

        init()

        return meta3dState
    })
}