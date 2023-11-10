import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { getState } from "../Utils";
import { states } from "meta3d-pipeline-webgl1-three-sceneviewrender-protocol/src/StateType";
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