'use strict';

var Caml_option = require("rescript/lib/js/caml_option.js");
var ShaderData$Meta3dImguiWebgl1Renderer = require("./ShaderData.bs.js");
var Matrix4Service$Meta3dImguiWebgl1Renderer = require("./Matrix4Service.bs.js");
var ProgramService$Meta3dImguiWebgl1Renderer = require("./ProgramService.bs.js");

function _createArrayBuffer(param, gl) {
  var getArrayBuffer = param.getArrayBuffer;
  var buffer = param.createBuffer(gl);
  param.bindBuffer(getArrayBuffer(gl), buffer, gl);
  param.bufferFloat32Data(getArrayBuffer(gl), new Float32Array([]), param.getDynamicDraw(gl), gl);
  return buffer;
}

function _createElementArrayBuffer(param, gl) {
  var getElementArrayBuffer = param.getElementArrayBuffer;
  var buffer = param.createBuffer(gl);
  param.bindBuffer(getElementArrayBuffer(gl), buffer, gl);
  param.bufferUint16Data(getElementArrayBuffer(gl), new Uint16Array([]), param.getDynamicDraw(gl), gl);
  return buffer;
}

function _buildOrthoProjectionMat4TypeArr(param) {
  return Matrix4Service$Meta3dImguiWebgl1Renderer.ortho(0, param[0], param[1], 0, -1, 1, Matrix4Service$Meta3dImguiWebgl1Renderer.createIdentityMatrix4(undefined));
}

function _sendUniformProjectionMatData(param, gl, program, canvasSize) {
  return param.uniformMatrix4fv(param.getUniformLocation(program, "u_projectionMat", gl), _buildOrthoProjectionMat4TypeArr(canvasSize), gl);
}

function _sendNoTextureProgramUniformData(webgl1Service, gl, program, canvasSize) {
  webgl1Service.useProgram(program, gl);
  _sendUniformProjectionMatData(webgl1Service, gl, program, canvasSize);
  
}

function init(state, webgl1Service, isDebug, canvas) {
  var getAttribLocation = webgl1Service.getAttribLocation;
  var gl = webgl1Service.getContext(canvas, {
        alpha: true,
        depth: true,
        stencil: false,
        antialias: true,
        premultipliedAlpha: true,
        preserveDrawingBuffer: false
      });
  var __x = webgl1Service.createProgram(gl);
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
            aPositonLocation: getAttribLocation(noTextureProgram, "a_position", gl),
            aColorLocation: getAttribLocation(noTextureProgram, "a_color", gl),
            positionBuffer: _createArrayBuffer(webgl1Service, gl),
            colorBuffer: _createArrayBuffer(webgl1Service, gl),
            indexBuffer: _createElementArrayBuffer(webgl1Service, gl)
          },
          lastWebglData: state.lastWebglData
        };
}

exports._createArrayBuffer = _createArrayBuffer;
exports._createElementArrayBuffer = _createElementArrayBuffer;
exports._buildOrthoProjectionMat4TypeArr = _buildOrthoProjectionMat4TypeArr;
exports._sendUniformProjectionMatData = _sendUniformProjectionMatData;
exports._sendNoTextureProgramUniformData = _sendNoTextureProgramUniformData;
exports.init = init;
/* No side effect */
