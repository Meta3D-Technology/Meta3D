export let restore = (meta3dState, [uiService, webgl1Service]) => {
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


    webgl1Service.disable(
        webgl1Service.getDepthTest(gl),
        gl
    )


    return meta3dState
}