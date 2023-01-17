import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/WorkPluginContributeType"
import { getState } from "../Utils";
import { states } from "meta3d-work-plugin-editor-webgl1-scene-view1-protocol/src/StateType";
import { getExn, getExnFromStrictNullable, isNullable } from "meta3d-commonlib-ts/src/NullableUtils";
// import { state as meta3dState } from "meta3d-type"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { getViewRect } from "meta3d-view-utils/src/ViewRect";

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let {
        mostService,
        webgl1Service,
        uiService,
        meta3dUIExtensionProtocolName,
        fbo
    } = getState(states)


    return mostService.callFunc(() => {
        console.log("use fbo job");


        let uiState = api.getExtensionState<uiState>(meta3dState, meta3dUIExtensionProtocolName)
        let viewRect = getViewRect(uiService, uiState)

        // if (isNullable(viewRect)) {
        //     return meta3dState
        // }

        let { x, y, width, height } = getExn(viewRect)

        let { getContext } = uiService

        let gl = getContext(meta3dState)


        webgl1Service.enable(
            webgl1Service.getScissorTest(gl),
            gl
        )
        webgl1Service.viewport(x, y, width, height, gl)
        webgl1Service.scissor(x, y, width, height, gl)

        webgl1Service.bindFramebuffer(webgl1Service.getFrameBufferType(gl), getExnFromStrictNullable(fbo), gl);

        return meta3dState
    })

    // return mostService.fromPromise(
    //     engineWholeService.render(meta3dState).then((meta3dState: meta3dState) => {
    //         //restore

    //         webgl1Service.bindFramebuffer(webgl1Service.getFrameBufferType(gl), null, gl);

    //         webgl1Service.disable(
    //             webgl1Service.getScissorTest(gl),
    //             gl
    //         )
    //         /*! no need to restore viewport

    //         gl.viewport(...);
    //         */




    //         return meta3dState
    //     })
    // )
}