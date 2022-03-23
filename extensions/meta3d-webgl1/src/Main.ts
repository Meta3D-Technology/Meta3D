import {
    getContext,
    getExtension,
    bindBuffer,
    createBuffer,
    bufferFloat32ArrayData,
    bufferUint32ArrayData,
    vertexAttribPointer,
    enableVertexAttribArray,
    getStaticDraw,
    getArrayBufferType,
    getElementArrayBufferType,
    getVertexShaderType,
    getFragmentShaderType,
    getShaderCompileStatus,
    getProgramLinkStatus,
    getDrawTrianglesType,
    getBufferUnsignedByteType,
    getBufferUnsignedIntType,
    getBufferFloatType,
    createShader,
    shaderSource,
    compileShader,
    getShaderParameter,
    getShaderInfoLog,
    createProgram,
    attachShader,
    linkProgram,
    getAttribLocation,
    getUniformLocation,
    getProgramParameter,
    getProgramInfoLog,
    uniformMatrix4fv,
    useProgram,
    drawArrays,
    drawElements,
    bufferUint8ArrayData,
    uniform4fv,
    disableVertexAttribArray,
    bindTexture,
    createTexture,
    texImage2D,
    texParameteri,
    clearColor,
    createFramebuffer,
    bindFramebuffer,
    framebufferTexture2D,
    clear,
    uniform1i,
    uniform2fv,
    uniform1f,
    disable,
    enable,
    deleteFramebuffer,
    deleteTexture,
    deleteProgram,
    deleteShader,
    deleteBuffer,
    getFloatType,
    getTexture2DType,
    getRGBAType,
    getDrawingBufferWidth,
    getDrawingBufferHeight,
    getTextureMinFilterType,
    getLinearType,
    getTextureWrapSType,
    getTextureWrapTType,
    getClampToEdgeType,
    getFrameBufferType,
    getColorAttachment0,
    getColorBufferBit,
    getDepthBufferBit,
    getDepthTestType,
    getBlendType,
    getCompileStatusType,
    getLinkStatusType,
    uniform4f,
    service
} from "meta3d-webgl1-protocol/src/service/ServiceType"
import { dependentExtensionNameMap } from "meta3d-webgl1-protocol/src/service/DependentExtensionType"
import { state } from "meta3d-webgl1-protocol/src/state/StateType"
import { createExtensionState as createExtensionStateMeta3D, getExtensionService as getExtensionServiceMeta3D } from "meta3d-type/src/Index"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";

let getContext: getContext = (canvas) => {
    return canvas.getContext("webgl")
}

let createBuffer: createBuffer = (gl) => {
    return getExn(gl.createBuffer());
}

let getArrayBufferType: getArrayBufferType = (gl) => gl.ARRAY_BUFFER;

let getElementArrayBufferType: getElementArrayBufferType = (gl) => gl.ELEMENT_ARRAY_BUFFER;

let getStaticDraw: getStaticDraw = (gl) => gl.STATIC_DRAW;

let getVertexShaderType: getVertexShaderType = (gl) => gl.VERTEX_SHADER;

let getFragmentShaderType: getFragmentShaderType = (gl) => gl.FRAGMENT_SHADER;

let getDrawTrianglesType: getDrawTrianglesType = (gl) => gl.TRIANGLES;

let getBufferUnsignedByteType: getBufferUnsignedByteType = (gl) => {
    return gl.UNSIGNED_BYTE;
}

let getBufferFloatType: getBufferUnsignedByteType = (gl) => {
    return gl.FLOAT;
}

let getBufferUnsignedIntType: getBufferUnsignedIntType = (gl) => {
    return gl.UNSIGNED_INT;
}

let bindBuffer: bindBuffer = (gl, arrayBufferType, buffer) => {
    gl.bindBuffer(arrayBufferType, buffer);
}

let bufferFloat32ArrayData: bufferFloat32ArrayData = (gl, arrayBufferType, arrayBufferUpdateType, bufferData) => {
    gl.bufferData(arrayBufferType, bufferData, arrayBufferUpdateType);
}

let bufferUint32ArrayData: bufferUint32ArrayData = (gl, arrayBufferType, arrayBufferUpdateType, bufferData) => {
    gl.bufferData(arrayBufferType, bufferData, arrayBufferUpdateType);
}

let vertexAttribPointer: vertexAttribPointer = (gl, index, size, type, normalized, stride, offset) => {
    gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
}

let enableVertexAttribArray: enableVertexAttribArray = (gl, index) => {
    gl.enableVertexAttribArray(index);
}

let createShader: createShader = (gl, shaderType) => {
    return getExn(gl.createShader(shaderType));
}

let shaderSource: shaderSource = (gl, shader, shaderSource) => {
    gl.shaderSource(shader, shaderSource);
}

let compileShader: compileShader = (gl, shader) => {
    gl.compileShader(shader);
}

let getShaderParameter: getShaderParameter = (gl, shader, parameterName) => {
    return gl.getShaderParameter(shader, parameterName);
}

let getShaderInfoLog: getShaderInfoLog = (gl, shader) => {
    let info = gl.getShaderInfoLog(shader);
    if (info === null) info = "";
    return info;
}

let getShaderCompileStatus: getShaderCompileStatus = (gl) => gl.COMPILE_STATUS;

let getProgramLinkStatus: getProgramLinkStatus = (gl) => gl.LINK_STATUS;

let createProgram: createProgram = (gl) => {
    return getExn(gl.createProgram());
}

let attachShader: attachShader = (gl, program, shader) => {
    gl.attachShader(program, shader);
}

let linkProgram: linkProgram = (gl, program) => {
    gl.linkProgram(program);
}

let getProgramParameter: getProgramParameter = (gl, program, parameterName) => {
    return gl.getProgramParameter(program, parameterName);
}

let getProgramInfoLog: getProgramInfoLog = (gl: WebGLRenderingContext, program) => {
    let info = gl.getProgramInfoLog(program);
    if (info === null) info = "";
    return info;
}

let uniformMatrix4fv: uniformMatrix4fv = (gl, location, value) => {
    gl.uniformMatrix4fv(location, false, value);
}

let useProgram: useProgram = (gl, program) => {
    gl.useProgram(program);
}

let getAttribLocation: getAttribLocation = (gl, program, name) => {
    return gl.getAttribLocation(program, name);
}

let getUniformLocation: getUniformLocation = (gl, program, name) => {
    return getExn(gl.getUniformLocation(program, name));
}

let getExtension: getExtension = (gl, extensionName) => {
    gl.getExtension(extensionName);
}

let drawArrays: drawArrays = (gl, mode, first, count) => {
    gl.drawArrays(mode, first, count);
}

let drawElements: drawElements = (gl, mode, count, type, offset) => {
    gl.drawElements(mode, count, type, offset);
};

let bufferUint8ArrayData: bufferUint8ArrayData = (gl, arrayBufferType, arrayBufferUpdateType, bufferData) => {
    gl.bufferData(arrayBufferType, bufferData, arrayBufferUpdateType);
}

let uniform4fv: uniform4fv = (gl, location, value) => {
    gl.uniform4fv(location, value);
}

let disableVertexAttribArray: enableVertexAttribArray = (gl, index) => {
    gl.disableVertexAttribArray(index);
}

let bindTexture: bindTexture = (gl, mode, texture) => {
    gl.bindTexture(mode, texture);
}

let createTexture: createTexture = (gl: WebGLRenderingContext) => {
    return gl.createTexture();
}

let texImage2D: texImage2D = (gl, target, level, internalformat, width, height, border, format, type, pixels) => {
    gl.texImage2D(target, level, internalformat, width, height, border, format, type, pixels);
};

let texParameteri: texParameteri = (gl, target, pname, param) => {
    gl.texParameteri(target, pname, param);
}

let clearColor: clearColor = (gl, red, green, blue, alpha) => {
    gl.clearColor(red, green, blue, alpha);
}

let createFramebuffer: createFramebuffer = (gl) => {
    return gl.createFramebuffer();
}


let bindFramebuffer: bindFramebuffer = (gl, target, framebuffer) => {
    gl.bindFramebuffer(target, framebuffer);
}

let framebufferTexture2D: framebufferTexture2D = (gl, target, attachment, textarget, texture, level) => {
    gl.framebufferTexture2D(target, attachment, textarget, texture, level);
}

let clear: clear = (gl, mask) => {
    gl.clear(mask);
}

let uniform1i: uniform1i = (gl, location, x) => {
    gl.uniform1i(location, x);
}

let uniform2fv: uniform2fv = (gl, location, v) => {
    gl.uniform2fv(location, v);
}

let uniform1f: uniform1f = (gl, location, x) => {
    gl.uniform1f(location, x);
}

let disable: disable = (gl, cap) => {
    gl.disable(cap);
}

let enable: enable = (gl, cap) => {
    gl.enable(cap);
}

let deleteFramebuffer: deleteFramebuffer = (gl, framebuffer) => {
    gl.deleteFramebuffer(framebuffer);
}

let deleteTexture: deleteTexture = (gl, texture) => {
    gl.deleteTexture(texture);
}

let deleteProgram: deleteProgram = (gl, program) => {
    gl.deleteProgram(program);
}

let deleteShader: deleteShader = (gl, shader) => {
    gl.deleteShader(shader);
}

let deleteBuffer: deleteBuffer = (gl, buffer) => {
    gl.deleteBuffer(buffer);
}

let getFloatType: getFloatType = (gl) => {
    return gl.FLOAT;
}

let getTexture2DType: getTexture2DType = (gl) => {
    return gl.TEXTURE_2D;
}

let getRGBAType: getRGBAType = (gl) => {
    return gl.RGBA;
}

let getDrawingBufferWidth: getDrawingBufferWidth = (gl) => {
    return gl.drawingBufferWidth;
}

let getDrawingBufferHeight: getDrawingBufferWidth = (gl) => {
    return gl.drawingBufferHeight;
}

let getTextureMinFilterType: getTextureMinFilterType = (gl) => {
    return gl.TEXTURE_MIN_FILTER;
}

let getLinearType: getLinearType = (gl) => {
    return gl.LINEAR;
}

let getTextureWrapSType: getTextureWrapSType = (gl) => {
    return gl.TEXTURE_WRAP_S;
}

let getTextureWrapTType: getTextureWrapTType = (gl) => {
    return gl.TEXTURE_WRAP_T;
}

let getClampToEdgeType: getClampToEdgeType = (gl) => {
    return gl.CLAMP_TO_EDGE;
}

let getFrameBufferType: getFrameBufferType = (gl) => {
    return gl.FRAMEBUFFER;
}

let getColorAttachment0: getColorAttachment0 = (gl) => {
    return gl.COLOR_ATTACHMENT0;
}

let getColorBufferBit: getColorBufferBit = (gl) => {
    return gl.COLOR_BUFFER_BIT;
}

let getDepthBufferBit: getDepthBufferBit = (gl) => {
    return gl.DEPTH_BUFFER_BIT;
}

let getDepthTestType: getDepthTestType = (gl) => {
    return gl.DEPTH_TEST;
}

let getBlendType: getBlendType = (gl) => {
    return gl.BLEND;
}

let getCompileStatusType: getCompileStatusType = (gl) => {
    return gl.COMPILE_STATUS;
}

let getLinkStatusType: getLinkStatusType = (gl) => {
    return gl.LINK_STATUS;
}

let uniform4f: uniform4f = (gl, location, x, y, z, w) => {
    gl.uniform4f(location, x, y, z, w);
}

export let getExtensionService: getExtensionServiceMeta3D<dependentExtensionNameMap, service> = (_api, _dependentExtensionNameMap) => {
    return {
        getContext,
        bindBuffer,
        createBuffer,
        bufferFloat32ArrayData,
        bufferUint32ArrayData,
        vertexAttribPointer,
        enableVertexAttribArray,
        getStaticDraw,
        getArrayBufferType,
        getElementArrayBufferType,
        getVertexShaderType,
        getFragmentShaderType,
        getShaderCompileStatus,
        getProgramLinkStatus,
        getAttribLocation,
        getUniformLocation,
        getDrawTrianglesType,
        getBufferUnsignedByteType,
        getBufferFloatType,
        getBufferUnsignedIntType,
        createShader,
        shaderSource,
        compileShader,
        getShaderParameter,
        getShaderInfoLog,
        createProgram,
        attachShader,
        linkProgram,
        getProgramParameter,
        getProgramInfoLog,
        getExtension,
        uniformMatrix4fv,
        useProgram,
        drawArrays,
        drawElements,
        bufferUint8ArrayData,
        uniform4fv,
        disableVertexAttribArray,
        bindTexture,
        createTexture,
        texImage2D,
        texParameteri,
        clearColor,
        createFramebuffer,
        bindFramebuffer,
        framebufferTexture2D,
        clear,
        uniform1i,
        uniform2fv,
        uniform1f,
        disable,
        enable,
        deleteFramebuffer,
        deleteTexture,
        deleteProgram,
        deleteShader,
        deleteBuffer,
        getFloatType,
        getTexture2DType,
        getRGBAType,
        getDrawingBufferWidth,
        getDrawingBufferHeight,
        getTextureMinFilterType,
        getLinearType,
        getTextureWrapSType,
        getTextureWrapTType,
        getClampToEdgeType,
        getFrameBufferType,
        getColorAttachment0,
        getColorBufferBit,
        getDepthBufferBit,
        getDepthTestType,
        getBlendType,
        getCompileStatusType,
        getLinkStatusType,
        uniform4f,
    }
}

export let createExtensionState: createExtensionStateMeta3D<state> = () => {
    return {}
}
