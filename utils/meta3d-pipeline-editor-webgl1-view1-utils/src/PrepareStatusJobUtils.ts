export let prepareStatus = (meta3dState, [uiService, webgl1Service]) => {
    let { getContext } = uiService

    let gl = getContext(meta3dState)


    webgl1Service.enable(
        webgl1Service.getDepthTest(gl),
        gl
    )

    return meta3dState
}
