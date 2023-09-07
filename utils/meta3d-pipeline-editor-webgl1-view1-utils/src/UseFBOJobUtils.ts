import { getExn, getExnFromStrictNullable } from "meta3d-commonlib-ts/src/NullableUtils";
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { state as meta3dState, api } from "meta3d-type";

export let useFBO = (meta3dState: meta3dState, api: api, [uiService, webgl1Service, getViewRectFunc]: [any, any, any], fbo: any) => {
    let uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")
    let viewRect = getViewRectFunc(uiService, uiState)

    let { x, y, width, height } = getExn(viewRect)

    let { getContext } = uiService

    let gl = getContext(meta3dState)


    webgl1Service.enable(
        webgl1Service.getScissorTest(gl),
        gl
    )
    webgl1Service.viewport(0, 0, width, height, gl)
    webgl1Service.scissor(0, 0, width, height, gl)

    webgl1Service.bindFramebuffer(webgl1Service.getFrameBufferType(gl), getExnFromStrictNullable(fbo), gl);

    return meta3dState
}