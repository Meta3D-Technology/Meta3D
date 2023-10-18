import { execFunc as execFuncType } from "meta3d-engine-core-gameview-protocol/src/contribute/work/PipelineContributeType"
import { getState } from "../Utils";
import { states } from "meta3d-pipeline-editor-webgl1-game-view1-protocol/src/StateType";
import { init } from "meta3d-pipeline-utils/src/ArcballCameraControllerEventUtils";

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let {
        mostService,
    } = getState(states)

    return mostService.callFunc(() => {
        console.log("InitArcballCameraController job");

        init()

        return meta3dState
    })
}