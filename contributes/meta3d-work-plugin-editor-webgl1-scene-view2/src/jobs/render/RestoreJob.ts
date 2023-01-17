import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/WorkPluginContributeType"
import { getState } from "../Utils";
import { states } from "meta3d-work-plugin-editor-webgl1-scene-view2-protocol/src/StateType";

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let {
        mostService,
        webgl1Service,
        uiService
    } = getState(states)


    return mostService.callFunc(() => {
        console.log("restore job");

        let { getContext } = uiService

        let gl = getContext(meta3dState)


        webgl1Service.bindFramebuffer(webgl1Service.getFrameBufferType(gl), null, gl);

        webgl1Service.disable(
            webgl1Service.getScissorTest(gl),
            gl
        )
        /*! no need to restore viewport

        gl.viewport(...);
        */


        return meta3dState
    })
}