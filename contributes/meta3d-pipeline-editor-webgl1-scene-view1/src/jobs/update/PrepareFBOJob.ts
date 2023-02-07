import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { getState, getTextureID, setState } from "../Utils";
import { states } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/StateType";
import { service as webgl1Service, webgl1Context, fbo, texture } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { getExn, getExnFromStrictNullable, isStrictNullable } from "meta3d-commonlib-ts/src/NullableUtils"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { getViewRect } from "meta3d-view-utils/src/ViewRect";

let _getLevel = () => 0

let _getBorder = () => 0

let _createTexture = (webgl1Service: webgl1Service, [width, height]: [number, number], gl: webgl1Context) => {
    let texture = webgl1Service.createTexture(gl);
    webgl1Service.bindTexture(webgl1Service.getTexture2DType(gl), texture, gl);
    // webgl1Service.texImage2D(webgl1Service.getTexture2DType(gl), _getLevel(), webgl1Service.getRGBAType(gl), webgl1Service.getDrawingBufferWidth(gl), webgl1Service.getDrawingBufferHeight(gl), _getBorder(), webgl1Service.getRGBAType(gl), webgl1Service.getUnsignedByte(gl), null, gl);

    webgl1Service.texImage2D(webgl1Service.getTexture2DType(gl), _getLevel(), webgl1Service.getRGBAType(gl), width, height, _getBorder(), webgl1Service.getRGBAType(gl), webgl1Service.getUnsignedByte(gl), null, gl);


    webgl1Service.texParameteri(webgl1Service.getTexture2DType(gl), webgl1Service.getTextureMinFilterType(gl), webgl1Service.getLinearType(gl), gl);
    webgl1Service.texParameteri(webgl1Service.getTexture2DType(gl), webgl1Service.getTextureWrapSType(gl), webgl1Service.getClampToEdgeType(gl), gl);
    webgl1Service.texParameteri(webgl1Service.getTexture2DType(gl), webgl1Service.getTextureWrapTType(gl), webgl1Service.getClampToEdgeType(gl), gl);

    webgl1Service.bindTexture(webgl1Service.getTexture2DType(gl), null, gl);

    return getExnFromStrictNullable(texture);
}

let _createAndInitFBOData = (webgl1Service: webgl1Service, gl: webgl1Context, viewSize: [number, number]): [fbo, texture] => {
    let fbo = getExnFromStrictNullable(webgl1Service.createFramebuffer(gl));

    let texture = _createTexture(webgl1Service, viewSize, gl);


    webgl1Service.bindFramebuffer(webgl1Service.getFrameBufferType(gl), fbo, gl);

    webgl1Service.framebufferTexture2D(webgl1Service.getFrameBufferType(gl), webgl1Service.getColorAttachment0(gl), webgl1Service.getTexture2DType(gl), texture, _getLevel(), gl);

    webgl1Service.bindFramebuffer(webgl1Service.getFrameBufferType(gl), null, gl);
    webgl1Service.bindTexture(webgl1Service.getTexture2DType(gl), null, gl);

    return [fbo, texture]
}

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let {
        mostService,
        webgl1Service,
        uiService,
        fbo,
        meta3dUIExtensionProtocolName,
    } =
        getState(states)

    return mostService.callFunc(() => {
        console.log("prepare fbo job");

        let { getContext, setFBOTexture } = uiService

        if (!isStrictNullable(fbo)) {
            return meta3dState
        }

        let uiState = api.getExtensionState<uiState>(meta3dState, meta3dUIExtensionProtocolName)

        let viewRect = getExn(getViewRect(uiService, uiState))

        let [fbo_, texture] = _createAndInitFBOData(webgl1Service, getContext(meta3dState), [viewRect.width, viewRect.height])

        // let uiState = api.getExtensionState<uiState>(meta3dState, meta3dUIExtensionProtocolName)

        uiState = setFBOTexture(uiState, getTextureID(), texture)

        meta3dState = api.setExtensionState<uiState>(meta3dState, meta3dUIExtensionProtocolName, uiState)


        return setStatesFunc<states>(
            meta3dState,
            setState(states,
                {
                    ...getState(states),
                    fbo: fbo_
                }
            )
        )
    })
}