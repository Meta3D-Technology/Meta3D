

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Caml_option from "../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as ShaderData$Meta3dImguiWebgl1Renderer from "./ShaderData.bs.js";
import * as RenderService$Meta3dImguiWebgl1Renderer from "./RenderService.bs.js";
import * as Matrix4Service$Meta3dImguiWebgl1Renderer from "./Matrix4Service.bs.js";
import * as ProgramService$Meta3dImguiWebgl1Renderer from "./ProgramService.bs.js";

function _createArrayBuffer(param, gl) {
  var getArrayBuffer = param.getArrayBuffer;
  var buffer = Curry._1(param.createBuffer, gl);
  Curry._3(param.bindBuffer, Curry._1(getArrayBuffer, gl), buffer, gl);
  Curry._4(param.bufferFloat32Data, Curry._1(getArrayBuffer, gl), new Float32Array([]), Curry._1(param.getDynamicDraw, gl), gl);
  return buffer;
}

function _createElementArrayBuffer(param, gl) {
  var getElementArrayBuffer = param.getElementArrayBuffer;
  var buffer = Curry._1(param.createBuffer, gl);
  Curry._3(param.bindBuffer, Curry._1(getElementArrayBuffer, gl), buffer, gl);
  Curry._4(param.bufferUint16Data, Curry._1(getElementArrayBuffer, gl), new Uint16Array([]), Curry._1(param.getDynamicDraw, gl), gl);
  return buffer;
}

function _buildOrthoProjectionMat4TypeArr(param) {
  return Matrix4Service$Meta3dImguiWebgl1Renderer.ortho(0, param[0], param[1], 0, -1, 1, Matrix4Service$Meta3dImguiWebgl1Renderer.createIdentityMatrix4(undefined));
}

function _sendUniformProjectionMatData(param, gl, program, canvasSize) {
  return Curry._3(param.uniformMatrix4fv, Curry._3(param.getUniformLocation, program, "u_projectionMat", gl), _buildOrthoProjectionMat4TypeArr(canvasSize), gl);
}

function _sendNoTextureProgramUniformData(webgl1Service, gl, program, canvasSize) {
  Curry._2(webgl1Service.useProgram, program, gl);
  _sendUniformProjectionMatData(webgl1Service, gl, program, canvasSize);
  
}

function getExtensionService(api, param) {
  var meta3dWebGL1ExtensionName = param[0].meta3dWebGL1ExtensionName;
  return {
          init: (function (state, meta3dState, isDebug, canvas) {
              var webgl1Service = api.getExtensionService(meta3dState, meta3dWebGL1ExtensionName);
              var getAttribLocation = webgl1Service.getAttribLocation;
              var gl = Curry._2(webgl1Service.getContext, canvas, {
                    alpha: true,
                    depth: true,
                    stencil: false,
                    antialias: true,
                    premultipliedAlpha: true,
                    preserveDrawingBuffer: false
                  });
              var __x = Curry._1(webgl1Service.createProgram, gl);
              var noTextureProgram = ProgramService$Meta3dImguiWebgl1Renderer.initShader(webgl1Service, ShaderData$Meta3dImguiWebgl1Renderer.vs_noTexture, ShaderData$Meta3dImguiWebgl1Renderer.fs_noTexture, gl, isDebug, __x);
              var canvasSize_0 = canvas.width;
              var canvasSize_1 = canvas.height;
              var canvasSize = [
                canvasSize_0,
                canvasSize_1
              ];
              _sendNoTextureProgramUniformData(webgl1Service, gl, noTextureProgram, canvasSize);
              return {
                      isDebug: isDebug,
                      drawData: state.drawData,
                      gl: Caml_option.some(gl),
                      noTextureShaderData: {
                        program: noTextureProgram,
                        aPositonLocation: Curry._3(getAttribLocation, noTextureProgram, "a_position", gl),
                        aColorLocation: Curry._3(getAttribLocation, noTextureProgram, "a_color", gl),
                        positionBuffer: _createArrayBuffer(webgl1Service, gl),
                        colorBuffer: _createArrayBuffer(webgl1Service, gl),
                        indexBuffer: _createElementArrayBuffer(webgl1Service, gl)
                      },
                      lastWebglData: state.lastWebglData
                    };
            }),
          render: (function (state, meta3dState) {
              var webgl1Service = api.getExtensionService(meta3dState, meta3dWebGL1ExtensionName);
              return RenderService$Meta3dImguiWebgl1Renderer.render(state, meta3dState, webgl1Service);
            })
        };
}

function createExtensionState(param) {
  return {
          isDebug: false,
          drawData: RenderService$Meta3dImguiWebgl1Renderer.createEmptyDrawData(undefined),
          gl: undefined,
          noTextureShaderData: undefined,
          lastWebglData: undefined
        };
}

function getExtensionLife(param, param$1) {
  return {
          onRegister: null,
          onStart: null
        };
}

export {
  _createArrayBuffer ,
  _createElementArrayBuffer ,
  _buildOrthoProjectionMat4TypeArr ,
  _sendUniformProjectionMatData ,
  _sendNoTextureProgramUniformData ,
  getExtensionService ,
  createExtensionState ,
  getExtensionLife ,
  
}
/* No side effect */
