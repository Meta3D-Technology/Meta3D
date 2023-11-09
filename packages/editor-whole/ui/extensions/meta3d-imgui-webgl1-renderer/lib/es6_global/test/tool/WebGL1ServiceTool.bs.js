

import * as Sinon from "../../../../../../node_modules/meta3d-bs-sinon/lib/es6_global/src/sinon.bs.js";

function buildService(sandbox, getContextOpt, createProgramOpt, linkProgramOpt, useProgramOpt, uniformMatrix4fvOpt, uniform1iOpt, uniform1fOpt, uniform3fOpt, getAttribLocationOpt, getUniformLocationOpt, shaderSourceOpt, compileShaderOpt, createShaderOpt, getParameterOpt, getLinkStatusOpt, getShaderParameterOpt, getProgramParameterOpt, getShaderInfoLogOpt, getProgramInfoLogOpt, attachShaderOpt, deleteShaderOpt, bindAttribLocationOpt, getCompileStatusOpt, getVertexShaderOpt, getFragmentShaderOpt, createBufferOpt, bindBufferOpt, bufferFloat32DataOpt, bufferUint16DataOpt, bufferUint32DataOpt, getArrayBufferOpt, getElementArrayBufferOpt, getStaticDrawOpt, getDynamicDrawOpt, disableVertexAttribArrayOpt, vertexAttribPointerOpt, enableVertexAttribArrayOpt, getExtensionOpt, drawElementsOpt, clearColorOpt, clearOpt, getColorBufferBitOpt, getDepthBufferBitOpt, getStencilBufferBitOpt, enableOpt, disableOpt, getFloatOpt, getDepthTestOpt, getStencilTestOpt, getBlendOpt, getCullFaceOpt, getFrontAndBackOpt, getBackOpt, getFrontOpt, getCurrentProgramOpt, getBindingElementArrayBufferOpt, getBindingArrayBufferOpt, getSrcAlphaOpt, getOneMinusSrcAlphaOpt, isEnabledOpt, bindVertexArrayOESOpt, blendFuncOpt, getTrianglesOpt, getTriangleFanOpt, getUnsignedIntOpt, getUnsignedShortOpt, param) {
  var getContext = getContextOpt !== undefined ? getContextOpt : Sinon.createEmptyStub(sandbox.contents);
  var createProgram = createProgramOpt !== undefined ? createProgramOpt : Sinon.createEmptyStub(sandbox.contents);
  var linkProgram = linkProgramOpt !== undefined ? linkProgramOpt : Sinon.createEmptyStub(sandbox.contents);
  var useProgram = useProgramOpt !== undefined ? useProgramOpt : Sinon.createEmptyStub(sandbox.contents);
  var uniformMatrix4fv = uniformMatrix4fvOpt !== undefined ? uniformMatrix4fvOpt : Sinon.createEmptyStub(sandbox.contents);
  var uniform1i = uniform1iOpt !== undefined ? uniform1iOpt : Sinon.createEmptyStub(sandbox.contents);
  var uniform1f = uniform1fOpt !== undefined ? uniform1fOpt : Sinon.createEmptyStub(sandbox.contents);
  var uniform3f = uniform3fOpt !== undefined ? uniform3fOpt : Sinon.createEmptyStub(sandbox.contents);
  var getAttribLocation = getAttribLocationOpt !== undefined ? getAttribLocationOpt : Sinon.createEmptyStub(sandbox.contents);
  var getUniformLocation = getUniformLocationOpt !== undefined ? getUniformLocationOpt : Sinon.createEmptyStub(sandbox.contents);
  var shaderSource = shaderSourceOpt !== undefined ? shaderSourceOpt : Sinon.createEmptyStub(sandbox.contents);
  var compileShader = compileShaderOpt !== undefined ? compileShaderOpt : Sinon.createEmptyStub(sandbox.contents);
  var createShader = createShaderOpt !== undefined ? createShaderOpt : Sinon.createEmptyStub(sandbox.contents);
  var getParameter = getParameterOpt !== undefined ? getParameterOpt : Sinon.createEmptyStub(sandbox.contents);
  var getLinkStatus = getLinkStatusOpt !== undefined ? getLinkStatusOpt : Sinon.createEmptyStub(sandbox.contents);
  var getShaderParameter = getShaderParameterOpt !== undefined ? getShaderParameterOpt : Sinon.createEmptyStub(sandbox.contents);
  var getProgramParameter = getProgramParameterOpt !== undefined ? getProgramParameterOpt : Sinon.createEmptyStub(sandbox.contents);
  var getShaderInfoLog = getShaderInfoLogOpt !== undefined ? getShaderInfoLogOpt : Sinon.createEmptyStub(sandbox.contents);
  var getProgramInfoLog = getProgramInfoLogOpt !== undefined ? getProgramInfoLogOpt : Sinon.createEmptyStub(sandbox.contents);
  var attachShader = attachShaderOpt !== undefined ? attachShaderOpt : Sinon.createEmptyStub(sandbox.contents);
  var deleteShader = deleteShaderOpt !== undefined ? deleteShaderOpt : Sinon.createEmptyStub(sandbox.contents);
  var bindAttribLocation = bindAttribLocationOpt !== undefined ? bindAttribLocationOpt : Sinon.createEmptyStub(sandbox.contents);
  var getCompileStatus = getCompileStatusOpt !== undefined ? getCompileStatusOpt : Sinon.createEmptyStub(sandbox.contents);
  var getVertexShader = getVertexShaderOpt !== undefined ? getVertexShaderOpt : Sinon.createEmptyStub(sandbox.contents);
  var getFragmentShader = getFragmentShaderOpt !== undefined ? getFragmentShaderOpt : Sinon.createEmptyStub(sandbox.contents);
  var createBuffer = createBufferOpt !== undefined ? createBufferOpt : Sinon.createEmptyStub(sandbox.contents);
  var bindBuffer = bindBufferOpt !== undefined ? bindBufferOpt : Sinon.createEmptyStub(sandbox.contents);
  var bufferFloat32Data = bufferFloat32DataOpt !== undefined ? bufferFloat32DataOpt : Sinon.createEmptyStub(sandbox.contents);
  var bufferUint16Data = bufferUint16DataOpt !== undefined ? bufferUint16DataOpt : Sinon.createEmptyStub(sandbox.contents);
  var bufferUint32Data = bufferUint32DataOpt !== undefined ? bufferUint32DataOpt : Sinon.createEmptyStub(sandbox.contents);
  var getArrayBuffer = getArrayBufferOpt !== undefined ? getArrayBufferOpt : Sinon.createEmptyStub(sandbox.contents);
  var getElementArrayBuffer = getElementArrayBufferOpt !== undefined ? getElementArrayBufferOpt : Sinon.createEmptyStub(sandbox.contents);
  var getStaticDraw = getStaticDrawOpt !== undefined ? getStaticDrawOpt : Sinon.createEmptyStub(sandbox.contents);
  var getDynamicDraw = getDynamicDrawOpt !== undefined ? getDynamicDrawOpt : Sinon.createEmptyStub(sandbox.contents);
  var disableVertexAttribArray = disableVertexAttribArrayOpt !== undefined ? disableVertexAttribArrayOpt : Sinon.createEmptyStub(sandbox.contents);
  var vertexAttribPointer = vertexAttribPointerOpt !== undefined ? vertexAttribPointerOpt : Sinon.createEmptyStub(sandbox.contents);
  var enableVertexAttribArray = enableVertexAttribArrayOpt !== undefined ? enableVertexAttribArrayOpt : Sinon.createEmptyStub(sandbox.contents);
  var getExtension = getExtensionOpt !== undefined ? getExtensionOpt : Sinon.createEmptyStub(sandbox.contents);
  var drawElements = drawElementsOpt !== undefined ? drawElementsOpt : Sinon.createEmptyStub(sandbox.contents);
  var clearColor = clearColorOpt !== undefined ? clearColorOpt : Sinon.createEmptyStub(sandbox.contents);
  var clear = clearOpt !== undefined ? clearOpt : Sinon.createEmptyStub(sandbox.contents);
  var getColorBufferBit = getColorBufferBitOpt !== undefined ? getColorBufferBitOpt : Sinon.createEmptyStub(sandbox.contents);
  var getDepthBufferBit = getDepthBufferBitOpt !== undefined ? getDepthBufferBitOpt : Sinon.createEmptyStub(sandbox.contents);
  var getStencilBufferBit = getStencilBufferBitOpt !== undefined ? getStencilBufferBitOpt : Sinon.createEmptyStub(sandbox.contents);
  var enable = enableOpt !== undefined ? enableOpt : Sinon.createEmptyStub(sandbox.contents);
  var disable = disableOpt !== undefined ? disableOpt : Sinon.createEmptyStub(sandbox.contents);
  var getFloat = getFloatOpt !== undefined ? getFloatOpt : Sinon.createEmptyStub(sandbox.contents);
  var getDepthTest = getDepthTestOpt !== undefined ? getDepthTestOpt : Sinon.createEmptyStub(sandbox.contents);
  var getStencilTest = getStencilTestOpt !== undefined ? getStencilTestOpt : Sinon.createEmptyStub(sandbox.contents);
  var getBlend = getBlendOpt !== undefined ? getBlendOpt : Sinon.createEmptyStub(sandbox.contents);
  var getCullFace = getCullFaceOpt !== undefined ? getCullFaceOpt : Sinon.createEmptyStub(sandbox.contents);
  var getFrontAndBack = getFrontAndBackOpt !== undefined ? getFrontAndBackOpt : Sinon.createEmptyStub(sandbox.contents);
  var getBack = getBackOpt !== undefined ? getBackOpt : Sinon.createEmptyStub(sandbox.contents);
  var getFront = getFrontOpt !== undefined ? getFrontOpt : Sinon.createEmptyStub(sandbox.contents);
  var getCurrentProgram = getCurrentProgramOpt !== undefined ? getCurrentProgramOpt : Sinon.createEmptyStub(sandbox.contents);
  var getBindingElementArrayBuffer = getBindingElementArrayBufferOpt !== undefined ? getBindingElementArrayBufferOpt : Sinon.createEmptyStub(sandbox.contents);
  var getBindingArrayBuffer = getBindingArrayBufferOpt !== undefined ? getBindingArrayBufferOpt : Sinon.createEmptyStub(sandbox.contents);
  var getSrcAlpha = getSrcAlphaOpt !== undefined ? getSrcAlphaOpt : Sinon.createEmptyStub(sandbox.contents);
  var getOneMinusSrcAlpha = getOneMinusSrcAlphaOpt !== undefined ? getOneMinusSrcAlphaOpt : Sinon.createEmptyStub(sandbox.contents);
  var isEnabled = isEnabledOpt !== undefined ? isEnabledOpt : Sinon.createEmptyStub(sandbox.contents);
  var bindVertexArrayOES = bindVertexArrayOESOpt !== undefined ? bindVertexArrayOESOpt : Sinon.createEmptyStub(sandbox.contents);
  var blendFunc = blendFuncOpt !== undefined ? blendFuncOpt : Sinon.createEmptyStub(sandbox.contents);
  var getTriangles = getTrianglesOpt !== undefined ? getTrianglesOpt : Sinon.createEmptyStub(sandbox.contents);
  var getTriangleFan = getTriangleFanOpt !== undefined ? getTriangleFanOpt : Sinon.createEmptyStub(sandbox.contents);
  var getUnsignedInt = getUnsignedIntOpt !== undefined ? getUnsignedIntOpt : Sinon.createEmptyStub(sandbox.contents);
  var getUnsignedShort = getUnsignedShortOpt !== undefined ? getUnsignedShortOpt : Sinon.createEmptyStub(sandbox.contents);
  return {
          getContext: getContext,
          createProgram: createProgram,
          linkProgram: linkProgram,
          useProgram: useProgram,
          uniformMatrix4fv: uniformMatrix4fv,
          uniform1i: uniform1i,
          uniform1f: uniform1f,
          uniform3f: uniform3f,
          getAttribLocation: getAttribLocation,
          getUniformLocation: getUniformLocation,
          shaderSource: shaderSource,
          compileShader: compileShader,
          createShader: createShader,
          getParameter: getParameter,
          getLinkStatus: getLinkStatus,
          getShaderParameter: getShaderParameter,
          getProgramParameter: getProgramParameter,
          getShaderInfoLog: getShaderInfoLog,
          getProgramInfoLog: getProgramInfoLog,
          attachShader: attachShader,
          deleteShader: deleteShader,
          bindAttribLocation: bindAttribLocation,
          getCompileStatus: getCompileStatus,
          getVertexShader: getVertexShader,
          getFragmentShader: getFragmentShader,
          createBuffer: createBuffer,
          bindBuffer: bindBuffer,
          bufferFloat32Data: bufferFloat32Data,
          bufferUint16Data: bufferUint16Data,
          bufferUint32Data: bufferUint32Data,
          getArrayBuffer: getArrayBuffer,
          getElementArrayBuffer: getElementArrayBuffer,
          getStaticDraw: getStaticDraw,
          getDynamicDraw: getDynamicDraw,
          disableVertexAttribArray: disableVertexAttribArray,
          vertexAttribPointer: vertexAttribPointer,
          enableVertexAttribArray: enableVertexAttribArray,
          getExtension: getExtension,
          drawElements: drawElements,
          clearColor: clearColor,
          clear: clear,
          getColorBufferBit: getColorBufferBit,
          getDepthBufferBit: getDepthBufferBit,
          getStencilBufferBit: getStencilBufferBit,
          enable: enable,
          disable: disable,
          getFloat: getFloat,
          getDepthTest: getDepthTest,
          getStencilTest: getStencilTest,
          getBlend: getBlend,
          getCullFace: getCullFace,
          getFrontAndBack: getFrontAndBack,
          getBack: getBack,
          getFront: getFront,
          getCurrentProgram: getCurrentProgram,
          getBindingElementArrayBuffer: getBindingElementArrayBuffer,
          getBindingArrayBuffer: getBindingArrayBuffer,
          getSrcAlpha: getSrcAlpha,
          getOneMinusSrcAlpha: getOneMinusSrcAlpha,
          isEnabled: isEnabled,
          bindVertexArrayOES: bindVertexArrayOES,
          blendFunc: blendFunc,
          getTriangles: getTriangles,
          getTriangleFan: getTriangleFan,
          getUnsignedInt: getUnsignedInt,
          getUnsignedShort: getUnsignedShort
        };
}

export {
  buildService ,
  
}
/* Sinon Not a pure module */
