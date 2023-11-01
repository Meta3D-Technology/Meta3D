import { state as meta3dState } from "meta3d-type";

export let prepareStatus = (meta3dState: meta3dState, [uiService, webgl1Service]: any) => {
    let { getContext } = uiService

    let gl = getContext(meta3dState)


    webgl1Service.enable(
        webgl1Service.getDepthTest(gl),
        gl
    )

    return meta3dState
}
