

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";

function getExtensionService(api, param) {
  return {
          getContext: (function (canvas, contextConfigJsObj) {
              return canvas.getContext("webgl", contextConfigJsObj);
            }),
          createProgram: (function (gl) {
              return Curry._1(gl.createProgram, undefined);
            }),
          linkProgram: (function (program, gl) {
              return gl.linkProgram(program);
            }),
          useProgram: (function (program, gl) {
              return gl.useProgram(program);
            }),
          uniformMatrix4fv: (function ($$location, value, gl) {
              return gl.uniformMatrix4fv($$location, false, value);
            }),
          getAttribLocation: (function (program, name, gl) {
              return gl.getAttribLocation(program, name);
            }),
          getUniformLocation: (function (program, name, gl) {
              return gl.getUniformLocation(program, name);
            }),
          shaderSource: (function (shader, shaderSource, gl) {
              return gl.shaderSource(shader, shaderSource);
            }),
          compileShader: (function (shader, gl) {
              return gl.compileShader(shader);
            }),
          createShader: (function (shaderType, gl) {
              return gl.createShader(shaderType);
            }),
          getShaderParameter: (function (shader, parameterName, gl) {
              return gl.getShaderParameter(shader, parameterName);
            }),
          getProgramParameter: (function (program, parameterName, gl) {
              return gl.getProgramParameter(program, parameterName);
            }),
          getShaderInfoLog: (function (shader, gl) {
              return NullableSt$Meta3dCommonlib.getWithDefault(gl.getShaderInfoLog(shader), "");
            }),
          getProgramInfoLog: (function (program, gl) {
              return NullableSt$Meta3dCommonlib.getWithDefault(gl.getProgramInfoLog(program), "");
            }),
          attachShader: (function (program, shader, gl) {
              return gl.attachShader(program, shader);
            }),
          deleteShader: (function (shader, gl) {
              return gl.deleteShader(shader);
            }),
          getCompileStatus: (function (gl) {
              return gl.COMPILE_STATUS;
            }),
          getVertexShader: (function (gl) {
              return gl.VERTEX_SHADER;
            }),
          getFragmentShader: (function (gl) {
              return gl.FRAGMENT_SHADER;
            }),
          createBuffer: (function (gl) {
              return Curry._1(gl.createBuffer, undefined);
            }),
          bindBuffer: (function (arrayBufferType, buffer, gl) {
              return gl.bindBuffer(arrayBufferType, buffer);
            }),
          bufferFloat32Data: (function (arrayBufferType, arrayBufferUpdateType, bufferData, gl) {
              return gl.bufferData(arrayBufferType, bufferData, arrayBufferUpdateType);
            }),
          getArrayBuffer: (function (gl) {
              return gl.ARRAY_BUFFER;
            }),
          getElementArrayBuffer: (function (gl) {
              return gl.ELEMENT_ARRAY_BUFFER;
            }),
          getDynamicDraw: (function (gl) {
              return gl.DYNAMIC_DRAW;
            })
        };
}

function createExtensionState(param) {
  
}

function getExtensionLife(param, param$1) {
  return {
          onRegister: null,
          onStart: null
        };
}

export {
  getExtensionService ,
  createExtensionState ,
  getExtensionLife ,
  
}
/* No side effect */
