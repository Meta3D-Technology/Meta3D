import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { getState } from "../Utils";
import { states } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/StateType";

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let {
        mostService,
        webgl1Service,
        uiService,
    } = getState(states)

    return mostService.callFunc(() => {
        console.log("prepare status job");

        let { getContext } = uiService

        let gl = getContext(meta3dState)


        webgl1Service.enable(
            webgl1Service.getDepthTest(gl),
            gl
        )

        return meta3dState
    })
}