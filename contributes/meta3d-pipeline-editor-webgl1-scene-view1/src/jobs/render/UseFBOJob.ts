import { execFunc as execFuncType } from "meta3d-engine-core-sceneview-protocol/src/contribute/work/PipelineContributeType"
import { getState } from "../Utils";
import { states } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/StateType";
import { getViewRect } from "meta3d-view-utils/src/SceneViewRect";
import { useFBO } from "meta3d-pipeline-editor-webgl1-view1-utils/src/UseFBOJobUtils"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let {
        mostService,
        webgl1Service,
        uiService,
        fbo
    } = getState(states)


    return mostService.callFunc(() => {
        //console.log("use fbo job");

        return useFBO(meta3dState, api, [uiService, webgl1Service, getViewRect], fbo)
    })
}