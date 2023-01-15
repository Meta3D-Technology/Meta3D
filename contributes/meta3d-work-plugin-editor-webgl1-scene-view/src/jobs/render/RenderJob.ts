import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/WorkPluginContributeType"
import { getState } from "../Utils";
import { states } from "meta3d-work-plugin-editor-webgl1-scene-view-protocol/src/StateType";
import { getExnFromStrictNullable } from "meta3d-commonlib-ts/src/NullableUtils";
import { state as meta3dState } from "meta3d-type"

export let execFunc: execFuncType = (meta3dState, { getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let {
        mostService,
        webgl1Service,
        uiService,
        engineWholeService,
        viewRect,
        fbo
    } = getState(states)



    console.log("render job");

    let { getContext } = uiService

    let gl = getContext(meta3dState)

    let { x, y, width, height } = viewRect

    webgl1Service.enable(
        webgl1Service.getScissorTest(gl),
        gl
    )
    webgl1Service.viewport(x, y, width, height, gl)
    webgl1Service.scissor(x, y, width, height, gl)

    webgl1Service.bindFramebuffer(webgl1Service.getFrameBufferType(gl), getExnFromStrictNullable(fbo), gl);

    return mostService.fromPromise(
        engineWholeService.render(meta3dState).then((meta3dState: meta3dState) => {
            //restore

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
    )
}