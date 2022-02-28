import { getContext, service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { dependentExtensionNameMap } from "meta3d-webgl1-protocol/src/service/DependentExtensionType"
import { state } from "meta3d-webgl1-protocol/src/state/StateType"
import { createExtensionState as createExtensionStateMeta3d, getExtensionService as getExtensionServiceMeta3d } from "meta3d-type/src/Index"

// import { getExn } from "sxengine-commonlib-ts/src/NullableUtils";

// import * as IWebGL1 from "sxengine-commonlib-ts/src/dependency/webgl_1/interface/IWebGL1";

let getContext: getContext = (canvas) => {
    return canvas.getContext("webgl")
}

// let createBuffer: IWebGL1.createBuffer = (gl) => {
// 	return getExn(gl.createBuffer());
// }

// let getArrayBufferType: IWebGL1.getArrayBufferType = (gl) => gl.ARRAY_BUFFER;

// let getElementArrayBufferType: IWebGL1.getElementArrayBufferType = (gl) => gl.ELEMENT_ARRAY_BUFFER;

// let getStaticDraw: IWebGL1.getStaticDraw = (gl) => gl.STATIC_DRAW;

// let getVertexShaderType: IWebGL1.getVertexShaderType = (gl) => gl.VERTEX_SHADER;

// let getFragmentShaderType: IWebGL1.getFragmentShaderType = (gl) => gl.FRAGMENT_SHADER;

// let getDrawTrianglesType: IWebGL1.getDrawTrianglesType = (gl) => gl.TRIANGLES;

// let getBufferUnsignedByteType: IWebGL1.getBufferUnsignedByteType = (gl) => {
// 	return gl.UNSIGNED_BYTE;
// }

// let getBufferFloatType: IWebGL1.getBufferUnsignedByteType = (gl) => {
// 	return gl.FLOAT;
// }

// let getBufferUnsignedIntType: IWebGL1.getBufferUnsignedIntType = (gl) => {
// 	return gl.UNSIGNED_INT;
// }

// let bindBuffer: IWebGL1.bindBuffer = (gl, arrayBufferType, buffer) => {
// 	gl.bindBuffer(arrayBufferType, buffer);
// }

// let bufferFloat32ArrayData: IWebGL1.bufferFloat32ArrayData = (gl, arrayBufferType, arrayBufferUpdateType, bufferData) => {
// 	gl.bufferData(arrayBufferType, bufferData, arrayBufferUpdateType);
// }

// let bufferUint32ArrayData: IWebGL1.bufferUint32ArrayData = (gl, arrayBufferType, arrayBufferUpdateType, bufferData) => {
// 	gl.bufferData(arrayBufferType, bufferData, arrayBufferUpdateType);
// }

// let vertexAttribPointer: IWebGL1.vertexAttribPointer = (gl, index, size, type, normalized, stride, offset) => {
// 	gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
// }

// let enableVertexAttribArray: IWebGL1.enableVertexAttribArray = (gl, index) => {
// 	gl.enableVertexAttribArray(index);
// }

// let createShader: IWebGL1.createShader = (gl, shaderType) => {
// 	return getExn(gl.createShader(shaderType));
// }

// let shaderSource: IWebGL1.shaderSource = (gl, shader, shaderSource) => {
// 	gl.shaderSource(shader, shaderSource);
// }

// let compileShader: IWebGL1.compileShader = (gl, shader) => {
// 	gl.compileShader(shader);
// }

// let getShaderParameter: IWebGL1.getShaderParameter = (gl, shader, parameterName) => {
// 	return gl.getShaderParameter(shader, parameterName);
// }

// let getShaderInfoLog: IWebGL1.getShaderInfoLog = (gl, shader) => {
// 	let info = gl.getShaderInfoLog(shader);
// 	if (info === null) info = "";
// 	return info;
// }

// let getShaderCompileStatus: IWebGL1.getShaderCompileStatus = (gl) => gl.COMPILE_STATUS;

// let getProgramLinkStatus: IWebGL1.getProgramLinkStatus = (gl) => gl.LINK_STATUS;

// let createProgram: IWebGL1.createProgram = (gl) => {
// 	return getExn(gl.createProgram());
// }

// let attachShader: IWebGL1.attachShader = (gl, program, shader) => {
// 	gl.attachShader(program, shader);
// }

// let linkProgram: IWebGL1.linkProgram = (gl, program) => {
// 	gl.linkProgram(program);
// }

// let getProgramParameter: IWebGL1.getProgramParameter = (gl, program, parameterName) => {
// 	return gl.getProgramParameter(program, parameterName);
// }

// let getProgramInfoLog: IWebGL1.getProgramInfoLog = (gl: WebGLRenderingContext, program) => {
// 	let info = gl.getProgramInfoLog(program);
// 	if (info === null) info = "";
// 	return info;
// }

// let uniformMatrix4fv: IWebGL1.uniformMatrix4fv = (gl, location, value) => {
// 	gl.uniformMatrix4fv(location, false, value);
// }

// let useProgram: IWebGL1.useProgram = (gl, program) => {
// 	gl.useProgram(program);
// }

// let getAttribLocation: IWebGL1.getAttribLocation = (gl, program, name) => {
// 	return gl.getAttribLocation(program, name);
// }

// let getUniformLocation: IWebGL1.getUniformLocation = (gl, program, name) => {
// 	return getExn(gl.getUniformLocation(program, name));
// }

// let getExtension: IWebGL1.getExtension = (gl, extensionName) => {
// 	gl.getExtension(extensionName);
// }

// let drawArrays: IWebGL1.drawArrays = (gl, mode, first, count) => {
// 	gl.drawArrays(mode, first, count);
// }

// let drawElements: IWebGL1.drawElements = (gl, mode, count, type, offset) => {
// 	gl.drawElements(mode, count, type, offset);
// };

// let bufferUint8ArrayData: IWebGL1.bufferUint8ArrayData = (gl, arrayBufferType, arrayBufferUpdateType, bufferData) => {
// 	gl.bufferData(arrayBufferType, bufferData, arrayBufferUpdateType);
// }

// let uniform4fv: IWebGL1.uniform4fv = (gl, location, value) => {
// 	gl.uniform4fv(location, value);
// }

// let disableVertexAttribArray: IWebGL1.enableVertexAttribArray = (gl, index) => {
// 	gl.disableVertexAttribArray(index);
// }

// let bindTexture: IWebGL1.bindTexture = (gl, mode, texture) => {
// 	gl.bindTexture(mode, texture);
// }

// let createTexture: IWebGL1.createTexture = (gl: WebGLRenderingContext) => {
// 	return gl.createTexture();
// }

// let texImage2D: IWebGL1.texImage2D = (gl, target, level, internalformat, width, height, border, format, type, pixels) => {
// 	gl.texImage2D(target, level, internalformat, width, height, border, format, type, pixels);
// };

// let texParameteri: IWebGL1.texParameteri = (gl, target, pname, param) => {
// 	gl.texParameteri(target, pname, param);
// }

// let clearColor: IWebGL1.clearColor = (gl, red, green, blue, alpha) => {
// 	gl.clearColor(red, green, blue, alpha);
// }

// let createFramebuffer: IWebGL1.createFramebuffer = (gl) => {
// 	return gl.createFramebuffer();
// }


// let bindFramebuffer: IWebGL1.bindFramebuffer = (gl, target, framebuffer) => {
// 	gl.bindFramebuffer(target, framebuffer);
// }

// let framebufferTexture2D: IWebGL1.framebufferTexture2D = (gl, target, attachment, textarget, texture, level) => {
// 	gl.framebufferTexture2D(target, attachment, textarget, texture, level);
// }

// let clear: IWebGL1.clear = (gl, mask) => {
// 	gl.clear(mask);
// }

// let uniform1i: IWebGL1.uniform1i = (gl, location, x) => {
// 	gl.uniform1i(location, x);
// }

// let uniform2fv: IWebGL1.uniform2fv = (gl, location, v) => {
// 	gl.uniform2fv(location, v);
// }

// let uniform1f: IWebGL1.uniform1f = (gl, location, x) => {
// 	gl.uniform1f(location, x);
// }

// let disable: IWebGL1.disable = (gl, cap) => {
// 	gl.disable(cap);
// }

// let enable: IWebGL1.enable = (gl, cap) => {
// 	gl.enable(cap);
// }

// let deleteFramebuffer: IWebGL1.deleteFramebuffer = (gl, framebuffer) => {
// 	gl.deleteFramebuffer(framebuffer);
// }

// let deleteTexture: IWebGL1.deleteTexture = (gl, texture) => {
// 	gl.deleteTexture(texture);
// }

// let deleteProgram: IWebGL1.deleteProgram = (gl, program) => {
// 	gl.deleteProgram(program);
// }

// let deleteShader: IWebGL1.deleteShader = (gl, shader) => {
// 	gl.deleteShader(shader);
// }

// let deleteBuffer: IWebGL1.deleteBuffer = (gl, buffer) => {
// 	gl.deleteBuffer(buffer);
// }

// let getFloatType: IWebGL1.getFloatType = (gl) => {
// 	return gl.FLOAT;
// }

// let getTexture2DType: IWebGL1.getTexture2DType = (gl) => {
// 	return gl.TEXTURE_2D;
// }

// let getRGBAType: IWebGL1.getRGBAType = (gl) => {
// 	return gl.RGBA;
// }

// let getDrawingBufferWidth: IWebGL1.getDrawingBufferWidth = (gl) => {
// 	return gl.drawingBufferWidth;
// }

// let getDrawingBufferHeight: IWebGL1.getDrawingBufferWidth = (gl) => {
// 	return gl.drawingBufferHeight;
// }

// let getTextureMinFilterType: IWebGL1.getTextureMinFilterType = (gl) => {
// 	return gl.TEXTURE_MIN_FILTER;
// }

// let getLinearType: IWebGL1.getLinearType = (gl) => {
// 	return gl.LINEAR;
// }

// let getTextureWrapSType: IWebGL1.getTextureWrapSType = (gl) => {
// 	return gl.TEXTURE_WRAP_S;
// }

// let getTextureWrapTType: IWebGL1.getTextureWrapTType = (gl) => {
// 	return gl.TEXTURE_WRAP_T;
// }

// let getClampToEdgeType: IWebGL1.getClampToEdgeType = (gl) => {
// 	return gl.CLAMP_TO_EDGE;
// }

// let getFrameBufferType: IWebGL1.getFrameBufferType = (gl) => {
// 	return gl.FRAMEBUFFER;
// }

// let getColorAttachment0: IWebGL1.getColorAttachment0 = (gl) => {
// 	return gl.COLOR_ATTACHMENT0;
// }

// let getColorBufferBit: IWebGL1.getColorBufferBit = (gl) => {
// 	return gl.COLOR_BUFFER_BIT;
// }

// let getDepthBufferBit: IWebGL1.getDepthBufferBit = (gl) => {
// 	return gl.DEPTH_BUFFER_BIT;
// }

// let getDepthTestType: IWebGL1.getDepthTestType = (gl) => {
// 	return gl.DEPTH_TEST;
// }

// let getBlendType: IWebGL1.getBlendType = (gl) => {
// 	return gl.BLEND;
// }

// let getCompileStatusType: IWebGL1.getCompileStatusType = (gl) => {
// 	return gl.COMPILE_STATUS;
// }

// let getLinkStatusType:IWebGL1.getLinkStatusType = (gl) => {
// 	return gl.LINK_STATUS;
// }

// let uniform4f: IWebGL1.uniform4f = (gl, location, x, y, z, w) => {
// 	gl.uniform4f(location,x,y,z,w);
// }

export let getExtensionService: getExtensionServiceMeta3d<dependentExtensionNameMap, service> = (_api, _dependentExtensionNameMap) => {
    return {
        getContext
        // 	bindBuffer,
        // 	createBuffer,
        // 	bufferFloat32ArrayData,
        // 	bufferUint32ArrayData,
        // 	vertexAttribPointer,
        // 	enableVertexAttribArray,
        // 	getStaticDraw,
        // 	getArrayBufferType,
        // 	getElementArrayBufferType,
        // 	getVertexShaderType,
        // 	getFragmentShaderType,
        // 	getShaderCompileStatus,
        // 	getProgramLinkStatus,
        // 	getAttribLocation,
        // 	getUniformLocation,
        // 	getDrawTrianglesType,
        // 	getBufferUnsignedByteType,
        // 	getBufferFloatType,
        // 	getBufferUnsignedIntType,
        // 	createShader,
        // 	shaderSource,
        // 	compileShader,
        // 	getShaderParameter,
        // 	getShaderInfoLog,
        // 	createProgram,
        // 	attachShader,
        // 	linkProgram,
        // 	getProgramParameter,
        // 	getProgramInfoLog,
        // 	getExtension,
        // 	uniformMatrix4fv,
        // 	useProgram,
        // 	drawArrays,
        // 	drawElements,
        // 	bufferUint8ArrayData,
        // 	uniform4fv,
        // 	disableVertexAttribArray,
        // 	bindTexture,
        // 	createTexture,
        // 	texImage2D,
        // 	texParameteri,
        // 	clearColor,
        // 	createFramebuffer,
        // 	bindFramebuffer,
        // 	framebufferTexture2D,
        // 	clear,
        // 	uniform1i,
        // 	uniform2fv,
        // 	uniform1f,
        // 	disable,
        // 	enable,
        // 	deleteFramebuffer,
        // 	deleteTexture,
        // 	deleteProgram,
        // 	deleteShader,
        // 	deleteBuffer,
        // 	getFloatType,
        // 	getTexture2DType,
        // 	getRGBAType,
        // 	getDrawingBufferWidth,
        // 	getDrawingBufferHeight,
        // 	getTextureMinFilterType,
        // 	getLinearType,
        // 	getTextureWrapSType,
        // 	getTextureWrapTType,
        // 	getClampToEdgeType,
        // 	getFrameBufferType,
        // 	getColorAttachment0,
        // 	getColorBufferBit,
        // 	getDepthBufferBit,
        // 	getDepthTestType,
        // 	getBlendType,
        // 	getCompileStatusType,
        // 	getLinkStatusType,
        // 	uniform4f,
    }
}

export let createExtensionState: createExtensionStateMeta3d<state> = () => {
    return {}
}
