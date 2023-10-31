import { execFunc as execFuncType } from "meta3d-engine-core-gameview-protocol/src/contribute/work/PipelineContributeType"
import { getState } from "../Utils";
import { states } from "meta3d-pipeline-editor-webgl1-game-view2-protocol/src/StateType";
import { restore } from "meta3d-pipeline-editor-webgl1-view2-utils/src/RestoreJobUtils"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let {
        mostService,
        webgl1Service,
        uiService
    } = getState(states)


    return mostService.callFunc(() => {
        //console.log("restore job");

        return restore(meta3dState, [uiService, webgl1Service])
    })
}