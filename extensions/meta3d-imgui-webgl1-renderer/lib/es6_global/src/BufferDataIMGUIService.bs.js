

import * as OptionSt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";

function _bufferArrayBufferData(param, param$1, gl) {
  var getArrayBuffer = param.getArrayBuffer;
  param.bindBuffer(getArrayBuffer(gl), param$1[0], gl);
  param.bufferFloat32Data(getArrayBuffer(gl), new Float32Array(param$1[1]), param.getDynamicDraw(gl), gl);
  return gl;
}

function _sendArrayBufferData(param, param$1, gl) {
  var $$location = param$1[0];
  param.enableVertexAttribArray($$location, gl);
  param.vertexAttribPointer($$location, param$1[1], param.getFloat(gl), false, 0, 0, gl);
  return gl;
}

function _bufferElementArrayBufferData(param, buffer, pointArr, gl) {
  var getElementArrayBuffer = param.getElementArrayBuffer;
  param.bindBuffer(getElementArrayBuffer(gl), buffer, gl);
  param.bufferUint16Data(getElementArrayBuffer(gl), new Uint16Array(pointArr), param.getDynamicDraw(gl), gl);
  return gl;
}

function bufferNoTextureDataAndSend(webgl1Service, gl, param, state) {
  var indexArr = param.indexArr;
  var noTextureShaderData = OptionSt$Meta3dCommonlib.getExn(state.noTextureShaderData);
  var __x = _bufferArrayBufferData(webgl1Service, [
        noTextureShaderData.positionBuffer,
        param.verticeArr
      ], gl);
  var __x$1 = _sendArrayBufferData(webgl1Service, [
        noTextureShaderData.aPositonLocation,
        2
      ], __x);
  var __x$2 = _bufferArrayBufferData(webgl1Service, [
        noTextureShaderData.colorBuffer,
        param.colorArr
      ], __x$1);
  _bufferElementArrayBufferData(webgl1Service, noTextureShaderData.indexBuffer, indexArr, _sendArrayBufferData(webgl1Service, [
            noTextureShaderData.aColorLocation,
            3
          ], __x$2));
  return [
          state,
          {
            count: indexArr.length
          }
        ];
}

export {
  _bufferArrayBufferData ,
  _sendArrayBufferData ,
  _bufferElementArrayBufferData ,
  bufferNoTextureDataAndSend ,
  
}
/* No side effect */
