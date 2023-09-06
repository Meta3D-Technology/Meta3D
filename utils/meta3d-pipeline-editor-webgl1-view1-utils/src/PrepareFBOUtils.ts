import { service as webgl1Service, webgl1Context, fbo, texture } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { getExn, getExnFromStrictNullable, isStrictNullable } from "meta3d-commonlib-ts/src/NullableUtils"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { api } from "meta3d-type"

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

	// create a depth renderbuffer
	let depthBuffer = webgl1Service.createRenderbuffer(gl)
	webgl1Service.bindRenderbuffer(webgl1Service.getRenderBufferType(gl), depthBuffer, gl);

	// make a depth buffer and the same size as the targetTexture
	webgl1Service.renderbufferStorage(webgl1Service.getRenderBufferType(gl), webgl1Service.getDepthComponent16(gl), viewSize[0], viewSize[1], gl);
	webgl1Service.framebufferRenderbuffer(webgl1Service.getFrameBufferType(gl), webgl1Service.getDepthAttachment(gl), webgl1Service.getRenderBufferType(gl), depthBuffer, gl);

	webgl1Service.bindFramebuffer(webgl1Service.getFrameBufferType(gl), null, gl);
	webgl1Service.bindTexture(webgl1Service.getTexture2DType(gl), null, gl);

	return [fbo, texture]
}

export let setFBOTexture = (meta3dState, api: api, [uiService, webgl1Service, getViewRectFunc], textureID) => {
	let uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")

	let viewRect = getExn(getViewRectFunc(uiService, uiState))

	let [fbo, texture] = _createAndInitFBOData(webgl1Service, uiService.getContext(meta3dState), [viewRect.width, viewRect.height])

	uiState = uiService.setFBOTexture(uiState, textureID, texture)

	meta3dState = api.setExtensionState<uiState>(meta3dState, "meta3d-ui-protocol", uiState)

	return [meta3dState, fbo]
}